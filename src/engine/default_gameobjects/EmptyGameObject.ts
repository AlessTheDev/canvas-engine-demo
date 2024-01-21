import GameObject from "../GameObject";
import Scene from "../Scene";
import Vector from "../Vector";

/**
 * EmptyGameObject Class
 * 
 * The `EmptyGameObject` class represents a minimalistic game object with no specific rendering or functionality.
 * It serves as a base for creating GameObjects that don't require rendering or have unique behaviors.
 * 
 * @extends GameObject
 */
export default class EmptyGameObject extends GameObject {
    /**
     * Constructor for the EmptyGameObject class.
     * 
     * @param position - The initial position of the empty game object.
     * @param scale - The initial scale of the empty game object.
     */
    constructor(position: Vector = Vector.zero, scale: Vector = Vector.zero) {
        super(position, scale);
    }

    draw(scene: Scene): void {
        // No drawing logic for empty game objects
    }
}
