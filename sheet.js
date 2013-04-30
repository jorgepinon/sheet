var sheets = (function(){

	//if sheet div isn't in the html, add it
	if (document.getElementById("sheet-confirm") == null){
		var confSheet = $("body").append("<div id='sheet-confirm' class='hidden sheet' role='dialog' aria-label=''></div>");
	}

	return {
		//add hook to body for css or whatnot
		setPromptState: function() {
			$('body').addClass("state-prompt");
		},

		//remove all sheets and body state
		blurPrompt: function() {
			$("body").removeClass("state-prompt");
			$(".sheet").fadeOut().html("").attr("aria-label","");
			$("#overlay").fadeOut(200);
		},

		//show overlay div, passing callback to presumably show sheet
		initOverlay: function(callback) {
			$('#overlay').fadeIn(200, callback);		
		},

		//loads confirmation info into sheet and shows it
		showConfirmSheet: function(html) {
			var $confSheet = $("#sheet-confirm");
			this.setPromptState();
		
			this.initOverlay(
				function(){$confSheet.append(html).fadeIn(300).removeClass("hidden").attr('aria-label','Confirm your purchase').attr('tab-index','-1').focus()}
			);
		}
	
	}

})();


//add event listener to document filtered by selector 
$(document)
	.on("click","#overlay", function(e){
		//assuming here that clicking on an overlay is equivalent to blur on sheet. Reset page state.
			sheets.blurPrompt();
	})
	.on("click", ".js-btn-buy", function(e){

		var $confirmHtml = $(e.target).closest(".media").find(".confirm-data").html();

		//pass hidden confirm data to show on confirmation sheet
		if ($confirmHtml) {
			e.preventDefault();
			e.stopPropagation();
			sheets.showConfirmSheet($confirmHtml);
		}
	});
