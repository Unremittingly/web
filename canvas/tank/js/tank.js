//tank基类

class Tank extends Base {
    constructor(direction) {
        super();
        console.log('tank');
        this.bullets = [];
        this.width = 20;
        this.height = 20;
        this.bulletsInterval = null;

        this.direction = direction ? direction : 'top';
        this.moveDistance = 16;

        this.isMove = true;

    }

    move() {
        //移动

    }

    //判断当前位置是否可以移动通过 检测
    isPass(pos) {
        let arr = LEVEL_ALL[0];
        let distance = 16;
        let isMove = false;
        let rightBottomPos = {
            x: pos.x + 32,
            y: pos.y + 32
        };

        //通过pos判断index
        let xIndex = parseInt(pos.x / 16);
        let yIndex = parseInt(pos.y / 16);
        for (let i = 0; i < arr.length; i++) {
            //i=0
            let xMove = false;
            let yMove = false;
            let col = arr[i];
            let col1 = arr[i+1];
            for (let j = 0; j < col.length; j=j+1) {
                if (xIndex === j) {
                    if (col[j] === ROAD && col[j + 1] === ROAD) {
                        xMove = true;
                    }
                }
            }

            for (let j = 0; j < col1.length; j=j+1) {
                if (yIndex === j) {
                    if (col1[j] === ROAD && col1[j + 1] === ROAD) {
                        yMove = true;
                    }
                }
            }
            isMove = yMove&&xMove;
            if(isMove){
                break;
            }

        }
        this.isMove = isMove;
        return this.isMove;
    }

    shooting() {
        //发射子弹
        let isEnd = false;

        let _this = this;

        this.bulletsInterval = setInterval(function () {
            if (_this.bullets.length) {
                isEnd = true;
                for (let i = 0; i < _this.bullets.length; i++) {
                    let bullet = _this.bullets[i];
                    if (!bullet.isDestroyed) {
                        isEnd = false;
                    }

                }
                for (let i = 0; i < _this.bullets.length; i++) {
                    let bullet = _this.bullets[i];

                    if (!bullet.isDestroyed) {
                        bullet.move();
                    }

                }
            } else {
                let bullet = new Bullet(sceneCtx);
                _this.bullets.push(bullet);
            }

            //停止子弹发射动画
            if (isEnd) {
                clearInterval(_this.bulletsInterval);
            }
        }, 20);


    }

    deleteBullet() {

    }
}

// export default Tank;