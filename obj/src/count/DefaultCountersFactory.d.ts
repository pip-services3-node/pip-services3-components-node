/** @module count */
import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates [[ICounters]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[NullCounters]]
 * @see [[LogCounters]]
 * @see [[CompositeCounters]]
 */
export declare class DefaultCountersFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullCountersDescriptor: Descriptor;
    static readonly LogCountersDescriptor: Descriptor;
    static readonly CompositeCountersDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
