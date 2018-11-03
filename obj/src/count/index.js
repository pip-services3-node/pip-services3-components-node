"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module count
 *
 * Todo: Rewrite this description
 *
 * @preferred
 * Performance counters. They show non-functional characteristics about how the code works,
 * like: times called, response time, objects saved/processed. Using these numbers, we can
 * show how the code works in the system – how stable, fast, expandable it is.
 */
var Timing_1 = require("./Timing");
exports.Timing = Timing_1.Timing;
var CachedCounters_1 = require("./CachedCounters");
exports.CachedCounters = CachedCounters_1.CachedCounters;
var NullCounters_1 = require("./NullCounters");
exports.NullCounters = NullCounters_1.NullCounters;
var LogCounters_1 = require("./LogCounters");
exports.LogCounters = LogCounters_1.LogCounters;
var CompositeCounters_1 = require("./CompositeCounters");
exports.CompositeCounters = CompositeCounters_1.CompositeCounters;
var CounterType_1 = require("./CounterType");
exports.CounterType = CounterType_1.CounterType;
var Counter_1 = require("./Counter");
exports.Counter = Counter_1.Counter;
var DefaultCountersFactory_1 = require("./DefaultCountersFactory");
exports.DefaultCountersFactory = DefaultCountersFactory_1.DefaultCountersFactory;
//# sourceMappingURL=index.js.map