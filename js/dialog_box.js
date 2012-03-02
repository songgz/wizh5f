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
            width:'250px',
            height:'200px',
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
        this.update({load: 'ajax', url: 'http://www.baidu.com'})
    },
    render:function () {
        this.parent();
        this.buildTitleBar();
        this.buildContent();
        this.buildResizer();
        this.el.makeDraggable({'handle':this.titleBar});
        this.el.makeResizable({'handle':this.resizer, 'limit':{'x':[220, 400], 'y':[120, 400]}});
    },
    buildTitleBar:function () {
        this.titleBar = new Element('div', {
            html:'<sap>' + this.options.title + '</sap>',
            styles:this.options.titleBar.styles
        });
        this.titleBar.inject(this.el);
    },
    buildResizer:function () {
        this.resizer = new Element('div', {id:'resizer', styles:this.options.resizer.styles});
        this.resizer.inject(this.el);
    },
    buildContent:function () {
        this.content = new Element('div');
        this.content.inject(this.el);
    },
    update:function (options) {
        switch (options.load) {
            case 'ajax':
                if (options.url) {
                    var request = new Request.HTML({
                        evalScripts:true,
                        url:options.url,
                        method:'get',
                        onComplete:function (responseTree, responseElements, responseHTML, responseJavaScript) {
                            this.content.set('html', 'responseHTML');
                        }.bind(this)
                    }).send();
                }
                break;
            case 'html':
                break;
        }

    }
});

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
