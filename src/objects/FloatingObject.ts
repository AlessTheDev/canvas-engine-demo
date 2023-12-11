import GameObject from "../engine/GameObject";
import Scene from "../engine/Scene";
import CircleColliderComponent from "../engine/default_components/CircleColliderComponent";
import PhysicsObject from "../engine/default_gameobjects/PhysicsObject";
import { distance, randomIntFromRange, resolveCollision } from "../engine/utils";

export default class FloatingObject extends PhysicsObject {
    private image: HTMLImageElement;

    constructor(spawnX: number, spawnY: number, imageSrc: string, size: number, mass: number) {
        super(spawnX, spawnY, size, size, mass);
        this.assignCollider(new CircleColliderComponent(this, size / 2));

        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw(scene: Scene): void {
        scene.context.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    setImageSrc(src: string) {
        this.image.src = src;
    }

    handleCollisions(collisions: GameObject[]): void {
        if (this.staticMode) return;

        if (collisions[0] instanceof FloatingObject) {
            resolveCollision(this, collisions[0]);
        }
        else {
            this.velocity.y = this.velocity.y * 0.7 - 1;
            this.velocity.x += distance(this, collisions[0]) / 4000 - this.velocity.x / 100;
        }
    }

}