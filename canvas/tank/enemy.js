const enemyType = {
    normal: 1,
    fast: 2,
    big: 3,
    bigB: 4
};

//敌机
class Enemy extends Tank {
    constructor() {
        super();
        console.log('enemy');
        this.pos = {x: 0, y: 0};
        this.isRed = false;//是否标红可以出道具
    }

    draw() {
        const IMG = new Image();
        IMG.src = './img/enemy.jpg';
        console.log('this.ctx', this.ctx, IMG);
        ctx.drawImage(IMG, 0, 0, 28, 28, 30, 30, 30, 30);

    }

}