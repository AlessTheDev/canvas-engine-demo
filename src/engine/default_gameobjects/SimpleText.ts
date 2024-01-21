import GameObject from "../GameObject";
import Scene from "../Scene";
import Vector from "../Vector";

/**
 * SimpleText Class
 * 
 * The `SimpleText` class represents a basic text object to be displayed in a scene.
 * It extends the base `GameObject` class and provides functionality for rendering text.
 * 
 * @extends GameObject
 */
export default class SimpleText extends GameObject {
    /**
     * The text content to be displayed.
     */
    text: string;

    /**
     * The font family for the text.
     */
    font: string;

    /**
     * The font size for the text (default is 48).
     */
    fontSize: number;

    /**
     * Constructor for the SimpleText class.
     * 
     * @param position - The initial position of the text.
     * @param text - The text content to be displayed.
     * @param font - The font family for the text (default is "sans-serif").
     * @param fontSize - The font size for the text (default is 48).
     */
    constructor(position: Vector, text: string, font: string = "sans-serif", fontSize: number = 48) {
        super(position, new Vector(fontSize / 2 * text.length, fontSize));
        this.text = text;
        this.font = font;
        this.fontSize = fontSize;
    }
    draw(scene: Scene): void {
        scene.context.font = `${this.fontSize}px ${this.font}`;
        scene.context.fillText(this.text, this.position.x, this.position.y);
    }
}