import GameObject from "../engine/GameObject"
import Scene from "../engine/Scene";

export default class Particle extends GameObject{
    private angle: number;
    private speed: number;
    private color: string;

    private changeSize: boolean;
    private drag: number;

    private spawnTime = Date.now();

    resizeDelay = 50;

    constructor(x: number, y: number, size: number, angle: number, speed: number, color: string = "white", changeSize = false, drag = 0.1) {
        super(x, y, size, size);
        
        this.speed = speed;
        this.color = color;
        this.angle = angle;

        this.changeSize = changeSize;
        this.drag = drag;
    }

    draw(scene: Scene): void {
        const ctx = scene.context;
        ctx?.beginPath();
        ctx?.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx?.fill();
        ctx?.closePath();
    }

    update(scene: Scene): void {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.setSize(this.width - (this.changeSize && Date.now() - this.spawnTime > this.resizeDelay ? 0.1 : 0))
        if(this.width <= 0){
            this.width = 0;
            scene.remove(this);
        }

        this.speed -= this.speed > 0 ? this.drag : 0;
    }

    setSize(size: number){
        this.height = size;
        this.width = size;
    }
}