(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.ITSourceReport = factory(window.jQuery);
    }
}(window, function ($) {
    if ( window.ITSourceReport ) { return window.ITSourceReport};

    // 配置DOM和temp的一一对应
    var domAndTemp = {
        'index-content':'ITSourceReport-template'
    };
    function render(dom,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(dom,domAndTemp,data);
    };
    // 渲染首页
    function renderITSourceReport(){
        fecthData('ITSourceReport/report','json',null,{
            success:function(res){
                $.each(res.data,function(i,per){
                    $.each(per.details,function(y,perD){
                        perD.type = per.type;
                    })
                })
                render('index-content',res);
            },
            error:function(){

            }
        });
    }
    // 对外统一接口，在cmdb.js中调用
    function renderModule(params) {
        if (!params) {
            getAllView();
        }
    };
    function getAllView(){
        renderITSourceReport();
    };

    $('body').on('click','.ITSourceBox .info-box',function(){
        var name = $(this).find('.info-box-number').attr('data-name');
        window.location = window.location.origin + window.location.pathname + '#/ITSourceReport/' + name;
    })
    
    var ITSourceReport = {};
    ITSourceReport.renderModule = renderModule;
    ITSourceReport.getAllView = getAllView ;
    return ITSourceReport;
}));