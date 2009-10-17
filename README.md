
# Y -- A Functional JavaScript Library for Core Types #

Y is intended to provide a basic toolkit for richer basic types in javascript, hopfully enhancing programmer productively. Javascript itself provides a powerful extension system through prototypical inheritance. But the reality is that this faculty does not play nice with other people's code. Since Y's aim is productivity, we're of the opinion that reusing code is good. Sadly, this forces us to abandon patching the core types. I've heard this lesson a dozen times from programmers abandoning Prototype.js, "it'd be great if it didn't stop me from using library XYZ."

In conceptual geneology, Y is much closer to jQuery. You use it by wrapping the object you wish to manipulate:

	Y({ 'foo': 1, 'bar': 2, 'baz': 3 }).keys()
	// --> ['foo', 'bar', 'baz']

Further, Y desires to treat everything as a collection by default: objects passed into Y operate like hashes, strings as arrays of characters (complete with array methods), numbers as ranges, and so on. In the same spirit, Y provides faculties for optimizing function composition. Though academic, a functional style often leads to shorter code; when it comes to the client, I worship at the altar of Bytes Transfered.


## Core API ##

**NOTE:** This is woefully incomplete, and mostly serves as my dev notes. As I clean up the library, JSDoc will take over.

Y is aware of Function, Array, Object, String, Number, Boolean, RegExp, and Date. Any other type is wrapped in a YGeneric.


### Cast to Y

	Y(o) =
	Y(o:null|undefined) -> o
	Y(ArrayLike)   -> YCollection<Int,V>
	Y(Obj)         -> YCollection<String,V>
	Y(Str)         -> YCollection<Int,Char>
	Y(Str, RegExp) -> YCollection<Int,Match> // Collection of matches

	Y(Num)         -> YCollection<Num,Num> // range(0,n)
	Y(Num, Num)    -> YCollection<Num,Num> // range(n,m)
	Y(n:Num, t:T)  -> YCollection<Int,T> // Collection len n filled with t

	Y(f_1:Fn, ...f_n:Fn) -> Fn // Function Composition, such that: 
	
		Y(f_1, ... f_n) = g(x) = f_n( f_n-1( ... f_1(x) ) )
	


### New Y

	new Y =
	new Y(null|undefined) -> empty Y
	new Y(Array, ...Array) -> Array // concat
	new Y(Obj, ...Obj) -> Obj // extend
	



## Static Utilities ##

 - type(o) -> Fn // o's constructor
 - type.name(o) -> String
 - is(o, T) -> Bool
 - is.{array, object, string}(o) -> Bool
 - attr(o, k, v) -> o
 - attr(o, k) -> v
 - def(o, k:K, d:V) -> V = attr(o,k) if k in o else (attr(o,k,d) && d)
 - bind(fn, context, ...args) -> fn
 - curry(fn, ...args) -> fn
 - subclass(Child, Parent=Y) -> Child // Subclasses Child against Parent (Y by default) and registers it as a type handler



## Wrapped Types ##

### Y<T>

 - end() -> T


### YCollection<K,V> extends Y

Methods of YCollection are inherited by most Y-types.

**Javascript 1.6 Array Methods**

 - reduce( (A, V, K, YCollection ) -> A, A ) -> A
 - map( (V,K,YCollection) -> A ) -> YCollection<K,A>
 - each = forEach( (V,K,YCollection) -> void ) -> void
 - filter( (V,K,YCollection) -> Bool ) -> YCollection<K,V>

 
**Indexing**

 - find(V) -> K = (array? indexOf(v) -> Num)
 - findr(V) -> K = (array? lastIndexOf(v) -> Num)
 - last() -> V
 - len() -> Num

 
**Set Operations**

 - merge(A, A, ...) = (array? concat(A, A, ...), object? extend(A, A, ...)) = union of collections
 - diff(A, A) = difference of collections
 - xor(A, A) = symmetric difference of collections


**Functional Mutation Operations**

 - remove(V) -> Y
 - attr(K, V) -> Y
 - attr(K) -> V
 - def(k:K, d:V) -> V = attr(o,k) if k in o else (attr(o,k,d) && d)


**Predicate Tests**

 - any( (V,K) -> Bool ) -> Bool
 - all


### YArray<Int,V> extends YCollection

 - push, unshift, sort, splice -- these operate as with Array, but instead return the YArray instead of the stupid length.



### YFunction

As `Function` cannot be subclassed, calling `Y(fn)` returns you the same function, extended with the methods on `YFunction.prototype`.

 - bind( context, ...args ) -> fn
 - partial( ...args ) -> fn
 - curry( ...args ) -> fn
 - g.compose( f ) -> g(f(x))


### YString

 - startsWith( String ) -> Bool
 - endsWith( String ) -> Bool
 - strip( String|RegEx ) -> String


## KV Serialization ##

Serialization to and from URL-encoded KV-pairs.


### YObject

 - toKV() -> String

### YString

 - toObject = fromKV() -> Object


## JSON Serialization ##

Y includes a JSON serialization library. It is optional to include, but depends on Y.

### Y<T>

 - toJSON() -> String

### Special Cases

 - Objects which are invalid JSON return `''`, and will not appear within serialized nested structures. This includes `undefined` and the empty Y object, `new Y()`.
 - Undefined objects -- i.e, `Y(null)` and `Y()` -- return their values, and as such, `Y().toJSON()` will throw an exception.


## Future ##

I work frequently on Y because it is involved in many of my personal projects. If you decide to use it, drop me a line at dsc@less.ly.

