;(function($){
/**
 * jqGrid extension for manipulating columns properties
 * Piotr Roznicki roznicki@o2.pl
 * http://www.roznicki.prv.pl
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.fn.extend({
	setColumns : function(p) {
		p = $.extend({
			top : 0,
			left: 0,
			width: 200,
			height: 195,
			modal: false,
			drag: true,
			closeicon: 'ico-close.gif',
			beforeShowForm: null,
			afterShowForm: null,
			afterSubmitForm: null,
			jqModal : false,
			closeOnEscape : true,
			ShrinkToFit : false,
			jqModal : false
		}, $.jgrid.col, p ||{});
		return this.each(function(){
			var $t = this;
			if (!$t.grid ) { return; }
			var onBeforeShow = typeof p.beforeShowForm === 'function' ? true: false;
			var onAfterShow = typeof p.afterShowForm === 'function' ? true: false;
			var onAfterSubmit = typeof p.afterSubmitForm === 'function' ? true: false;			
			if(!p.imgpath) { p.imgpath= $t.p.imgpath; } // Added From Tony Tomov
			var gID = $t.p.id;
			var IDs = {themodal:'colmod'+gID,modalhead:'colhd'+gID,modalcontent:'colcnt'+gID};
			var dtbl = "ColTbl_"+gID;
			if ( $("#"+IDs.themodal).html() != null ) {
				if(onBeforeShow) { p.beforeShowForm($("#"+dtbl)); }
				viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:p.jqModal, jqM:false});
				if(onAfterShow) { p.afterShowForm($("#"+dtbl)); }
			} else {
				var tbl =$("<table id='"+dtbl+"' class='ColTable'><tbody></tbody></table>");
				for(i=0;i<this.p.colNames.length;i++){
					if(!$t.p.colModel[i].hidedlg) { // added from T. Tomov
						$(tbl).append("<tr><td ><input type='checkbox' id='col_" + this.p.colModel[i].name + "' class='cbox' value='T' " + 
						((this.p.colModel[i].hidden===false)?"checked":"") + "/>" +  "<label for='col_" + this.p.colModel[i].name + "'>" + this.p.colNames[i] + "(" + this.p.colModel[i].name + ")</label></td></tr>");
					}
				}
				var bS  ="<input id='dData' type='button' value='"+p.bSubmit+"'/>";
				var bC  ="<input id='eData' type='button' value='"+p.bCancel+"'/>";
				$(tbl).append("<tr><td class='ColButton'>"+bS+"&nbsp;"+bC+"</td></tr>");
				p.gbox = "#gbox_"+gID;
				createModal(IDs,tbl,p,"#gview_"+$t.p.id,$("#gview_"+$t.p.id)[0]);
				//if( p.drag) { DnRModal("#"+IDs.themodal,"#"+IDs.modalhead+" td.modaltext"); }
				$("#dData","#"+dtbl).click(function(e){
					for(i=0;i<$t.p.colModel.length;i++){
						if(!$t.p.colModel[i].hidedlg) { // added from T. Tomov
							if($("#col_" + $t.p.colModel[i].name).attr("checked")) {
								$($t).showCol($t.p.colModel[i].name);
								$("#col_" + $t.p.colModel[i].name).attr("defaultChecked",true); // Added from T. Tomov IE BUG
							} else {
								$($t).hideCol($t.p.colModel[i].name);
								$("#col_" + $t.p.colModel[i].name).attr("defaultChecked",""); // Added from T. Tomov IE BUG
							}
						}
					}
					if(p.ShrinkToFit===true) {
						$($t).setGridWidth($t.grid.width-0.01,true);
					}
					hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal});
					if (onAfterSubmit) { p.afterSubmitForm($("#"+dtbl)); }
					return false;
				});
				$("#eData", "#"+dtbl).click(function(e){
					hideModal("#"+IDs.themodal,{gb:"#gbox_"+gID,jqm:p.jqModal});
					return false;
				});
				$("#dData, #eData","#"+dtbl).addClass('ui-state-default ui-corner-all')
				.css({padding:".2em .5em", cursor: 'pointer'})
				.hover(
				   function(){$(this).addClass('ui-state-hover');}, 
				   function(){$(this).removeClass('ui-state-hover');}
				);				
				if(onBeforeShow) { p.beforeShowForm($("#"+dtbl)); }
				viewModal("#"+IDs.themodal,{gbox:"#gbox_"+gID,jqm:p.jqModal, jqM: true});
				if(onAfterShow) { p.afterShowForm($("#"+dtbl)); }
			}
		});
	}
});
})(jQuery);