/**
 * model and control base class for kissy
 * @author yiminghe@gmail.com
 */
KISSY.add("component/modelcontrol", function(S, UIBase) {

    function wrapperViewSetter(attrName) {
        return function(value) {
            this.get("view").set(attrName, value);
        };
    }

    /**
     * 不使用 valueFn
     * 只有 render 时需要找到默认，其他时候不需要，防止莫名其妙初始化
     */
    function getDefaultView() {
        // 逐层找默认渲染器
        var self = this,
            c = self.constructor,
            DefaultRender;
        while (c && !DefaultRender) {
            DefaultRender = c['DefaultRender'];
            c = c.superclass && c.superclass.constructor;
        }
        if (DefaultRender) {
            /**
             * 将渲染层初始化所需要的属性，直接构造器设置过去
             */
            var attrs = self.__attrs,cfg = {};
            for (var attrName in attrs) {
                if (attrs.hasOwnProperty(attrName)) {
                    var attrCfg = attrs[attrName],v;
                    if (attrCfg.view
                        // 如果用户没设，不要帮他设 undefined
                        // attribute get 判断是 name in attrs
                        // 使用 get ，属性可以只在控制层设置默认值，如果有有效值，这里通过参数传给 view 层
                        && (v = self.get(attrName)) !== undefined) {
                        cfg[attrName] = v;
                    }
                }
            }
            return new DefaultRender(cfg);
        }
        return 0;
    }

    return UIBase.create([UIBase.Box], {

            /**
             * control 层的渲染 ui 就是 render view
             */
            renderUI:function() {
                var self = this;
                self.get("view").render();
                //then render my children
                var children = self.get("children");
                S.each(children, function(child) {
                    child.render();
                });
            },

            /**
             * 控制层的 createDom 实际上就是调用 view 层的 create 来创建真正的节点
             */
            createDom:function() {
                var self = this;
                /**
                 * 将 view 的属性转发过去
                 * 用户一般实际上只需在一个地点设置
                 */
                var attrs = self.__attrs;
                for (var attrName in attrs) {
                    if (attrs.hasOwnProperty(attrName)) {
                        var attrCfg = attrs[attrName];
                        if (attrCfg.view && !self['_uiSet' + capitalFirst(attrName)]) {
                            self['_uiSet' + capitalFirst(attrName)] = wrapperViewSetter(attrName);
                        }
                    }
                }
                var view = self.get("view") || getDefaultView.call(self);
                if (!view) {
                    S.error("no view for");
                    S.error(self.constructor);
                    return;
                }
                view.create();
                if (!self.get("allowTextSelection_")) {
                    view.get("el").unselectable();
                }
                self.set("view", view);
            },

            /**
             * Returns the DOM element into which child components are to be rendered,
             or null if the container itself hasn't been rendered yet.  Overrides
             */
            getContentElement:function() {
                var view = this.get('view');
                return view && view.getContentElement();
            },



            _initChild:function(c, elBefore) {
                var self = this;
                // If this (parent) component doesn't have a DOM yet, call createDom now
                // to make sure we render the child component's element into the correct
                // parent element (otherwise render_ with a null first argument would
                // render the child into the document body, which is almost certainly not
                // what we want).
                self.create();
                var contentEl = self.getContentElement();
                c.set("parent", self);
                c.set("render", contentEl);
                c.set("elBefore", elBefore);
                // 如果 parent 已经渲染好了子组件也要立即渲染，就 创建 dom ，绑定事件
                if (this.get("rendered")) {
                    c.render();
                }
                // 如果 parent 也没渲染，子组件 create 出来和 parent 节点关联
                // 子组件和 parent 组件一起渲染
                else {
                    // 之前设好属性，view ，logic 同步还没 bind ,create 不是 render ，还没有 bindUI
                    c.create();
                    contentEl[0].insertBefore(c.get("el")[0], elBefore && elBefore[0] || null);

                }
            },

            /**
             *
             * @param c  children to be added
             * @param {int=} index  position to be inserted
             */
            addChild:function(c, index) {
                var self = this,
                    children = self.get("children"),
                    elBefore = children[index];
                if (index) {
                    children.splice(index, 0, c);
                } else {
                    children.push(c);
                }
                self._initChild(c, elBefore);
            },

            removeChild:function(c, destroy) {
                var children = this.get("children"),
                    index = S.indexOf(c, children);
                if (index != -1) {
                    children.splice(index, 1);
                }
                if (destroy) {
                    c.destroy();
                }
            },

            removeChildren:function(destroy) {
                S.each(this.get("children"), function(c) {
                    destroy && c.destroy();
                });
                this.set("children", []);
            },

            getChildAt:function(index) {
                var children = this.get("children");
                return children[index];
            },

            _uiSetHandleMouseEvents:function(v) {
                var self = this,
                    view = self.get("view"),
                    el = view.get("el");
                if (v) {
                    el.on("mouseenter", self._handleMouseEnter, self);
                    el.on("mouseleave", self._handleMouseLeave, self);
                    el.on("mousedown", self._handleMouseDown, self);
                    el.on("mouseup", self._handleMouseUp, self);
                    el.on("click", self._handleClick, self);
                } else {
                    el.detach("mouseenter", self._handleMouseEnter, self);
                    el.detach("mouseleave", self._handleMouseLeave, self);
                    el.detach("mousedown", self._handleMouseDown, self);
                    el.detach("mouseup", self._handleMouseUp, self);
                    el.detach("click", self._handleClick, self);
                }
            },

            isMouseEventWithinElement_:function(e, elem) {
                var relatedTarget = e.relatedTarget;
                relatedTarget = relatedTarget && S.one(relatedTarget)[0];
                if (!relatedTarget) {
                    return false;
                }
                // 在里面或等于自身都不算 mouseenter/leave
                if (relatedTarget === elem[0] || elem.contains(relatedTarget)) {
                    return true;
                }
            },
            _forwordToView:function(method, ev) {
                var self = this,
                    view = self.get("view");
                view[method] && view[method](ev);
            },

            _handleMouseOver:function(e) {
                if (this.get("disabled")) {
                    return true;
                }
                var self = this,
                    view = self.get("view"),
                    el = view.get("el");
                if (!self.isMouseEventWithinElement_(e, el)) {
                    self._handleMouseEnter(e);
                }
            },


            _handleMouseOut:function(e) {
                if (this.get("disabled")) {
                    return true;
                }
                var self = this,
                    view = self.get("view"),
                    el = view.get("el");
                if (!self.isMouseEventWithinElement_(e, el)) {
                    self._handleMouseLeave(e);
                }
            },

            /**
             * root element handler for mouse enter
             * @param ev
             */
            _handleMouseEnter:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                this._forwordToView('_handleMouseEnter', ev);
            },
            /**
             * root element handler for mouse leave
             * @param ev
             */
            _handleMouseLeave:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                this._forwordToView('_handleMouseLeave', ev);
            },
            /**
             * root element handler for mouse down
             * @param ev
             */
            _handleMouseDown:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                this._forwordToView('_handleMouseDown', ev);
                var el = this.getKeyEventTarget();
                // 左键，否则 unselectable 在 ie 下鼠标点击获得不到焦点
                if (ev.which == 1 && el.attr("tabindex") >= 0) {
                    this.getKeyEventTarget()[0].focus();
                }
                // Cancel the default action unless the control allows text selection.
                if (ev.which == 1 && !this.get("allowTextSelection_")) {
                    // firefox 不会引起焦点转移
                    ev.preventDefault();
                }
            },
            /**
             * whether component can receive focus
             */
            _uiSetFocusable:function(v) {
                var self = this,
                    el = self.getKeyEventTarget();
                if (v) {
                    el.on("focus", self._handleFocus, self);
                    el.on("blur", self._handleBlur, self);
                    el.on("keydown", self.__handleKeydown, self);
                } else {
                    el.detach("focus", self._handleFocus, self);
                    el.detach("blur", self._handleBlur, self);
                    el.detach("keydown", self.__handleKeydown, self);
                }
                self.get("view").set("focusable", v);
            },

            /**
             * 焦点所在元素即键盘事件处理元素
             */
            getKeyEventTarget:function() {
                return this.get("view").getKeyEventTarget();
            },
            /**
             * root element handler for mouse up
             * @param ev
             */
            _handleMouseUp:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                this._forwordToView('_handleMouseUp', ev);
            },
            /**
             * root element handler for focus
             * @param ev
             */
            _handleFocus:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                this._forwordToView('_handleFocus', ev);
            },
            /**
             * root element handler for blur
             * @param ev
             */
            _handleBlur:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                this._forwordToView('_handleBlur', ev);
            },

            _handleKeydown:function(ev) {
                this._forwordToView('_handleKeydown', ev);
            },
            /**
             * root element handler for keydown
             * @param ev
             */
            __handleKeydown:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                var self = this,
                    view = self.get("view");
                // 默认情况下空格和 enter 直接交给 click 负责
                if (ev.keyCode == 13 || ev.keyCode == 32) {
                    ev.preventDefault();
                    return self._handleClick(ev);
                } else {
                    return this._handleKeydown(ev);
                }
            },

            /**
             * root element handler for mouse enter
             */
            _handleClick:function(ev) {
                if (this.get("disabled")) {
                    return true;
                }
                this._forwordToView("_handleClick", ev);
            },

            _uiSetDisabled:function(d) {
                var view = this.get("view");
                view.set("disabled", d);
            },

            destructor:function() {
                var self = this;
                var children = self.get("children");
                S.each(children, function(child) {
                    child.destroy();
                });
                var view = self.get("view");
                if (view) {
                    view.destroy();
                }
            }
        },
        {
            ATTRS:{

                // 是否绑定鼠标事件
                handleMouseEvents:{
                    value:true
                },

                // 是否支持焦点处理
                focusable:{
                    value:true
                },

                //子组件
                children:{
                    value:[],
                    setter:function(v) {
                        var self = this;
                        //自动给儿子组件加入父亲链
                        S.each(v, function(c) {
                            self._initChild(c);
                        });
                    }
                },

                //转交给渲染层
                //note1 : 兼容性考虑
                //note2 : 调用者可以完全不需要接触渲染层
                srcNode:{
                    view:true
                },

                // 转交给渲染层
                prefixCls:{
                    view:true,
                    value:"ks-"
                },

                render:{
                    view:true
                },

                // 父组件
                // Parent component to which events will be propagated. 
                parent:{
                },

                //渲染层
                view:{
                },

                //是否禁用
                disabled:{
                    value:false,
                    view:true
                },

                // 是否允许 DOM 结构内的文字选定
                allowTextSelection_:{
                    value:false
                }
            }
        });

    function capitalFirst(s) {
        s = s + '';
        return s.charAt(0).toUpperCase() + s.substring(1);
    }
}, {
    requires:['uibase']
});
/**
 *  Note:
 *  控制层元属性配置中 view 的作用
 *   - 如果没有属性变化处理函数，自动生成属性变化处理函数，自动转发给 view 层
 *   - 如果没有指定 view 层实例，在生成默认 view 实例时，所有用户设置的 view 的属性都转到默认 view 实例中
 **/