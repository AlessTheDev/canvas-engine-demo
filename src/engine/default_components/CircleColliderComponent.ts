import Component from "../Component";
import GameObject from "../GameObject";
import Scene from "../Scene";
import SceneManager from "../SceneManager";
import { distance } from "../utils";

/**
 * CircleColliderComponent Class
 * 
 * The `CircleColliderComponent` is a basic circle collider component for GameObjects.
 * It allows detection of collisions with other GameObjects based on circular boundaries.
 * 
 * @extends Component<GameObject>
 */
export default class CircleColliderComponent extends Component<GameObject> {
    private assignedObject: GameObject | null = null;
    private radius: number;

    /**
     * Constructor for the CircleColliderComponent.
     * 
     * @param assignedObject - The GameObject assigned to this collider.
     * @param radius - The radius of the collider.
     */
    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    init(scene: Scene, object: GameObject): void {
        this.assignedObject = object;
    }

    /**
     * Update method for the CircleColliderComponent.
     * 
     * This method is currently empty, as circle colliders typically don't require regular updates.
     */
    update(): void {
        // No update logic for circle colliders at the moment
    }

    /**
     * Get Collisions method for the CircleColliderComponent.
     * 
     * Detects collisions with other GameObjects based on circular boundaries.
     * 
     * @returns An array of GameObjects that are colliding with the assignedObject.
     */
    getCollisions(): GameObject[] {
        if(!this.assignedObject) return [];

        const objects = SceneManager.instance.activeScene.getObjects();

        // If there are no objects or the collider is not enabled, return an empty array
        if (objects === undefined || !this.enabled) return [];

        let colliders: GameObject[] = [];

        // Iterate through all objects in the scene
        objects.forEach((object) => {
            const otherComponent = object.getComponent(CircleColliderComponent);

            // Check for collisions only with enabled circle collider components and different objects
            if (otherComponent?.enabled && object !== this.assignedObject &&
                distance(this.assignedObject!, object) - (this.radius + otherComponent.radius) <= 0) {
                colliders.push(object);
            }
        });

        return colliders;
    }
}
