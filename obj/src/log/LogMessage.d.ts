/** @module log */
import { ErrorDescription } from 'pip-services3-commons-node';
/**
 * Data object to store captured log messages.
 * This object is used by [[CachedLogger]].
 */
export declare class LogMessage {
    /** The time then message was generated */
    time: Date;
    /** The source (context name) */
    source: string;
    /** This log level */
    level: string;
    /** The transaction id to trace execution through call chain. */
    correlation_id: string;
    /**
     * The description of the captured error
     *
     * [[https://rawgit.com/pip-services-node/pip-services3-commons-node/master/doc/api/classes/errors.errordescription.html ErrorDescription]]
     * [[https://rawgit.com/pip-services-node/pip-services3-commons-node/master/doc/api/classes/errors.applicationexception.html ApplicationException]]
     */
    error: ErrorDescription;
    /** The human-readable message */
    message: string;
}
