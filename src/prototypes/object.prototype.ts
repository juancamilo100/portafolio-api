if(!Object.prototype.deepClone) {
    Object.prototype.deepClone = function() {
      return JSON.parse(JSON.stringify(this));
    };
}

if(!Object.prototype.deleteProperty) {
    Object.prototype.deleteProperty = function(prop) {
        delete this[prop];
        return this
    };
}
