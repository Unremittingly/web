//tank基类

class Tank  extends Base{
    constructor() {
        super();
        console.log('tank');
        this.bullets = [];
        this.width = 20;
        this.height = 20;
    }
    move(){
        //移动

    }
    shooting(){
        //发射子弹
        let bullet = new Bullet(this.ctx);
        this.bullets.push(bullet);
    }
    deleteBullet(){

    }
}
// export default Tank;