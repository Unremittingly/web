var Bullet = function (context, owner, type, dir) {
    this.ctx = context;
    this.x = 0;
    this.y = 0;
    this.owner = owner;
    this.type = type;
    this.dir = dir;
    this.speed = 3;
    this.size = 6;
    this.hit = false;
    this.isDestroyed = false;
    this.draw = function () {
        this.ctx.drawImage(RESOURCE_IMAGE, POS["bullet"][0] + this.dir * this.size, POS["bullet"][1], this.size, this.size, this.x, this.y, this.size, this.size);
        this.move();
    };
    this.move = function () {
        if (this.dir == UP) {
            this.y -= this.speed;
        } else if (this.dir == DOWN) {
            this.y += this.speed;
        } else if (this.dir == RIGHT) {
            this.x += this.speed;
        } else if (this.dir == LEFT) {
            this.x -= this.speed;
        }
        this.isHit();
    };
    this.isHit = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.x < map.offsetX) {
            this.x = map.offsetX;
            this.hit = true;
        } else if (this.x > map.offsetX + map.mapWidth - this.size) {
            this.x = map.offsetX + map.mapWidth - this.size;
            this.hit = true;
        }
        if (this.y < map.offsetY) {
            this.y = map.offsetY;
            this.hit = true;
        } else if (this.y > map.offsetY + map.mapHeight - this.size) {
            this.y = map.offsetY + map.mapHeight - this.size;
            this.hit = true;
        }
        if (!this.hit) {
            if (bulletArray != null && bulletArray.length > 0) {
                for (var i = 0; i < bulletArray.length; i++) {
                    if (bulletArray[i] != this && this.owner.isAI != bulletArray[i].owner.isAI && bulletArray[i].hit == false && CheckIntersect(bulletArray[i], this, 0)) {
                        this.hit = true;
                        bulletArray[i].hit = true;
                        break;
                    }
                }
            }
        }
        if (!this.hit) {
            if (bulletMapCollision(this, map)) {
                this.hit = true;
            }
            if (this.type == BULLET_TYPE_PLAYER) {
                if (enemyArray != null || enemyArray.length > 0) {
                    for (var i = 0; i < enemyArray.length; i++) {
                        var enemyObj = enemyArray[i];
                        if (!enemyObj.isDestroyed && CheckIntersect(this, enemyObj, 0)) {
                            CheckIntersect(this, enemyObj, 0);
                            if (enemyObj.lives > 1) {
                                enemyObj.lives--;
                            } else {
                                enemyObj.distroy();
                            }
                            this.hit = true;
                            break;
                        }
                    }
                }
            } else if (this.type == BULLET_TYPE_ENEMY) {
                if (player1.lives > 0 && CheckIntersect(this, player1, 0)) {
                    if (!player1.isProtected && !player1.isDestroyed) {
                        player1.distroy();
                    }
                    this.hit = true;
                } else if (player2.lives > 0 && CheckIntersect(this, player2, 0)) {
                    if (!player2.isProtected && !player2.isDestroyed) {
                        player2.distroy();
                    }
                    this.hit = true;
                }
            }
        }
        if (this.hit) {
            this.distroy();
        }
    };
    this.distroy = function () {
        this.isDestroyed = true;
        crackArray.push(new CrackAnimation(CRACK_TYPE_BULLET, this.ctx, this));
        if (!this.owner.isAI) {
            BULLET_DESTROY_AUDIO.play();
        }
    };
};