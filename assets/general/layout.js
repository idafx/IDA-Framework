$(document).ready(function(){

    /* MAKE TABS FOR PRIMARY MENU */
    //    $(".menu")
    //    .css({"display":"block"})
    //    .tabs()
    //    .find(".secondary")
    //    .css({
    //        padding:0
    //    });
    //    $(".menu.primary").removeClass("ui-widget-content");

    $("#menu_primary")
    .addClass("ui-tabs ui-widget ui-corner-all")//.end()
    .find("ul")
    .addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all")//.end()
    .find("li")
    .addClass("ui-state-default ui-corner-all")
    .css("padding-bottom", 0) // this line is the selected tab hack
    .hover(
        function(){
            $(this).addClass("ui-state-hover");
        },
        function(){
            $(this).removeClass("ui-state-hover");
        });
    //.width("100%")

    var mnu = $(".ui-tabs .ui-tabs-nav");
    mnu.css('padding', '0.2em 0.2em 0.3em');//.width("109%")

//alert($.browser.version)
    
    if ($.browser.safari || $.browser.webkit) {
        //alert("this is webkit!")
        mnu.width("109%");
    }

    //$("body").css({background:'url("images/ui-bg_gloss-wave_55_5c9ccc_500x100.png") repeat-x scroll 50% 50% #5C9CCC'})


    /* SECONDARY MENU TOGGLE */

    $.hide_menu = function ()
    {
        $("#secondary_menu").hide("fast");
        $("#module-content").width("100%");
        $("#toggle_menu").html("<span></span>Show Menu");

        $("#toggle_menu > span")
        .addClass("icon")
        .addClass("ui-icon")
        .addClass("ui-icon-circle-triangle-s");

        $.cookie('hide_menu', true, {
            path: baseURL
        });
    };

    $.show_menu = function ()
    {
        $("#secondary_menu").show("fast");
        $("#module-content").width("78%");
        $("#toggle_menu").html("<span></span>Hide Menu");
        $("#toggle_menu > span")
        .addClass("ui-icon")
        .addClass("ui-icon")
        .addClass("ui-icon-circle-triangle-n");

        $.cookie('hide_menu', false, {
            path: baseURL,
            expires: 360
        });
    };

    $("#toggle_menu")
    .append("Hide Menu")
    .addClass("fg-button ui-widget ui-state-default fg-button-icon-left ui-corner-all")

    .hover(
        function(){
            $(this).addClass("ui-state-hover");
        },
        function(){
            $(this).removeClass("ui-state-hover");
        }
        )
    .find("span")
    .addClass("ui-icon")
    .addClass("ui-icon-circle-triangle-n"); 

    // auto toggle menu on cookies
    $.hideMe = false; // default: not hide

    if($.cookie('hide_menu')==='true')
    {
        $.hideMe = true; //iff cookie says yes
    }

    if (hideMenu==='yes') { 
        $.hideMe = true; //iff explicitly asked by url
    }

    // alert('COOKIE:'+$.cookie('hide_menu')+ 'HIDE:'+$.hideMe)

    if ( $.hideMe ) {
        $.hide_menu();
        $("#toggle_menu").toggle( function () {
            $.show_menu();
        }, function () {
            $.hide_menu();
        } );
    }
    else {
        $("#toggle_menu").toggle( function () {
            $.hide_menu();
        }, function () {
            $.show_menu();
        } );
    }    


    /* AUTO MAGIC BUTTONS */
    $("button").button({
        icon: false
    });



    $(".ui-auto-button").each(function() {
        $(this).button({
            button: $(this).attr("rel")
        });
    });


    $(".button-add").button({
        button:"ui-icon-circle-plus"
    });

    $(".button-download").button({
        button:"ui-icon-circle-arrow-s"
    });
    $(".button-edit").button({
        button:"ui-icon-wrench"
    });

    $(".button-update").button({
        button:"ui-icon-wrench"
    });

    $(".button-delete").button({
        button:"ui-icon-circle-close"
    });

    $(".button-comment").button({
        button:"ui-icon-comment"
    });

    $(".button-view").button({
        button:"ui-icon-newwin"
    });

    $(".button-search").button({
        button:"ui-icon-search"
    });

    $("#button-log-out").button({
        button:"ui-icon-arrowreturnthick-1-n"
    });



    //$(".submit-delete").button({button:"ui-icon-trash"});


    /* MAKE PORTLET*/
    $(".portlet").portlet();

    $(".portlet-content h3 >a ").addClass("ui-state-default");

    /* end ready */

    $("#print-friendly").toggle(
        function () {
            $("#secondary_menu").hide("fast");
            $("#module-content").width("100%").css('float: none !important');

            $("#head").hide("fast");

            var width = $("#datatable").width() + 50;
            $(document).width(width);

            $(this).text("Application View");

        },
        function () {
            $(document).width("100%");

            $("#secondary_menu").show("fast");
            $("#module-content").width("78%");

            $("#head").show("fast");

            $(this).text("Print Preview");
        }
        );

    if ($.browser.msie) {
        // $('button').each(function() {
        //   $(this).click(function() {
        //   alert('submitting')
        //     $(this).parent('form').get().submit()
        //})
        //})

        $('body').prepend('<div id="ie-alert" class="ui-state-highlight ui-widget" style="font-size:130%; padding:10px; display:none">You are recommended to use "W3C Compliant" web browser. e.g. <a href="http://getfirefox.com">Mozilla Firefox</a></div>');
    //  $('#ie-alert').show('slow')
    }

    $('#switcher').themeswitcher();

/* end ready */
});

