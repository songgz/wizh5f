
WizH5F.Form = new Class({
    Implements: [Options],
    options: {
        forms: 'form'
    },
    initialize: function(options) {
        this.setOptions(options);
        this.validator = new WizH5F.Validator();
        this.placeholder = new WizH5F.PlaceHolder();
        this.forms = $$(this.options.forms);
        this.forms.each(function(form) {
            form.getElements("input").each(function(input) {
                if (!WizH5F.Support.hasAttributeSupport('placeholder')) {
                    this.placeholder.addPlaceholder(input);
                }
                if (!WizH5F.Support.hasAttributeSupport('validity')) {
                    this.validator.addValidator(input);
                }
            }, this);
        }.bind(this));
    }
});