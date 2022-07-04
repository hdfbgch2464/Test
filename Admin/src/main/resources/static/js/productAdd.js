var imgType = 0;
var productSt = 1;
var purchaseOrnot = 1;
var productPrefecture = 0;
var image = "";//缩略图
var imageList = "";//详情图
var imgDetails = "";//细节图
layui.use(['form', 'layedit', 'jquery', 'layer', 'upload', 'carousel','element'], function () {
    var form = layui.form
        , layedit = layui.layedit
        , $ = layui.jquery
        , upload = layui.upload
        , carousel = layui.carousel
        , element = layui.element
        , layer = layui.layer;
    var units = ["杯", "桶", "盒", "kg", "袋", "个", "件", "斤", "升", "打", "箱", "套", "只", "支", "台", "盏", "罐"];
    var fz = 0;
    var fm = 1;


    getClassInit();

    function getClassInit() {
        $.ajax({
            type: "GET",
            url: "/mgt/queryShopClassInit",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.data.oneClass.length; i++) {
                    $("#oneClass").append('<option value="' + data.data.oneClass[i].id + '">' + data.data.oneClass[i].categoryName + '</option>');
                }
                for (var j = 0; j < data.data.twoClass.length; j++) {
                    $("#twoClass").append('<option value="' + data.data.twoClass[j].id + '">' + data.data.twoClass[j].categoryName + '</option>');
                }
                form.render('select');
            }
        });
    }

    function getClassTwo(id) {
        $.ajax({
            type: "GET",
            url: "/mgt/queryClassTwo",
            data: {
                id: id
            },
            success: function (data) {
                $("#twoClass").empty();
                for (var j = 0; j < data.data.length; j++) {
                    $("#twoClass").append('<option value="' + data.data[j].id + '">' + data.data[j].categoryName + '</option>');
                }
                form.render('select');
            }
        });
    }


  $(".slt").hover(function(){
    $(".layui-btn-delete").show();
  },function(){
    $(".layui-btn-delete").hide();
  });

  $("#imgList,#imgDetails").hover(function(){
    $(".delete").show();
  },function(){
    $(".delete").hide();
  });

    upload.render({
        elem: '#thumbnail'
        , url: '/mgt/uploadImgs'
        , auto: true //选择文件后自动上传//
        , accept: 'images'
         ,progress: function(e , percent) {
          console.log("进度：" + percent + '%');
          $('.layui-progress').fadeIn()
          element.progress('progressBar',percent  + '%');
        }
        , before: function (obj) {
            /*obj.preview(function (index, file, result) {
                if (imgType == 0) {
                    $('.layui-btn-delete').remove();
                    $('#imgs').attr('src', result); //图片链接（base64）
                    $('.slt').append('<button type="button" class="layui-btn layui-btn-danger layui-btn-delete">删除</button>')
                    image = "/upload/userImg/" + file.name;
                  element.progress('progressBar','0%');
                    imgtypeChange();
                    return false
                } else if (imgType == 1) {
                    if (imageList.split(",,").length < 5) {
                        /!* $("#imgList").append('" <div><img src="'+result+'"></div>"')*!/

                        if (imageList != "") {
                            imageList += ",," + "/upload/userImg/" + file.name;
                        } else {
                            imageList = "/upload/userImg/" + file.name;
                        }
                        $("#imgList").append('<div><div class="con" > <img src="images/delete1.png" id=' + index + ' style="width: 25px;height: 25px;position:absolute;z-index:1;right:0px"+  "><img src="' + result + '"></div></div>')
                    } else {
                        layer.alert("展示图只能选择5张")
                    }

                    var carindex = 0
                    carousel.on('change(detailsDetele)', function (obj) {
                        carindex = obj.index; //当前条目的索引
                        console.log(carindex)
                    });

                    $('body').on('click', '#' + index, function () {
                        $(this).parent().parent().remove()
                        console.log(carindex)
                        $('.layui-carousel-ind ul li').eq(carindex).remove()
                        inscarousel.reload();
                        imageList= imageList.split(",,").length == 1 ? "" : imageList.split(",,").splice(carindex, 1).join(",,");
                        imgtypeChange();
                    })
                  element.progress('progressBar','0%');
                    imgtypeChange();
                } else if (imgType == 2) {
                    if (imgDetails.split(",,").length <= 100) {
                        if (imgDetails != "") {
                            imgDetails += ",," + "/upload/userImg/" + file.name;
                        } else {
                            imgDetails = "/upload/userImg/" + file.name;
                        }
                        imgtypeChange();
                    } else {
                        layer.alert("详情图只能展示100张")
                    }

                    $("#imgDetails").append('<div><div class="con">  <img src="images/delete1.png" id=' + index + ' style="width: 25px;height: 25px;position:absolute;z-index:1;right:0px"+  ">  <img src="' + result + '"></div></div> ')

                    $('body').on('click', '#' + index, function () {
                        $(this).parent().parent().remove();
                        imgDetails= imgDetails.split(",,").length == 1 ? "" : imgDetails.split(",,").splice(carindex, 1).join(",,");
                        imgtypeChange();
                    })

                  element.progress('progressBar','0%');
                }
                imgtypeChange()

                var inscarousel = carousel.render({
                    elem: '#focusimgList'
                    , width: '100%'
                    , height: '300px'
                    , interval: 5000
                });
            });*/
        },
        done: function (result, index, upload) {
            console.log(result)
            if (imgType == 0) {
                $('.layui-btn-delete').remove();
                $('#imgs').attr('src', result.data); //图片链接（base64）
                $('.slt').append('<button type="button" class="layui-btn layui-btn-danger layui-btn-delete">删除</button>')
                image =  result.data;
                element.progress('progressBar','0%');
                imgtypeChange();
                return false
            } else if (imgType == 1) {
                if (imageList.split(",,").length < 5) {
                    if (imageList != "") {
                        imageList += ",," +  result.data;
                    } else {
                        imageList =  result.data;
                    }
                    $("#imgList").append('<div><div class="con" > <img src="images/delete1.png" id=' + index + ' style="width: 25px;height: 25px;position:absolute;z-index:1;right:0px"+  "><img src="' + result.data + '"></div></div>')
                } else {
                    layer.alert("展示图只能选择5张")
                }

                var carindex = 0
                carousel.on('change(detailsDetele)', function (obj) {
                    carindex = obj.index; //当前条目的索引
                    console.log(carindex)
                });

                $('body').on('click', '#' + index, function () {
                    $(this).parent().parent().remove()
                    console.log(carindex)
                    $('.layui-carousel-ind ul li').eq(carindex).remove()
                    inscarousel.reload();
                    imageList= imageList.split(",,").length === 1 ? "" : imageList.split(",,").splice(carindex, 1).join(",,");
                    imgtypeChange();
                })
                element.progress('progressBar','0%');
                imgtypeChange();
            } else if (imgType == 2) {
                if (imgDetails.split(",,").length <= 100) {
                    if (imgDetails != "") {
                        imgDetails += ",," +  result.data;
                    } else {
                        imgDetails = result.data;
                    }
                    imgtypeChange();
                } else {
                    layer.alert("详情图只能展示100张")
                }

                $("#imgDetails").append('<div><div class="con">  <img src="images/delete1.png" id=' + index + ' style="width: 25px;height: 25px;position:absolute;z-index:1;right:0px"+  ">  <img src="' + result.data + '"></div></div> ')

                $('body').on('click', '#' + index, function () {
                    $(this).parent().parent().remove();
                    imgDetails= imgDetails.split(",,").length === 1 ? "" : imgDetails.split(",,").splice(carindex, 1).join(",,");
                    imgtypeChange();
                })

                element.progress('progressBar','0%');
            }
            imgtypeChange()

            var inscarousel = carousel.render({
                elem: '#focusimgList'
                , width: '100%'
                , height: '300px'
                , interval: 5000
            });

            layer.closeAll('loading'); //关闭loading
        }
    });


    $('body').on('click', '.layui-btn-delete', function () {
        $('#imgs').attr('src', '');
        $(this).remove();
        image = "";
        imgtypeChange();
    })
    form.on('select(selectPhotoClass)', function (data) {
        imgType = $("#selectPhotoClass option:selected").val();
        imgtypeChange();
    });

    function imgtypeChange() {
        if (imgType == 0) {
            fzfm(image == "" ? 0 : 1, 1);
        } else if (imgType == 1) {
            fzfm(imageList == "" ? 0 : imageList.split(",,").length, 5);
        } else if (imgType == 2) {
            fzfm(imgDetails == "" ? 0 : imgDetails.split(",,").length, 100);
        }
    }


    form.on('switch(switchGround)', function (data) {
        if (this.checked) {
            productSt = 1;
        } else {
            productSt = 2;
        }
    });
    form.on('switch(purchaseOrnot)', function (data) {
        if (this.checked) {
            purchaseOrnot = 0;
        } else {
            purchaseOrnot = 1;
        }
    });
    form.on('switch(productPrefecture)', function (data) {
        if (this.checked) {
            productPrefecture = 1;
        } else {
            productPrefecture = 0;
        }
    });
    fzfm(fz, fm);

    function fzfm(fz, fm) {
        $("#fz").html(fz);
        $("#fm").html(fm);
    }


    form.on('select(oneClass)', function (data) {
        getClassTwo(data.value)
    });
    unit();

    function unit() {
        for (var i = 0; i < units.length; i++) {
            $("#hc_select").append('<option value="' + units[i] + '">' + units[i] + '</option>');
        }
        form.render('select');
    }

    // 单位select 可以选 可以自定义填
    form.on('select(hc_select)', function (data) {
        $("#HandoverCompany").val(data.value);
        $("#hc_select").next().find("dl").css({"display": "none"});
        form.render();
    });
    window.search = function () {
        var value = $("#HandoverCompany").val();
        $("#hc_select").val(value);
        form.render();
        $("#hc_select").next().find("dl").css({"display": "block"});
        var dl = $("#hc_select").next().find("dl").children();
        var j = -1;
        for (var i = 0; i < dl.length; i++) {
            if (dl[i].innerHTML.indexOf(value) <= -1) {
                dl[i].style.display = "none";
                j++;
            }
            if (j == dl.length - 1) {
                $("#hc_select").next().find("dl").css({"display": "none"});
            }
        }
    }

    form.on('select(exchangeType)', function (data) {
        type = data.elem[data.elem.selectedIndex].value;
        changeExchange(type);
    });

    function changeExchange(type) {
        $('#exchangeType').children('option').eq(type).prop('selected', true);
        if(type == "0"){
            $("#showPrice").show();
            $("#showCash").hide();
        }else if(type == "1"){
            $("#showPrice").hide();
            $("#showCash").show();
        }else if(type == "2"){
            $("#showPrice").show();
            $("#showCash").show();
        }
        form.render('select');
    }

    form.on('submit(productAdd)', function (data) {
        var productStatus = productSt;
        var name = $("#name").val();
        var unit = "";
        var HandoverCompany = $("#HandoverCompany").val();
        if (HandoverCompany != "") {
            unit = HandoverCompany;
        } else {
            unit = $("#hc_select option:selected").val()
        }

        var price = $("#price").val();
        var brand = $("#brand").val();
        var remark = "";
        var barcode = "";
        var unitExplan = $("#unitExplan").val();
        var referencePrice = $("#referencePrice").val();
        var categoryId = $("#twoClass option:selected").val();
        var exchangeType = $("#exchangeType option:selected").val();
        var exchangeRemark = $("#exchangeRemark").val();
        var purchasePrice = $("#purchasePrice").val();
        var exchangeCash = $("#exchangeCash").val();
        var exchangePrice = $("#exchangePrice").val();
        var model = $("#model").val();


        if (purchasePrice == "") {
            layer.alert("请输入平台价");
            return;
        }
        if (name == "") {
            layer.alert("请输入商品名称");
            return;
        }
       /* if (image == "") {
            layer.alert("请选择缩略图");
            return;
        }
        if (imageList == "") {
            layer.alert("请选择展示图");
            return;
        }
        if (imgDetails == "") {
            layer.alert("请选择详情图");
            return;
        }*/
        if (categoryId == "") {
            layer.alert("请选择商品分类");
            return;
        }
        if (brand == "") {
            layer.alert("请输入商品品牌");
            return;
        }
        if (unit == "") {
            layer.alert("请输入商品单位");
            return;
        }
        if (price == "" || !checkNumber(price)) {
            layer.alert("请输入正确的商品订货价");
            return;
        }
        if (referencePrice == "" || !checkNumber(referencePrice)) {
            layer.alert("请输入正确的商品市场参考价");
            return;
        }
        $.post("/mgt/productAdd", {
            "name": name,
            "unit": unit,
            "image": image,
            "brand": brand,
            "price": price,
            "remark": remark,
            "barcode": barcode,
            "imageList": imageList,
            "imgDetails": imgDetails,
            "unitexplan": unitExplan,
            "categoryId": categoryId,
            // "settlePrice": settlePrice,
            "productStatus": productStatus,
            "referencePrice": referencePrice,
            "purchasePrice":purchasePrice,
            "exchangeType":exchangeType,
            "exchangeCash":exchangeCash,
            "exchangeRemark":exchangeRemark,
            "exchangePrice":exchangePrice,
            "purchaseOrnot":purchaseOrnot,
            "productPrefecture":productPrefecture,
            "model":model
        }, function (data) {
            var status = data.status;
            var msg = data.msg;
            if (status == 200) {
                layer.open({
                    content: "新增成功"
                    , btn: ['前往审核', '继续添加']
                    , yes: function (index, layero) {
                        window.parent.layui.index.openTabsPage('/mgt/productCheckPage', '商品审核');
                    }
                    , btn2: function (index, layero) {
                        window.parent.layui.index.openTabsPage('/mgt/addProduct', '商品新增');
                        location.reload();
                    }
                });
            } else {
                layer.alert(msg);
            }
        })
    });
});

function checkNumber(text) {
    var reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
    if (!reg.test(text)) {
        return false;
    } else {
        return true;
    }
}

function totalPrice() {
    var price = $("#price").val();
    var bfb = $("#bfb").val();
    var checkSX = $("#checkSX option:checked").val();
    var total = 0;
    if (checkSX == 1) {
        total = parseFloat(price) * (1 + parseFloat(bfb) * 0.01);
    } else {
        total = parseFloat(price) * (1 - parseFloat(bfb) * 0.01);
    }
    $("#referencePrice").val((total + "").substring(0, (total + "").indexOf(".") + 3));
}



