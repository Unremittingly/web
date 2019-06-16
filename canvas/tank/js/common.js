
Array.prototype.contain = function(val)
{
    for (var i = 0; i < this.length; i++)
    {
        if (this[i] == val)
        {
            return true;
        }
    }
    return false;
};


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