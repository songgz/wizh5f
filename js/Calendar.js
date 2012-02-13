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
        weeks: ['日','一', '二','三','四','五','六'],
        onSelect: Function.from()
    },
    initialize: function(options) {
        this.date = new Date();
        this.parent(options);
        //this.setOptions(options);
    },
    render: function() {
        this.parent();
        this.cal = new Element('table');
        this.cal.inject(this.el);
        this.buildCal();
    },
    getDay: function() {
        //return this.day;
    },
    buildCal: function() {
        this.cal.innerHTML = "";
        this.calHeader();
        this.calWeek();
        this.calDay();
    },
    calHeader: function() {
        var caption = new Element('caption');
        var tYear = new Element('span', {html:this.date.getFullYear()});
        var tMonth = new Element('span', {html:this.date.getMonth() + 1});
        tYear.inject(caption,'top');
        tMonth.inject(caption);
        ['pMonth','pYear','nMonth','nYear'].each(function(t){
            if(t == 'pYear' || t == 'pMonth'){
                this.addTool(t).inject(caption, 'top');
            }else{
                this.addTool(t).inject(caption, 'bottom');
            }
        },this);
        caption.inject(this.cal);
    },
    addTool: function(tbar){
        var a = new Element('a',{
                html: tbar,
                events: {
                    click: function(){
                        switch (tbar) {
                            case 'pYear':
                                this.date.setFullYear(this.date.getFullYear() - 1);
                                break;
                            case 'nYear':
                                this.date.setFullYear(this.date.getFullYear() + 1);
                                break;
                            case 'pMonth':
                                this.date.setMonth(this.date.getMonth() - 1);
                                break;
                            case 'nMonth':
                                this.date.setMonth(this.date.getMonth() + 1);
                                break;
                        }
                        this.buildCal();
                    }.bind(this)
                }
            });
        return a;
    },


    calWeek: function() {
        var tr = new Element('tr');
        for (var i = 0; i < 7; i++) {
            var td = Element('th', {html: this.options.weeks[i]});
            td.inject(tr);
        }
        tr.inject(this.cal);
    },
    calDay: function() {
        var week = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var days = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (var r = 1; r <= 6; r++) {
            var tr = new Element('tr');
            for (var c = 1; c <= 7; c++) {
                var index = (r - 1) * 7 + c;
                var day = '';
                if (week < index && index <= (days + week)) {
                    day = index - week;
                }
                this.addDay(day).inject(tr);
            }
            tr.inject(this.cal);
        }
    },
    addDay: function(day){
        var td = new Element('td', {
                    html: day,
                    events: {
                        click: function() {
                            this.date.setDate(day);
                            this.fireEvent('select');
                        }.bind(this)
                    }
                });
        return td;
    },
    getDate: function(){
        return this.date;
    }
});