/*#
===================
@explain: 公共文件
@copyright: Copyright 2012, Aliyun Co. Ltd.
@author: 康安
===================
#*/

var lay_cfg = {
    headObjHeight: $("#header").height(),
    footObjHeight: $("#footer").height(),
    menuObj: $("#sidebar"),
    bodyObj: $("#wrap"),
    mainObj: $("#main"),
    mianTopObj: $(".main-top"),
    mianContentObj: $(".main-content"),
    attibuteObj: $(".console-attibute"),
    attibuteTopObj: $(".console-attibute-top"),
    attibuteContentObj: $(".console-attibute-content"),
    ctrMenuObj: $(".drag-menu-contraction"),
    ctrAttibuteObj: $(".drag-attibute-contraction"),
    ctrAttiDagBar: $(".console-attibute-dragbar"),
    //最小高度
    minHeight: 300,
    //最小宽度
    minWidth: 900,
    menuMaxWid: null,
    attibuteMaxHei: null
};

//命名空间
(function() {
    var CSL = (function(csl) {
        return csl;
    } (CSL || {}));
    window.CSL = CSL;
} ());
//定时器配置
CSL.timer = {};//定时器
CSL.timer.temp = [];//临时定时器存储器
//CSL.timer.global = [];//全局定时器存储

CSL.page = CSL.page || {};

CSL.resetLayout = function() {
    //宽度和高度都有最小值
    var bodyHeight = $(window).height() - lay_cfg.headObjHeight - lay_cfg.footObjHeight;
    var scrollbar = bodyHeight < lay_cfg.minHeight ? true: false; //判断是否出现滚动条
    bodyHeight = bodyHeight < lay_cfg.minHeight ? lay_cfg.minHeight: bodyHeight;
    var bodyWidth = $(window).width(); //20是左右两边的间距
    bodyWidth = bodyWidth < lay_cfg.minWidth ? lay_cfg.minWidth: bodyWidth;
    //处理firefox下刷新和调整浏览器窗口，$(window).width()值不一样的BUG,设置不出现滚动条，则不会有此问题
    //设置可拖动的最大宽度和高度
    lay_cfg.menuMaxWid = bodyWidth - 600;
    lay_cfg.attibuteMaxHei = bodyHeight - 120;

    var mainWidth = bodyWidth - lay_cfg.menuObj.width() - 30; // 40是有边距
    lay_cfg.bodyObj.css({
        "height": (bodyHeight) + "px",
        "width": (bodyWidth) + "px"
    });
    lay_cfg.menuObj.css({
        "height": (bodyHeight) + "px",
        "width": (lay_cfg.menuObj.width()) + "px"
    });
    lay_cfg.attibuteObj.css({
        "height": (lay_cfg.attibuteObj.height()) + "px",
        "width": (mainWidth) + "px"
    });
    lay_cfg.mainObj.css({
        "height": (bodyHeight - lay_cfg.attibuteObj.height()) + "px",
        "width": (mainWidth) + "px"
    });
    lay_cfg.ctrMenuObj.css({
        "top": (bodyHeight / 2 - lay_cfg.ctrAttibuteObj.height()) + "px" //减去收缩按钮的高度
    });
    lay_cfg.ctrAttibuteObj.css({
        "left": (mainWidth / 2 - lay_cfg.ctrAttibuteObj.width()) + "px" //减去收缩按钮的宽度
    });

    lay_cfg.mianContentObj.css({
        "height": (bodyHeight - lay_cfg.attibuteObj.height() - lay_cfg.mianTopObj.height()) + "px"
    });

    lay_cfg.attibuteContentObj.css({
        "height": (lay_cfg.attibuteObj.height() - lay_cfg.attibuteTopObj.height()) + "px"
    });
    //在IE6里，如果不设置外层DIV为overflow:hidden，先改变外层DIV，然后再改变内层DIV，将会无效，因为内层会把外层撑开
    lay_cfg.ctrAttiDagBar.css({
        "width": (lay_cfg.attibuteObj.width() + 40) + "px"
    });
};

CSL.resetLayout();

$(window).resize(CSL.resetLayout);

// 左侧导航DIV的收拉功能
$(".drag-menu-contraction").click(function () {
    if (!$(this).hasClass("up")) {
        $(this).attr("prew", $(this).parent().width()).addClass("up");
        $(this).parent().css("width", "6px");
        CSL.resetLayout();
    }
    else {
        $(this).parent().css("width", $(this).attr("prew") + "px");
        $(this).removeClass("up");
        CSL.resetLayout();
    }
});

//tab 选中
function tabIt(obj) {
    var i = $(obj).index();
    $(obj).addClass('selected').siblings().removeClass('selected');
    $(obj).parent().parent().next('.tab-content').find('.tab-detail-item').eq(i).css('display','block').siblings().hide();
}
tabIt($('.tab .tab-div .tab-menu .selected'));
// tab
$('.tab .tab-div .tab-menu .tab-item').click(function(){
    tabIt($(this));
});

// tip 点击隐藏
$('.tips').click(function(){
    $(this).hide(500);
});
