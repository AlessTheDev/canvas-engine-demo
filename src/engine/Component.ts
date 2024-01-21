import GameObject from "./GameObject";
import Scene from "./Scene";

/**
 * Component Class
 * 
 * The `Component` class is an abstract base class for creating components to be attached to GameObjects.
 * It provides a common structure for components with enable/disable functionality and a lifecycle method (`update`).
 * 
 * @abstract
 */
export default abstract class Component<T> {
    /**
     * Determines if the component is enabled or disabled.
     */
    enabled = true;

    /**
     * Constructor for the Component class.
     */
    constructor() {}

    /**
     * Initialization method that needs access to the scene and the associated GameObject.
     * Override this method in subclasses if initialization is required.
     * 
     * @param scene - The scene connected to the component.
     * @param object - The GameObject associated with the component.
     */
    init(scene: Scene, object: GameObject): void {}

    /**
     * Abstract method to be implemented by subclasses.
     * This method runs before every frame and contains the main logic of the component.
     * 
     * @param object - The generic type (e.g., GameObject) associated with the component.
     */
    abstract update(object: T): void;

    /**
     * Helper method to run the update method only if the component is enabled.
     * 
     * @param object - The generic type (e.g., GameObject) associated with the component.
     */
    runUpdate(object: T): void {
        if (!this.enabled) return;
        this.update(object);
    }
}
