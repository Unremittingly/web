//右侧分数  人头  当前敌人数量的描述

class Desc {
    constructor() {
        this.score = 0;
        this.live = 3;
        this.enemyNum = 20;

    }

    updateScore(score) {
        this.score = score;
    }

    updateLive(live) {
        this.live = live;
    }

    updateEnemyNum(enemyNum) {
        this.enemyNum = enemyNum;
    }

}