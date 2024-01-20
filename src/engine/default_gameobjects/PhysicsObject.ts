import GameObject from "../GameObject";
import Scene from "../Scene";
import SceneManager from "../SceneManager";
import Vector from "../Vector";
import ColliderComponent from "../default_components/ColliderComponent";
import { resolveCollision } from "../utils";

/**
 * Class to simulate simple physics (use only for simple stuff, or make your own)
 */
export default class PhysicsObject extends GameObject {
    velocity = {
        x: 0,
        y: 0
    };

    mass: number = 1;

    private collider: ColliderComponent | null = null;

    staticMode: boolean;

    /**
     * @param mass the object mass
     * @param staticMode if true, it won't be affected by gravity 
     */
    constructor(position: Vector, width: number, height: number, mass: number, staticMode = false) {
        super(position, width, height);
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
        //Movement
        this.position = Vector.add(this.position, new Vector(this.velocity.x, this.velocity.y));
    }

    handleCollisions(collisions: GameObject[]): void {
        if (this.staticMode) return;

        let collisionObject = collisions[0];
        resolveCollision(this, collisionObject as PhysicsObject);
    }
}