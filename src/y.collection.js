
subclass(YCollection, Y);
function YCollection(o){
    if (!o) return;
    this._o = o;
    // var proto = o.prototype;
    // for (var k in proto) {
    //     if (proto[k] instanceof Function)
    //         this[k] = bind.call(proto[k], o);
    // }
}

YCollection.prototype.reduce = reduceYC;
function reduceYC( fn, acc, context ){
    var o = this._o;
    for ( var name in o )
        acc = fn.call( context || this, acc, o[name], name, o );
    return acc;
}

YCollection.prototype.map = mapYC;
function mapYC( fn, context ){
    var o = this._o, acc = new o.constructor();
    for ( var name in o )
        acc[k] = fn.call( context || this, o[name], name, o );
    return acc;
}

YCollection.prototype.each =
YCollection.prototype.forEach = forEachYC;
function forEachYC( fn, context ){
    var o = this._o;
    for ( var name in o )
        fn.call( context || this, o[name], name, o );
}

YCollection.prototype.filter = filterYC;
function filterYC( fn, context ){
    var o = this._o, acc = new o.constructor();
    for ( var name in o )
        if ( fn.call( context || this, o[name], name, o ) )
        acc[k] = o[name];
    return acc;
}

YCollection.prototype.indexOf =
YCollection.prototype.find = indexOfYC;
function indexOfYC( value ){
    var o = this._o;
    for ( var name in o )
        if ( o[name] === value )
            return name;
    return -1;
}

YCollection.prototype.has = has;
function has(v){
    return this.indexOf(v) != -1;
}

YCollection.prototype.attr = attr;
function attr( key, value, def ){
    var o = this._o;
    
    if ( !(value === undefined && def === undefined) ){
        o[key] = (value !== undefined ? value : def);
        return this;
    } else
        return o[key];
}

YCollection.prototype.extend = extend;
function extend( donor ){
    var donors = new Y(arguments), target = this;
    return donors.reduce(function( target, donor ){
        return Y(donor).reduce(function( target, v, k, donor ){
            return v !== undefined ? target.attr(k, v) : target;
        }, target );
    }, target );
}


function bool(v){ return !!(v); }

YCollection.prototype.all = all;
function all( fn ){
    var self = this, fn = fn || bool;
    return this.reduce(function(acc, v, k, o){
        return acc && fn.call(self, v, k, o);
    }, true);
}

YCollection.prototype.any = any;
function any( fn ){
    var self = this, fn = fn || bool;
    return this.reduce(function(acc, v, k, o){
        return acc || fn.call(self, v, k, o);
    }, false);
}

YCollection.prototype.pluck = pluck;
function pluck(key){
    return this.map(function(v){
        return v[key];
    });
}

YCollection.prototype.pairs = pairs;
function pairs(){
    return this.reduce( function(acc,v,k){ return acc.push([k, v]); }, Y([]) );
}

YCollection.prototype.keys = keys;
function keys(){
    return this.reduce( function(acc,v,k){ return acc.push(k); }, Y([]) );
}

YCollection.prototype.values = values;
function values(){
    return this.reduce( function(acc,v,k){ return acc.push(v); }, Y([]) );
}
