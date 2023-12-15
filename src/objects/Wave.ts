import GameObject from "../engine/GameObject";
import Scene from "../engine/Scene";
import SceneManager from "../engine/SceneManager";
import CircleColliderComponent from "../engine/default_components/CircleColliderComponent";
import PhysicsObject from "../engine/default_gameobjects/PhysicsObject";
import { randomIntFromRange } from "../engine/utils";

interface WaveInfo {
    waveLength: number;
    amplitude: number;
    frequency: number;
}
export default class Wave extends GameObject {
    strokeThickness: number;
    rectThickness: number;

    waveInfo: WaveInfo;

    turbulanceModifier = 1;

    gradualColor: boolean;

    colorH: number;

    private sinOffset = 0;
    private turbulance = 0;

    private colliders: PhysicsObject[] = [];

    private time = 0;
    private timeIncrement = 0.1;

    constructor(
        y: number,
        strokeThickness: number,
        rectThickness: number,
        colorH: number,
        waveInfo: WaveInfo = {
            waveLength: 0.005,
            amplitude: 20,
            frequency: 0.01
        },
        gradual = true
    ) {
        const scene = SceneManager.instance.activeScene;
        super(0, y, scene.getCanvasWidth(), scene.getCanvasHeight() - y);

        this.waveInfo = waveInfo;

        this.strokeThickness = strokeThickness;
        this.rectThickness = rectThickness;
        this.colorH = colorH;

        this.gradualColor = gradual;

        //Add Colliders to wave
        let nextBallSize = randomIntFromRange(100, 120);
        let nextBallPosX = nextBallSize - 100;
        for (let i = 0; i < scene.getCanvasWidth() / 120 + 1; i++) {
            let ballSize = nextBallSize;
            nextBallSize = randomIntFromRange(100, 120);

            let ball = new PhysicsObject(nextBallPosX, y + 130, ballSize, ballSize, 1, true);
            ball.assignCollider(new CircleColliderComponent(ball, ballSize));
            scene.add(ball);

            this.colliders.push(ball);

            nextBallPosX += ballSize + nextBallSize / 2;
        }
    }

    draw(scene: Scene): void {
        let drawingY = 0; // Where we are drawing the wave

        let colorChange = 0;

        while (this.y + drawingY < scene.getCanvasHeight() + 20) {
            // Draw wave line
            const ctx = scene.context;
            ctx.beginPath();
            ctx.moveTo(0, this.y);
            ctx.lineWidth = this.strokeThickness;

            const { waveLength, amplitude } = this.waveInfo;
            for (let i = 0; i < scene.getCanvasWidth(); i += this.rectThickness) {
                let val = Math.sin(i * waveLength + this.sinOffset) * amplitude;
                // Add more turbulance
                val *= Math.cos(this.sinOffset + Math.sin(this.turbulance) * -1) * this.turbulanceModifier;
                ctx.rect(i, this.y + drawingY + val, this.rectThickness, this.rectThickness);
            }
            ctx.strokeStyle = `hsl(${this.colorH}, 100%, ${Math.max(35, (90 - (colorChange * 15)))}%)`;

            ctx.stroke();

            drawingY += this.rectThickness;

            colorChange += this.gradualColor ? 1 : 0;
        }
        this.sinOffset += this.waveInfo.frequency;
        this.turbulance += this.waveInfo.frequency * this.turbulanceModifier;
    }

    update(scene: Scene): void {
        this.colliders.forEach((collider) => {
            collider.y += Math.sin(this.time) * 0.7;
            //SceneManager.debugObject(collider)
        })
        this.time += this.timeIncrement
    }
}