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
        },
        'ITSourceTable':{
            'moduleUrl':'webpage/ITSource/view/sourceTable.html'
        },
        'Monitor':{
            'moduleUrl':'webpage/Monitor/view/monitor.html'
        },
        'ITSourceTopo':{
            'moduleUrl':'webpage/ITSourceTopo/view/ITSourceTopo.html'
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
        } else if ( hashes[1] == 'ITSourceReport' && hashes [3] && hashes [4]){
            loadModule( 'ITSourceTable' , {
                currentModule:hashes[1],
                levelOneType:hashes[2],
                typeCode:hashes[3],
                countType:hashes[4],
                classifyInCount:hashes[5],
                detail:hashes[6],
                rowId:hashes[7]
            });
        } else if ( hashes[1] == 'ITSource' ) {
            if (hashes[2] == 'detail') {
                loadModule( 'ITSourceTable' , {
                    currentModule:hashes[1],
                    detail:hashes[2],
                    rowId:hashes[3]
                });
            } else if (hashes[3] == 'detail') {
                loadModule( 'ITSourceTable' , {
                    currentModule:hashes[1],
                    levelOneType:hashes[2],
                    detail:hashes[3],
                    rowId:hashes[4]
                });
            } else if (hashes[4] == 'detail') {
                loadModule( 'ITSourceTable' , {
                    currentModule:hashes[1],
                    levelOneType:hashes[2],
                    belongMission:hashes[3],
                    detail:hashes[4],
                    rowId:hashes[5]
                });
            } else {
                loadModule( 'ITSourceTable' , {
                    currentModule:hashes[1],
                    levelOneType:hashes[2] || 'server',
                    belongMission:hashes[3]
                });
            }
            
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
        window.fetchData = factory();
    };
}(window, function () {
    window.ConfirmUrl = function(url){
        var urls = url.split('/');
        var backEndUrl = urls.join('!');
        backEndUrl = '../auto_web/' + backEndUrl + '.action';
        var frontEnd = 'data/' + url + '.json';
        return  window.UrlConfig == 'frontEnd' ?  frontEnd: backEndUrl;
    }
    function fetchData (url,type,params,callback) {
        url = ConfirmUrl(url);
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
    return fetchData;
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
    Handlebars.getHTMLByCompile = function(temp,data){
        var $tpl = $('#'+temp);
        var source = $tpl.text();
        var template = Handlebars.compile(source);
        var html = template(data);
        return html;
    };

    Handlebars.registerHelper('statusInMission', function(status) {
        if(status == 1)
            return new Handlebars.SafeString('任务完成') ;
    });

    Handlebars.registerHelper('startDateMat',function(startTime){
        var long = moment(new Date(startTime)).fromNow();
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
    // ITSource details 
    Handlebars.registerHelper('tableDetail',function(table){
        var html = '<thead><tr>';
        $.each(table.columnsText,function(i,perCol){
            if (i == 5){
                html = html + '<td>操作</td>';
                return false;
            } else {
                html = html + '<td>'+perCol+'</td>'
            }
        });
        html = html + '</tr></thead><tbody>';
        $.each(table.tableData,function(y,perRow){
            html = html + '<tr>';
            $.each(perRow,function(dIndex,perD){
                if (dIndex == 5) {
                    html = html + '<td class="more text-aqua" role="button">显示详情</td>';
                    return false;
                } else {
                    html = html + '<td>'+perD+'</td>'
                }
            });
            html = html + '</tr>';
        });
        html = html + '</tbody>'
        return new Handlebars.SafeString(html);
    });

    // ITSourceTopo
    Handlebars.registerHelper('ITSourceTopoApp',function(apps){
        var html = '';
        if (apps.length > 5){
            for (var i = 0; i < 4; i++) {
                html += '<li><a role="tab" data-toggle="tab" data-id="'+apps[i].id+'">'+apps[i].text+'</a></li>';
            };
            var more = $($('#ITSourceTopo-appMoreLi-template').html());
            for (var y = 4; y < apps.length; y++) {
                more.find('.dropdown-menu').append('<li><a role="tab" data-toggle="tab" data-id="'+apps[y].id+'">'+apps[y].text+'</a></li>');
            };
            html += more[0].outerHTML;
        } else {
            for (var i = 0; i < apps.length; i++) {
                html += '<li><a role="tab" data-toggle="tab" data-id="'+apps[i].id+'">'+apps[i].text+'</a></li>';
            }
        }
        return new Handlebars.SafeString(html);
    })
}));

// 一些常用的方法
(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (window is window)
        window.Tool = factory(window.jQuery);
    };
}(window, function ($) {
    $('body').on('change','select.changeView',changeSelected);

    function changeSelected (e) {
        var selected = e.target;
        // 适用于Bootstrap 且 固定模版
        var thoseDiv = $(selected).parents('.changeViewBox').eq(0).find('~[data-belong]');
        var length = thoseDiv.length;
        var value = $(selected).val();
        for(var i = 0; i < length; i++){
            if($(thoseDiv[i]).attr('data-belong').split('#').indexOf(value) > -1){
                $(thoseDiv[i]).removeClass("hide");
            }else{
                $(thoseDiv[i]).addClass("hide");
            }
        }
    };

    /**
     * 我将做一个可用于整个项目的嵌入editView，
     * 之前是引入tabId+'-editView-template',导致只能嵌入一个，
     * 设计大于实现
     * @param  {[type]} tempName [description]
     * @return {[type]}          [description]
     */
    function renderEditView(tabId,tempName,params){
        $('#'+tabId).find('.tableView').addClass('hide');
        var html = Handlebars.getHTMLByCompile(tempName,params);
        $('#'+tabId).find('.editView').html(html);
        // 这是对如果有select.changeView的触发显隐
        if ( params ) {
            $('#'+tabId).find('.editView select').each(function(i,perSel){
                if ( $(perSel).attr('value') ) {
                    $(perSel).val( $(perSel).attr('value').split(',') ).change();
                }
            })
        };
    };
    // 有的内容需要提醒用户是否直接回退，则可在具体的模块取消冒泡
    $('body').on('click','.backToTableView',function(e){
        e.preventDefault();
        backToTableView(e.target);
    });
    function backToTableView(dom){
        var tabId = $(dom).parents('.tab-pane').eq(0).attr('id');
        $('#'+tabId).find('.editView').html('');
        $('#'+tabId).find('.nest').html('');
        $('#'+tabId).find('.tableView').removeClass('hide');
    };

    // 加载模版 || 插件
    var TempRepo = {};
    function loadTemp(fileName,callback){
        if (TempRepo[fileName] ) {
            if (callback) {
                callback();
            }
            return;
        }
        $.ajax({
            url: fileName,
            dataType: 'html',
            type: 'post',
            success:function(res){
                $('body').append(res);
                TempRepo[fileName] = true;
                if (callback) {
                    callback()
                }
            },
            error:function(e){
                console.warn('加载模版失败')
            }
        });
    }
    return {
        changeSelected : changeSelected,
        renderEditView : renderEditView,
        backToTableView: backToTableView,
        loadTemp       : loadTemp
    }
}));




