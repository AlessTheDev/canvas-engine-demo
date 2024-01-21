import Component from "../Component";
import GameObject from "../GameObject";

/**
 * ColliderComponent Class
 * 
 * The `ColliderComponent` is an abstract base class for defining collider components.
 * It provides a common interface for collider components and declares an abstract method 
 * `getCollisions()` to be implemented by its subclasses for detecting collisions with other GameObjects.
 * 
 * @extends Component<GameObject>
 * @abstract
 */
export default abstract class ColliderComponent extends Component<GameObject> {
    /**
     * Constructor for the ColliderComponent.
     * Initializes the base collider component.
     */
    constructor() {
        super();
    }

    /**
     * Abstract method to be implemented by subclasses.
     * 
     * This method should be overridden in subclasses to provide specific collision detection logic.
     * 
     * @returns An array of GameObjects that are colliding with the associated GameObject.
     */
    abstract getCollisions(): GameObject[];
}
