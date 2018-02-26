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
                    $('#index-content').html(res);
                    return;
                };
                $('body').append(res);
                // 通过参数加载模块
                window[moduleName].renderModule(params);
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



// 提取数据
// UrlConfig 是配置前端开发静态数据的
(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (window is window)
        window.fecthData = factory();
    };
}(window, function () {
    function fecthData (url,type,params,callback) {
        url = window.UrlConfig == 'frontEnd' ? 'data/' + url + '.json' : url;
        $.ajax({
            url: url,
            dataType: type,
            data:params,
            type: 'post',
            success:function(res){
                if (callback && callback.success) {
                    callback.success(res);
                }
            },
            error:function(e){
                if (callback && callback.error) {
                    callback.error();
                }
            }
        });
    };
    return fecthData;
}));

// 对handlebars封装
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
    Handlebars.renderDOMInTemp = function(dom,tempMap,data){
        var $tpl = $('#'+tempMap[dom]);
        var source = $tpl.text();
        var template = Handlebars.compile(source);
        var html = template(data);
        $('#'+dom).html(html);
    };
    Handlebars.registerHelper('statusInMission', function(status) {
        if(status == 1)
            return new Handlebars.SafeString('任务完成') ;
    });

    Handlebars.registerHelper('startTimeMat',function(startTime){
        var long = moment(startTime).fromNow();
        return new Handlebars.SafeString('<small class="label label-default"><i class="fa fa-clock-o"></i>'+long+'</small>');
    });
    Handlebars.registerHelper('deviceIcon',function(type){
        return getStatusItem('devices',type).icon;
    });
    Handlebars.registerHelper('deviceText',function(type){
        return getStatusItem('devices',type).text;
    });
}));





