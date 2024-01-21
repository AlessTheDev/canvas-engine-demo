import Scene from "../Scene";
import Vector from "../Vector";
import SimpleImage from "./SimpleImage";

/**
 * Simple Background 
 * @extends SimpleImage
 */
export default class Background extends SimpleImage {
    private cover: boolean;
    /**
     * 
     * @param backgroundSrc the background image source
     * @param cover if true it simulates css `cover` property
     */
    constructor(backgroundSrc: string, cover = false) {
        super(Vector.zero, Vector.zero, backgroundSrc);
        this.renderingLayer = -1;
        this.cover = cover;
    }
    update(scene: Scene): void {
        if (this.cover) {
            this.updateCover(scene);
            return;
        }

        this.scale = new Vector(
            scene.getCanvasWidth(),
            scene.getCanvasHeight()
        )
        this.position = Vector.divide(this.scale, 2);
    }

    private updateCover(scene: Scene): void {
        const canvasWidth = scene.getCanvasWidth();
        const canvasHeight = scene.getCanvasHeight();
        const canvasAspectRatio = canvasWidth / canvasHeight;

        const imageAspectRatio = this.image.width / this.image.height;

        if (canvasAspectRatio > imageAspectRatio) {
            // Canvas is wider than the image
            this.scale = new Vector(
                canvasWidth,
                canvasWidth / imageAspectRatio
            )
        } else {
            // Canvas is taller than the image
            this.scale = new Vector(
                canvasHeight * imageAspectRatio,
                canvasHeight
            );
        }
        

        this.position = new Vector(
            canvasWidth / 2,
            canvasHeight / 2
        );
    }
}