//子弹
const tankType =1;
const enemyType =2;

class Bullet  extends Base{
    constructor(ctx) {
        super();
        console.log('bullet');
        this.type = tankType;
        this.ctx = ctx;
        this.pos = tank;

    }
    destroy(){
        //销毁
    }
    hit(){
        //碰撞
    }



}