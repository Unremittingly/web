

class Prop extends Base {
    constructor(type) {
        super();
        this.visible = true;
        this.type = type ? type : 1;
        this.setValueForType(type);
        this.isAnimate = true;
        this.time = new Date().getTime();
        console.log('time', this.time);
    }

    stopAnimate() {
        this.isAnimate = false;
    }
    setClip(size){
        this.clipHeight = size.clipHeight;
        this.clipWidth = size.clipWidth;
    }

    setVisible(visible) {
        this.visible = visible;
    }

    setValueForType(type) {
        switch (type) {
            case PROP_PROJECT:
                this.start = {x: 160, y: 96+32};
                this.pos = {x: 50, y: 100};
                break;
            case 6:
                this.start = {x: 95, y: 110};
                this.pos = {x: 100, y: 100};
                break;
            case 7:
                this.start = {x: 126, y: 141};
                this.pos = {x: 100, y: 100};
                break;
        }
    }

    animate() {


        let self = this;
        let time = 500;
        //这里用settimeout 更好
        let interval = setInterval(function () {
            tankCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            tank.draw();
            self.start = {
                x:160,
                y:(time%2)*32+96
            };
            // // self.setValueForType(this.type);
            self.draw();
            time--;
            let curTime = new Date().getTime();
            if (curTime - self.time > 200000) {
                clearInterval(interval);
            }
        }, 300);


    }

    clean() {

    }

    change(pos) {
        this.clean();
        this.setVisible(true);
        this.setPosition(pos);
    }
}