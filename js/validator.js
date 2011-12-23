WizH5F.Validator = new Class({
    Implements: [Options],
    options: {
        validators: {
            required: function(input) {
                return input.get('value').length > 0
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
    addValidator: function(input) {
        input.addEvent('blur', function() {
            if (this.test(input)) {
                input.addClass('validclass');
            } else {
                input.addClass('invalidclass');
            }
        }.bind(this));
    },
    add: function(rule, fn) {
        this.options.validators[rule] = fn;
    }

});

