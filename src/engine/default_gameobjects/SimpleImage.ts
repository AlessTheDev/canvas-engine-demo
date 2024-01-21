import GameObject from "../GameObject";
import Scene from "../Scene";
import Vector from "../Vector";

/**
 * Simple image to display
 */
export default class SimpleImage extends GameObject {
    private Image: HTMLImageElement;

    public get image() : HTMLImageElement {
        return this.Image;
    }

    /**
     * 
     * @param x x
     * @param y y
     * @param width the width of the image 
     * @param height the height of the image
     * @param src the image source url
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