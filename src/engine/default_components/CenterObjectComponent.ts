import Component from "../Component";
import GameObject from "../GameObject";
import SceneManager from "../SceneManager";
import Vector from "../Vector";

/**
 * Centers an object to the middle of the canvas
 */
export default class CenterObjectComponent extends Component<GameObject>{
    update(object: GameObject): void {
        const scene = SceneManager.instance.activeScene;

        object.position = new Vector(
            scene.getCanvasWidth() / 2 - (object.scale.x / 2),
            scene.getCanvasHeight() / 2 - (object.scale.y / 2)
        )
    }
    
}