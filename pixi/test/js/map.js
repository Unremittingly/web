

class Layer {
    constructor(){
        this.createBorder();
        this.createMenu();
    }
    createBorder(){
       let bottom =  new Border(0,wallWidth-tileWidth,wallWidth-tileWidth, 'c');
       let top = new Border(0,0,wallWidth-tileWidth,'c');
       let left =  new Border(0,0,wallWidth-tileWidth, 'v');
       let right =  new Border(wallWidth-tileWidth*2,0,wallWidth-tileWidth*2, 'v');

        const borders  = new PIXI.Container();
        borders.addChild(bottom);
        borders.addChild(top);
        borders.addChild(left);
        borders.addChild(right);
        app.stage.addChild(borders);

    }
    createMenu(){
        this.menu = new Menu();
    }
}

class Border {
    constructor(x,y,width,type){
        const group = new PIXI.Container();
        // console.log('group',group);
        if(type === 'c'){
            //横边 上下
            //bottom
            for (let i = 0; i < width/tileWidth; i++) {
                let border = new PIXI.Sprite(PIXI.loader.resources["img/t.png"].texture);
                border.width = 30;
                border.height = 30;
                border.position.set(tileWidth*i,y);
                group.addChild(border);
            }
        }else{
            //竖边  左右
            for (let i = 0; i < width/tileHeight+1; i++) {
                let border = new PIXI.Sprite(PIXI.loader.resources["img/t.png"].texture);
                border.width = 30;
                border.height = 30;
                border.position.set(x,tileHeight*i);
                group.addChild(border);
            }
        }


        return group;
    }
}

class Menu {
    constructor(props) {

    }

}