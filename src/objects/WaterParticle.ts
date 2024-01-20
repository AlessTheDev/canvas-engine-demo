import GameObject from "../engine/GameObject"
import Scene from "../engine/Scene";
import Vector from "../engine/Vector";

export default class WaterParticle extends GameObject {
    private direction: number;

    private forceY: number;

    private spawnTime = Date.now();

    resizeDelay = 50;

    constructor(position: Vector, size: number, direction: number, startForce: number = 2) {
        super(position, size, size);

        this.renderingLayer = 2;

        this.forceY = startForce;
        this.direction = direction;
    }

    draw(scene: Scene): void {
        const ctx = scene.context;
        ctx?.beginPath();
        ctx?.arc(this.position.x, this.position.y, this.width, 0, Math.PI * 2, false);
        ctx!.fillStyle = "#cfc2ff";
        ctx?.fill();
        ctx?.closePath();
    }

    update(scene: Scene): void {
        this.position = Vector.add(this.position, new Vector(0.01 * this.direction, -this.forceY));

        this.forceY -= 0.055;

        this.setSize(this.width - (Date.now() - this.spawnTime > this.resizeDelay ? 0.05 : 0))
        if (this.width <= 0) {
            this.width = 0;
            scene.remove(this);
        }
    }

    setSize(size: number) {
        this.height = size;
        this.width = size;
    }
}