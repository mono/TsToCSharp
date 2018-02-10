interface EventTarget {
    dispatchEvent(evt: Event): boolean;
}

interface Node extends EventTarget {

}
