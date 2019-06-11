(function ($) {
    /*jQuery对象添加  runNum  方法*/
    $.fn.extend({
        /*
            *	滚动数字
            *	@ val 值，	params 参数对象
            *	params{addMin(随机最小值),addMax(随机最大值),interval(动画间隔),speed(动画滚动速度),width(列宽),height(行高)}
        */
        runNum: function (val, params) {
            /*初始化动画参数*/
            var valString = val || '70225800'
            var length = params.type ? val.toString().indexOf('.') + 3 : valString.toString().length;
            var par = params || {};
            var runNumJson = {
                el: $(this),
                value: valString,
                valueStr: valString.toString(),
                type: par.type,//是否是小数 true 小数
                height: par.height || 50,
                interval: par.interval || 500,
                speed: par.speed || 1000,
                width: par.width || 20,
                fontWidth: par.fontWidth || par.width || 20,
                length: length,
                intervalObj: null,
            };
            // console.log('runNumJson.el',runNumJson.el);
            $._runNum._list(runNumJson.el, runNumJson);
            $._runNum._interval(runNumJson.el.children("li"), runNumJson);
        }
    });
    /*jQuery对象添加  _runNum  属性*/
    $._runNum = {
        /*初始化数字列表*/
        _list: function (el, json) {
            var str = '';
            console.log('json.length', json.length);
            let index = json.value.toString().indexOf('.');
            console.log('index', index);
            for (var i = 0; i < json.length; i++) {
                var w = json.fontWidth * i;
                var t = json.height * parseInt(json.valueStr[i]);
                // console.log('T',t);
                var h = json.height * 10;
                if (json.type && i >= index + 1) {
                    w -= 10;
                }
                str += '<li style="left:' + w + 'px;top: ' + -t + 'px;height:' + h + 'px;">';
                if (i === index) {
                    str += '<div style="height:' + json.height + 'px;line-height:' + json.height + 'px;">.</div>';
                } else {
                    for (var j = 0; j < 10; j++) {
                        str += '<div style="height:' + json.height + 'px;line-height:' + json.height + 'px;">' + j + '</div>';
                    }
                }
                str += '</li>';
            }
            console.log('el', el);
            el.html(str);
        },
        _beforeAdd: function (el, json) {
            console.log('el', el);
            var w =  0;
            var t = 50;
            var h = 500;

            let str = '<li style="left:' + w + 'px;top: ' + -t + 'px;height:' + h + 'px;">';

            for (var j = 0; j < 10; j++) {
                str += '<div style="height:' + json.height + 'px;line-height:' + json.height + 'px;">' + j + '</div>';
            }

            str += '</li>';
            el.before(str);

            console.log('el', el);
        },
        /*执行动画效果*/
        _animate: function (el, value, json, val, i) {
            let leg = json.type ? value.length - 2 : value.length;
            // debugger
            if (leg > json.length) {
                //重新初始化
                clearInterval(json.intervalObj);
                json.el.runNum(val, {
                    type: json.type
                });
                // json.length = leg;
                // $._runNum._beforeAdd(el, value, json);
            } else {
                for (var x = 0; x < json.length; x++) {
                    var topPx = value[x] * json.height;
                    console.log('x', i, x);
                    if (!i && (i - 1) !== x) {
                        el.eq(x).animate({top: -topPx + 'px'}, json.speed);
                    }
                }
            }


        },
        /*定期刷新动画列表*/
        _interval: function (el, json) {
            var val = json.value;
            json.intervalObj = setInterval(function () {
                val += 108;
                if (json.type) {
                    // val =
                    var i = val.toString().indexOf('.');
                    console.log('i', i);
                    $._runNum._animate(el, val.toString().substr(0, i + 3), json, val, i);
                } else {
                    $._runNum._animate(el, val.toString(), json, val);
                }


            }, json.interval);
        }
    }
})(jQuery);