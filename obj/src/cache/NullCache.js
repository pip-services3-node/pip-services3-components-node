"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullCache = void 0;
/**
 * Dummy cache implementation that doesn't do anything.
 *
 * It can be used in testing or in situations when cache is required
 * but shall be disabled.
 *
 * @see [[ICache]]
 */
class NullCache {
    /**
     * Retrieves cached value from the cache using its key.
     * If value is missing in the cache or expired it returns null.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique value key.
     * @param callback          callback function that receives cached value or error.
     */
    retrieve(correlationId, key, callback) {
        callback(null, null);
    }
    /**
     * Stores value in the cache with expiration time.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique value key.
     * @param value             a value to store.
     * @param timeout           expiration timeout in milliseconds.
     * @param callback          (optional) callback function that receives an error or null for success
     */
    store(correlationId, key, value, timeout, callback) {
        callback(null, value);
    }
    /**
     * Removes a value from the cache by its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a unique value key.
     * @param callback          (optional) callback function that receives an error or null for success
     */
    remove(correlationId, key, callback) {
        callback(null);
    }
}
exports.NullCache = NullCache;
//# sourceMappingURL=NullCache.js.map