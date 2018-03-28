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
    var Record = {
        tagName:[],
        // 默认资源是服务器
        code:'DC_HOST',
        // 一级资源类型，报表过来的typeCode对应哪个大分类
        levelOneType:'DC_HOST',
        resVersion:'',
        type:'',
        manufacturer:'',
        // 按统计进来时记录下
        countType:'',
        // 所属那个任务策略
        belongMission:''
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
    function renderBasic(){
        render('ITSource-sourceTable-template');
        initSourceTable('DC_HOST');
        initSourceTable('DC_DBS');
        initSourceTable('DC_MIDDSERVER');
        initSourceTable('cloud');
        initSourceTable('DC_NETWORKDEVICE');
        initSourceTable('DC_APPSYS');
    }
    function initSourceTable(code){
        $('#ITSource-'+code+'-table').bootstrapTable({
            code:code,
            method:'post',
            url:ConfirmUrl('resource/findResourceList'),
            checkbox:true,
            pagination:true,
            sortName:getTableSortName(code),
            sortOrder: "asc",
            // sortable:true,
            pageNumber:1,
            pageSize:20,
            pageList:[20,50,100],
            // 排序是后台的
            sidePagination:'server',
            queryParams:queryParams,
            uniqueId:'id',
            columns:getColumnsByTypeCode(code)
        });
    };
    function getTableSortName(code){

        switch (code){
            case 'DC_HOST' : {
                return 'osType';
                break;
            }
            case 'DC_DBS' : {
                return 'ciCode';
                break;
            }
            case 'DC_MIDDSERVER' : {
                return 'ciCode';
                break;
            }
            case 'cloud' : {
                return 'ciCode';
                break;
            }
            case 'DC_NETWORKDEVICE' : {
                return 'ciCode';
                break;
            }
            case 'DC_APPSYS' : {
                return 'resName';
                break;
            }
        }
    }
    function getColumnsByTypeCode(code) {
        switch (code){
            case 'DC_HOST' : {
                return [{
                    checkbox:true,
                },{
                    title:'服务器名',
                    field:'resName',
                    sortable:true
                },{
                    title:'IP地址',
                    field:'resIp',
                    sortable:true
                },{
                    title:'OS类型',
                    field:'osType',
                    sortable:true,
                    formatter:function(value){
                        if (!value) {return };
                        return getStatusItem('osType',value).text;
                    }
                },{
                    title:'OS版本',
                    field:'resVersion',
                    sortable:true
                },{
                    title:'服务器厂商',
                    field:'manufacturer',
                    sortable:true
                },{
                    title:'标签',
                    field:'tagName',
                    sortable:true
                },{
                    title:'操作',
                    formatter:function(value, row, index, field){
                        return '<span class="form-control-static text-aqua detail operator" role="button" data-id="'+row.id+'">详情</span>'+'<span class="form-control-static text-aqua setTag operator" role="button" data-id="'+row.id+'">设置标签</span>'
                    }
                }]
                break;
            }
            case 'DC_DBS' : {
                return [{
                    checkbox:true,
                },{
                    title:'数据库类型',
                    field:'ciCode',
                    sortable:true,
                    formatter:function(value){
                        if (!value) {return};
                        if (value.indexOf('DC_') > -1) {
                            return value.substr(3);
                        } else {
                            return value;
                        }
                    }
                },{
                    title:'数据库名',
                    field:'resName',
                    sortable:true
                },{
                    title:'版本',
                    field:'resVersion',
                    sortable:true
                },{
                    title:'IP地址',
                    field:'resIp',
                    sortable:true
                },{
                    title:'标签',
                    field:'tagName',
                    sortable:true
                },{
                    title:'操作',
                    formatter:function(value, row, index, field){
                        return '<span class="form-control-static text-aqua detail operator" role="button" data-id="'+row.id+'">详情</span>'+'<span class="form-control-static text-aqua setTag operator" role="button" data-id="'+row.id+'">设置标签</span>'
                    }
                }];
                break;
            }
            case 'DC_MIDDSERVER' : {
                return [{
                    checkbox:true,
                },{
                    title:'中间件类型',
                    field:'ciCode',
                    sortable:true,
                    formatter:function(value){
                        if (!value) {return};
                        if (value.indexOf('DC_') > -1) {
                            return value.substr(3);
                        } else {
                            return value;
                        }
                    }
                },{
                    title:'中间件名',
                    field:'resName',
                    sortable:true
                },{
                    title:'版本',
                    field:'resVersion',
                    sortable:true
                },{
                    title:'IP地址',
                    field:'resIp',
                    sortable:true
                },{
                    title:'标签',
                    field:'tagName',
                    sortable:true
                },{
                    title:'操作',
                    formatter:function(value, row, index, field){
                        return '<span class="form-control-static text-aqua detail operator" role="button" data-id="'+row.id+'">详情</span>'+'<span class="form-control-static text-aqua setTag operator" role="button" data-id="'+row.id+'">设置标签</span>'
                    }
                }];
                break;
            }
            case 'cloud' : {
                return [{
                    checkbox:true,
                },{
                    title:'管理域类型',
                    field:'ciCode',
                    sortable:true,
                    formatter:function(value){
                        if (!value) {return};
                        if (value.indexOf('DC_') > -1) {
                            return value.substr(3);
                        } else {
                            return value;
                        }
                    }
                },{
                    title:'名称',
                    field:'resName',
                    sortable:true
                },{
                    title:'管理域IP地址',
                    field:'resIp',
                    sortable:true
                },{
                    title:'描述',
                    field:'resDesc',
                    sortable:true
                },{
                    title:'标签',
                    field:'tagName',
                    sortable:true
                },{
                    title:'操作',
                    formatter:function(value, row, index, field){
                        return '<span class="form-control-static text-aqua detail operator" role="button" data-id="'+row.id+'">详情</span>'+'<span class="form-control-static text-aqua setTag operator" role="button" data-id="'+row.id+'">设置标签</span>'
                    }
                }];
                break;
            }
            case 'DC_NETWORKDEVICE' : {
                return [{
                    checkbox:true,
                },{
                    title:'设备名',
                    field:'resName',
                    sortable:true
                },{
                    title:'设备类型',
                    field:'ciCode',
                    sortable:true,
                    formatter:function(value){
                        if (!value) {return};
                        if (value.indexOf('DC_') > -1) {
                            return value.substr(3);
                        } else {
                            return value;
                        }
                    }
                },{
                    title:'厂商',
                    field:'manufacturer',
                    sortable:true
                },{
                    title:'IP地址',
                    field:'resIp',
                    sortable:true
                },{
                    title:'标签',
                    field:'tagName',
                    sortable:true
                },{
                    title:'操作',
                    formatter:function(value, row, index, field){
                        return '<span class="form-control-static text-aqua detail operator" role="button" data-id="'+row.id+'">详情</span>'+'<span class="form-control-static text-aqua setTag operator" role="button" data-id="'+row.id+'">设置标签</span>'
                    }
                }];
                break;
            }
            case 'DC_APPSYS' : {
                return [{
                    checkbox:true,
                },{
                    title:'软件名称',
                    field:'resName',
                    sortable:true
                },{
                    title:'IP地址',
                    field:'resIp',
                    sortable:true
                },{
                    title:'版本',
                    field:'resVersion',
                    sortable:true
                },{
                    title:'发布者',
                    field:'issuer',
                    sortable:true
                },{
                    title:'标签',
                    field:'tagName',
                    sortable:true
                },{
                    title:'操作',
                    formatter:function(value, row, index, field){
                        return '<span class="form-control-static text-aqua detail operator" role="button" data-id="'+row.id+'">详情</span>'+'<span class="form-control-static text-aqua setTag operator" role="button" data-id="'+row.id+'">设置标签</span>'
                    }
                }]
                break;
            }
        }
    }
    // 对外统一接口，在cmdb.js中调用
    // hase 判断记录参数
    // currentModule:[1],
    // levelOneType:[2],
    // code:[3],
    // countType:[4],
    // classifyInCount:[5]
    function renderModule( hashes ) {
        Record.currentModule = hashes.currentModule;
        if (hashes.levelOneType) {
            Record.levelOneType = hashes.levelOneType ;
        }
        Record.belongMission = hashes.belongMission;

        var crumb = [];
        
        if ( Record.currentModule == 'ITSourceReport'){
            crumb.push({
                url:'#/ITSourceReport',
                text:'IT资源报表'
            });
        } else if (Record.currentModule == 'ITSource') {
            crumb.push({
                url:'#/ITSource',
                text:'IT资源信息'
            });
        }
        
        if ( hashes.currentModule == 'ITSourceReport') {
            Record.levelOneType = hashes.levelOneType;
            Record.code = hashes.code;
            Record.countType = hashes.countType;
            switch(Record.countType){
                // 厂商
                case '1':{
                    Record.manufacturer = hashes.classifyInCount;
                    break;
                }
                // os 版本
                case '2':{
                    Record.resVersion = hashes.classifyInCount;
                    break;
                }
                // 标签
                case '3':{
                    Record.tagName = [hashes.classifyInCount];
                    break;
                }
            };
            crumb.push({
                url:'#/ITSourceReport/'+ Record.levelOneType +'/' + Record.code ,
                text: window.ITSourceReport && ITSourceReport.Record.codeName || Record.code
            });
            crumb.push({
                url:'#/ITSourceReport/'+ Record.levelOneType +'/' + Record.code + '/' + Record.countType + '/'  + hashes.classifyInCount,
                text:hashes.classifyInCount
            });
            if ( hashes.detail && hashes.rowId ) {
                Record.rowId = hashes.rowId;
                crumb.push({
                    text: Record.detailName || '详情'
                });
                Router.updateBreadcrumb(crumb);
                renderDetail();
                return;
            };
        } else if ( hashes.currentModule == 'ITSource' && hashes.detail ){
            // 如果配有id才有渲染，否则还是渲染表格
            if ( hashes.rowId ) {
                Record.rowId = hashes.rowId;
                crumb.push({
                    text:Record.detailName || '详情'
                });
                Router.updateBreadcrumb(crumb);
                renderDetail();
                return;
            }

        } else if ( hashes.currentModule == 'ITSource' ){

        };
        Router.updateBreadcrumb(crumb);
        renderBasic();
        // 针对资源信息的部分内容显隐
        showOrHideSome(Record.currentModule);
    };
    function showOrHideSome(currentModule) {
        $('#ITSource-sourceTable-box .nav-tabs a').parent().removeClass('active');
        $('#ITSource-sourceTable-box .nav-tabs a[data-code="'+Record.levelOneType+'"]').tab('show');
        if (currentModule == 'ITSourceReport') {
            $('#ITSource-sourceTable-box .forNotReport').hide();
        } else if (currentModule == 'ITSource') {
            $('#ITSource-sourceTable-box .forNotReport').show();
        }
    }

    function changeTab(tab){
        // 能切换选项卡只在 < IT资源信息 >中
        Record.levelOneType = $(tab).attr('data-code');
    }
    
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
    function exportTable(){
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var sels = $('#'+tableId).bootstrapTable('getSelections');
        var ids = [];
        $.each(sels,function(i,perSel){
            ids.push(perSel.id);
        });
        // if ( !ids[0] ) {
        //     console.warn('sel some');
        //     return false;
        // }
        var params = {
            ids : ids,
            code:Record.code
        };
        ajaxExportTable(tableId,params);
    }
    function ajaxExportTable(tableId,params){
        fetchData('resource/exportTable','json',params,{
            success:function(res){
                if (res.success) {

                } else {

                }
            }
        });
    };
    function exportDetail(){
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
        var params = {
            ids : ids,
            code:Record.code
        };
        ajaxExportDetail(tableId,params);
    }
    function ajaxExportDetail(tableId,params){
        fetchData('resource/exportDetail','json',params,{
            success:function(res){
                if (res.success) {

                } else {

                }
            }
        });
    };
    function queryParams(params){
        var toolbar = $('#ITSource-'+this.code+'-table-toolbar');
        params.searchText = toolbar.find('.searchInput').val();
        // 资源分类
        if (Record.currentModule == 'ITSource') {
            params.code = this.code;
        } else {
            params.code = Record.code;
            // 统计分类
            params.manufacturer = Record.manufacturer;
            params.resVersion = Record.resVersion;
            params.tagName = Record.tagName.join(',');
        }
        params.belongMission = Record.belongMission;
        return params;
    }
    function search(){
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+tableId).bootstrapTable('refresh');
    }
    function clickDetail() {
        var id = $(this).attr('data-id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        Record.detailName = $('#'+tableId).bootstrapTable('getRowByUniqueId',id).resName;
        Router.addHash('detail/'+id);
    };
    // 点击行详情按钮后-> 渲染详情
    function renderDetail() {
        var params = {
            id: Record.rowId
        }
        fetchData('resource/getResourceDetail','json',params,{
            success:function(res){
                render('ITSource-table-detail-template',res.data);
                Record.details = res.data.details;
            },
            error:function(){

            }
        });
    }
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
        var html = Handlebars.getHTMLByCompile('ITSource-table-more-template',data);
        $(html).insertAfter($(this).parents('tr'));
    }
    function addNewServer(){
        var tabId = $(this).parents('.tab-pane').eq(0).attr('id');
        Tool.renderEditView( tabId , 'ITSource-DC_HOST-add-template');
    };
    function defMissionStrategy(){
        var params = {from:'服务器'};
        var tabId = $(this).parents('.tab-pane').eq(0).attr('id');
        Tool.renderEditView( tabId , 'Configuration-mission-editView-template',params);
        DefineMissionStrategy.render();
    };
    function setTag(){
        var tabId = $(this).parents('.tab-pane').eq(0).attr('id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var params = $('#'+tableId).bootstrapTable('getRowByUniqueId',$(this).attr('data-id') );
        var tagName = params.tagName || '' ;
        Tool.renderEditView(tabId,'ITSource-setTag-template',params);
        fetchData('resource/getAllTags','json',null,{
            success:function(res){
                Record.appData = res.data;
                disableExistTag(res.data,tagName.split(','));
                $('#ITSource-setTag-form .app').select2({
                    data:res.data,
                    dropdownParent:$('#ITSource-setTag-form .hasSelect2')
                });
            }
        });
    };
    function listenSelectSearch(){
        var val = $(this).value ;
        if ( $(this).parent().next().find('.select2-results__message')[0] && !$(this).parent().find('button')[0] ) {
            $('<button class="btn btn-default newApp" title="新增一项">新增此项</button>').appendTo($(this).parent());
        } else if ( !$(this).parent().next().find('.select2-results__message')[0]) {
            $(this).parent().find('button').remove();
        }
    };
    function disableExistTag(data,exist){
        $.each(exist,function(i,perEx){
            $.each(data,function(y,perD){
                if (perD.text == perEx) {
                    perD.disabled = 'disabled';
                }
            })
        });
    };
    function addNewApp(e){
        e.preventDefault();
        var input = $('#ITSource-setTag-form .select2-search__field');
        DefineTag.addTag($('#ITSource-setTag-form .addTag')[0],input.val());
        $(this).remove();
        $('#ITSource-setTag-form .tags select.app').select2('close');
    }
    function deleteApp(){
        // $(this).
    }
    function saveOne(btn) {
        // 所属选项卡
        var tabId = $(btn).parents('.tab-pane').eq(0).attr('id');
        var tableId = $(btn).parents('.tab-pane').eq(0).find('table.table').attr('id');
        // 当前form
        var formId = $('#'+tabId).find('.editView form').eq(0).attr('id');
        if ( formId == 'ITSource-setTag-form') {
            // 非表格类的处理
            params = DefineTag.collectPortTags(tabId);
            params.id = $('#'+tabId).find('.editView [name="id"]').val();

        } else if ( formId == 'DefineMissionStrategy-form' ){
            params = DefineMissionStrategy.collectFormInfo();
        } else {
            var arr = $('#'+formId).serializeArray();
            var params = {}
            $.each(arr,function(i,perA){
                if (params[perA.name]) {
                    params[perA.name] = params[perA.name] + ',' +  perA.value;
                } else {
                    params[perA.name] = perA.value;
                }
            });
        }
        ajaxSave(tableId,formId,params,btn);
    }
    function ajaxSave(tableId,formId,params,btn) {
        switch(formId){
            case 'ITSource-DC_HOST-add-form':{
                var url = 'resource/addResource';
                break;
            }
            case 'DefineMissionStrategy-form':{
                var url = 'discover-config/saveDiscTask';
                break;
            }
            case 'ITSource-setTag-form':{
                var url = 'resource/setTag';
                break;
            }
        }
        fetchData(url,'json',params,{
            success:function(res){
                if (res.success) {
                    $('#'+tableId).bootstrapTable('refresh');
                    Tool.backToTableView(btn);
                } else {

                }
            }
        })
    }
    // 事件注册
    $('body').on('click','#ITSource-sourceTable-box .toolbar .checkAll' ,checkAll);
    $('body').on('click','#ITSource-sourceTable-box .toolbar .uncheckAll' ,uncheckAll);
    $('body').on('click','#ITSource-sourceTable-box .toolbar .invertCheck' ,invertCheck);
    $('body').on('input','#ITSource-sourceTable-box .toolbar .searchInput',filterText);
    $('body').on('click','#ITSource-sourceTable-box .toolbar .searchBtn',search);
    $('body').on('click','#ITSource-sourceTable-box span.detail',clickDetail);
    $('body').on('click','#ITSource-sourceTable-box .toolbar .exportTable',exportTable);
    $('body').on('click','#ITSource-sourceTable-box .toolbar .exportDetail',exportDetail);

    $('body').on('click','#ITSource-sourceTable-DC_HOST .addNew',addNewServer);
    $('body').on('click','#ITSource-sourceTable-DC_HOST .defMissionStrategy',defMissionStrategy);
    $('body').on('click','#ITSource-sourceTable-box td .setTag',setTag);

    $('body').on('click','#ITSource-sourceTable-box .editView .btn.cancle',function(e){
        e.preventDefault();
        Tool.backToTableView(e.target);
    });
    $('body').on('click','#ITSource-sourceTable-box .backToTableView',function(e){
        e.preventDefault();
        Tool.backToTableView(e.target);
    });
    $('body').on('click','#ITSource-sourceTable-box .editView .btn.save',function(e){
        e.preventDefault();
        saveOne(e.target);
    });
    // 设置标签的问题
    $('body').on('click','#ITSource-setTag-form .tags .close',deleteApp);

    // 切换一级资源类型选项卡
    $('body').on('shown.bs.tab','#ITSource-sourceTable-box a[data-toggle="tab"]', function (e) {
        changeTab(e.target);
    });
    // 详情中内容过多点击详情
    $('body').on('click','#ITSource-table-detail .more',clickMore);

    // 插件select2 增加不存在项
    $('body').on('input','#ITSource-setTag-form .select2-search__field',listenSelectSearch);
    $('body').on('click','#ITSource-setTag-form .newApp',addNewApp);



    var ITSourceTable = {};
    ITSourceTable.renderModule = renderModule;

    return ITSourceTable;
}));