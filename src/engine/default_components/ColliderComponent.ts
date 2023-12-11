import Component from "../Component";
import GameObject from "../GameObject";

export default abstract class ColliderComponent extends Component<GameObject>{
    constructor() {
        super();
    }

    abstract getCollisions(): GameObject[];

}