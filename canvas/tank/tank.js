//主角

class Tank {
    constructor(ctx) {
        console.log('tank');
        this.ctx = ctx;
        this.bullets = [];
    }
    move(){
        //清除后再换个地方绘制

    }
    shooting(){
        let bullet = new Bullet(this.ctx);
        this.bullets.push(bullet);
    }
}
// export default Tank;