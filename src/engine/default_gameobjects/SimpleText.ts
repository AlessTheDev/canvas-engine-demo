import GameObject from "../GameObject";
import Scene from "../Scene";

/**
 * Simple Text to display
 */
export default class SimpleText extends GameObject {
    text: string;
    font: string;
    fontSize: number;

    /**
     * 
     * @param x text start x
     * @param y text start y
     * @param text text to write
     * @param font font family
     * @param fontSize font size (48 by default)
     */
    constructor(x: number, y: number, text: string, font: string = "sans-serif", fontSize: number = 48) {
        super(x, y, fontSize / 2 * text.length, fontSize);
        this.text = text;
        this.font = font;
        this.fontSize = fontSize;
    }
    draw(scene: Scene): void {
        scene.context.font = `${this.fontSize}px ${this.font}`;
        scene.context.fillText(this.text, this.x, this.y);
    }
}