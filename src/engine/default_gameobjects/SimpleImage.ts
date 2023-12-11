import GameObject from "../GameObject";
import Scene from "../Scene";

export default class SimpleImage extends GameObject {
    private Image: HTMLImageElement;

    
    public get image() : HTMLImageElement {
        return this.Image;
    }
    

    constructor(x: number, y: number, width: number, height: number, src: string) {
        super(x, y, width, height);
        this.Image = new Image();
        this.Image.src = src;
    }
    draw(scene: Scene): void {
        scene.context.drawImage(this.Image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    setImageSrc(src: string){
        this.Image.src = src;
    }
}