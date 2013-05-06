var sheet = (function(){

	//if sheet div isn't in the html, add it
	if (document.getElementById("sheet") == null){
		var $sheet = $("body").append("<div id='sheet' class='hidden' role='dialog' aria-label=''><div class='sheet-content'></div><div class='js-close-sheet'>x</div></div>");
	}
	var $sheet = $("#sheet"),
		$sheetContent = $sheet.find(".sheet-content");

	return {

		//remove all sheets and body state
		dismiss: function() {
			$sheet.fadeOut(50).attr("aria-label","");
			$sheetContent.html("");
			$("#overlay").fadeOut(100);
		},

		//show overlay div, passing callback to presumably show sheet
		initOverlay: function(callback) {
			$('#overlay').fadeIn(100, callback);		
		},
		
		//loads confirmation info into sheet and shows it
		show: function(html) {
			this.initOverlay(
				function() {
					$sheetContent.append(html);
					$sheet.fadeIn(200).removeClass("hidden").attr('aria-label','Confirm your purchase').attr('tab-index','-1').focus();
				}
			);
		}
	}
})();


//add event listener to document filtered by selector 
$(document)
	.on("click","#overlay", function(e) {
		//assuming here that clicking on an overlay is equivalent to blur on sheet. Reset page state.
			sheet.dismiss();
	})
	.on("click", ".js-btn-buy", function(e) {

		var $confirmHtml = $(e.target).closest(".media").find(".confirm-data").html();

		//pass hidden confirm data to show on confirmation sheet
		if ($confirmHtml) {
			e.preventDefault();
			e.stopPropagation();
			sheet.show($confirmHtml);
		}
	});
$(".js-close-sheet").on("click",function(){sheet.dismiss()});
