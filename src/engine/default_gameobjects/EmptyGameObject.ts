import GameObject from "../GameObject";
import Scene from "../Scene";

export default  class EmptyGameObject extends GameObject{
    constructor(x: number, y: number, width: number, height: number){
        super(x, y, width, height);
    }
    draw(scene: Scene): void {
        
    }
}