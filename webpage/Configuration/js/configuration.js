(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.Configuration = factory(window.jQuery);
    }
}(window, function ($) {
    var Record = {

    }
    if ( window.Configuration ) { return window.Configuration};

    // 配置DOM和temp的一一对应
    var tempAndDom = {
        'Configuration-basic-template':'index-content'
    };
    function render(temp,data) {
        if (!data) {
            data = {};
        };
        Handlebars.renderDOMInTemp(temp,tempAndDom,data);
    };
    function renderBasic() {
        render('Configuration-basic-template');
        initSNMPTable();
        initPortStTable();
        initPortCusTable();
        initServerTable();
        initCloudTable();
        initDBTable();
        initMidwareTable();
        initMissionTable();
    }
    // 各个表的渲染
    function initSNMPTable(){
        $('#Configuration-SNMP-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/SNMPInfo'),
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
            columns:[{
                checkbox:true,
            },{
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'协议版本',
                field:'protVersion',
                sortable:true
            },{
                title:'读团体名',
                field:'RGroupName',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
                }
            }]
        });
    }
    function initPortStTable(){
        $('#Configuration-portStandard-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/portAll'),
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
            columns:[{
                checkbox:true,
            },{
                title:'标准应用',
                field:'appName',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">定义端口</span>'
                }
            }]
        });
    };
    function initPortCusTable(){
        $('#Configuration-portCustom-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/portAll'),
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
            columns:[{
                checkbox:true,
            },{
                title:'客户化应用',
                field:'appName',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
                }
            }]
        });
    }
    function initServerTable(){
        $('#Configuration-server-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/serverAll'),
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
            columns:[{
                checkbox:true,
            },{
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'协议类型',
                field:'type',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'账户',
                field:'account',
                sortable:true
            },{
                title:'字符编码',
                field:'encoding',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
                }
            }]
        });
    }
    function initCloudTable(){
        $('#Configuration-cloud-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/cloudAll'),
            checkbox:true,
            pagination:true,
            sortName:'name',
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
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'管理域IP',
                field:'address',
                sortable:true
            },{
                title:'账户',
                field:'account',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
                }
            }]
        });
    }
    function initDBTable(){
        $('#Configuration-database-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/dbAll'),
            checkbox:true,
            pagination:true,
            sortName:'port',
            sortOrder: "desc",
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
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'数据库类型',
                field:'OSType',
                sortable:true
            },{
                title:'数据库名/服务名',
                field:'dbName',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'账户',
                field:'account',
                sortable:true
            },{
                title:'字符编码',
                field:'encoding',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
                }
            }]
        });
    }
    function initMidwareTable(){
        $('#Configuration-middleware-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/midwareAll'),
            checkbox:true,
            pagination:true,
            sortName:'name',
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
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'中间件类型',
                field:'type',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'账户',
                field:'account',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
                }
            }]
        });
    }
    function initMissionTable(){
        $('#Configuration-mission-table').bootstrapTable({
            method:'post',
            url:ConfirmUrl('strategy/missionAll'),
            checkbox:true,
            pagination:true,
            sortName:'name',
            sortOrder: "desc",
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
                title:'任务名称',
                field:'name',
                sortable:true
            },{
                title:'发现内容',
                field:'content',
                sortable:true
            },{
                title:'调度计划',
                field:'scheduleId',
                sortable:true
            },{
                title:'目标范围',
                field:'ips',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua scan operator" role="button" data-id="'+row.id+'">启动扫描</span>'+'<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
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
    function deleteSome(){
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
        ajaxDelete(tableId,params);
    }
    function ajaxDelete(tableId,params){
        switch(tableId){
            case 'Configuration-SNMP-table':{
                var url = 'strategy/delSNMP';
                break;
            }
            case 'Configuration-portStandard-table':{
                var url = 'strategy/delPort';
                params.portType = 1;
                break;
            }
            case 'Configuration-portCustom-table':{
                var url = 'strategy/delPort';
                params.portType = 2;
                break;
            }
            case 'Configuration-server-table':{
                var url = 'strategy/delServer';
                break;
            }
            case 'Configuration-cloud-table':{
                var url = 'strategy/delCloud';
                break;
            }
            case 'Configuration-database-table':{
                var url = 'strategy/delDB';
                break;
            }
            case 'Configuration-middleware-table':{
                var url = 'strategy/delMidware';
                break;
            }
            case 'Configuration-mission-table':{
                var url = 'strategy/delMission';
                break;
            }
        }
        fetchData(url,'json',params,{
            success:function(res){
                if (res.success) {
                    alert(1);
                } else {

                }
            }
        })
    }
    function queryParams(params){
        return params;
    }
    function search(){
        $('#ITSource-sourceTable').bootstrapTable('refresh');
    }
    
    // 事件注册
    // 相同功能
    $('body').on('click','#Configuration-basic .checkAll' ,checkAll);
    $('body').on('click','#Configuration-basic .uncheckAll' ,uncheckAll);
    $('body').on('click','#Configuration-basic .invertCheck' ,invertCheck);
    $('body').on('input','#Configuration-basic .searchInput',filterText);
    $('body').on('click','#Configuration-basic .toolbar .delete',deleteSome);

    // todo :
    $('body').on('click','#ITSource-sourceTable-toolbar .searchBtn',search);

    // SNMP
    // $('body').on('click','#ITSource- .searchBtn',search);

    var Configuration = {};
    Configuration.renderModule = renderModule;

    return Configuration;
}));