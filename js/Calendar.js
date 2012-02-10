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
        weeks: ['日','一', '二','三','四','五','六']
    },
    initialize: function(options) {
        this.currentDate = new Date();
        this.parent(options);
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
        var pYear = new Element('a', {
            html: '<<',
            events: {
                click: function() {
                    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
                    this.buildCal();
                }.bind(this)
            }
        });
        var nYear = new Element('a', {
            html: '>>',
            events: {
                click: function() {
                    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
                    this.buildCal();
                }.bind(this)
            }
        });
        var pMonth = new Element('a', {
            html: '<',
            events: {
                click: function() {
                    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                    this.buildCal();
                }.bind(this)
            }
        });
        var nMonth = new Element('a', {
            html: '>',
            events: {
                click: function() {
                    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                    this.buildCal();
                }.bind(this)
            }
        });
        var tYear = new Element('span', {html:this.currentDate.getFullYear()});
        var tMonth = new Element('span', {html:this.currentDate.getMonth() + 1});
        pYear.inject(caption);
        pMonth.inject(caption);
        tYear.inject(caption);
        tMonth.inject(caption);
        nMonth.inject(caption);
        nYear.inject(caption);
        caption.inject(this.cal);
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
        var week = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
        var days = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        for (var r = 1; r <= 6; r++) {
            var tr = new Element('tr');
            for (var c = 1; c <= 7; c++) {
                var index = (r - 1) * 7 + c;
                var t = '';
                if (week < index && index <= (days + week)) {
                    t = index - week;
                }
                var td = new Element('td', {
                    html: t,
                    events: {
                        click: function() {
                            alert(this.get('html'));
                        }
                    }
                });
                td.inject(tr);
            }
            tr.inject(this.cal);
        }
    }
});