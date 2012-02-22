WizH5F.Validator = new Class({
    Implements:Options,
    options:{
        validators:{
            required:function (input) {
                return input.get('value').length > 0 && (input.get('value') !== input.get('placeholder'));
            },
            text:function (input) {
                return true
            },
            search:function (input) {
                return input.get('value').test();
            },
            url:function (input) {
                return input.get('value').test(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"])*$/)
            },
            email:function (input) {
                return input.get('value').test(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
            },
            datetime:function (input) {
                // YYYY-MM-DD　hh:mm:ss（'-'也可以省略）
                return input.get('value').test(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-?(1[0-2]|0[1-9])-?(3[0-1]|0[1-9]|[1-2][0-9])(\s+)(2[0-3]|[0-1][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[0-1][0-9]):[0-5][0-9])?$/);
            },
            date:function (input) {
                // YYYYMMDD 短日期格式
                return input.get('value').test(/^([0-9]{4})(?:(1[0-2]|0[1-9])|-?(1[0-2]|0[1-9])-?)(3[0-1]|0[1-9]|[1-2][0-9])$/);
            },
            month:function (input) {
                // YYYY-MM 年月
                return input.get('value').test(/^([0-9]{4})-?(1[0-2]|0[1-9])$/);
            },
            week:function (input) {
                // YYYY-WNN(N为数字)
                return input.get('value').test(/^([0-9]{4})-?W(5[0-3]|[1-4][0-9]|0[1-9])$/);
            },
            time:function (input) {
                // hh:mm:ss  第一个正则验证的是24小时制（包括了十二小时制）（因此取消第二个表达式 第二个验证是12小时制）
                return (input.get('value').test(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/));
                // (input.get('value').test(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):([0-5]?[0-9])$/));
            },
            'datetime-local':function (input) {
                return input.get('value').test();
            },
            'number':function (input) {
                return input.get('value').test(/^[0-9]*$/);
            },
            range:function (input) {
                return input.get('value').test();
            },
//                color:function(input){
//                    return input.get('value').test();
//                },
            checkbox:function (input) {
                return input.get('value').test()
            },
            image:function (input) {
                return input.get('value').test()
            },

            tel:function (input) {
//                  此类型要求输入一个电话号码，但实际上它并没有特殊的验证，与text类型没什么区别。
                return true;
            },
            pattern:function (input) {
                return input.get('value').match(/input.get('pattern')/)
            }
        },
        errors:{
            required:"this is required",
            email:"this is email"
        }
    },
    initialize:function (options) {
        this.setOptions(options);
//        alert(input.get('required'));
    },
    test:function (input) {
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
        if (input.getAttribute('type') !== 'text') {
            if (input.get('value').length > 0 && (input.get('value') !== input.get('placeholder'))) {
                if (!this.options.validators[input.getAttribute('type')](input)) {
                    return false;
                }
            } else {
                return true;
            }
        }
        return true;
    },
    valid:function (input) {
        if (input.get('required')) {
            if (input.get('value') == "" || input.get('value') == input.get('placeholder')) {
                input.set('class', 'required_invalid');
                return;
            }
        }
        if (input.getAttribute('type') !== 'submit') {
            if (this.test(input)) {
                input.set('class', 'valid');
            } else {
                input.set('class', 'invalid');
            }
        }
    },
    addValidator:function (input) {
//        this.valid(input);
        input.addEvent('blur', function () {
            this.valid(input);
        }.bind(this));
    },
//    为表单中的input增加触发事件，并且显示初始化表单中的必填项
    showInitRequired:function (input) {
        input.set('class', 'required_invalid');
    },
    add:function (rule, fn) {
        this.options.validators[rule] = fn;
    }

});

