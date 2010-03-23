(function($){
    $.fn.button = function(options) {

        var defaults = {
            icon: true,
            icon_position: 'left',
            button: "ui-icon-circle-plus"
        };
        var options = $.extend(defaults, options);

        return this.each(function() {

            button_dom = $(this);

            button_dom
            .addClass("fg-button")
            .addClass("ui-state-default")
            .addClass("fg-button")
            
            .addClass("ui-corner-all")
            .hover(
                function(){
                    $(this).addClass("ui-state-hover");
                },
                function(){
                    $(this).removeClass("ui-state-hover");
                }
                )
           .css({"text-transform": "capitalize","font-weight":"bold"});


            

            if (options.icon)
            {
                if (options.icon_position)
                {
                    button_dom.addClass("fg-button-icon-"+ options.icon_position)
                }

                button_dom.prepend(document.createElement("span"))
                    .find("span")
                    .addClass("icon")
                    .addClass("ui-icon")
                    .addClass(options.button);
            }
            


        });
    };
})(jQuery);