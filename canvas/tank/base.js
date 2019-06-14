//基础类
/****
 * 1.位置
 * 2.移动
 * 3.创建
 * 4.碰撞
 */

class Base {
    constructor() {
        this.pos = {x: 0, y: 0};//物品在场景中的位置
        this.start = {x: 0, y: 0};//物品在img中的位置

        this.imageData = null;
        this.ctx = tankCtx;
        this.clipWidth = 28;
        this.clipHeight = 28;
        this.url = null;

        this.speed = 2;//速度


    }

    setPosition(pos) {
        this.pos = pos;
    }



    move() {

    }

    cover() {
        this.ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.ctx.save();
        this.draw();
    }

    collision() {
        //碰撞检测
    }

    //绘制物品 通用
    draw() {

        // console.log('ctx', this.start);
        // console.log('pos', this.pos);

       let d =tankCtx.drawImage(RESOURCE_IMG,
            this.start.x, this.start.y,
            this.clipWidth, this.clipHeight, this.pos.x, this.pos.y, this.clipWidth, this.clipHeight);

        // console.log('d=====',d);
        // ctx.drawImage(this.getImage(src), 0, 0, 28, 28, 30, 30, 30, 30);

    }
}