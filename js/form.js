WizH5F.Form = new Class({
    Implements:Options,
    options:{
        forms:'form'
    },
    initialize:function (options) {
        this.setOptions(options);
        this.validator = new WizH5F.Validator();
        this.placeholder = new WizH5F.PlaceHolder();
        this.forms = $$(this.options.forms);
        this.forms.each(function (form) {
            form.getElements('input').each(function (input) {
//                if (!WizH5F.Support.hasTypeSupport(input.getAttribute('type'))) {
//                    if (!WizH5F.Support.hasAttributeSupport('placeholder')) {
//                        this.placeholder.addPlaceholder(input);
//                    }
//                    if (!WizH5F.Support.hasAttributeSupport('validity')) {
//                        this.validator.addValidator(input);
//                    }
//                }
                if (!WizH5F.Support.hasAttributeSupport('placeholder')) {
                    this.placeholder.addPlaceholder(input);
                }
                this.validator.addValidator(input);
                if (input.get('required') == 'required') {
                    this.validator.showInitRequired(input);
                }
//                this.validator.addValidator(input);
//                if (input.get('required') == 'required') {
//                    this.validator.showInitRequired(input);
//                }
//                if (input.getAttribute('type') == 'submit') {
//                    input.addEvent('click', function () {
//                        var bpass = true;
//                        //  表单中没有必填项和非法验证方可提交
//                        form.getElements('input').each(function (input) {
//                            if (input.hasClass('invalid') || input.hasClass('required_invalid')) {
//                                bpass = false;
//                            }
//                        });
//                        if (!bpass) {
//                            alert("表单验证未通过！");
//                        }
//                    });
//                }
            }, this);
//            form.getElements("input").each(function(input) {
//                ///if (!WizH5F.Support.hasTypeSupport(input.getAttribute('type')) ) {
////                    if (!WizH5F.Support.hasAttributeSupport('placeholder')) {
////                        this.placeholder.addPlaceholder(input);
////                    }
//                    //if (!WizH5F.Support.hasAttributeSupport('validity')) {
//                    this.validator.addValidator(input);
//                    //}
//
//                //}
//
////                alert(!WizH5F.Support.hasAttributeSupport('validity'));
//
//
//            }, this);
        }, this);
    }
});