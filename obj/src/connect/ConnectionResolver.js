"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module connect */
/** @hidden */
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const ConnectionParams_1 = require("./ConnectionParams");
/**
 * Helper class to retrieve component connections.
 *
 * If connections are configured to be retrieved from [[IDiscovery]],
 * it automatically locates [[IDiscovery]] in component references
 * and retrieve connections from there using discovery_key parameter.
 *
 * ### Configuration parameters ###
 *
 * - __connection:__
 *     - discovery_key:               (optional) a key to retrieve the connection from [[https://pip-services3-node.github.io/pip-services3-components-node/interfaces/connect.idiscovery.html IDiscovery]]
 *     - ...                          other connection parameters
 *
 * - __connections:__                  alternative to connection
 *     - [connection params 1]:       first connection parameters
 *         - ...                      connection parameters for key 1
 *     - [connection params N]:       Nth connection parameters
 *         - ...                      connection parameters for key N
 *
 * ### References ###
 *
 * - <code>\*:discovery:\*:\*:1.0</code>    (optional) [[https://pip-services3-node.github.io/pip-services3-components-node/interfaces/connect.idiscovery.html IDiscovery]] services to resolve connections
 *
 * @see [[ConnectionParams]]
 * @see [[IDiscovery]]
 *
 * ### Example ###
 *
 *     let config = ConfigParams.fromTuples(
 *         "connection.host", "10.1.1.100",
 *         "connection.port", 8080
 *     );
 *
 *     let connectionResolver = new ConnectionResolver();
 *     connectionResolver.configure(config);
 *     connectionResolver.setReferences(references);
 *
 *     connectionResolver.resolve("123", (err, connection) => {
 *         // Now use connection...
 *     });
 */
class ConnectionResolver {
    /**
     * Creates a new instance of connection resolver.
     *
     * @param config        (optional) component configuration parameters
     * @param references    (optional) component references
     */
    constructor(config = null, references = null) {
        this._connections = [];
        this._references = null;
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        let connections = ConnectionParams_1.ConnectionParams.manyFromConfig(config);
        this._connections.push(...connections);
    }
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references) {
        this._references = references;
    }
    /**
     * Gets all connections configured in component configuration.
     *
     * Redirect to Discovery services is not done at this point.
     * If you need fully fleshed connection use [[resolve]] method instead.
     *
     * @returns a list with connection parameters
     */
    getAll() {
        return this._connections;
    }
    /**
     * Adds a new connection to component connections
     *
     * @param connection    new connection parameters to be added
     */
    add(connection) {
        this._connections.push(connection);
    }
    resolveInDiscovery(correlationId, connection, callback) {
        if (!connection.useDiscovery()) {
            callback(null, null);
            return;
        }
        let key = connection.getDiscoveryKey();
        if (this._references == null) {
            callback(null, null);
            return;
        }
        let discoveryDescriptor = new pip_services3_commons_node_3.Descriptor("*", "discovery", "*", "*", "*");
        let discoveries = this._references.getOptional(discoveryDescriptor);
        if (discoveries.length == 0) {
            let err = new pip_services3_commons_node_2.ReferenceException(correlationId, discoveryDescriptor);
            callback(err, null);
            return;
        }
        let firstResult = null;
        async.any(discoveries, (discovery, callback) => {
            let discoveryTyped = discovery;
            discoveryTyped.resolveOne(correlationId, key, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = result;
                    callback(err, true);
                }
            });
        }, (err) => {
            callback(err, firstResult);
        });
    }
    /**
     * Resolves a single component connection. If connections are configured to be retrieved
     * from Discovery service it finds a [[IDiscovery]] and resolves the connection there.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives resolved connection or error.
     *
     * @see [[IDiscovery]]
     */
    resolve(correlationId, callback) {
        if (this._connections.length == 0) {
            callback(null, null);
            return;
        }
        let connections = [];
        for (let index = 0; index < this._connections.length; index++) {
            if (!this._connections[index].useDiscovery()) {
                callback(null, this._connections[index]); //If a connection is not configured for discovery use - return it.
                return;
            }
            else {
                connections.push(this._connections[index]); //Otherwise, add it to the list of connections to resolve.
            }
        }
        if (connections.length == 0) {
            callback(null, null);
            return;
        }
        let firstResult = null;
        async.any(connections, (connection, callback) => {
            this.resolveInDiscovery(correlationId, connection, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = new ConnectionParams_1.ConnectionParams(pip_services3_commons_node_1.ConfigParams.mergeConfigs(connection, result));
                    callback(err, true);
                }
            });
        }, (err) => {
            callback(err, firstResult);
        });
    }
    resolveAllInDiscovery(correlationId, connection, callback) {
        let resolved = [];
        let key = connection.getDiscoveryKey();
        if (!connection.useDiscovery()) {
            callback(null, []);
            return;
        }
        if (this._references == null) {
            callback(null, []);
            return;
        }
        let discoveryDescriptor = new pip_services3_commons_node_3.Descriptor("*", "discovery", "*", "*", "*");
        let discoveries = this._references.getOptional(discoveryDescriptor);
        if (discoveries.length == 0) {
            let err = new pip_services3_commons_node_2.ReferenceException(correlationId, discoveryDescriptor);
            callback(err, null);
            return;
        }
        async.each(discoveries, (discovery, callback) => {
            let discoveryTyped = discovery;
            discoveryTyped.resolveAll(correlationId, key, (err, result) => {
                if (err || result == null) {
                    callback(err);
                }
                else {
                    resolved = resolved.concat(result);
                    callback(null);
                }
            });
        }, (err) => {
            callback(err, resolved);
        });
    }
    /**
     * Resolves all component connection. If connections are configured to be retrieved
     * from Discovery service it finds a [[IDiscovery]] and resolves the connection there.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives resolved connections or error.
     *
     * @see [[IDiscovery]]
     */
    resolveAll(correlationId, callback) {
        let resolved = [];
        let toResolve = [];
        for (let index = 0; index < this._connections.length; index++) {
            if (this._connections[index].useDiscovery())
                toResolve.push(this._connections[index]);
            else
                resolved.push(this._connections[index]);
        }
        if (toResolve.length <= 0) {
            callback(null, resolved);
            return;
        }
        async.each(toResolve, (connection, callback) => {
            this.resolveAllInDiscovery(correlationId, connection, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    for (let index = 0; index < result.length; index++) {
                        let localResolvedConnection = new ConnectionParams_1.ConnectionParams(pip_services3_commons_node_1.ConfigParams.mergeConfigs(connection, result[index]));
                        resolved.push(localResolvedConnection);
                    }
                    callback(null);
                }
            });
        }, (err) => {
            callback(err, resolved);
        });
    }
    registerInDiscovery(correlationId, connection, callback) {
        if (!connection.useDiscovery()) {
            if (callback)
                callback(null, false);
            return;
        }
        var key = connection.getDiscoveryKey();
        if (this._references == null) {
            if (callback)
                callback(null, false);
            return;
        }
        var discoveries = this._references.getOptional(new pip_services3_commons_node_3.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries == null) {
            if (callback)
                callback(null, false);
            return;
        }
        async.each(discoveries, (discovery, callback) => {
            discovery.register(correlationId, key, connection, (err, result) => {
                callback(err);
            });
        }, (err) => {
            if (callback)
                callback(err, err == null);
        });
    }
    /**
     * Registers the given connection in all referenced discovery services.
     * This method can be used for dynamic service discovery.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection        a connection to register.
     * @param callback          callback function that receives registered connection or error.
     *
     * @see [[IDiscovery]]
     */
    register(correlationId, connection, callback) {
        this.registerInDiscovery(correlationId, connection, (err, result) => {
            if (result)
                this._connections.push(connection);
            if (callback)
                callback(err);
        });
    }
}
exports.ConnectionResolver = ConnectionResolver;
//# sourceMappingURL=ConnectionResolver.js.map