# Y: A JavaScript Library #

Y is intended to provide a basic toolkit for richer basic types in javascript, hopfully enhancing programmer productively. Javascript itself provides a powerful extension system through prototypical inheritance. But the reality is that this faculty does not play nice with other people's code. Since Y's aim is productivity, we're of the opinion that reusing code is good. Sadly, this forces us to abandon patching the core types. I've heard this lesson a dozen times from programmers abandoning Prototype.js, "it'd be great if it didn't stop me from using library XYZ."

In conceptual geneology, Y is much closer to jQuery. You use it by wrapping the object you wish to manipulate:

	Y({ 'foo': 1, 'bar': 2, 'baz': 3 }).keys()
	// --> ['foo', 'bar', 'baz']

Further, Y desires to treat everything as a collection by default: objects passed into Y operate like hashes, strings as arrays of characters (complete with array methods), numbers as ranges, and so on. In the same spirit, Y provides faculties for optimizing function composition. Though academic, a functional style often leads to shorter code; when it comes to the client, I worship at the altar of Bytes Transfered.


## Core API ##

This is woefully incomplete, and mostly serves as my dev notes. As I clean up the library, JSDoc will take over.


// Function, Array, Object, String, Number, Boolean, RegExp, Date

Y ::
ArrayLike   -> YCollection<Int,V>
Obj         -> YCollection<String,V>
Str         -> YCollection<Int,Char>
Str, RegExp -> YCollection<Int,Match> // Collection of matches

Num         -> YCollection<Num,Num> // range(0,n)
Num, Num    -> YCollection<Num,Num> // range(n,m)
n:Num, t:T  -> YCollection<Int,T> // Collection len n filled with t

f:Fn, ...Fn -> Fn f(g(x)) // Compose


new Y ::
Array, ...Array -> Array // concat
Obj, ...Obj -> Obj // extend



## Static Utilities ##

Y.

 - attr(o, k, v) -> o
 - attr(o, k) -> v
 - def(o, k:K, d:V) -> V = attr(o,k) if k in o else (attr(o,k,d) && d)
 - bind(fn, context, ...args) -> fn
 - curry(fn, ...args) -> fn



## Types ##

Y<T>
 - end() -> T

YCollection<K,V> = Y
 - reduce( (T,V,K,Y) -> T, T) -> T
 - map( (V,K,Y) -> T ) -> YCollection<K,T>
 - forEach(fn) -> void = each
 - filter(fn) -> YCollection<K,V>
 
 - any
 - all
 
 - find(V) -> K = (array? indexOf(v) -> Num)
 - findr(V) -> K = (array? lastIndexOf(v) -> Num)
 - last() -> V

 - merge(A, A, ...) = (array? concat(A, A, ...), object? extend(A, A, ...)) = union of collections
 - diff(A, A) = difference of collections
 - xor(A, A) = symmetric difference of collections
 
 - len() -> Num

 - remove(V) -> Y
 - attr(K, V) -> Y
 - attr(K) -> V
 - def(k:K, d:V) -> V = attr(o,k) if k in o else (attr(o,k,d) && d)


YFunction
 - bind
 - partial
 - curry
 - compose


YString
 - startsWith
 - endsWith
 - strip
 - toObject() -> YObject


YArray
 - push, unshift, sort, splice --> returns Y



## JSON ##

Y includes a JSON serialization library. It is an optional, but depends on Y.

