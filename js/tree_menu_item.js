/**
 * Created with JetBrains RubyMine.
 * User: Administrator
 * Date: 12-9-10
 * Time: 下午2:12
 * To change this template use File | Settings | File Templates.
 */

WizUi.TreeMenuItem = new Class({
    Extends:WizUi.Widget,
    options:{
        level:0
    },
    initialize:function (options) {
        this.expanded = true;
        this.parent(options);
        this.span = this.el.getElement('span');
        this.span.setStyle('padding-left', this.options.level * 20);
        this.span.addEvent('click', this.toggle.bind(this));
//        this.span.addEvent('mouseenter', this.mouseEnter.bind(this));
//        this.span.addEvent('mouseleave', this.mouseLeave.bind(this));
        if (this.hasChildren()) {
            this.link = this.el.getElement('a');
            this.link.addClass('_tree_menu_expanded');
            this.buildChildren();
        }
    },
    buildChildren:function () {
        var items = this.el.getElement('ul').getChildren('li');
        var level = this.options.level + 1;
        items.each(function (item) {
            var li = new WizUi.TreeMenuItem({applyTo:item, level:level});
        }, this);
    },
    hasChildren:function () {
        return !!this.el.getElement('ul');
    },
    toggle:function (e) {
        if (this.hasChildren()) {
            e.stop();
            if (this.expanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }
    },
    expand:function () {
        this.el.getElement('ul').show();
        this.link.addClass('_tree_menu_expanded');
        this.link.removeClass('_tree_menu_collapsed');
        this.expanded = true;
    },
    collapse:function () {
        this.el.getElement('ul').hide();
        this.link.addClass('_tree_menu_collapsed');
        this.link.removeClass('_tree_menu_expanded');
        this.expanded = false;
    },
    mouseEnter:function (e) {
        e.stop();
        this.span.addClass('hover');
    },
    mouseLeave:function (e) {
        e.stop();
        this.span.removeClass('hover');
    }
});
