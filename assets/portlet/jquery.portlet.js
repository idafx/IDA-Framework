(function($){
    $.fn.portlet = function(options) {

        var defaults = {
            button: "plus",
            minTrail: 20
        };
        var options = $.extend(defaults, options);

        return this.each(function() {

            var portlet_obj = $(this);

            portlet_obj.addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            // .addClass("ui-widget-header ui-corner-all") // not using this
            //  .addClass("ui-state-default ui-corner-all") // use accordion header instead
            .css({
                "font-size":"130%",
                "font-weight":"bold",
                "padding-left": "2.5%"
            }) // remove header, simple instead yaaarr
            .prepend('<span class="ui-icon ui-icon-plusthick icon-openclose"></span><span class="ui-icon ui-icon-zoomin"></span>')
            .end();
            //.find(".portlet-content");

            icn_toggle = portlet_obj.find(".ui-icon-plusthick").end();

            icn_toggle.click(function() {
                $(this).toggleClass("ui-icon-minusthick");
                $(this).parents(".portlet:first").find(".portlet-content").toggle("fast");
            });

            var icn_zoom = portlet_obj.find(".ui-icon-zoomin");

            icn_zoom.click(function() {

                var content = portlet_obj.find('.portlet-content')

                var $dialog = $('<div></div>')
                .append(content)
                .dialog({
                    autoOpen: false,
                    title: portlet_obj.find('.portlet-header').text(),
                    modal: true,
                    width: "90%",
                    height: $(window).height()*0.9,
                    close: function() {
                        portlet_obj.append(content)
                    }

                });

                $dialog.dialog('open');

            });


        });




    };

})(jQuery);