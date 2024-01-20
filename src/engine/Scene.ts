import GameObject from "./GameObject";
import { removeFromArray } from "./utils";

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
    private objectToRemoveQueue: GameObject[] = [];

    private initFn: Function;

    private animationFrameId: number | null = null;

    private width: number;
    private height: number;
    private flex: boolean = false;

    private active = false;

    /**
     * Create a new scene
     * @param width the initial width of the scene 
     * @param height the initial height of the scene
     * @param initFn the init functio which will be colled every time the scene is refreshed or initialized
     * @param flex if true it will resize based on the parent element size
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
        if(!this.active) return;
        this.canvas.width = this.canvas.parentElement?.clientWidth!;
        this.canvas.height = this.canvas.parentElement?.clientHeight!;
    }

    /**
     * Called every frame, 
     * it clears the canvas, 
     * removes the objects in the `objectToRemoveQueue`
     * then it updates the objects and draw them
     */
    update() {
        if(!this.active) return;
        
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
            object.update(this);
            object.runComponents();
            object.draw(this);
        })
    }

    /**
     * Initializes the scene calling the initFunction, it can be used to reset
     */
    init() {
        this.active = true;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if(this.flex){
            this.resizeFlex();
        }

        this.objects = [];
        this.objectToRemoveQueue = [];
        this.initFn(this);

        this.objects.forEach(o => {
            o.init(this);
        })

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
     * Adds an object to the scene
     * @param obj the object to add
     */
    add(obj: GameObject) {
        obj.setScene(this);
        this.objects.push(obj);
    }

    /**
     * Removes an object from the scene the next frame
     * @param obj the object to remove
     */
    remove(obj: GameObject) {
        this.objectToRemoveQueue.push(obj);
    }

    /**
     * Returns the canvas width
     * @returns the canvas width
     */
    getCanvasWidth() {
        return this.canvas.width;
    }

    /**
     * Returns the canvas height
     * @returns the canvas height
     */
    getCanvasHeight() {
        return this.canvas.height;
    }

    /**
     * Returns an array with all objects
     * @returns an array with all objects
     */
    getObjects(): GameObject[] {
        return this.objects;
    }

    /**
     * Updates the objects rendering queue, sorts by layer
     */
    sortLayersByLayers(){
        this.objects.sort((a: GameObject, b: GameObject) => { 
            if(a.renderingLayer > b.renderingLayer){
                return 1;
            }
            if(a.renderingLayer > b.renderingLayer){
                return -1;
            }
            return 0;
        });
    }
}