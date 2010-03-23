$(document).ready(function(){
    $(".widget_sortable").sortable({
        connectWith: ".widget_sortable",
        placeholder: "widget-placeholder",
        cursor: 'move'
    //delay: 500
    });

    $("#sort_saver")
    .button({
        button:"ui-icon-disk"
    })
    .click(function(){
        var i = 1;
        var result = '';
        $(".widget_sortable_save").each(function(){

            result += '&'+$(this).sortable('serialize', {
                key:'col_'+ i + '[]'
                });
            i++;

        });
        //console.log(result);

        var dataset = '&dataset='+$("#dataset").val();
        var user = '&user='+$("#user").val();

        $.ajax({
            type: "POST",
            url: baseURL +"widget_backend/save_sorting",
            data: result + dataset + user,
            success: function(msg){
                //alert( "New Ordering Saved: " + msg );
                 $("#widget_saved").prepend( msg );
            }
        });


    //   var result = $(".sortable").sortable( 'serialize' );
    //  console.debug($(".sortable"));
    });
/*
 // this 70% works actually - issue, need to resize current placeholders, refreash not work, new placeholder doesnt registered.
    $("#add-column")
    .button({
        button:"ui-icon-circle-plus"
    })
    .click(function(){
        $("#active_widget").append(
        '<li class="widget_sortable widget_sortable_save ui-sortable" style="display: inline-block; width: 23%; vertical-align: top;"><div style="padding: 2%; margin-bottom: 2%;" class="ui-widget ui-widget-content ui-corner-all" id="widget_0"><a >Empty</a></div></li>')
        $(".widget_sortable").sortable('refresh')
})

    $("#remove_column")
    .button({
        button:"ui-icon-circle-minus"
    })
    .click(function(){})*/

});