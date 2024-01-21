import Scene from "../Scene";
import Vector from "../Vector";
import SimpleImage from "./SimpleImage";

/**
 * Background Class
 * 
 * The `Background` class represents a simple background image in a scene, 
 * extending the `SimpleImage` class. 
 * layer and simulate the CSS `cover` property for responsive scaling.
 * 
 * @extends SimpleImage
 */
export default class Background extends SimpleImage {
    private cover: boolean;

    /**
     * Constructor for the Background class.
     * 
     * @param backgroundSrc - The background image source.
     * @param cover - If true, it simulates the CSS `cover` property for responsive scaling.
     */
    constructor(backgroundSrc: string, cover = false) {
        super(Vector.zero, Vector.zero, backgroundSrc);
        this.renderingLayer = -10;
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