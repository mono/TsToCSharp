
import {Node} from "ts-simple-ast";

export class Stack<T> {
    _store: T[] = [];
    push(val: T) {
      this._store.push(val);
    }
    pop(): T | undefined {
      return this._store.pop();
    }
}

export const InterfaceTrackingMap = new Map<string, Node>();

