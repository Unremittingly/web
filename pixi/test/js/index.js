//碰撞检测的插件Bump
let b = new Bump(PIXI);
// //补间动画插件Charm
// let c = new Charm(PIXI);
function load(app) {
    PIXI.loader
        .add(["img/enemy2.png",'img/enemy1.png','img/t.png'])
        .load(()=>{
            setup()
        });
}

function  setup(){
    //Create the cat sprite
    let cat = new PIXI.Sprite(PIXI.loader.resources["img/enemy2.png"].texture);
    // let cat1 = new PIXI.Sprite(PIXI.loader.resources["img/enemy1.png"].texture);
    //Add the cat to the stage
    cat.position.set(30,200);
    // cat1.x = 100;
    // cat1.y = 100;
    cat.vx = 0;
    cat.vy = 0;
    cat.width = 30;
    cat.height = 30;


    //分组
    let animals = new PIXI.Container();
    animals.addChild(cat);
    // animals.addChild(cat1);

    app.stage.addChild(animals);
    //为cat绑定方向键的监听
    bindDirectionKeyBoard(cat);
    
    const box = drawRect();
    const road = drawRoad();
    app.stage.addChild(road);
    // app.stage.addChild(box);

    const layer = new Layer();
    app.ticker.add(delta => gameLoop(cat,box,road));

    // jump(cat);
}

function gameLoop(cat,box,road,delta) {
    //Apply the velocity values to the cat's
    //position to make it move
    moveAnimate(cat);

    if(b.hit(box,cat)){
        box.tint = 0xff3300;
    }

    if(road){
        if(b.hit(road, cat)){
            cat.vy = 0;
        }
    }
    //边界
    const collision = b.contain(cat,{x:tileWidth,y:tileHeight,width:wallWidth-tileWidth*2,height:wallHeight-tileWidth});
    if(collision){
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

