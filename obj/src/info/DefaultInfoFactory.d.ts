/** @module info */
import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates information components by their descriptors.
 *
 * @see [[IFactory]]
 * @see [[ContextInfo]]
 */
export declare class DefaultInfoFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly ContextInfoDescriptor: Descriptor;
    static readonly ContainerInfoDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
