$(document).ready(function(){
    $("#dashboard_sorter")
    .button({
        button:"ui-icon-arrow-4"
    })
    .click(function(){
        $(".sortable").sortable({
            connectWith: ".sortable",
            placeholder: "portlet-placeholder",
            cursor: 'move'
        //delay: 500
        });

    });

    $("#sort_saver")
    .button({
        button:"ui-icon-disk"
    })
    .click(function(){
        var i = 1;
        var result = '';
        $(".sortable").each(function(){

            result += '&'+$(this).sortable('serialize', {
                key:'col_'+ i + '[]'
            });
            i++;
             
        });
        //console.log(result);

        $.ajax({
            type: "POST",
            url: $().baseURL () +"dashboard_request/save_sorting",
            data: result,
            success: function(msg){
                //alert( "New Ordering Saved: " + msg );
                $("#sort_saver").prepend(" New Ordering Saved "+ msg );
            }
        });


    //   var result = $(".sortable").sortable( 'serialize' );
    //  console.debug($(".sortable"));
    });


    $("#portlet_toggler")
    .button({
        button:"ui-icon-carat-2-n-s"
    })
    .click(function (){
            
        $(".portlet").each(function() {
            $(this).find(".portlet-content").toggle();
        });
    });


    //lets fix google feed!
    $("td[width=80]").each(function() {
    
            if(this.text()=='') {
               this.width(0)
            }
    })

});