import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { INotifiable } from 'pip-services3-commons-node';
/**
 * Abstract config reader that supports configuration parameterization.
 *
 * ### Configuration parameters ###
 *
 * - __parameters:__            this entire section is used as template parameters
 *     - ...
 *
 *  @see [[IConfigReader]]
 */
export declare abstract class ConfigReader implements IConfigurable {
    private _parameters;
    /**
     * Creates a new instance of the config reader.
     */
    constructor();
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Reads configuration and parameterize it with given values.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param parameters        values to parameters the configuration or null to skip parameterization.
     * @param callback          callback function that receives configuration or error.
     */
    abstract readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void): void;
    /**
     * Parameterized configuration template given as string with dynamic parameters.
     *
     * The method uses [[https://handlebarsjs.com Handlebars]] template engine.
     *
     * @param config        a string with configuration template to be parameterized
     * @param parameters    dynamic parameters to inject into the template
     * @returns a parameterized configuration string.
     */
    protected parameterize(config: string, parameters: ConfigParams): string;
    /**
     * Adds a listener that will be notified when configuration is changed
     * @param listener a listener to be added.
     */
    addChangeListener(listener: INotifiable): void;
    /**
     * Remove a previously added change listener.
     * @param listener a listener to be removed.
     */
    removeChangeListener(listener: INotifiable): void;
}
