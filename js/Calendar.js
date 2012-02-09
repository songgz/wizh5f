/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-9
 * Time: 下午2:28
 * To change this template use File | Settings | File Templates.
 */
WizUi.fields.Calendar = new Class({
    Extends: WizUi.Widget,
    options: {
        //year: 2009,
        //month: 12,
        //day: 30
    },
    initialize: function(options){
        this.parent(options);
        this.datetime = new Date();
        this.year = 2012;
        this.month = 2;
        this.day =4;
    },
    render: function(){
        this.parent();
        this.wrap = new Element('div');
        [1,2,4,5,6].each(function(n){
            var e = new Element('a',{html: n});
            var the = this;
            e.addEvent('click',function(){
                the.day = this.get('html');

            });
            e.inject(this.wrap);
        },this);
        this.wrap.inject(this.el);
    },
    getDay: function(){
        return this.day;
    }
});