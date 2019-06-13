/*****
 * 1、河道
 * 2、草丛
 * 3、泥砖
 * 4、刚砖
 * 5、高速路
 * 6、平常路
 */
const RIVER = 1;
const GRASS = 2;
const ADOBE = 3;
const STEEL = 4;
const H_ROAD = 5;
const ROAD = 6;

const OFFSET = 10;
const SCREEN_WIDTH =800;
const SCREEN_HEIGHT =600;
//大图对象
const RESOURCE_IMG = new Image();
RESOURCE_IMG.src = './img/tankAll.gif';
//在大图中的位置
const RIVER_POSITION = {x: 0, y: 0};
const GRASS_POSITION = {x: 20, y: 0};
const ADOBE_POSITION = {x: 40, y: 0};
const STEEL_POSITION = {x: 60, y: 0};
const H_ROAD_POSITION = {x: 80, y: 0};
const ROAD_POSITION = {x: 100, y: 0};
const mapPosToElement = {
    RIVER:RIVER_POSITION,
    GRASS:GRASS_POSITION,
    ADOBE:ADOBE_POSITION,
    STEEL:STEEL_POSITION,
    H_ROAD:H_ROAD_POSITION,
    ROAD:ROAD_POSITION
};

const PROP_PROJECT = 1;
const PROP_ADD =2 ;
const PROP_PROJECT_HOME =3 ;
const PROP_FIRE =4 ;
const PROP_MAX_FIRE =5 ;
const PROP_TIMER = 6;
const PROP_GRENADES = 7;

const GAME_STATE_INIT = 1;//初始化
const GAME_STATE_START = 2;//已经开始
const GAME_STATE_TAS = 3;//过关
const GAME_STATE_OVER = 4;//结束


const LEVEL_ONE = [
    //1
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
//2
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
//3
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
//4
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 4, 4, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 4, 4, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
//5
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
//6
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],

    //7
    [3, 3, 6, 6, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 6, 6, 6, 6],
    [4, 4, 6, 6, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 6, 6, 4, 4],

//8
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],

//9
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],

    //10
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],


    //11
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],


    //12
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 3, 3, 3, 3, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 3, 3, 3, 3, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],


    //13
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 0, 0, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 0, 0, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],

];

const LEVEL_TWO = [
    //1
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    //2
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    //3
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    //4
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 4, 4, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 4, 4, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    //5
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    //6
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],

    //7
    [3, 3, 6, 6, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 6, 6, 6, 6],
    [4, 4, 6, 6, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 6, 6, 4, 4],

    //8
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],

    //9
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],

    //10
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],


    //11
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],


    //12
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 3, 3, 3, 3, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],
    [6, 6, 3, 3, 6, 6, 3, 3, 6, 6, 6, 3, 3, 3, 3, 6, 6, 6, 3, 3, 6, 6, 3, 3, 6, 6],


    //13
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 0, 0, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
    [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3, 0, 0, 3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],

];

const LEVEL_ALL = [];
LEVEL_ALL.push(LEVEL_ONE);


