"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module cache
 *
 * Todo: Rewrite the description
 *
 * @preferred
 * Abstract implementation of various distributed caches. We can save an object
 * to cache and retrieve it object by its key, using various implementations.
 */
var CacheEntry_1 = require("./CacheEntry");
exports.CacheEntry = CacheEntry_1.CacheEntry;
var NullCache_1 = require("./NullCache");
exports.NullCache = NullCache_1.NullCache;
var MemoryCache_1 = require("./MemoryCache");
exports.MemoryCache = MemoryCache_1.MemoryCache;
var DefaultCacheFactory_1 = require("./DefaultCacheFactory");
exports.DefaultCacheFactory = DefaultCacheFactory_1.DefaultCacheFactory;
//# sourceMappingURL=index.js.map