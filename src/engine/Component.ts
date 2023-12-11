export default abstract class Component<T> {
    enabled = true;
    constructor(){

    }
    abstract update(object: T): void;

    runUpdate(object: T){
        if(!this.enabled) return;

        this.update(object);
    }
}