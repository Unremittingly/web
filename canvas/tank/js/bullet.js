//子弹
const tankType = 1;
const enemyType = 2;
//子弹方向
const bulletTop = 'top';
const bulletRight = 'right';
const bulletBottom = 'bottom';
const bulletLeft = 'left';

const bulletPos = {
    'top': {
        x: 146,
        y: 110
    },
    'bottom': {
        x: 162,
        y: 110
    },
    'left': {
        x: 170,
        y: 110
    },
    'right': {
        x: 154,
        y: 110
    },
};

class Bullet extends Base {
    constructor(ctx) {
        super();
        console.log('bullet');
        this.type = tankType;
        this.direction = 'top';
        this.ctx = ctx;
        this.pos = {
            x: tank.pos.x ,
            y: tank.pos.y
        };
        console.log('tank',tank.pos);
        this.speed = 4;

        this.clipWidth = 8;
        this.clipHeight = 8;
        this.isDestroyed = false;


    }

    destroy() {
        //销毁
        // console.log('despss',this.pos);
        this.ctx.clearRect(this.pos.x, this.pos.y, 8, 8);
        this.ctx.fillRect(this.pos.x, this.pos.y, 8, 8);
    }

    hit() {
        //碰撞
    }

    move() {
        // console.log('bullet   move');
        this.destroy();
        let {x, y} = this.pos;
        if (y === 0) {
            //墙壁爆炸效果
            // console.log('BOOM');
            this.isDestroyed = true;
            return;
        }
        let speed = this.speed;
        switch (this.direction) {
            case bulletBottom:
                y += speed;
                x = tank.pos.x + 14;
                break;
            case bulletLeft:
                x += speed;
                y=tank.pos.y+14;
                break;
            case bulletRight:
                x -= speed;
                y=tank.pos.y-14;
                break;
            case bulletTop:
                x = tank.pos.x + 14;
                y -= speed;
                break;
        }

        this.pos = {
            x,
            y
        };

        this.draw();
    }

    draw() {
        this.start = bulletPos[this.direction];
        this.ctx.drawImage(RESOURCE_SPRITES,
            this.start.x, this.start.y,
            this.clipWidth, this.clipHeight,
            this.pos.x, this.pos.y,
            this.clipWidth, this.clipHeight);
    }

}