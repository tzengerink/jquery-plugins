# ## Plugins.Tooltip
#
# Plugin that shows a tooltip when the user invokes a configurable event on
# the `invoker`.
#
# *Example usage in your JavaScript:*
#
#     $("div").tooltip();
#
class Plugins.Tooltip extends Plugins.Plugin
  defaults:
    attr: "title"                  # DOM-attribute that containts content
    delay: 100                     # Delay in showing the tooltip
    fade:  100                     # Fade time in microseconds
    invokeHideEvent: "mouseleave"  # Event that hides the Tooltip
    invokeShowEvent: "mouseenter"  # Event that shows the Tooltip
    klass: "tooltip"               # Class of the DOM-element
    margin: 3                      # Margin between Tooltip and invoker
    position: "top"                # Position of Tooltip relative to invoker
  timer: false

  # Construct a new Tooltip passing a `config` and `invoker` object.
  constructor: (config, invoker) ->
    super config, invoker
    @build()
    @bind()

  # Bind events to show, hide or reposition the tooltip.
  bind: ->
    at = @
    @invoker.on @config.invokeShowEvent, -> at.show.apply at if not $(at.selector).is(":visible")
    @invoker.on @config.invokeHideEvent, -> at.hide.apply at if $(at.selector).is(":visible")
    $(win).on "scroll", @position.apply @

  # Build new dialog DOM-element and append it to the HTML body.
  build: ->
    Plugins.create("div", @config.klass).attr("id", @elId).appendTo("body").hide()
    Plugins.create("div", "arrow").appendTo(@selector)
    Plugins.create("div", "content").html(@invoker.attr @config.attr).appendTo(@selector)
    @invoker.attr @config.attr, ""

  # Hide the tooltip using the `config`-ured `delay` and `fade` microseconds.
  hide: ->
    at = @
    clearTimeout @timer
    @timer = Plugins.delay at.config.delay, -> $(at.selector).fadeOut at.config.fade

  # Position the element within the window. Reposition the tooltip when to close
  # to the border of the window.
  position: ->
    xy = @invoker.position()
    position = @_reposition xy, @config.position
    switch position
      when "right"
        top = xy.top + (@invoker.outerHeight() / 2) - ($(@selector).outerHeight() / 2)
        left = xy.left + @invoker.outerWidth() + (5 + @config.margin)
      when "bottom"
        top = xy.top + @invoker.outerHeight() + (5 + @config.margin)
        left = xy.left + (@invoker.outerWidth() / 2) - ($(@selector).outerWidth() / 2)
      when "left"
        top = xy.top + (@invoker.outerHeight() / 2) - ($(@selector).outerHeight() / 2)
        left = xy.left - $(@selector).outerWidth() - (5 + @config.margin)
      else
        top = xy.top - $(@selector).outerHeight() - (5 + @config.margin)
        left = xy.left + (@invoker.outerWidth() / 2) - ($(@selector).outerWidth() / 2)
    $(@selector).removeClass("top right bottom left").addClass(position).css
      left: left
      top: top

  # Show the tooltip using the `config`-ured `delay` and `fade` microseconds.
  show: ->
    at = @
    @position()
    @timer = Plugins.delay at.config.delay, -> $(at.selector).fadeIn at.config.fade

  # Reposition the tooltip when the element is to close to the border of the window.
  _reposition: (xy, position) ->
    switch position
      when "right"
        if (xy.left - $(win).scrollLeft() + @invoker.outerWidth() + $(@selector).outerWidth() + 15 > $(win).width()) then "left" else position
      when "bottom"
        if (xy.top - $(win).scrollTop() + @invoker.outerHeight() + $(@selector).outerHeight() + 15 > $(win).height()) then "top" else position
      when "left"
        if (xy.left - $(win).scrollLeft() < $(@selector).outerWidth() + 15) then "right" else position
      else
        if (xy.top - $(win).scrollTop() < $(@selector).outerHeight() + 15) then "bottom" else position

# Define the plugin in as a jQuery-function.
$.fn.tooltip = (config) -> @.each -> new Plugins.Tooltip config, $(@)
