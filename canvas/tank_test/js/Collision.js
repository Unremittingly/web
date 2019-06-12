function CheckIntersect(object1, object2, overlap) {
    A1 = object1.x + overlap;
    B1 = object1.x + object1.size - overlap;
    C1 = object1.y + overlap;
    D1 = object1.y + object1.size - overlap;
    A2 = object2.x + overlap;
    B2 = object2.x + object2.size - overlap;
    C2 = object2.y + overlap;
    D2 = object2.y + object2.size - overlap;
    if (A1 >= A2 && A1 <= B2 || B1 >= A2 && B1 <= B2) {
        if (C1 >= C2 && C1 <= D2 || D1 >= C2 && D1 <= D2) {
            return true;
        }
    }
    return false;
}

function tankMapCollision(tank, mapobj) {
    var tileNum = 0;
    var rowIndex = 0;
    var colIndex = 0;
    var overlap = 3;
    if (tank.dir == UP) {
        rowIndex = parseInt((tank.tempY + overlap - mapobj.offsetY) / mapobj.tileSize);
        colIndex = parseInt((tank.tempX + overlap - mapobj.offsetX) / mapobj.tileSize);
    } else if (tank.dir == DOWN) {
        rowIndex = parseInt((tank.tempY - overlap - mapobj.offsetY + tank.size) / mapobj.tileSize);
        colIndex = parseInt((tank.tempX + overlap - mapobj.offsetX) / mapobj.tileSize);
    } else if (tank.dir == LEFT) {
        rowIndex = parseInt((tank.tempY + overlap - mapobj.offsetY) / mapobj.tileSize);
        colIndex = parseInt((tank.tempX + overlap - mapobj.offsetX) / mapobj.tileSize);
    } else if (tank.dir == RIGHT) {
        rowIndex = parseInt((tank.tempY + overlap - mapobj.offsetY) / mapobj.tileSize);
        colIndex = parseInt((tank.tempX - overlap - mapobj.offsetX + tank.size) / mapobj.tileSize);
    }
    if (rowIndex >= mapobj.HTileCount || rowIndex < 0 || colIndex >= mapobj.wTileCount || colIndex < 0) {
        return true;
    }
    if (tank.dir == UP || tank.dir == DOWN) {
        var tempWidth = parseInt(tank.tempX - map.offsetX - (colIndex) * mapobj.tileSize + tank.size - overlap);
        if (tempWidth % mapobj.tileSize == 0) {
            tileNum = parseInt(tempWidth / mapobj.tileSize);
        } else {
            tileNum = parseInt(tempWidth / mapobj.tileSize) + 1;
        }
        for (var i = 0; i < tileNum && colIndex + i < mapobj.wTileCount; i++) {
            var mapContent = mapobj.mapLevel[rowIndex][colIndex + i];
            if (mapContent == WALL || mapContent == GRID || mapContent == WATER || mapContent == HOME || mapContent == ANOTHREHOME) {
                if (tank.dir == UP) {
                    tank.y = mapobj.offsetY + rowIndex * mapobj.tileSize + mapobj.tileSize - overlap;
                } else if (tank.dir == DOWN) {
                    tank.y = mapobj.offsetY + rowIndex * mapobj.tileSize - tank.size + overlap;
                }
                return true;
            }
        }
    } else {
        var tempHeight = parseInt(tank.tempY - map.offsetY - (rowIndex) * mapobj.tileSize + tank.size - overlap);
        if (tempHeight % mapobj.tileSize == 0) {
            tileNum = parseInt(tempHeight / mapobj.tileSize);
        } else {
            tileNum = parseInt(tempHeight / mapobj.tileSize) + 1;
        }
        for (var i = 0; i < tileNum && rowIndex + i < mapobj.HTileCount; i++) {
            var mapContent = mapobj.mapLevel[rowIndex + i][colIndex];
            if (mapContent == WALL || mapContent == GRID || mapContent == WATER || mapContent == HOME || mapContent == ANOTHREHOME) {
                if (tank.dir == LEFT) {
                    tank.x = mapobj.offsetX + colIndex * mapobj.tileSize + mapobj.tileSize - overlap;
                } else if (tank.dir == RIGHT) {
                    tank.x = mapobj.offsetX + colIndex * mapobj.tileSize - tank.size + overlap;
                }
                return true;
            }
        }
    }
    return false;
}

function bulletMapCollision(bullet, mapobj) {
    var tileNum = 0;
    var rowIndex = 0;
    var colIndex = 0;
    var mapChangeIndex = [];
    var result = false;
    if (bullet.dir == UP) {
        rowIndex = parseInt((bullet.y - mapobj.offsetY) / mapobj.tileSize);
        colIndex = parseInt((bullet.x - mapobj.offsetX) / mapobj.tileSize);
    } else if (bullet.dir == DOWN) {
        rowIndex = parseInt((bullet.y - mapobj.offsetY + bullet.size) / mapobj.tileSize);
        colIndex = parseInt((bullet.x - mapobj.offsetX) / mapobj.tileSize);
    } else if (bullet.dir == LEFT) {
        rowIndex = parseInt((bullet.y - mapobj.offsetY) / mapobj.tileSize);
        colIndex = parseInt((bullet.x - mapobj.offsetX) / mapobj.tileSize);
    } else if (bullet.dir == RIGHT) {
        rowIndex = parseInt((bullet.y - mapobj.offsetY) / mapobj.tileSize);
        colIndex = parseInt((bullet.x - mapobj.offsetX + bullet.size) / mapobj.tileSize);
    }
    if (rowIndex >= mapobj.HTileCount || rowIndex < 0 || colIndex >= mapobj.wTileCount || colIndex < 0) {
        return true;
    }
    if (bullet.dir == UP || bullet.dir == DOWN) {
        var tempWidth = parseInt(bullet.x - map.offsetX - (colIndex) * mapobj.tileSize + bullet.size);
        if (tempWidth % mapobj.tileSize == 0) {
            tileNum = parseInt(tempWidth / mapobj.tileSize);
        } else {
            tileNum = parseInt(tempWidth / mapobj.tileSize) + 1;
        }
        for (var i = 0; i < tileNum && colIndex + i < mapobj.wTileCount; i++) {
            var mapContent = mapobj.mapLevel[rowIndex][colIndex + i];
            if (mapContent == WALL || mapContent == GRID || mapContent == HOME || mapContent == ANOTHREHOME) {
                result = true;
                if (mapContent == WALL) {
                    mapChangeIndex.push([rowIndex, colIndex + i]);
                } else if (mapContent == GRID) {
                } else {
                    isGameOver = true;
                    break;
                }
            }
        }
    } else {
        var tempHeight = parseInt(bullet.y - map.offsetY - (rowIndex) * mapobj.tileSize + bullet.size);
        if (tempHeight % mapobj.tileSize == 0) {
            tileNum = parseInt(tempHeight / mapobj.tileSize);
        } else {
            tileNum = parseInt(tempHeight / mapobj.tileSize) + 1;
        }
        for (var i = 0; i < tileNum && rowIndex + i < mapobj.HTileCount; i++) {
            var mapContent = mapobj.mapLevel[rowIndex + i][colIndex];
            if (mapContent == WALL || mapContent == GRID || mapContent == HOME || mapContent == ANOTHREHOME) {
                result = true;
                if (mapContent == WALL) {
                    mapChangeIndex.push([rowIndex + i, colIndex]);
                } else if (mapContent == GRID) {
                } else {
                    isGameOver = true;
                    break;
                }
            }
        }
    }
    map.updateMap(mapChangeIndex, 0);
    return result;
}