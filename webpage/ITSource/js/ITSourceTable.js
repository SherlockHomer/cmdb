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
    // if ( window.ITSourceTable ) { return window.ITSourceTable};
    
    // var ITSourceTable = {};
    // return ITSourceTable;
}));