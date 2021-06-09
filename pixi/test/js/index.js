//碰撞检测的插件Bump
let b = new Bump(PIXI);
// //补间动画插件Charm
// let c = new Charm(PIXI);


let play = {};
const plays = null;
let road =null;

const DIRECTION = {
    RIGHT: 'right',
    TOP: 'top',
    LEFT: 'left',
    DOWN: 'down',
    DEFAULT: ''
};

let direction = '';

let obstacles = [];//障碍物
function load(app) {
    PIXI.loader
        .add([
            "img/enemy2.png",
            'img/enemy1.png',
            'img/t.png',
            "img/bullet.png"
        ])
        .load(() => {
            setup()
        });
}

function setup() {

    play = new Play();
    const {obj, bullet} = play;
    console.log('bbb', bullet);
    //分组
    let plays = new PIXI.Container();
    plays.addChild(obj);
    plays.addChild(bullet.obj);

    // animals.addChild(cat1);

    app.stage.addChild(plays);
    //为cat绑定方向键的监听
    bindDirectionKeyBoard(obj);

    const box = drawRect();
     road = drawRoad();
    obstacles = new PIXI.Container();
    obstacles.addChild(road);

    app.stage.addChild(obstacles);
    // app.stage.addChild(box);

    const layer = new Layer();
    app.ticker.add(delta => gameLoop(obj, box, road));

    // jump(cat);
}



const moveBullet = (bullet, direct = DIRECTION.DOWN) => {

    // console.log('play',play);
    bullet.move(direct);
    //和精灵组之间的碰撞
    if (b.hit(bullet.obj, obstacles.children)) {
        console.log('11');
        // console.log('11111');
    }
};

function gameLoop(cat, box, road, delta) {
    //Apply the velocity values to the cat's
    //position to make it move

    if (play) {
        const {bullet, obj} = play;
        //设置速度 让子弹动起来
        // bullet.setSpeed(1);
        moveAnimate(obj);
        moveBullet(bullet);
    }

    if (b.hit(box, cat)) {
        box.tint = 0xff3300;
    }

    if (road) {
        //遇见了墙或者障碍物  让速度变成0
        if (b.hit(cat, road, true)) {
            cat.vy = 0;
            cat.vx = 0;
        }
    }
    //边界
    const collision = b.contain(cat, {x: tileWidth, y: tileHeight, width: wallWidth - tileWidth * 2, height: wallHeight - tileWidth});
    if (collision) {
        // console.log('ccc',collision);
    }

}

//移动精灵 loop里面操作
function moveAnimate(cat) {
    cat.x += cat.vx;
    cat.y += cat.vy;
}

function drawRect() {
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 30, 30);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    return rectangle;

}

function drawRoad() {
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 400, 10);
    rectangle.endFill();
    rectangle.x = 0;
    rectangle.y = 300;
    return rectangle;
}

