(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.Route = factory(window.jQuery);
    };
}(window, function ($) {
    var Router = {
        'Dashboard':{
            'moduleUrl':'webpage/Dashboard/view/dashboard.html',
        },
        'Configuration':{
            'moduleUrl':'webpage/Configuration/view/configuration.html'
        },
        'ITSourceReport':{
            'moduleUrl':'webpage/ITSourceReport/view/ITSourceReport.html'
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
        } else if ( Router[moduleName].isLoaded  ){
            window[moduleName].renderModule(params);
            return;
        }
        $.ajax({
            url: url,
            dataType: 'html',
            type: 'post',
            success:function(res){
                Router[moduleName].isLoaded = true;
                if ( moduleName == '404'){
                    Router[moduleName].innerHTML = res;
                    $('#index-content').html(res);
                    return;
                };
                $('body').append(res);
                // 通过参数加载模块
                // 交由模版去判断参数来加载对应的内容
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
        // 首页
        if ( !hashes[1] ) {
            loadModule('Dashboard' , [] );
        } else if ( hashes[1] ){
            loadModule( hashes[1] ,hashes.slice(2) );
        } 
        return ;
    };
    // 在已有上加
    function addHash(name){
        var newHash = window.location.hash.split('/');
        if( newHash[newHash.length-1] ){
            newHash.push(name);
        } else {
            newHash[newHash.length-1] = name;
        }
        window.location = window.location.origin + window.location.pathname + newHash.join('/');
    };
    // 事件注册
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
    return {
        addHash : addHash
    }
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

// 提取公用模版
(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (window is window)
        window.loadTemp = factory();
    };
}(window, function () {
    function loadTemp (url,callback) {
        $.ajax({
            url: url,
            dataType: 'html',
            type: 'post',
            success:function(res){
                $('body').append(res);
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
    return loadTemp;
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
    Handlebars.renderDOMInTemp = function(temp,tempMap,data){
        var $tpl = $('#'+temp);
        var source = $tpl.text();
        var template = Handlebars.compile(source);
        var html = template(data);
        $('#'+tempMap[temp]).html(html);
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
    Handlebars.registerHelper('countText',function(type){
        return getStatusItem('count',type).text;
    });
}));





