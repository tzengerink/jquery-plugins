$ = jQuery
doc = document
win = window

# Counter used to give each Plugin a `uniq` identifier.
uniq = -1

Plugins = win.Plugins = {}

# Concatinate all `arguments` to a single string.
Plugins.cat = -> Array.prototype.slice.call(arguments).join("")

# Execute a function `fn` after a delay of microseconds `ms`.
Plugins.delay = (ms, fn) -> setTimeout fn, ms

# Log all `arguments` to the console if avaliable.
Plugins.log = -> win.console?.log arg for arg in Array.prototype.slice.call arguments

# Create a DOM-element of a given `type` and width a given DOM-`klass`.
Plugins.create = (type, klass) ->
  el = $(doc.createElement type)
  el.addClass klass if klass
  return el

# ## Plugins.Plugin
#
# The Plugin class can be extended to create a custom plugin. A configuration
# object `config` should be past to configure the plugin and an optional
# `invoker` jQuery-object can be past to know which element invoked the plugin.
class Plugins.Plugin
  defaults:
    klass: "plugin" # Class of the DOM-element

  # Construct a new Plugin passing a `config` and `invoker` object.
  constructor: (config, invoker) ->
    @id = ++uniq
    @config = $.extend({}, @defaults, config)
    @invoker = invoker
    @elId = Plugins.cat @config.klass, "-", @id
    @selector = Plugins.cat "#", @elId
