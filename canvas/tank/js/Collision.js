//碰撞检测
/***
 * 矩形类
 */
class Rect {
    constructor(start, size) {
        this.start = start;
        this.size = size;
        this.R = [
            start,
            {
                x: start.x + size.width,
                y: start.y + size.height
            }
        ]
    }

    collision(rect1) {
        // console.log('rect1',rect1);
        let bounds = this.R;
        let bounds1 = rect1.R;
        let rect = this;
        let lt = bounds[0];
        let rt = {
            x: bounds[1].x,
            y: bounds[0].y
        };
        let rb = bounds[1];
        let lb = {
            x: bounds[0].x,
            y: bounds[1].y
        };

        //第二个
        let lt1 = bounds1[0];
        let rt1 = {
            x: bounds1[1].x,
            y: bounds1[0].y
        };
        let rb1 = bounds1[1];
        let lb1 = {
            x: bounds1[0].x,
            y: bounds1[1].y
        };

        let rectInOther = false;
        if (rect1.contains(lt) || rect1.contains(rt) || rect1.contains(rb) || rect1.contains(lb)) {
            rectInOther = true;
        }

        let rect1InOther = false;
        if (rect.contains(lt1) || rect.contains(rt1) || rect.contains(rb1) || rect.contains(lb1)) {
            rect1InOther = true;
        }
        console.log('rect1InOther',rect1InOther,rectInOther);
        return rect1InOther || rectInOther;
    }

    contains(point) {
        let rect = this.R;
        let isContains = false;
        let minX = rect[0].x;
        let minY = rect[0].y;
        let maxX = rect[1].x;
        let maxY = rect[1].y;

        if (point.x > minX && point.x < maxX && point.y > minY && point.y < maxY) {
            isContains = true;
        }

        return isContains
    }

}

/***
 * 检测两个矩形是否碰撞
 * @param rect  rect 格式 [{x:0,y:0},{x:50,y:50}]
 * @param rect1
 * @returns {boolean}
 */
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

/****
 * 判断某个点是否在某个矩形里面
 * @param point  点坐标 {x,y}
 * @param rect   矩形对象
 * @returns {boolean}
 */
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
