import GameObject from "./GameObject";
import Scene from "./Scene";
import DefaultScene from "./default_gameobjects/DefaultScene";

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

    assignScene(scene: Scene){
        this.activeScene.drop();
        this.ActiveScene = scene;
        scene.init();
    }

    static debugObject(obj: GameObject) {
        const c = SceneManager.instance.activeScene.context;
        c?.beginPath();
        c?.arc(obj.x, obj.y, obj.width, 0, Math.PI * 2, false);
        c!.fillStyle = "white";
        c?.fill();
        c?.closePath();
    }
}