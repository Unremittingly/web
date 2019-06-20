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

    //销毁动画
    destroyAnimate() {

    }

    //direction 方向 移动
    move(direction) {
        if (this.isPass(this.pos, direction)) {


            let _this = this;
            if (_this.moveDistance > 0) {

                switch (direction) {
                    case TOP:
                        if (_this.pos.y > 0) {
                            _this.pos = {
                                x: _this.pos.x,
                                y: _this.pos.y - 3
                            };
                        }

                        _this.start = {
                            x: 0,
                            y: 0
                        };
                        break;
                    case RIGHT:
                        if (_this.pos.x < 384) {
                            _this.pos = {
                                x: _this.pos.x + 3,
                                y: _this.pos.y
                            };
                        }

                        _this.start = {
                            x: 96,
                            y: 0
                        };
                        break;
                    case LEFT:
                        if (_this.pos.x > 0) {
                            _this.pos = {
                                x: _this.pos.x - 3,
                                y: _this.pos.y
                            };
                        }

                        _this.start = {
                            x: 64,
                            y: 0
                        };
                        break;
                    case BOTTOM:
                        if (_this.pos.y < 384) {
                            _this.pos = {
                                x: _this.pos.x,
                                y: _this.pos.y + 3
                            };
                        }

                        _this.start = {
                            x: 32,
                            y: 0
                        };
                        break;
                }

                _this.moveDistance--;

            } else {
                _this.moveDistance = 16;
                if (_this.interval) {
                    clearInterval(_this.interval);
                    _this.interval = null;
                }

            }
        }

    }

    isPass1(pos){

        let isPass = true;
        let rightBottomPos = {
            x: pos.x + 28,
            y: pos.y + 28
        };
        let rect = [pos,rightBottomPos];
        let posArr = scene.getElementPos();
        for (let i = 0; i < posArr.length; i++) {
            let rect1 = posArr[i];
            if(rect.collision(rect1)){
                isPass = false;
                break;
            }
        }
        return isPass;
    }

    //判断当前位置是否可以移动通过 检测
    isPass(pos, direction) {
        let arr = LEVEL_ALL[0];
        let distance = 16;
        let isMove = false;
        let rightBottomPos = {
            x: pos.x + 32,
            y: pos.y + 32
        };

        //通过pos判断index
        let xIndex = Math.ceil(pos.x / 16);
        let yIndex = Math.ceil(pos.y / 16);
        console.log('xIndex',xIndex,yIndex,pos);
        for (let i = 0; i < arr.length; i++) {
            //i=0

            // let yMove = true;

            let lt = arr[yIndex][xIndex];
            let rt = arr[yIndex][xIndex + 1];

            let lb = arr[yIndex + 1][xIndex];
            let rb = arr[yIndex + 1][xIndex + 1];

            if (direction === TOP) {
                //定点是否可移动
                if (yIndex >= 1) {
                    lt = arr[yIndex - 1][xIndex];
                    rt = arr[yIndex - 1][xIndex + 1];
                }
                console.log('lt,RT',lt,rt);
                if (lt === ROAD && rt === ROAD ) {
                    isMove = true;
                }
                // if(contains(lt,))
            } else if (direction === LEFT) {
                lt = arr[yIndex][xIndex - 1];
                lb = arr[yIndex + 1][xIndex - 1];
                console.log('lt,lb',lt,lb);
                if (lt === ROAD && lb === ROAD ) {
                    isMove = true;
                }
            } else if (direction === RIGHT) {
                rt = arr[yIndex][xIndex + 2];
                rb = arr[yIndex + 1][xIndex + 2];

                console.log('rt,rb',rt,rb);
                if (rt === ROAD && rb === ROAD ) {
                    isMove = true;
                }
            } else if (direction === BOTTOM) {
                if (yIndex <= 13) {
                    lb = arr[yIndex + 2][xIndex];
                    rb = arr[yIndex + 2][xIndex + 1];
                }
                console.log('lb,rb',lb,rb);
                if (lb === ROAD && rb === ROAD) {
                    isMove = true;
                }
            }

            // console.log('col1',col1);
            // console.log('col[j]', col[xIndex]);



            // console.log('xmove,ymove', xMove, yMove);

            if (isMove) {
                break;
            }

        }

        return isMove;
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