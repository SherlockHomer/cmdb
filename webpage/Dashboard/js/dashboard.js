(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.Dashboard = factory(window.jQuery);
    }
}(window, function ($) {
    if ( window.Dashboard ) { return window.Dashboard};

    // 配置DOM和temp的一一对应
    var domAndTemp = {
        'index-content':'dashboard-template',
        'dashboard-discovery-status':'dashboard-discovery-status-template',
        'dashboard-discovery-sync':'dashboard-discovery-sync-template',
        'dashboard-discovery-quick':'dashboard-discovery-quick-template',
        'dashboard-discovery-NEWS':'dashboard-discovery-NEWS-template'
    };
    function render(dom,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(dom,domAndTemp,data);
    };
    // 渲染首页
    function renderDb(){
        render('index-content');
    }
    // 渲染自动发现状态
    function renderDbStatus(){
        fecthData('discovery/getStatus','json',null,{
            success:function(res){
                render('dashboard-discovery-status',res.data);
            },
            error:function(){

            }
        });
    }
    // 渲染同步状态
    function renderDbSync(){
        fecthData('discovery/sync','json',null,{
            success:function(res){
                render('dashboard-discovery-sync',res);
            },
            error:function(){

            }
        });
    }
    // 渲染快速访问
    function renderDbQuick(){
        fecthData('discovery/getCategoryInfo','json',null,{
            success:function(res){
                render('dashboard-discovery-quick',res);
            },
            error:function(){

            }
        });
    }
    // 渲染NEWS
    function renderDbNEWS(){
        fecthData('discovery/getVersionNEWS','json',null,{
            success:function(res){
                render('dashboard-discovery-NEWS',res.data);
            },
            error:function(){

            }
        });
    }
    function renderModule(params) {
        if (!params) {
            getAllView();
        }
    };
    function getAllView(){
        renderDb();
        renderDbStatus();
        renderDbSync();
        renderDbQuick();
        renderDbNEWS();
    };

    $('body').on('click','#dashboard-news-home li',function(){
        var index = $(this).index()+1;
        $('#dashboard-discovery-NEWS .vertical-nav li').removeClass('active').eq(index).addClass('active');
    })
    var Dashboard = {};
    Dashboard.renderModule = renderModule;
    Dashboard.getAllView = getAllView ;
    return Dashboard;
}));