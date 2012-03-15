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
//                非空 且为整数
//                return input.get('value').test(/^[0-9]*$/);
                return true;
            },
            range:function (input) {
                return input.get('value').test();
            },
//                color:function(input){
//                    return input.get('value').test();
//                },
            checkbox:function (input) {
//                return input.get('value').test()
                return true;
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
            },
//            数值区间 如果第三位为0则不包含第一位数值，为1则包含，第四位同理
            range_data:function (input) {
                var real_value = input.get('value');
                var temp = input.get('range_data').split(',');
                var start = temp[0];
                var end = temp[1];
                var startContain = temp[2];
                var endContain = temp[3];
                if (startContain == 0 && endContain == 0) {
                    if (real_value > start && real_value < end)
                        return true;
                } else if (startContain == 0 && endContain == 1) {
                    if (real_value > start && real_value <= end)
                        return true;
                } else if (startContain == 1 && endContain == 0) {
                    if (real_value >= start && real_value < end)
                        return true;
                } else if (startContain == 1 && endContain == 1) {
                    if (real_value >= start && real_value <= end)
                        return true;
                }
                return false;
            }
        },
        errors:{
            required:"this is required",
            email:"this is email"
        }
    },
    initialize:function (options) {
        this.setOptions(options);
    },
    test:function (input) {
//        if (input.get('required')) {
//            if (!this.options.validators['required'](input)) {
//                alert(this.options.errors['required']);
//                return false;
//            }
//        }
        if (input.get("pattern")) {
            if (!this.options.validators['pattern'](input)) {
                return false;
            }
        }
        if (input.get("range_data")) {
            if (!this.options.validators['range_data'](input)) {
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
//        是必填项 如果为空或者为占位符 那么就显示必填项的图标 不需进行验证
        if ((input.get('required')) && (input.get('value') == "" || input.get('value') == input.get('placeholder'))) {
            input.removeClass('invalid');
            input.removeClass('valid');
            this.hideMsg(input);
            if (!input.hasClass('required_invalid')) {
                input.addClass('required_invalid');
            }
            return true;
        }
//      以下是对 是必填项 且值不为空 也不为占位符的进行验证 以及不是必填项的数据输入值进行验证
        if (input.getAttribute('type') !== 'submit') {
            if (this.test(input)) {
                input.removeClass('invalid');
                input.removeClass('required_invalid');
                this.hideMsg(input);
                if (!input.hasClass('valid')) {
                    input.addClass('valid');
                }
            } else {
//      验证未通过要显示错误提示信息
                input.removeClass('valid');
                input.removeClass('required_invalid');
                if (!input.hasClass('invalid')) {
                    input.addClass('invalid');
                    var tempmsg = input.get('errorMsg') || this.options.errors[input.getAttribute('type')];
                    this.showMsg(input, tempmsg);
                }
            }
        }
    },
    addValidator:function (input) {
        input.addEvent('blur', function () {
            this.valid(input);
        }.bind(this));
    },
//    为表单中的input增加触发事件，并且显示初始化表单中的必填项
    showInitRequired:function (input) {
        if ((input.get('required')) && (input.get('value') == "" || input.get('value') == input.get('placeholder'))) {
            input.addClass('required_invalid');
        }
    },
    add:function (rule, fn) {
        this.options.validators[rule] = fn;
    },
    showMsg:function (input, msg) {
        if (!document.id(input.id + '_msg')) {
            var message = new Element('div#' + input.id + '_msg');
            message.appendText(msg);
            message.set('class', 'msg');
            message.inject(input, 'after');
        }
    },
    hideMsg:function (input) {
        var getEl = document.id(input.id + '_msg');
        if (getEl != null) {
            getEl.destroy();
        }

    }
});

