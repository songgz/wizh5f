/**
 * Created by JetBrains RubyMine.
 * User: Administrator
 * Date: 12-2-8
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */

var WizUi = {
    version: '0.1',
    fields: {}
};

WizUi.Widget = new Class({
    Implements: [Options,Events],
    options: {
        //container: 'div',
        //el: null,
        //renderTo: null,
        tag: 'div',
        styles:{
            width: '100px',
            height: '100px',
            border:'1px solid red',
            background:'#efffff',
            position:'relative'
        }
    },
    initialize: function(options) {
        this.setOptions(options);
        //this.el = null;
        this.render();
        //this.options.el.inject(this.options.container || $(this.options.container));
    },

    render: function() {
        this.el = new Element(this.options.tag, {
            id: this.getId(),
            styles: this.options.styles
        });
        this.el.inject(this.options.renderTo || $(document.body));

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

    },

    getId: function() {
        return "win";
    },

    show: function() {
        this.el.setStyle('display','');
        //this.el.show();
    },

    hide: function() {
        this.el.setStyle('display','none');
        //this.el.hide(); //setStyle('display', 'hidden');

    },

    toElement: function(){
        return this.el;
    }

});