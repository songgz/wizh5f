/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-9
 * Time: 下午3:28
 * To change this template use File | Settings | File Templates.
 */
WizUi.fields.DatePicker = new Class({
    Extends:Options,
    options:{
        //styles: {width: '200px', height: '30px'},
        field:'input[type=date]'
    },
    initialize:function (options) {
        this.setOptions(options);
        var inputs = $$(this.options.field);
        inputs.each(function (input) {
            var xy = this.getXY(input);
            input.addEvent('click', function () {
                var calendar = new WizUi.Calendar({styles:{top:xy.top + 24, left:xy.left},date:input.get('value')});
                calendar.addEvents({
                    'select': function () {
                        input.set('value', calendar.getDate());
                        calendar.hide();
                    }.bind(this)
                });
            }, this);

        }, this);
    },

    getXY:function (el) {
        var box = el.getBoundingClientRect();
        var doc = el.ownerDocument;
        var body = doc.body;
        var html = doc.documentElement;
        var clientTop = html.clientTop || body.clientTop || 0;
        var clientLeft = html.clientLeft || body.clientLeft || 0;
        var top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop ) - clientTop;
        var left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;
        return { 'top':top, 'left':left };
    }
//    render:function () {
//        this.parent();
//        this.input = new Element('input');
//        this.search = new Element('a', {html:'选择'});
//        var calendar = null;
//        this.search.addEvent('click', function () {
//            if (calendar == null) {
//                calendar = new WizUi.Calendar();
//                calendar.addEvent('select', function () {
//                    this.input.set('value', calendar.getDate());
//                    calendar.hide();
//                }.bind(this));
//                $(calendar).inject(this.el);
//            } else {
//                calendar.show();
//            }
//        }.bind(this));
//        //this.calendar = new WizUi.fields.Calendar();
//        this.input.inject(this.el);
//        this.search.inject(this.el);
//    }
});