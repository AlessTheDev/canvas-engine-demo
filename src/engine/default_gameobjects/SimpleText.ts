import GameObject from "../GameObject";
import Scene from "../Scene";

export default class SimpleText extends GameObject {
    text: string;
    font: string;
    fontSize: number;

    constructor(x: number, y: number, text: string, font: string = "sans-serif", fontSize: number = 48) {
        super(x, y, fontSize / 2 * text.length, fontSize, () => { });
        this.text = text;
        this.font = font;
        this.fontSize = fontSize;
    }
    draw(scene: Scene): void {
        scene.context.font = `${this.fontSize}px ${this.font}`;
        scene.context.fillText(this.text, this.x, this.y);
    }
}