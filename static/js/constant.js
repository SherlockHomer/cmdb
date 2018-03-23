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
    {type:'device',icon:'icon-device',text:'物理设备',url:''},
    {type:'server',icon:'icon-host',text:'服务器',url:''},
    {type:'port',icon:'icon-port',text:'端口'},
    {type:'database',icon:'icon-database',text:'数据库'},
    {type:'middleware',icon:'icon-middleware',text:'中间件'},
    {type:'cloud',icon:'icon-cloud',text:'云环境'},
    {type:'network',icon:'icon-networkDevice',text:'网络设备'},
    {type:'application',icon:'icon-app',text:'应用程序'},
    {type:'storage',icon:'icon-storage',text:'存储'},
    {type:'visual',icon:'icon-visual',text:'虚拟资源'},
    {type:'platform',icon:'icon-platform',text:'平台资源'},
    {type:'appsys',icon:'icon-appsys',text:'业务系统'}
    
    ];
    Constant.count = [
    {type:1,text:'设备厂商'},
    {type:2,text:'版本'},
    {type:3,text:'标签'}
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
