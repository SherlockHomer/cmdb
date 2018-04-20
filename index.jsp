<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>CMDB自动发现</title>
    <link rel="shortcut icon" href="../images/favicon.ico">
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Select2 -->
    <link rel="stylesheet" href="../bower_components/select2/dist/css/select2.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">

    <link rel="stylesheet" type="text/css" href="../static/icon/auto/iconfont.css">
    <link rel="stylesheet" href="static/css/hashBS.css">
    <script>
        // 前后端分离
        window.UrlConfig = 'frontEnd';
    </script>
    <!-- Google Font -->
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic"> -->
</head>
<body class="hold-transition skin-blue sidebar-mini fixed">
<div class="wrapper">

    <header class="main-header">
        <!-- Logo -->
        <a href="#" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>CM</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>CMDB</b> 自动发现</span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cubes"></i> <span class="caret"></span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a target="_blank" href="../portal"><i class="fa fa-home"></i> 混合服务自动化系统</a></li>
                            <li><a target="_blank" href="../schedule"><i class="fa fa-object-group" style="width: 12px"></i> 作业调度</a></li>
                            <li><a target="_blank" href="../inspect"><i class="glyphicon glyphicon-screenshot"></i> 巡检合规</a></li>
                            <li><a target="_blank" href="../deploy"><i class="fa fa-download"></i> 应用部署</a></li>
                            <!-- <li><a target="_blank" href="../discovery"><i class="fa fa-search"></i> 自动发现</a></li> -->
                            <li><a target="_blank" href="../system"><i class="fa fa-cogs"></i> 系统管理</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- Messages: style can be found in dropdown.less-->
                    <li class="dropdown messages-menu">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-envelope-o"></i>
                            <span class="label label-success"></span>
                        </a>
                    </li>
                    <!-- Notifications: style can be found in dropdown.less -->
                    <li class="dropdown notifications-menu">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-bell-o"></i>
                            <span class="label label-warning"></span>
                        </a>
                    </li>
                    <!-- Tasks: style can be found in dropdown.less -->
                    <li class="dropdown tasks-menu">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-flag-o"></i>
                            <span class="label label-danger"></span>
                        </a>
                    </li>
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <img src="dist/img/avatar5.png" class="user-image" alt="User Image">
                            <span class="hidden-xs index-user">管理员</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->
                            <li class="user-header">
                                <img src="dist/img/avatar5.png" class="img-circle" alt="User Image">

                                <p id="index-userInfo">
                                    管理员<br/>
                                    ServiceJet Administrator
                                </p>
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left hide">
                                    <a class="btn btn-default btn-flat">信息</a>
                                </div>
                                <div class="pull-right">
                                    <a class="btn btn-default btn-flat logout">退出</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <!-- Control Sidebar Toggle Button -->
                    <li>
                        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="dist/img/avatar5.png" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p class="index-user">管理员</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> 在线</a>
                </div>
            </div>
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu" data-widget="tree">
                <li class="active"><a href="#/Dashboard"><i class="iconfont icon-dashBoard"></i> <span>仪表盘</span></a></li>
                <li><a href="#/Configuration"><i class="iconfont icon-management"></i> <span>自动发现配置</span></a></li>
                <li><a href="#/Monitor"><i class="iconfont icon-monitor"></i> <span>自动发现监控</span></a></li>
                <li><a href="#/ITSource"><i class="iconfont icon-information"></i> <span>IT资源信息</span></a></li>
                <li><a href="#/ITSourceTopo"><i class="iconfont icon-topology"></i> <span>IT资源拓扑图</span></a></li>
                <li><a href="#/ITSourceReport"><i class="iconfont icon-report"></i> <span>IT资源报表</span></a></li>
                <li class="hide"><a href="http://localhost:8080/CMDB/sysManager.html"><i class="iconfont icon-config"></i> <span>系统管理</span></a></li>
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header" id="index-content-header">

        </section>

        <!-- Main content -->
        <section class="content" id="index-content">

        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <b>Version</b> 5.0.0
        </div>
        <strong>Copyright &copy; 2014-2018 <a href="http://www.dcits.com" title="神州数码">神州数码 </a>技术支持:服务自动化
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
        </ul>
        <div class="tab-content">
            <div class="tab-pane" id="control-sidebar-home-tab"></div>
        </div>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
         immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 3 -->
<script src="../bower_components/jquery/dist/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<script src="../bower_components/moment/min/moment.min.js"></script>
<script src="../bower_components/moment/locale/zh-cn.js"></script>

<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<script src="../bower_components/handlebars/handlebars.min.js"></script>
<!-- Select2 -->
<script src="../bower_components/select2/dist/js/select2.full.min.js"></script>
<!-- input-mask -->
<!-- InputMask -->
<script src="../bower_components/inputmask/dist/min/jquery.inputmask.bundle.min.js"></script>
<!-- form validate -->
<script src="../bower_components/bootstrap-validator/dist/validator.min.js"></script>

<script>
    $.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="hidden"], [type="submit"], [type="reset"], button, input:hidden , input.select2-search__field),input[data-mask]:visible+input.binding'
</script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="static/js/constant.js"></script>
<script src="static/js/hashBS.js"></script>
<script src="static/js/index.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>

<script type="text/x-handlebars-template" id="Modal-confim-template">
    <div class="modal fade" id="Modal-confim" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                {{#if body}}
                <div class="modal-body">
                    {{SafeString body}}
                </div>
                {{/if}}
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary confirm">确认</button>
                </div>
            </div>
        </div>
    </div>
</script>

</body>
</html>
