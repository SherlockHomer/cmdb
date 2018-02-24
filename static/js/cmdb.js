(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.returnExports = factory(window.jQuery);
    };
}(window, function ($) {
    var Router = {
        'Dashboard':{
            'moduleUrl':'webpage/Dashboard/view/dashboard.html',
        },
        'Configuration':{
            'moduleUrl':'webpage/Configuration/view/configuration.html'
        },
        '404': {
            'moduleUrl':'webpage/404/view/404.html'
        }
    };

    function loadModule(moduleName,params) {
        moduleName = Router[moduleName] ? moduleName : '404';
        var url = Router[moduleName].moduleUrl;
        if ( moduleName == '404' && Router[moduleName].innerHTML ) {
            $('#index-content').html(Router[moduleName].innerHTML);
            return;
        }
        $.ajax({
            url: url,
            dataType: 'html',
            type: 'post',
            success:function(res){
                if ( moduleName == '404'){
                    Router[moduleName].innerHTML = res;
                };
                $('#index-content').html(res);
            },
            error:function(e){
                // 虽然js配置了，但还是找不到该文件
                $('#index-content').html('');
            }
        });
    }
    function router () {
        var hashes = ( location.hash.slice(1) || '/' ).split('/');

        if ( (!hashes[1]) || ( hashes[1] == 'Dashboard' && !hashes[2] ) ) {
            loadModule('Dashboard');
        } else if ( hashes[1] == 'Configuration' ){
            loadModule('Configuration');
        } else if ( hashes[1] == 'Monitor'){
            loadModule('Monitor');
        } else if ( hashes[1] == 'ITSource'){
            loadModule('ITSource');
        } else if ( hashes[1] == 'TopoGraph'){
            loadModule('TopoGraph');
        } else if ( hashes[1] == 'Report'){
            loadModule('Report');
        }
        return ;
    };

    // 事件注册
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
}));



// 前后端分离配置
(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (window is window)
        window.returnExports = factory();
    };
}(window, function () {
    window.confirmUrl = function(actionUrl){
        return window.UrlConfig == 'frontEnd' ?'/data' + actionUrl + '.json' : actionUrl;  
    };
}));