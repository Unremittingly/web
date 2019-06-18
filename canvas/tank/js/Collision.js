//碰撞检测

//rect 格式 [{x:0,y:0},{x:50,y:50}]  矩形碰撞
function collision(rect, rect1) {
    let lt = rect[0];
    let rt = {
        x: rect[1].x,
        y: rect[0].y
    };
    let rb = rect[1];
    let lb = {
        x: rect[0].x,
        y: rect[1].y
    };

    //第二个
    let lt1 = rect1[0];
    let rt1 = {
        x: rect1[1].x,
        y: rect1[0].y
    };
    let rb1 = rect1[1];
    let lb1 = {
        x: rect1[0].x,
        y: rect1[1].y
    };


    let rectInOther = false;
    if (contains(lt, rect1) || contains(rt, rect1) || contains(rb, rect1) || contains(lb, rect1)) {
        rectInOther = true;
    }

    let rect1InOther = false;
    if (contains(lt1, rect) || contains(rt1, rect) || contains(rb1, rect) || contains(lb1, rect)) {
        rect1InOther = true;
    }
    return rect1InOther || rectInOther;
}

//判断某个点是否在某个矩形里面
function contains(point, rect) {
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

let rect = [{
    x: 10,
    y: 10
}, {
    x: 100,
    y: 100
}];
let point = {
    x: 100,
    y: 10,
};
let rect1 = [{
    x: 100,
    y: 10,
}, {
    x: 160,
    y: 160
}];
let is = contains(point, rect);
// let is = collision(rect1,rect);
console.log('is', is);
