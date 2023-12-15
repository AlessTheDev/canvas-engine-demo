import Component from "../Component";
import GameObject from "../GameObject";

/**
 * Collider main component
 */
export default abstract class ColliderComponent extends Component<GameObject>{
    constructor() {
        super();
    }

    abstract getCollisions(): GameObject[];

}