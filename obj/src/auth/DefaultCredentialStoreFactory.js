"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module auth */
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const Factory_1 = require("../build/Factory");
const MemoryCredentialStore_1 = require("./MemoryCredentialStore");
/**
 * Creates [[ICredentialStore]] components by their descriptors.
 *
 * @see [[IFactory]]
 * @see [[ICredentialStore]]
 * @see [[MemoryCredentialStore]]
 */
class DefaultCredentialStoreFactory extends Factory_1.Factory {
    /**
     * Create a new instance of the factory.
     */
    constructor() {
        super();
        this.registerAsType(DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor, MemoryCredentialStore_1.MemoryCredentialStore);
    }
}
DefaultCredentialStoreFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "factory", "credential-store", "default", "1.0");
DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor = new pip_services3_commons_node_1.Descriptor("pip-services", "credential-store", "memory", "*", "1.0");
exports.DefaultCredentialStoreFactory = DefaultCredentialStoreFactory;
//# sourceMappingURL=DefaultCredentialStoreFactory.js.map