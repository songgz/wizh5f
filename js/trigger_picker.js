/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-3-5
 * Time: 下午3:25
 * To change this template use File | Settings | File Templates.
 */
WizUi.fields.TriggerPicker = new Class({
    Extends:WizUi.Widget,
    options:{
        className: 'trigger-picker',
        fieldClass: 'field-text',
        triggerClass: 'trigger',
        readOnly: true
    },
    initialize:function (options) {
        if(options.applyTo){
            this.fieldEl = $(options.applyTo);
            options.applyTo = new Element('span').wraps(this.fieldEl);
        }
        this.parent(options);
    },
    doRender:function(){
        this.fieldEl.addClass(this.options.fieldClass);
        if (this.options.readOnly){
            this.fieldEl.setProperty('readonly','readonly');
        }
        this.trigger = new Element('span',{
            'class' : this.options.triggerClass,
            //html: '<span class="combo-arrow">qq</span>'
        }).inject(this.el);
        this.trigger.addEvent('click',this.onTriggerClick.bind(this));
        if(!this.options.width){
            this.el.setStyle('width',this.fieldEl.getStyle('width').toInt()+ this.trigger.getStyle('width').toInt());
        }

//        this.holder = new Element('input',{
//            type: "hidden"
//        }).inject(this.el);

//        var name, value;
//        if (name = this.fieldEl.getProperty('name')) {
//            this.fieldEl.removeProperty('name');
//            this.holder.setProperty('name', name);
//        }
//        if (value = this.fieldEl.getProperty('value')){
//            this.holder.setProperty('value', value)
//        }
    },
    onTriggerClick : function() {alert('ssf') }
});