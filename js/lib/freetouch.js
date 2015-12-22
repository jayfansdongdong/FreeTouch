(function($) {
    Hammer = require("hammerjs");
    var methods = {
        init:function (options) {
            return this.each(function () {
                var $this = $(this);
                $this.css({
                    'position':'absolute',
                    'top':0,
                    'left':0
                });
                var data = $this.data('freetouch'),
                    defaults = {
                        obj_top : parseInt($this.css('top')),
                        obj_left : parseInt($this.css('left')),
                        obj_rotate:0,
                        obj_scale : 1,
                        can_drag:true,
                        can_scale:true,
                        can_rotate:true
                    },
                    settings = $.extend({},defaults, options);
                if (!data) {
                    $(this).data('freetouch', settings);
                    data = $this.data('freetouch');
                }
                var myhammer = $this.hammer({
                    recognizers: [
                        [Hammer.Pan, {enable: true}],
                        [Hammer.Pinch, { enable: true }]
                    ]
                });
                if(data.can_drag){
                    myhammer.bind("pan", function(e){
                        $this.css({'left':data.obj_left+e.gesture.deltaX,'top':data.obj_top+e.gesture.deltaY});
                    }).bind("panend", function() {
                        data.obj_top = parseInt($this.css('top'));
                        data.obj_left = parseInt($this.css('left'));
                    })
                }
                if(data.can_scale || data.can_rotate ){
                    myhammer.bind("pinch", function(e) {
                        var new_scale = data.obj_scale;
                        var new_rotate = data.obj_rotate;
                        if(data.can_scale){
                            new_scale = e.gesture.scale*data.obj_scale;
                        }
                        if(data.can_rotate){
                            new_rotate = (data.obj_rotate+e.gesture.rotation) % 360;
                        }
                        $this.css({'webkitTransform':'rotate('+new_rotate+'deg) scale('+new_scale+')'});
                    }).bind("pinchend",function(e){
                        var transforminfo = $this.transformInfo();
                        data.obj_rotate = transforminfo.rotate;
                        data.obj_scale = transforminfo.scale;
                    });
                }

            });
        }
    };
    $.fn.freeTouch = function(method){
        if(methods[method]){
            return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
        }else if(typeof method == 'object' || !method){
            return methods.init.apply(this,arguments);
        }else{
            $.error('error');
        }
    }
})(jQuery);
