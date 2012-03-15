/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-3-6
 * Time: 下午4:57
 * To change this template use File | Settings | File Templates.
 */

WizUi.View = new Class({
    Extends:WizUi.Widget,
    options:{
        //width: '100%',
        //height: '100%'
    },
    initialize:function (options) {
        this.parent(options);
    },

    setContent:function (method, source) {
        switch (method) {
            case 'ajax' || 'xhr':
                this.setAjaxContent(source);
                break;
            case 'html' || 'content':
                this.setHtmlContent(source);
                break;
        }
        return this;
    },
    setAjaxContent:function (source) {
        var request = new Request.HTML({
            url:source,
            update:this.el,
            method:'get',
            onComplete:function () {
                this.fireEvent('loadComplete');
            }.bind(this)
        }).send();

        return this;
    },
    setHtmlContent:function (source) {
        this.el.set('html', source);
        this.fireEvent('loadComplete');
        return this;
    }
});