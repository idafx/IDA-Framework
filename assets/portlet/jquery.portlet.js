(function($){
    $.fn.portlet = function(options) {

        var defaults = {
            button: "plus",
            minTrail: 20
        };
        var options = $.extend(defaults, options);

        return this.each(function() {

            portlet_obj = $(this);

            portlet_obj.addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            // .addClass("ui-widget-header ui-corner-all") // not using this
          //  .addClass("ui-state-default ui-corner-all") // use accordion header instead
          .css({"font-size":"130%", "font-weight":"bold"}) // remove header, simple instead yaaarr
            .prepend('<span class="ui-icon ui-icon-plusthick"></span>')
            .end()
            .find(".portlet-content");

            icon_obj = portlet_obj.find(".portlet-header .ui-icon");

            icon_obj.click(function() {
                $(this).toggleClass("ui-icon-minusthick");
                $(this).parents(".portlet:first").find(".portlet-content").toggle("fast");
            });


        });




    };

})(jQuery);