import Scene from "../Scene"
import CenterObjectComponent from "../default_components/CenterObjectComponent";
import SimpleText from "./SimpleText";

export default class DefaultScene extends Scene{
    constructor(){
        super(0, 0, () => {
            const text = new SimpleText(10, 50, "Default Scene");
            text.useComponent(new CenterObjectComponent());
            super.add(text);
        }, true);
    }
}