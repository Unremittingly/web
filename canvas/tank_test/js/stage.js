var Stage = function (context, l) {
    this.ctx = context;
    this.ctx.fillStyle = "#7f7f7f";
    this.drawHeigth = 15;
    this.level = l;
    this.temp = 0;
    this.dir = 1;
    this.isReady = false;
    this.levelNum = new Num(context);
    this.init = function (level) {
        this.dir = 1;
        this.isReady = false;
        this.level = level;
        this.temp = 0;
    };
    this.draw = function () {
        if (this.dir == 1) {
            if (this.temp == 225) {
                this.ctx.drawImage(RESOURCE_IMAGE, POS["stageLevel"][0], POS["stageLevel"][1], 78, 14, 194, 208, 78, 14);
                this.levelNum.draw(this.level, 308, 208);
                initMap();
            } else if (this.temp == 225 + 600) {
                this.temp = 225;
                this.dir = -1;
                START_AUDIO.play();
            } else {
                this.ctx.fillRect(0, this.temp, 512, this.drawHeigth);
                this.ctx.fillRect(0, 448 - this.temp - this.drawHeigth, 512, this.drawHeigth);
            }
        } else {
            if (this.temp >= 0) {
                this.ctx.clearRect(0, this.temp, 512, this.drawHeigth);
                this.ctx.clearRect(0, 448 - this.temp - this.drawHeigth, 512, this.drawHeigth);
            } else {
                this.isReady = true;
            }
        }
        this.temp += this.drawHeigth * this.dir;
    };
};