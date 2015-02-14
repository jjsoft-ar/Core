;(function ( $, window, document, undefined ) {
    var pluginName = "keypressAction",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function keypresAction ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(keypresAction.prototype, {
        bindKeyToRoute: function (key, route) {
            $(document).keypress(function(e) {
                if (e.which == key) {
                    window.location = route;
                }
            });
        },
        init: function () {
            var self = this;
            $.each(this.settings.actions, function( index, object ) {
                self.bindKeyToRoute(object.key, object.route);
            });
        }
    });

    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new keypresAction( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };

})( jQuery, window, document );