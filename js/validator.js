WizH5F.Validator = new Class({
    Implements: [Options],
    options: {
        validators: {
            required: function(input) {
                return input.get('value').length > 0 && (input.get('value') !== input.get('placeholder'));
            },
            text:function(input) {
//                暂时这么写
                return true
            },
            search:function(input) {
                return input.get('value').test();
            },
            url:function(input) {
                return input.get('value').test(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/)
            },
            email: function(input) {
                return input.get('value').test(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
            },
            datetime:function(input) {
                return input.get('value').test()
            },
            date:function(input) {
                return input.get('value').test()
            },
            month:function(input) {
                return input.get('value').test()
            },
            week:function(input) {
                return input.get('value').test()
            },
            time:function(input) {
                return input.get('value').test();
            },
            'datetime-local':function(input) {
                return input.get('value').test();
            },
            number:function(input) {
                return input.get('value').test(/^\d+$/);
            },
            range:function(input) {
                return input.get('value').test();
            },
//                color:function(input){
//                    return input.get('value').test();
//                },
            checkbox:function(input) {
                return input.get('value').test()
            },
            image:function(input) {
                return input.get('value').test()
            },

            tel:function(input) {
                alert('sfsfs');
                return input.get('value').test(/^((\d{3,4}-)?\d{7,8})|(13[0-9]{9})$/);
            },
            pattern: function(input) {
                return input.get('value').match(/input.get('pattern')/)
            }
        },
        errors: {
            required: "this is required",
            email: "this is email"
        }
    },
    initialize: function(options) {
        this.setOptions(options);
//        alert(input.get('required'));
    },
    test: function(input) {
        if (input.get('required')) {
            if (!this.options.validators['required'](input)) {
                return false;
            }
        }
        if (input.get("pattern")) {
            if (!this.options.validators['pattern'](input)) {
                return false;
            }
        }
        if (input.getAttribute('type')) {
            if (!this.options.validators[input.getAttribute('type')]) {
                return false;
            }
        }
        return true;
    },
    valid: function(input) {
        if (input.get('required')) {
            if (input.get('value') == "" || input.get('value') == input.get('placeholder')) {
                input.addClass('required_invalid');
                return;
            }
        }
        if (this.test(input)) {
            input.addClass('valid');
        } else {
            input.addClass('invalid');
        }
    },
    addValidator: function(input) {
        this.valid(input);
        input.addEvent('blur', function() {
            this.valid(input);
        }.bind(this));
    },
    add: function(rule, fn) {
        this.options.validators[rule] = fn;
    }

});

