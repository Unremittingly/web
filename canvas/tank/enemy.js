
const enemyType = {
    normal:1,
    fast:2,
    big:3,
    bigB:4
};
//敌机
class Enemy extends Base{
    constructor(ctx) {
        super();
        console.log('enemy');
        this.ctx = ctx;
        this.pos = {x: 0, y: 0};
        this.isRed = false;//是否标红可以出道具
    }

}