"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module test */
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const Factory_1 = require("../build/Factory");
const Shutdown_1 = require("./Shutdown");
/**
 * Creates test components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[Shutdown]]
 */
class DefaultTestFactory extends Factory_1.Factory {
    /**
     * Create a new instance of the factory.
     */
    constructor() {
        super();
        this.registerAsType(DefaultTestFactory.ShutdownDescriptor, Shutdown_1.Shutdown);
    }
}
DefaultTestFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "factory", "test", "default", "1.0");
DefaultTestFactory.ShutdownDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "shutdown", "*", "*", "1.0");
exports.DefaultTestFactory = DefaultTestFactory;
//# sourceMappingURL=DefaultTestFactory.js.map