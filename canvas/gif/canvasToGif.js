// document.write('')
class CanvasToGif {

    constructor(element, cb, opt) {
        this.Element = element;
        this.defultFrames = opt?.frames ? opt.frames : 45;//默认取45帧
        this.gifObj = null;
        this.isFinish = false;
        this.url = '';
        this.cb = cb;
        this.init();
    }

    getIsFinish() {
        return this.isFinish;
    }

    init() {
        let _this = this;
        this.gifObj = new GIF({
            workers: 2,
            quality: 10,
            repeat: 0,

        });

        //合成图片成功后
        this.gifObj.on('finished', function (blob) {
            // console.log('blob', blob);
            _this.url = URL.createObjectURL(blob);
            _this.cb(_this.url)
            // window.open(URL.createObjectURL(blob));
        });
    }

    clear() {
        this.gifObj = null;

    }

    addFrame() {
        // console.log('this.Element,this.Element',this.Element);
        // console.log('gif.frames',this.gifObj.frames);
        if (this.gifObj.frames.length < this.defultFrames) {
            this.gifObj.addFrame(this.Element, {
                delay: 20,
                copy: true
            });
        } else if (!this.isFinish) {

            console.log('finish');
            this.gifObj.render();
            this.isFinish = true;
        }
    }

}