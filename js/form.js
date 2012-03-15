WizH5F.Form = new Class({
    Extends:WizUi.Widget,
    options:{
        fieldSelectors: 'input'//'input, select, textarea'
    },
    initialize:function (options) {
        this.parent(options);
        this.validator = new WizH5F.Validator();
        this.placeholder = new WizH5F.PlaceHolder();
        this.el.addEvent('submit', function () {
            var bpass = true;
            this.getElements('input').each(function (input) {
                if (input.hasClass('invalid') || input.hasClass('required_invalid')) {
                    bpass = false;
                }
            });
            return bpass;
        });

        this.el.getElements(this.options.fieldSelectors).each(function (input) {

            if (!WizH5F.Support.hasAttributeSupport('placeholder')) {
                this.placeholder.addPlaceholder(input);
            }
            this.validator.addValidator(input);
            if (input.get('required') == 'required') {
                this.validator.showInitRequired(input);
            }
            if (input.getAttribute('type') == 'date') {
                new WizUi.fields.DatePicker({applyTo:input});
            }
            if (input.getAttribute('type') == 'lookup') {
                new WizUi.fields.LookupPicker({applyTo:input});
                //new WizUi.fields.TriggerPicker({applyTo:input});
            }
        }, this);
    }
});