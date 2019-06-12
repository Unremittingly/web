//场景  背景画面
class Scene {
    constructor(ctx) {
        console.log('scene');
        this.ctx = ctx;
        this.elementArr = [ROAD,RIVER,H_ROAD,GRASS,ADOBE,STEEL];

        // this.createScene(1);
    }
    static init(){
        let dom = document.getElementById('scene');
        let ctx=dom.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        ctx.save();
        return ctx;
    }
    getType(){

    }
    createScene(level){
        let arr =LEVEL_ALL[level-1];
        for (let i = 0; i < arr.length; i++) {
            let cross = arr[i];
            for (let j = 0; j < cross.length; j++) {
                let vertical = cross[j];
                this.draw(vertical);
            }
        }
    }
    draw(type){
        let position = mapPosToElement[type];
        // this.ctx.drawImage({},position.x,position.y,20,20);


        // this.ctx.save();
    }
}