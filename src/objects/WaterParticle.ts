import GameObject from "../engine/GameObject"
import Scene from "../engine/Scene";
import Vector from "../engine/Vector";

export default class WaterParticle extends GameObject {
    private direction: number;

    private forceY: number;

    private spawnTime = Date.now();

    resizeDelay = 50;

    constructor(position: Vector, size: number, direction: number, startForce: number = 2) {
        super(position, Vector.multiply(Vector.one, size));

        this.renderingLayer = 2;

        this.forceY = startForce;
        this.direction = direction;
    }

    draw(scene: Scene): void {
        const ctx = scene.context;
        ctx?.beginPath();
        ctx?.arc(this.position.x, this.position.y, this.scale.x, 0, Math.PI * 2, false);
        ctx!.fillStyle = "#cfc2ff";
        ctx?.fill();
        ctx?.closePath();
    }

    update(scene: Scene): void {
        this.position = Vector.add(this.position, new Vector(0.01 * this.direction, -this.forceY));

        this.forceY -= 0.055;

        this.setSize(this.scale.x - (Date.now() - this.spawnTime > this.resizeDelay ? 0.05 : 0))
        if (this.scale.x <= 0) {
            this.scale = new Vector(0, this.scale.y)
            scene.remove(this);
        }
    }

    setSize(size: number) {
        this.scale = Vector.multiply(Vector.one, size);
    }
}