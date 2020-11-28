"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module count */
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const NullCounters_1 = require("./NullCounters");
const LogCounters_1 = require("./LogCounters");
const CompositeCounters_1 = require("./CompositeCounters");
const Factory_1 = require("../build/Factory");
/**
 * Creates [[ICounters]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[NullCounters]]
 * @see [[LogCounters]]
 * @see [[CompositeCounters]]
 */
class DefaultCountersFactory extends Factory_1.Factory {
    /**
     * Create a new instance of the factory.
     */
    constructor() {
        super();
        this.registerAsType(DefaultCountersFactory.NullCountersDescriptor, NullCounters_1.NullCounters);
        this.registerAsType(DefaultCountersFactory.LogCountersDescriptor, LogCounters_1.LogCounters);
        this.registerAsType(DefaultCountersFactory.CompositeCountersDescriptor, CompositeCounters_1.CompositeCounters);
    }
}
exports.DefaultCountersFactory = DefaultCountersFactory;
DefaultCountersFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "factory", "counters", "default", "1.0");
DefaultCountersFactory.NullCountersDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "counters", "null", "*", "1.0");
DefaultCountersFactory.LogCountersDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "counters", "log", "*", "1.0");
DefaultCountersFactory.CompositeCountersDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "counters", "composite", "*", "1.0");
//# sourceMappingURL=DefaultCountersFactory.js.map