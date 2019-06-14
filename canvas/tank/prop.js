class Prop extends Base {
    constructor(type) {
        super();
        this.visible = true;
        this.type = type ? type : 1;
        this.projectTime = 500;

        console.log('time', this.time);
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
                console.log('thi', this.START);
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

    animate() {


        if (this.projectTime > 0) {
            let self = this;

            tankCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
            tank.draw();
            self.start = {
                x: 160,
                y: (this.projectTime % 2) * 32 + 96
            };
            this.projectTime--;

            self.draw();
        } else {
            this.projectTime = 500;
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