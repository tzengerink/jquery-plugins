/*!
 * jQuery Accordion Plugin
 *
 * Copyright 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($){

		var Accordion = function( el, opts ){
			var accordion = {},
				active,
				defaults = {
					activeClass    : "active", // Class of active element
					activateFirst  : true,     // Activate first element initialy
					animationSpeed : 200       // Animation speed in miliseconds
				},
				options = $.extend({}, defaults, opts);

			// PRIVATE
			// -------

			var activate = function( hash ){
				var sel = [".", hash.replace("#", "")].join("");
				el.children(["a[href='", hash ,"']"].join("")).addClass(options.activeClass);
				el.children(sel).slideDown(options.animationSpeed);
				el.children(["a:not([href='", hash ,"'])"].join("")).removeClass(options.activeClass);
				el.children(["div:not(", sel ,")"].join("")).slideUp(options.animationSpeed);
			};

			var init = function(){
				el.children("div").hide();
				if (options.activateFirst) {
					activate(el.children(":first-child").attr("href"));
				}
			};

			// PUBLIC
			// ------
			
			accordion.click = function( e ){
				e.preventDefault();
				activate($(this).attr("href"));
			};

			// SETUP
			// -----
			
			init();

			return accordion;
			
		};

		$.fn.accordion = function( options ){
			return this.each(function(){
				var accordion = Accordion($(this), options);
				$(this).children("a").on("click", accordion.click);
			});
		};

})(jQuery);
/*!
 * jQuery Tabs Plugin
 *
 * Copyright 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($){

		var Tabs = function( el, opts ){
			
			var tabs = {},
				active,
				defaults = {
					activeClass  : "active",      // Class name for active tab
					contentClass : "tabs-content" // Selector for the content element
				},
				options = $.extend({}, defaults, options),
				content = $([".", options.contentClass].join(""));

			// PRIVATE
			// -------

			var activate = function( hash ){
				el.children(["li:not(:has(a[href='", hash ,"']))"].join("")).removeClass(options.activeClass);
				el.children("li").has(["a[href='", hash ,"']"].join("")).addClass(options.activeClass);
				content.children([":not([id='", hash ,"'])"].join("")).hide();
				content.children([".", hash.replace("#", "")].join("")).show();
			};
			
			var init = function(){
				content.children("div").hide();
				active = ["#", content.children(":first-child").attr("class")].join("");
				activate(active);
			};

			// PUBLIC
			// ------
			
			tabs.click = function(){
				activate($(this).children("a").attr("href"));
			};

			// SETUP
			// -----

			init();

			return tabs;

		};

		$.fn.tabs = function( options ){
			return this.each(function(){
				$(this).children("li").on("click", Tabs($(this), options).click);
			});
		};

})(jQuery);
/*!
 * jQuery Tooltip Plugin
 *
 * Copyright 2012, T. Zengerink
 * Licensed under MIT License
 * See: https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/license.txt
 */
;(function($, win, doc){

	var unique = -1;

	var Tooltip = function( target, options ){

		var tooltip = {},
			defaults = {
				elClass  : "tooltip", // Class of the DOM-element
				delay    : 100,       // Delay in showing the tooltip
				fade     : 100,       // Fade time in microseconds
				margin   : 3,         // Space surrounding target element
				position : "top",     // Position in relation to target element (top, right, bottom or left)
				size     : "normal"   // Size of the tooltip (normal or large)
			},
			options = $.extend({}, defaults, options),
			uniqueId = [options.elClass, "-", (++unique).toString()].join(""),
			selector = ["#", uniqueId].join(""),
			timer;

		// PRIVATE
		// -------

		var construct = function(){
			var txt = target.attr("title");
			target.attr("title", "");
			$("<div />").attr("id", uniqueId).addClass([options.elClass, options.size].join(" ")).appendTo("body").hide();
			$("<div />").addClass("arrow").appendTo(selector);
			$("<div />").addClass("content").appendTo(selector);
			$(selector).find(".content").html(txt);
		};

		var clear = function(){
			clearTimeout(timer);
		};

		var hide = function( fn ){
			clear();
			timer = setTimeout(function(){
				$(selector).fadeOut(options.fade, function(){
					typeof fn === "function" && fn();
				});
			}, options.delay);
		};

		var position = function(){
			var pos = target.position();
			var align = reposition(pos, options.position);
			switch (align) {
				case "right":
					var pt = pos.top + (target.outerHeight() / 2) - ($(selector).outerHeight() / 2);
					var pl = pos.left + target.outerWidth() + (5 + options.margin);
					break;
				case "bottom":
					var pt = pos.top + target.outerHeight() + (5 + options.margin);
					var pl = pos.left + (target.outerWidth() / 2) - ($(selector).outerWidth() / 2);
					break;
				case "left":
					var pt = pos.top + (target.outerHeight() / 2) - ($(selector).outerHeight() / 2);
					var pl = pos.left - $(selector).outerWidth() - (5 + options.margin);
					break;
				default:
					var pt = pos.top - $(selector).outerHeight() - (5 + options.margin);
					var pl = pos.left + (target.outerWidth() / 2) - ($(selector).outerWidth() / 2);
					break;
			}
			$(selector).removeClass(["top", "right", "bottom", "left"].join(" ")).addClass(align).css({ "left":pl, "top":pt });
		};

		var reposition = function( position, alignment ){
			switch (alignment) {
				case "right":
					alignment = (position.left - $(win).scrollLeft() + target.outerWidth() + $(selector).outerWidth() + 15 > $(win).width()) ? "left" : alignment;
					break;
				case "bottom":
					alignment = (position.top - $(win).scrollTop() + target.outerHeight() + $(selector).outerHeight() + 15 > $(win).height()) ? "top" : alignment
					break;
				case "left":
					alignment = (position.left - $(win).scrollLeft() < $(selector).outerWidth() + 15) ? "right" : alignment;
					break;
				default:
					alignment = (position.top - $(win).scrollTop() < $(selector).outerHeight() + 15) ? "bottom" : alignment;
				 break;
			}
			return alignment;
		};

		var show = function(){
			timer = setTimeout(function(){
				$(selector).fadeIn(options.fade);
			}, options.delay);
		};

		// PUBLIC
		// ------

		tooltip.hide = function(){
			hide(clear);
		};

		tooltip.position = function(){
			position();
		};

		tooltip.show = function(){
			( ! $(selector).length) && construct();
			position();
			show();
		};

		return tooltip;
	};

	$.fn.tooltip = function( options ){
		return this.each(function(){
			var tooltip = Tooltip($(this), options);
			$(this).bind("mouseenter", tooltip.show);
			$(this).bind("mouseleave click", tooltip.hide);
			$(doc).bind("keyup", tooltip.hide);
			$(win).bind("scroll", tooltip.position);
		});
	};

})(jQuery, window, document);
