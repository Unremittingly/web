
var value = 0.12
var data = []
data.push(value)
data.push(value)
data.push(value)
data.push(value)
data.push(value)
var option = {
    series: [{
        type: 'liquidFill',
        data: [{
            value: 0.5,
            itemStyle: {
                color:'#d4d1a6'
            }
        }],
        radius: '100%',
        shape: 'container',
        outline: {
            show: false
        },
        itemStyle: {
            opacity: 0.8,
        },
        label: {
            show: false,
            position: ['10%', '20%']
        },
        backgroundStyle:{
            color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0,  color: 'rgba(61,234,255, 0.0)'},
                { offset: 1,  color: 'rgba(61,234,255, 1)'}
            ], false),

        }
    }],
};


let wave = echarts.init(document.getElementById('wave'));
wave.setOption(option);


let option1 = {

    title: {
        text: "",
        left: "center",
        bottom: "5%",
        textStyle: {
            color: "#fff",
            fontSize: 16
        }
    },
    grid: {

        top: '10',
        left: '0',
        // bottom:'0',
        bottom: '0',
        // height:'240',
        containLabel: true,
    },
    xAxis: {
        // type: 'category',
        show: false
    },
    yAxis: [{
        type: 'value',
        position: 'left',
        max: '100',
        // splitNumber:'20',
        interval: 25,
        splitLine: {
            "show": false
        },
        axisLine:{
          lineStyle:{
              color:'#fff'
          }
        },
        axisLabel: {
            formatter: '{value}%',
            lineStyle:{
                color:'#fff'
            }

        }


    }],
    series: [{
        name: '注册总量',
        type: 'line',
        show: false,
        itemStyle: {
            color: "#fff",
            borderColor: "#fff",
            borderWidth: 3
        },
        data: [20]
    }]
};

let yAxis = echarts.init(document.getElementById('yAxis'));
yAxis.setOption(option1);