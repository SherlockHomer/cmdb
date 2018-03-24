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
        // 默认是正在扫描选项卡
        tab : 'ing'
    }
    if ( window.Monitor ) { return window.Monitor};

    // 配置DOM和temp的一一对应
    var tempAndDom = {
        'Monitor-basic-template':'index-content',
        'Monitor-table-detail-template':'index-content'
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
            url:ConfirmUrl('discover-monitor/infoAll'),
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
                    if (!value) {return};
                    var discoveryTypes = value.split(',');
                    var discoveryTexts = [];
                    $.each(discoveryTypes,function(i,perT){
                        discoveryTexts.push(getStatusItem('devices',perT).text);
                    });
                    return discoveryTexts.join('，');
                }
            },{
                title:'调度计划',
                field:'schePlanId',
                sortable:true,
                formatter:function(value, row, index, field){
                    return row.scheName.join(';');
                }
            },{
                title:'开始时间',
                field:'startDate',
                sortable:true
            },{
                title:'结束时间',
                field:'endDate',
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
                    return '<div class="progress detail" data-id="'+row.id+'"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="'+row.progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+row.progress+'%">'+row.progress+'%</div></div>';
                }
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    var html = '';
                    if ( row.status == 1 ) {
                        html +=  '<span class="form-control-static text-aqua cancleScan operator" role="button" data-id="'+row.id+'">取消扫描</span>' ;
                    }
                    if ( row.status == 2 || row.status == 3) {
                        html += '<span class="form-control-static text-aqua scan operator" role="button" data-id="'+row.id+'">启动扫描</span>'
                    }
                    return html;
                }
            }]
        });
    }

    // 对外统一接口，在cmdb.js中调用
    function renderModule( hashes ) {
        if (hashes[0] == 'detail') {
            Record.rowId = hashes[1];
            renderDetail(hashes[1]);
            return;
        } else if (hashes[1] == 'detail') {
            Record.rowId = hashes[2];
            renderDetail(hashes[2]);
            return;
        } 
        renderBasic();
        Record.tab = hashes[0] || 'ing';
        $('#Monitor-basic .nav-tabs a[href="#Monitor-'+Record.tab+'"]').tab('show');
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
    function scanThis(btn,scanOrNot) {
        var rowId = $(btn).attr('data-id');
        var tableId = $(btn).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var params = { ids : [rowId].join(',') };
        ajaxScan( tableId,params ,scanOrNot);
    }
    function scanSome(btn,scanOrNot) {
        var tableId = $(btn).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var sels = $('#'+tableId).bootstrapTable('getSelections');
        var ids = [];
        $.each(sels,function(i,perSel){
            ids.push(perSel.id);
        });
        if ( !ids[0] ) {
            Tool.message('请选择至少一条');
            return false;
        }
        var params = {ids : ids.join(',')};
        ajaxScan(tableId,params,scanOrNot);
    };

    function ajaxScan(tableId,params,scanOrNot){
        var url = scanOrNot? 'discover-monitor/startTask':'discover-monitor/stopScan';
        fetchData(url,'json',params,{
            success:function(res){
                if (res.success) {
                    $('#'+tableId).bootstrapTable('refresh');
                } else {

                }
            }
        })
    }
    function cancleScanThis(){
        scanThis(this,false);
    }
    function clickDetail() {
        var id = $(this).attr('data-id');
        Route.addHash('detail/'+id);
    };
    function renderDetail(id){
        var params = {
            id: id
        }
        fetchData('discover-monitor/detail','json',params,{
            success:function(res){
                render('Monitor-table-detail-template',res.data);
                Record.details = res.data.details;
            },
            error:function(){

            }
        });
    };
    function clickMore(){
        if ( $(this).text() == '显示详情') {
            $(this).text('隐藏详情');
        } else {
            $(this).text('显示详情');
            $(this).parents('tr').next().remove();
            return;
        }
        var trIndex = $(this).parents('tr').index();
        var labelIndex = $(this).parents('.form-group').index();
        var columnsTexts = Record.details[labelIndex].value.columnsText;
        var tr = Record.details[labelIndex].value.tableData[trIndex];
        var data = {more:[]};
        for (var i = 5; i < columnsTexts.length; i++) {
            data.more.push({
                keyText:columnsTexts[i],
                value:tr[i]
            });
        };
        var html = Handlebars.getHTMLByCompile('Monitor-table-more-template',data);
        $(html).insertAfter($(this).parents('tr'));
    }
    function clickInfobox(){
        var code = $(this).attr('data-code');
        window.location = window.location.origin + window.location.pathname + '#/ITSource/'+ code + '/' + Record.rowId;
    }
    // 事件注册
    // 相同功能
    $('body').on('click','#Monitor-basic .checkAll' ,checkAll);
    $('body').on('click','#Monitor-basic .uncheckAll' ,uncheckAll);
    $('body').on('click','#Monitor-basic .invertCheck' ,invertCheck);
    $('body').on('input','#Monitor-basic .searchInput',filterText);
    $('body').on('click','#Monitor-basic .toolbar .searchBtn',search);
    $('body').on('click','#Monitor-basic td .scan',function(){
        scanThis(this,true)
    });
    $('body').on('click','#Monitor-basic .toolbar .scan',function(){
        scanSome(this,true);
    } );
    $('body').on('click','#Monitor-basic td .cancleScan',function(){
        scanThis(this,false)
    });
    $('body').on('click','#Monitor-basic .toolbar .cancleScan',function(){
        scanSome(this,false);
    });
    $('body').on('click','#Monitor-basic td .detail',clickDetail);
    // 详情中内容过多点击详情
    $('body').on('click','#Monitor-table-detail .more',clickMore);
    $('body').on('click','#Monitor-table-detail .info-box',clickInfobox);

    var Monitor = {};
    Monitor.renderModule = renderModule;

    return Monitor;
}));