var Tank = function () {
    this.x = 0;
    this.y = 0;
    this.size = 32;
    this.dir = UP;
    this.speed = 1;
    this.frame = 0;
    this.hit = false;
    this.isAI = false;
    this.isShooting = false;
    this.bullet = null;
    this.shootRate = 0.6;
    this.isDestroyed = false;
    this.tempX = 0;
    this.tempY = 0;
    this.move = function () {
        if (this.isAI && emenyStopTime > 0) {
            return;
        }
        this.tempX = this.x;
        this.tempY = this.y;
        if (this.isAI) {
            this.frame++;
            if (this.frame % 100 == 0 || this.hit) {
                this.dir = parseInt(Math.random() * 4);
                this.hit = false;
                this.frame = 0;
            }
        }
        if (this.dir == UP) {
            this.tempY -= this.speed;
        } else if (this.dir == DOWN) {
            this.tempY += this.speed;
        } else if (this.dir == RIGHT) {
            this.tempX += this.speed;
        } else if (this.dir == LEFT) {
            this.tempX -= this.speed;
        }
        this.isHit();
        if (!this.hit) {
            this.x = this.tempX;
            this.y = this.tempY;
        }
    };
    this.isHit = function () {
        if (this.dir == LEFT) {
            if (this.x <= map.offsetX) {
                this.x = map.offsetX;
                this.hit = true;
            }
        } else if (this.dir == RIGHT) {
            if (this.x >= map.offsetX + map.mapWidth - this.size) {
                this.x = map.offsetX + map.mapWidth - this.size;
                this.hit = true;
            }
        } else if (this.dir == UP) {
            if (this.y <= map.offsetY) {
                this.y = map.offsetY;
                this.hit = true;
            }
        } else if (this.dir == DOWN) {
            if (this.y >= map.offsetY + map.mapHeight - this.size) {
                this.y = map.offsetY + map.mapHeight - this.size;
                this.hit = true;
            }
        }
        if (!this.hit) {
            if (tankMapCollision(this, map)) {
                this.hit = true;
            }
        }
    };
    this.isShot = function () {
    };
    this.shoot = function (type) {
        if (this.isAI && emenyStopTime > 0) {
            return;
        }
        if (this.isShooting) {
            return;
        } else {
            var tempX = this.x;
            var tempY = this.y;
            this.bullet = new Bullet(this.ctx, this, type, this.dir);
            if (this.dir == UP) {
                tempX = this.x + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
                tempY = this.y - this.bullet.size;
            } else if (this.dir == DOWN) {
                tempX = this.x + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
                tempY = this.y + this.size;
            } else if (this.dir == LEFT) {
                tempX = this.x - this.bullet.size;
                tempY = this.y + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
            } else if (this.dir == RIGHT) {
                tempX = this.x + this.size;
                tempY = this.y + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
            }
            this.bullet.x = tempX;
            this.bullet.y = tempY;
            if (!this.isAI) {
                ATTACK_AUDIO.play();
            }
            this.bullet.draw();
            bulletArray.push(this.bullet);
            this.isShooting = true;
        }
    };
    this.distroy = function () {
        this.isDestroyed = true;
        crackArray.push(new CrackAnimation(CRACK_TYPE_TANK, this.ctx, this));
        TANK_DESTROY_AUDIO.play();
    };
};
var SelectTank = function () {
    this.ys = [250, 281];
    this.x = 140;
    this.size = 27;
};
SelectTank.prototype = new Tank();
var PlayTank = function (context) {
    this.ctx = context;
    this.lives = 3;
    this.isProtected = true;
    this.protectedTime = 500;
    this.offsetX = 0;
    this.speed = 2;
    this.draw = function () {
        this.hit = false;
        this.ctx.drawImage(RESOURCE_IMAGE, POS["player"][0] + this.offsetX + this.dir * this.size, POS["player"][1], this.size, this.size, this.x, this.y, this.size, this.size);
        if (this.isProtected) {
            var temp = parseInt((500 - this.protectedTime) / 5) % 2;
            this.ctx.drawImage(RESOURCE_IMAGE, POS["protected"][0], POS["protected"][1] + 32 * temp, 32, 32, this.x, this.y, 32, 32);
            this.protectedTime--;
            if (this.protectedTime == 0) {
                this.isProtected = false;
            }
        }
    };
    this.distroy = function () {
        this.isDestroyed = true;
        crackArray.push(new CrackAnimation(CRACK_TYPE_TANK, this.ctx, this));
        PLAYER_DESTROY_AUDIO.play();
    };
    this.renascenc = function (player) {
        this.lives--;
        this.dir = UP;
        this.isProtected = true;
        this.protectedTime = 500;
        this.isDestroyed = false;
        var temp = 0;
        if (player == 1) {
            temp = 129;
        } else {
            temp = 256;
        }
        this.x = temp + map.offsetX;
        this.y = 385 + map.offsetY;
    };
};
PlayTank.prototype = new Tank();
var EnemyOne = function (context) {
    this.ctx = context;
    this.isAppear = false;
    this.times = 0;
    this.lives = 1;
    this.isAI = true;
    this.speed = 1.5;
    this.draw = function () {
        this.times++;
        if (!this.isAppear) {
            var temp = parseInt(this.times / 5) % 7;
            this.ctx.drawImage(RESOURCE_IMAGE, POS["enemyBefore"][0] + temp * 32, POS["enemyBefore"][1], 32, 32, this.x, this.y, 32, 32);
            if (this.times == 34) {
                this.isAppear = true;
                this.times = 0;
                this.shoot(2);
            }
        } else {
            this.ctx.drawImage(RESOURCE_IMAGE, POS["enemy1"][0] + this.dir * this.size, POS["enemy1"][1], 32, 32, this.x, this.y, 32, 32);
            if (this.times % 50 == 0) {
                var ra = Math.random();
                if (ra < this.shootRate) {
                    this.shoot(2);
                }
                this.times = 0;
            }
            this.move();
        }
    };
};
EnemyOne.prototype = new Tank();
var EnemyTwo = function (context) {
    this.ctx = context;
    this.isAppear = false;
    this.times = 0;
    this.lives = 2;
    this.isAI = true;
    this.speed = 1;
    this.draw = function () {
        this.times++;
        if (!this.isAppear) {
            var temp = parseInt(this.times / 5) % 7;
            this.ctx.drawImage(RESOURCE_IMAGE, POS["enemyBefore"][0] + temp * 32, POS["enemyBefore"][1], 32, 32, this.x, this.y, 32, 32);
            if (this.times == 35) {
                this.isAppear = true;
                this.times = 0;
                this.shoot(2);
            }
        } else {
            this.ctx.drawImage(RESOURCE_IMAGE, POS["enemy2"][0] + this.dir * this.size, POS["enemy2"][1], 32, 32, this.x, this.y, 32, 32);
            if (this.times % 50 == 0) {
                var ra = Math.random();
                if (ra < this.shootRate) {
                    this.shoot(2);
                }
                this.times = 0;
            }
            this.move();
        }
    };
};
EnemyTwo.prototype = new Tank();
var EnemyThree = function (context) {
    this.ctx = context;
    this.isAppear = false;
    this.times = 0;
    this.lives = 3;
    this.isAI = true;
    this.speed = 0.5;
    this.draw = function () {
        this.times++;
        if (!this.isAppear) {
            var temp = parseInt(this.times / 5) % 7;
            this.ctx.drawImage(RESOURCE_IMAGE, POS["enemyBefore"][0] + temp * 32, POS["enemyBefore"][1], 32, 32, this.x, this.y, 32, 32);
            if (this.times == 35) {
                this.isAppear = true;
                this.times = 0;
                this.shoot(2);
            }
        } else {
            this.ctx.drawImage(RESOURCE_IMAGE, POS["enemy3"][0] + this.dir * this.size + (3 - this.lives) * this.size * 4, POS["enemy3"][1], 32, 32, this.x, this.y, 32, 32);
            if (this.times % 50 == 0) {
                var ra = Math.random();
                if (ra < this.shootRate) {
                    this.shoot(2);
                }
                this.times = 0;
            }
            this.move();
        }
    };
};
EnemyThree.prototype = new Tank();