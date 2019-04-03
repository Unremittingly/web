let cxt;
let start = {
    x: 400,
    y: 400
};
let end = {
    x: 200,
    y: 200,
};
let sparks = [];
let sparkEndLength = 0;
let sparkColor = [0, 100, 160, 220, 280];
let animateLength = 0;//统计requestAnimationFrame动画次数   在中间的时候需要清除一下


//统一一下兼容性
window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
        window.setTimeout(a, 1E3 / 60)
    }
}();

function rand(min, max) {
    //~~运算符是取整 按位取整
    return (Math.random() * (max - min)) + min;
}

function initCanvas() {
    cxt = document.getElementById('firework').getContext('2d');
    cxt.fillRect(0, 0, 800, 500);

    /*****
     * 过程
     * 一束烟花从地面发射 确定开始坐标和结束坐标
     * 烟花以一定的加速度向某个方向飞去
     * 飞行一定时间后到达结束坐标并爆炸
     * 爆炸产生一定数量的小火花
     * 小火花向四周散开，并逐渐变暗消失
     */

    startAnimate();


}

function getRandEnd() {

    end = {
        x: rand(200, 600),
        y: 200
    };
}

function startAnimate() {
    getRandEnd();
    initVariate();
    //todo 这里如果直接这样写的话（顺序写动画）会存在问题   不是异步执行的（js是单线程的），
    //todo 换个思路：一直轮询，几个操作同时执行，完全不知道那个先，那个后不就实现了动画同时执行（这里还包括爆炸分散开的动画）

    new Promise(function (resolve, reject) {
        beforeBoom(resolve);
    }).then(function () {
        boomGenerateSpark();
    }).catch(function (e) {
        console.log('error', e);
    });
}

function initVariate() {
    sparks = [];
    sparkEndLength = 0;
    sparkColor = [0, 100, 160, 220, 280];

    animateLength = 0;//统计requestAnimationFrame动画次数   在中间的时候需要清除一下
}

class PathForSmall {
    constructor(cxt) {
        this.width = 2;
        this.cxt = cxt;
        this.cxt.fillStyle = '#fff';
        this.percent = 1;
        this.index = 0;
        this.pathPosLength = 30;
        this.paths = [];

    }

    move(resolve) {
        this.initPath();

        this.animation(resolve);
    }

    animation(resolve) {

        this.drawPath();
        this.percent = (this.percent + 1) % this.pathPosLength;
        if (this.percent != 0) {
            let that = this;
            requestAnimationFrame(function () {
                that.animation(resolve);
            });
        } else {
            resolve();
        }

    }

    initPath() {
        for (let i = 0; i < this.pathPosLength; i++) {
            let x = (end.x - start.x) / this.pathPosLength * i + start.x;
            let y = start.y - (start.y - end.y) / this.pathPosLength * (i);
            this.paths.push({
                x: x,
                y: y,
                opacity: i / this.pathPosLength
            })
        }
    }

    //绘制线条动画
    drawPath() {
        cxt.fillStyle = '#000';
        cxt.fillRect(0, 0, 800, 500);
        cxt.beginPath();
        cxt.strokeStyle = '#fff';
        cxt.lineWidth = this.width;
        cxt.globalAlpha = this.paths[this.percent - 1].opacity;
        cxt.moveTo(this.paths[this.percent].x, this.paths[this.percent].y);
        //这里用这么多次循环是为了动画  percent 只是为了拿取数组   操作都是拿去数组中的东西
        for (let i = 0; i < 1 / this.pathPosLength; i = i + 0.001) {

            //todo 优化：这里用贝塞尔二次曲线的话 我们需要知道最后一个下落的终点坐标   这里测试一下 最后一个点坐标 这里的每次是小距离
            let x = quadraticBezierOne(this.paths[this.percent - 1].x, this.paths[this.percent].x, i);
            let y = quadraticBezierOne(this.paths[this.percent - 1].y, this.paths[this.percent].y, i);
            cxt.lineTo(x, y);
            this.index++;
        }

        cxt.stroke();
    }


}

function beforeBoom(resolve) {
    let path = new PathForSmall(cxt);
    path.move(resolve);
}

function quadraticBezierOne(p0, p1, t) {
    return (1 - t) * p0 + t * p1;
}

//贝塞尔曲线获取点坐标  二次贝赛尔曲线方程
function quadraticBezier(p0, p1, p2, t) {
    let k = 1 - t;
    return k * k * p0 + 2 * k * t * p1 + t * t * p2;
}

//烟花散开需要三次贝塞尔曲线方程
function quadraticBezierThree(p0, p1, p2, p3, t) {
    let k = 1 - t;
    return k * k * k * p0 + 3 * t * k * k * p1 + 3 * t * 2 * k * p2 + 3 * t * p3;
}

class Spark {
    constructor(x, y) {
        this.start = {
            x: x || end.x,
            y: y || end.y
        };
        this.end = {
            x: 0,
            y: 0
        };
        this.lineWidth = 3;
        this.pathPosLength = 30;//平分为多少个段 进行动画  这个参数 还需要优化跳转
        this.sparksPaths = [];
        this.percent = 0;
        this.color = sparkColor[parseInt(Math.random() * 5)];
        this.isEnd = false;
    }

    initSparksPath() {
        let start = this.start;
        let end = this.end;
        for (let i = 0; i < this.pathPosLength; i++) {
            let x = (end.x - start.x) / this.pathPosLength * i + start.x;
            let y = (start.y + (end.y - start.y) / this.pathPosLength * (i));
            this.sparksPaths.push({
                x: x,
                y: y,
                opacity: i / this.pathPosLength + (i * 5) / this.pathPosLength
            })
        }
    }

    clearSparksPath() {
        if (this.sparksPaths.length > 1) {
            this.sparksPaths = [];
        }
    }

    drawPath() {
        cxt.save();
        cxt.beginPath();
        cxt.strokeStyle = this.color;
        cxt.strokeStyle = 'hsla(' + this.color + ',100%,' + rand(50, 100) + '%,1)';
        cxt.lineWidth = this.lineWidth;
        cxt.globalAlpha = this.sparksPaths[this.percent - 1].opacity;
        cxt.moveTo(this.sparksPaths[this.percent].x, this.sparksPaths[this.percent].y);
        //这里用这么多次循环是为了动画  percent 只是为了拿取数组   操作都是拿去数组中的东西 试一下二次曲线
        for (let i = 0; i < 1 / this.pathPosLength; i = i + 0.001) {
            let x = quadraticBezierOne(this.sparksPaths[this.percent - 1].x, this.sparksPaths[this.percent].x, i);
            let y = quadraticBezierOne(this.sparksPaths[this.percent - 1].y, this.sparksPaths[this.percent].y, i);
            cxt.lineTo(x, y);

        }

        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    }
}

function boomGenerateSpark() {
    initSparkAttr();

    // console.log('sparks', sparks);
    sparkAnimation();
}

function initSparkAttr() {
    //
    let length = 50;
    for (let i = 0; i < length; i++) {

        let spark = new Spark();
        // let degree = 360 / length * i;//角度数
        //1.这个是获取圆上的点为end点
        // spark.end = getEndPointForCircle(spark.start,degree);
        //2.随机获取点为end点  在圆内
        spark.end = getRandomEndPoint(spark.start, i % 2);
        // console.log('spark',spark.end);
        // debugger
        sparks.push(spark);
    }
}

function getIsSamePoint(point) {
    let isSame = false;
    for (let i = 0; i < sparks.length; i++) {
        let spark = sparks[i];
        if ((spark.x == point.x) && (spark.y == point.y)) {
            isSame = true;
            break;
        }

    }

    return isSame;
}

function getEndPointForCircle(center, degree) {
    let radius = 150;

    let x = center.x + Math.cos(Math.PI * 2 / 360 * degree) * radius;
    let y = center.y + Math.sin(Math.PI * 2 / 360 * degree) * radius;

    return {
        x: x,
        y: y
    }

}

function getRandomEndPoint(center, type) {
    //保证随机性
    let radius = 150;
    //type true  false
    let x = center.x + (type ? Math.random() * radius : -Math.random() * radius);
    let y = center.y + (type ? -Math.random() * radius : Math.random() * radius);
    switch (parseInt(Math.random() * 3)) {
        case 0:
            x = center.x + (type ? -Math.random() * radius : Math.random() * radius);
            y = center.y + (type ? -Math.random() * radius : Math.random() * radius);
            break;
        case 1:
            x = center.x + (type ? -Math.random() * radius : Math.random() * radius);
            y = center.y + (type ? -Math.random() * radius : -Math.random() * radius);
            break;
        case 2:
            x = center.x + (type ? -Math.random() * radius : -Math.random() * radius);
            y = center.y + (type ? Math.random() * radius : -Math.random() * radius);
            break;
    }
    if (getIsSamePoint({
        x: x,
        y: y
    })) {
        getRandomEndPoint(center, type);
    } else {
        return {
            x: x,
            y: y
        }
    }

}

function sparkAnimation() {

    for (let i = 0; i < sparks.length; i++) {
        let spark = sparks[i];
        spark.percent = (spark.percent + 1) % 18;
        if (spark.percent != 0) {
            if (spark.sparksPaths.length == 0) {
                spark.initSparksPath();
            }
            spark.drawPath();
        }
        // console.log('spark',spark.percent);
        if (spark.percent <= 0) {
            sparks[i].isEnd = true;
        }

    }

    for (let i = 0; i < sparks.length; i++) {
        if (sparks[i].isEnd) {
            sparkEndLength++;
        }
    }

    if (sparkEndLength > sparks.length) {
        clearCanvas();
    } else {
        requestAnimFrame(function () {
            animateLength++;
            //这里给个变量进行中途清除  然动画的视觉效果看起来是向外扩散的  不清除的话会看见一整条线  清除了就只有单独的某几段啦
            if (animateLength % 10) {
                cxt.fillRect(0, 0, 800, 500);
            }
            sparkAnimation();
        });
    }

}

function clearCanvas() {

    for (let i = 0; i < sparks.length; i++) {
        let spark = sparks[i];
        spark.clearSparksPath();
    }
    sparks = [];
    console.log('clear');

    startAnimate();
}

initCanvas();
