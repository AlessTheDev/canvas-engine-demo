import FloatingObject from "../../objects/FloatingObject";
import GameObject from "../GameObject";
import Scene from "../Scene";
import SceneManager from "../SceneManager";
import ColliderComponent from "../default_components/ColliderComponent";
import { resolveCollision } from "../utils";

export default class PhysicsObject extends GameObject {
    velocity = {
        x: 0,
        y: 0
    };

    mass: number = 1;

    private collider: ColliderComponent | null = null;

    staticMode: boolean;

    constructor(x: number, y: number, width: number, height: number, mass: number, staticMode = false) {
        super(x, y, width, height);
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
        if (this.x <= 0 || this.x >= SceneManager.instance.activeScene.getCanvasWidth()) {
            this.velocity.x *= -1;
        }
        //Movement
        this.y += this.velocity.y;
        this.x += this.velocity.x;
    }

    handleCollisions(collisions: GameObject[]): void {
        if (this.staticMode) return;

        let collisionObject = collisions[0];
        resolveCollision(this, collisionObject as PhysicsObject);
        //TODO! Respawn particles
    }
}