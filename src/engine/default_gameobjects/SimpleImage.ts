import GameObject from "../GameObject";
import Scene from "../Scene";

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
    constructor(x: number, y: number, width: number, height: number, src: string) {
        super(x, y, width, height);
        this.Image = new Image();
        this.Image.src = src;
    }
    draw(scene: Scene): void {
        scene.context.drawImage(this.Image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    /**
     * Sets the image source
     * @param src the new image source
     */
    setImageSrc(src: string){
        this.Image.src = src;
    }
}