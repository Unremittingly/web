
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

Array.prototype.inArray=function (val) {
    let arr = this;
    let isIn = false;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] === val){
            isIn = true;
            break;
        }
    }
    return isIn
};


function initElementPos(arr,size) {
    let posArr = [];

    for (let i = 0; i < arr.length; i++) {
        let yPoss = arr[i];
        let startY = i*size;
        for (let j = 0; j < yPoss.length; j++) {
            let startX = j*size;
            let rect = new Rect({
                x:startX,
                y:startY
            },rectSize);
            posArr.push(rect)
        }
    }
    return posArr;
}

class Tool{

    static contains(point,rect){
        let isContains = false;
        let minX = rect[0].x;
        let minY = rect[0].y;
        let maxX = rect[1].x;
        let maxY = rect[1].y;
        if (point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY) {
            isContains = true;
        }

        return isContains
    }
}