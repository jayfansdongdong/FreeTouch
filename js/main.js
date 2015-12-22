/**
 * Created by Administrator on 2015/12/16.
 */


require.config({
    paths : {
        "jquery" : "lib/jquery",
        "hammerjs":"lib/hammer.min",
        "jquery.hammer":"lib/jquery.hammer",
        "transformInfo":"lib/transformInfo",
        "freetouch":"lib/freetouch"
    },
    shim:{
        'transformInfo':["jquery"],
        'freetouch':["jquery","hammerjs","jquery.hammer","transformInfo"]
    }
});
requirejs(["jquery","hammerjs","jquery.hammer","transformInfo","freetouch"],function ($){
    $('#box1').freeTouch(); // Ä¬ÈÏ£ºcan_drag:true,can_scale:true,can_rotate:true
    $('#box2').freeTouch({can_scale:false,can_rotate:false});
});
