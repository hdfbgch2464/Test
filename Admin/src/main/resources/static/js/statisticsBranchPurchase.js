
var orgName = [];
var purchaseCount = [];
var orgIds = [];
var purchaseDetail = [];
var purchaseProducts = [];

var myChart = echarts.init(document.getElementById('main'));
/*渲染柱状图*/
function echartZhu() {

    var option = {
        title: {
            text: '订货方-商品订货总数报表',
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
                return orgName[id]+"\n订货总数:" + purchaseCount[id] ;
            }
        },
        legend: {
            data: ['订货总数']
        },
        xAxis: {
            name: "订货方",
            type: 'category',
            data: orgName,
            axisLabel: {
                interval: 0,
                rotate: 40
            }
        },
        yAxis: {
            name: "商品订货总数",
            type: 'value'
        },
        series: [{
            type: 'bar',
            data: purchaseCount
        }],
        color: '#61a0a8'
    };
    myChart.clear();
    myChart.setOption(option,true);
    //点击图表的时候触发的事件
}

myChart.on('click', function(param) {
    var Id = [];
    //开始判断obj里面的id
    for(var m = 0;m<orgName.length;m++){
        if(orgName[m] == param.name){
            Id.push(orgIds[m]);
        }
    }



    //在ecahrt方法中将日期控件格式化

    var startdate = $("#test-laydate-start").val();
    var enddate = $("#test-laydate-end").val();
    purchaseDetail = []
    productNames = []
    //异步请求数据
    $.ajax({
        type:'POST',
        dataType: 'json',
        async : true,
        data:{
            'startdate':startdate,
            'enddate':enddate,
            'orgid':Id[0],
        },
        url:'/mgt/getPurchaseDetailCount',
        success:function(res){
            for(var m=0;m<res.data.length;m++) {
                purchaseDetail.push(res.data[m].quantity);
                productNames.push(res.data[m].NAME);
            }
            chart2();
        },
        error:function(){
            alert('请求数据失败！');
        }


    })
})

function chart2() { //用来绘制第二个图表
    var myChart2 = echarts.init(document.getElementById('echart2'));

    var option2 = {
        title: {
            text: '订货方-商品订货总数报表',
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
                return productNames[id]+"\n订货数:" + purchaseDetail[id] ;
            }
        },
        legend: {
            data: ['订货数']
        },
        xAxis: {
            name: "商品",
            type: 'category',
            data: productNames,
            axisLabel: {
                interval: 0,
                rotate: 40
            }
        },
        yAxis: {
            name: "商品订货数",
            type: 'value'
        },
        series: [{
            type: 'bar',
            data: purchaseDetail
        }],
        color: '#61a0a8'
    };
    myChart2.setOption(option2);
}

function statisticsCommoditySales() {
    var startdate = $("#test-laydate-start").val();
    var enddate = $("#test-laydate-end").val();
    orgName = [];
    purchaseCount = [];
    supplyNames = [];

    $.ajax({
        type: "post",
        url: "/mgt/branchPurchaseCharts",
        dataType: "json",
        data: {
            "startdate": startdate,
            "enddate": enddate
        },
        success: function (data) {
            console.log(data)
            for (var i = 0; i < data.data.length; i++) {
                var pro = data.data[i];
                orgName.push(pro.org_name);
                purchaseCount.push(pro.totalcount);
                orgIds.push(pro.id);
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