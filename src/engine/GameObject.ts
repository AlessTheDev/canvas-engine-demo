import Component from "./Component";
import Scene from "./Scene";
import Vector from "./Vector";

/**
 * GameObject Class
 * 
 * The `GameObject` class represents a basic object in a scene.
 * It provides properties and methods for position, scale, rendering layers, components, and interactions with a scene.
 * 
 * @abstract
 */
export default abstract class GameObject {
    /**
     * The position vector of the object.
     */
    position: Vector;

    /**
     * The scale vector of the object.
     */
    scale: Vector;

    /**
     * Indicates whether the object should be rendered at the top layer, ignoring rendering layers.
     * DON'T EDIT THIS IF YOU DON'T HAVE SPECIFIC NEEDS
     * use scene.addTopRendering(obj) instead
     */
    topLayerRendering = false;

    private components: Component<GameObject>[] = [];
    private _renderingLayer: number = 0;

    private assignedScene: Scene | null = null;

    /**
     * Indicates whether the object is currently active.
     */
    active: boolean = true;

    /**
     * Gets or sets the rendering layer of the object.
     * If `topLayerRendering` is enabled, a warning is logged, and layers won't apply.
     */
    public get renderingLayer(): number {
        return this._renderingLayer;
    }

     /**
     * Setter for the rendering layer property.
     * If `topLayerRendering` is enabled, the warning is logged, and layers won't apply.
     * 
     * @param value - The new rendering layer value.
     */
    set renderingLayer(value: number) {
        if (this.topLayerRendering) {
            console.warn("This objects has topLayerRendering enabled, layers won't apply");
            return;
        }
        this._renderingLayer = value;
        this.assignedScene?.sortObjectsByLayers();
    }

    /**
    * Constructor for the GameObject class.
    * 
    * @param position - The initial position vector of the object.
    * @param scale - The initial scale vector of the object.
    */
    constructor(position: Vector, scale: Vector) {
        this.position = position;
        this.scale = scale;
    }

    /**
     * Initialization method that runs when the scene is assigned to the object.
     * Override this method in subclasses for specific initialization operations.
     * 
     * @param scene - The scene assigned to the object.
     */
    init(scene: Scene): void {

    }

    /**
    * Abstract method to be implemented by subclasses.
    * Override this method to define the rendering logic for the object.
    * 
    * @param scene - The Scene to which the object belongs.
    */
    abstract draw(scene: Scene): void;

    /**
     * Override this method to perform operations before the draw method is called.
     * 
     * @param scene - The Scene to which the object belongs.
     */
    update(scene: Scene) {

    }

    /**
    * Adds a component to the object.
    * 
    * @param component - The component to add.
    */
    useComponent(component: Component<GameObject>) {
        this.components.push(component);
    }

    /**
     * Runs all components attached to the object. 
     * This method is called automatically every frame.
     */
    runComponents() {
        this.components.forEach((component: Component<GameObject>) => component.update(this));
    }

    /**
     * Gets a component of the object based on its class.
     * 
     * @param componentClass - The class of the component to retrieve.
     * @returns The component or undefined if it hasn't been found.
     * @example object.getComponent(ComponentClass)
     */
    getComponent<T extends Component<any>>(componentClass: new (...args: any[]) => T): T | undefined {
        return this.components.find(component => component instanceof componentClass) as T | undefined;
    }

    /**
    * Using this could cause unexpected behavouir
*/
    setScene(scene: Scene) {
        this.assignedScene = scene;
        if (!this.topLayerRendering) {
            scene.sortObjectsByLayers();
        }
    }

    /**
     * Initializes all components attached to the object, passing the scene and the object itself.
     * This method is automatically called when the scene is initialized.
     * 
     * @param scene - The Scene to which the object belongs.
     */
    initComponents(scene: Scene) {
        this.components.forEach((component: Component<GameObject>) => component.init(scene, this));
    }
}