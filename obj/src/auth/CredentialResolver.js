"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialResolver = void 0;
/** @module auth */
/** @hidden */
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const CredentialParams_1 = require("./CredentialParams");
/**
 * Helper class to retrieve component credentials.
 *
 * If credentials are configured to be retrieved from [[ICredentialStore]],
 * it automatically locates [[ICredentialStore]] in component references
 * and retrieve credentials from there using store_key parameter.
 *
 * ### Configuration parameters ###
 *
 * __credential:__
 * - store_key:                   (optional) a key to retrieve the credentials from [[ICredentialStore]]
 * - ...                          other credential parameters
 *
 * __credentials:__                   alternative to credential
 * - [credential params 1]:       first credential parameters
 *     - ...                      credential parameters for key 1
 * - ...
 * - [credential params N]:       Nth credential parameters
 *     - ...                      credential parameters for key N
 *
 * ### References ###
 *
 * - <code>\*:credential-store:\*:\*:1.0</code>  (optional) Credential stores to resolve credentials
 *
 * @see [[CredentialParams]]
 * @see [[ICredentialStore]]
 *
 * ### Example ###
 *
 *     let config = ConfigParams.fromTuples(
 *         "credential.user", "jdoe",
 *         "credential.pass",  "pass123"
 *     );
 *
 *     let credentialResolver = new CredentialResolver();
 *     credentialResolver.configure(config);
 *     credentialResolver.setReferences(references);
 *
 *     credentialResolver.lookup("123", (err, credential) => {
 *         // Now use credential...
 *     });
 *
 */
class CredentialResolver {
    /**
     * Creates a new instance of credentials resolver.
     *
     * @param config        (optional) component configuration parameters
     * @param references    (optional) component references
     */
    constructor(config = null, references = null) {
        this._credentials = [];
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
        let credentials = CredentialParams_1.CredentialParams.manyFromConfig(config);
        this._credentials.push(...credentials);
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
     * Gets all credentials configured in component configuration.
     *
     * Redirect to CredentialStores is not done at this point.
     * If you need fully fleshed credential use [[lookup]] method instead.
     *
     * @returns a list with credential parameters
     */
    getAll() {
        return this._credentials;
    }
    /**
     * Adds a new credential to component credentials
     *
     * @param credential    new credential parameters to be added
     */
    add(credential) {
        this._credentials.push(credential);
    }
    lookupInStores(correlationId, credential, callback) {
        if (!credential.useCredentialStore()) {
            callback(null, null);
            return;
        }
        let key = credential.getStoreKey();
        if (this._references == null) {
            callback(null, null);
            return;
        }
        let storeDescriptor = new pip_services3_commons_node_2.Descriptor("*", "credential-store", "*", "*", "*");
        let components = this._references.getOptional(storeDescriptor);
        if (components.length == 0) {
            let err = new pip_services3_commons_node_1.ReferenceException(correlationId, storeDescriptor);
            callback(err, null);
            return;
        }
        let firstResult = null;
        async.any(components, (component, callback) => {
            let store = component;
            store.lookup(correlationId, key, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = result;
                    callback(err, true);
                }
            });
        }, (err) => {
            if (callback)
                callback(err, firstResult);
        });
    }
    /**
     * Looks up component credential parameters. If credentials are configured to be retrieved
     * from Credential store it finds a [[ICredentialStore]] and lookups credentials there.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives resolved credential or error.
     */
    lookup(correlationId, callback) {
        if (this._credentials.length == 0) {
            if (callback)
                callback(null, null);
            return;
        }
        let lookupCredentials = [];
        for (let index = 0; index < this._credentials.length; index++) {
            if (!this._credentials[index].useCredentialStore()) {
                if (callback)
                    callback(null, this._credentials[index]);
                return;
            }
            else {
                lookupCredentials.push(this._credentials[index]);
            }
        }
        let firstResult = null;
        async.any(lookupCredentials, (credential, callback) => {
            this.lookupInStores(correlationId, credential, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = result;
                    callback(err, true);
                }
            });
        }, (err) => {
            if (callback)
                callback(err, firstResult);
        });
    }
}
exports.CredentialResolver = CredentialResolver;
//# sourceMappingURL=CredentialResolver.js.map