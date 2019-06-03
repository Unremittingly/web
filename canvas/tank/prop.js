//道具
const prop_enum = {
    ADD:1,
    BOSS_PROTECT:2,
    PROTECT:3,
    FIRE:4,
    FIRE_MAX:5,

}
class Prop extends Base{
    constructor(){
        super();
        this.visible = false;
        this.type = 1;
        this.pos = {x:0,y:0};
    }
    setPosition(pos){
        this.pos = pos;
    }
    setVisible(visible){
        this.visible = visible;
    }
    getImageForType(type){

    }
    create(ctx,type){
        if(this.visible){
            ctx.drawImage()
        }

    }
}