public interface IFileList {
    [Export("length")]
    double Length { get; }
    [Export("item")]
    File Item(double index);
    File this[double index] { get; set; }
}

[Export("FileList", typeof(Mono.WebAssembly.JSObject))]
public sealed class FileList {
    
    public FileList () { }
    [Export("length")]
    public double Length => throw new NotImplementedException();
    [Export("item")]
    public File Item(double index)
    {
    	throw new NotImplementedException();
    }
    public File this[double index] { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
}
