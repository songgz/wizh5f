/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-3-3
 * Time: 下午3:27
 * To change this template use File | Settings | File Templates.
 */

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

WizUi.LightBox = new Class({
    Extends:WizUi.Widget,
    options:{
        className:'light-box',
        hidden:true,
        width:640,
        height:360,
        title:''
    },
    initialize:function (options) {
        this.parent(options);
        this.overlay = new WizUi.Overlay(this.getBody());
    },
    doRender:function () {
        this.buildContent();
        this.buildCloseButton();
        this.el.position();
    },
    buildCloseButton:function () {
        this.closeButton = new Element('a', {
            //text:'X',
            href:'#',
            'class':'close-button',
            events:{
                'click':function () {
                    this.hide();
                }.bind(this)
            }
        });
        this.closeButton.inject(this.el);
    },
    buildContent:function () {
        this.content = new WizUi.View({
                    renderTo:this.el,
                    'className':'content'
        });

    },
    show:function () {
        this.overlay.open();
        this.parent();
        return this;
    },
    hide:function () {
        this.parent();
        this.overlay.close();
        return this;
    },
    setContent:function (method, source) {
        this.content.setContent(method, source);
        return this;
    }
});
WizUi.LightBox.getInstance = function (options) {
    this.box = this.box || new window.WizUi.LightBox(options);
    return this.box;
};

