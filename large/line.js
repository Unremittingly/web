
option = {
    grid: {
        top: '0',
        left: '10',
        right: '10',
        bottom: '0',
        // containLabel: true,
        show: false
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['本年', '本月', '本周', '今日'],

    }],
    yAxis: [{
        name: 'Revenue(10k)',
        type: 'value',
        show: false,

    },
        {
            name: 'Growing\nRate (%)',
            //nameLocation: 'start',
            splitLine: {                // 网格线 y轴对应的是否显示
                show: false
            },
            axisLabel:{
                show:false,
            },
            axisTick:{
                show:false
            },
            min: 0,
            max: 200,                       // growing rate upper limit
            type: 'value',
            //top:10,
            inverse: false,
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    type:'dashed',

                }
            }

        }
    ],
    series: [{
        name: 'test',
        type: 'line',
        lineStyle: {
            normal: {
                color: "#5fe6ea", // 线条颜色
            },
        },
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 5,
        itemStyle: {
            color: "#fff",
            borderColor: "#fff",
            borderWidth: 2
        },
        smooth: true,

        areaStyle: { //区域填充样式
            normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: 'rgba(61,234,255, 1)'},
                    {offset: 0.9, color: 'rgba(61,234,255, 0.1)'}
                ], false),

                shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
        },

        markPoint: {
            symbol:'rect',
            symbolSize:[30,20],
            data: [
                {type: 'max', name: '今日'},
                //{type : 'min', name : '最小值'}
            ],
            symbolOffset:[-25,0],
            label: {
                show: true,
                color: '#afffff',
                formatter: '{b}',
                borderRadius:2,
                fontSize: 10,
            },
            itemStyle: {
                color:'#63e4ec',
                // borderColor: 'red'
            },
        },
        data: [90, 105, 84, 160],

    }]
};

let e = echarts.init(document.getElementById('line'));
e.setOption(option);