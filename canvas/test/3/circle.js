function Circle(obj) {

    this._init(obj);

}

Circle.prototype = {

    _init: function (obj) {

        this.x = obj.x, //圆心x轴的坐标

            this.y = obj.y, //圆心y轴的坐标

            this.outR = obj.outR, //外圆的半径

            this.inR = obj.inR, //内圆的半径

            this.color = obj.fill, //填充颜色

            this.text = obj.text, //内圆的文字

            this.outOpacity = obj.outOpacity, //外圆的透明度

            this.inOpacity = obj.inOpacity  //内圆的透明度

    },

    drawCircle: function (group) {

        //创建一个组

        var groupCir = new Konva.Group({

            x: this.x,

            y: this.y

        });

        //外圆

        var outCir = new Konva.Circle({

            x: 0,

            y: 0,

            radius: this.outR,

            fill: this.color,

            opacity: this.outOpacity

        });

        groupCir.add(outCir);

        //内圆

        var inCir = new Konva.Circle({

            x: 0,

            y: 0,

            radius: this.inR,

            fill: this.color,

            opacity: this.inOpacity

        });

        groupCir.add(inCir);

        //添加文字

        var text = new Konva.Text({

            x: -this.inR,

            y: -10,

            text: this.text,

            fill: "white",

            fontSize: 20,

            width: 2 * this.inR,

            align: "center"

        });

        groupCir.add(text);



        group.add(groupCir);

    }

}