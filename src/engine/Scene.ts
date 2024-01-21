import GameObject from "./GameObject";
import { removeFromArray } from "./utils";

/**
 * Scene Class
 * 
 * The `Scene` class represents a container for game objects and manages their rendering and updates.
 */
export default class Scene {
    private canvas: HTMLCanvasElement;
    private Context: CanvasRenderingContext2D;

    /**
     * The canvas context
     */
    public get context(): CanvasRenderingContext2D {
        return this.Context;
    }

    private objects: GameObject[] = [];
    private topRenderingObjects: GameObject[] = [];
    private objectToRemoveQueue: GameObject[] = [];

    private initFn: Function;

    private animationFrameId: number | null = null;

    private width: number;
    private height: number;
    private flex: boolean = false;

    private active = false;

    /**
      * Creates a new scene.
      * 
      * @param width - The initial width of the scene.
      * @param height - The initial height of the scene.
      * @param initFn - The initialization function called every time the scene is refreshed or initialized.
      * @param flex - If true, the scene will resize based on the parent element size.
      */
    constructor(width: number, height: number, initFn: Function, flex: boolean = false) {
        this.canvas = document.querySelector("canvas")!;
        this.Context = this.canvas.getContext("2d")!;

        this.width = width;
        this.height = height;

        this.initFn = initFn;
        this.flex = flex;

        if (flex) {
            window.addEventListener("resize", () => this.resizeFlex());
        }
    }

    /**
     * Updates the canvas width based on the canvas parent element
     */
    private resizeFlex() {
        if (!this.active) return;
        this.canvas.width = this.canvas.parentElement?.clientWidth!;
        this.canvas.height = this.canvas.parentElement?.clientHeight!;
    }

    /**
     * Called every frame.
     * It clears the canvas, removes the objects in the `objectToRemoveQueue`,
     * then it updates the objects and draws them.
     */
    update() {
        if (!this.active) return;

        this.animationFrameId = requestAnimationFrame(this.update.bind(this));

        // Clear scene
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Remove Objects
        this.objectToRemoveQueue.forEach((object: GameObject) => {
            removeFromArray<GameObject>(this.objects, object);
        })
        this.objectToRemoveQueue = [];

        // Update scene objects
        this.objects.forEach((object: GameObject) => {
            if (!object.topLayerRendering) {
                this.runObject(object);
            }
        })
        this.topRenderingObjects.forEach((object: GameObject) => {
            this.runObject(object);
        })
    }

    private runObject(obj: GameObject) {
        if (!obj.active) return;
        obj.update(this);
        obj.runComponents();
        obj.draw(this);
    }

    /**
      * Initializes the scene calling the initFunction.
      * It can be used to reset.
      */
    init() {
        this.active = true;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (this.flex) {
            this.resizeFlex();
        }

        this.objects = [];
        this.objectToRemoveQueue = [];
        this.initFn(this);

        // Works 
        for(let i = 0; i < this.objects.length; i++){
            this.objects[i].init(this);
            this.objects[i].initComponents(this);
        }

        this.update();
    }

    /**
     * Stops the scene from being played
     * Warning: It doesn't delete the objects, to resume call `SceneManager.instance.assignSceneNoReset()`
     */
    drop() {
        this.active = false;

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    /**
     * Adds an object to the scene.
     * 
     * @param obj - The object to add.
     */
    add(obj: GameObject) {
        this.objects.push(obj);
        obj.setScene(this);
    }

    /**
     * Removes an object from the scene in the next frame.
     * 
     * @param obj - The object to remove.
     */
    remove(obj: GameObject) {
        this.objectToRemoveQueue.push(obj);
    }

    /**
    * Returns the canvas width.
    * 
    * @returns The canvas width.
    */
    getCanvasWidth() {
        return this.canvas.width;
    }

    /**
     * Returns the canvas height.
     * 
     * @returns The canvas height.
     */
    getCanvasHeight() {
        return this.canvas.height;
    }

    /**
    * Returns an array with all objects.
    * 
    * @returns An array with all objects.
    */
    getObjects(): GameObject[] {
        return this.objects;
    }

    /**
     * Updates the objects rendering queue, sorts by layer
     */
    sortObjectsByLayers() {
        this.objects.sort((a: GameObject, b: GameObject) => {
            if (a.renderingLayer > b.renderingLayer) {
                return 1;
            }
            if (a.renderingLayer < b.renderingLayer) {
                return -1;
            }
            return 0;
        });
    }

    /**
     * Adds an object to the latest layer, giving better performance for objects that go on top.
     * 
     * Use this for particles or large quantity of objects.
     * 
     * @param obj - The object to add.
     */
    addTopRendering(obj: GameObject) {
        obj.topLayerRendering = true;
        this.add(obj);
        this.topRenderingObjects.push(obj);
    }
}