;(function ( $, window, document, undefined ) {

		// create defaults
		var pluginName = "sheet",
			defaults = {
				title: "Note",
				customClass: "",
				endTopPos: "30px",
				autoplayVideo: false,
				onOpen: function() {},
				onClose: function() {}
			};

		var sheetActive = false,
			overlayHtml = "<div id='overlay'></div>",
			sheetHtml = "<div class='sheet' role='alertdialog' aria-labelledby='aria-sheet-title'><h3 class='sheet-title' id='aria-sheet-title'></h3><div class='sheet-content'></div><div class='js-sheet-close icon--close' aria-label='Close'>&times;</div></div>";

		// plugin constructor
		function Sheet ( element, options ) {
			base = this;
			base.settings = $.extend( {}, defaults, options );
			base.init();
		}

		Sheet.prototype = {

			init: function () {
				if ($("#overlay").length == 0) {
					$('body').append(overlayHtml)
				}
			},

			display: function (opts, contentSrc, title) {

				opts = $.extend( {}, defaults, opts );

				title = title || opts.title;

				var clonedHtml = $(contentSrc).clone(true);

				if (sheetActive) {
					loadSheet(opts, clonedHtml, title);
				} else {
					prepSheet(opts, clonedHtml, title);
				}

			},

			dismiss: function (opts) {
				dismissSheet(opts)
			}

		};

		function dismissSheet(opts) {

			// if dismissed via .sheet's data attr, use default opts
			opts = opts || defaults;

			$('.sheet').stop().fadeOut(200, function() {
				$('#overlay').stop().fadeOut(200, function() {
					$('.sheet').remove();
					$('#overlay').html('');
					if(typeof opts.onClose == 'function'){
						opts.onClose.call();
					}
				});
			});
			sheetActive = false;
		}

		function prepSheet(opts, html, title) {
			$('#overlay').fadeIn(50, function() {
				if(!sheetActive) {
					$(this).html(sheetHtml);
					sheetActive = true;
				}
				loadSheet(opts, html, title);
			});
		}

		function loadSheet(opts, clonedHtml, title) {

			$sh = $('.sheet');

			$sh.find(".sheet-title").html(title);

			$sh.find(".sheet-content")
				.fadeOut(50,function(){
					$(this).html(clonedHtml);
					$(this).find($('*[id]')).each(function(){$(this).attr('id',$(this).attr('id') + '-s')});

				}).fadeIn(400, function(){
					if(opts.autoplayVideo) {
						playVideo(this);
					}
				});

			$sh.attr('class','sheet ' + opts.customClass)
				.fadeIn(100)
				.css('top', opts.endTopPos);
			
			//store method to dismiss sheet using js: $('.sheet').data('dismiss')()
			$sh.data('dismiss', dismissSheet);

			if(typeof opts.onOpen == 'function'){
				opts.onOpen.call();
			}

		}

		function playVideo(context) {
			var sheetVid = context.querySelector('video');
			if(sheetVid) {
				sheetVid.controls = false;
				sheetVid.play();
			}
		}

		var instanceOpts = {};

		// bindings
		$(document).on("click",function(e) {

			$target = $(e.target);

			if ($target.hasClass("js-sheet-show")) {

				e.preventDefault();
				e.stopPropagation();

				var instance = $target.data('plugin_sheet') || {},
					sheetTitle = $target.attr('title') || $target.data('sheet-title'),
					sheetContentSrc = $target.attr('href') || $target.data('sheet-content');

				instanceOpts = $.extend( {}, defaults, instance.settings );

				base.display(instance.settings, sheetContentSrc, sheetTitle);

			}

			if(e.target.id == "overlay" || $target.hasClass("js-sheet-close")) {
				e.preventDefault();
				e.stopPropagation();

				base.dismiss(instanceOpts);
			} 

		});

		$.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" + pluginName, new Sheet( this, options ) );
				}
			});
		};

})( jQuery, window, document );