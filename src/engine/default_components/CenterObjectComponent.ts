import Component from "../Component";
import GameObject from "../GameObject";
import SceneManager from "../SceneManager";
import Vector from "../Vector";

/**
 * CenterObjectComponent Class
 * 
 * The `CenterObjectComponent` is a component that centers a GameObject to the middle of the canvas.
 * It adjusts the position of the GameObject based on the canvas dimensions and the object's scale.
 * 
 * @extends Component<GameObject>
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