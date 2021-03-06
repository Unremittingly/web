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

        //tank被摧毁
        this.isDestroyed = false;

    }

    //销毁动画
    destroyAnimate() {
        let boomStart = BOOM_POSITION;
        tankCtx.drawImage(RESOURCE_IMG, boomStart.x, boomStart.y, 32, 32, this.pos.x, this.pos.y);
    }

    //direction 方向 移动
    move(direction) {
        if (this.isPass(direction)) {


            let _this = this;
            if (_this.moveDistance > 0) {

                switch (direction) {
                    case TOP:
                        if (_this.pos.y > 0) {
                            _this.pos = {
                                x: _this.pos.x,
                                y: _this.pos.y - 2
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
                                x: _this.pos.x + 2,
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
                                x: _this.pos.x - 2,
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
                                y: _this.pos.y + 2
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


    //判断当前位置是否可以移动通过 检测
    isPass(direction) {
        let pos = this.pos;
        let arr = LEVEL_ALL[0];
        let isMove = false;
        let rightBottomPos = {
            x: pos.x + 32,
            y: pos.y + 32
        };

        let eArr = [];
        //通过pos判断index
        let rowIndex = 0;
        let colIndex = 0;
        let size = ELEMENT_WIDTH;

        if(direction === TOP){
            colIndex = (this.pos.x) /size;
            let xflag = this.pos.x % size;
            rowIndex = (this.pos.y) /size;
            //这里向下取整 取得x轴第一个所占的元素块
            rowIndex = Math.floor(rowIndex);
            colIndex = Math.floor(colIndex);

            console.log(this.pos.x,this.pos.y);
            console.log(rowIndex,colIndex);

            if(xflag>4){
                console.log("tank占了:",colIndex,colIndex+1,colIndex+2);
                //可能会横跨三个
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex][colIndex+1]===6 && arr[rowIndex][colIndex+2]===6){
                    isMove = true;
                }
            }else{
                console.log("tank占了:",colIndex,colIndex+1);
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex][colIndex+1]===6){
                    isMove = true;
                }
            }


        }else if(direction === BOTTOM){
            colIndex = (this.pos.x) /size;
            let xflag = this.pos.x % size;
            rowIndex = (this.pos.y+28) /size;

            rowIndex = Math.floor(rowIndex);
            colIndex = Math.floor(colIndex);

            console.log(this.pos.x,this.pos.y);
            console.log(rowIndex,colIndex);

            if(xflag>4){
                console.log("tank占了:",colIndex,colIndex+1,colIndex+2);
                //可能会横跨三个
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex][colIndex+1]===6 && arr[rowIndex][colIndex+2]===6){
                    isMove = true;
                }
            }else{
                console.log("tank占了:",colIndex,colIndex+1);
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex][colIndex+1]===6){
                    isMove = true;
                }
            }
        }else if(direction === RIGHT){
            colIndex = (this.pos.x+28) /size;
            let xflag = this.pos.y % size;
            rowIndex = (this.pos.y) /size;

            rowIndex = Math.floor(rowIndex);
            colIndex = Math.floor(colIndex);

            console.log(this.pos.x,this.pos.y);
            console.log(rowIndex,colIndex);

            if(xflag>4){
                console.log("tank占了:",rowIndex,rowIndex+1,rowIndex+2);
                //可能会横跨三个
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex+1][colIndex]===6 && arr[rowIndex+2][colIndex]===6){
                    isMove = true;
                }
            }else{
                console.log("tank占了:",colIndex,colIndex+1);
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex+1][colIndex]===6){
                    isMove = true;
                }
            }

            // isMove = true;
        }else if(direction === LEFT){
            colIndex = (this.pos.x) /size;
            let xflag = this.pos.y % size;
            rowIndex = (this.pos.y) /size;

            rowIndex = Math.floor(rowIndex);
            colIndex = Math.floor(colIndex);

            console.log(this.pos.x,this.pos.y);
            console.log(rowIndex,colIndex);

            if(xflag>4){
                console.log("tank占了:",rowIndex,rowIndex+1,rowIndex+2);
                //可能会横跨三个
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex+1][colIndex]===6 && arr[rowIndex+2][colIndex]===6){
                    isMove = true;
                }
            }else{
                console.log("tank占了:",colIndex,colIndex+1);
                if(arr[rowIndex][colIndex] === 6 && arr[rowIndex+1][colIndex]===6){
                    isMove = true;
                }
            }

        }


        console.log('rowIndex',rowIndex,colIndex);
        // arr[colIndex][rowIndex];



        return isMove;
    }

    shooting() {
        //发射子弹
        let isEnd = false;

        let _this = this;
        if(!_this.isMove){
            this.bulletsInterval = setInterval(function () {
                if (_this.bullets.length) {
                    isEnd = true;
                    _this.isMove=true;
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
                    _this.bullets = [];
                    clearInterval(_this.bulletsInterval);
                    _this.isMove = false;
                }
            }, 20);
        }



    }

    deleteBullet() {

    }
}

// export default Tank;