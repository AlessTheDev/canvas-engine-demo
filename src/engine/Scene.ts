import GameObject from "./GameObject";
import { removeFromArray } from "./utils";

export default class Scene {
    private canvas: HTMLCanvasElement;
    private Context: CanvasRenderingContext2D;

    public get context() : CanvasRenderingContext2D {
        return this.Context;
    }

    private objects: GameObject[] = [];
    private objectToRemoveQueue: GameObject[] = [];

    private initFn: Function;

    private animationFrameId: number | null = null;

    constructor(width: number, height: number, initFn: Function, flex = false) {
        this.canvas = document.querySelector("canvas")!;
        this.Context = this.canvas.getContext("2d")!;

        this.canvas.width = width;
        this.canvas.height = height;

        this.initFn = initFn;

        if (flex) {
            this.resizeFlex();
            window.addEventListener("resize", () => this.resizeFlex());
        }
    }

    private resizeFlex() {
        this.canvas.width = this.canvas.parentElement?.clientWidth!;
        this.canvas.height = this.canvas.parentElement?.clientHeight!;
    }

    update() {
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

    init() {
        this.initFn(this); 
        
        this.update();
    }

    drop(){
        if(this.animationFrameId){
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    add(obj: GameObject){
        this.objects.push(obj);
    }

    remove(obj: GameObject){
        this.objectToRemoveQueue.push(obj);
    }

    getCanvasWidth(){
        return this.canvas.width;
    }

    getCanvasHeight(){
        return this.canvas.height;
    }

    getObjects(): GameObject[]{
        return this.objects;
    }
}