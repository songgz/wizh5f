/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-8
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 *
 *
 * requires:
 * - Core/Element.Style
 - /MooTools.More
 */

var WizUi = {
    version:'0.1',
    build:'',
    skin:'',
    fields:{}
};

Element.implement({
    update:function (method, source, options) {
        switch (method) {
            case 'ajax':
                var request = new Request.HTML({
                    evalScripts:true,
                    url:source,
                    method:'get',
                    onComplete:function (responseTree, responseElements, responseHTML, responseJavaScript) {
                        this.set('html', responseHTML);
                    }.bind(this)
                }).send();

                break;
            case 'html':
                this.set('html', source);
                break;
        }
    }

});

WizUi.Widget = new Class({
    Implements:[Options, Events],
    options:{
        //className : '',
        //width   : 0,
        //height  : 0,
        //title   : '',
        //applyTo : '',
        //renderTo: '',
        //resizable : true,
        //draggable : true,
        //renderTo: null,
        //draggable: false,
        //position: null,

        tag:'div',
        hidden:false,
        rendered:false,
        allowDomMove: true,
        styles:{
            //width: '100px',
            //height: '100px',
            border:'1px solid red'
            //background:'#efffff',
            //position:'relative'
        }
    },
    initialize:function (options) {
        this.setOptions(options);
        if (this.options.applyTo) {
            this.applyToMarkup(this.options.applyTo);
            delete this.options.applyTo;
        } else if (this.options.renderTo) {
            this.render(this.options.renderTo);
            delete this.options.renderTo;
        }
    },
    applyToMarkup:function (el) {
        this.el = $(el);
        this.options.allowDomMove = false;
        this.render(this.el.getParent());
    },
    getBody:function () {
        return document.body || document.documentElement;
    },
    render:function (container, position) {
        if (!this.options.rendered) {
            if (!this.el){
                this.el = new Element(this.options.tag, {
                    id:this.options.id,
                    'class':this.options.className,
                    styles:this.options.styles,
                    events:this.options.events,
                    name:this.options.name,
                    html:this.options.html,
                    'for':this.options['for']
                });

            }
            if (this.options.hidden) this.hide();
            if (this.options.width) {
                this.el.setStyle('width', this.options.width);
                delete this.options.width;
            }
            if (this.options.height) {
                this.el.setStyle('height', this.options.height);
                delete this.options.height;
            }
            if (this.options.allowDomMove) this.el.inject(container || this.getBody(), position);
            this.doRender();
            this.options.rendered = true;
        }
        return this;
    },
    doRender: function(){

    },
    getId:function () {
        return "wiz" + Math.round(Math.random() * 1000);
    },

    show:function () {
        //this.el.setStyle('display', '');
        this.el.show();
    },

    hide:function () {
        //this.el.setStyle('display', 'none');
        this.el.hide(); //setStyle('display', 'hidden');

    },

    toElement:function () {
        return this.el;
    }

});