import GameObject from "../engine/GameObject"
import Scene from "../engine/Scene";
import Vector from "../engine/Vector";

export default class Particle extends GameObject{
    private angle: number;
    private speed: number;
    private color: string;

    private changeSize: boolean;
    private drag: number;

    private spawnTime = Date.now();

    resizeDelay = 50;

    constructor(position: Vector, size: number, angle: number, speed: number, color: string = "white", changeSize = false, drag = 0.1) {
        super(position, Vector.multiply(Vector.one, size));
        
        this.renderingLayer = 2;

        this.speed = speed;
        this.color = color;
        this.angle = angle;

        this.changeSize = changeSize;
        this.drag = drag;
    }

    draw(scene: Scene): void {
        const ctx = scene.context;
        ctx?.beginPath();
        ctx?.arc(this.position.x, this.position.y, this.scale.x, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx?.fill();
        ctx?.closePath();
    }

    update(scene: Scene): void {
        this.position = Vector.add(this.position, new Vector(Math.cos(this.angle) * this.speed, Math.sin(this.angle) * this.speed));

        this.setSize(this.scale.x - (this.changeSize && Date.now() - this.spawnTime > this.resizeDelay ? 0.1 : 0))
        if(this.scale.x <= 0){
            this.scale = new Vector(0, this.scale.y)
            scene.remove(this);
        }

        this.speed -= this.speed > 0 ? this.drag : 0;
    }

    setSize(size: number){
        this.scale = Vector.multiply(Vector.one, size)
    }
}