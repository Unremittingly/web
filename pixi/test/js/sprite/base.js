

class Sprite  {
    constructor(x,y){
        this.x = x;
        this.y = y;

        this.obj = this.create();
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }

    destroy(){

    }

    create(imgUrl){
        //imgUrl
        const sprite = new PIXI.Sprite(PIXI.loader.resources[imgUrl].texture);
        sprite.position.set(this.x,this.y);
        return sprite;
    }
}