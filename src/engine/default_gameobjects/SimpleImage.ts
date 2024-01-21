import GameObject from "../GameObject";
import Scene from "../Scene";
import Vector from "../Vector";

/**
 * SimpleImage Class
 * 
 * The `SimpleImage` class represents a basic image object to be displayed in a scene.
 * It extends the base `GameObject` class and provides functionality for loading and rendering images.
 * 
 * @extends GameObject
 */
export default class SimpleImage extends GameObject {
    private Image: HTMLImageElement;

    public get image() : HTMLImageElement {
        return this.Image;
    }

    /**
     * Constructor for the SimpleImage class.
     * 
     * @param position - The initial position of the image.
     * @param scale - The initial scale (width and height) of the image.
     * @param src - The image source URL.
     */
    constructor(position: Vector, scale: Vector, src: string) {
        super(position, scale);
        this.Image = new Image();
        this.Image.src = src;
    }

    draw(scene: Scene): void {
        scene.context.drawImage(this.Image, this.position.x - this.scale.x / 2, this.position.y - this.scale.y / 2, this.scale.x, this.scale.y);
    }

    /**
     * Sets the image source
     * @param src the new image source
     */
    setImageSrc(src: string){
        this.Image.src = src;
    }
}