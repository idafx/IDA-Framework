$(document).ready(function(){



    $("#ribbon_panel").show();
  
    $("#ribbon_tab > ul").tabs( {
        selected: null
    });

			
    $(".tabs").click(function(event) {
        $("#pages").replaceWith("<div id=\"pages\">Pages: ... </div>");
        $("#ribbon_panel").slideUp();
        $("#ribbon_panel").slideDown();

	
    });



		



    $(".subsection_link").click(function () {


        $.get("/eids3/experiment/ajax/pages", function(data){
            $("#pages").replaceWith("<div id=\"pages\">"+data+"</div>");
        });
 
    });
   
   
  



	
	
    $("#div1 a").click(function(event) {
        $("#ribbon_panel").slideToggle();
    });
	
  
	
});
  
function sub_menu( id )
{
    
     $("#pages").html('<img src="/kcomm2/assets/ribbon/preload.gif">');

    $.ajax({
        type: "GET",
        url: "/kcomm2/dataset/sub_menu/" + id ,
        success: function(data){
            $("#pages").html(data);
        }
    });
}