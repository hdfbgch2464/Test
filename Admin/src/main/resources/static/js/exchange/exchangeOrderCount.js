var startTime = '';
var endTime = '';
var type = 0;

layui.use(['table', 'laydate', 'form', 'layer'], function () {
    var table = layui.table,
        laydate = layui.laydate,
        layer = layui.layer,
        $ = layui.$,
        form = layui.form;

    form.on('select(switchExchange)', function (data) {
        type = data.elem[data.elem.selectedIndex].value;
        getExchageOrderCount(startTime, endTime,type,orgId);
    });

    form.on('select(switchOrg)', function (data) {
        orgId = data.elem[data.elem.selectedIndex].value;
        getExchageOrderCount(startTime, endTime,type,orgId);
    });

    form.on('submit(formDemo)', function (data) {
        startTime = $("#test-laydate-start").val();
        endTime = $("#test-laydate-end").val();
        getExchageOrderCount(startTime, endTime,type,orgId);
        /*table.reload('NocheckTable', {
            where:{
                "startTime":startTime,
                "endTime":endTime
            },
            request: {
                pageName: 'pageNo', //页码的参数名称，默认：page
                limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }
        });*/
    });

    table.on('tool(NocheckTable)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') {
            getProduct(data.id);
        }
    });

    function getProduct(id) {
        layer.open({
            type: 2,
            title: "网点员工自助兑换数据",
            shadeClose: true,
            shade: 0.8,
            area: ['88%', '88%'],
            content: "/mgt/toExchangeOrderData?orgId=" + id+"&startTime=" +startTime+ "&endTime="+endTime+ "&type="+type
        });
    }
    getExchageOrderCount(startTime,endTime,type,orgId);
    function getExchageOrderCount(startTime, endTime,type,orgId) {
        table.render({
            elem: '#NocheckTable',
            url: "/mgt/getExchageOrderCount",
            where:{
                "startTime":startTime,
                "endTime":endTime,
                "type":type,
                "orgId":orgId
            },
            cellMinWidth: 80,
            request: {
                pageName: 'pageNo', //页码的参数名称，默认：page
                limitName: 'pageSize' //每页数据量的参数名，默认：limit
            },
            toolbar: '#toolbarDemo',
            parseData: function (res) {
                return {
                    "code": 0,
                    "msg": "",
                    "count": res.total,
                    data: res.list
                }
            },
            cols: [
                [
                    {field: 'id', title: 'ID', hide: true},
                    // {templet: '#indexTpl', title: '序号'},
                    {field: 'name', title: '网点'},
                    {field: 'price', title: '总价格'},
                    {field: 'num', title: '总数量'},
                    {width: 200, align: 'center', title: '详情', fixed: 'right', toolbar: '#NocheckTool'}
                ]
            ],
            page: true

        });
    }

    queryOrgInfo()
    function queryOrgInfo() {
        $.ajax({
            type: "GET",
            url: "/mgt/selectOrgInfo",
            success: function (data) {
                for (var i = 0; i < data.data.length; i++) {
                  /*  if(i==0){
                        $("#switchOrg").append('<option value="' + data.data[i].id + '" selected>' + data.data[i].org_name + '</option>');
                    }else{
                        $("#switchOrg").append('<option value="' + data.data[i].id + '">' + data.data[i].org_name + '</option>');
                    }*/


                    $("#switchOrg").append('<option value="' + data.data[i].id + '">' + data.data[i].org_name + '</option>');
                    form.render('select');
                }
            }
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
