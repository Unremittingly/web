

class Protagonist extends Tank{
    constructor(props) {
        super(props);

        this.start = {
            x:0,
            y:0
        };
        this.pos = {x: 32*4, y: 384};

        this.clipWidth = 28;
        this.clipHeight = 28;

    }
    getPosition(){
        return this.pos;
    }

}