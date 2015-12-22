/**
 * Created by Administrator on 2015/12/14.
 */
/*注：只适用于x和y方向同比例缩放的情况*/
(function ($) {
    $.fn.transformInfo = function () {
        var scale = 1, rotate = 0, x = 0, y = 0;
        var matrix = this.css("-webkit-transform") ||
            this.css("-moz-transform") ||
            this.css("-ms-transform")  ||
            this.css("-o-transform")  ||
            this.css("transform");
        if(typeof matrix === 'string' && matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            x = values[4];
            y = values[5];
            rotate = Math.round(Math.atan2(b, a) * (180/Math.PI));
            var d = 10;
            scale = Math.round( Math.sqrt( a*a + b*b ) * d ) / d;
        }
        return {'translateX' : x,'translateY':y,'translate':x+','+y, 'scale' : scale, 'rotate':rotate};
    };
}(jQuery));