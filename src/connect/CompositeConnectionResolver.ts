/** @module connect */
/** @hidden */
const async = require('async');

import { IReferenceable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { ConfigException } from 'pip-services3-commons-node';

import { CredentialParams } from '../auth/CredentialParams';
import { CredentialResolver } from '../auth/CredentialResolver';
import { ConnectionParams } from './ConnectionParams';
import { ConnectionResolver } from './ConnectionResolver';

/**
 * Helper class that resolves connection and credential parameters,
 * validates them and generates connection options.
 * 
 *  ### Configuration parameters ###
 * 
 * - connection(s):
 *   - discovery_key:               (optional) a key to retrieve the connection from [[https://pip-services3-node.github.io/pip-services3-components-node/interfaces/connect.idiscovery.html IDiscovery]]
 *   - protocol:                    communication protocol
 *   - host:                        host name or IP address
 *   - port:                        port number
 *   - uri:                         resource URI or connection string with all parameters in it
 * - credential(s):
 *   - store_key:                   (optional) a key to retrieve the credentials from [[https://pip-services3-node.github.io/pip-services3-components-node/interfaces/auth.icredentialstore.html ICredentialStore]]
 *   - username:                    user name
 *   - password:                    user password
 * 
 * ### References ###
 * 
 * - <code>\*:discovery:\*:\*:1.0</code>          (optional) [[https://pip-services3-node.github.io/pip-services3-components-node/interfaces/connect.idiscovery.html IDiscovery]] services to resolve connections
 * - <code>\*:credential-store:\*:\*:1.0</code>   (optional) Credential stores to resolve credentials
 */
export class CompositeConnectionResolver implements IReferenceable, IConfigurable {
    /**
     * The connection options
     */
    protected _options: ConfigParams;

    /** 
     * The connections resolver.
     */
    protected _connectionResolver: ConnectionResolver = new ConnectionResolver();

    /** 
     * The credentials resolver.
     */
    protected _credentialResolver: CredentialResolver = new CredentialResolver();

    /**
     * The cluster support (multiple connections)
     */
    protected _clusterSupported: boolean = true;

    /**
     * The default protocol
     */
    protected _defaultProtocol: string = null;

    /**
     * The default port number
     */
    protected _defaultPort: number = 0;

    /**
     * The list of supported protocols
     */
    protected _supportedProtocols: string[] = null;

    /**
     * Configures component by passing configuration parameters.
     * 
     * @param config    configuration parameters to be set.
     */
    public configure(config: ConfigParams): void {
        this._connectionResolver.configure(config);
        this._credentialResolver.configure(config);
        this._options = config.getSection("options");
    }

    /**
	 * Sets references to dependent components.
	 * 
	 * @param references 	references to locate the component dependencies. 
     */
    public setReferences(references: IReferences): void {
        this._connectionResolver.setReferences(references);
        this._credentialResolver.setReferences(references);
    }

    /**
     * Resolves connection options from connection and credential parameters.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives resolved options or error.
     */
     public resolve(correlationId: string, callback: (err: any, options: ConfigParams) => void): void {
        let connections: ConnectionParams[];
        let credential: CredentialParams;

        async.parallel([
            (callback) => {
                this._connectionResolver.resolveAll(correlationId, (err: any, result: ConnectionParams[]) => {
                    connections = result || [];

                    // Validate if cluster (multiple connections) is supported
                    if (err == null && connections.length > 0 && !this._clusterSupported) {
                        err = new ConfigException(
                            correlationId, 
                            "MULTIPLE_CONNECTIONS_NOT_SUPPORTED",
                            "Multiple (cluster) connections are not supported"
                        );
                    }

                    // Validate connections
                    if (err == null) {
                        for (let connection of connections) {
                            err = err || this.validateConnection(correlationId, connection);
                        }
                    }

                    callback(err);
                });
            },
            (callback) => {
                this._credentialResolver.lookup(correlationId, (err: any, result: CredentialParams) => {
                    credential = result || new CredentialParams();

                    // Validate credential
                    if (err == null) {
                        err = this.validateCredential(correlationId, credential);
                    }

                    callback(err);
                });
            }
        ], (err) => {
            if (err)
                callback(err, null);
            else {
                let options = this.composeOptions(connections, credential, this._options);
                callback(null, options);
            }
        });
    }

    /**
     * Composes Composite connection options from connection and credential parameters.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connections        connection parameters
     * @param credential        credential parameters
     * @param parameters        optional parameters
     * @param callback 			callback function that receives resolved options or error.
     */
    public compose(correlationId: string, connections: ConnectionParams[], credential: CredentialParams, parameters: ConfigParams,
        callback: (err: any, options: any) => void): void {

        // Validate connection parameters
        let err = null;
        for (let connection of connections) {
            err = err || this.validateConnection(correlationId, connection);
        }

        // Validate credential parameters
        err = err || this.validateCredential(correlationId, credential);

        if (err) callback(err, null);
        else {
            let options = this.composeOptions(connections, credential, parameters);
            callback(null, options);
        }
    }

    /**
     * Validates connection parameters.
     * This method can be overriden in child classes.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection connection parameters to be validated
     * @returns error or <code>null</code> if validation was successful
     */
    protected validateConnection(correlationId: string, connection: ConnectionParams): any {
        if (connection == null) {
            return new ConfigException(correlationId, "NO_CONNECTION", "Connection parameters are not set is not set");
        }

        // URI usually contains all information
        let uri = connection.getUri();
        if (uri != null) return null;

        let protocol = connection.getProtocolWithDefault(this._defaultProtocol);
        if (protocol == null) {
            return new ConfigException(correlationId, "NO_PROTOCOL", "Connection protocol is not set");
        }
        if (this._supportedProtocols != null && this._supportedProtocols.indexOf(protocol) < 0) {
            return new ConfigException(correlationId, "UNSUPPORTED_PROTOCOL", "The protocol "+protocol+" is not supported");
        }

        let host = connection.getHost();
        if (host == null) {
            return new ConfigException(correlationId, "NO_HOST", "Connection host is not set");
        }

        let port = connection.getPortWithDefault(this._defaultPort);
        if (port == 0) {
            return new ConfigException(correlationId, "NO_PORT", "Connection port is not set");
        }

        return null;
    }

    /**
     * Validates credential parameters.
     * This method can be overriden in child classes.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param credential  credential parameters to be validated
     * @returns error or <code>null</code> if validation was successful
     */
    protected validateCredential(correlationId: string, credential: CredentialParams): any {
        return null;
    }

    /**
     * Composes connection and credential parameters into connection options.
     * This method can be overriden in child classes.
     * 
     * @param connections a list of connection parameters
     * @param credential credential parameters
     * @param parameters optional parameters
     * @returns a composed connection options.
     */
    protected composeOptions(connections: ConnectionParams[], credential: CredentialParams, parameters: ConfigParams): ConfigParams {
        // Connection options
        let options = new ConfigParams();

        // Merge connection parameters
        for (let connection of connections) {
            options = this.mergeConnection(options, connection);
        }

        // Merge credential parameters
        options = this.mergeCredential(options, credential);

        // Merge optional parameters
        options = this.mergeOptional(options, parameters);

        // Perform final processing
        options = this.finalizeOptions(options)

        return options
    }

    /**
     * Merges connection options with connection parameters
     * This method can be overriden in child classes.
     * 
     * @param options connection options
     * @param connection connection parameters to be merged
     * @returns merged connection options.
     */
    protected mergeConnection(options: ConfigParams, connection: ConnectionParams): ConfigParams {
        let mergedOptions = options.setDefaults(connection);
        return mergedOptions;
    }

    /**
     * Merges connection options with credential parameters
     * This method can be overriden in child classes.
     * 
     * @param options connection options
     * @param credential credential parameters to be merged
     * @returns merged connection options.
     */
    protected mergeCredential(options: ConfigParams, credential: CredentialParams): ConfigParams {
        let mergedOptions = options.override(credential);
        return mergedOptions;
    }

    /**
     * Merges connection options with optional parameters
     * This method can be overriden in child classes.
     * 
     * @param options connection options
     * @param parameters optional parameters to be merged
     * @returns merged connection options.
     */
     protected mergeOptional(options: ConfigParams, parameters: ConfigParams): ConfigParams {
        let mergedOptions = options.setDefaults(parameters);
        return mergedOptions;
    }

    /**
     * Finalize merged options
     * This method can be overriden in child classes.
     * 
     * @param options connection options
     * @returns finalized connection options
     */
    protected finalizeOptions(options: ConfigParams): ConfigParams {
        return options;
    }

}
