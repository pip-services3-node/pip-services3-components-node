/** @module connect */
import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/interfaces/connect.idiscovery.html IDiscovery]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[IDiscovery]]
 * @see [[MemoryDiscovery]]
 */
export declare class DefaultDiscoveryFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryDiscoveryDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
