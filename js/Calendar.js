/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-9
 * Time: 下午2:28
 * To change this template use File | Settings | File Templates.
 *
 * requires:
 - Core/Array
 - Core/String
 - Core/Number
 - MooTools.More
 - Locale
 - Locale.en-US.Date

 provides: [Date]
 */
WizUi.Calendar = new Class({
    Extends:WizUi.Widget,
    options:{
        className:'wiz-calendar',
        hidden:true,
        weeks:['日', '一', '二', '三', '四', '五', '六'],
        months:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        onSelect:Function.from(),
        styles:{position:'absolute', border:'1px solid red'}
    },
    initialize:function (options) {
        this.date = new Date();
        this.parent(options);
    },
    doRender:function () {
        this.buildCal();
    },
    buildCal:function () {
        this.cal = new Element('table', {styles:{width:'180px', position:'relative'}});
        this.tbody = new Element('tbody');
        this.calHeader();
        this.calWeek();
        this.calDay();
        this.tbody.inject(this.cal);
        this.cal.inject(this.el, 'top');
        this.monthLayer = new Element('div', {'class':'month-layer'}).inject(this.el);
        this.yearLayer = new Element('div', {'class':'year-layer'}).inject(this.el);
        this.renderMonthLayer();
    },
    calHeader:function () {
        var caption = new Element('caption', {'class':'header'});
        [
            {id:'pYear', name:'<<'},
            {id:'pMonth', name:'<'},
            {id:'nYear', name:'>>'},
            {id:'nMonth', name:'>'}
        ].each(function (action) {
            this.createButton(action).inject(caption);
        }, this);
        var title = new Element('div');
        var month = new Element('span', {
            html:this.options.months[this.date.getMonth()],
            styles:{cursor:'pointer'},
            events:{
                click:function () {
                    if (this.monthLayer.isVisible()) {
                        this.monthLayer.setStyles({
                            'display':'none'
                        });
                    } else {
                        this.monthLayer.setStyles({
                            'display':'block',
                            'visibility':'visible'
                        });
                        this.yearLayer.setStyles({
                            'display':'none'
                        });
                    }
                }.bind(this)
            }
        }).inject(title);
        var year = new Element('span', {
            html:this.date.getFullYear(),
            styles:{cursor:'pointer'},
            events:{
                click:function () {
                    if (this.yearLayer.isVisible()) {
                        this.yearLayer.setStyles({
                            'display':'none'
                        });
                    } else {
                        this.renderYearLayer(this.date.getFullYear());
                        this.yearLayer.setStyles({
                            'display':'block',
                            'visibility':'visible'
                        });
                        this.monthLayer.setStyles({
                            'display':'none'
                        });
                    }
                }.bind(this)
            }
        }).inject(title);
        title.inject(caption);
        caption.inject(this.cal);
    },
    createButton:function (action) {
        var a = new Element('a', {
            text:action.name,
            href:"#",
            styles:{
                'pYear':{float:'left', width:'20px'},
                'pMonth':{float:'left', width:'20px'},
                'nMonth':{float:'right', width:'20px'},
                'nYear':{float:'right', width:'20px'}
            }[action.id],
            events:{
                click:function () {
                    switch (action.id) {
                        case 'pYear':
                            this.date.setFullYear(this.date.getFullYear() - 1);
                            break;
                        case 'pMonth':
                            this.date.setMonth(this.date.getMonth() - 1);
                            break;
                        case 'nMonth':
                            this.date.setMonth(this.date.getMonth() + 1);
                            break;
                        case 'nYear':
                            this.date.setFullYear(this.date.getFullYear() + 1);
                            break;
                    }
                    this.refresh();
                }.bind(this)
            }
        });
        return a;
    },
    calWeek:function () {
        var tr = new Element('tr');
        for (var i = 0; i < 7; i++) {
            var td = Element('th', {html:this.options.weeks[i]});
            td.inject(tr);
        }
        tr.inject(this.tbody);
    },
    calDay:function () {
        var week = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var days = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        var row = Math.ceil((week + days) / 7);
        for (var r = 1; r <= row; r++) {
            var tr = new Element('tr');
            for (var c = 1; c <= 7; c++) {
                var index = (r - 1) * 7 + c;
                var day = '';
                if (week < index && index <= (days + week)) {
                    day = index - week;
                }
                this.addDay(day).inject(tr);
            }
            tr.inject(this.tbody);
        }
    },
    addDay:function (day) {
        var td = new Element('td', {
            html:day,
            events:{
                click:function () {
                    this.date.setDate(day);
                    this.fireEvent('select');
                    //td.addClass('selected');
                }.bind(this)
            }
        });
        ///alert(this.date.get('date'));
        if (day.toString() === this.date.get('date').toString()) td.addClass('selected');
        return td;
    },
    getDate:function (format) {
        return this.date.format(format || '%Y-%m-%d');
    },
    setDate:function (date) {
        this.date = Date.parse(date);
    },
    refresh:function () {
        this.el.empty();
        this.buildCal();
    },
    renderMonthLayer:function () {
        var months = this.options.months;
        months.each(function (item, index) {
            new Element('div', {
                text:item,
                index:index,
                events:{
                    click:function () {
                        this.date.setMonth(index);
                        this.refresh();
                    }.bind(this)
                }
            }).inject(this.monthLayer);
        }, this);
    },
    renderYearLayer:function (lastYear) {
        this.yearLayer.empty();
        var year = lastYear;
        var minYear = year - 5;
        var maxYear = year + 5;
        var showYear = [];
        for (var i = minYear; i < maxYear; i++) {
            showYear.include(i);
        }
        showYear.each(function (item) {
            new Element('div', {
                text:item,
                events:{
                    click:function () {
                        this.date.setFullYear(item);
                        this.refresh();
                    }.bind(this)
                }
            }).inject(this.yearLayer);
        }, this);
        var pre = new Element('div',{
            text:'前一页',
            events:{
                click:function(){
                     this.renderYearLayer(year-10);
                }.bind(this)
            }
        }).inject(this.yearLayer);
        var next = new Element('div',{
            text:'后一页',
            events:{
                click:function(){
                    this.renderYearLayer(year+10);
                }.bind(this)
            }
        }).inject(this.yearLayer);
    }
});