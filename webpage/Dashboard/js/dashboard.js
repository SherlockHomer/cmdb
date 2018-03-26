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
    var tempAndDom = {
        'dashboard-template':'index-content',
        'dashboard-discovery-status-template':'dashboard-discovery-status',
        'dashboard-discovery-sync-template':'dashboard-discovery-sync',
        'dashboard-discovery-quick-template':'dashboard-discovery-quick',
        'dashboard-discovery-NEWS-template':'dashboard-discovery-NEWS'
    };
    function render(temp,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(temp,tempAndDom,data);
    };
    // 渲染首页
    function renderDb(){
        render('dashboard-template');
    }
    // 渲染自动发现状态
    function renderDbStatus(){
        fetchData('dashboard/getDiscoverStatus','json',null,{
            success:function(res){
                render('dashboard-discovery-status-template',res.data);
            },
            error:function(){

            }
        });
    }
    // 渲染同步状态
    function renderDbSync(){
        fetchData('dashboard/getSyncRecord','json',null,{
            success:function(res){
                render('dashboard-discovery-sync-template',res);
            },
            error:function(){

            }
        });
    }
    // 渲染快速访问
    function renderDbQuick(){
        fetchData('dashboard/getCategoryInfo','json',null,{
            success:function(res){
                render('dashboard-discovery-quick-template',res);
            },
            error:function(){

            }
        });
    }
    // 渲染NEWS
    function renderDbNEWS(){
        fetchData('dashboard/getVersionNews','json',null,{
            success:function(res){
                render('dashboard-discovery-NEWS-template',res.data);
            },
            error:function(){

            }
        });
    }
    // 对外统一接口，在cmdb.js中调用
    function renderModule(params) {
        if ( !params || params.length == 0 ) {
            Router.updateBreadcrumb([{
                url: '#/Dashboard',
                text:'仪表盘' 
            }])
            getAllView();
        }
    };
    function getAllView(){
        renderDb();
        // 细节独立开
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