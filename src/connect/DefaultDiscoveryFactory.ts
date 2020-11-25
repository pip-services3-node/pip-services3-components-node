/** @module connect */
import { Descriptor } from 'pip-services3-commons-node';

import { Factory } from '../build/Factory';
import { MemoryDiscovery } from './MemoryDiscovery';

/**
 * Creates [[https://pip-services3-node.github.io/pip-services3-components-node/interfaces/connect.idiscovery.html IDiscovery]] components by their descriptors.
 * 
 * @see [[Factory]]
 * @see [[IDiscovery]]
 * @see [[MemoryDiscovery]]
 */
export class DefaultDiscoveryFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "discovery", "default", "1.0");
	public static readonly MemoryDiscoveryDescriptor = new Descriptor("pip-services", "discovery", "memory", "*", "1.0");
	
	/**
	 * Create a new instance of the factory.
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultDiscoveryFactory.MemoryDiscoveryDescriptor, MemoryDiscovery);
	}	
}
