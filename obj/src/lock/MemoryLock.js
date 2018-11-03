"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module lock */
const Lock_1 = require("./Lock");
/**
 * Lock that is used to synchronize execution within one process using shared memory.
 *
 * Remember: This implementation is not suitable for synchronization of distributed processes.
 *
 * ### Configuration parameters ###
 *
 * - __options:__
 *     - retry_timeout:   timeout in milliseconds to retry lock acquisition. (Default: 100)
 *
 * @see [[ILock]]
 * @see [[Lock]]
 *
 * ### Example ###
 *
 *     let lock = new MemoryLock();
 *
 *     lock.acquire("123", "key1", (err) => {
 *         if (err == null) {
 *             try {
 *                 // Processing...
 *             } finally {
 *                 lock.releaseLock("123", "key1", (err) => {
 *                     // Continue...
 *                 });
 *             }
 *         }
 *     });
 */
class MemoryLock extends Lock_1.Lock {
    constructor() {
        super(...arguments);
        this._locks = {};
    }
    /**
     * Makes a single attempt to acquire a lock by its key.
     * It returns immediately a positive or negative result.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique lock key to acquire.
     * @param ttl               a lock timeout (time to live) in milliseconds.
     * @param callback          callback function that receives a lock result or error.
     */
    tryAcquireLock(correlationId, key, ttl, callback) {
        let expireTime = this._locks[key];
        let now = new Date().getTime();
        if (expireTime == null || expireTime < now) {
            this._locks[key] = now + ttl;
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    }
    /**
     * Releases the lock with the given key.
     *
     * @param correlationId     not used.
     * @param key               the key of the lock that is to be released.
     * @param callback          (optional) the function to call once the lock has been released. Will be called
     *                          with <code>null</code>.
     */
    releaseLock(correlationId, key, callback) {
        delete this._locks[key];
        if (callback)
            callback(null);
    }
}
exports.MemoryLock = MemoryLock;
//# sourceMappingURL=MemoryLock.js.map