"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
/**
 * Abstract lock that implements default lock acquisition routine.
 *
 * ### Configuration parameters ###
 *
 * - __options:__
 *     - retry_timeout:   timeout in milliseconds to retry lock acquisition. (Default: 100)
 *
 * @see [[ILock]]
 */
class Lock {
    constructor() {
        this._retryTimeout = 100;
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        this._retryTimeout = config.getAsIntegerWithDefault("options.retry_timeout", this._retryTimeout);
    }
    /**
     * Makes multiple attempts to acquire a lock by its key within give time interval.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique lock key to acquire.
     * @param ttl               a lock timeout (time to live) in milliseconds.
     * @param timeout           a lock acquisition timeout.
     * @param callback          callback function that receives error or null for success.
     */
    acquireLock(correlationId, key, ttl, timeout, callback) {
        let retryTime = new Date().getTime() + timeout;
        // Try to get lock first
        this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
            if (err || result) {
                callback(err);
                return;
            }
            // Start retrying
            let interval = setInterval(() => {
                // When timeout expires return false
                let now = new Date().getTime();
                if (now > retryTime) {
                    clearInterval(interval);
                    let err = new pip_services3_commons_node_1.ConflictException(correlationId, "LOCK_TIMEOUT", "Acquiring lock " + key + " failed on timeout").withDetails("key", key);
                    callback(err);
                    return;
                }
                this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
                    if (err || result) {
                        clearInterval(interval);
                        callback(err);
                    }
                });
            }, this._retryTimeout);
        });
    }
}
exports.Lock = Lock;
//# sourceMappingURL=Lock.js.map