import GameObject from "../GameObject";
import Scene from "../Scene";
import Vector from "../Vector";

/**
 * Empty GameObject
 */
export default  class EmptyGameObject extends GameObject{
    constructor(position: Vector, width: number = 0, height: number = 0){
        super(position, width, height);
    }
    draw(scene: Scene): void {
        
    }
}