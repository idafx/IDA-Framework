/**
 * @description Open Flash Chart 2 printing support
 *              Get DOM image binary and put into img elemant. "Save image as" will be enabled.
 * @origin http://teethgrinder.co.uk/open-flash-chart-2/save-image-js.php
 * @author Open Flash Chart 2 Team
 */

// This is the part where I set up the three adapters.
// Please choose the one you need and discard others.
// I did this because I observed that in some frameworks (especially ExtJS),
// using the standard DOM modifiers breaks up the framework's inner workings.

OFC = {}

OFC.jquery = {
    name: "jQuery",
    version: function(src) {return $('#'+ src)[0].get_version()},
    rasterize: function (src, dst) {$('#'+ dst).replaceWith(Control.OFC.image(src))},
    image: function(src) {return "<img src='data:image/png;base64," + $('#'+src)[0].get_img_binary() + "' />"},
    popup: function(src) {
        alert('Popping')
        var img_win = window.open('', 'Charts: Export as Image')
        with(img_win.document) {
            write('<html><head><title>Charts: Export as Image<\/title><\/head><body>' + Control.OFC.image(src) + '<\/body><\/html>')}
     },
     save: function(src) {
         this.rasterize(src, src)
         this.popup(src)
        }
}

// Using an object as namespaces is JS Best Practice. I like the Control.XXX style.
if (typeof(Control == "undefined")) {var Control = {OFC: OFC.jquery}}

// By default, right-clicking on OFC and choosing "save image locally" calls this function.
// You are free to change the code in OFC and call my wrapper (Control.OFC.your_favorite_save_method)
function save_image(id) {alert("Print command received: "+id);Control.OFC.save(id)}
