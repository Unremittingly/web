let $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
let clientWidth = $(window).width();
let clientHeight = $(window).height();

$(function () {
   let   $loveHeart = $("#loveHeart");
    let a = $loveHeart.width() / 2;
    let b = $loveHeart.height() / 2 - 30;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
    gardenCanvas.width = $loveHeart.width();
    gardenCanvas.height = $loveHeart.height();
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
    $("#content").css("width", $loveHeart.width() + $("#code").width());
    $("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
    $("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
    $("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));
    setInterval(function () {
        garden.render()
    }, Garden.options.growSpeed)
});
$(window).resize(function () {
    let b = $(window).width();
    let a = $(window).height();
    if (b != clientWidth && a != clientHeight) {
        location.replace(location)
    }
});

function getHeartPoint(c) {
    let b = c / Math.PI;
    let a = 19.5 * (16 * Math.pow(Math.sin(b), 3))/2;
    let d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b))/2;
    console.log('a',a,d);
    return new Array(offsetX + a, offsetY + d)
}

function startHeartAnimation() {
    let c = 50;
    let d = 10;
    let b = new Array();
    let a = setInterval(function () {
        let h = getHeartPoint(d);
        let e = true;
        for (let f = 0; f < b.length; f++) {
            let g = b[f];
            let j = Math.sqrt(Math.pow(g[0] - h[0], 2) + Math.pow(g[1] - h[1], 2));
            if (j < Garden.options.bloomRadius.max * 1.3) {
                e = false;
                break
            }
        }
        if (e) {
            b.push(h);
            garden.createRandomBloom(h[0], h[1])
        }
        if (d >= 30) {
            clearInterval(a);
            showMessages()
        } else {
            d += 0.2
        }
    }, c)
}

(function (a) {
    a.fn.typewriter = function () {
        this.each(function () {
            let d = a(this), c = d.html(), b = 0;
            d.html("");
            let e = setInterval(function () {
                let f = c.substr(b, 1);
                if (f == "<") {
                    b = c.indexOf(">", b) + 1
                } else {
                    b++
                }
                d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
                if (b >= c.length) {
                    clearInterval(e)
                }
            }, 75)
        });
        return this
    }
})(jQuery);

function timeElapse(c) {
    let e = Date();
    let f = (Date.parse(e) - Date.parse(c)) / 1000;
    let g = Math.floor(f / (3600 * 24));
    f = f % (3600 * 24);
    let b = Math.floor(f / 3600);
    if (b < 10) {
        b = "0" + b
    }
    f = f % 3600;
    let d = Math.floor(f / 60);
    if (d < 10) {
        d = "0" + d
    }
    f = f % 60;
    if (f < 10) {
        f = "0" + f
    }
    let a = '<span class="digit">' + g + '</span> days <span class="digit">' + b + '</span> hours <span class="digit">' + d + '</span> minutes <span class="digit">' + f + "</span> seconds";
    $("#elapseClock").html(a)
}

function showMessages() {
    adjustWordsPosition();
    $("#messages").fadeIn(5000, function () {
        showLoveU()
    })
}

function adjustWordsPosition() {
    $("#words").css("position", "absolute");
    $("#words").css("top", $("#garden").position().top + 195);
    $("#words").css("left", $("#garden").position().left + 70)
}

function adjustCodePosition() {
    $("#code").css("margin-top", ($("#garden").height() - $("#code").height()) / 2)
}

function showLoveU() {
    $("#loveu").fadeIn(3000)
};