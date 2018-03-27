var Desktop = Desktop || {};
if (!Desktop.model) {
    Desktop.model = {}
}
if (!Ext.ux.desktop) {
    Ext.ux.desktop = {}
}
(function(H) {
    var K, A = ["constructor", "toString", "valueOf", "toLocaleString"], G = {}, w = {}, I = 0, z, C, u, E, L, F, y, J, D, v = function() {
        var a, b;
        C = Ext.Base;
        u = Ext.ClassManager;
        for (a = A.length; a-- > 0; ) {
            b = (1 << a);
            w[G[b] = A[a]] = b
        }
        for (a in w) {
            I |= w[a]
        }
        I = ~I;
        Function.prototype.$isFunction = 1;
        D = !!(u && u.addAlias);
        E = Ext.Class.getPreprocessor("config").fn;
        L = Ext.Class.getPreprocessor("cachedConfig") && Ext.Class.getPreprocessor("cachedConfig").fn;
        F = Ext.Class.getPreprocessor("platformConfig") && Ext.Class.getPreprocessor("platformConfig").fn;
        J = Ext.Class.getPreprocessor("privates") && Ext.Class.getPreprocessor("privates").fn;
        y = Ext.ClassManager.postprocessors.deprecated && Ext.ClassManager.postprocessors.deprecated.fn;
        K = C.$staticMembers;
        if (!K) {
            K = [];
            for (z in C) {
                if (C.hasOwnProperty(z)) {
                    K.push(z)
                }
            }
        }
        H.derive = B;
        return B.apply(this, arguments)
    }, t = function(a, e, b) {
        var h = b.enumerableMembers, d = a.prototype, f, c, g, i, j;
        if (!e) {
            return
        }
        if (D) {
            a.addMembers(e)
        } else {
            for (f in e) {
                i = e[f];
                if (i && i.$isFunction && !i.$isClass && i !== Ext.emptyFn && i !== Ext.identityFn) {
                    j = d.hasOwnProperty(f) && d[f];
                    if (j) {
                        i.$previous = j
                    }
                    d[f] = c = i;
                    c.$owner = a;
                    c.$name = f
                } else {
                    d[f] = i
                }
            }
            for (g = 1; h; g <<= 1) {
                if (h & g) {
                    h &= ~g;
                    f = G[g];
                    d[f] = c = e[f];
                    c.$owner = a;
                    c.$name = f
                }
            }
        }
    }, x = function(a) {
        var e = function b() {
            return a.apply(this, arguments) || null
        }, c, d;
        e.prototype = Ext.Object.chain(a.prototype);
        for (c = K.length; c-- > 0; ) {
            d = K[c];
            e[d] = C[d]
        }
        return e
    }, B = function(s, am, d, aj, an, p, q, g, ad, n, ag) {
        var ah = function ai() {
            return this.constructor.apply(this, arguments) || null
        }, e = ah, af = {
            enumerableMembers: aj & I,
            onCreated: ag,
            onBeforeCreated: t,
            aliases: g
        }, ab = d.alternateClassName || [], i = Ext.global, m, j, h, ac, k, a, b, aa, l, ak, f, o, ae, c, r = u.alternateToName || u.maps.alternateToName, al = u.nameToAlternates || u.maps.nameToAlternates;
        for (h = K.length; h-- > 0; ) {
            b = K[h];
            ah[b] = C[b]
        }
        if (d.$isFunction) {
            d = d(ah)
        }
        af.data = d;
        ak = d.statics;
        delete d.statics;
        d.$className = s;
        if ("$className"in d) {
            ah.$className = d.$className
        }
        ah.extend(am);
        l = ah.prototype;
        if (an) {
            ah.xtype = d.xtype = an[0];
            l.xtypes = an
        }
        l.xtypesChain = p;
        l.xtypesMap = q;
        d.alias = g;
        e.triggerExtended(ah, d, af);
        if (d.onClassExtended) {
            ah.onExtended(d.onClassExtended, ah);
            delete d.onClassExtended
        }
        if (d.privates && J) {
            J.call(Ext.Class, ah, d)
        }
        if (ak) {
            if (D) {
                ah.addStatics(ak)
            } else {
                for (f in ak) {
                    if (ak.hasOwnProperty(f)) {
                        c = ak[f];
                        if (c && c.$isFunction && !c.$isClass && c !== Ext.emptyFn && c !== Ext.identityFn) {
                            ah[f] = ae = c;
                            ae.$owner = ah;
                            ae.$name = f
                        }
                        ah[f] = c
                    }
                }
            }
        }
        if (d.inheritableStatics) {
            ah.addInheritableStatics(d.inheritableStatics);
            delete d.inheritableStatics
        }
        if (l.onClassExtended) {
            e.onExtended(l.onClassExtended, e);
            delete l.onClassExtended
        }
        if (d.platformConfig && F) {
            F.call(Ext.Class, ah, d);
            delete d.platformConfig
        }
        if (d.config) {
            E.call(Ext.Class, ah, d)
        }
        if (d.cachedConfig && L) {
            L.call(Ext.Class, ah, d);
            delete d.cachedConfig
        }
        if (d.deprecated && y) {
            y.call(Ext.ClassManager, s, ah, d)
        }
        af.onBeforeCreated(ah, af.data, af);
        for (h = 0,
        k = ad && ad.length; h < k; ++h) {
            ah.mixin.apply(ah, ad[h])
        }
        for (h = 0,
        k = g.length; h < k; h++) {
            m = g[h];
            u.setAlias ? u.setAlias(ah, m) : u.addAlias(ah, m)
        }
        if (d.singleton) {
            e = new ah()
        }
        if (!(ab instanceof Array)) {
            ab = [ab]
        }
        o = u.getName(e);
        for (h = 0,
        ac = ab.length; h < ac; h++) {
            j = ab[h];
            u.classes[j] = e;
            if (D) {
                u.addAlternate(ah, j)
            } else {
                if (o) {
                    r[j] = o;
                    ab = al[o] || (al[o] = []);
                    ab.push(j)
                }
            }
        }
        for (h = 0,
        k = n.length; h < k; h += 2) {
            a = n[h];
            if (!a) {
                a = i
            }
            a[n[h + 1]] = e
        }
        u.classes[s] = e;
        if (!D) {
            if (o && o !== s) {
                r[s] = o;
                ab = al[o] || (al[o] = []);
                ab.push(s)
            }
        }
        delete l.alternateClassName;
        if (af.onCreated) {
            af.onCreated.call(e, e)
        }
        if (s) {
            u.triggerCreated(s)
        }
        return e
    };
    H.derive = v
}(Ext.cmd = {}));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Ext.ux.desktop.Desktop", Ext.panel.Panel, {
    activeWindowCls: "ux-desktop-active-win",
    inactiveWindowCls: "ux-desktop-inactive-win",
    lastActiveWindow: null,
    border: false,
    html: "&#160;",
    layout: "fit",
    xTickSize: 1,
    yTickSize: 1,
    app: null,
    shortcuts: null,
    shortcutItemSelector: "div.ux-desktop-shortcut",
    shortcutTpl: ['<tpl for=".">', '<div class="ux-desktop-shortcut" id="{name}-shortcut">', '<div class="ux-desktop-shortcut-icon {iconCls}">', '<img src="', Ext.BLANK_IMAGE_URL, '" title="{name}">', "</div>", '<span class="ux-desktop-shortcut-text">{name}</span>', "</div>", "</tpl>", '<div class="x-clear"></div>'],
    taskbarConfig: null,
    windowMenu: null,
    initComponent: function() {
        var c = this;
        c.windowMenu = new Ext.menu.Menu(c.createWindowMenu());
        c.bbar = c.taskbar = new Ext.ux.desktop.TaskBar(c.taskbarConfig);
        c.taskbar.windowMenu = c.windowMenu;
        c.windows = new Ext.util.MixedCollection();
        c.contextMenu = new Ext.menu.Menu(c.createDesktopMenu());
        c.items = [{
            xtype: "wallpaper",
            id: c.id + "_wallpaper"
        }, c.createDataView()];
        Ext.panel.Panel.prototype.initComponent.call(this);
        c.shortcutsView = c.items.getAt(1);
        c.shortcutsView.on("itemclick", c.onShortcutItemClick, c);
        var d = c.wallpaper;
        c.wallpaper = c.items.getAt(0);
        if (d) {
            c.setWallpaper(d, c.wallpaperStretch)
        }
    },
    afterRender: function() {
        var b = this;
        Ext.panel.Panel.prototype.afterRender.call(this);
        b.el.on("contextmenu", b.onDesktopMenu, b)
    },
    createDataView: function() {
        var b = this;
        return {
            xtype: "dataview",
            overItemCls: "x-view-over",
            trackOver: true,
            itemSelector: b.shortcutItemSelector,
            store: b.shortcuts,
            style: {
                position: "absolute"
            },
            x: 0,
            y: 0,
            tpl: new Ext.XTemplate(b.shortcutTpl)
        }
    },
    createDesktopMenu: function() {
        var c = this
          , d = {
            items: c.contextMenuItems || []
        };
        if (d.items.length) {
            d.items.push("-")
        }
        d.items.push({
            text: "Tile",
            handler: c.tileWindows,
            scope: c,
            minWindows: 1
        }, {
            text: "Cascade",
            handler: c.cascadeWindows,
            scope: c,
            minWindows: 1
        });
        return d
    },
    createWindowMenu: function() {
        var b = this;
        return {
            defaultAlign: "br-tr",
            items: [{
                text: "Restore",
                handler: b.onWindowMenuRestore,
                scope: b
            }, {
                text: "Minimize",
                handler: b.onWindowMenuMinimize,
                scope: b
            }, {
                text: "Maximize",
                handler: b.onWindowMenuMaximize,
                scope: b
            }, "-", {
                text: "Close",
                handler: b.onWindowMenuClose,
                scope: b
            }],
            listeners: {
                beforeshow: b.onWindowMenuBeforeShow,
                hide: b.onWindowMenuHide,
                scope: b
            }
        }
    },
    onDesktopMenu: function(d) {
        var e = this
          , f = e.contextMenu;
        d.stopEvent();
        if (!f.rendered) {
            f.on("beforeshow", e.onDesktopMenuBeforeShow, e)
        }
        f.showAt(d.getXY());
        f.doConstrain()
    },
    onDesktopMenuBeforeShow: function(f) {
        var d = this
          , e = d.windows.getCount();
        f.items.each(function(a) {
            var b = a.minWindows || 0;
            a.setDisabled(e < b)
        })
    },
    onShortcutItemClick: function(h, g) {
        var j = this
          , f = j.app.getModule(g.data.module)
          , i = f && f.createWindow();
        if (i) {
            j.restoreWindow(i)
        }
    },
    onWindowClose: function(c) {
        var d = this;
        d.windows.remove(c);
        d.taskbar.removeTaskButton(c.taskButton);
        d.updateActiveWindow()
    },
    onWindowMenuBeforeShow: function(f) {
        var e = f.items.items
          , d = f.theWin;
        e[0].setDisabled(d.maximized !== true && d.hidden !== true);
        e[1].setDisabled(d.minimized === true);
        e[2].setDisabled(d.maximized === true || d.hidden === true)
    },
    onWindowMenuClose: function() {
        var d = this
          , c = d.windowMenu.theWin;
        c.close()
    },
    onWindowMenuHide: function(b) {
        Ext.defer(function() {
            b.theWin = null
        }, 1)
    },
    onWindowMenuMaximize: function() {
        var d = this
          , c = d.windowMenu.theWin;
        c.maximize();
        c.toFront()
    },
    onWindowMenuMinimize: function() {
        var d = this
          , c = d.windowMenu.theWin;
        c.minimize()
    },
    onWindowMenuRestore: function() {
        var d = this
          , c = d.windowMenu.theWin;
        d.restoreWindow(c)
    },
    getWallpaper: function() {
        return this.wallpaper.wallpaper
    },
    setTickSize: function(f, j) {
        var h = this
          , g = h.xTickSize = f
          , i = h.yTickSize = (arguments.length > 1) ? j : g;
        h.windows.each(function(b) {
            var c = b.dd
              , a = b.resizer;
            c.xTickSize = g;
            c.yTickSize = i;
            a.widthIncrement = g;
            a.heightIncrement = i
        })
    },
    setWallpaper: function(c, d) {
        this.wallpaper.setWallpaper(c, d);
        return this
    },
    cascadeWindows: function() {
        var e = 0
          , f = 0
          , d = this.getDesktopZIndexManager();
        d.eachBottomUp(function(a) {
            if (a.isWindow && a.isVisible() && !a.maximized) {
                a.setPosition(e, f);
                e += 20;
                f += 20
            }
        })
    },
    createWindow: function(j, f) {
        var i = this, h, g = Ext.applyIf(j || {}, {
            stateful: false,
            isWindow: true,
            constrainHeader: true,
            minimizable: true,
            maximizable: true
        });
        f = f || Ext.window.Window;
        h = i.add(new f(g));
        i.windows.add(h);
        h.taskButton = i.taskbar.addTaskButton(h);
        h.animateTarget = h.taskButton.el;
        h.on({
            activate: i.updateActiveWindow,
            beforeshow: i.updateActiveWindow,
            deactivate: i.updateActiveWindow,
            minimize: i.minimizeWindow,
            destroy: i.onWindowClose,
            scope: i
        });
        h.on({
            boxready: function() {
                h.dd.xTickSize = i.xTickSize;
                h.dd.yTickSize = i.yTickSize;
                if (h.resizer) {
                    h.resizer.widthIncrement = i.xTickSize;
                    h.resizer.heightIncrement = i.yTickSize
                }
            },
            single: true
        });
        h.doClose = function() {
            h.doClose = Ext.emptyFn;
            h.el.disableShadow();
            h.el.fadeOut({
                listeners: {
                    afteranimate: function() {
                        h.destroy()
                    }
                }
            })
        }
        ;
        return h
    },
    getActiveWindow: function() {
        var c = null
          , d = this.getDesktopZIndexManager();
        if (d) {
            d.eachTopDown(function(a) {
                if (a.isWindow && !a.hidden) {
                    c = a;
                    return false
                }
                return true
            })
        }
        return c
    },
    getDesktopZIndexManager: function() {
        var b = this.windows;
        return (b.getCount() && b.getAt(0).zIndexManager) || null
    },
    getWindow: function(b) {
        return this.windows.get(b)
    },
    minimizeWindow: function(b) {
        b.minimized = true;
        b.hide()
    },
    restoreWindow: function(b) {
        if (b.isVisible()) {
            b.restore();
            b.toFront()
        } else {
            b.show()
        }
        return b
    },
    tileWindows: function() {
        var f = this
          , h = f.body.getWidth(true);
        var g = f.xTickSize
          , i = f.yTickSize
          , j = i;
        f.windows.each(function(a) {
            if (a.isVisible() && !a.maximized) {
                var b = a.el.getWidth();
                if (g > f.xTickSize && g + b > h) {
                    g = f.xTickSize;
                    i = j
                }
                a.setPosition(g, i);
                g += b + f.xTickSize;
                j = Math.max(j, i + a.el.getHeight() + f.yTickSize)
            }
        })
    },
    updateActiveWindow: function() {
        var d = this
          , f = d.getActiveWindow()
          , e = d.lastActiveWindow;
        if (e && e.destroyed) {
            d.lastActiveWindow = null;
            return
        }
        if (f === e) {
            return
        }
        if (e) {
            if (e.el.dom) {
                e.addCls(d.inactiveWindowCls);
                e.removeCls(d.activeWindowCls)
            }
            e.active = false
        }
        d.lastActiveWindow = f;
        if (f) {
            f.addCls(d.activeWindowCls);
            f.removeCls(d.inactiveWindowCls);
            f.minimized = false;
            f.active = true
        }
        d.taskbar.setActiveButton(f && f.taskButton)
    }
}, 0, ["desktop"], ["component", "box", "container", "panel", "desktop"], {
    component: true,
    box: true,
    container: true,
    panel: true,
    desktop: true
}, ["widget.desktop"], 0, [Ext.ux.desktop, "Desktop"], 0));
(Ext.cmd.derive("Ext.ux.desktop.App", Ext.Base, {
    isReady: false,
    modules: null,
    useQuickTips: true,
    constructor: function(d) {
        var c = this;
        c.mixins.observable.constructor.call(this, d);
        if (Ext.isReady) {
            Ext.Function.defer(c.init, 10, c)
        } else {
            Ext.onReady(c.init, c)
        }
    },
    init: function() {
        var c = this, d;
        if (c.useQuickTips) {
            Ext.QuickTips.init()
        }
        c.modules = c.getModules();
        if (c.modules) {
            c.initModules(c.modules)
        }
        d = c.getDesktopConfig();
        c.desktop = new Ext.ux.desktop.Desktop(d);
        c.viewport = new Ext.container.Viewport({
            layout: "fit",
            items: [c.desktop]
        });
        Ext.getWin().on("beforeunload", c.onUnload, c);
        c.isReady = true;
        c.fireEvent("ready", c)
    },
    getDesktopConfig: function() {
        var c = this
          , d = {
            app: c,
            taskbarConfig: c.getTaskbarConfig()
        };
        Ext.apply(d, c.desktopConfig);
        return d
    },
    getModules: Ext.emptyFn,
    getStartConfig: function() {
        var d = this, e = {
            app: d,
            menu: []
        }, f;
        Ext.apply(e, d.startConfig);
        Ext.each(d.modules, function(a) {
            f = a.launcher;
            if (f) {
                f.handler = f.handler || Ext.bind(d.createWindow, d, [a]);
                e.menu.push(a.launcher)
            }
        });
        return e
    },
    createWindow: function(d) {
        var c = d.createWindow();
        c.show()
    },
    getTaskbarConfig: function() {
        var c = this
          , d = {
            app: c,
            startConfig: c.getStartConfig()
        };
        Ext.apply(d, c.taskbarConfig);
        return d
    },
    initModules: function(d) {
        var c = this;
        Ext.each(d, function(a) {
            a.app = c
        })
    },
    getModule: function(i) {
        var j = this.modules;
        for (var h = 0, f = j.length; h < f; h++) {
            var g = j[h];
            if (g.id == i || g.appType == i) {
                return g
            }
        }
        return null
    },
    onReady: function(c, d) {
        if (this.isReady) {
            c.call(d, this)
        } else {
            this.on({
                ready: c,
                scope: d,
                single: true
            })
        }
    },
    getDesktop: function() {
        return this.desktop
    },
    onUnload: function(b) {
        if (this.fireEvent("beforeunload", this) === false) {
            b.stopEvent()
        }
    }
}, 1, 0, 0, 0, 0, [["observable", Ext.util.Observable]], [Ext.ux.desktop, "App"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Ext.ux.desktop.Module", Ext.Base, {
    constructor: function(b) {
        this.mixins.observable.constructor.call(this, b);
        this.init()
    },
    init: Ext.emptyFn
}, 1, 0, 0, 0, 0, [["observable", Ext.util.Observable]], [Ext.ux.desktop, "Module"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Ext.ux.desktop.ShortcutModel", Ext.data.Model, {
    fields: [{
        name: "name",
        convert: Ext.String.createVarName
    }, {
        name: "iconCls"
    }, {
        name: "module"
    }]
}, 0, 0, 0, 0, 0, 0, [Ext.ux.desktop, "ShortcutModel"], 0));
(Ext.cmd.derive("Ext.ux.desktop.StartMenu", Ext.menu.Menu, {
    baseCls: "x-panel",
    cls: "x-menu ux-start-menu",
    bodyCls: "ux-start-menu-body",
    defaultAlign: "bl-tl",
    iconCls: "user",
    bodyBorder: true,
    width: 300,
    initComponent: function() {
        var b = this;
        b.layout.align = "stretch";
        b.items = b.menu;
        Ext.menu.Menu.prototype.initComponent.call(this);
        b.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: "right",
            cls: "ux-start-menu-toolbar",
            vertical: true,
            width: 100,
            layout: {
                align: "stretch"
            }
        }, b.toolConfig));
        b.addDocked(b.toolbar);
        delete b.toolItems
    },
    addMenuItem: function() {
        var b = this.menu;
        b.add.apply(b, arguments)
    },
    addToolItem: function() {
        var b = this.toolbar;
        b.add.apply(b, arguments)
    }
}, 0, 0, ["component", "box", "container", "panel", "menu"], {
    component: true,
    box: true,
    container: true,
    panel: true,
    menu: true
}, 0, 0, [Ext.ux.desktop, "StartMenu"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Ext.ux.desktop.TaskBar", Ext.toolbar.Toolbar, {
    cls: "ux-taskbar",
    startBtnText: "Start",
    initComponent: function() {
        var b = this;
        b.startMenu = new Ext.ux.desktop.StartMenu(b.startConfig);
        b.quickStart = new Ext.toolbar.Toolbar(b.getQuickStart());
        b.windowBar = new Ext.toolbar.Toolbar(b.getWindowBarConfig());
        b.tray = new Ext.toolbar.Toolbar(b.getTrayConfig());
        b.items = [{
            xtype: "button",
            cls: "ux-start-button",
            iconCls: "ux-start-button-icon",
            menu: b.startMenu,
            menuAlign: "bl-tl",
            text: b.startBtnText
        }, b.quickStart, {
            xtype: "splitter",
            html: "&#160;",
            height: 14,
            width: 2,
            cls: "x-toolbar-separator x-toolbar-separator-horizontal"
        }, b.windowBar, "-", b.tray];
        Ext.toolbar.Toolbar.prototype.initComponent.call(this)
    },
    afterLayout: function() {
        var b = this;
        Ext.toolbar.Toolbar.prototype.afterLayout.call(this);
        b.windowBar.el.on("contextmenu", b.onButtonContextMenu, b)
    },
    getQuickStart: function() {
        var c = this
          , d = {
            minWidth: 20,
            width: Ext.themeName === "neptune" ? 70 : 60,
            items: [],
            enableOverflow: true
        };
        Ext.each(this.quickStart, function(a) {
            d.items.push({
                tooltip: {
                    text: a.name,
                    align: "bl-tl"
                },
                overflowText: a.name,
                iconCls: a.iconCls,
                module: a.module,
                handler: c.onQuickStartClick,
                scope: c
            })
        });
        return d
    },
    getTrayConfig: function() {
        var b = {
            items: this.trayItems
        };
        delete this.trayItems;
        return b
    },
    getWindowBarConfig: function() {
        return {
            flex: 1,
            cls: "ux-desktop-windowbar",
            items: ["&#160;"],
            layout: {
                overflowHandler: "Scroller"
            }
        }
    },
    getWindowBtnFromEl: function(d) {
        var c = this.windowBar.getChildByElement(d);
        return c || null
    },
    onQuickStartClick: function(d) {
        var e = this.app.getModule(d.module), f;
        if (e) {
            f = e.createWindow();
            f.show()
        }
    },
    onButtonContextMenu: function(g) {
        var h = this
          , e = g.getTarget()
          , f = h.getWindowBtnFromEl(e);
        if (f) {
            g.stopEvent();
            h.windowMenu.theWin = f.win;
            h.windowMenu.showBy(e)
        }
    },
    onWindowBtnClick: function(d) {
        var c = d.win;
        if (c.minimized || c.hidden) {
            d.disable();
            c.show(null, function() {
                d.enable()
            })
        } else {
            if (c.active) {
                d.disable();
                c.on("hide", function() {
                    d.enable()
                }, null, {
                    single: true
                });
                c.minimize()
            } else {
                c.toFront()
            }
        }
    },
    addTaskButton: function(f) {
        var e = {
            iconCls: f.iconCls,
            enableToggle: true,
            toggleGroup: "all",
            width: 140,
            margin: "0 2 0 3",
            text: Ext.util.Format.ellipsis(f.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: f
        };
        var d = this.windowBar.add(e);
        d.toggle(true);
        return d
    },
    removeTaskButton: function(e) {
        var f, d = this;
        d.windowBar.items.each(function(a) {
            if (a === e) {
                f = a
            }
            return !f
        });
        if (f) {
            d.windowBar.remove(f)
        }
        return f
    },
    setActiveButton: function(b) {
        if (b) {
            b.toggle(true)
        } else {
            this.windowBar.items.each(function(a) {
                if (a.isButton) {
                    a.toggle(false)
                }
            })
        }
    }
}, 0, ["taskbar"], ["component", "box", "container", "toolbar", "taskbar"], {
    component: true,
    box: true,
    container: true,
    toolbar: true,
    taskbar: true
}, ["widget.taskbar"], 0, [Ext.ux.desktop, "TaskBar"], 0));
(Ext.cmd.derive("Ext.ux.desktop.TrayClock", Ext.toolbar.TextItem, {
    cls: "ux-desktop-trayclock",
    html: "&#160;",
    timeFormat: "g:i A",
    tpl: "{time}",
    initComponent: function() {
        var b = this;
        Ext.toolbar.TextItem.prototype.initComponent.call(this);
        if (typeof (b.tpl) == "string") {
            b.tpl = new Ext.XTemplate(b.tpl)
        }
    },
    afterRender: function() {
        var b = this;
        Ext.Function.defer(b.updateTime, 100, b);
        Ext.toolbar.TextItem.prototype.afterRender.call(this)
    },
    doDestroy: function() {
        var b = this;
        if (b.timer) {
            window.clearTimeout(b.timer);
            b.timer = null
        }
        Ext.toolbar.TextItem.prototype.doDestroy.call(this)
    },
    updateTime: function() {
        var e = this
          , d = Ext.Date.format(new Date(), e.timeFormat)
          , f = e.tpl.apply({
            time: d
        });
        if (e.lastText != f) {
            e.setText(f);
            e.lastText = f
        }
        e.timer = Ext.Function.defer(e.updateTime, 10000, e)
    }
}, 0, ["trayclock"], ["component", "box", "tbitem", "tbtext", "trayclock"], {
    component: true,
    box: true,
    tbitem: true,
    tbtext: true,
    trayclock: true
}, ["widget.trayclock"], 0, [Ext.ux.desktop, "TrayClock"], 0));
/*!
* Ext JS Library
* Copyright(c) 2006-2015 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/
(Ext.cmd.derive("Ext.ux.desktop.Video", Ext.panel.Panel, {
    layout: "fit",
    autoplay: false,
    controls: true,
    bodyStyle: "background-color:#000;color:#fff",
    html: "",
    tpl: ['<video id="{id}-video" autoPlay="{autoplay}" controls="{controls}" poster="{poster}" start="{start}" loopstart="{loopstart}" loopend="{loopend}" autobuffer="{autobuffer}" loop="{loop}" style="width:100%;height:100%">', '<tpl for="src">', '<source src="{src}" type="{type}"/>', "</tpl>", "{html}", "</video>"],
    initComponent: function() {
        var j = this, i, l, g, k;
        if (j.fallbackHTML) {
            i = j.fallbackHTML
        } else {
            i = "Your browser does not support HTML5 Video. ";
            if (Ext.isChrome) {
                i += "Upgrade Chrome."
            } else {
                if (Ext.isGecko) {
                    i += "Upgrade to Firefox 3.5 or newer."
                } else {
                    var h = '<a href="http://www.google.com/chrome">Chrome</a>';
                    i += 'Please try <a href="http://www.mozilla.com">Firefox</a>';
                    if (Ext.isIE) {
                        i += ", " + h + ' or <a href="http://www.apple.com/safari/">Safari</a>.'
                    } else {
                        i += " or " + h + "."
                    }
                }
            }
        }
        j.fallbackHTML = i;
        g = j.data = Ext.copyTo({
            tag: "video",
            html: i
        }, j, "id,poster,start,loopstart,loopend,playcount,autobuffer,loop");
        if (j.autoplay) {
            g.autoplay = 1
        }
        if (j.controls) {
            g.controls = 1
        }
        if (Ext.isArray(j.src)) {
            g.src = j.src
        } else {
            g.src = [{
                src: j.src
            }]
        }
        Ext.panel.Panel.prototype.initComponent.call(this)
    },
    afterRender: function() {
        var b = this;
        Ext.panel.Panel.prototype.afterRender.call(this);
        b.video = b.body.getById(b.id + "-video");
        el = b.video.dom;
        b.supported = (el && el.tagName.toLowerCase() == "video");
        if (b.supported) {
            b.video.on("error", b.onVideoError, b)
        }
    },
    getFallback: function() {
        return '<h1 style="background-color:#ff4f4f;padding: 10px;">' + this.fallbackHTML + "</h1>"
    },
    onVideoError: function() {
        var b = this;
        b.video.remove();
        b.supported = false;
        b.body.createChild(b.getFallback())
    },
    doDestroy: function() {
        var f = this;
        var d = f.video;
        if (f.supported && d) {
            var e = d.dom;
            if (e && e.pause) {
                e.pause()
            }
            d.remove();
            f.video = null
        }
        Ext.panel.Panel.prototype.doDestroy.call(this)
    }
}, 0, ["video"], ["component", "box", "container", "panel", "video"], {
    component: true,
    box: true,
    container: true,
    panel: true,
    video: true
}, ["widget.video"], 0, [Ext.ux.desktop, "Video"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Ext.ux.desktop.Wallpaper", Ext.Component, {
    cls: "ux-wallpaper",
    html: '<img src="' + Ext.BLANK_IMAGE_URL + '">',
    stretch: false,
    wallpaper: null,
    stateful: true,
    stateId: "desk-wallpaper",
    afterRender: function() {
        var b = this;
        Ext.Component.prototype.afterRender.call(this);
        b.setWallpaper(b.wallpaper, b.stretch)
    },
    applyState: function() {
        var c = this
          , d = c.wallpaper;
        Ext.Component.prototype.applyState.apply(this, arguments);
        if (d != c.wallpaper) {
            c.setWallpaper(c.wallpaper)
        }
    },
    getState: function() {
        return this.wallpaper && {
            wallpaper: this.wallpaper
        }
    },
    setWallpaper: function(f, g) {
        var j = this, h, i;
        j.stretch = (g !== false);
        j.wallpaper = f;
        if (j.rendered) {
            h = j.el.dom.firstChild;
            if (!f || f == Ext.BLANK_IMAGE_URL) {
                Ext.fly(h).hide()
            } else {
                if (j.stretch) {
                    h.src = f;
                    j.el.removeCls("ux-wallpaper-tiled");
                    Ext.fly(h).setStyle({
                        width: "100%",
                        height: "100%"
                    }).show()
                } else {
                    Ext.fly(h).hide();
                    i = "url(" + f + ")";
                    j.el.addCls("ux-wallpaper-tiled")
                }
            }
            j.el.setStyle({
                backgroundImage: i || ""
            });
            if (j.stateful) {
                j.saveState()
            }
        }
        return j
    }
}, 0, ["wallpaper"], ["component", "box", "wallpaper"], {
    component: true,
    box: true,
    wallpaper: true
}, ["widget.wallpaper"], 0, [Ext.ux.desktop, "Wallpaper"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Desktop.AccordionWindow", Ext.ux.desktop.Module, {
    id: "acc-win",
    init: function() {
        this.launcher = {
            text: "Accordion Window",
            iconCls: "accordion"
        }
    },
    createTree: function() {
        var b = Ext.create("Ext.tree.Panel", {
            id: "im-tree",
            title: "Online Users",
            rootVisible: false,
            lines: false,
            scrollable: true,
            tools: [{
                type: "refresh",
                listeners: {
                    buffer: 300,
                    click: function(c, f) {
                        b.setLoading(true, b.body);
                        var a = b.getRootNode();
                        a.collapseChildren(true, false);
                        Ext.Function.defer(function() {
                            b.setLoading(false);
                            a.expand(true, true)
                        }, 1000)
                    }
                }
            }],
            store: Ext.create("Ext.data.TreeStore", {
                root: {
                    text: "Online",
                    expanded: true,
                    children: [{
                        text: "Friends",
                        expanded: true,
                        children: [{
                            text: "Brian",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Kevin",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Mark",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Matt",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Michael",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Mike Jr",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Mike Sr",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "JR",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Rich",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Nige",
                            iconCls: "user",
                            leaf: true
                        }, {
                            text: "Zac",
                            iconCls: "user",
                            leaf: true
                        }]
                    }, {
                        text: "Family",
                        expanded: true,
                        children: [{
                            text: "Kiana",
                            iconCls: "user-girl",
                            leaf: true
                        }, {
                            text: "Aubrey",
                            iconCls: "user-girl",
                            leaf: true
                        }, {
                            text: "Cale",
                            iconCls: "user-kid",
                            leaf: true
                        }]
                    }]
                }
            })
        });
        debugger;
        return b
    },
    createWindow: function() {
        var c = this.app.getDesktop();
        var d = c.getWindow("acc-win");
        if (!d) {
            d = c.createWindow({
                id: "acc-win",
                title: "Accordion Window",
                width: 250,
                height: 400,
                iconCls: "accordion",
                animCollapse: false,
                constrainHeader: true,
                bodyBorder: Ext.themeName !== "neptune",
                tbar: {
                    xtype: "toolbar",
                    ui: "plain",
                    items: [{
                        tooltip: {
                            title: "Rich Tooltips",
                            text: "Let your users know what they can do!"
                        },
                        iconCls: "connect"
                    }, "-", {
                        tooltip: "Add a new user",
                        iconCls: "user-add"
                    }, " ", {
                        tooltip: "Remove the selected user",
                        iconCls: "user-delete"
                    }]
                },
                layout: "accordion",
                border: false,
                items: [this.createTree(), {
                    title: "Settings",
                    html: "<p>Something useful would be in here.</p>",
                    scrollable: true
                }, {
                    title: "Even More Stuff",
                    html: "<p>Something useful would be in here.</p>"
                }, {
                    title: "My Stuff",
                    html: "<p>Something useful would be in here.</p>"
                }]
            })
        }
        return d
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "AccordionWindow"], 0));
/*!
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/
(Ext.cmd.derive("Desktop.VideoWindow", Ext.ux.desktop.Module, {
    id: "video",
    windowId: "video-window",
    tipWidth: 160,
    tipHeight: 96,
    init: function() {
        this.launcher = {
            text: "About Ext JS",
            iconCls: "video"
        }
    },
    createWindow: function() {
        var e = this
          , f = e.app.getDesktop()
          , d = f.getWindow(e.windowId);
        if (!d) {
            d = f.createWindow({
                id: e.windowId,
                title: "About Ext JS",
                width: 740,
                height: 480,
                iconCls: "video",
                animCollapse: false,
                border: false,
                layout: "fit",
                items: [{
                    xtype: "video",
                    id: "video-player",
                    src: [{
                        src: "http://dev.sencha.com/desktopvideo.mp4",
                        type: "video/mp4"
                    }, {
                        src: "http://dev.sencha.com/desktopvideo.ogv",
                        type: "video/ogg"
                    }, {
                        src: "http://dev.sencha.com/desktopvideo.mov",
                        type: "video/quicktime"
                    }],
                    poster: "http://b.vimeocdn.com/ts/148/397/148397103_640.jpg",
                    autobuffer: true,
                    autoplay: true,
                    controls: true,
                    listeners: {
                        afterrender: function(a) {
                            e.videoEl = a.video.dom;
                            if (a.supported) {
                                e.tip = new Ext.tip.ToolTip({
                                    anchor: "bottom",
                                    dismissDelay: 0,
                                    height: e.tipHeight,
                                    width: e.tipWidth,
                                    renderTpl: ['<canvas width="', e.tipWidth, '" height="', e.tipHeight, '">'],
                                    renderSelectors: {
                                        body: "canvas"
                                    },
                                    listeners: {
                                        afterrender: e.onTooltipRender,
                                        show: e.renderPreview,
                                        scope: e
                                    }
                                })
                            }
                        }
                    }
                }],
                listeners: {
                    beforedestroy: function() {
                        e.tip = e.ctx = e.videoEl = null
                    }
                }
            })
        }
        if (e.tip) {
            e.tip.setTarget(d.taskButton.el)
        }
        return d
    },
    onTooltipRender: function(f) {
        var e = f.body.dom
          , d = this;
        d.ctx = e.getContext && e.getContext("2d")
    },
    renderPreview: function() {
        var d = this;
        if ((d.tip && !d.tip.isVisible()) || !d.videoEl) {
            return
        }
        if (d.ctx) {
            try {
                d.ctx.drawImage(d.videoEl, 0, 0, d.tipWidth, d.tipHeight)
            } catch (c) {}
        }
        Ext.Function.defer(d.renderPreview, 20, d)
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "VideoWindow"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Desktop.GridWindow", Ext.ux.desktop.Module, {
    id: "grid-win",
    init: function() {
        this.launcher = {
            text: "Grid Window",
            iconCls: "icon-grid"
        }
    },
    createWindow: function() {
        var c = this.app.getDesktop();
        var d = c.getWindow("grid-win");
        if (!d) {
            debugger;
            d = c.createWindow({
                id: "grid-win",
                title: "Grid Window",
                width: 740,
                height: 480,
                iconCls: "icon-grid",
                animCollapse: false,
                constrainHeader: true,
                layout: "fit",
                items: [{
                    border: false,
                    xtype: "grid",
                    store: new Ext.data.ArrayStore({
                        fields: [{
                            name: "company",
                        }, {
                            name: "price",
                            type: "float"
                        }, {
                            name: "change",
                            type: "float"
                        }, {
                            name: "pctChange",
                            type: "float"
                        }],
                        data: Desktop.GridWindow.getDummyData()
                    }),
                    columns: [new Ext.grid.RowNumberer(), {
                        text: "Company",
                        flex: 1,
                        sortable: true,
                        dataIndex: "company",
                        align: 'left'
                    }, {
                        text: "Price",
                        width: 70,
                        sortable: true,
                        renderer: Ext.util.Format.usMoney,
                        dataIndex: "price"
                    }, {
                        text: "Change",
                        width: 70,
                        sortable: true,
                        dataIndex: "change"
                    }, {
                        text: "% Change",
                        width: 70,
                        sortable: true,
                        dataIndex: "pctChange"
                    }]
                }],
                tbar: [{
                    text: "Add Something",
                    tooltip: "Add a new row",
                    iconCls: "add"
                }, "-", {
                    text: "Options",
                    tooltip: "Modify options",
                    iconCls: "option"
                }, "-", {
                    text: "Remove Something",
                    tooltip: "Remove the selected item",
                    iconCls: "remove"
                }]
            })
        }
        return d
    },
    statics: {
        getDummyData: function() {
            return [["3m Co", 71.72, 0.02, 0.03], ["Alcoa Inc", 29.01, 0.42, 1.47], ["American Express Company", 52.55, 0.01, 0.02], ["American International Group, Inc.", 64.13, 0.31, 0.49], ["AT&T Inc.", 31.61, -0.48, -1.54], ["Caterpillar Inc.", 67.27, 0.92, 1.39], ["Citigroup, Inc.", 49.37, 0.02, 0.04], ["Exxon Mobil Corp", 68.1, -0.43, -0.64], ["General Electric Company", 34.14, -0.08, -0.23], ["General Motors Corporation", 30.27, 1.09, 3.74], ["Hewlett-Packard Co.", 36.53, -0.03, -0.08], ["Honeywell Intl Inc", 38.77, 0.05, 0.13], ["Intel Corporation", 19.88, 0.31, 1.58], ["Johnson & Johnson", 64.72, 0.06, 0.09], ["Merck & Co., Inc.", 40.96, 0.41, 1.01], ["Microsoft Corporation", 25.84, 0.14, 0.54], ["The Coca-Cola Company", 45.07, 0.26, 0.58], ["The Procter & Gamble Company", 61.91, 0.01, 0.02], ["Wal-Mart Stores, Inc.", 45.45, 0.73, 1.63], ["Walt Disney Company (The) (Holding Company)", 29.89, 0.24, 0.81]]
        }
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "GridWindow"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Desktop.TabWindow", Ext.ux.desktop.Module, {
    id: "tab-win",
    init: function() {
        this.launcher = {
            text: "Tab Window",
            iconCls: "tabs"
        }
    },
    createWindow: function() {
        var c = this.app.getDesktop();
        var d = c.getWindow("tab-win");
        if (!d) {
            d = c.createWindow({
                id: "tab-win",
                title: "Tab Window",
                width: 740,
                height: 480,
                iconCls: "tabs",
                animCollapse: false,
                border: false,
                constrainHeader: true,
                layout: "fit",
                items: [{
                    xtype: "tabpanel",
                    activeTab: 0,
                    bodyStyle: "padding: 5px;",
                    items: [{
                        title: "Tab Text 1",
                        header: false,
                        html: "<p>Something useful would be in here.</p>",
                        border: false
                    }, {
                        title: "Tab Text 2",
                        header: false,
                        html: "<p>Something useful would be in here.</p>",
                        border: false
                    }, {
                        title: "Tab Text 3",
                        header: false,
                        html: "<p>Something useful would be in here.</p>",
                        border: false
                    }, {
                        title: "Tab Text 4",
                        header: false,
                        html: "<p>Something useful would be in here.</p>",
                        border: false
                    }]
                }]
            })
        }
        return d
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "TabWindow"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Desktop.Notepad", Ext.ux.desktop.Module, {
    id: "notepad",
    init: function() {
        this.launcher = {
            text: "Notepad",
            iconCls: "notepad"
        }
    },
    createWindow: function() {
        var c = this.app.getDesktop();
        var d = c.getWindow("notepad");
        if (!d) {
            d = c.createWindow({
                id: "notepad",
                title: "Notepad",
                width: 600,
                height: 400,
                iconCls: "notepad",
                animCollapse: false,
                border: false,
                hideMode: "offsets",
                layout: "fit",
                items: [{
                    xtype: "htmleditor",
                    id: "notepad-editor",
                    value: ['Some <b>rich</b> <span style="color: rgb(255, 0, 0)">text</span> goes <u>here</u><br>', "Give it a try!"].join("")
                }]
            })
        }
        return d
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "Notepad"], 0));
/*!
* Ext JS Library
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/
var windowIndex = 0;
(Ext.cmd.derive("Desktop.BogusModule", Ext.ux.desktop.Module, {
    init: function() {
        this.launcher = {
            text: "Window " + (++windowIndex),
            iconCls: "bogus",
            handler: this.createWindow,
            scope: this,
            windowId: windowIndex
        }
    },
    createWindow: function(d) {
        var f = this.app.getDesktop();
        var e = f.getWindow("bogus" + d.windowId);
        if (!e) {
            e = f.createWindow({
                id: "bogus" + d.windowId,
                title: d.text,
                width: 640,
                height: 480,
                html: "<p>Something useful would be in here.</p>",
                iconCls: "bogus",
                animCollapse: false,
                constrainHeader: true
            })
        }
        e.show();
        return e
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "BogusModule"], 0));
/*!
* Ext JS Library
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/
(Ext.cmd.derive("Desktop.BogusMenuModule", Desktop.BogusModule, {
    init: function() {
        this.launcher = {
            text: "More items",
            iconCls: "bogus",
            handler: function() {
                return false
            },
            menu: {
                items: []
            }
        };
        for (var b = 0; b < 5; ++b) {
            this.launcher.menu.items.push({
                text: "Window " + (++windowIndex),
                iconCls: "bogus",
                handler: this.createWindow,
                scope: this,
                windowId: windowIndex
            })
        }
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "BogusMenuModule"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Desktop.Settings", Ext.window.Window, {
    layout: "anchor",
    title: "Change Settings",
    modal: true,
    width: 640,
    height: 480,
    border: false,
    initComponent: function() {
        var b = this;
        b.selected = b.desktop.getWallpaper();
        b.stretch = b.desktop.wallpaper.stretch;
        b.preview = Ext.create("widget.wallpaper");
        b.preview.setWallpaper(b.selected);
        b.tree = b.createTree();
        b.buttons = [{
            text: "OK",
            handler: b.onOK,
            scope: b
        }, {
            text: "Cancel",
            handler: b.close,
            scope: b
        }];
        b.items = [{
            anchor: "0 -30",
            border: false,
            layout: "border",
            items: [b.tree, {
                xtype: "panel",
                title: "Preview",
                region: "center",
                layout: "fit",
                items: [b.preview]
            }]
        }, {
            xtype: "checkbox",
            boxLabel: "Stretch to fit",
            checked: b.stretch,
            listeners: {
                change: function(a) {
                    b.stretch = a.checked
                }
            }
        }];
        Ext.window.Window.prototype.initComponent.call(this)
    },
    createTree: function() {
        var d = this;
        function f(a) {
            return {
                img: a,
                text: d.getTextOfWallpaper(a),
                iconCls: "",
                leaf: true
            }
        }
        var e = new Ext.tree.Panel({
            title: "Desktop Background",
            rootVisible: false,
            lines: false,
            scrollable: true,
            width: 150,
            region: "west",
            split: true,
            minWidth: 100,
            listeners: {
                afterrender: {
                    fn: this.setInitialSelection,
                    delay: 100
                },
                select: this.onSelect,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: "Desktop.model.Wallpaper",
                root: {
                    text: "Wallpaper",
                    expanded: true,
                    children: [{
                        text: "None",
                        iconCls: "",
                        leaf: true
                    }, f("Blue-Sencha.jpg"), f("Dark-Sencha.jpg"), f("Wood-Sencha.jpg"), f("blue.jpg"), f("desk.jpg"), f("desktop.jpg"), f("desktop2.jpg"), f("sky.jpg")]
                }
            })
        });
        return e
    },
    getTextOfWallpaper: function(h) {
        var g = h
          , e = h.lastIndexOf("/");
        if (e >= 0) {
            g = g.substring(e + 1)
        }
        var f = g.lastIndexOf(".");
        g = Ext.String.capitalize(g.substring(0, f));
        g = g.replace(/[-]/g, " ");
        return g
    },
    onOK: function() {
        var b = this;
        if (b.selected) {
            b.desktop.setWallpaper(b.selected, b.stretch)
        }
        b.destroy()
    },
    onSelect: function(e, d) {
        var f = this;
        if (d.data.img) {
            f.selected = "linbdesktop/resources/images/wallpapers/" + d.data.img
        } else {
            f.selected = Ext.BLANK_IMAGE_URL
        }
        f.preview.setWallpaper(f.selected)
    },
    setInitialSelection: function() {
        var d = this.desktop.getWallpaper();
        if (d) {
            var c = "/Wallpaper/" + this.getTextOfWallpaper(d);
            this.tree.selectPath(c, "text")
        }
    }
}, 0, 0, ["component", "box", "container", "panel", "window"], {
    component: true,
    box: true,
    container: true,
    panel: true,
    window: true
}, 0, 0, [Desktop, "Settings"], 0));

/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Desktop.ManageWindow", Ext.ux.desktop.Module, {
    id: "manage-win",
    init: function() {
        this.launcher = {
            text: "管理界面",
            iconCls: "icon-grid"
        }
    },
    createWindow: function() {
        var c = this.app.getDesktop();
        var d = c.getWindow("manage-win");
        if (!d) {
            debugger;
            d = c.createWindow({
                id: "manage-win",
                title: "管理界面",
                width: 740,
                height: 480,
                iconCls: "icon-grid",
                animCollapse: false,
                constrainHeader: true,
                layout: "fit",
                maximized: true,
                html : '<iframe src="/" class="body" width="100%" height="100%"></iframe>',
            })
        }
        return d
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "ManageWindow"], 0));
/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(Ext.cmd.derive("Desktop.App", Ext.ux.desktop.App, {
    init: function() {
        Ext.ux.desktop.App.prototype.init.call(this)
    },
    getModules: function() {
        return [new Desktop.VideoWindow(), 
            new Desktop.GridWindow(), 
            new Desktop.TabWindow(), 
            new Desktop.AccordionWindow(), 
            new Desktop.Notepad(), 
            new Desktop.BogusMenuModule(), 
            new Desktop.BogusModule(),
            new Desktop.ManageWindow()]
    },
    getDesktopConfig: function() {
        var c = this
          , d = Ext.ux.desktop.App.prototype.getDesktopConfig.call(this);
        return Ext.apply(d, {
            contextMenuItems: [{
                text: "Change Settings",
                handler: c.onSettings,
                scope: c
            }],
            shortcuts: Ext.create("Ext.data.Store", {
                model: "Ext.ux.desktop.ShortcutModel",
                data: [{
                    name: "Grid Window",
                    iconCls: "grid-shortcut",
                    module: "grid-win"
                }, {
                    name: "Accordion Window",
                    iconCls: "accordion-shortcut",
                    module: "acc-win"
                }, {
                    name: "Notepad",
                    iconCls: "notepad-shortcut",
                    module: "notepad"
                }, {
                    name: "Manage Window",
                    iconCls: "grid-shortcut",
                    module: "manage-win"
                }]
            }),
            wallpaper: "linbdesktop/resources/images/wallpapers/Blue-Sencha.jpg",
            wallpaperStretch: false
        })
    },
    getStartConfig: function() {
        var c = this
          , d = Ext.ux.desktop.App.prototype.getStartConfig.call(this);
        return Ext.apply(d, {
            title: "Don Griffin",
            iconCls: "user",
            height: 300,
            toolConfig: {
                width: 100,
                items: [{
                    text: "Settings",
                    iconCls: "settings",
                    handler: c.onSettings,
                    scope: c
                }, "-", {
                    text: "Logout",
                    iconCls: "logout",
                    handler: c.onLogout,
                    scope: c
                }]
            }
        })
    },
    getTaskbarConfig: function() {
        var b = Ext.ux.desktop.App.prototype.getTaskbarConfig.call(this);
        return Ext.apply(b, {
            quickStart: [{
                name: "Accordion Window",
                iconCls: "accordion",
                module: "acc-win"
            }, {
                name: "Grid Window",
                iconCls: "icon-grid",
                module: "grid-win"
            }],
            trayItems: [{
                xtype: "trayclock",
                flex: 1
            }]
        })
    },
    onLogout: function() {
        Ext.Msg.confirm("Logout", "Are you sure you want to logout?")
    },
    onSettings: function() {
        var b = new Desktop.Settings({
            desktop: this.desktop
        });
        b.show()
    }
}, 0, 0, 0, 0, 0, 0, [Desktop, "App"], 0));
(Ext.cmd.derive("Desktop.model.Wallpaper", Ext.data.TreeModel, {
    fields: [{
        name: "text"
    }, {
        name: "img"
    }]
}, 0, 0, 0, 0, 0, 0, [Desktop.model, "Wallpaper"], 0));
Ext.application({
    name: "Desktop",
    init: function() {
        var b = new Desktop.App()
    }
});