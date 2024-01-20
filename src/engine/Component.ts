import Scene from "./Scene";

/**
 * Main component class
 */
export default abstract class Component<T> {
    enabled = true;
    constructor(){

    }
    
    /**
     * Initialization that neds scene access
     * @param scene the scene connected to the component
     */
    init(scene: Scene){

    }

    /**
     * Runs before every frame
     * @param scene the scene connected to the component
     */
    abstract update(object: T): void;

    runUpdate(object: T){
        if(!this.enabled) return;

        this.update(object);
    }
}