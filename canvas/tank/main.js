
// import  Tank from "./tank"
let gameObject = null;
let tank = null;
let scene = null;
class Main {
    constructor(props) {
        //初始化
        /*****
         * 1.canvas初始化
         * 1.开始菜单
         * 2.loading界面
         * 3.场景背景
         */
        this.ctx = Main.init();
        this.image = '';

    }
    static init(){
        let dom = document.getElementById('tank');
        let ctx=dom.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,800,600);
        ctx.save();
        return ctx;
    }
    draw(){
        this.ctx.drawImage(this.image,0,0,20,20,0,0);

    }
}



function startGame() {
    gameObject = new Main();
    tank = new Tank();
    scene = new Scene();

}
startGame();