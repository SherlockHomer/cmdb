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
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'标准应用',
                field:'appName',
                sortable:true
            },{
                title:'端口',
                field:'ports',
                sortable:true,
                formatter:function(value, row, index, field){
                    return value.join(',');
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
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'客户化应用',
                field:'appName',
                sortable:true
            },{
                title:'端口',
                field:'ports',
                sortable:true,
                formatter:function(value, row, index, field){
                    return value.join(',');
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
            uniqueId:'id',
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
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'数据库类型',
                field:'dbType',
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
            uniqueId:'id',
            columns:[{
                checkbox:true,
            },{
                title:'策略名称',
                field:'name',
                sortable:true
            },{
                title:'中间件类型',
                field:'OSType',
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
                title:'目标范围',
                field:'ips',
                sortable:true,
                // formatter:function(value, row, index, field){
                // }
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
    function deleteThis(){
        var rowId = $(this).attr('data-id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var params = { ids : [rowId] };
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
                    $.each(params.ids,function(i,perId){
                        $('#'+tableId).bootstrapTable('removeByUniqueId',perId);
                    })
                } else {

                }
            }
        })
    }
    function queryParams(params){
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
        var html = Handlebars.getHTMLByCompile(tabId+'-editView',params);
        $('#'+tabId).find('.editView').html(html);
        if ( params ) {
            $('#'+tabId).find('.editView select').each(function(i,perSel){
                $(perSel).val( $(perSel).attr('value').split(',') ).change();
            })
        };
        // 特殊标签内容处理
        if (tabId == 'Configuration-mission') {
            $('#'+tabId+' .select2').select2({
                closeOnSelect:false
            });
            fetchData('strategy/getSchedule','json',null,{
                success:function(res){
                    if (res.success) {
                        var scheduleSel = $('#'+tabId+' .schedulePlan');
                        var val = scheduleSel.attr('value').split(',');
                        scheduleSel.select2({
                            data:res.data,
                            closeOnSelect:false
                        }).val( val ).change();
                    } 
                }
            });
            if(params.ips && params.ips.length > 1 ){
                $.each(params.ips,function(i,perIp){
                    var newOne = $( $('#Configuration-mission-editView-ip-template').html() );
                    newOne.insertBefore( $('#'+tabId+ ' .editView .ips .add') );
                    newOne.find('.targetDevice').val(perIp.type).change();
                    switch(perIp.type){
                        case '指定IP' : {
                            var values = perIp.value.split('.');
                            break;
                        }
                        case 'IP地址段' : {
                            var values = perIp.value.split('-').join('.').split('.');
                            break;
                        }
                        case 'CIDR' : {
                            var values = perIp.value.split('/').join('.').split('.');
                            break;
                        }
                    }
                    newOne.find('input:visible').each(function(y,perInput){
                        $(perInput).val(values[y]);
                    });
                });
            }
        }
    }
    function backToTableView(e){
        e.preventDefault();
        var tabId = $(e.target).parents('.tab-pane').eq(0).attr('id');
        $('#'+tabId).find('.editView').html('');
        $('#'+tabId).find('.tableView').removeClass('hide');
    }
    function saveOne(e){
        e.preventDefault();
        var tabId = $(e.target).parents('.tab-pane').eq(0).attr('id');
        var tableId = $(e.target).parents('.tab-pane').eq(0).find('table.table').attr('id');
        if ( tableId == 'Configuration-portStandard-table' || tableId == 'Configuration-portCustom-table') {
            // 非表格类的处理
            params = collectPortTags(tabId);

        } else if ( tabId == 'Configuration-mission' ){
            params = collectIPs(tabId);
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
        
        ajaxSave(tableId,params,e);
    }
    function ajaxSave(tableId,params,e){
        switch(tableId){
            case 'Configuration-SNMP-table':{
                var url = 'strategy/saveSNMP';
                break;
            }
            case 'Configuration-portStandard-table':{
                var url = 'strategy/defPort';
                params.portType = 1;
                break;
            }
            case 'Configuration-portCustom-table':{
                var url = 'strategy/defPort';
                params.portType = 2;
                break;
            }
            case 'Configuration-server-table':{
                var url = 'strategy/saveServer';
                break;
            }
            case 'Configuration-cloud-table':{
                var url = 'strategy/saveCloud';
                break;
            }
            case 'Configuration-database-table':{
                var url = 'strategy/saveDB';
                break;
            }
            case 'Configuration-middleware-table':{
                var url = 'strategy/saveMidware';
                break;
            }
            case 'Configuration-mission-table':{
                var url = 'strategy/saveMission';
                break;
            }
        }
        fetchData(url,'json',params,{
            success:function(res){
                if (res.success) {
                    $('#'+tableId).bootstrapTable('refresh');
                    backToTableView(e);
                } else {

                }
            }
        })
    };
    // 添加标签
    function addTag(e){
        var num = $(e.target).prev().val();
        if (!num) {
            return false;
        };
        var newOne = $( $('#tag-template').html() );
        newOne.find('.text').text(num);
        newOne.insertBefore( $(e.target).prev() );
    }
    function collectPortTags(tabId){
        var params = {};
        params.ports = [];
        $('#'+tabId).find('.editView .tags .text').each(function(i,perT){
            params.ports.push($(perT).text());
        });
        params.name = $('#'+tabId).find('.editView [name="appName"]').val();
        params.id = $('#'+tabId).find('.editView [name="id"]').val();
        return params;
    }
    // 添加ip
    function addIp(e){
        e.preventDefault();
        var newOne = $( $('#Configuration-mission-editView-ip-template').html() );
        newOne.insertBefore( $(e.target) );
    }
    function removeIp(e){
        e.preventDefault();
        $(e.target).parent().remove();
    }
    function collectIPs(tabId) {
        var arr = $('#'+tabId).find('.editView form').serializeArray();
        var params = {}
        $.each(arr,function(i,perA){
            if (params[perA.name]) {
                params[perA.name] = params[perA.name] + ',' +  perA.value;
            } else {
                params[perA.name] = perA.value;
            }
        });
        params.ips = [];
        $('#'+tabId+ ' .editView .ips .ip').each(function(i,perIp){
            var ip = {};
            ip.type = $(perIp).find('.targetDevice').val();
            var inputs = $(perIp).find('input:visible').map(function(){
                return $(this).val();
            }).get();
            switch(ip.type){
                case '指定IP' : {
                    ip.value = inputs.join('.');
                    break;
                }
                case 'IP地址段' : {
                    ip.value = inputs.splice(4,4).join('.') ;
                    ip.value = inputs.join('.') + '-' + ip.value;
                    break;
                }
                case 'CIDR' : {
                    var pop = inputs.pop();
                    ip.value = inputs.join('.') + '/' + pop;
                    break;
                }
            };
            params.ips.push(ip);
        });
        return params;
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
                    window.location = window.location.origin + window.location.pathname + '#/Monitor';
                } else {

                }
            }
        })
    }

    // 设置代理
    function setAgent() {

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
    $('body').on('click','#Configuration-basic .toolbar .setAgent',setAgent);



    // 编辑表单 
    $('body').on('change','#Configuration-basic .editView select.changeView',Tool.changeSelected);
    $('body').on('click','#Configuration-basic .editView .btn.cancle',function(e){
        backToTableView(e);
    });
    $('body').on('click','#Configuration-basic .editView .backToTableView',function(e){
        backToTableView(e);
    });
    $('body').on('click','#Configuration-basic .editView .btn.save',function(e){
        saveOne(e);
    });
    $('body').on('click','#Configuration-basic .editView .btn.addTag',function(e){
        addTag(e);
    });

    $('body').on('click','#Configuration-basic .editView .ips .add',function(e){
        addIp(e);
    });
    $('body').on('click','#Configuration-basic .editView .ips .remove',function(e){
        removeIp(e);
    });


    // 


    var Configuration = {};
    Configuration.renderModule = renderModule;

    return Configuration;
}));