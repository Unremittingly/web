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
        this.pos = this.getPos();
        console.log('tank', tank.pos);
        this.speed = 4;
        this.clipWidth = 8;
        this.clipHeight = 8;
        this.isDestroyed = false;

    }

    getPos() {
        let x = tank.pos.x;
        let y = tank.pos.y;
        switch (this.direction) {
            case bulletTop:
            case bulletBottom:
                x = 16 + tank.pos.x;
                break;

            case bulletLeft:
            case bulletRight:
                y = 16 + tank.pos.y;
                break;
        }
        return {x, y}
    }

    destroy() {
        //销毁
        // console.log('despss',this.pos);
        this.ctx.clearRect(this.pos.x, this.pos.y, 8, 8);
        this.ctx.fillRect(this.pos.x, this.pos.y, 8, 8);
    }

    hit() {
        //碰撞
        let hit = false;
        let point = this.pos;
        switch (this.direction) {
            case bulletTop:
                point = {
                    x: this.pos.x,
                    y: this.pos.y
                };
                //todo 获取当前位置是什么元素  如果是6泥土 就消除  如果是刚砖就判断火力是最大就消除

                break;

            case bulletBottom:
                point = {
                    x: this.pos.x,
                    y: this.pos.y + this.clipHeight
                };
                break;

            case bulletLeft:
                point = {
                    x: this.pos.x,
                    y: this.pos.y
                };
                break;

            case bulletRight:
                point = {
                    x: this.pos.x + this.clipWidth,
                    y: this.pos.y
                };
                break;
        }
        //判断点是否在障碍物上面
        let colIndex =  parseInt(point.x / 16);
        let rowIndex =parseInt( point.y / 16);

        let arr = LEVEL_ALL[0];
        let cur = arr[colIndex][rowIndex];
        if (cur === ROAD) {
            return false;
        } else if (cur === RIVER) {
            //河道  略过

        }else if (cur === GRASS) {
            //草丛  略过  如果有去草丛道具 可以清除一层元素

        } else if (cur === ADOBE) {
            //泥砖    消除一层泥砖
            scene.clearElement(this.pos,this.direction);
        } else if (cur === STEEL) {
            //刚砖
            //如果是最大火力可以消除一层刚砖
            hit = true;
        } else if (cur === H_ROAD) {
            //高速路  略过

        }


        return hit;
    }

    move() {
        // console.log('bullet   move');
        this.destroy();
        let {x, y} = this.pos;
        if (y <= 0 || y >= MAP_WIDTH || x <= 0 || x >= MAP_WIDTH) {
            //墙壁爆炸效果
            // console.log('BOOM');
            this.isDestroyed = true;
            return;
        }
        //遇到地图元素的反应
        let isHit = this.hit();
        if (isHit) {
            return;
        }

        let speed = this.speed;
        switch (this.direction) {
            case bulletBottom:
                x = this.pos.x;
                y += speed;
                break;
            case bulletTop:
                x = this.pos.x;
                y -= speed;
                break;
            case bulletLeft:
                x -= speed;
                y = this.pos.y;
                break;
            case bulletRight:
                x += speed;
                y = this.pos.y;
                break;

        }

        this.pos = {x, y};

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