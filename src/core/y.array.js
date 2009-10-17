
subclass(YArray, YCollection);
function YArray(o){
    if (!o) o = [];
    this._o = o;
    // YCollection.call(this, o);
}

var mixinYArray = ['shift', 'pop', 'join', 'slice', 'indexOf'];

if (![].reduce) {
    YArray.prototype.reduce = reduceYArray;
    function reduceYArray( fn, acc, context ){
        for ( var A = this._o, i = 0, l = A.length, v = A[0]; i < l; v = A[++i] )
            acc = fn.call( context || A, acc, v, i, A );
        return acc;
    }
} else
    mixinYArray.push('reduce');

if (![].forEach) {
    YArray.prototype.forEach = forEachYArray;
    function forEachYArray( fn, context ){
        for ( var A = this._o, i = 0, l = A.length, v = A[0]; i < l; v = A[++i] )
            fn.call( context || A, v, i, A );
    }
} else {
    mixinYArray.push('forEach');
}

if (![].map) {
    YArray.prototype.map = mapYArray;
    function mapYArray( fn, context ){
        for ( var A = this._o, i = 0, l = A.length, r = new Array(l), v = A[0]; i < l; v = A[++i] )
            r[i] = fn.call( context || A, v, i, A );
        return Y(r);
    }
} else
    mixinYArray.push('map');

if (![].filter) {
    YArray.prototype.filter = filterYArray;
    function filterYArray( fn, context ){
        for ( var A = this._o, i = 0, l = A.length, r = [], v = A[0]; i < l; v = A[++i] )
            if ( fn.call( context || A, v, i, A ) )
                r.push(v);
        return Y(r);
    }
} else
    mixinYArray.push('filter');


// YArray.prototype.indexOf = 
// YArray.prototype.find = indexOf;
// function indexOf( value ){
//     for ( var A = this._o, i = 0, l = A.length, v = A[0]; i < l; v = A[++i] )
//         if ( v === value )
//             return i;
//     return -1;
// }


YArray.prototype.merge  =
YArray.prototype.concat = concat;
function concat( donor ){
    var o = this._o;
    new Y(arguments).each(function( donor ){
        o.concat(donor);
    });
    return this;
}

function andThen(name){
    return function(x){ this._o[name](x); return this; };
}

YArray.prototype.push    = andThen('push');
YArray.prototype.unshift = andThen('unshift');
YArray.prototype.sort    = andThen('sort');

YArray.prototype.splice = splice;
function splice(){ 
    this._o.splice.apply(this._o, Y(arguments)); 
    return this;
}

YArray.prototype.toString = function (){
    return 'YArray(['+this._o+'])';
};



// Mixin names from Array.prototype
mixinNames(YArray, Array, mixinYArray, true);
YArray.prototype.each = YArray.prototype.forEach;
YArray.prototype.find = YArray.prototype.indexOf;


