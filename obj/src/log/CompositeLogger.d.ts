/** @module log */
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
/**
 * Aggregates all loggers from component references under a single component.
 *
 * It allows to log messages and conveniently send them to multiple destinations.
 *
 * ### References ###
 *
 * - <code>\*:logger:\*:\*:1.0</code> 	(optional) [[ILogger]] components to pass log messages
 *
 * @see [[ILogger]]
 *
 * ### Example ###
 *
 *     class MyComponent implements IConfigurable, IReferenceable {
 *         private _logger: CompositeLogger = new CompositeLogger();
 *
 *         public configure(config: ConfigParams): void {
 *             this._logger.configure(config);
 *             ...
 *         }
 *
 *         public setReferences(references: IReferences): void {
 *             this._logger.setReferences(references);
 *             ...
 *         }
 *
 *         public myMethod(string correlationId): void {
 *             this._logger.debug(correlationId, "Called method mycomponent.mymethod");
 *             ...
 *         }
 *     }
 *
 */
export declare class CompositeLogger extends Logger implements IReferenceable {
    private readonly _loggers;
    /**
     * Creates a new instance of the logger.
     *
     * @param references 	references to locate the component dependencies.
     */
    constructor(references?: IReferences);
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    /**
     * Writes a log message to the logger destination(s).
     *
     * @param level             a log level.
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             an error object associated with this message.
     * @param message           a human-readable message to log.
     */
    protected write(level: LogLevel, correlationId: string, error: Error, message: string): void;
}
