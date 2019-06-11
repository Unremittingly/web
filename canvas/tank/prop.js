//道具
const prop_enum = {
    ADD: 1,//加盟坦克
    BOSS_PROTECT: 2,//金砖boss保护
    PROTECT: 3,//帽子 自己保护
    FIRE: 4,//火力 五星
    FIRE_MAX: 5,//火力 手枪


}

class Prop extends Base {
    constructor(type) {
        super();
        this.visible = true;
        this.type = type ? type : 1;
        this.setValueForType(type);
        this.url = './img/css_sprites.png';
        this.isAnimate = true;
        this.time = new Date().getTime();
        console.log('time', this.time);
    }

    stopAnimate() {
        this.isAnimate = false;
    }

    setVisible(visible) {
        this.visible = visible;
    }

    setValueForType(type) {
        switch (type) {
            case prop_enum.PROTECT:
                this.start = {x: 161, y: 10};
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

        //这里用settimeout 更好
        let interval = setInterval(function () {
            if (self.type === 6) {
                self.type = 7;
            } else {
                self.type = 6;
            }
            self.setValueForType(this.type);
            // self.draw();

            let curTime = new Date().getTime();
            if (curTime - self.time > 2000) {
                clearInterval(interval);
            }
        }, 500);


    }

    clean() {

    }

    change(pos) {
        this.clean();
        this.setVisible(true);
        this.setPosition(pos);
    }
}