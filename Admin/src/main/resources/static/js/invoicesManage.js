
layui.use(['table', 'carousel', 'laydate', 'form', 'layer'], function () {
    var table = layui.table,
        carousel = layui.carousel,
        laydate = layui.laydate,
        layer = layui.layer,
        $ = layui.$,
        form = layui.form;


    /*ar sellerId = '#{sellerId}';*/
    var status = null;
    var settleStatus = null;
    var startTime = '';
    var endTime = '';
    var name = "";
   /* var type = '#{type}';*/
    var id = [];
    var applicater = 9;

    $('#sd').on('click', function () {
        if ($('#shanghu option:selected').val() == '') {
            layer.msg('请选择商户')
            return false
        }
        if ($('[type="checkbox"]:checked').length == 0) {
            layer.msg('请选择单号')
            return false
        }
        queryPlatform();
        var  index = layer.open({
            type: 2,
            title: '确认发票',
            shadeClose: true,
            shade: 0.8,
            area: ['40%', '68%'],
            btn: ['确定', '取消'],
            yes: function () {
                if(type == 2){
                    changeInvoiceState(id.join(","),1,"bank",$('#price').html(),null);
                }else{
                    changeInvoiceState(id.join(","),1,"supply",$('#price').html(),null);
                }
                layer.close(index);

            },
            no: function () {
            },
            content: "/mgt/showSureInvoice?total=" + $('#price').html() + "&name=" + name + "&type="
        });
    })

    function changeInvoiceState(billo,state,changeType,total) {
        $.ajax({
            type: "GET",
            url: "/mgt/changeInvoiceState",
            data: {
                "billo": billo,
                "state":state,
                "changeType":changeType, //bank 行社跟平台 supply平台跟供货 清算状态
                "total":total,
                "supplierId":type==2?applicater:sellerId,
                "applicater":type==2?sellerId:applicater,
            },
            success: function (data) {

            }
        });
    }


    form.on('submit(formDemo)', function (data) {
        startTime = $("#test-laydate-start").val();
        endTime = $("#test-laydate-end").val();
        if(type == 2){
            queryBankInvoice();
        }else{
            querySupplyInvoice();
        }
        queryInvoiceTotal(sellerId);
    });

    form.on('select(shanghu)', function (data) {

        $("#price").html('0');
        sellerId = data.elem[data.elem.selectedIndex].value;
        name = data.elem[data.elem.selectedIndex].text;
        selectInvoiceClass();
        if(type == 2){
            queryBankInvoice();
        }else{
            querySupplyInvoice();
        }
        queryInvoiceTotal(sellerId);
    });

    //select 获取全部行社或者供货商
    form.on('select(switchSH)', function (data) {
        type = data.elem[data.elem.selectedIndex].value;
        queryInvoiceTotal(sellerId);
        $('#shanghu').html('')
        $("#price").html('0');
        querySeller();
    });

    querySeller();
    function querySeller() {
        $.ajax({
            type: "GET",
            url: "/mgt/querySellerAll",
            data: {
                "type": type, /*1代表供货商 2订货方 3 平台*/
            },
            success: function (data) {
                if (data.data.length != null) {
                    name = data.data[0].orgName;
                }
                for (var i = 0; i < data.data.length; i++) {
                    if(i==0){
                        $("#shanghu").append('<option value="' + data.data[i].id + '" selected>' + data.data[i].orgName + '</option>');
                      /*  sellerId = data.data[i].id;*/
                        name = data.data[i].orgName;
                        if(type == 2){
                            queryBankInvoice();
                            queryPlatform();
                        }else{
                            querySupplyInvoice();
                        }
                        queryInvoiceTotal(sellerId);
                    }else{
                        $("#shanghu").append('<option value="' + data.data[i].id + '">' + data.data[i].orgName + '</option>');
                    }
                    form.render('select');
                }
            }
        });
    }
    //查询供货平台名称
    function queryPlatform() {
        $.ajax({
            type: "GET",
            url: "/mgt/querySellerAll",
            data: {
                "type": 3, /*1代表供货商 2订货方 3 平台*/
            },
            success: function (data) {
                if (data.data.length != null && type != 1) {
                    name = data.data[0].orgName;
                    applicater = data.data[0].id;
                }
            }
        });
    }

    /*queryInvoiceTotal();*/

    function queryInvoiceTotal(sellerId) {
        $.ajax({
            type: "GET",
            url: "/mgt/queryInvoiceTotal",
            data: {
                "startTime": startTime,
                "endTime": endTime,
                "type":type,  //平台还是行社 1 供货 2 行社
                "sellerId":sellerId,            /// 里面的商家
            },
            success: function (data) {
                if (data.data != null) {
                    $("#total").html(data.data);
                } else {
                    $("#total").html("0");
                }
            }
        });
    }
// 平台跟供货商
    function querySupplyInvoice() {
        table.render({
            elem: '#invoice_table_all',
            url: "/mgt/querySupplyInvoice",
            curr: 1,
            limit: 10,
            where: {
                "sellerId": sellerId,
                "startTime": startTime,
                "endTime": endTime,
            },
            response: {
                statusCode: 200
            },
            cols: [
                [
                    {type: 'checkbox'},
                    {field: 'bilno', title: '发货单号', width: 200},
                    {field: 'name', title: '供货商名称', width: 200},
                    {field: 'confirmDate', title: '完成时间', width: 200},
                    /*{
                        field: 'confirmDate',
                        title: '完成时间',
                        templet: '<div>{{ layui.util.toDateString(d.confirmDate, "yyyy-MM-dd HH:mm:ss") }}</div>',
                        width: 220,
                        sort: true
                    },*/
                    {field: 'totalPrice', title: '订单总价', width: 100,sort: true},
                    {field: 'goods', title: '商品'},
                ]
            ],
            page: true
        });
    }

    //平台跟行社
    function queryBankInvoice() {
        table.render({
            elem: '#invoice_table_all',
            url: "/mgt/queryBankInvoice",
            curr: 1,
            limit: 10,
            where: {
                "sellerId": sellerId,
                "startTime": startTime,
                "endTime": endTime,
            },
            response: {
                statusCode: 200
            },
            cols: [
                [
                    {type: 'checkbox'},
                    {field: 'bilno', title: '发货单号', width: 220},
                    {field: 'confirmDate', title: '完成时间', width: 220},
                   /* {
                        field: 'confirmDate',
                        title: '完成时间',
                        templet: '<div>{{ layui.util.toDateString(d.confirmDate, "yyyy-MM-dd HH:mm:ss") }}</div>',
                        width: 220
                    },*/
                    {field: 'totalPrice', title: '订单总价', width: 140},
                    {field: 'goods', title: '商品'},
                ]
            ],
            page: true
        });
    }
    selectInvoiceClass();
    function selectInvoiceClass() {
            if(type == 1){
                queryBankInvoice();
            }else{
                querySupplyInvoice();
            }
            table.on('checkbox(table_all)', function (obj) {
                var s = $('#price').html();

                if (obj.checked == true) {
                    $("#price").html(parseFloat(s) + obj.data.totalPrice);
                } else {
                    $("#price").html(parseFloat(s) - obj.data.totalPrice)
                }

                if (obj.type == 'all') {
                    var t = 0
                    var m
                    var check = $(".layui-table-body .layui-table input[type='checkbox']");
                    check.each(function (index, item) {
                        t += parseFloat($(item).parents('tr').find('td[data-field="totalPrice"] > div').html())
                    });
                    $("#price").html(t);
                }

                if (obj.type == 'all' && obj.checked == false) {
                    $("#price").html('0')
                }

              var check1 = $(".layui-table-body .layui-table input[type='checkbox']");
                id = [];
              check1.each(function (index, item) {
                 if($(item).prop('checked')){
                   id.push($(item).parents('tr').find('td[data-field="bilno"] > div').html())
                 }
              });
               console.log(id)
                form.render('checkbox')
            });
    }
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
});

