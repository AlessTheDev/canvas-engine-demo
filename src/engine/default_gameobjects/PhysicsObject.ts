import GameObject from "../GameObject";
import Scene from "../Scene";
import SceneManager from "../SceneManager";
import Vector from "../Vector";
import ColliderComponent from "../default_components/ColliderComponent";
import { resolveCollision } from "../utils";

/**
 * PhysicsObject Class
 * 
 * The `PhysicsObject` class extends the base `GameObject` class to simulate simple physics.
 * It includes features such as velocity, mass, and collision handling. Use it for basic, not accurate physics simulations.
 * 
 * @extends GameObject
 */
export default class PhysicsObject extends GameObject {
    /**
     * Object's velocity in the x and y directions.
     */
    velocity = {
        x: 0,
        y: 0
    };

    /**
     * The mass of the object, affecting its response to forces.
     */
    mass: number = 1;

    /**
     * Determines if the object is in static mode (not affected by gravity or collisions physics).
     */
    staticMode: boolean;

    private collider: ColliderComponent | null = null;

    /**
    * Constructor for the PhysicsObject class.
    * 
    * @param position - The initial position of the physics object.
    * @param scale - The initial scale of the physics object.
    * @param mass - The mass of the object.
    * @param staticMode - If true, the object won't be affected by gravity or collisions physics.
    */
    constructor(position: Vector, scale: Vector, mass: number, staticMode = false) {
        super(position, scale);
        this.mass = mass;

        this.staticMode = staticMode;
    }

    assignCollider(collider: ColliderComponent) {
        this.useComponent(collider);
        this.collider = collider;
    }

    draw(scene: Scene) {

    }

    update(scene: Scene): void {
        if (!this.collider) {
            console.log("ERROR: the object doesn't have a collider");
            return;
        }

        const collisions = this.collider.getCollisions();
        if (collisions.length > 0) {
            this.handleCollisions(collisions);
        } else if (!this.staticMode) {
            this.velocity.y += 0.05;
        }

        if (this.staticMode) return;

        // Bounce if it hits the canvas edge
        if (this.position.x <= 0 || this.position.x >= SceneManager.instance.activeScene.getCanvasWidth()) {
            this.velocity.x *= -1;
        }
        // Movement
        this.position = Vector.add(this.position, new Vector(this.velocity.x, this.velocity.y));
    }

    /**
     * Handles collisions with other objects.
     * 
     * @param collisions - An array of GameObjects that are colliding with the physics object.
     */
    handleCollisions(collisions: GameObject[]): void {
        if (this.staticMode) return;

        let collisionObject = collisions[0];
        resolveCollision(this, collisionObject as PhysicsObject);
    }
}