

//键盘监听函数
function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}


//绑定上下左右键
function bindDirectionKeyBoard(sprite) {
    let left = keyboard("ArrowLeft"),//左键
        up = keyboard("ArrowUp"),//上键
        right = keyboard("ArrowRight"),//右键
        down = keyboard("ArrowDown");//下键

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        sprite.vx = -2;
        sprite.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the cat isn't moving vertically:
        //Stop the cat
        if (!right.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    //Up
    up.press = () => {
        sprite.vy = -2;
        sprite.vx = 0;
        // jump(cat);
    };
    up.release = () => {
        if (!down.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };

    //Right
    right.press = () => {
        sprite.vx = 2;
        sprite.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && sprite.vy === 0) {
            sprite.vx = 0;
        }
    };

    //Down
    down.press = () => {
        sprite.vy = 2;
        sprite.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && sprite.vx === 0) {
            sprite.vy = 0;
        }
    };
}