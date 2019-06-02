//场景  背景画面
class Scene {
    constructor(ctx) {
        console.log('scene');
        this.ctx = ctx;
        this.elementArr = [ROAD,RIVER,H_ROAD,GRASS,ADOBE,STEEL];

        this.createScene(1);
    }
    getType(){
        return this.elementArr[parseInt(Math.random()*this.elementArr.length-1)]
    }
    createScene(level){
        let arr = [];
        for (let i = 0; i < 10; i++) {
            let arr1 = [];
            for (let j = 0; j < 10; j++) {
                arr1.push(this.getType())
            }
            arr.push(arr1);
        }
        console.log('arr',arr);
    }
}