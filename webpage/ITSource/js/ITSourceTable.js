(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.ITSourceTable = factory(window.jQuery);
    }
}(window, function ($) {
    
    if ( window.ITSourceTable ) { return window.ITSourceTable};

    // 配置DOM和temp的一一对应
    var tempAndDom = {
        'ITSource-sourceTable-template':'index-content'
    };
    function render(temp,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(temp,tempAndDom,data);
    };
    // 渲染统计内容的具体情况表
    // 有数据才有表，因为是模版
    function renderTable(params){
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
    
    // 对外统一接口，在cmdb.js中调用
    function renderModule( hashes ) {
        // 默认配置
        renderTable({
            "page":1,
            "rows":15,
            "searchText":hashes[3],
            "tags":[],
            "type":1
        });
        if ( hashes[1] == 'ITSourceReport') {
            // todo : 针对报表的部分内容显隐
        } else if ( hashes[1] == 'ITSource'){
            // todo : 针对资源信息的部分内容显隐
        }
    };
    // 对于一个界面多个box多个ajax友好
    function getAllView(){
        renderITSourceTable();
    };
    
    var ITSourceTable = {};
    ITSourceTable.renderModule = renderModule;
    // ITSourceTable.getAllView = getAllView ;
    return ITSourceTable;
}));