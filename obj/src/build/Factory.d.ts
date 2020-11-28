/** @module build */
import { IFactory } from './IFactory';
/**
 * Basic component factory that creates components using registered types and factory functions.
 *
 * #### Example ###
 *
 *     let factory = new Factory();
 *
 *     factory.registerAsType(
 *         new Descriptor("mygroup", "mycomponent1", "default", "*", "1.0"),
 *         MyComponent1
 *     );
 *     factory.register(
 *         new Descriptor("mygroup", "mycomponent2", "default", "*", "1.0"),
 *         (locator) => {
 *             return new MyComponent2();
 *         }
 *     );
 *
 *     factory.create(new Descriptor("mygroup", "mycomponent1", "default", "name1", "1.0"))
 *     factory.create(new Descriptor("mygroup", "mycomponent2", "default", "name2", "1.0"))
 *
 * @see [[https://pip-services3-node.github.io/pip-services3-commons-node/classes/refer.descriptor.html Descriptor]]
 * @see [[IFactory]]
 */
export declare class Factory implements IFactory {
    private _registrations;
    /**
     * Registers a component using a factory method.
     *
     * @param locator 	a locator to identify component to be created.
     * @param factory   a factory function that receives a locator and returns a created component.
     */
    register(locator: any, factory: (locator: any) => any): void;
    /**
     * Registers a component using its type (a constructor function).
     *
     * @param locator 		a locator to identify component to be created.
     * @param type 			a component type.
     */
    registerAsType(locator: any, type: any): void;
    /**
     * Checks if this factory is able to create component by given locator.
     *
     * This method searches for all registered components and returns
     * a locator for component it is able to create that matches the given locator.
     * If the factory is not able to create a requested component is returns null.
     *
     * @param locator 	a locator to identify component to be created.
     * @returns			a locator for a component that the factory is able to create.
     */
    canCreate(locator: any): any;
    /**
     * Creates a component identified by given locator.
     *
     * @param locator 	a locator to identify component to be created.
     * @returns the created component.
     *
     * @throws a CreateException if the factory is not able to create the component.
     */
    create(locator: any): any;
}
