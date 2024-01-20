import Scene from "./Scene"
import Vector from "./Vector";
import CenterObjectComponent from "./default_components/CenterObjectComponent";
import SimpleText from "./default_gameobjects/SimpleText";

export default class DefaultScene extends Scene {
    constructor() {
        super(0, 0, () => {
            const text = new SimpleText(new Vector(10, 50), "Default Scene");
            text.useComponent(new CenterObjectComponent());
            super.add(text);
        }, true);
    }
}