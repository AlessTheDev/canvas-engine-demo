import GameObject from "./GameObject";
import Scene from "./Scene";
import DefaultScene from "./DefaultScene";

/**
 * SceneManager Class
 * 
 * The `SceneManager` class manages scenes in the application, allowing the swapping of scenes and retrieval of the active scene.
 * This class is implemented as a singleton, and its instance can be accessed using `SceneManager.instance`.
 */
export default class SceneManager {
    private static Instance: SceneManager;

    public static get instance(): SceneManager {
        return SceneManager.Instance;
    }

    private static set instance(i: SceneManager) {
        SceneManager.Instance = i;
    }

    private ActiveScene: Scene = new DefaultScene();

    public get activeScene(): Scene {
        return this.ActiveScene;
    }

    /**
      * Constructor for the SceneManager class.
      * Creates an instance of the SceneManager class and initializes the active scene.
      * If an instance already exists, returns that instance.
      */
    constructor() {
        if (SceneManager.Instance) {
            return SceneManager.Instance;
        }

        SceneManager.Instance = this;
        this.activeScene.init();
    }

    /**
     * Swaps scenes.
     * @param scene - The scene to be assigned as the active scene.
     */
    assignScene(scene: Scene) {
        this.activeScene.drop();
        this.ActiveScene = scene;
        scene.init();
    }

    /**
     * Swaps scenes without calling the init function of the scene parameter.
     * It can be used to resume already initialized scenes.
     * @param scene - The scene to be assigned as the active scene.
     */
    assignSceneNoReset(scene: Scene) {
        this.activeScene.drop();
        this.ActiveScene = scene;
    }

    /**
     * Draws a debug circle based on the object width.
     * @param obj - The object to be debugged.
     */
    static debugObject(obj: GameObject) {
        const c = SceneManager.instance.activeScene.context;
        c?.beginPath();
        c?.arc(obj.position.x, obj.position.y, obj.scale.x, 0, Math.PI * 2, false);
        c!.fillStyle = "white";
        c?.fill();
        c?.closePath();
    }
}