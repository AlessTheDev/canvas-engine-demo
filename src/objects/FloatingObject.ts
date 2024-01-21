import GameObject from "../engine/GameObject";
import Scene from "../engine/Scene";
import SceneManager from "../engine/SceneManager";
import Vector from "../engine/Vector";
import CircleColliderComponent from "../engine/default_components/CircleColliderComponent";
import PhysicsObject from "../engine/default_gameobjects/PhysicsObject";
import { distance, randomIntFromRange, resolveCollision } from "../engine/utils";
import Particle from "./Particle";
import WaterParticle from "./WaterParticle";

export default class FloatingObject extends PhysicsObject {
    private image: HTMLImageElement;

    private direction = 1;
    private currentRotation = 0;

    private lastCollisionTime = Date.now();

    constructor(spawnPosition: Vector, imageSrc: string, size: number, mass: number) {
        super(spawnPosition, Vector.multiply(Vector.one, size), mass);
        this.assignCollider(new CircleColliderComponent(this, size / 2));

        this.renderingLayer = 1;

        this.image = new Image();
        this.image.src = imageSrc;
    }

    update(scene: Scene): void {
        this.currentRotation += 0.2 * this.direction;
        super.update(scene);
    }

    draw(scene: Scene): void {
        scene.context.save();

        // Translate to the center of the object
        scene.context.translate(this.position.x - this.scale.x / 2, this.position.y - this.scale.y / 2);

        // Rotate around the center of the object
        scene.context.rotate(this.currentRotation * Math.PI / 180);

        // Draw the image at the translated and rotated position
        scene.context.drawImage(this.image, -this.scale.x / 2, -this.scale.y / 2, this.scale.x, this.scale.y);

        // Restore the context to its original state
        scene.context.restore();

    }

    setImageSrc(src: string) {
        this.image.src = src;
    }

    handleCollisions(collisions: GameObject[]): void {
        if (this.staticMode) return;

        if (collisions[0] instanceof FloatingObject) {
            resolveCollision(this, collisions[0]);
            if (Date.now() - this.lastCollisionTime >= 30) {
                const pivot1 = new Vector(
                    this.position.x - this.scale.x / 2,
                    this.position.y - this.scale.y / 2
                );
                const pivot2 = new Vector(
                    collisions[0].position.x - collisions[0].scale.x / 2,
                    collisions[0].position.y - collisions[0].scale.y / 2
                );
                // pivotX1 - (pivotX1 - pivotX2), pivotY1 - (pivotY1 - pivotY2)
                this.spawnParticles(Vector.subtract(pivot1, Vector.subtract(pivot1, pivot2)), 5);
            }

            this.lastCollisionTime = Date.now();
        }
        else {
            this.velocity.y = this.velocity.y * 0.8 - 1;
            this.velocity.x += distance(this, collisions[0]) / 4000 - this.velocity.x / 100;
            this.direction = Math.sign(this.position.x - collisions[0].position.x) * randomIntFromRange(1, 3);

            if (Date.now() - this.lastCollisionTime >= 30) {
                this.spawnWaterParticles(this.position, 4);
            }

            this.lastCollisionTime = Date.now();
        }
    }

    private spawnParticles(position: Vector, n: number) {
        let angleIncrement = 360 / n;
        const s = SceneManager.instance.activeScene;
        for (let i = 0; i < n; i++) {
            s.addTopRendering(new Particle(position, 5, angleIncrement * i, 5, "white", true));
        }
    }

    private spawnWaterParticles(position: Vector, n: number) {
        let angleIncrement = 180 / n;
        const s = SceneManager.instance.activeScene;
        for (let i = 0; i < n; i++) {
            let angle = -90 + (angleIncrement * i);
            s.addTopRendering(new WaterParticle(position, 5, angle * 2));
        }
    }

}