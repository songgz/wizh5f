/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-3-6
 * Time: 上午9:11
 * To change this template use File | Settings | File Templates.
 */
WizUi.fields.LookupPicker = new Class({
    Extends:WizUi.fields.TriggerPicker,
    options:{
        //triggerClass:'search-trigger'
    },
    initialize:function (options) {
        this.parent(options);
    },
    doRender:function () {
        this.parent();
        this.holder = new Element('input', {
            type:"hidden"
        }).inject(this.el);

        var name, value;
        if (name = this.fieldEl.getProperty('name')) {
            this.fieldEl.removeProperty('name');
            this.holder.setProperty('name', name);
        }
        if (value = this.fieldEl.getProperty('value')) {
            this.holder.setProperty('value', value)
        }
    },
    onTriggerClick:function () {
        this.dialog = this.dialog || new WizUi.DialogBox({
            renderTo:this.getBody()
        }).addEvents({'complete':function () {
            this.buildTable();
        }.bind(this)});
        this.dialog.setContent('ajax', this.fieldEl.get('url')).show();
    },
    buildTable:function () {
        var el = this.dialog.el.getElement('table');
        if (el) {
            this.table = new HtmlTable(el, {selectable:true}).addEvent('onRowFocus', function () {
                var rows = this.table.getSelected();
                if (rows.length > 0) {
                    this.fieldEl.value = rows[0].getElements('td')[0].get('html');
                }
            }.bind(this));
        }
    }
});