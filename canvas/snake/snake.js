(function () {
    const WIDTH = 20;
    let cxt;//canvas上下文对象
    let snakes = [];//蛇数组
    let interval = null;//定时器
    let speedX = 0;//x轴速度
    let speedY = 0;//y轴速度
    let directionType = 0;//当前移动的方向 1.上 2.右 3.下 4.左
    let food;//食物对象
    let score = 0;//分数

    function init() {
        initCanvas();
        updateScore();
    }

    function initCanvas() {
        cxt = document.getElementById('snake').getContext('2d');
        cxt.fillStyle = '#eee';
        cxt.fillRect(0, 0, 800, 600);

        let subBox = new SubBox(cxt);
        subBox.drawBox();//画小格子
        snakes.push(new Snake(cxt, 100, 20));
        snakes.push(new Snake(cxt, 80, 20));
        snakes.push(new Snake(cxt, 60, 20));
        snakes.push(new Snake(cxt, 40, 20));
        let snake = new Snake(cxt, 20, 20);
        snakes.push(snake);
        food = new Food();
        // 区分一下requestAnimationFrame（会自动计算动画间隔）和setInterval（自己设定） 两个动画的区别
        // window.requestAnimationFrame(function () {
        //     startAnimate(snake);
        // });
        console.log('food', food);
        startAnimate(3);

    }

    function stopAnimate() {
        if (interval) {
            clearInterval(interval);
        }
    }

    function startAnimate(type) {
        // window.requestAnimationFrame(function () {
        //     startAnimate(snake);
        // });
        if ((directionType - type) % 2 != 0) {
            directionType = type;
            getSpeed(type);
        }
        stopAnimate();
        interval = setInterval(function () {

            for (let i = 0; i < snakes.length; i++) {
                let snake = snakes[i];
                snake.remove();
            }
            console.log('snakes qian', snakes);
            // debugger
            let len = snakes.length;//缓存数组的长度
            snakes[len - 1].x = snakes[0].x + speedX;
            snakes[len - 1].y = snakes[0].y + speedY;
            let a = snakes.pop();
            snakes.unshift(a);

            console.log('snakes hou', snakes);
            for (let i = 0; i < snakes.length; i++) {
                let snake = snakes[i];
                snake.draw();
            }
            if (hitSelf() || hitWall()) {
                gameOver(interval);
            }
            if (hitCheck(snakes[0], food)) {
                //    增加一个
                stopAnimate();
                addSnake();
                startAnimate(type);
                food.draw();
                score++;
                updateScore();
            }
        }, 200);
    }

    function addSnake() {
        let len = snakes.length;
        let nX = snakes[len - 1].x;
        let nY = snakes[len - 1].y;
        let snake = new Snake(cxt, nX, nY);
        snakes.push(snake);
    }

    function updateScore() {
        let scoreDom = document.getElementById('score');
        scoreDom.innerText = score;
    }


    function gameOver(interval) {
        if (interval) {
            clearInterval(interval);
        }
        cxt.font = '30px Verdana';
        cxt.fillText("GAME  OVER",300,200);

        console.log('game over');
    }

    //碰撞检测 食物与snake
    function hitCheck(snake, food) {
        let isHit = false;
        if (!(snake.x < food.x || snake.x > food.x + 18 || snake.y < food.y || snake.y > food.y + 18)) {
            isHit = true;
        }
        return isHit;
    }

    //碰撞检测  snake 和墙壁
    function hitWall() {
        let isHit = false;
        let headSnake = snakes[0];//第一个head
        if (headSnake.x >= 800 || headSnake.x < 0 || headSnake.y >= 500 || headSnake.y < 0) {
            isHit = true;
        }
        return isHit;
    }

    //碰撞检测 snake 和自己
    function hitSelf() {
        let isHit = false;
        let headSnake = snakes[0];
        for (let i = 1; i < snakes.length; i++) {
            let snake = snakes[i];
            if (!((headSnake.x > snake.x+ 18 ) || (headSnake.y < snake.y) || (headSnake.y > snake.y + 18) || (headSnake.x < snake.x))) {
                isHit = true;
                break;
            }
        }
        return isHit;
    }

    class SubBox {
        constructor(context) {
            this.width = WIDTH;
            this.context = context;
            this.context.beginPath();

        }

        drawBox() {
            let allWidth = document.getElementById('snake').width;
            let allHeight = document.getElementById('snake').height;
            this.context.beginPath();
            this.context.strokeStyle = '#ddd';
            this.context.lineWidth = 1;
            //横向
            for (let i = 0; i < allHeight / this.width; i++) {
                this.context.moveTo(0, (i + 1) * this.width);
                this.context.lineTo(allWidth, (i + 1) * this.width)
            }
            for (let i = 0; i < allWidth / this.width; i++) {
                this.context.moveTo((i + 1) * this.width, 0);
                this.context.lineTo((i + 1) * this.width, allHeight);
            }
            this.context.stroke();
            //纵向
        }

    }

    class Snake {
        constructor(context, x, y) {
            this.x = x;
            this.y = y;
            this.width = 20;
            this.height = 20;
            this.color = '#ff0000';
            this.context = context;
            this.draw(this.x, this.y, this.width, this.height);
        }

        draw() {
            let width = this.width;
            let x = this.x;
            let y = this.y;
            this.context.fillStyle = this.color;
            this.context.fillRect(x, y, width, width);
            this.context.save();
        }


        //涉及到转弯  有个转弯点  所有的小方块过了转弯点type 才会改变
        move(type) {

            if (type) {
                this.type = type;
            }

            // console.log('t',this.type);
            //清楚之前的
            this.remove();

            switch (this.type) {
                case 4:
                    speedX = -20;
                    speedY = 0;
                    this.x = this.x - 20;
                    break;
                case 1:
                    speedX = 0;
                    speedY = -20;
                    this.y = this.y - 20;
                    break;
                case 2:
                    speedX = 20;
                    speedY = 0;
                    this.x = this.x + 20;
                    break;
                case 3:
                    speedX = 0;
                    speedY = 20;
                    this.y = this.y + 20;
                    break;
            }

            this.draw();
        }

        remove() {
            this.context.clearRect(this.x, this.y, this.width, this.height);
            cxt.fillStyle = '#eee';
            cxt.fillRect(this.x, this.y, this.width, this.height);
            cxt.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    function getSpeed(type) {
        switch (type) {
            case 4:
                speedX = -20;
                speedY = 0;
                break;
            case 1:
                speedX = 0;
                speedY = -20;
                break;
            case 2:
                speedX = 20;
                speedY = 0;
                break;
            case 3:
                speedX = 0;
                speedY = 20;
                break;
        }
    }

    class Food {
        constructor() {
            //食物随机生成
            this.x = 0;
            this.y = 100;

            this.color = '#000f43';
            this.draw();
        }

        getInteger(number) {
            if (number % 20 == 0) {

                return number;
            } else {
                return this.getInteger(++number);
            }
        }

        isOverlap() {
            let isSnakeLoc = false;
            for (let i = 0; i < snakes.length; i++) {
                let snake = snakes[i];
                if ((snake.x == this.x) && (this.y == snake.y)) {
                    isSnakeLoc = true;
                    break;
                }
            }
            return isSnakeLoc;
        }

        draw() {
            this.x = this.getInteger(parseInt(Math.random() * 780));
            this.y = this.getInteger(parseInt(Math.random() * 480));
            if (this.isOverlap()) {
                this.draw();
            } else {
                cxt.fillStyle = this.color;
                cxt.fillRect(this.x, this.y, WIDTH, WIDTH);
                cxt.save();
            }


        }
    }

    //键盘事件
    document.onkeydown = function (e) {
        let event = e || window.event;
        let keyCode = event.keyCode;
        switch (keyCode) {
            case 37:
                //左
                // stopAnimate();
                startAnimate(4);

                break;
            case 38:
                //上
                // stopAnimate();
                startAnimate(1);
                break;
            case 39:
                //右
                console.log('111');
                // stopAnimate();
                startAnimate(2);
                break;
            case 40:
                //下
                // stopAnimate();
                startAnimate(3);
                break;
        }
    };

    init();
});
