
var productNames = [];
var salesVolumes = [];
var supplyNames = [];
var supplierId = null;
var pId = null;
var startTime = null;
var endTime = null;

/*渲染柱状图*/
function echartZhu() {
    var myChart = echarts.init(document.getElementById('main'));

    var option = {
        title: {
            text: '商品销量统计',
            show: false
        },
        dataZoom:[
            {
                type: 'slider',
                yAxisIndex: [0],
                start: 100,
                end: 0
            },
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 100,
                end: 0
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 100,
                end: 0
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 100,
                end: 0
            }

        ],
        tooltip: {
            show: true,
            formatter: function (params) {
                var id = params.dataIndex;
                return "销量:" + salesVolumes[id] + "<br/>" + "商品:" + productNames[id] + "<br/>" + "供货商:" + supplyNames[id];
            }
        },
        legend: {
            data: ['销量']
        },
        xAxis: {
            name: "商品名称",
            type: 'category',
            data: productNames,
            axisLabel: {
                interval: 0,
                rotate: 40
            }
        },
        yAxis: {
            name: "商品销量",
            type: 'value'
        },
        series: [{
            type: 'bar',
            data: salesVolumes
        }],
        color: '#61a0a8'
    };
    myChart.clear();
    myChart.setOption(option,true);
}

function statisticsCommoditySales() {
    startTime = $("#test-laydate-start").val();
    endTime = $("#test-laydate-end").val();
    pId = $("#pId").val();
    productNames = [];
    salesVolumes = [];
    supplyNames = [];
    supplierId = $("#supplierId").val();

    $.ajax({
        type: "post",
        url: "/mgt/statisticsCommoditySales",
        dataType: "json",
        data: {
            "supplierId": supplierId,
            "pId": pId,
            "startTime": startTime,
            "endTime": endTime
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var pro = data[i];
                productNames.push(pro.name);
                salesVolumes.push(pro.salesVolume);
                supplyNames.push(pro.supplyName);
            }
            echartZhu();
        }
    });
}

$(function () {
    statisticsCommoditySales();
})

layui.use(['form', 'table', 'layer', 'laydate'], function () {
    var form = layui.form,
        layer = layui.layer,
        laydate = layui.laydate,
        $ = layui.$

    //开始日期
    var insStart = laydate.render({
        elem: '#test-laydate-start'
        , done: function (value, date) {
            //更新结束日期的最小日期
            insEnd.config.min = lay.extend({}, date, {
                month: date.month - 1
            });
        }
    });

    //结束日期
    var insEnd = laydate.render({
        elem: '#test-laydate-end'
    });
})



$("#Sarch").click(function () {
    statisticsCommoditySales();
});