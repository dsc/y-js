
/**
 * Y(o) =
 * ArrayLike   -> YCollection<Int,V>
 * Obj         -> YCollection<String,V>
 * 
 * TODO:
 * Str         -> YCollection<Int,Char>
 * Str, RegExp -> YCollection<Int,Match> // Collection of matches
 */
function Y(o){
    var newY = (this instanceof Y);
    
    // XXX need guards against this in YCollection, YArray, YObject
    if (o === undefined || o === null)
        if (newY) {
            this._o = o;
            return this;
        } else
            return o;
    
    if ( o instanceof Y )
        return newY ? Y(this.end()) : o; // XXX should this YCollection.clone()?
    
    // ArrayLike -> YCollection<Int,V>
    if ( o.length >= 0 && (typeof(o) == 'object') && !isArray(o) ) {
        o = slice.call(o, 0);
        return (newY ? new YArray(o) : o);
    }
    
    // var args = new Y(arguments);
    // if ( args.length > 1 && (args.every(isArray) || args.every(isObject)) ){
    //     var first = Y( args.shift() );
    //     return first.merge.apply( first, args );
    //     
    // } else if ( args.every(isNumber) && Y.range )
    //     return new Y.YArray( Y.range.apply( null, args ) );
    // 
    
    var YType = Y['Y' + typeName(o)];
    if ( YType )
        return new YType(o);
    
    return new YGeneric(o);
}

Y.prototype.end = end;
function end(){ return this._o; }

Y.prototype.toString = toStringY;
function toStringY(){
    return toString.call(this);
}






/**
 * Basic inheritance tools
 */
Y.subclass = subclass;
function subclass(Child, Parent){
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
    Y[getName(Child)] = Child;
    return Child;
}

Y.mixin = mixin;
function mixin(o, Donor, override){
    var proto = (Donor instanceof Function ? Donor.prototype : Donor);
    for (var k in proto) {
        if (proto[k] instanceof Function && (override || !o[k]))
            // o[k] = bind.call(proto[k], o);
            o[k] = proto[k];
    }
    return o;
}

Y.mixinNames = mixinNames;
function mixinNames(o, Donor, names, override){
    var proto = (Donor instanceof Function ? Donor.prototype : Donor),
        target = (o instanceof Function ? o.prototype : o);
    // closure to capture name
    var iter = function(name){
        if (proto[name] instanceof Function && (override || !target[name]))
            target[name] = function(){
                return this._o[name].apply(this._o, arguments);
            };
    };
    for (var i=0; i < names.length; i++) iter(names[i]);
    return o;
}


