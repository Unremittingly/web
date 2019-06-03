//基础类
/****
 * 1.位置
 * 2.移动
 * 3.创建
 * 4.碰撞
 */
class Base {
    constructor(ctx) {
        this.pos = {x: 0, y: 0};
        this.imageData = null;
        this.ctx = ctx;
        this.width = 20;
        this.height = 20;
    }

    setPosition(pos) {
        this.pos = pos;
    }

    getImage() {

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

    draw() {
        this.ctx.drawImage(this.getImage(),
            this.pos.x, this.pos.y,
            this.width, this.height);
    }
}