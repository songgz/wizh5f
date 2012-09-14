/**
 * Created with JetBrains RubyMine.
 * User: Administrator
 * Date: 12-9-10
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */

WizUi.TreeMenu = new Class({
    Extends:WizUi.Widget,
    options:{
        //autoEl:'div',
        //className:'tree-menu',
        indent:20
    },
    initialize:function (options) {
        this.parent(options);
    },
    doRender:function () {
        var items = this.el.getElement('ul').getChildren('li');
        items.each(function (item) {
            var li = new WizUi.TreeMenuItem({applyTo:item});
        }, this);
    }
});
