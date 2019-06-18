//主角类
class Protagonist extends Tank {
    constructor(props) {

        //构造唯一单例
        if (!Protagonist.tank) {
            super(props);

            this.start = {
                x: 0,
                y: 0
            };
            this.pos = {x: 32 * 4, y: 384};
            this.clipWidth = 28;
            this.clipHeight = 28;
            this.isHit = false;
            this.interval = null;
            this.speed = 3;

            Protagonist.tank = this;

            this.isMove = false;
            return this;
        } else {
            return Protagonist.tank;
        }


    }

    setHit(hit) {
        this.isHit = hit;
    }

    getPosition() {
        return this.pos;
    }

    getMoveState (){
        return this.isMove;
    }




    update(isFirst){

        if(keys.contain(KEY_CODE.top)){
            this.move('top');
        }else if(keys.contain(KEY_CODE.left)) {
            this.move('left')
        }else if(keys.contain(KEY_CODE.bottom)) {
            this.move('bottom')
        }else if(keys.contain(KEY_CODE.right)) {
            this.move('right')
        }
        this.draw();


        if(isFirst){
            //保护道具
            let project = gameObject.getProp('project');

            // console.log('project',project);
            project.animate();
        }
    }


}