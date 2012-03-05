/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-9
 * Time: 下午3:28
 * To change this template use File | Settings | File Templates.
 */
WizUi.fields.DatePicker = new Class({
    Extends:WizUi.Widget,
    options:{
        //styles: {width: '200px', height: '30px'},
        //field:'input[type=date]'
        tag:'input'
    },
    initialize:function (options) {
        this.parent(options);
    },
    doRender:function () {
        this.el.addEvent('click', function () {
            this.calendar = this.calendar || this.buildCalendar();
            this.calendar.refresh();
            this.calendar.show();
        }.bind(this));
    },
    buildCalendar:function () {
        var xy = this.getXY(this.el);
        this.calendar = new WizUi.Calendar({styles:{top:xy.top + 24, left:xy.left}}).render();
        this.calendar.addEvents({
            'select':function () {
                this.el.set('value', this.calendar.getDate());
                this.calendar.hide();
            }.bind(this)
        });
        $(this.calendar).addEvent('mouseleave', function () {
            this.hide();
        });
        return this.calendar;
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
    },
    setDate:function () {

    }
});