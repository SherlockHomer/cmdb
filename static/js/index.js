// hashBS界面一些通用操作，例如退出登录，查看个人信息
(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (window is window)
        factory(window.jQuery);
    };
}(window, function ($) {
    $('body').on('click','.logout',function(){
        Tool.confirm({
            title:'退出',
            body:'是否确认退出？',
            confirm:function(){
                window.location.href="../j_spring_security_logout";
            }
        })
    })
}));