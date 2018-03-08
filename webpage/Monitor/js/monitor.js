(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.Monitor = factory(window.jQuery);
    }
}(window, function ($) {
    var Record = {

    }
    if ( window.Monitor ) { return window.Monitor};

    // 配置DOM和temp的一一对应
    var tempAndDom = {
        'Monitor-basic-template':'index-content'
    };
    function render(temp,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(temp,tempAndDom,data);
    };
    function renderBasic() {
        render('Monitor-basic-template');
        initMonitorTable('Monitor-ing-table',1);
        initMonitorTable('Monitor-done-table',2);
        initMonitorTable('Monitor-planTo-table',3);
        initMonitorTable('Monitor-all-table',4);
    }
    // 各个表的渲染
    function initMonitorTable(tableId,monitorType){
        $('#'+tableId).bootstrapTable({
            toolbarId:tableId+'-toolbar',
            monitorType:monitorType,
            method:'post',
            url:ConfirmUrl('monitor/infoAll'),
            checkbox:true,
            pagination:true,
            sortName:'port',
            sortOrder: "asc",
            // sortable:true,
            pageNumber:1,
            pageSize:20,
            pageList:[20,50,100],
            // 排序是后台的
            sidePagination:'server',
            queryParams:queryParams,
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'任务名称',
                field:'name',
                sortable:true
            },{
                title:'发现内容',
                field:'content',
                sortable:true,
                formatter:function(value, row, index, field){
                    var discoveryTypes = value.split(',');
                    var discoveryTexts = [];
                    $.each(discoveryTypes,function(i,perT){
                        discoveryTexts.push(getStatusItem('devices',perT).text);
                    });
                    return discoveryTexts.join('，');
                }
            },{
                title:'调度计划',
                field:'scheduleId',
                sortable:true,
                formatter:function(value, row, index, field){
                    return row.schedule.join(';');
                }
            },{
                title:'开始时间',
                field:'startTime',
                sortable:true
            },{
                title:'结束时间',
                field:'endTime',
                sortable:true
            },{
                title:'操作人',
                field:'operator',
                sortable:true
            },{
                title:'任务状态',
                field:'status',
                sortable:true,
                formatter:function(value, row, index, field){
                    return '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="'+row.progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+row.progress+'%">'+row.progress+'%</div></div>';
                }
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    var html = '';
                    if ( row.status == 1 ) {
                        html +=  '<span class="form-control-static text-aqua cancleScan operator" role="button" data-id="'+row.id+'">取消扫描</span>' ;
                    }
                    if ( row.status == 2 || row.status == 3) {
                        html += '<span class="form-control-static text-aqua startScan operator" role="button" data-id="'+row.id+'">启动扫描</span>'
                    }
                    return html;
                }
            }]
        });
    }

    // 对外统一接口，在cmdb.js中调用
    function renderModule( hashes ) {
        renderBasic();
    };

    function checkAll(){
        var id = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+id).bootstrapTable('checkAll')
    };
    function uncheckAll(){
        var id = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+id).bootstrapTable('uncheckAll');
    }
    function invertCheck(){
        var id = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+id).bootstrapTable('checkInvert')
    };
    function filterText(){
        var text = this.value.toLowerCase();
        var id = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+ id +' tbody tr').each(function(){
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
    };

    function queryParams(params){
        params.monitorType = this.monitorType;
        var toolbar = $('#'+this.toolbarId);
        params.searchText = toolbar.find('.searchInput').val();
        return params;
    }
    function search(){
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+tableId).bootstrapTable('refresh');
    }


    // 扫描
    function scanThis() {
        var rowId = $(this).attr('data-id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var params = { ids : [rowId] };
        ajaxScan( tableId,params );
    }
    function scanSome() {
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var sels = $('#'+tableId).bootstrapTable('getSelections');
        var ids = [];
        $.each(sels,function(i,perSel){
            ids.push(perSel.id);
        });
        if ( !ids[0] ) {
            console.warn('sel some');
            return false;
        }
        var params = {ids : ids};
        ajaxScan(tableId,params);
    };

    function ajaxScan(tableId,params){
        fetchData('monitor/startScan','json',params,{
            success:function(res){
                if (res.success) {
                    
                } else {

                }
            }
        })
    }


    // 事件注册
    // 相同功能
    $('body').on('click','#Monitor-basic .checkAll' ,checkAll);
    $('body').on('click','#Monitor-basic .uncheckAll' ,uncheckAll);
    $('body').on('click','#Monitor-basic .invertCheck' ,invertCheck);
    $('body').on('input','#Monitor-basic .searchInput',filterText);
    $('body').on('click','#Monitor-basic .toolbar .searchBtn',search);
    $('body').on('click','#Monitor-basic td .scan',scanThis);
    $('body').on('click','#Monitor-basic .toolbar .scan',scanSome);

    var Monitor = {};
    Monitor.renderModule = renderModule;

    return Monitor;
}));