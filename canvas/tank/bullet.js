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
        x: 146,
        y: 110
    },
    'left': {
        x: 146,
        y: 110
    },
    'right': {
        x: 146,
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
            x: tank.start.x + (tank.start.x + 32) / 2,
            y: tank.start.y - (tank.start.y + 32) / 2
        };
        this.speed = 4;

        this.clipWidth = 8;
        this.clipHeight = 8;


    }

    destroy() {
        //销毁
        tankCtx.clearRect(this.pos.x, this.pos.y, 8, 8);
        tankCtx.fillRect(this.pos.x, this.pos.y, 8, 8);
    }

    hit() {
        //碰撞
    }

    move() {
        let {x, y} = this.pos;
        if (x === 0 && y === 0) {
            //墙壁爆炸效果
            return;
        }
        switch (this.type) {
            case bulletBottom:
                y += speed;
                break;
            case bulletLeft:
                x += speed;
                break;
            case bulletRight:
                x -= speed;
                break;
            case bulletTop:
                y -= speed;
                break;
        }
        this.pos = {
            x,
            y
        };
        this.clean();
        this.draw();
    }

    draw() {
        this.start = bulletPos[this.direction];
        super.draw();
    }

}