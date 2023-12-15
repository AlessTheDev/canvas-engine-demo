import FloatingObject from "../../objects/FloatingObject";
import Component from "../Component";
import GameObject from "../GameObject";
import SceneManager from "../SceneManager";
import { distance } from "../utils";

/**
 * Basic circle collider component
 */
export default class CircleColliderComponent extends Component<GameObject>{
    private assignedObject: GameObject;
    private radius: number;

    /**
     * 
     * @param assignedObject the object assigned to (most of the time is `this`)
     * @param radius the collider radius 
     */
    constructor(assignedObject: GameObject, radius: number) {
        super();
        this.assignedObject = assignedObject;
        this.radius = radius;
    }

    update(): void {

    }

    getCollisions(): GameObject[] {
        const objects = SceneManager.instance.activeScene.getObjects();

        if (objects == undefined || !this.enabled) return [];

        let colliders: GameObject[] = [];
        objects.forEach((object) => {
            const otherComponent = object.getComponent(CircleColliderComponent);

            if (otherComponent?.enabled && object != this.assignedObject && distance(this.assignedObject, object) - (this.radius + otherComponent.radius) <= 0) {
                colliders.push(object);
            }
        })
        return colliders;
    }

}