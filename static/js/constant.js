(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (window is window)
        window.getStatusItem = factory();
    };
}(window, function () {
    var Constant = {};
    // 每一批的第一个是大分类
    Constant.devices = [
    {type:'DC_APPSYS',icon:'icon-app',text:'应用',image:'../static/image/device/app.png'},
    {type:'DC_BusiSys',icon:'icon-disk',text:'应用系统',image:'../static/image/device/disk.png'},
    {type:'DC_APPComp',icon:'icon-disk',text:'应用组件',image:'../static/image/device/disk.png'},


    {type:'DC_PLATFORM',icon:'icon-platform',text:'平台资源',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_Cluster',icon:'icon-cluster',text:'集群',image:'../static/image/device/clus.png'},


    {type:'DC_MIDDSERVER',icon:'icon-middleware',text:'中间件',image:'../static/image/device/middleware.png'},
    {type:'DC_IIS',icon:'icon-middleware',text:'IIS',image:'../static/image/device/middleware.png'},
    {type:'DC_Jboss',icon:'icon-middleware',text:'Jboss',image:'../static/image/device/middleware.png'},
    {type:'DC_WebLogic',icon:'icon-middleware',text:'WebLogic',image:'../static/image/device/middleware.png'},
    {type:'DC_WebSphere',icon:'icon-middleware',text:'WebSphere',image:'../static/image/device/middleware.png'},
    {type:'DC_Tomcat',icon:'icon-middleware',text:'Tomcat',image:'../static/image/device/middleware.png'},
    {type:'DC_Apache',icon:'icon-middleware',text:'Apache',image:'../static/image/device/middleware.png'},
    {type:'DC_ActiveMQ',icon:'icon-middleware',text:'ActiveMQ',image:'../static/image/device/middleware.png'},
    {type:'DC_Nginx',icon:'icon-middleware',text:'Nginx',image:'../static/image/device/middleware.png'},

    
    {type:'DC_DBS',icon:'icon-database',text:'数据库',image:'../static/image/device/database.png'},
    {type:'DC_DB2',icon:'icon-database',text:'DB2',image:'../static/image/device/database.png'},
    {type:'DC_Informix',icon:'icon-database',text:'Informix',image:'../static/image/device/database.png'},
    {type:'DC_Sybase',icon:'icon-database',text:'Sybase',image:'../static/image/device/database.png'},
    {type:'DC_SQLServer',icon:'icon-database',text:'SQLServer',image:'../static/image/device/database.png'},
    {type:'DC_Oracle',icon:'icon-database',text:'Oracle',image:'../static/image/device/database.png'},
    {type:'DC_Mysql',icon:'icon-database',text:'Mysql',image:'../static/image/device/database.png'},
    {type:'DC_PostgreSQL',icon:'icon-database',text:'PostgreSQL',image:'../static/image/device/database.png'},
    {type:'DC_MongoDB',icon:'icon-database',text:'MongoDB',image:'../static/image/device/database.png'},
    {type:'DC_Redis',icon:'icon-database',text:'Redis',image:'../static/image/device/database.png'},


    {type:'DC_VIRTUALRESOURCE',icon:'icon-virtualDevice',text:'虚拟资源',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_VisualDC',icon:'icon-information',text:'虚拟数据中心',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_OpenstackSyst',icon:'icon-virtualDevice',text:'Openstack系统',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_AvailableZone',icon:'icon-virtualDevice',text:'可用域',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_ResDomain',icon:'icon-virtualDevice',text:'资源域',image:'../static/image/device/virtualDevice.png'},
    {type:'DC_VirtualManager',icon:'icon-virtualDevice',text:'虚拟化管理器',image:'../static/image/device/virtualDevice.png'},
    {type:'DC_VirtualTemplate',icon:'icon-virtualDevice',text:'虚拟机模板',image:'../static/image/device/virtualDevice.png'},
    {type:'DC_VM',icon:'icon-virtualDevice',text:'虚拟机',image:'../static/image/device/virtualDevice.png'},
    {type:'DC_Project',icon:'icon-virtualDevice',text:'项目',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_User',icon:'fa-user',text:'用户',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_ComputePlan',icon:'icon-virtualDevice',text:'计算方案',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_Image',icon:'icon-virtualDevice',text:'镜像',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_Volume',icon:'icon-virtualDevice',text:'卷',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_VirtualNetwork',icon:'icon-networkDevice',text:'虚拟网络',image:'../static/image/device/icon-networkDevice.png'},
    {type:'DC_FloatingIP',icon:'icon-virtualDevice',text:'浮动IP',image:'../static/image/device/icon-networkDevice.png'},
    {type:'DC_VLAN',icon:'icon-virtualDevice',text:'VLAN',image:'../static/image/device/icon-networkDevice.png'},
    {type:'DC_SecurtityGROUP',icon:'icon-virtualDevice',text:'安全组',image:'../static/image/device/icon-networkDevice.png'},
    {type:'DC_Docker',icon:'icon-virtualDevice',text:'容器',image:'../static/image/device/icon-networkDevice.png'},


    {type:'DC_HOST',icon:'icon-host',text:'主机',image:'../static/image/device/host.png'},
    {type:'DC_Server',icon:'icon-host',text:'服务器',image:'../static/image/device/host.png'},
    {type:'DC_Windows',icon:'fa-windows',text:'Windows',image:'../static/image/device/host.png'},
    {type:'DC_Linux',icon:'fa-linux',text:'Linux',image:'../static/image/device/host.png'},
    {type:'DC_Unix',icon:'icon-host',text:'Unix',image:'../static/image/device/host.png'},
    {type:'DC_Aix',icon:'icon-host',text:'Aix',image:'../static/image/device/host.png'},


    {type:'DC_STORAGE',icon:'icon-storage',text:'存储',image:'../static/image/device/storage.png'},
    {type:'DC_FCSAN',icon:'icon-storage',text:'SAN存储',image:'../static/image/device/storage.png'},
    {type:'DC_StorageSW',icon:'icon-storage',text:'存储光纤交换机',image:'../static/image/device/storage.png'},
    {type:'DC_NAS',icon:'icon-storage',text:'NAS存储',image:'../static/image/device/storage.png'},
    {type:'DC_ISCSI',icon:'icon-storage',text:'iSCSI存储',image:'../static/image/device/storage.png'},


    {type:'DC_NETWORKDEVICE',icon:'icon-networkDevice',text:'网络设备',image:'../static/image/device/networkDevice.png'},
    {type:'DC_Router',icon:'icon-router',text:'路由器',image:'../static/image/device/router.png'},
    {type:'DC_Switch',icon:'icon-switch',text:'交换机',image:'../static/image/device/switch.png'},
    {type:'DC_LoadBalancing',icon:'icon-loadBalance',text:'负载均衡',image:'../static/image/device/networkDevice.png'},
    {type:'DC_Firewall',icon:'icon-firewall',text:'防火墙',image:'../static/image/device/firewall.png'},
    {type:'DC_IDS',icon:'icon-networkDevice',text:'入侵检测',image:'../static/image/device/networkDevice.png'},
    {type:'DC_VPN',icon:'icon-networkDevice',text:'VPN网关',image:'../static/image/device/networkDevice.png'},


    {type:'DC_NETSERVICE',icon:'icon-port',text:'网络服务',image:'../static/image/device/storage.png'},
    {type:'DC_DNS',icon:'icon-port',text:'DNS服务',image:'../static/image/device/networkDevice.png'},
    {type:'DC_DHCP',icon:'icon-port',text:'DHCP服务',image:'../static/image/device/networkDevice.png'},
    {type:'DC_NTP',icon:'icon-port',text:'NTP服务',image:'../static/image/device/networkDevice.png'},


    // 离散未分资源
    {type:'other',icon:'icon-unknownDevice',text:'其它',image:'../static/image/device/unknownDevice.png'},
    {type:'port',icon:'icon-port',text:'端口',image:'../static/image/device/unknownDevice.png'},
    {type:'DC_CLOUD',icon:'icon-cloud',text:'云环境',image:'../static/image/device/cloud.png'},
    {type:'device',icon:'icon-device',text:'物理设备',image:'../static/image/device/unknownDevice.png'}
    
    ];
    Constant.discoContent = [    
    {type:'device',icon:'icon-device',text:'网络拓扑',image:'../static/image/device/host.png'},
    {type:'port',icon:'icon-port',text:'端口',image:'../static/image/device/port.png'},
    {type:'server',icon:'icon-host',text:'服务器',image:'../static/image/device/host.png'},
    {type:'cloud',icon:'icon-cloud',text:'云环境',image:'../static/image/device/cloud.png'},
    {type:'database',icon:'icon-database',text:'数据库',image:'../static/image/device/database.png'},
    {type:'middleware',icon:'icon-middleware',text:'中间件',image:'../static/image/device/middleware.png'},
    {type:'connection',icon:'fa-connectdevelop',text:'应用连接',image:'../static/image/device/connection.png'}
    ];
    Constant.count = [
    {type:1,text:'设备厂商'},
    {type:2,text:'版本'},
    {type:3,text:'标签'}
    ];
    Constant.protVersion = [
    {type:2,text:'v1/v2'},
    {type:3,text:'v3'}
    ];
    Constant.dbType = [
    {type:1,text:'mysql',port:'3306'},
    {type:2,text:'oracle',port:'1521'},
    {type:3,text:'db2',port:'50000'},
    {type:4,text:'sqlserver',port:'1433'},
    {type:5,text:'sybase'},
    {type:6,text:'inforMix'}
    ];
    Constant.middlewareType = [
    {type:1,text:'tomcat',port:'8080'},
    {type:2,text:'weblogic',port:'7001'},
    {type:3,text:'websphere',port:'9080'}
    ];
    Constant.connectProt = [
    {type:1,text:'WMI',port:'445'},
    {type:2,text:'SSH',port:'22'}
    ];
    Constant.osType = [
    {type:1,text:'Windows'},
    {type:2,text:'Linux'},
    {type:3,text:'Unix'},
    {type:4,text:'AIX'}
    ];
    Constant.relation = [
    {type:1,text:'连接',color:'green',hex:'#abe401'},
    {type:2,text:'虚拟化',color:'black',hex:'#000'},
    {type:3,text:'集群',color:'deepGreen',hex:'#45b97c'},
    {type:4,text:'主备',color:'blue',hex:'#7bbfea'},
    {type:5,text:'使用',color:'red',hex:'#ff5e57'},
    {type:6,text:'运行于',color:'pink',hex:'#FFA6A6'},
    {type:7,text:'依赖',color:'yellow',hex:'#f7d04a'},
    {type:8,text:'调用',color:'purple',hex:'#c3c3c3'}
    ]
    function getStatusItem(itemsName,status,def){
        var items = Constant[itemsName];
        var k = -1;
        for(var i=0; i< items.length; i++ ){
            if (items[i].type == status){
                return items[i];
            }else if (items[i].type == def){
                k = i;
            }
        }
        if (k >-1){
            return items[k];
        }else{
            return null;
        }
    };
    return getStatusItem;
}));
