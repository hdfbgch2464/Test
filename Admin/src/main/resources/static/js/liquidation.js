var purchaseId = null;
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
        statisticsPriceGroupBySettleStatus(purchaseId, this.startTime, this.endTime);
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

    //选择商户
    table.render({
        elem: '#tableMerchant',
        cellMinWidth: 80,
        height: 185,
        url: "/mgt/selectAllSellerPaging",
        curr: 1,
        limit: 5,
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

    // form.on('radio(lockDemo)', function (obj) {
    //     //layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    //     purchaseId = this.value;
    // });

    var radiovalue;

    form.on('radio(lockDemo)', function (obj) {
        if (radiovalue === obj.value) {
            $(obj.elem).prop('checked', false);
            radiovalue = ''
            obj.value = ''
            purchaseId = ''
        } else {
            $(obj.elem).prop('checked', true)
            radiovalue = obj.value
            purchaseId = this.value;
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


function statisticsPriceGroupBySettleStatus(purchaseId, startTime, endTime) {

    /*if (purchaseId == null) {
        layer.alert("请选择供货商");
        return false;
    }*/

    if ((startTime.length == 0) ^ (endTime.length == 0)) {
        layer.alert("请同时选择开始时间和结束时间，或都不选择");
        return false;
    }

    $("#all").html(0);
    $("#unconfirmed").html(0);
    $("#rejected").html(0);
    $("#confirmed").html(0);
    $("#uncleared").html(0);
    $("#launched").html(0);
    $("#cleared").html(0);

    $.ajax({
        type: "post",
        url: "/mgt/liquidation/statisticsPriceGroupByStatusBank",
        data: {
            "purchaseId": purchaseId,
            "startTime": startTime,
            "endTime": endTime
        },
        success: function (data) {
            var i = layer.load(1, {
                shade: [0.6, '#000']
            });
            if (data.status == 200) {
                var totol = 0;
                layer.close(i)
                $.each(data.data, function (index, item) {
                    var status = item.status;
                    var tool = item.totol;
                    if (status == 0) {
                        $("#unconfirmed").html(tool);
                    } else if (status == 1) {
                        $("#confirmed").html(tool);
                    } else {
                        $("#rejected").html(tool);
                    }

                    totol += tool;
                });
                $("#all").html(totol);
            } else {
                layer.alert(data.msg);
            }

        }
    });

    $.ajax({
        type: "post",
        url: "/mgt/liquidation/statisticsPriceGroupBySettleStatusBank",
        data: {
            "purchaseId": purchaseId,
            "startTime": startTime,
            "endTime": endTime
        },
        success: function (data) {
            if (data.status == 200) {
                $.each(data.data, function (index, item) {
                    var status = item.settle_status_bank;
                    var tool = item.totol;
                    if (status == 0) {
                        $("#uncleared").html(tool);
                    } else if (status == 1) {
                        $("#launched").html(tool);
                    } else {
                        $("#cleared").html(tool);
                    }
                });
            } else {
                layer.alert(data.msg);
            }

        }
    });
}


function selectSellerDelivers(status, settleStatus) {
    this.status = status;
    this.settleStatus = settleStatus;

    if (settleStatus === 'UNCLEARED') {
        $("#clearButton").show();
    } else {
        $("#clearButton").hide();
    }

    if (settleStatus === 'LAUNCHED') {
        $("#clearTrueButton").show();
    } else {
        $("#clearTrueButton").hide();
    }

    var startTime = $("#test-laydate-start").val();
    var endTime = $("#test-laydate-end").val();

    if ((startTime.length == 0) ^ (endTime.length == 0)) {
        layer.alert("请同时选择开始时间和结束时间，或都不选择");
        return false;
    }

    layui.use(['table', 'util'], function () {
        var table = layui.table;
        var util = layui.util;

        table.render({
            elem: '#test-table-page',
            cellMinWidth: 80,
            url: "/mgt/liquidation/selectPurchaseDelivers",
            curr: 1,
            limit: 10,
            where: {
                "purchaseId": purchaseId,
                "startTime": startTime,
                "endTime": endTime,
                "dss": settleStatus,
                "ds": status
            },
            response: {
                statusCode: 200
            },
            cols: [
                [
                    {type: 'checkbox', fixed: 'left'},
                    {field: 'deliverBillno', title: '供货单号'},
                    {field: 'purchaseOrgId', title: '行社ID'},
                    {field: 'totalPriceBank', title: '发货总金额'},
                    {
                        field: 'status', title: '是否已确认', templet: function (d) {
                            if (d.status == 0) {
                                return '未确认';
                            } else if (d.status == 1) {
                                return '已确认';
                            } else {
                                return "已拒绝";
                            }
                        }
                    },
                    {field: 'confirmPersonId', title: '确认人'},
                    {
                        field: 'confirmDate', title: '确认时间', templet: function (d) {
                            return util.toDateString(d.confirmDate);
                        }
                    },
                    /*{field: 'deliverPersonId', title: '发货人'},*/
                    {
                        field: 'deliverDate', title: '发货时间', templet: function (d) {
                            return util.toDateString(d.deliverDate);
                        }
                    },
                    {
                        field: 'settleStatusBank', title: '清算进度', templet: function (d) {
                            if (d.settleStatusBank == 0) {
                                return '未清算';
                            } else if (d.settleStatusBank == 1) {
                                return '已发起';
                            } else if (d.settleStatusBank == 2) {
                                return '已清算';
                            }
                        }
                    }
                ]
            ],
            page: true
        });
    });
}


layui.use(['table', 'util'], function () {
    var table = layui.table;
    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            if (purchaseId == null) {
                layer.alert("请指定行社进行清算");
                return false;
            }

            var checkStatus = table.checkStatus('test-table-page')
                , data = checkStatus.data;

            var ids = new Array();
            $.each(data, function (index, item) {
                ids[index] = item.id;
            });

            $.ajax({
                type: "post",
                url: "/mgt/liquidation/branchLiquidationOrdersBank",
                dataType: "json",
                data: {
                    "purchaseId": purchaseId,
                    "ids": ids
                },
                success: function (data) {
                    if (data.status == 200) {
                        layer.alert("清算发起成功");
                        statisticsPriceGroupBySettleStatus(purchaseId, startTime, endTime)
                        selectSellerDelivers(status, settleStatus);
                    } else {
                        layer.alert(data.msg);
                    }
                }
            });
        }
    };

    $('#clearButton').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});


layui.use(['table', 'util'], function () {
    var table = layui.table;
    var $ = layui.$, active = {
        getCheckData: function () { //获取选中数据
            if (purchaseId == null) {
                layer.alert("请指定行社进行清算完成确认");
                return false;
            }

            var checkStatus = table.checkStatus('test-table-page')
                , data = checkStatus.data;

            var ids = new Array();
            $.each(data, function (index, item) {
                ids[index] = item.id;
            });

            $.ajax({
                type: "post",
                url: "/mgt/liquidation/trueLiquidationOrdersBank",
                dataType: "json",
                data: {
                    "purchaseId": purchaseId,
                    "ids": ids
                },
                success: function (data) {
                    if (data.status == 200) {
                        layer.alert("清算完成确认成功");
                        statisticsPriceGroupBySettleStatus(purchaseId, startTime, endTime);
                        selectSellerDelivers(status, settleStatus);
                    } else {
                        layer.alert(data.msg);
                    }
                }
            });
        }
    };

    $('#clearTrueButton').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});