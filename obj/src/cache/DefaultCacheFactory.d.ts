import { Factory } from '../build/Factory';
/**
 * Creates [[ICache]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[ICache]]
 * @see [[MemoryCache]]
 * @see [[NullCache]]
 */
export declare class DefaultCacheFactory extends Factory {
    private static readonly NullCacheDescriptor;
    private static readonly MemoryCacheDescriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
