

class CanvasToGif {

    constructor(element){
        this.Element = element;
        this.gifObj = null;
        this.ifFinish = false;
        this.url = '';
        this.init();
    }

    onFinish(cb){
        if(cb){
            cb(this.url);
        }
    }
    init(){
        let _this = this;
        this.gifObj = new GIF({
            workers: 2,
            quality: 10,
            repeat: 0,

        });

        //合成图片成功后
        this.gifObj.on('finished', function (blob) {
            console.log('blob', blob);
            _this.url = URL.createObjectURL(blob);
            // window.open(URL.createObjectURL(blob));
        });
    }
    clear(){
        this.gifObj = null;

    }
    addFrame(){
        console.log('this.Element,this.Element',this.Element);
        console.log('gif.frames',this.gifObj.frames);
        if ( this.gifObj.frames.length < 17) {
            this.gifObj.addFrame(this.Element, {
                delay: 20,
                copy: true
            });
        } else if (!this.isFinish) {

            console.log('1');
            this.gifObj.render();
            this.isFinish = true;
        }
    }

}