/** @module test */
import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates test components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[Shutdown]]
 */
export declare class DefaultTestFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly ShutdownDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
