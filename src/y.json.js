(function(Y){

function toJSON(o, k){
    var prefix = typeof(k) === 'string' ? '"'+k+'":' : '',
        json = new Y(o).toJSON();
    return json ? prefix+json : '';
}

function install(json_fn){
    var args = new Y(arguments),
        tojson = args.shift();
    args.each(function(YThing){
        YThing.prototype.toJSON = json_fn;
    });
}

function yNoJSON(){
    return '';
}

function yToJSON(){
    return '' + (this._o === undefined ? '' : this._o);
}

function quoteJSON(){
    return '"' + this._o + '"';
}

// Collections

function reducer(acc, v, k, o){
    var json = toJSON(v, Y.is.array(o) ? 0 : k);
    return json ? (acc ? acc+','+json : json) : acc;
}

var collectJSON = Y(function(a, z, _){
    return a + this.reduce(reducer, '') + z;
}).curry();


// Public API

Y.toJSON = toJSON;

install( yNoJSON, Y.YGeneric, Y.YFunction, Y.YRegExp );
install( yToJSON, Y, Y.YBoolean, Y.YNumber );
install( quoteJSON, Y.YString );
install( collectJSON('{', '}'), Y.YCollection );
install( collectJSON('[', ']'), Y.YArray );


})(window.Y);
