import Scene from "./Scene";
import Vector from "./Vector";
import CenterObjectComponent from "./default_components/CenterObjectComponent";
import SimpleText from "./default_gameobjects/SimpleText";

/**
 * DefaultScene Class
 * 
 * The `DefaultScene` class is a specific implementation of the `Scene` class.
 * It represents a default scene with some predefined components and game objects.
 * 
 * @extends Scene
 */
export default class DefaultScene extends Scene {
    /**
     * Constructor for the DefaultScene class.
     * Creates a default scene with a centered text object.
     */
    constructor() {
        super(0, 0, () => {
            const text = new SimpleText(new Vector(10, 50), "Default Scene");
            text.useComponent(new CenterObjectComponent());
            super.add(text);
        }, true);
    }
}
