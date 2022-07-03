var startTime = '';
var endTime = '';
var checkType = 3;
var likeSearch = "";
layui.use(['table', 'laydate', 'form', 'layer'], function () {
    var table = layui.table,
        laydate = layui.laydate,
        layer = layui.layer,
        $ = layui.$,
        form = layui.form;

    form.on('submit(formDemo)', function (data) {
        startTime = $("#test-laydate-start").val();
        endTime = $("#test-laydate-end").val();
        showInvoiceTable( startTime, endTime,checkType,likeSearch);
    });

    showInvoiceTable(startTime, endTime,checkType,likeSearch);

    form.on('select(switchCheck)', function (data) {
        checkType= data.elem[data.elem.selectedIndex].value;
        showInvoiceTable(startTime, endTime,checkType,likeSearch);
    });


    $("#invoceId").blur(function () {
        likeSearch =  $(this).val();
        showInvoiceTable(startTime, endTime,checkType,likeSearch);
    })

    function getProduct(id) {
        layer.open({
            type: 2,
            title: '发票详情',
            shadeClose: true,
            shade: 0.8,
            area: ['50%', '88%'],
            content: "/mgt/invoiceDetails?id=" + id
        });
    }

    function showInvoiceTable( startTime, endTime,checkType) {
        layui.use(['table', 'util', 'layer'], function () {
            var table = layui.table;
            var util = layui.util;
            layer = layui.layer;
            table.render({
                elem: '#inHistory',
                cellMinWidth: 80,
                url: "/mgt/queryInvoiceHistory",
                curr: 1,
                limit: 10,
                where: {
                    "startTime": startTime,
                    "endTime": endTime,
                    "checkType":checkType,
                    "likeSearch":likeSearch
                },
                response: {
                    statusCode: 200
                },
                cols: [
                    [
                        {field: 'total', title: '发票金额',width:150},
                        {field: 'invoice_id', title: '发票编号',width:330},
                        {field: 'invoice_type', title: '发票类型',width:180},
                        {
                            field: 'applicationDate',
                            title: '申请时间',
                            templet: '<div>{{ layui.util.toDateString(d.createDate, "yyyy-MM-dd HH:mm:ss") }}</div>',
                        },
                        {field: 'supplyer', title: '供应商(发票开具方)', minWidth: 240},
                        {
                            field: 'state', title: '发票状态', templet: function (d) {
                                if (d.state == 0) {
                                    return '审核未通过';
                                } else if (d.state == 1) {
                                    return '审核中';
                                } else {
                                    return "审核通过";
                                }
                            }
                        },
                        // {width: 200, align: 'center', title: '操作', fixed: 'right', toolbar: '#NocheckTool'}
                    ]
                ],
                page: true,
                text: { //自定义文本，此处用法--》当返回数据为空时的异常提示
                    none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
                }
            });
            table.on('tool(inHistory)', function (obj) {
                var data = obj.data;
                if (obj.event === 'edit') {
                    getProduct(data.id);
                }
            });
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
