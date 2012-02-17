/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-9
 * Time: 下午3:28
 * To change this template use File | Settings | File Templates.
 */
WizUi.fields.DatePicker = new Class({
    Extends: WizUi.Widget,
    options: {
        styles: {width: '200px', height: '30px'},
        field: 'input[type=date]'
    },
    initialize: function(options) {
        this.parent(options);
    },
    render: function() {
        this.parent();
        this.input = new Element('input');
        this.search = new Element('a', {html:'选择'});
        var calendar = null;
        this.search.addEvent('click', function() {
            if (calendar == null) {
                calendar = new WizUi.Calendar();
                calendar.addEvent('select', function() {
                    this.input.set('value', calendar.getDate());
                    calendar.hide();
                }.bind(this));
                $(calendar).inject(this.el);
            }else{
                calendar.show();
            }
        }.bind(this));
        //this.calendar = new WizUi.fields.Calendar();
        this.input.inject(this.el);
        this.search.inject(this.el);
    }
});