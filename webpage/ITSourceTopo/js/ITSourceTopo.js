(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.ITSourceTopo = factory(window.jQuery);
    }
}(window, function ($) {
    var Record = {
        // 默认是已用应用系统的一个
        appId:'',
    }
    if ( window.ITSourceTopo ) { return window.ITSourceTopo};

    // 配置DOM和temp的一一对应
    var tempAndDom = {
        'ITSourceTopo-template':'index-content'
    };
    function render(temp,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(temp,tempAndDom,data);
    };
    // 渲染统计内容的具体情况表
    // 有数据才有表，因为是模版
    function renderBasic(){
        fetchData('ITSource/getAppUsed','json',null,{
            success:function(res){
                if (res.success) {
                    Record.appId = res.data[0].id;
                    render('ITSourceTopo-template',{
                        apps:res.data
                    });
                    $('#ITSourceTopo-box .nav li').eq(0).addClass('active');
                    // 当模块加载后，loadTemp比fetchData快
                    Tool.loadTemp('webpage/ITSourceTopo/view/Graph.html',function(){
                        Graph.renderBasic($('#ITSourceTopo-Graph'));
                        Graph.render({
                            apps:Record.appId
                        });
                    });
                }
            }
        });


    }
    // 对外统一接口，在cmdb.js中调用
    // hase 判断记录参数
    function renderModule( hashes ) {
        renderBasic();
    };

    function changeTab(tab){
        Record.appId = $(tab).attr('data-id');
        Graph.render({
            apps:Record.appId,
            relation:$('#Graph-tool-relation .list-group-item.clicked').attr('data-relation')
        });
    }
    
    // 事件注册

    // 切换一级资源类型选项卡
    $('body').on('shown.bs.tab','#ITSourceTopo-box a[data-toggle="tab"]', function (e) {
        changeTab(e.target);
    });


    var ITSourceTopo = {};
    ITSourceTopo.renderModule = renderModule;

    return ITSourceTopo;
}));