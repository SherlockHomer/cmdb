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
                    return '<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="修改"><i class="fa-edit"></i></span>'+'<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
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
            sortName:'ports',
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
                field:'ports',
                sortable:true,
                formatter:function(value, row, index, field){
                    return value;
                }
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="定义端口"><i class="fa-edit"></i></span>'
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
            sortName:'ports',
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
                field:'ports',
                sortable:true,
                formatter:function(value, row, index, field){
                    return value;
                }
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="修改"><i class="fa-edit"></i></span>'+'<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
                }
            }]
        });
    }
    function initServerTable(){
        $('#Configuration-DC_HOST-table').bootstrapTable({
            toolbarId:'Configuration-DC_HOST-table-toolbar',
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
                    return '<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="修改"><i class="fa-edit"></i></span>'+'<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
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
                    return '<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="修改"><i class="fa-edit"></i></span>'+'<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
                }
            }]
        });
    }
    function initDBTable(){
        $('#Configuration-DC_DBS-table').bootstrapTable({
            toolbarId:'Configuration-DC_DBS-table-toolbar',
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
                    return '<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="修改"><i class="fa-edit"></i></span>'+'<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
                }
            }]
        });
    }
    function initMidwareTable(){
        $('#Configuration-DC_MIDDSERVER-table').bootstrapTable({
            toolbarId:'Configuration-DC_MIDDSERVER-table-toolbar',
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
                    return '<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="修改"><i class="fa-edit"></i></span>'+'<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
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
                        discoveryTexts.push(getStatusItem('discoContent',perT).text);
                    });
                    return discoveryTexts.join('，');
                }
            },{
                title:'调度计划',
                field:'schePlanId',
                sortable:true,
                formatter:function(value, row, index, field){
                    if ( !row.scheName || row.scheName.length == 0 ) {return};
                    return row.scheName.join('；');
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
                    return '<span class="text-aqua scan operator" role="button" data-id="'+row.id+'" title="启动扫描"><i class="fa-play"></i></span>'+'<span class="text-aqua edit operator" role="button" data-id="'+row.id+'" title="修改"><i class="fa-edit"></i></span>'+'<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
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
                field:'os',
                sortable:true
            },{
                title:'节点状态',
                field:'status',
                sortable:true,
                align:'center',
                formatter:function(value){
                    var color = value == 1 ? 'bg-green' : 'bg-red';
                    var text = value == 1 ? '在线' : '离线';
                    return  '<div class="text-center '+color+'">'+text+'</div>';
                }
            },{
                title:'代理版本',
                field:'agentVersion',
                sortable:true
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    return '<span class="text-red delete operator" role="button" data-id="'+row.id+'" title="删除"><i class="fa-remove"></i></span>';
                }
            }]
        });
    }

    // 对外统一接口，在cmdb.js中调用
    function renderModule( hashes ) {
        Router.updateBreadcrumb([{
            url:'#/Configuration',
            text:'自动发现配置'
        }]);
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
                        params.type = 1;
                        break;
                    }
                    case 'Configuration-portCustom-table':{
                        var url = 'discover-config/delPort';
                        params.type = 2;
                        break;
                    }
                    case 'Configuration-DC_HOST-table':{
                        var url = 'discover-config/delServer';
                        break;
                    }
                    case 'Configuration-cloud-table':{
                        var url = 'discover-config/delCloud';
                        break;
                    }
                    case 'Configuration-DC_DBS-table':{
                        var url = 'discover-config/delDatabase';
                        break;
                    }
                    case 'Configuration-DC_MIDDSERVER-table':{
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
                params.scanType = ["device","port","server","cloud","database","middleware"];
            };
            params.from = '发现任务策略';
        } else if ( tabId == 'Configuration-portStandard' || tabId == 'Configuration-portCustom' ){
            if ( params ) {
                params.portArr = params.ports ? params.ports.split(',') : [];
            } 
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
        } else if (params && tabId == 'Configuration-DC_HOST' || tabId == 'Configuration-DC_DBS'  || tabId == 'Configuration-DC_HOST') {
            DefineIp.renderIpRange( $('#'+tabId+' .editView .ips') , params.ipRange );
        }
    }
    function saveOne(e){
        e.preventDefault();
        var tabId = $(e.target).parents('.tab-pane').eq(0).attr('id');
        var tableId = $(e.target).parents('.tab-pane').eq(0).find('table.table').attr('id');
        if ( tableId == 'Configuration-portStandard-table' || tableId == 'Configuration-portCustom-table') {
            // 非表格类的处理
            params = collectPortTags(tabId);

        } else {
            var arr = $('#'+tabId + ' .editView form').serializeArray();
            var params = {}
            $.each(arr,function(i,perA){
                if (params[perA.name]) {
                    params[perA.name] = params[perA.name] + ',' +  perA.value;
                } else {
                    params[perA.name] = perA.value;
                }
            });
            if ( $('#'+tabId +' .editView form .ips')[0] ) {
                var ipRange = DefineIp.collectIps( $('#'+tabId +' .editView form .ips') );
                params.ipRange = JSON.stringify( ipRange );
            }
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
                params.type = 1;
                break;
            }
            case 'Configuration-portCustom-table':{
                var url = 'discover-config/savePort';
                params.type = 2;
                break;
            }
            case 'Configuration-DC_HOST-table':{
                var url = 'discover-config/saveServer';
                break;
            }
            case 'Configuration-cloud-table':{
                var url = 'discover-config/saveCloud';
                break;
            }
            case 'Configuration-DC_DBS-table':{
                var url = 'discover-config/saveDatabase';
                params.dbName = $(btn).parents('form').eq(0).find('[name="dbName"]:visible').val();
                break;
            }
            case 'Configuration-DC_MIDDSERVER-table':{
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
        params.ports = DefineTag.collectPortTags(tabId).tags;
        params.portDesc = $('#'+tabId).find('.editView [name="portDesc"]').val();
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
                    Tool.message('启动扫描成功');
                } else {
                    Tool.message(res.msg,'warning');
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
                dataType: 'json',
                type:'post',
                data: function (params) {
                    return null;
                },
                processResults: function (data, params) {
                    return {
                        results:data.data
                    }
                }
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult:function(repo){
                if (repo.loading) {
                    return repo.text;
                }
                if (repo.status == 1){
                    var icon = 'fa-chain';
                    var color = 'text-green'
                } else {
                    var icon = 'fa-chain-broken';
                    var color = 'text-red';
                }
                var markup = '<div class="select2-result-repository__statistics">' +
                '<div class="select2-result-repository__forks">'+
                '<i class="fa '+ color +' ' + icon + '"></i> ' + repo.text + 
                '</div></div>';

                return markup;
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
        var params = {ids:[sel.val()].join(',')}
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


    // 


    var Configuration = {};
    Configuration.renderModule = renderModule;

    return Configuration;
}));