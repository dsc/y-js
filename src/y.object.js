subclass(YObject, YCollection);
function YObject(o){
    if (!o) o = {};
    this._o = o;
    // YCollection.call(this, o);
}

YObject.isEmpty = isEmpty;
YObject.prototype.isEmpty = methodize(isEmpty);
function isEmpty(o) {
    for ( var name in o )
        return false;
    return true;
}

