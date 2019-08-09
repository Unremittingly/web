//场景  背景画面
class Scene {
    constructor(ctx) {
        console.log('scene');
        this.ctx = ctx;
        this.hasBoss = false;
        this.sceneElementPos = [];
        // this.createScene(1);
    }

    static init() {
        let dom = document.getElementById('scene');
        let ctx = dom.getContext('2d');
        ctx.fillStyle = '#999';
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 416, 416);
        ctx.save();
        return ctx;
    }

    getElementPos() {
        return this.sceneElementPos;
    }


    createScene(level) {
        let arr = LEVEL_ALL[level - 1];
        // this.sceneElementPos = initElementPos(arr, {
        //     width: 16,
        //     height: 16
        // });

        for (let i = 0; i < arr.length; i++) {
            let cross = arr[i];
            console.log('i', i);
            for (let j = 0; j < cross.length; j++) {
                let vertical = cross[j];
                let pos = {
                    x: j * ELEMENT_WIDTH,
                    y: i * ELEMENT_HEIGHT
                };

                if (vertical === 0 && !this.hasBoss) {
                    this.draw(vertical, pos);
                } else {
                    if (vertical < 5) {
                        this.draw(vertical, pos);
                    }
                }
            }
        }
        //h绘制一条线到416 416
        // sceneCtx.beginPath();
        // sceneCtx.strokeStyle= '#fff';
        // sceneCtx.moveTo(0,0);
        // sceneCtx.lineTo(416,0);
        // sceneCtx.lineTo(416,416);
        // sceneCtx.lineTo(0,416);
        // sceneCtx.stroke();
    }

    /*****
     *
     * @param pos   坐标
     * @param direction   方向  上下左右
     */
    clearElement(pos,direction){
        //消除一层元素

    }

    draw(type, pos) {
        // console.log('type',type);
        let position = mapPosToElement[type];
        let width = ELEMENT_WIDTH;
        if (type !== 0) {
            //绘制其他元素
            sceneCtx.drawImage(RESOURCE_IMG, position.x, position.y,
                width, width, pos.x, pos.y, width, width);
        } else if (!this.hasBoss) {
            //绘制boss
            this.hasBoss = true;
            sceneCtx.drawImage(RESOURCE_IMG, position.x, position.y,
                width * 2, width * 2, pos.x, pos.y, width * 2, width * 2);
        }


        sceneCtx.save();
    }
}