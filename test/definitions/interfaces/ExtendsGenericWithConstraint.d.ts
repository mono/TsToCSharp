
 interface NodeList {
     readonly length: number;
     item(index: number): Node;
     [index: number]: Node;
 }

 interface NodeListOf<TNode extends Node> extends NodeList {
     length: number;
     item(index: number): TNode;
     [index: number]: TNode;
 }
