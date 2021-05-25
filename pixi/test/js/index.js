
//重力
let gravity = 3;

//碰撞检测的插件Bump
let b = new Bump(PIXI);
//补间动画插件Charm
let c = new Charm(PIXI);
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
    app.ticker.add(delta => gameLoop(cat,box,road));
    // jump(cat);
}

//绑定上下左右键
function bindDirectionKeyBoard(cat) {
    let left = keyboard("ArrowLeft"),//左键
        up = keyboard("ArrowUp"),//上键
        right = keyboard("ArrowRight"),//右键
        down = keyboard("ArrowDown");//下键

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        cat.vx = -2;
        cat.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Up
    up.press = () => {
        cat.vy = -2;
        cat.vx = 0;
        // jump(cat);
    };
    up.release = () => {
        if (!down.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };

    //Right
    right.press = () => {
        cat.vx = 2;
        cat.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && cat.vy === 0) {
            cat.vx = 0;
        }
    };

    //Down
    down.press = () => {
        cat.vy = 2;
        cat.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && cat.vx === 0) {
            cat.vy = 0;
        }
    };
}

function jump(sprite) {
    c.slide(sprite, 180, 180, 120);
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
    const collision = b.contain(cat,{x:0,y:0,width:400,height:400});
    if(collision){
        // console.log('ccc',collision);
    }

}

//移动精灵 loop里面操作
function moveAnimate(cat) {
    cat.x += cat.vx;
    cat.y += cat.vy;
}

function contain(sprite, container) {
    let collision = undefined;
    //Left
    if (sprite.x < container.x) {
        // sprite.x = container.x;
        collision = "left";
    }

    //Top
    if (sprite.y < container.y) {
        // sprite.y = container.y;
        collision = "top";
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
        // sprite.x = container.width - sprite.width;
        collision = "right";
    }

    //Bottom
    if (sprite.y + sprite.height > container.height) {
        // sprite.y = container.height - sprite.height;
        collision = "bottom";
    }

    //Return the `collision` value
    return collision;
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

//碰撞检测 如果bump不能使用了 那么就用这个
function hitTestRectangle(r1, r2) {
//Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occurring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
}