subclass(YString, YCollection);
function YString(o){
    this._o = o || "";
    // YCollection.call(this, o);
}

YObject.prototype.toKV = toKV;
function toKV(del){
    return this.reduce(function(acc, v, k){
        return acc.push( enc(k) + '=' + enc(v) );
    }, Y([]))
    .join(del !== undefined ? del : "&");
}

YString.prototype.fromKV = fromKV;
function fromKV(del){
    return Y(this.split(del || '&')).reduce(function(acc, pair){
        var kv = pair.split('='), k = kv[0], v = kv[1];
        if (k) acc[k] = dec(v);
        return acc;
    }, Y({}));
}

var mixinYString = ['split', 'indexOf', 'concat', 'match', 'replace'];
mixinNames(YString, String, mixinYString, true);

YString.prototype.toString = end;