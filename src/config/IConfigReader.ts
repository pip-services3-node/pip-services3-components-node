/** @module config */
import { ConfigParams } from 'pip-services3-commons-node';
import { INotifiable } from 'pip-services3-commons-node';

/**
 * Interface for configuration readers that retrieve configuration from various sources
 * and make it available for other components.
 * 
 * Some IConfigReader implementations may support configuration parameterization.
 * The parameterization allows to use configuration as a template and inject there dynamic values.
 * The values may come from application command like arguments or environment variables.
 */
export interface IConfigReader {
    
    /**
     * Reads configuration and parameterize it with given values.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param parameters        values to parameters the configuration or null to skip parameterization.
     * @param callback          callback function that receives configuration or error.
     */
    readConfig(correlationId: string, parameters: ConfigParams, 
        callback: (err: any, config: ConfigParams) => void): void;

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