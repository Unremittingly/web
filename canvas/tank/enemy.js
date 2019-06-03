//敌机
class Enemy extends Base{
    constructor(ctx) {
        super();
        console.log('enemy');
        this.ctx = ctx;
        this.pos = {x: 0, y: 0}
    }

}