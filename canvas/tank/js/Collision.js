//碰撞检测就是检测  某个区域和某个区域是否有交集  如果有 就碰撞啦

//rect 格式 [{x:0,y:0},{x:50,y:50}]
function collision(rect, rect1) {
    let isCollision = false;
    let start = rect[0];
    let end = rect[1];

    let start1 = rect1[0];
    let end1 = rect1[1];

    if (start.x > start1.x && start.x < end1.x) {
        isCollision = true
    }
    if (start.y > end1.y && start.y < end1.y) {
        isCollision = true;
    }
    if (end.x > start1.x && end.x < end1.x) {
        isCollision = true
    }

    if (end.y > start1.y && end.y < end1.y) {
        isCollision = true
    }


}
