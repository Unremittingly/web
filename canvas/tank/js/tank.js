//tank基类

class Tank extends Base {
    constructor(direction) {
        super();
        console.log('tank');
        this.bullets = [];
        this.width = 20;
        this.height = 20;
        this.bulletsInterval = null;

        this.direction =  direction?direction:'top';
        this.moveDistance = 16;

    }

    move() {
        //移动

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