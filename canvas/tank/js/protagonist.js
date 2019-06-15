//主角类
class Protagonist extends Tank {
    constructor(props) {

        //构造唯一单例
        if (!Protagonist.tank) {
            super(props);

            this.start = {
                x: 0,
                y: 0
            };
            this.pos = {x: 32 * 4, y: 384};
            this.clipWidth = 28;
            this.clipHeight = 28;
            this.isHit = false;
            this.interval = null;
            this.speed = 3;

            Protagonist.tank = this;

            this.isMove = false;
            return this;
        } else {
            return Protagonist.tank;
        }


    }

    setHit(hit) {
        this.isHit = hit;
    }

    getPosition() {
        return this.pos;
    }

    getMoveState (){
        return this.isMove;
    }

    //direction 方向
    move(direction) {
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
            if(_this.interval){
                clearInterval(_this.interval);
                _this.interval = null;
            }

        }


    }


}