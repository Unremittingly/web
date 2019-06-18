
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

        this.gameState =  2;//游戏状态
        this.image = '';
        this.level = 1;
        this.enemys = 20;
        this.tanks = 3;
        this.remainingEnemys = this.enemys;
        this.remainingTanks = this.tanks;
        this.time = new Date().getTime();
        this.prop = null;//道具

    }

    static init(){
        let dom = document.getElementById('tank');
        let ctx=dom.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        ctx.save();
        return ctx;
    }
    //获取道具对象
    getProp(){
        return this.prop;
    }
    start(){
        //主线程
        //初始化场景
        // scene.createScene()
        //主角出现
        //敌机出现  敌机达到一定数量就不出现啦

        let _this = this;
        this.prop= new Prop(PROP_PROJECT);
        this.prop.setClip({
            clipHeight:32,
            clipWidth:32
        });

       let interval=  setInterval(function () {
            _this.gameLoop();

           let curTime = new Date().getTime();
           if (curTime - self.time > 10000) {
               clearInterval(interval);
           }
        },20)

    }
    gameLoop(){
        switch (this.gameState) {
            case GAME_STATE_INIT:
                break;
            case GAME_STATE_START:
                this.draw();
                break;
            default:
                break;
        }
    }
    draw(prop1){
        //绘制所有
        // const IMG = document.getElementById('enemy');
        // let enemy = new Enemy();//敌机
        // enemy.draw();

        tankCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        tank.update(true);



    }
}



