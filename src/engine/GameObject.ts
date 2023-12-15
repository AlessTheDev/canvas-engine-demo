import Component from "./Component";
import Scene from "./Scene";

export default abstract class GameObject{
    x: number;
    y: number;
    
    width: number;
    height: number;

    private components: Component<GameObject>[] = [];

    /**
     * Create a GameObject
     * @param x start x
     * @param y start y
     * @param width width
     * @param height height 
     */
    constructor(x: number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
    }

    /**
     * Override this function to render the object on the scene
     * @param scene The Scene assigned to the object
     */
    abstract draw(scene: Scene): void;

    /**
     * Override this function to do operations before the draw method is called
     * @param scene The scene assigned to the object
     */
    update(scene: Scene) {
        this.draw(scene);
    }

    /**
     * Adds a component to the object
     * @param component the component to add
     */
    useComponent(component: Component<GameObject>){
        this.components.push(component);
    }

    /**
     * Run all components, it's called automatically every frame
     */
    runComponents(){
        this.components.forEach((component: Component<GameObject>) => component.update(this));
    }

    /**
     * Get a component of an object
     * @param componentClass the class of that component
     * @returns the component or undefined if it hasn't been found
     * @example object.getComponent(ComponentClass)
     */
    getComponent<T extends Component<any>>(componentClass: new (...args: any[]) => T): T | undefined {
        return this.components.find(component => component instanceof componentClass) as T | undefined;
    }
    
    
}