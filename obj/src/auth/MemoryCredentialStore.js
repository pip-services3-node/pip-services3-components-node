"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module auth */
/** @hidden */
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const CredentialParams_1 = require("./CredentialParams");
/**
 * Credential store that keeps credentials in memory.
 *
 * ### Configuration parameters ###
 *
 * - [credential key 1]:
 *     - ...                          credential parameters for key 1
 * - [credential key 2]:
 *     - ...                          credential parameters for key N
 * - ...
 *
 * @see [[ICredentialStore]]
 * @see [[CredentialParams]]
 *
 * ### Example ###
 *
 *     let config = ConfigParams.fromTuples(
 *         "key1.user", "jdoe",
 *         "key1.pass", "pass123",
 *         "key2.user", "bsmith",
 *         "key2.pass", "mypass"
 *     );
 *
 *     let credentialStore = new MemoryCredentialStore();
 *     credentialStore.readCredentials(config);
 *
 *     credentialStore.lookup("123", "key1", (err, credential) => {
 *         // Result: user=jdoe;pass=pass123
 *     });
 */
class MemoryCredentialStore {
    /**
     * Creates a new instance of the credential store.
     *
     * @param config    (optional) configuration with credential parameters.
     */
    constructor(config = null) {
        this._items = new pip_services3_commons_node_1.StringValueMap();
        if (config != null)
            this.configure(config);
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        this.readCredentials(config);
    }
    /**
     * Reads credentials from configuration parameters.
     * Each section represents an individual CredentialParams
     *
     * @param config   configuration parameters to be read
     */
    readCredentials(config) {
        this._items.clear();
        let keys = config.getKeys();
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let value = config.getAsNullableString(key);
            this._items.put(key, CredentialParams_1.CredentialParams.fromTuplesArray([key, value]));
        }
    }
    /**
     * Stores credential parameters into the store.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a key to uniquely identify the credential parameters.
     * @param credential        a credential parameters to be stored.
     * @param callback 			callback function that receives an error or null for success.
     */
    store(correlationId, key, credential, callback) {
        if (credential != null)
            this._items.put(key, credential);
        else
            this._items.remove(key);
        if (callback)
            callback(null);
    }
    /**
     * Lookups credential parameters by its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a key to uniquely identify the credential parameters.
     * @param callback          callback function that receives found credential parameters or error.
     */
    lookup(correlationId, key, callback) {
        let credential = this._items.getAsObject(key);
        callback(null, credential);
    }
}
exports.MemoryCredentialStore = MemoryCredentialStore;
//# sourceMappingURL=MemoryCredentialStore.js.map