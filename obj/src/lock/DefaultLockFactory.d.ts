/** @module lock */
import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates [[ILock]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[ILock]]
 * @see [[MemoryLock]]
 * @see [[NullLock]]
 */
export declare class DefaultLockFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLockDescriptor: Descriptor;
    static readonly MemoryLockDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
