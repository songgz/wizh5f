/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-9
 * Time: 下午3:28
 * To change this template use File | Settings | File Templates.
 */
WizUi.fields.Date = new Class({
    Extends: WizUi.Widget,
    options: {
        styles: {width: '200px', height: '30px'}
    },
    initialize: function(options){
        this.parent(options);
    },
    render: function(){
        this.parent();
        this.input = new Element('input');
        this.search = new Element('a', {html:'选择'});
        this.search.addEvent('click', function(){
            var calendar = new WizUi.fields.Calendar();
            calendar.addEvent('select', function(){
                this.input.value = calendar.getDate();
            }.bind(this));
            $(calendar).inject(this.el);
        }.bind(this));
        //this.calendar = new WizUi.fields.Calendar();
        this.input.inject(this.el);
        this.search.inject(this.el);
    }
});