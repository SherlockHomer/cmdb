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
    if ( window.Dashboard ) { return };
    var Dashboard = {};
    function getAllView(){
        renderDashboard();
        fecthData('discovery/getStatus','json',null,{
            success:function(res){
                // $('#')
                Handlebars.renderDOMInTemp('dashboard-discovery-status','dashboard-discovery-status-template',res.data)
            },
            error:function(){

            }
        });
    };
    function renderDashboard(){
        Handlebars.renderDOMInTemp('index-content','dashboard-template',{});
    }
    function renderModule(params) {
        if (!params) {
            getAllView();
        }
    }
    Dashboard.renderModule = renderModule;
    Dashboard.getAllView = getAllView ;
    return Dashboard;
}));