/*
	sheet plugin
		- displays a lightbox-style div
		- content taken from an inline element with id
		- triggers require class 'js-sheet-show', and data-sheet-content pointing to the inline div
		- optional data-sheet-title
		
		example:
		<button type="button" class="js-sheet-show" data-sheet-content="someInlineDiv" data-sheet-title="This will be the sheet's title text">Trigger sheet</button>
		
		the plugin can be instantiated on document ready, like this
		$(function(){
			$("#sheet").sheet()
		});
		
		or bound to an event, like this
		$("#sheet").sheet({onClose:function(){alert('closed')}})

*/

(function($){
 
    $.fn.extend({ 
         
        sheet: function(options) {

		    var defaults = {
				sheetStartPos :	"-100px",
				sheetEndPos :	"30px",
				onOpen :		function() {},
				onClose :		function() {}
		    };

		    options = $.extend({},defaults, options);

	        var init = function() {

		        overlay.init();

				$(document)
					.on("click",function(e) {

						$target = $(e.target);

						/* assuming that clicking on an overlay is equivalent to dismissing the sheet. */
						if(e.target.id == "overlay" || $target.hasClass("js-sheet-close")) {
							meth.dismissSheet();

						} else if ($target.hasClass("js-sheet-show")) {
							var markup = $("#"+$(e.target).data("sheet-content")).html(),
								title = $(e.target).data("sheet-title");

							/* pass hidden content to confirmation sheet */
							if (markup) {
								e.preventDefault();
								e.stopPropagation();
								
								if ($target.closest($("#sheet")).length > 0) {
									meth.loadSheet(markup,title);
								} else {
									meth.launchSheet(markup,title);
								}
							}
						}
					});
	        };

	        /* Run initializer */
	        init();

			var $sheet = $("#sheet"),
				sheetDiv = document.getElementById("sheet"),
				$sheetTitle = $sheet.find(".sheet-title"),
				$sheetContent = $sheet.find(".sheet-content");

			sheetDiv.style.top = options.sheetStartPos;

			var meth = {
		        launchSheet: function(html,title) {
					overlay.show(
						meth.loadSheet(html,title)
					);
		        },

		        loadSheet: function(html,title) {
					$sheet.fadeOut(10);		
					$sheetContent.html(html);
					$sheetTitle.text(title);
					$sheet.fadeIn(50, function(){
						$(this).removeClass("hidden").attr('aria-hidden','false').attr('tab-index','-1').focus();
						sheetDiv.style.top = options.sheetEndPos;	
						options.onOpen.call(this);
					});
		        },

		        dismissSheet: function() {
					$sheet.fadeOut(30, function(){
						$(this).attr("aria-hidden","true");
						sheetDiv.style.top = options.sheetStartPos;
						$sheetContent.html("");
						$("#overlay").fadeOut(200, function(){
							options.onClose.call(this);
						});
					});
		        }
		    }
	    }

    });

})(jQuery);

