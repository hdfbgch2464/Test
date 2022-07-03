

layui.use(['table', 'laydate', 'form', 'layer'], function () {
    var table = layui.table,
        laydate = layui.laydate,
        layer = layui.layer,
        $ = layui.$,
        form = layui.form;
    var WaitOrderNum = null;
    //统计待发货订单数
    countWaitOrder();
    function countWaitOrder() {
        $.ajax({
            type: "GET",
            url: "/mgt/countWaitOrder",
            data: {},
            success: function (data) {
                console.log(data)
                $("#WaitOrderNum").html = data;
            }
        });
    }
    //统计昨日订单数量 总价
    countYesterOrder();
    function countYesterOrder() {
        $.ajax({
            type: "GET",
            url: "/mgt/countYesterOrder",
            data: {},
            success: function (data) {
                console.log(data)

            }
        });
    }

    //统计昨日完成 订单数 总价
    countYesterOrdered();
    function countYesterOrdered() {
        $.ajax({
            type: "GET",
            url: "/mgt/countYesterOrdered",
            data: {},
            success: function (data) {
                console.log(data)
            }
        });
    }

    //统计待审核发票信息
    countWaitInvoice();
    function countWaitInvoice() {
        $.ajax({
            type: "GET",
            url: "/mgt/countWaitInvoice",
            data: {},
            success: function (data) {
                console.log(data)
            }
        });
    }

})



