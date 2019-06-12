Array.prototype.remove = function (arg) {
    var i = 0, n = 0;
    var arrSize = this.length;
    for (i = 0; i < arrSize; i++) {
        if (this[i] != arg) {
            this[n++] = this[i];
        }
    }
    if (n < i) {
        this.length = n;
    }
};
Array.prototype.removeByIndex = function (index) {
    var i = 0, n = 0;
    var arrSize = this.length;
    for (i = 0; i < arrSize; i++) {
        if (this[i] != this[index]) {
            this[n++] = this[i];
        }
    }
    if (n < i) {
        this.length = n;
    }
};
Array.prototype.contain = function (arg) {
    var i = 0;
    var arrSize = this.length;
    for (i = 0; i < arrSize; i++) {
        if (this[i] == arg) {
            return true;
        }
    }
    return false;
};