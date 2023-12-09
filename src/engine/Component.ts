export default abstract class Component<T> {
    constructor(){

    }
    abstract update(object: T): void;
}