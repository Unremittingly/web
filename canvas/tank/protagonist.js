
//主角类
class Protagonist extends Tank{
    constructor(props) {

        //构造唯一单例
        if(!Protagonist.tank){
            super(props);

            this.start = {
                x:0,
                y:0
            };
            this.pos = {x: 32*4, y: 384};
            this.clipWidth = 28;
            this.clipHeight = 28;

            Protagonist.tank = this;

            return this;
        }else{
            return Protagonist.tank;
        }


    }
    getPosition(){
        return this.pos;
    }

}