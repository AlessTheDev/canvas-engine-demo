import Scene from "../Scene";
import SimpleImage from "./SimpleImage";

export default class Background extends SimpleImage{
    private cover: boolean;
    constructor(backgroundSrc: string, cover = false){
        super(0, 0, 0, 0, backgroundSrc);
        this.cover = cover;
    }
    update(scene: Scene): void {
        if(this.cover){
            this.updateCover(scene);
            return;    
        }

        this.width = scene.getCanvasWidth();
        this.height = scene.getCanvasHeight();

        this.x = this.width / 2;
        this.y = this.height / 2;
    }

    private updateCover(scene: Scene): void {
        const canvasWidth = scene.getCanvasWidth();
        const canvasHeight = scene.getCanvasHeight();
        const canvasAspectRatio = canvasWidth / canvasHeight;

        const imageAspectRatio = this.image.width / this.image.height;

        if (canvasAspectRatio > imageAspectRatio) {
            // Canvas is wider than the image
            this.width = canvasWidth;
            this.height = canvasWidth / imageAspectRatio;
        } else {
            // Canvas is taller than the image
            this.height = canvasHeight;
            this.width = canvasHeight * imageAspectRatio;
        }

        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
    }
}