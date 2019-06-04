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
    setVisible(visible){
        this.visible = visible;
    }
    getImageForType(type){

    }
    clean(){

    }
    change(pos){
        this.clean();
        this.setVisible(true);
        this.setPosition(pos);
    }
}