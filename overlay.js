var overlay = (function(){

  return {

		init: function() {
			/* if overlay div isn't in the html, add it and append sheet div while you're at it */
			if (document.getElementById("overlay") == null){
				$("body").append("<div id='overlay'><div id='sheet' class='hidden' role='alertdialog' aria-hidden='true' aria-labelledby='aria-sheet-title'><h3 class='sheet-title' id='aria-sheet-title'></h3><div class='sheet-content'></div><div rel='js-sheet-close' class='icon--close' aria-label='Close'></div></div></div>");
			}
		},
		
		/* show overlay div and fire callback */
		show: function(callback) {
			$('#overlay').fadeIn(50, callback);		
		}

	}

})();
