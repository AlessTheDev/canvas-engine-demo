function removeFromArray<T>(array: Array<T>, obj: T) {
    const index = array.indexOf(obj);

    if (index != -1) {
        array.splice(index, 1);
    }
}

export { removeFromArray }