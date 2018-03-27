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
    Constant.devices = [
    {type:'device',icon:'icon-device',text:'物理设备',image:'static/image/device/unknownDevice.png'},
    {type:'server',icon:'icon-host',text:'服务器',image:'static/image/device/host.png'},
    {type:'port',icon:'icon-port',text:'端口',image:'static/image/device/unknownDevice.png'},
    {type:'database',icon:'icon-database',text:'数据库',image:'static/image/device/database.png'},
    {type:'middleware',icon:'icon-middleware',text:'中间件',image:'static/image/device/middleware.png'},
    {type:'cloud',icon:'icon-cloud',text:'云环境',image:'static/image/device/cloud.png'},
    {type:'network',icon:'icon-networkDevice',text:'网络设备',image:'static/image/device/networkDevice.png'},
    {type:'application',icon:'icon-app',text:'应用程序',image:'static/image/device/disk.png'},

    
    {type:'storage',icon:'icon-storage',text:'存储',image:'static/image/device/storage.png'},
    {type:'visual',icon:'icon-visual',text:'虚拟资源',image:'static/image/device/unknownDevice.png'},
    {type:'platform',icon:'icon-platform',text:'平台资源',image:'static/image/device/unknownDevice.png'},
    {type:'appsys',icon:'icon-appsys',text:'业务系统',image:'static/image/device/app.png'},
    {type:'switch',icon:'icon-switch',text:'交换机',image:'static/image/device/switch.png'}
    
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
    {type:1,text:'mysql'},
    {type:2,text:'oracle'},
    {type:3,text:'db2'},
    {type:4,text:'sqlserver'},
    {type:5,text:'sybase'},
    {type:6,text:'inforMix'}
    ];
    Constant.middlewareType = [
    {type:1,text:'tomcat'},
    {type:2,text:'weblogic'},
    {type:3,text:'websphere'}
    ];
    Constant.connectProt = [
    {type:1,text:'WMI'},
    {type:2,text:'SSH'}
    ];
    Constant.osType = [
    {type:1,text:'Windows'},
    {type:2,text:'Linux'},
    {type:3,text:'Unix'},
    {type:4,text:'AIX'}
    ];
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
