$(document).keydown(function (event) {
    // console.log('event', event.keyCode);
    keyCode = event.keyCode;


    if (tank.interval) {
        clearInterval(tank.interval);
        tank.interval = null;
    }
    if (!keys.contain(keyCode)) {
        keys.push(keyCode);
    }
    // switch (keyCode) {
    //     case 87:
    //         //top
    //         tank.move('top');
    //         break;
    //     case 65:
    //         //left
    //         tank.move('left');
    //         break;
    //     case  83:
    //         //bottom
    //         tank.move('bottom');
    //         break;
    //     case 68:
    //         //right
    //         tank.move('right');
    //         break;
    // }
});

$(document).keyup(function (e) {
    // setTimeout(function () {
    //     keyCode = 0;
    // },20);
    // console.log('11',e.keyCode);
    keys.remove(e.keyCode);
});