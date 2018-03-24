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
            toolbarId:'Configuration-SNMP-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findSnmpList'),
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
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'协议版本',
                field:'version',
                sortable:true,
                formatter:function(value,row,index){
                    var item = getStatusItem('protVersion',value);
                    if (item) {
                        return item.text; 
                    } else {
                        return value;
                    }
                }
            },{
                title:'读团体名',
                field:'publicName',
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
            toolbarId:'Configuration-portStandard-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findPortList'),
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
                title:'标准应用',
                field:'portDesc',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true,
                formatter:function(value, row, index, field){
                    return value;
                }
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
            toolbarId:'Configuration-portCustom-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findPortList'),
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
                title:'客户化应用',
                field:'portDesc',
                sortable:true
            },{
                title:'端口',
                field:'port',
                sortable:true,
                formatter:function(value, row, index, field){
                    return value;
                }
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
            toolbarId:'Configuration-server-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findServerList'),
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
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'协议类型',
                field:'type',
                sortable:true,
                formatter:function(value, row, index, field){
                    var item = getStatusItem('connectProt',value);
                    if (item) {
                        return item.text; 
                    } else {
                        return value;
                    }
                }
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'账户',
                field:'username',
                sortable:true
            },{
                title:'字符编码',
                field:'encode',
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
            toolbarId:'Configuration-cloud-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findCloudList'),
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
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'管理域IP',
                field:'ip',
                sortable:true
            },{
                title:'账户',
                field:'username',
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
            toolbarId:'Configuration-database-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findDatabaseList'),
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
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'数据库类型',
                field:'type',
                sortable:true,
                formatter:function(value, row, index){
                    if (!value) {return};
                    return getStatusItem( 'dbType' , value).text;
                }
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
                field:'username',
                sortable:true
            },{
                title:'字符编码',
                field:'encode',
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
            toolbarId:'Configuration-middleware-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findMiddlewareList'),
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
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'中间件类型',
                field:'type',
                sortable:true,
                formatter:function(value, row, index, field){
                    if (!value) {return};
                    return getStatusItem('middlewareType',value).text;
                }
            },{
                title:'端口',
                field:'port',
                sortable:true
            },{
                title:'账户',
                field:'username',
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
            toolbarId:'Configuration-mission-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/findTaskList'),
            checkbox:true,
            pagination:true,
            sortName:'taskName',
            sortOrder: "desc",
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
                field:'taskName',
                sortable:true
            },{
                title:'发现内容',
                field:'scanType',
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
                field:'schePlanId',
                sortable:true,
                formatter:function(value, row, index, field){
                    if ( row.scheName || row.scheName.length == 0 ) {return};
                    return row.scheName.join(';');
                }
            },{
                title:'目标范围',
                field:'ipRange',
                sortable:true,
                formatter:function(value, row, index, field){
                    if (!value) {return};
                    value = eval( value );
                    return $.map(value,function(perIp){
                        return perIp.ip;
                    }).join(';</br>');
                }
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua scan operator" role="button" data-id="'+row.id+'">启动扫描</span>'+'<span class="form-control-static text-aqua edit operator" role="button" data-id="'+row.id+'">修改</span>'+'<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
                }
            }]
        });
    }
    function initAgentTable(){
        $('#Configuration-agent-table').bootstrapTable({
            toolbarId:'Configuration-agent-table-toolbar',
            method:'post',
            url:ConfirmUrl('discover-config/agentAll'),
            checkbox:true,
            pagination:true,
            sortName:'ip',
            sortOrder: "desc",
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
                title:'设备名称',
                field:'name',
                sortable:true
            },{
                title:'设备IP',
                field:'ip',
                sortable:true
            },{
                title:'操作系统',
                field:'OS',
                sortable:true
            },{
                title:'节点状态',
                field:'status',
                sortable:true
            },{
                title:'代理版本',
                field:'agentVersion',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="form-control-static text-aqua delete operator" role="button" data-id="'+row.id+'">删除</span>';
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
    function deleteThis(){
        var rowId = $(this).attr('data-id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var params = { ids : [rowId].join(',') };
        ajaxDelete( tableId,params );
    }
    function deleteSome(){
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
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
        ajaxDelete(tableId,params);
    }
    function ajaxDelete(tableId,params){
        Tool.confirm({
            title:'是否确认删除',
            confirm:function(){
                switch(tableId){
                    case 'Configuration-SNMP-table':{
                        var url = 'discover-config/delSnmp';
                        break;
                    }
                    case 'Configuration-portStandard-table':{
                        var url = 'discover-config/delPort';
                        params.portType = 1;
                        break;
                    }
                    case 'Configuration-portCustom-table':{
                        var url = 'discover-config/delPort';
                        params.portType = 2;
                        break;
                    }
                    case 'Configuration-server-table':{
                        var url = 'discover-config/delServer';
                        break;
                    }
                    case 'Configuration-cloud-table':{
                        var url = 'discover-config/delCloud';
                        break;
                    }
                    case 'Configuration-database-table':{
                        var url = 'discover-config/delDatabase';
                        break;
                    }
                    case 'Configuration-middleware-table':{
                        var url = 'discover-config/delMiddleware';
                        break;
                    }
                    case 'Configuration-mission-table':{
                        var url = 'discover-config/deleteTask';
                        break;
                    }
                    case 'Configuration-agent-table':{
                        var url = 'discover-config/delAgent';
                        break;
                    }
                }
                fetchData(url,'json',params,{
                    success:function(res){
                        if (res.success) {
                            var ids = params.ids.split(',');
                            $.each(ids,function(i,perId){
                                $('#'+tableId).bootstrapTable('removeByUniqueId',perId);
                            })
                        } else {
                            Tool.message( res.msg, 'danger');
                        }
                    }
                })
            }
        })
        
    }
    function queryParams(params){
        var toolbar = $('#'+this.toolbarId);
        params.searchText = toolbar.find('.searchInput').val();
        if (this.toolbarId == 'Configuration-portStandard-table-toolbar') {
            params.type = 1;
        } else if (this.toolbarId == 'Configuration-portCustom-table-toolbar') {
            params.type = 2;
        }
        return params;
    }
    function search(){
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+tableId).bootstrapTable('refresh');
    }
    function addNew(){
        var tabId = $(this).parents('.tab-pane').eq(0).attr('id');
        renderAddNew( tabId );
    }
    function editOne(){
        var tabId = $(this).parents('.tab-pane').eq(0).attr('id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var params = $('#'+tableId).bootstrapTable('getRowByUniqueId',$(this).attr('data-id') );
        renderAddNew( tabId , params );
    }
    function renderAddNew(tabId,params){
        $('#'+tabId).find('.tableView').addClass('hide');
        if (tabId == 'Configuration-mission') {
            if ( !params ){
                var params = {};
            };
            params.from = '发现任务策略';
        }
        var html = Handlebars.getHTMLByCompile(tabId+'-editView-template',params);
        $('#'+tabId).find('.editView').html(html);
        if ( params ) {
            $('#'+tabId).find('.editView select').each(function(i,perSel){
                $(perSel).val( $(perSel).attr('value').split(',') ).change();
            })
        };
        // 特殊标签内容处理
        if (tabId == 'Configuration-mission') {
            DefineMissionStrategy.render(params);
        }
    }
    function saveOne(e){
        e.preventDefault();
        var tabId = $(e.target).parents('.tab-pane').eq(0).attr('id');
        var tableId = $(e.target).parents('.tab-pane').eq(0).find('table.table').attr('id');
        if ( tableId == 'Configuration-portStandard-table' || tableId == 'Configuration-portCustom-table') {
            // 非表格类的处理
            params = collectPortTags(tabId);

        } else if ( tabId == 'Configuration-mission' ){
            params = DefineMissionStrategy.collectFormInfo();
        } else {
            var arr = $('#'+tabId).find('.editView form').serializeArray();
            var params = {}
            $.each(arr,function(i,perA){
                if (params[perA.name]) {
                    params[perA.name] = params[perA.name] + ',' +  perA.value;
                } else {
                    params[perA.name] = perA.value;
                }
            });
        }
        
        ajaxSave(tableId,params,e.target);
    }
    function ajaxSave(tableId,params,btn){
        switch(tableId){
            case 'Configuration-SNMP-table':{
                var url = 'discover-config/saveSnmp';
                break;
            }
            case 'Configuration-portStandard-table':{
                var url = 'discover-config/savePort';
                params.portType = 1;
                break;
            }
            case 'Configuration-portCustom-table':{
                var url = 'discover-config/savePort';
                params.portType = 2;
                break;
            }
            case 'Configuration-server-table':{
                var url = 'discover-config/saveServer';
                break;
            }
            case 'Configuration-cloud-table':{
                var url = 'discover-config/saveCloud';
                break;
            }
            case 'Configuration-database-table':{
                var url = 'discover-config/saveDatabase';
                params.dbName = $(btn).parents('form').eq(0).find('[name="dbName"]:visible').val();
                break;
            }
            case 'Configuration-middleware-table':{
                var url = 'discover-config/saveMiddleware';
                break;
            }
            case 'Configuration-mission-table':{
                var url = 'discover-config/saveDiscTask';
                break;
            }
        };
        fetchData(url,'json',params,{
            success:function(res){
                if (res.success) {
                    $('#'+tableId).bootstrapTable('refresh');
                    Tool.backToTableView(btn);
                } else {
                    Tool.message( res.msg, 'danger');
                }
            }
        })
    };

    function collectPortTags(tabId){
        var params = {};
        params.port = [];
        $('#'+tabId).find('.editView .tags .text').each(function(i,perT){
            params.port.push($(perT).text());
        });
        params.name = $('#'+tabId).find('.editView [name="portDesc"]').val();
        params.id = $('#'+tabId).find('.editView [name="id"]').val();
        return params;
    }

    // 扫描
    function scanThis() {
        var rowId = $(this).attr('data-id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var params = { ids : [rowId].join(',') };
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
            Tool.message('请选择至少一条');
            return false;
        }
        var params = {ids : ids.join(',')};
        ajaxScan(tableId,params);
    };

    function ajaxScan(tableId,params){
        fetchData('discover-monitor/startTask','json',params,{
            success:function(res){
                if (res.success) {
                    window.location = window.location.origin + window.location.pathname + '#/Monitor';
                } else {

                }
            }
        })
    }

    // 添加嵌套 tab-pane
    function setNest() {
        var tabId = $(this).parents('.tab-pane').eq(0).attr('id');
        var nestTemp = $(this).attr('data-nestTemp');
        $('#'+tabId).find('.tableView').addClass('hide');
        var html = Handlebars.getHTMLByCompile(nestTemp);
        $('#'+tabId).find('.nest').html(html);
        var nestTabId = $('#'+tabId).find('.nest .tab-pane').eq(0).attr('id');
        switch (nestTemp){
            case 'Configuration-agent-template' : {
                initAgentTable();
                initAgentSelect(nestTabId);
                break;
            }
        }
    };
    function initAgentSelect(tabId) {
        var ipSel = $('#'+tabId+' select.ip');
        ipSel.select2({
            ajax:{
                url:ConfirmUrl('discover-config/getAgents'),
                dataType: 'json'
            }
        });
    }
    function addAgent() {
        var tabId = $(this).parents('.tab-pane').eq(0).attr('id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var sel = $('#'+ tabId).find('select.ip');
        if ( !sel.val() ){
            return;
        }
        var params = {ids:[sel.val()]}
        fetchData('discover-config/addAgent','json',params,{
            success:function(res){
                if (res.success) {
                    $('#'+tableId).bootstrapTable('refresh');
                    sel.val('').trigger('change');
                } else {

                }
            }
        })
    }

    // 事件注册
    // 相同功能
    $('body').on('click','#Configuration-basic .checkAll' ,checkAll);
    $('body').on('click','#Configuration-basic .uncheckAll' ,uncheckAll);
    $('body').on('click','#Configuration-basic .invertCheck' ,invertCheck);
    $('body').on('input','#Configuration-basic .searchInput',filterText);
    $('body').on('click','#Configuration-basic .toolbar .delete',deleteSome);
    $('body').on('click','#Configuration-basic td .delete',deleteThis);
    $('body').on('click','#Configuration-basic .toolbar .searchBtn',search);
    $('body').on('click','#Configuration-basic .toolbar .addNew',addNew);
    $('body').on('click','#Configuration-basic td .edit',editOne);
    $('body').on('click','#Configuration-basic td .scan',scanThis);
    $('body').on('click','#Configuration-basic .toolbar .scan',scanSome);
    $('body').on('click','#Configuration-basic .toolbar .setNest',setNest);
    $('body').on('click','#Configuration-basic .toolbar .addAgent',addAgent);


    // 编辑表单 
    $('body').on('click','#Configuration-basic .editView .btn.save',function(e){
        saveOne(e);
    });
    $('body').on('click','#Configuration-basic .editView .btn.addTag',function(e){
        DefineTag.clickAddTag(e.target);
    });


    // 


    var Configuration = {};
    Configuration.renderModule = renderModule;

    return Configuration;
}));