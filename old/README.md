jQuery Plugin Collection
------------------------

A collection of jQuery plugins.

### jquery.accordion.js

Example HTML:

	<div class="accordion">
		<a href="#item1">Item 1</a>
		<div class="item1">This is the content for item 1</div>
		<a href="#item2">Item 2</a>
		<div class="item2">This is the content for item 2</div>
		<a href="#item3">Item 3</a>
		<div class="item3">This is the content for item 3</div>
		<a href="#item4">Item 4</a>
		<div class="item4">This is the content for item 4</div>
	</div>

Example JavaScript / jQuery:

	$(".accordion").accordion({
		activeClass    : "active", // Class of active element
		activateFirst  : true,     // Activate first element initialy
		animationSpeed : 100       // Animation speed in miliseconds
	});

### jquery.modal.js

Example HTML:

    <a href="index.html" class="modal">Click Me!</a>

Example JavaScript / jQuery:

    $(".modal").modal({
        close  : true,    // Show a close button
        prefix : "modal", // Prefix used for element id
        height : "80%",   // Modal window height
        width  : "80%"    // Modal window width
    });

### jquery.tabs.js

Example HTML:

	<ul class="tabs">
		<li><a href="#tab1">Tab 1</a></li>
		<li><a href="#tab2">Tab 2</a></li>
		<li><a href="#tab3">Tab 3</a></li>
		<li><a href="#tab4">Tab 4</a></li>
	</ul>
	<div class="tabs-content">
		<div class="tab1">Some content for tab 1.</div>
		<div class="tab2">Some content for tab 2.</div>
		<div class="tab3">Some content for tab 3.</div>
		<div class="tab4">Some content for tab 4.</div>
	</div>

Example JavaScript / jQuery:

	$(".tabs").tabs({
		activeClass  : "active",      // Class for the active list-element
		contentClass : "tabs-content" // Class for the content element
	});

### jquery.tooltip.js

Example HTML:

	<div class="my-element" title="This is my tooltip text">Hover Me!</div>

Example usage:

    $(".my-element").tooltip({
            elAttr    : "title",      // Attribute to get tooltip content from
			elClass   : "tooltip",    // Class of the DOM-element
			delay     : 100,          // Delay in showing the tooltip
			fade      : 100,          // Fade time in microseconds
			hideEvent : "mouseleave", // Events that hide the tooltip
			margin    : 3,            // Space surrounding target element
			position  : "top",        // Position in relation to target element (top, right, bottom or left)
			showEvent : "mouseenter", // Events that show the tooltip
			size      : "normal"      // Size of the tooltip (normal or large)
    });

### jquery.dialog.js

Example HTML:

    <a href="javascript:void(0);">Click me!</a>
    <div class="dialog-content">This is the content for the dialog.</div>

Example usage:

    $(".dialog").dialog({
        cancelText:   "Cancel",           // Text in cancel button
        confirmText:  "OK",               // Text in confirm button
        contentClass: "dialog-content",   // Class of the dialog content element
        elClass:      "dialog-container", // Class of the dialog DOM Element
        onCancel:     function(){},       // Callback on cancel
        onConfirm:    function(){},       // Callback on confirm
        onOpen:       function(){},       // Callback on open
        showEvent:    "click"             // Event that triggers showing the dialog
    });

*Copyright (c) 2012, T. Zengerink - [See the lisence](https://raw.github.com/Mytho/jQuery-Plugin-Collection/master/LICENSE)*