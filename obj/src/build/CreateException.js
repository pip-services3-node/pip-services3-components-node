"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module build */
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
/**
 * Error raised when factory is not able to create requested component.
 *
 * @see [[https://rawgit.com/pip-services-node/pip-services3-commons-node/master/doc/api/classes/errors.internalexception.html InternalException]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services3-commons-node/master/doc/api/classes/errors.applicationexception.html ApplicationException]] (in the PipServices "Commons" package)
 */
class CreateException extends pip_services3_commons_node_1.InternalException {
    /**
     * Creates an error instance and assigns its values.
     *
     * @param correlation_id    (optional) a unique transaction id to trace execution through call chain.
     * @param messageOrLocator  human-readable error or locator of the component that cannot be created.
     */
    constructor(correlationId = null, messageOrLocator) {
        super(correlationId, "CANNOT_CREATE", typeof (messageOrLocator) == 'string' ? messageOrLocator
            : "Requested component " + messageOrLocator + " cannot be created");
        if (typeof (messageOrLocator) != 'string' && messageOrLocator != null)
            this.withDetails("locator", messageOrLocator);
    }
}
exports.CreateException = CreateException;
//# sourceMappingURL=CreateException.js.map