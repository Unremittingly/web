
// import  Tank from "./tank"
let gameObject = null;
let tank = null;
let scene = null;
let ctx = null;
class Main {
    constructor(props) {
        //初始化
        /*****
         * 1.canvas初始化
         * 1.开始菜单
         * 2.loading界面
         * 3.场景背景
         */

        this.image = '';
        this.level = 1;
        this.enemys = 20;
        this.tanks = 3;
        this.remainingEnemys = this.enemys;
        this.remainingTanks = this.tanks;


    }
    static init(){
        let dom = document.getElementById('tank');
        let ctx=dom.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,800,600);
        ctx.save();
        return ctx;
    }
    start(level){
        //主线程
        //初始化场景
        // scene.createScene()
        //主角出现
        //敌机出现  敌机达到一定数量就不出现啦
        this.draw();
    }
    draw(){
        // const IMG = document.getElementById('enemy');
        let enemy = new Enemy();
        enemy.draw();
        tank.draw('./img/p_sprites.png');

        let prop = new Prop(3);
        prop.draw()

        let prop1 = new Prop(6);
        prop1.draw();
        prop1.animate();



    }
}



