(function(Y, undefined){ if (!Y) return;
var enc = encodeURIComponent, 
    dec = decodeURIComponent;

Y.YObject.prototype.toKV = toKV;
function toKV(del){
    return this.reduce(function(acc, v, k){
        return acc.push( enc(k) + '=' + enc(v) );
    }, Y([]))
    .join(del !== undefined ? del : "&");
}

Y.YString.prototype.toObject =
Y.YString.prototype.fromKV = fromKV;
function fromKV(del){
    return Y(this.split(del || '&'))
        .reduce(function(acc, pair){
            var kv = pair.split('='), k = kv[0], v = kv[1];
            if (k) acc[k] = dec(v);
            return acc;
        }, {});
}


})(window.Y);
