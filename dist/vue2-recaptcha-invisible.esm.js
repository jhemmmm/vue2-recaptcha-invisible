//
//
//
//
//
//

/*
global window document
*/
var script = {
	props: {
		dataSitekey: String,
		dataCallback: Function,
		dataValidate: Function,
		dataBadge: String,
		dataType: String,
		dataErrorcallback: Function,
		dataTabindex: String,
		dataSize: String,
		dataBtnClass: [String, Array, Object],
		dataBtnDisabled: Boolean,
		dataLanguage: String,
	},
	data: function data() {
		return {
			recaptchaId: 0,
			vueRecaptchaInit: 0,
		};
	},
	created: function created() {
		var this$1 = this;

		if (typeof window === 'undefined') { return; }
		window.vueRecaptchaInit = function () {
			this$1.vueRecaptchaInit++;
		};
		var recaptchaScript = document.createElement('script');
		var language = this.dataLanguage ? ("&hl=" + (this.dataLanguage)) : '';
		recaptchaScript.setAttribute('src', ("https://www.google.com/recaptcha/api.js?onload=vueRecaptchaInit&render=explicit" + language));
		recaptchaScript.setAttribute('async', '');
		recaptchaScript.setAttribute('defer', '');
		(document.body || document.head).appendChild(recaptchaScript);
	},
	watch: {
		vueRecaptchaInit: function vueRecaptchaInit() {
			try {
				var options = {
					sitekey: this.dataSitekey,
				};
				if (typeof this.dataBadge !== 'undefined') { options.badge = this.dataBadge; }
				if (typeof this.dataType !== 'undefined') { options.type = this.dataType; }
				if (typeof this.dataTabindex !== 'undefined') { options.tabindex = this.dataTabindex; }
				if (typeof this.dataSize === 'undefined') {
					options.size = 'invisible';
					options.callback = this.getToken;
				}
				var recaptchaDiv = document.createElement('div');
				recaptchaDiv.className = 'outside-badge';
				this.$el.insertBefore(recaptchaDiv, this.$el.childNodes[0]);
				this.recaptchaId = window.grecaptcha.render(recaptchaDiv, options);
			} catch (e) {
				window.console.error(e);
			}
		},
	},
	methods: {
		submitData: function submitData() {
			if (typeof window === 'undefined') { return; }
			if (this.dataValidate() === true || typeof this.dataValidate === 'undefined') {
				if (typeof this.dataSize === 'undefined') {
					window.grecaptcha.execute(this.recaptchaId);
				} else {
					this.getToken(window.grecaptcha.getResponse(this.recaptchaId));
				}
			}
		},
		getToken: function getToken(token) {
			if (typeof window === 'undefined') { return; }
			window.grecaptcha.reset(this.recaptchaId);
			this.dataCallback(token);
		},
	},
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm._m(0)
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_c("div")])
  }
];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('Vue2RecaptchaInvisible', __vue_component__);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
export { install };
