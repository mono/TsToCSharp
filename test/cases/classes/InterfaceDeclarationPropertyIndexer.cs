public interface IFileList {
    [Export("length")]
    double Length { get; }
    [Export("item")]
    File Item(double index);
    File this[double index] { get; set; }
}

[Export("FileList", typeof(Mono.WebAssembly.JSObject))]
public sealed class FileList : JSObject {
    internal FileList  (int handle) : base (handle) {}

    public FileList () { }
    [Export("length")]
    public double Length => GetProperty<double>("length");
    [Export("item")]
    public File Item(double index)
    {
    	return InvokeMethod<File>("item", index);
    }
    public File this[double index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}
