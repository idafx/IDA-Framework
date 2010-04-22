/**
 * @description Open Flash Chart 2 printing support
 *              Get DOM image binary and put into img elemant. "Save image as" will be enabled.
 * @origin http://teethgrinder.co.uk/open-flash-chart-2/save-image-js.php
 * @author Open Flash Chart 2 Team
 */

jQuery.chart = function(target, json_url, options){
    var defaults = {
        swf_path: baseURL+"assets/ofc2/open-flash-chart.swf",
        width: "100%",
        height: 320
    };

    options = $.extend(defaults, options)

    if (target===null) {
        alert("Chart #tag was null")
        return
    }

    if ( typeof(swfobject) == "undefined") {
        alert("swfobject unavailable! charting skipped.")
        return
    }

    var font=$('.ui-widget').css('font-family')
    swfobject.embedSWF(
        options.swf_path,
        target,
        options.width,
        options.height,
        "9.0.0",
        "expressInstall.swf",
        {
            "data-file": $.URLEncode(json_url+'&font='+font),
            "id":target
        })

}

jQuery.OFC = {
    upload_url: function(id) {
        return '/eids2/flash_chart/save_as/chart'+id+'.png'
    },
    binary: function(src) {
        return jQuery('#'+src)[0].get_img_binary()
    },
    upload: function(id) {

        jQuery.ajax({
            type: "POST",
            url: this.upload_url(id),
            data: {
                "content": this.binary(id)
            },
            contentType: 'application/octet-stream',
            processData: false,
            dataType: "text",
            success: function() {
                $.OFC.saveAs(id)
            }
        })
    },
    saveAs: function(id) {
        window.location = '/eids2/application/tmp/chart'+id+'.png'
    },
    rasterize: function (src, dst) { 
        $('#'+ dst).replaceWith($.OFC.image(src))
        alert("Flash graphic converted to image. Right click on the chart again and choose \"Save Image As\"")
    },
    image: function(src) {
        return "<img src='data:image/png;base64," + $('#'+src)[0].get_img_binary() + "' />"
    },
    save: function(src) {
        this.rasterize(src, src)

    //this.upload(src)
    }
}

/**
* By default, right-clicking on OFC and choosing "save image locally" calls this function.
*/
function save_image(id) { 
    $.OFC.save(id)
}

$.extend({
    URLEncode:function(c){
        var o='';
        var x=0;
        c=c.toString();
        var r=/(^[a-zA-Z0-9_.]*)/;
        while(x<c.length){
            var m=r.exec(c.substr(x));
            if(m!=null && m.length>1 && m[1]!=''){
                o+=m[1];
                x+=m[1].length;
            }else{
                if(c[x]==' ')o+='+';
                else{
                    var d=c.charCodeAt(x);
                    var h=d.toString(16);
                    o+='%'+(h.length<2?'0':'')+h.toUpperCase();
                }
                x++;
            }
        }
        return o;
},
URLDecode:function(s){
    var o=s;
    var binVal,t;
    var r=/(%[^%]{2})/;
    while((m=r.exec(o))!=null && m.length>1 && m[1]!=''){
        b=parseInt(m[1].substr(1),16);
        t=String.fromCharCode(b);
        o=o.replace(m[1],t);
    }
    return o;
}
});
