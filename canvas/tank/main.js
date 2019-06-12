
// import  Tank from "./tank"

class Main {
    constructor() {
        //初始化
        /*****
         * 1.canvas初始化
         * 1.开始菜单
         * 2.loading界面
         * 3.场景背景
         */

        this.gameState =  1;//游戏状态
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
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        ctx.save();
        return ctx;
    }
    start(){
        //主线程
        //初始化场景
        // scene.createScene()
        //主角出现
        //敌机出现  敌机达到一定数量就不出现啦


        this.gameLoop();
    }
    gameLoop(){
        switch (this.gameState) {
            case 1:
                this.draw();
                break;
            case 2:
                break;
            default:
                break;
        }
    }
    draw(){
        //绘制所有
        // const IMG = document.getElementById('enemy');
        // let enemy = new Enemy();//敌机
        // enemy.draw();


        // let prop = new Prop(3);  //帽子道具
        // prop.draw()

        let prop1 = new Prop(PROP_PROJECT);
        prop1.setClip({
            clipHeight:32,
            clipWidth:32
        });
        prop1.draw();
        prop1.animate();

        tank.draw('./img/p_sprites.png');


    }
}



