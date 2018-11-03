/** @module config */
import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates [[IConfigReader]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[MemoryConfigReader]]
 * @see [[JsonConfigReader]]
 * @see [[YamlConfigReader]]
 */
export declare class DefaultConfigReaderFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryConfigReaderDescriptor: Descriptor;
    static readonly JsonConfigReaderDescriptor: Descriptor;
    static readonly YamlConfigReaderDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
