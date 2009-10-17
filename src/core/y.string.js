subclass(YString, YCollection);
function YString(o){
    this._o = o || "";
    // YCollection.call(this, o);
}

var mixinYString = ['split', 'indexOf', 'concat', 'match', 'replace'];
mixinNames(YString, String, mixinYString, true);

YString.prototype.toString = end;