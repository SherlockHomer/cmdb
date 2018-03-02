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
        // 默认资源是服务器
        typeCode:'server',
        OSVer:'',
        OSType:'',
        serFac:'',
        // 按统计进来时记录下
        countType:''
    }
    if ( window.ITSourceTable ) { return window.ITSourceTable};

    // 配置DOM和temp的一一对应
    var tempAndDom = {
        'ITSource-sourceTable-template':'index-content',
        'ITSource-table-detail-template':'index-content'
    };
    function render(temp,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(temp,tempAndDom,data);
    };
    // 渲染统计内容的具体情况表
    // 有数据才有表，因为是模版
    function renderTable(){
        render('ITSource-sourceTable-template');
        $('#ITSource-sourceTable').bootstrapTable({
            method:'post',
            url:ConfirmUrl('ITSource/infoAll'),
            checkbox:true,
            pagination:true,
            sortName:'OSType',
            sortOrder: "asc",
            // sortable:true,
            pageNumber:1,
            pageSize:20,
            pageList:[20,50,100],
            // 排序是后台的
            sidePagination:'server',
            queryParams:queryParams,
            columns:[{
                checkbox:true,
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
        });
    }
    
    // 对外统一接口，在cmdb.js中调用
    function renderModule( hashes ) {
        // hase 判断记录参数
        if ( hashes[1] == 'ITSourceReport') {
            // todo : 针对报表的部分内容显隐
            // todo: 这里也许要换成 typeCode
            setting.OSType = hashes[2];
            // /1/HP 
            // 按厂商统计的-> HP 名字的
            setting.countType = hashes[3];
            switch(setting.countType){
                // 厂商
                case '1':{
                    setting.serFac = hashes[4];
                    break;
                }
                // os 版本
                case '2':{
                    setting.OSVer = hashes[4];
                    break;
                }
                // 标签
                case '3':{
                    setting.tags = [hashes[4]];
                    break;
                }
            };
            // hashes[5] : rowId
            if ( hashes[5] ) {
                setting.rowId = hashes[5];
                renderDetail();
                return;
            }
        } else if ( hashes[1] == 'ITSource' ){
            // todo : 针对资源信息的部分内容显隐
        }
        renderTable();
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
        // 资源大分类
        params.typeCode = setting.typeCode;
        // 资源二级分类
        params.OSType = setting.OSType;
        params.OSVer = setting.OSVer;
        return params;
    }
    function search(){
        $('#ITSource-sourceTable').bootstrapTable('refresh');
    }
    function clickDetail() {
        var id = $(this).attr('data-id');
        Route.addHash(id);
    };
    // 点击行详情按钮后-> 渲染详情
    function renderDetail() {
        var params = {
            id: setting.rowId
        }
        fecthData('ITSource/detail','json',params,{
            success:function(res){
                render('ITSource-table-detail-template',res.data);
            },
            error:function(){

            }
        });
    }
    function clickMore(){
        var searchText = $(this).parents('.form-group').find('label').text();
        alert(searchText);
        // fecthData('')
    }
    // 事件注册
    $('body').on('click','#ITSource-sourceTable-toolbar .checkAll' ,checkAll);
    $('body').on('click','#ITSource-sourceTable-toolbar .uncheckAll' ,uncheckAll);
    $('body').on('click','#ITSource-sourceTable-toolbar .invertCheck' ,invertCheck);
    $('body').on('input','#ITSource-sourceTable-toolbar .searchInput',function(){
        filterText(this.value);
    });
    $('body').on('click','#ITSource-sourceTable-toolbar .searchBtn',search);
    $('body').on('click','#ITSource-sourceTable span.detail',clickDetail);

    // 详情中内容过多点击详情
    $('body').on('click','#ITSource-table-detail .more',clickMore);

    var ITSourceTable = {};
    ITSourceTable.renderModule = renderModule;
    ITSourceTable.checkAll = checkAll ;
    ITSourceTable.uncheckAll = uncheckAll ;
    ITSourceTable.invertCheck = invertCheck ;

    return ITSourceTable;
}));