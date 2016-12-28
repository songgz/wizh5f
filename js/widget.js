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

WizUi.Widget = new Class({
    Implements:[Options, Events],
    options:{
        //className : '',
        width   : 100,
        height  : 100,
        //applyTo : '',
        //renderTo: '',
        //resizable : true,
        //draggable : true,
        //renderTo: null,
        //draggable: false,
        //position: null,

        autoEl:'div', //{tag:'div',name:'ss'}
        hidden:false,
        allowDomMove:true
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
    render:function (container, position) {
        if (!this.rendered) {
            this.rendered = true;
            if (!this.el) {
                if (typeOf(this.options.autoEl) == 'string') {
                    this.el = new Element(this.options.autoEl);
                } else {
                    this.el = new Element(this.options.autoEl.tag, this.options.autoEl);
                }
            }
            if (this.options.allowDomMove) this.el.inject(container || this.getBody(), position);

            if (!this.el.get('id')) {
                this.el.set('id', this.getId());
            }
            if (this.options.className) {
                this.el.addClass(this.options.className);
                delete this.options.className;
            }
            if (this.options.styles) {
                this.el.setStyles(this.options.styles);
                delete this.options.styles;
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
            this.doRender();
        }
        return this;
    },
    doRender:function () {

    },
    getId:function () {
        return "wiz" + Math.round(Math.random() * 1000);
    },
    getBody:function () {
        return document.body || document.documentElement;
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
    },

    /*------------Native Mootools Element:----------------------*/
    setStyle:function (style, value) {
        this.el.setStyle(style, value);
        return this;
    },
    getStyle:function (style) {
        return this.el.getStyle(style);
    },
    inject:function (container, position) {
        this.el.inject(container, position);
        return this;
    },
    adopt:function (element) {
        this.el.adopt(element);
        return this;
    },
    addClass:function (className) {
        this.el.addClass(className);
        return this;
    },
    set:function (property, value) {
        this.el.set(property, value);
        return this;
    },
    get:function (property) {
        return this.el.get(property);
    },
    getCoordinates:function (ref) {
        return this.el.getCoordinates(ref);
    },
    destroy:function () {
        this.el.destroy();
        return;
    }

});