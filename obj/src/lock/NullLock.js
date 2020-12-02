"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullLock = void 0;
/**
 * Dummy lock implementation that doesn't do anything.
 *
 * It can be used in testing or in situations when lock is required
 * but shall be disabled.
 *
 * @see [[ILock]]
 */
class NullLock {
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
        callback(null, true);
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
        callback(null);
    }
    /**
     * Releases prevously acquired lock by its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique lock key to release.
     * @param callback          callback function that receives error or null for success.
     */
    releaseLock(correlationId, key, callback) {
        if (callback)
            callback(null);
    }
}
exports.NullLock = NullLock;
//# sourceMappingURL=NullLock.js.map