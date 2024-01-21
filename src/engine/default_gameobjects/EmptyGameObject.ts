import GameObject from "../GameObject";
import Scene from "../Scene";
import Vector from "../Vector";

/**
 * Empty GameObject
 */
export default  class EmptyGameObject extends GameObject{
    constructor(position: Vector = Vector.zero, scale: Vector = Vector.zero){
        super(position, scale);
    }
    draw(scene: Scene): void {
        
    }
}