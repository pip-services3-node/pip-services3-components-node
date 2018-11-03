"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module connect */
/** @hidden */
let async = require('async');
const ConnectionParams_1 = require("./ConnectionParams");
/**
 * Used to store key-identifiable information about connections.
 */
class DiscoveryItem {
}
/**
 * Discovery service that keeps connections in memory.
 *
 * ### Configuration parameters ###
 *
 * - [connection key 1]:
 *     - ...                          connection parameters for key 1
 * - [connection key 2]:
 *     - ...                          connection parameters for key N
 *
 * @see [[IDiscovery]]
 * @see [[ConnectionParams]]
 *
 * ### Example ###
 *
 *     let config = ConfigParams.fromTuples(
 *         "key1.host", "10.1.1.100",
 *         "key1.port", "8080",
 *         "key2.host", "10.1.1.100",
 *         "key2.port", "8082"
 *     );
 *
 *     let discovery = new MemoryDiscovery();
 *     discovery.readConnections(config);
 *
 *     discovery.resolve("123", "key1", (err, connection) => {
 *         // Result: host=10.1.1.100;port=8080
 *     });
 */
class MemoryDiscovery {
    /**
     * Creates a new instance of discovery service.
     *
     * @param config    (optional) configuration with connection parameters.
     */
    constructor(config = null) {
        this._items = [];
        if (config != null)
            this.configure(config);
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        this.readConnections(config);
    }
    /**
     * Reads connections from configuration parameters.
     * Each section represents an individual Connectionparams
     *
     * @param config   configuration parameters to be read
     */
    readConnections(config) {
        this._items = [];
        let keys = config.getKeys();
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let value = config.getAsNullableString(key);
            let item = new DiscoveryItem();
            item.key = key;
            item.connection = ConnectionParams_1.ConnectionParams.fromString(value);
            this._items.push(item);
        }
    }
    /**
     * Registers connection parameters into the discovery service.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a key to uniquely identify the connection parameters.
     * @param credential        a connection to be registered.
     * @param callback 			callback function that receives a registered connection or error.
     */
    register(correlationId, key, connection, callback) {
        let item = new DiscoveryItem();
        item.key = key;
        item.connection = connection;
        this._items.push(item);
        if (callback)
            callback(null, null);
    }
    /**
     * Resolves a single connection parameters by its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a key to uniquely identify the connection.
     * @param callback          callback function that receives found connection or error.
     */
    resolveOne(correlationId, key, callback) {
        let connection = null;
        for (let index = 0; index < this._items.length; index++) {
            let item = this._items[index];
            if (item.key == key && item.connection != null) {
                connection = item.connection;
                break;
            }
        }
        callback(null, connection);
    }
    /**
     * Resolves all connection parameters by their key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a key to uniquely identify the connections.
     * @param callback          callback function that receives found connections or error.
     */
    resolveAll(correlationId, key, callback) {
        let connections = [];
        for (let index = 0; index < this._items.length; index++) {
            let item = this._items[index];
            if (item.key == key && item.connection != null)
                connections.push(item.connection);
        }
        callback(null, connections);
    }
}
exports.MemoryDiscovery = MemoryDiscovery;
//# sourceMappingURL=MemoryDiscovery.js.map