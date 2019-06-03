//子弹
class Bullet  extends Base{
    constructor(ctx) {
        super();
        console.log('bullet');
        this.ctx = ctx;
        this.pos = {x: 0, y: 0}
    }
}