
/** Returns the type-constructor of a value. */
Y.type = type;
function type( o ) {
    switch ( typeof(o) ) {
        case "undefined" : return undefined;
        case "string"    : return String;
        case "number"    : return Number; // NaN and Infinity are Number literals
        case "boolean"   : return Boolean;
        case "function"  : return Function;
            
        case "object" :
        default :
            // Null is special. It's type is "object". Thanks null, you're helping.
            if ( o == null )
                return null;
            
            else
                return (o.constructor !== Object) ? o.constructor : Object;
    }
}

/** Returns the declared name of the type-constructor of a value. */
Y.type.name = typeName;
function typeName(o){
    return getName(type(o));
}

Y.is = curry.call(is);
function is( A, B ){
    if ( B instanceof Array || B instanceof YArray )
        return Y(B).map( is(A) ).any();
    else
        return (type(A) === B);
}

Y.is.fn = isFunction;
function isFunction(A) {
    return toString.call(A) == "[object Function]";
}

Y.is.array = isArray;
function isArray(A) {
    return toString.call(A) == "[object Array]" || (A && A.constructor == YArray);
}

Y.is.object = isObject;
function isObject(A){
    return A && (A.constructor == Object || A.constructor == YObject);
}

Y.is.string = isString;
function isString(A){
    return typeof(A) == "string";
}

Y.is.number = isNumber;
function isNumber(A){
    return typeof(A) == "number";
}

