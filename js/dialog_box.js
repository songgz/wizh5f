/*
 license: MIT-style

 authors:
 - scott (sgz) <sgz@163.com>

 requires:
 - core/1.4.4
 - more/1.4.0.1 Drag
 - more/1.4.0.1 Drag.Move

 provides:
 - DialogBox
 */


WizUi.DialogBox = new Class({
    Extends:WizUi.Widget,
    options:{
        className:'dialog-box',
        resizable:true,
        draggable:true,
        hidden:false,
        width:640,
        height:360,
        'max-height':315,
        title:''
    },
    initialize:function (options) {
        this.parent(options);
    },
    doRender:function () {
        this.buildTitleBar();
        this.buildContent();
        this.buildResizer();
        this.el.position();
        this.el.makeDraggable({'handle':this.titleBar});
    },
    buildTitleBar:function () {
        this.titleBar = new Element('div', {
            'class':'header',
            html:'<h1 class="title">' + this.options.title + '</h1>'
        }).inject(this.el);
        this.closeButton = new Element('a', {
            text:'X',
            href:'#',
            'class':'close-button',
            events:{
                'click':function () {
                    this.hide();
                }.bind(this)
            }
        }).inject(this.titleBar);
    },
    buildResizer:function () {
        this.resizer = new Element('div', {id:'resizer', 'class':'resize'}).inject(this.el);
        this.el.makeResizable({'handle':this.resizer});
    },
    buildContent:function () {
        this.content = new WizUi.View({
            renderTo:this.el,
            'className':'content',
            'max-height':this.options['max-height']
        }).setStyle('max-height', this.options['max-height']).addEvents({
                'loadComplete':function () {
                    this.fireEvent('complete');
                }.bind(this)
            });
    },
    setContent:function (method, source, options) {
        this.content.setContent(method, source, options);
        return this;
    }
});
