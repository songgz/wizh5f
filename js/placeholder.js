WizH5F.PlaceHolder = new Class({
    Implements: Options,
    options:{
        default_color: 'gray',
        color: ''
    },
    initialize: function(options) {
        this.setOptions(options);
    },
    addPlaceholder: function(input) {
        if (input.get('placeholder')) {
            this.options.color = input.getStyle('color');
            this.blur(input);
            input.addEvents({
                focus: function() {
                    this.focus(input);
                }.bind(this),
                blur: function() {
                    this.blur(input);
                }.bind(this)
            }, this);
        }
    },
    focus: function(input) {
        if (input.value == input.get('placeholder')) {
            input.setStyle('color', this.options.color);
            input.value = '';
        }
    },
    blur: function(input) {
        if (input.value == '') {
            input.setStyle('color', this.options.default_color);
            input.value = input.get('placeholder') || "";
        }
    }
});
