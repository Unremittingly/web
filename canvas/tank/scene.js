//场景  背景画面
class Scene {
    constructor(ctx) {
        console.log('scene');
        this.ctx = ctx;
        this.elementArr = [ROAD,RIVER,H_ROAD,GRASS,ADOBE,STEEL];
        this.hasBoss = false;
        // this.createScene(1);
    }
    static init(){
        let dom = document.getElementById('scene');
        let ctx=dom.getContext('2d');
        ctx.fillStyle = '#999';
        ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.fillRect(0,0,416,416);
        ctx.save();
        return ctx;
    }
    getType(){

    }
    createScene(level){
        let arr =LEVEL_ALL[level-1];

        for (let i = 0; i < arr.length; i++) {
            let cross = arr[i];
            console.log('i',i);
            for (let j = 0; j < cross.length; j++) {
                let vertical = cross[j];
                let pos = {
                    x:j*16,
                    y:i*16
                }

                if(vertical === 0 && !this.hasBoss){
                    this.draw(vertical,pos);
                    console.log('111');
                }else{
                    if( vertical<5){
                        this.draw(vertical,pos);
                    }
                }

            }
        }
        //h绘制一条线到416 416
        sceneCtx.beginPath();
        sceneCtx.strokeStyle= '#fff';
        sceneCtx.moveTo(0,0);
        sceneCtx.lineTo(416,0);
        sceneCtx.lineTo(416,416);
        sceneCtx.lineTo(0,416);
        sceneCtx.stroke();
    }
    draw(type,pos){
        // console.log('type',type);
        let position = mapPosToElement[type];
        let width= 16;
         if(type!==0){
            sceneCtx.drawImage(RESOURCE_IMG,position.x,position.y,16,16,pos.x,pos.y,16,16);
        }else if(!this.hasBoss){
             //绘制boss
            this.hasBoss =true;
            console.log('width',width);
            sceneCtx.drawImage(RESOURCE_IMG,position.x,position.y,32,32,pos.x,pos.y,32,32);
        }




        sceneCtx.save();
    }
}