
subclass(YFunction, Y);
function YFunction(fn){
    mixin(fn, YFunction);
    return fn;
}

YFunction.prototype.end = fn_end;
function fn_end(){ return this; }


Y.bind = bind;
YFunction.prototype.bind = methodize(bind);
function bind( fn, context ){
    var args = Y(arguments), 
        fn = args.shift(), 
        context = args.shift();
    return function(){
        return fn.apply( context, args.concat( Y(arguments) ) );
    };
}

// Remembers arguments but obeys current context
Y.partial = partial;
YFunction.prototype.partial = methodize(partial);
function partial(fn){
    var args = Y(arguments), 
        fn = args.shift();
    return function(){
        return fn.apply( this, args.concat( Y(arguments) ) );
    };
}

// Collects arguments but ignores context: fn.curry( arg1, arg2, ... ) <-- always executes in `window`
// Note that curry requires the function be declared with formal arguments,
// even if it pulls them from the special `arguments` variable.
Y.curry = curry;
YFunction.prototype.curry = curry;
function curry(){
    var args = Y(arguments), 
        fn = this;
    
    if( args.length >= fn.length )
        return fn.apply( window, args );
    
    return function(){ 
        return curry.apply(fn, args.concat( Y(arguments) ));
    }; 
}

var fn_name_re = /function\s*([^\(]*)\(/;

/** Returns the declared name of a function. */
YFunction.prototype.getName = getName;
function getName( fn ){
    if ( !fn && this instanceof Function )
        fn = this;
    if ( !isFunction(fn) )
        return fn;
    else
        return (fn.name || (fn+'').match(fn_name_re)[1]) || '';
}

Y.methodize = methodize;
YFunction.prototype.methodize = methodize(methodize); // heh
function methodize( fn ) {
    if (fn.__methodized) 
        return fn.__methodized;
    
    function __methodized(){ 
        var args = Y(arguments); 
        return fn.apply(this, [this].concat(args));
    }
    
    __methodized.__wraps = fn;
    return (fn.__methodized = __methodized);
}

Y.compose = 
Y.composeCall = composeCall;
YFunction.prototype.compose = 
YFunction.prototype.composeCall = methodize(composeCall);
function composeCall( g, f ){
    return function(){
        return f.call(this, g.apply( this, Y(arguments) ));
    };
}

Y.composeApply = composeApply;
YFunction.prototype.composeApply = methodize(composeApply);
function composeApply( g, f ){
    return function(){
        return f.apply(this, g.apply( this, Y(arguments) ));
    };
}

