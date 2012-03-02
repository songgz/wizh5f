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
        styles:{
            width:'640px',
            height:'360px',
            border:'1px solid red',
            background:'#efffff',
            position:'relative'
        },
        titleBar:{
            styles:{
                height:'20px',
                background:'#dfdfdf',
                'border-bottom':'1px solid red',
                cursor:'move',
                'text-align':'left'
            }
        },
        'resizer':{
            styles:{
                width:'20px',
                height:'20px',
                top:'100%',
                'margin-top':'-20px',
                left:'100%',
                'margin-left':'-20px',
                background:'green',
                position:'absolute',
                cursor:'se-resize'
            }
        }
    },
    initialize:function (options) {
        this.parent(options);
        this.content.update(this.options.load);
    },
    render:function () {
        this.parent();
        this.buildTitleBar();
        this.buildContent();
        this.buildResizer();
        this.el.position();
        this.el.makeDraggable({'handle':this.titleBar});
        this.el.makeResizable({'handle':this.resizer, 'limit':{'x':[220, 400], 'y':[120, 400]}});

    },
    buildTitleBar:function () {
        this.titleBar = new Element('div', {
            html:'<sap>' + this.options.title + '</sap>',
            styles:this.options.titleBar.styles
        });

        this.closeButton = new Element('a',{
            text: 'X',
            href: '#',
            styles: { float:'right', 'font-size': '20px' },
            events:{
                'click': function(){
                    this.hide();
                }.bind(this)
            }
        });
        this.closeButton.inject(this.titleBar);
        this.titleBar.inject(this.el);
    },
    buildResizer:function () {
        this.resizer = new Element('div', {id:'resizer', styles:this.options.resizer.styles});
        this.resizer.inject(this.el);
    },
    buildContent:function () {
        this.content = new Element('div',{class:''});
        this.content.inject(this.el);
    },

    close: function(){
        this.el.dispose();
    }
});

WizUi.DialogBox.overlay = function(options){
    this.box = this.box || new WizUi.DialogBox(options);
    this.box.hide();
}
WizUi.DialogBox.update = function(option){
    this.box.content.update(option);
    this.box.show();
}

//<div id="topbar">window title</div>
//                var topbar = new Element('div',{
//                    id: 'topbar',
//                    html: 'window title',
//                    style: "height:20px;background:#dfdfdf;border-bottom:1px solid red;cursor:move;text-align:center"
//
//                });
//<div id="resizer"></div>
//                var resizer = new Element('div',{id: 'resizer',style:"width:20px;height:20px;top:100%;margin-top:-20px; left:100%; margin-left:-20px;background:green;position:absolute;cursor:se-resize;"});
//                topbar.inject(this.options.el);
//                resizer.inject(this.options.el);
//                this.options.el.makeDraggable({'handle':topbar});
//                this.options.el.makeResizable({'handle':resizer , 'limit':{'x':[220,400], 'y':[120,400]}});
