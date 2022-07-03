var sellerId = null;
var sellerName = "所有行社";
var status = null;
var settleStatus = null;
var startTime = '';
var endTime = '';

layui.use(['table', 'carousel', 'laydate', 'form', 'layer'], function () {
    var table = layui.table,
        carousel = layui.carousel,
        laydate = layui.laydate,
        layer = layui.layer,
        $ = layui.$,
        form = layui.form;

    form.on('submit(formDemo)', function (data) {
        //layer.msg(JSON.stringify(data.field))

        var startTime = $("#test-laydate-start").val();
        var endTime = $("#test-laydate-end").val();
        this.startTime = startTime;
        this.endTime = endTime;
        // statisticsPriceGroupBySettleStatus(sellerId, this.startTime, this.endTime);
        selectInvoiceClass(status,settleStatus,startTime,endTime)
    });


    form.on('submit(submitInvoice)', function (data) {
        layer.alert("12")
    });


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

    carousel.render({
        elem: '#layui-carousel'
        , width: '100%' //设置容器宽度
        , arrow: 'none' //始终显示箭头
        , anim: 'default' //切换动画方式
    });


    //选择行社
    table.render({
        elem: '#tableBlank',
        cellMinWidth: 80,
        height: 385,
        url: "/mgt/selectAllSellerPaging",
        curr: 1,
        limit: 10,
        where: {
            "type": "PURCHASER"
        },
        response: {
            statusCode: 200
        },
        cols: [
            [
                {width: 110, templet: '#checkboxTpl'},
                {field: 'id', title: '行社ID'},
                {field: 'branchno', title: '行社编号'},
                {field: 'orgName', title: '行社名称'}
            ]
        ],
        page: true
    });

    var radiovalue;

    form.on('radio(lockDemo)', function (obj) {
        if (radiovalue === obj.value) {
            $(obj.elem).prop('checked', false);
            radiovalue = ''
            obj.value = ''
            sellerId = ''
            sellerName = "所有行社";
        } else {
            $(obj.elem).prop('checked', true)
            radiovalue = obj.value
            sellerId = this.value;
            sellerName = $(this).parent().parent().parent().find("td[data-field='orgName'] div").text();
        }

        form.render();
        return false;
    });


    //订单列表监听工具条
    table.on('tool(test-table-operate)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            layer.msg('ID：' + data.id + ' 的查看操作');
        } else if (obj.event === 'del') {
            layer.confirm('真的删除行么', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.alert('编辑行：<br>' + JSON.stringify(data))
        }
    });

});

selectInvoiceClass(status,settleStatus,startTime,endTime);
//选择 发票种类
function selectInvoiceClass(status,settleStatus,startTime,endTime) {


    if ((startTime == null) ^ (endTime == null)) {
        layer.alert("请同时选择开始时间和结束时间，或都不选择");
        return false;
    }

    $.ajax({
        type: "GET",
        url: "/mgt/queryInvoiceTotal",
        data: {
            "startTime": startTime,
            "endTime": endTime
        },
        success: function (data) {
            if(data.data != null){
                $("#total").html(data.data);
            }else{
                $("#total").html("0");
            }
        }
    });


    layui.use(['table', 'util'], function () {
        var table = layui.table;
        var util = layui.util;

        table.render({
            elem: '#invoice_table_all',
            cellMinWidth: 80,
            url: "/mgt/queryInvoiceByClass",
            curr: 1,
            limit: 10,
            where: {
                "sellerId": sellerId,
                "startTime": startTime,
                "endTime": endTime,
                "dss": 'UNCLEARED',
                "ds": ""
            },
            response: {
                statusCode: 200
            },
            cols: [
                [
                    {type: 'checkbox', fixed: 'left'},
                    {field: 'bilno', title: '供货单号'},
                    {field: 'name', title: '供货商名称'},
                    {field: 'confirmDate', title: '完成时间',templet:'<div>{{ layui.util.toDateString(d.createDate, "yyyy-MM-dd HH:mm:ss") }}</div>',},
                    {field: 'totalPrice', title: '订单总价',maxWidth:200},
                    {field: 'goods', title: '商品',minWidth:660},
                ]
            ],
            page: true
        });
    });
}


$(function () {

    swiper = new Swiper('.swiper-container');
    $('.step1').click(function () {
        $(".sellerName").html(sellerName);
        swiper.slideNext()
    })

    $('.step2').click(function () {
        swiper.slideNext()
    })

    $('.back').click(function () {
        swiper.slidePrev()
    })

    $('.sb li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

})