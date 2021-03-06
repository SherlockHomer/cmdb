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
    if ( window.Monitor ) { return window.Monitor};
    var Record = {
        // 默认是正在扫描选项卡
        tab : 'ing',
        // 所属任务策略id
        taskId:'',
        tabParam:{
            ing:{},
            done:{},
            planTo:{},
            all:{}
        }
    }
    function clearRecord(){
        for (var i in Record.tabParam){
            Record.tabParam[i] = {};
        }
    }
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
    function renderBasic(tab) {
        render('Monitor-basic-template');
        // 还原部分现场
        $('#Monitor-basic .toolbar').each(function(i,per){
            var tabCode = $(per).attr('id').split('-')[1];
            $(per).find('.searchInput').val( Record.tabParam[tabCode].searchText );
        });
        var $tab = $('#Monitor-basic .nav-tabs a[href="#Monitor-'+tab+'"]');
        $tab.tab('show');
    };
    // 各个表的渲染
    function initMonitorTable(tableId,monitorType,tab){
        $('#'+tableId).bootstrapTable({
            toolbarId: tableId+'-toolbar',
            monitorType:monitorType,
            tab:tab,
            method:'post',
            url:ConfirmUrl('discover-monitor/infoAll'),
            checkbox:true,
            pagination:true,
            sortName:'id',
            sortOrder: "desc",
            // sortable:true,
            pageNumber: Record.tabParam[tab].pageNumber || 1,
            pageSize:Record.tabParam[tab].pageSize || 20,
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
                sortable:true,
                formatter:function(value,row){
                    if (value) {
                        return '<span class="text-aqua goToConfig" data-taskId="'+row.taskId+'" role="button" title="跳转到任务定义">'+value+'</span>';
                    }
                }
            },{
                title:'发现内容',
                field:'content',
                sortable:true,
                formatter:function(value, row, index, field){
                    if (!value) {return};
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
                field:'executeUser',
                sortable:true
            },{
                title:'发现数量',
                field:'count',
                formatter:function(value,row){
                    if (value) {
                        return '<span class="text-aqua detail" data-id="'+row.id+'" role="button">'+value+'个</span>';
                    }
                }
            },{
                title:'任务状态',
                field:'status',
                sortable:true,
                formatter:function(value, row, index, field){
                    var active = '';
                    var color = 'progress-bar-success';
                    if ( row.status == 1 ) {
                        active = 'active';
                    };
                    if ( row.isCancel == 1) {
                        color  = 'progress-bar-danger'
                    }
                    return '<div class="progress detail" data-id="'+row.id+'" role="button"><div class="progress-bar '+color+' progress-bar-striped '+active+'" role="progressbar" aria-valuenow="'+row.progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+row.progress+'%">'+row.progress+'%</div></div>';
                }
            },{
                title:'操作',
                formatter:function(value, row, index, field){
                    var html = '';
                    if ( row.status == 1 ) {
                        html +=  '<span class="text-aqua cancleScan operator" role="button" data-id="'+row.id+'" title="取消扫描"><i class="fa-stop"></i></span>' ;
                    }
                    if ( row.status == 2 || row.status == 3) {
                        html += '<span class="text-aqua scan operator" role="button" data-taskId="'+row.taskId+'" title="启动扫描"><i class="fa-play"></i></span>'
                    }
                    html += '<span class="text-aqua detail operator" role="button" data-id="'+row.id+'" title="详情信息"><i class="fa-info"></i></span>'

                    return html;
                }
            }]
        });
        if (monitorType == '1' || monitorType == '0') {
            $('#'+tableId).bootstrapTable('hideColumn','endDate');
        }
        if ( monitorType == '0') {
            $('#'+tableId).bootstrapTable('hideColumn','startDate');
        }
    }

    // 对外统一接口，在cmdb.js中调用
    function renderModule( hashes ) {
        var detailIndex = hashes.indexOf( 'detail' );
        var crumb = [{
            url:'#/Monitor/',
            text:'自动发现监控'
        }];

        if (detailIndex > -1 ) {
            crumb.push({
                text: Record.detailName|| '详情'
            });
            Router.updateBreadcrumb(crumb);
            Record.rowId = hashes[detailIndex+1];
            renderDetail(hashes[detailIndex+1]);
            return;
        }
        // 监控表格界面
        Router.updateBreadcrumb(crumb);
        var params = Router.parseParamStr(hashes[0]);
        Record.taskId = params.taskId;
        renderBasic( params.tab || Record.tab || 'ing');
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
    function updateRecord(input){
        var tab = $(input).closest('.toolbar').attr('id').split('-')[1];
        Record.tabParam[tab].searchText = $(input).val();
    };
    function filterText(input){
        var $table = $(input).parents('.tab-pane').eq(0).find('table.table').eq(0);
        var datas = $table.bootstrapTable('getData');
        $table.bootstrapTable('uncheckAll');
        var hiddens = $table.bootstrapTable('getHiddenRows');
        if (hiddens.length > 0) {
            var uniqueIds = [];
            hiddens.forEach(function(h){
                uniqueIds.push(h.id);
            });
            uniqueIds.forEach(function(u){
                $table.bootstrapTable('showRow',{uniqueId:u})
            })
        };
        var text = input.value.toLowerCase();
        var id = $table.attr('id');
        $('#'+ id +' tbody tr').each(function(i){
            var has = false;
            $(this).find('td').each(function(){
                if ( $(this).text().toLowerCase().indexOf(text) != -1){
                    has = true;
                    return false;
                }
            });
            if ( !has ) {
                $table.bootstrapTable('hideRow',{uniqueId:datas[i].id});
            } else {
                $table.bootstrapTable('showRow',{uniqueId:datas[i].id});
            }
        })
    };

    function queryParams(params){
        // 触发状态管理
        Record.tabParam[this.tab].pageNumber = params.offset/params.limit + 1;
        Record.tabParam[this.tab].pageSize = params.limit;

        params.monitorType = this.monitorType;
        var toolbar = $('#'+this.toolbarId);
        params.searchText = toolbar.find('.searchInput').val();
        params.taskId = Record.taskId;
        return params;
    }
    function search(){
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        $('#'+tableId).bootstrapTable('refresh');
    }


    // 扫描
    function scanThis(btn,scanOrNot) {
        if (scanOrNot) {
            // 启动“任务”的扫描
            var taskId = $(btn).attr('data-taskId');
            var params = { ids : [taskId].join(',') };
        } else {
            var rowId = $(btn).attr('data-id');
            var params = { ids : [rowId].join(',') };
        }
        var tableId = $(btn).parents('.tab-pane').eq(0).find('table.table').attr('id');
        ajaxScan( tableId,params ,scanOrNot);
    }
    function scanSome(btn,scanOrNot) {
        var tableId = $(btn).parents('.tab-pane').eq(0).find('table.table').attr('id');
        var sels = $('#'+tableId).bootstrapTable('getSelections');
        var ids = [];
        $.each(sels,function(i,perSel){
            if (scanOrNot) {
                ids.push(perSel.taskId);
            } else {
                ids.push(perSel.id);
            }
        });
        if ( !ids[0] ) {
            Tool.message({text:'请选择至少一条'});
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
                    if ( scanOrNot ){
                        Tool.message({text:'启动扫描成功'});
                    } else {
                        Tool.message({text:'取消扫描成功'});
                    }
                } else {
                    Tool.message({
                        text:res.msg,
                        status:'warning',
                        time:5000
                    });
                }
            }
        })
    }
    function cancleScanThis(){
        scanThis(this,false);
    }
    function clickDetail() {
        var id = $(this).attr('data-id');
        var tableId = $(this).parents('.tab-pane').eq(0).find('table.table').attr('id');
        Record.detailName = $('#'+tableId).bootstrapTable('getRowByUniqueId',id).name;
        Router.addHash('detail/'+id);
    };
    function goToConfig(){
        var taskId = $(this).attr('data-taskId');
        window.location = window.location.origin + window.location.pathname + '#/Configuration/taskId=' + taskId ;
    }
    function renderDetail(id){
        var params = {
            id: id
        }
        fetchData('discover-monitor/detail','json',params,{
            success:function(res){
                render('Monitor-table-detail-template',res.data);
                Record.details = res.data.details;
                refreshDetail();
                if (res.data.status == 1 ) {
                    Record.refreshDetail && clearInterval(Record.refreshDetail); 
                    Record.refreshDetail = setInterval(refreshDetail,5000);
                }
            },
            error:function(e){
                Tool.message({
                    text:e.statusText,
                    status:'danger',
                    time:5000
                })
                render('Monitor-table-detail-template');
            }
        });
    };
    function refreshDetail(){
        fetchData('discover-monitor/outputInfo','json',{
            taskInstId : Record.rowId,
            currDate : Record.refreshDetailTime
        },{
            success:function(res){
                if (!res.success) {return};
                if ( !$('#Monitor-table-detail:visible')[0] ){
                    clearInterval(Record.refreshDetail);
                    Record.refreshDetailTime = '';
                    return;
                }
                $.each(res.data.details,function(i,perD){
                    if ( perD.keyText == '扫描进度' ){
                        $('#Monitor-table-detail .processLabel').each(function(){
                            if ( this.innerText == '扫描进度' ){
                                $(this).next().find('.progress-bar').attr('aria-valuenow',perD.value).css('width',perD.value + '%').text(perD.value + '%');
                            }
                        });
                    };
                    if ( perD.keyText == '扫描输出') {
                        var text = $('#Monitor-table-detail .outputInfo').next().html();
                        var times = perD.value;
                        $.each(times,function(t,perT){
                            for(var i in perT){
                                Record.refreshDetailTime = i ;
                                text =  i + '：' + perT[i] +'<br/>' + text ;
                            }
                        })
                        $('#Monitor-table-detail .outputInfo').next().html(text);
                    };
                    if ( perD.keyText == '结束时间' && perD.value ){
                        $('#Monitor-table-detail .progress-bar').removeClass('active');
                        clearInterval(Record.refreshDetail);
                        Record.refreshDetailTime = '';
                        $('#Monitor-table-detail .control-label').each(function(){
                            if ( this.innerText == '结束时间' ){
                                $(this).next().text(perD.value);
                                return false;
                            }
                        });
                    } 
                });
                
            },
            error:function(e){}
        })
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
        var html = Handlebars.getHTMLByCompile('Monitor-table-more-template',data);
        $(html).insertAfter($(this).parents('tr'));
    }
    function clickInfobox(){
        var code = $(this).attr('data-code');
        window.location = window.location.origin + window.location.pathname + '#/ITSource/'+ code + '&mission=' + Record.rowId;
    };

    function changeTab(tab){
        var tabDom = $(tab).attr('href').substring(1);
        var tableId = tabDom+'-table';
        var monitorType = $(tab).attr('data-monitorType');
        Record.tab = tabDom.split('-')[1];

        if ( $('#'+tabDom).find('.bootstrap-table')[0] ){
            refreshTable(tableId);
        } else {
            initMonitorTable(tableId,monitorType,Record.tab);
        };
    };
    function refreshTable(tableId){
        $('#'+tableId).bootstrapTable('refresh');
    };
    // 循环刷新正在扫描表
    function interRefreshTable(){
        var tableId = 'Monitor-ing-table';
        if ( !$('#Monitor-basic')[0] || !$('#Monitor-ing .bootstrap-table:visible')[0] ) {return};
        var options = $('#'+tableId).bootstrapTable('getOptions');
        fetchData('discover-monitor/infoAll','json',{
            monitorType:options.monitorType,
            sort:options.sortName,
            order:options.sortOrder,
            offset: (options.pageNumber - 1) * options.pageSize,
            limit:options.pageSize,
            searchText:$('#'+ options.toolbarId).find('.searchInput').val()
        },{
            success:function(res){
                var originRows = $('#'+tableId).bootstrapTable('getData');
                var newRows = [];
                $.each(res.rows,function(i,perR){
                    newRows.push(perR.id);
                    $('#'+tableId).bootstrapTable('updateByUniqueId', {
                        id: perR.id,
                        row: perR
                    });
                });
                $.each(originRows,function(i,perO) {
                    if ( newRows.indexOf ( perO.id ) == -1 ){
                        $('#'+tableId).bootstrapTable('removeByUniqueId', perO.id);
                    }
                });
            }
        });
    }
    // 事件注册
    // 相同功能
    $('body').on('click','#Monitor-basic .checkAll' ,checkAll);
    $('body').on('click','#Monitor-basic .uncheckAll' ,uncheckAll);
    $('body').on('click','#Monitor-basic .invertCheck' ,invertCheck);
    
    var timer;
    $('body').on('input','#Monitor-basic .searchInput',function(){
        updateRecord(this);
        var _this = this;
        clearTimeout(timer); 
        timer = setTimeout(function() {
            filterText(_this);
        }, 300)
    });
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
    // 跳转到任务定义
    $('body').on('click','#Monitor-basic td .goToConfig',goToConfig);
    // 详情中内容过多点击详情
    $('body').on('click','#Monitor-table-detail .more',clickMore);
    $('body').on('click','#Monitor-table-detail .info-box',clickInfobox);

    // 切换选项卡
    $('body').on('shown.bs.tab','#Monitor-basic a[data-toggle="tab"]', function (e) {
        changeTab(e.target);
    });
    // 定时刷新
    setInterval(function(){
        interRefreshTable();
    },8000)

    var Monitor = {};
    Monitor.renderModule = renderModule;
    Monitor.clearRecord = clearRecord;

    return Monitor;
}));