

class Tank{

    create(){

    }
    addBullet(){
        const bullet = new Bullet(100,100);

        return bullet;
    }

    removeBullet(){

    }
}

class Play extends Tank{

    constructor(){
        super();
        this.obj = this.create();
        this.bullet = this.addBullet();
    }

    move(){

    }

    create(){
        //Create the cat sprite
        let cat = new PIXI.Sprite(PIXI.loader.resources["img/enemy2.png"].texture);
        // let cat1 = new PIXI.Sprite(PIXI.loader.resources["img/enemy1.png"].texture);
        //Add the cat to the stage
        cat.position.set(30, 200);
        // cat1.x = 100;
        // cat1.y = 100;
        cat.vx = 0;
        cat.vy = 0;
        cat.width = 30;
        cat.height = 30;
        return cat;
    }
    
}