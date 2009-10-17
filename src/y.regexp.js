var NULL_PATTERN = new RegExp();

subclass(YRegExp, YCollection);
function YRegExp(o){
    YCollection.call(this, o || NULL_PATTERN);
}

