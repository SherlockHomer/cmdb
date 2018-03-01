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
    var setting = {
        tags:[],
        // 默认资源是1=》服务器
        type:1,
        hashes:undefined
    }
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
        render('ITSource-sourceTable-template');
        $('#ITSource-sourceTable').bootstrapTable({
            method:'post',
            url:ConfirmUrl('ITSource/infoAll'),
            checkbox:true,
            pagination:true,
            sortOrder: "ID asc",
            sortable:true,
            striped:true,
            pageNumber:1,
            pageSize:20,
            pageList:[20,50,100],
            sidePagination:'server',
            queryParams:queryParams,
            columns:[{
                checkbox:true,
                sortable:true,
                title:''
            },{
                title:'服务器名',
                field:'serverName',
                sortable:true
            },{
                title:'IP地址',
                field:'ip',
                sortable:true
            },{
                title:'OS类型',
                field:'OSType',
                sortable:true
            },{
                title:'OS版本',
                field:'OSVer',
                sortable:true
            },{
                title:'服务器厂商',
                field:'serFac',
                sortable:true
            },{
                title:'标签',
                field:'tag',
                sortable:true
            },{
                title:'修改',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua detail operator" role="button" data-id="'+row.id+'">详情</span>'+'<span class="form-control-static text-aqua setTag operator" role="button" data-id="'+row.id+'">设置标签</span>'
                }
            }]
            // filterControl:true
        });
    }
    
    // 对外统一接口，在cmdb.js中调用
    function renderModule( hashes ) {
        setting.hashes = hashes;
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
    function checkAll(){
        $('#ITSource-sourceTable').bootstrapTable('checkAll')
    };
    function uncheckAll(){
        $('#ITSource-sourceTable').bootstrapTable('uncheckAll');
    }
    function invertCheck(){
        $('#ITSource-sourceTable').bootstrapTable('checkInvert')
    };
    function filterText(text){
        text = text.toLowerCase();
        $('#ITSource-sourceTable tbody tr').each(function(){
            var has = false;
            $(this).find('td').each(function(){
                if ( $(this).text().toLowerCase().indexOf(text) != -1){
                    has = true;
                    return false;
                }
            });
            if ( !has ) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    }
    function queryParams(params){
        params.searchText = $('#ITSource-sourceTable-toolbar .searchInput').text();
        params.tags = setting.tags;
        params.type = setting.type;
        return params;
    }
    function search(){
        $('#ITSource-sourceTable').bootstrapTable('refresh');
    }
    function getDetail() {
        var id = $(this).attr('data-id');
        //todo: 如何通知路由要加载的是id 并且设置 面包屑
        // Route. $('#ITSource-sourceTable').bootstrapTable('getRowByUniqueId',id).serverName;
    }
    // 事件注册
    $('body').on('click','#ITSource-sourceTable-toolbar .checkAll' ,checkAll);
    $('body').on('click','#ITSource-sourceTable-toolbar .uncheckAll' ,uncheckAll);
    $('body').on('click','#ITSource-sourceTable-toolbar .invertCheck' ,invertCheck);
    $('body').on('input','#ITSource-sourceTable-toolbar .searchInput',function(){
        filterText(this.value);
    });
    $('body').on('click','#ITSource-sourceTable-toolbar .searchBtn',search);
    $('body').on('click','#ITSource-sourceTable span.detail',getDetail);

    var ITSourceTable = {};
    ITSourceTable.renderModule = renderModule;
    ITSourceTable.checkAll = checkAll ;
    ITSourceTable.uncheckAll = uncheckAll ;
    ITSourceTable.invertCheck = invertCheck ;

    return ITSourceTable;
}));