import GameObject from "../engine/GameObject"
import Scene from "../engine/Scene";

export default class WaterParticle extends GameObject{
    private direction: number;

    private forceY: number;

    private spawnTime = Date.now();

    resizeDelay = 50;

    constructor(x: number, y: number, size: number, direction: number, startForce: number = 2) {
        super(x, y, size, size);
        
        this.forceY = startForce;
        this.direction = direction;
    }

    draw(scene: Scene): void {
        const ctx = scene.context;
        ctx?.beginPath();
        ctx?.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
        ctx!.fillStyle = "#cfc2ff";
        ctx?.fill();
        ctx?.closePath();
    }

    update(scene: Scene): void {
        this.x += 0.01 * this.direction;
        this.y -= this.forceY;

        this.forceY -= 0.055;

        this.setSize(this.width - (Date.now() - this.spawnTime > this.resizeDelay ? 0.05 : 0))
        if(this.width <= 0){
            this.width = 0;
            scene.remove(this);
        }
    }

    setSize(size: number){
        this.height = size;
        this.width = size;
    }
}