
 interface NodeList {
     [Export("length")]
     double length { get; }
     [Export("item")]
     Node item(double index);
     Node this[double index] { get; set; }
 }

 interface NodeListOf<TNode> :  NodeList where TNode : Node {
     [Export("length")]
     double length { get; set; }
     [Export("item")]
     TNode item(double index);
     TNode this[double index] { get; set; }
 }
