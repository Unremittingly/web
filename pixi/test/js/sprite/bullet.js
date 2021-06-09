

class Bullet {

    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.obj = this.create("img/bullet.png");
    }

    setSpeed(speed){
        this.speed = speed;
    }

    move(direct){
        //如果有速度菜走
        if(this.speed){
            let tempX = this.x;
            let tempY = this.y;
            if(direct === DIRECTION.RIGHT){
                tempX +=this.speed;
            }else if(direct === DIRECTION.LEFT){
                tempX -=this.speed;
            }else if(direct === DIRECTION.TOP){
                tempY -=this.speed;
            }else{
                tempY +=this.speed;
            }
            this.x = tempX;
            this.y = tempY;
            this.obj.position.set(tempX,tempY);
        }
    }



    create(imgUrl) {
        const sprite = new PIXI.Sprite(PIXI.loader.resources[imgUrl].texture);
        sprite.position.set(this.x,this.y);
        // sprite.rotation = -1.5;  //旋转
        return sprite;
    }
}