(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (window is window)
        window.returnExports = factory(window.jQuery);
    }
}(window, function ($) {
    var route = {
        // {path,html}
        path:[]
    }
    function route (path, innerHTML) {
        routes[path] = {innerHTML: innerHTML};
    }
    var stage = null;
    function router () {
        var url = location.hash.slice(1) || '/';
        // var route = routes[url];
        console.warn(location.hash);
        console.warn(url);
        return ;
        stage = stage || document.getElementById('stage');
        if (stage && route.innerHTML) {
            stage.innerHTML = route.innerHTML
        }
    };
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
    // window.Router
}));
