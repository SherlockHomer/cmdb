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
    var Devices = [
    {type:1,icon:'fa-flag-o',text:'服务器'},
    {type:2,icon:'fa-flag-o',text:'数据库'},
    {type:3,icon:'fa-save',text:'中间件'},
    {type:4,icon:'fa-wrench',text:'Vmware云环境'},
    {type:5,icon:'fa-cog',text:'网络设备'},
    {type:6,icon:'fa-wifi',text:'应用程序'}
    ];
    function getStatusItem(itemsName,status,def){
        var items = [];
        switch (itemsName){
            case 'devices': {items = Devices;break;}
            default:{break;}
        }
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
