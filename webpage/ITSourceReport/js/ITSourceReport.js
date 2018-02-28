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
    var tempAndDom = {
        'ITSourceReport-template':'index-content',
        'ITSourceReport-count-template':'index-content',
        'ITSource-sourceTable-template':'index-content'
    };
    function render(temp,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(temp,tempAndDom,data);
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
                render('ITSourceReport-template',res);
            },
            error:function(){

            }
        });
    }
    // 渲染统计
    function renderCount(params){
        fecthData('ITSourceReport/count','json',params,{
            success:function(res){
                render('ITSourceReport-count-template',res);
            },
            error:function(){

            }
        });
    }
    // 渲染统计内容的具体情况表
    // 有数据才有表，因为是模版
    function loadInfoTb(params){
        if ( !$('#ITSource-sourceTable-template')[0] ){
            loadTemp('webpage/ITSource/view/sourceTable.html',{
                success:function(){
                    getTbDataAndRender(params);
                },
                error:function(){

                }
            })
        } else {
            getTbDataAndRender(params);
        }
        // 
        function getTbDataAndRender(params){
            fecthData('ITSource/infoAll','json',params,{
                success:function(res){
                    render('ITSource-sourceTable-template',res.data);
                    $('#ITSource-sourceTable').dataTable();
                    // todo : 根据菜单不同处理内容
                },
                error:function(){

                }
            });
        }
    }
    
    // 对外统一接口，在cmdb.js中调用
    function renderModule(params) {
        if ( !params || params.length == 0 ) {
            getAllView();
        } else if ( params[0] && !params[1]){
            // 加载统计情况
            renderCount({
                typeName : params[0]
            });
        } else if ( params[0] && params[1]){
            loadInfoTb({
                "page":1,
                "rows":15,
                "searchText":"",
                "tags":[],
                "type":1
            })
        }
    };
    // 对于一个界面多个box多个ajax友好
    function getAllView(){
        renderITSourceReport();
    };

    $('body').on('click','.ITSourceBox .info-box',function(){
        var name = $(this).find('.info-box-number').attr('data-name');
        Route.addHash(name);
    });
    $('body').on('click','.ITSource-countBox .btn',function(){
        var name = $(this).find('.info-box-number').attr('data-name');
        Route.addHash(name);
    })
    
    var ITSourceReport = {};
    ITSourceReport.renderModule = renderModule;
    ITSourceReport.getAllView = getAllView ;
    return ITSourceReport;
}));