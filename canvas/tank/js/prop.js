class Prop extends Base {
    constructor(type) {
        super();
        this.visible = true;
        this.type = type ? type : 1;
        this.projectTime = 160;

        this.POS = {
            'project': {x: 0, y: 0},
            'project_home': {},
            'fire': {},
            'max_fire': {},
            'add': {},
            'timer': {},
            'grenades': {}
        };
        this.START = {
            'project': {x: 160, y: 96 + 32},
            'project_home': {},
            'fire': {},
            'max_fire': {},
            'add': {},
            'timer': {},
            'grenades': {}
        };

        this.animateSpeed = 8;
        this.isAnimate = true;

        this.setValueForType(type);
    }

    setClip(size) {
        this.clipHeight = size.clipHeight;
        this.clipWidth = size.clipWidth;
    }

    setVisible(visible) {
        this.visible = visible;
    }

    setValueForType(type) {
        switch (type) {
            case PROP_PROJECT:
                //这里的是保护动画的位置 并不是帽子的位置
                this.start = this.START['project'];
                this.pos = tank.getPosition();
                this.speed = 1;
                break;
            case PROP_ADD:
                this.start = {x: 258, y: 114};
                this.pos = {x: 140, y: 100};
                break;
            case PROP_PROJECT_HOME:
                this.start = {x: 354, y: 114};
                this.pos = {x: 260, y: 100};
                break;
            case PROP_FIRE:
                this.start = {x: 290, y: 114};
                this.pos = {x: 180, y: 100};
                break;
            case PROP_MAX_FIRE:

                break;
            case PROP_TIMER:
                this.start = {x: 322, y: 114};
                this.pos = {x: 220, y: 100};
                break;
            case PROP_GRENADES:
                this.start = {x: 386, y: 114};
                this.pos = {x: 300, y: 100};
                break;

        }
    }

    setAnimateState(isAnimate) {
        this.isAnimate = isAnimate;
    }

    animate() {

        if (this.isAnimate) {
            if (this.projectTime > 0) {

                let self = this;
                //速度动画频率计算
                let temp = parseInt((160 - this.projectTime) / this.animateSpeed) % 2;
                self.start = {
                    x: 160,
                    y: 32 * temp + 96
                };
                this.projectTime--;
                self.draw();

                self.setValueForType(this.type);
            } else {
                this.projectTime = 500;
                this.setAnimateState(false);
            }
        }

    }

    clean() {

    }

    change(pos) {
        this.clean();
        this.setVisible(true);
        this.setPosition(pos);
    }
}