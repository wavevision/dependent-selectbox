!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("DependentSelectBox",[],t):"object"==typeof exports?exports.DependentSelectBox=t():e.DependentSelectBox=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"e",(function(){return u})),n.d(t,"f",(function(){return l})),n.d(t,"g",(function(){return c})),n.d(t,"h",(function(){return f}));var r="data-disallow-submit-when-disabled",o="data-dependent-data-link",i="data-has-dependent-listener",a="data-parents",u="data-dependent-select-box",l="dependentSelectBoxLoaded",c="dependentSelectBoxLoading",f="["+u+"]"},function(e,t,n){"use strict";var r=n(0),o=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},i=function(e){var t=Number(e);return Number.isNaN(t)?e:t},a=function(e){var t,n,i=e.form,a=e.getAttribute(r.a);if(i&&null!==a)try{for(var u=o(i.elements),l=u.next();!l.done;l=u.next()){var c=l.value;c!==e&&(c.disabled=e.disabled&&"submit"===c.type)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=u.return)&&n.call(u)}finally{if(t)throw t.error}}},u=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},l=function(e){if(function(e){return"checkbox"===e.type?e.name.includes("[]"):"radio"===e.type||Boolean(e.multiple)}(e))return function(e){var t,n,r,a,u=[];if(e instanceof HTMLSelectElement)try{for(var l=o(e.selectedOptions),c=l.next();!c.done;c=l.next()){var f=c.value;u.push(i(f.value))}}catch(e){t={error:e}}finally{try{c&&!c.done&&(n=l.return)&&n.call(l)}finally{if(t)throw t.error}}if(["checkbox","radio"].includes(e.type)){var d=document.querySelectorAll('input[name="'+e.name+'"]');try{for(var s=o(d),y=s.next();!y.done;y=s.next()){var h=y.value;h.checked&&u.push(i(h.value))}}catch(e){r={error:e}}finally{try{y&&!y.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}}return u.length?u:null}(e);if("checkbox"===e.type)return e.checked;var t=e.value.trim();return"textarea"===e.type?t:""===t?null:i(t)},c=function(e){var t=e.getAttribute(r.c);return t?JSON.parse(t):[]},f=function(e,t){var n,r,o={};try{for(var i=u(t),a=i.next();!a.done;a=i.next()){var c=a.value,f=e.elements.namedItem(c);f&&(o[f.name]=l(f))}}catch(e){n={error:e}}finally{try{a&&!a.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}return o},d=function(e){return null!==e.getAttribute(r.d)},s=function(e){return e.setAttribute(r.d,"true")},y=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(e){i(e)}}function u(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}l((r=r.apply(e,t||[])).next())}))},h=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},p=function(e){var t=this;this.handleResponse=function(e,n,o){for(var i in o){var u=document.getElementById(i);u.disabled=o[i].disabled,u.innerHTML=o[i].options,a(u)}var l=new CustomEvent(r.f,{detail:{form:e,dependentSelectBoxes:n,response:o}});t.naja.dispatchEvent(l)},this.handleRequest=function(e,n,o){return y(t,void 0,Promise,(function(){var t,i,a;return h(this,(function(u){switch(u.label){case 0:if(!(t=e.getAttribute(r.b)))throw new Error('Form "'+e.id+'" must have "data-dependent-data-link" attribute!');return i=new CustomEvent(r.g,{detail:{form:e,dependentSelectBoxes:n,request:o}}),this.naja.dispatchEvent(i),[4,this.naja.makeRequest("POST",t,o,{dataType:"json",history:!1,responseType:"json"})];case 1:return a=u.sent(),this.handleResponse(e,n,a),[2]}}))}))},this.naja=e},v=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},b=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},m=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(b(arguments[t]));return e},x=function(e,t,n,r){var o,i,a=[];try{for(var u=v(n),l=u.next();!l.done;l=u.next()){var c=l.value;r.includes(c.id)||a.push(c.id)}}catch(e){o={error:e}}finally{try{l&&!l.done&&(i=u.return)&&i.call(u)}finally{if(o)throw o.error}}var d=f(e,m(r,a));return{trigger:t.id,values:d}},S=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},g=function(e){var t=this;this.addListeners=function(e,n,r){var o=["change"];t.isParentTextBased(e)&&o.push("keydown"),o.forEach((function(o){return e.addEventListener(o,t.handleChange(n,r))})),s(e)},this.findParent=function(e){return document.getElementById(e)},this.findSelectBoxes=function(){return Array.from(document.querySelectorAll(r.h))},this.handleChange=function(e,n){return function(r){var o,i,a=r.target,u=a.form;try{for(var l=S(n),f=l.next();!f.done;f=l.next()){var d=f.value,s=c(d);d.disabled=s.includes(a.id)}}catch(e){o={error:e}}finally{try{f&&!f.done&&(i=l.return)&&i.call(l)}finally{if(o)throw o.error}}var y=t.getFormSelectBoxes(u,n);t.requestManager.handleRequest(u,y,x(u,a,y,e))}},this.getFormSelectBoxes=function(e,t){return t.filter((function(t){return t.form===e}))},this.isParentTextBased=function(e){return["text","number","textarea"].includes(e.type)},this.requestManager=new p(e)},w=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},E=function(){var e=this;this.initialize=function(t){e.domManager=new g(t),t.addEventListener("init",e.load),t.addEventListener("complete",e.load),t.snippetHandler.addEventListener("afterUpdate",e.load)},this.load=function(){var t,n,r=e.domManager.findSelectBoxes();try{for(var o=w(r),i=o.next();!i.done;i=o.next()){var u=i.value,l=c(u);l.forEach(e.initParent(l,r)),a(u)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}},this.initParent=function(t,n){return function(r){var o=e.domManager.findParent(r);null===o||d(o)||e.domManager.addListeners(o,t,n)}}};t.a=E},,,,,function(e,t,n){"use strict";n.r(t),n.d(t,"DATA_DISALLOW_SUBMIT_WHEN_DISABLED",(function(){return o.a})),n.d(t,"DATA_LINK",(function(){return o.b})),n.d(t,"DATA_PARENT_LISTENER",(function(){return o.d})),n.d(t,"DATA_PARENTS",(function(){return o.c})),n.d(t,"DATA_SELECT_BOX",(function(){return o.e})),n.d(t,"EVENT_LOADED",(function(){return o.f})),n.d(t,"EVENT_LOADING",(function(){return o.g})),n.d(t,"SELECT_BOX_SELECTOR",(function(){return o.h}));var r=n(1),o=n(0);t.default=r.a}])}));
//# sourceMappingURL=dependentSelectBox.js.map