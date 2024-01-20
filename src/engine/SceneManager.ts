import GameObject from "./GameObject";
import Scene from "./Scene";
import DefaultScene from "./DefaultScene";

/**
 * This class manages the scenes, you can use it to swap between scenes or get the active scene
 * This class is a singleton so if you need to access it use SceneManager.instance
 */
export default class SceneManager{
    private static Instance: SceneManager;
    
    public static get instance() : SceneManager {
        return SceneManager.Instance;
    }

    private static set instance(i: SceneManager) {
        SceneManager.Instance = i;
    }

    private ActiveScene: Scene = new DefaultScene();
    
    public get activeScene() : Scene {
        return this.ActiveScene;
    }

    constructor(){
        if(SceneManager.Instance){
            return SceneManager.Instance;
        }

        SceneManager.Instance = this;
        this.activeScene.init();
    }

    /**
     * Swaps scenes
     * @param scene the scene you want to assign
     */
    assignScene(scene: Scene){
        this.activeScene.drop();
        this.ActiveScene = scene;
        scene.init();
    }

    /**
     * Swaps scenes without calling the init function of the scene parameter 
     * It can be used to resum already initialized scenes
     * @param scene the scene you want to assign
     */
    assignSceneNoReset(scene: Scene){
        this.activeScene.drop();
        this.ActiveScene = scene;
    }

    /**
     * Draws a circle based on the object width 
     * @param obj the object to debug
     */
    static debugObject(obj: GameObject) {
        const c = SceneManager.instance.activeScene.context;
        c?.beginPath();
        c?.arc(obj.position.x, obj.position.y, obj.width, 0, Math.PI * 2, false);
        c!.fillStyle = "white";
        c?.fill();
        c?.closePath();
    }
}