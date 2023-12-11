import Component from "./Component";
import Scene from "./Scene";

export default abstract class GameObject{
    x: number;
    y: number;
    
    width: number;
    height: number;

    private components: Component<GameObject>[] = [];

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

    useComponent(component: Component<GameObject>){
        this.components.push(component);
    }

    runComponents(){
        this.components.forEach((component: Component<GameObject>) => component.update(this));
    }

    getComponent<T extends Component<any>>(componentClass: new (...args: any[]) => T): T | undefined {
        return this.components.find(component => component instanceof componentClass) as T | undefined;
    }
    
    
}