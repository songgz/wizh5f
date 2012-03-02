/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-8
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */

var WizUi = {
    version:'0.1',
    build:'',
    skin:'',
    fields:{}
};

Element.implement({
    update:function (options) {
        for (var key in options) {
            switch (key) {
                case 'ajax':
                    var request = new Request.HTML({
                        evalScripts:true,
                        url:options.ajax,
                        method:'get',
                        onComplete:function (responseTree, responseElements, responseHTML, responseJavaScript) {
                            this.set('html', responseHTML);
                        }.bind(this)
                    }).send();

                    break;
                case 'html':
                    this.set('html', options.html);
                    break;
            }
        }
    }
});

WizUi.Widget = new Class({
    Implements:[Options, Events],
    options:{
        //container: 'div',
        //el: null,
        //renderTo: null,
        tag:'div',
        styles:{
            //width: '100px',
            //height: '100px',
            border:'1px solid red',
            background:'#efffff',
            position:'relative'
        }
    },
    initialize:function (options) {
        this.setOptions(options);
        //this.el = null;
        this.render();
        //this.options.el.inject(this.options.container || $(this.options.container));
    },

    render:function () {
        this.el = new Element(this.options.tag, {
            id:this.options.id,
            'class':this.options.className,
            styles:this.options.styles,
            events:this.options.events,
            name:this.options.name,
            html:this.options.html,
            'for':this.options['for']
        });
        this.el.inject(this.options.renderTo || document.body || document.documentElement);
    },

    getId:function () {
        return "wiz" + Math.round(Math.random() * 1000);
    },

    show:function () {
        this.el.setStyle('display', '');
        //this.el.show();
    },

    hide:function () {
        this.el.setStyle('display', 'none');
        //this.el.hide(); //setStyle('display', 'hidden');

    },

    toElement:function () {
        return this.el;
    }

});