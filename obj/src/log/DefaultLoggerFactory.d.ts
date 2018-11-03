/** @module log */
import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates [[ILogger]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[NullLogger]]
 * @see [[ConsoleLogger]]
 * @see [[CompositeLogger]]
 */
export declare class DefaultLoggerFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLoggerDescriptor: Descriptor;
    static readonly ConsoleLoggerDescriptor: Descriptor;
    static readonly CompositeLoggerDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
