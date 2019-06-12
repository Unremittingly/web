(function ($) {
    /*jQuery对象添加  runNum  方法*/
    $.fn.runNum = function (val, params) {
        /*
            *	滚动数字
            *	@ val 值，	params 参数对象
            *	params{addMin(随机最小值),addMax(随机最大值),interval(动画间隔),speed(动画滚动速度),width(列宽),height(行高)}
        */
        var valString = val || '70225800'
        var length = params.type ? val.toString().indexOf('.') + 3 : valString.toString().length;
        var par = params || {};
        var defaultsOpt =  {
            el: $(this),
            value: valString,
            valueStr: valString.toString(),
            isDecimal: par.isDecimal,//是否是小数 true 小数
            height: par.height || 50,
            interval: par.interval || 2000,
            speed: par.speed || 1000,
            width: par.width || 20,
            fontWidth: par.fontWidth || par.width || 22,
            length: length,
            intervalObj: null,
            setNum:function (val) {
                _setNum(val)
            }
        };


        console.log('this', this);
        // console.log('runNumJson.el',runNumJson.el);



        function _init(runNumJson) {
            _list(runNumJson.el, runNumJson);
            runNumJson.el.width(runNumJson.length*runNumJson.fontWidth);
            // _interval(runNumJson.el.children("li"), runNumJson);
        }
        /*初始化数字列表*/
        function _list(el, json) {
            var str = '';

            let index = json.value.toString().indexOf('.');

            for (var i = 0; i < json.length; i++) {
                var w = json.fontWidth * i;
                var t = json.height * parseInt(json.valueStr[i]);
                // console.log('T',t);
                var h = json.height * 10;
                if (json.isDecimal && i >= index + 1) {
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

            el.html(str);
        }
        function _setNum(val) {
            defaultsOpt.value = val;
            defaultsOpt.valueStr = val;

            var json = defaultsOpt;
            var el = json.el.children('li');
            if (json.isDecimal) {
                console.log('treee===');
                // val =
                var i = val.toString().indexOf('.');
                _animate(el, val.toString().substr(0, i + 3), json, val, i);
            } else {
                _animate(el, val.toString(), json, val);
            }
        }
        /*执行动画效果*/
        function _animate(el, value, json, val, i) {
            let leg = json.isDecimal ? value.length - 2 : value.length;
            console.log('animate',leg,json.length,i);
            // debugger
            if (leg > json.length) {
                //重新初始化
                clearInterval(json.intervalObj);
                json.el.runNum(val, {
                    isDecimal: json.isDecimal
                });
                // json.length = leg;
                // $._runNum._beforeAdd(el, value, json);
            } else {
                for (var x = 0; x < json.length; x++) {
                    var topPx = value[x] * json.height;
                    if ((i) !== x) {
                        el.eq(x).animate({top: -topPx + 'px'}, json.speed);
                    }
                }
            }

        }
        /*定期刷新动画列表*/
        function _interval(el, json) {
            var val = json.value;

            json.intervalObj = setInterval(function () {
                val += 138;
                if (json.isDecimal) {
                    // val =
                    var i = val.toString().indexOf('.');

                    _animate(el, val.toString().substr(0, i + 3), json, val, i);
                } else {
                    _animate(el, val.toString(), json, val);
                }
            }, json.interval);
        }


        _init(defaultsOpt);
        return {
            setNum:_setNum
        }
    }


})(jQuery);