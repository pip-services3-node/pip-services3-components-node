"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module connect */
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const Factory_1 = require("../build/Factory");
const MemoryDiscovery_1 = require("./MemoryDiscovery");
/**
 * Creates [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/interfaces/connect.idiscovery.html IDiscovery]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[IDiscovery]]
 * @see [[MemoryDiscovery]]
 */
class DefaultDiscoveryFactory extends Factory_1.Factory {
    /**
     * Create a new instance of the factory.
     */
    constructor() {
        super();
        this.registerAsType(DefaultDiscoveryFactory.MemoryDiscoveryDescriptor, MemoryDiscovery_1.MemoryDiscovery);
    }
}
DefaultDiscoveryFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "factory", "discovery", "default", "1.0");
DefaultDiscoveryFactory.MemoryDiscoveryDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "discovery", "memory", "*", "1.0");
exports.DefaultDiscoveryFactory = DefaultDiscoveryFactory;
//# sourceMappingURL=DefaultDiscoveryFactory.js.map