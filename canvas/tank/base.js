//基础类
/****
 * 1.位置
 * 2.移动
 * 3.创建
 * 4.碰撞
 */
class Base {
    constructor() {
        this.pos = {x: 0, y: 0};
        this.start = {x: 0, y: 0};
        this.imageData = null;
        this.ctx = ctx;
        this.clipWidth = 28;
        this.clipHeight = 28;

    }

    setPosition(pos) {
        this.pos = pos;
    }

    getImage(src) {
        let img = new Image();
        src = src ? src : './img/enemy.jpg';
        img.src = src;
        return img;
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

    draw(src) {

        console.log('ctx',this.start);
        ctx.drawImage(this.getImage(src),
            this.start.x, this.start.y,
            this.clipWidth, this.clipHeight, this.pos.x, this.pos.y, this.clipWidth, this.clipHeight);


        // ctx.drawImage(this.getImage(src), 0, 0, 28, 28, 30, 30, 30, 30);

    }
}