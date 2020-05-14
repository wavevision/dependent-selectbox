!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("DependentSelectBox",[],t):"object"==typeof exports?exports.DependentSelectBox=t():e.DependentSelectBox=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return i})),n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return u})),n.d(t,"f",(function(){return l})),n.d(t,"g",(function(){return c}));var r="data-dependent-data-link",o="data-has-dependent-listener",i="data-parents",a="data-dependent-select-box",u="dependentSelectBoxLoaded",l="dependentSelectBoxLoading",c="["+a+"]"},function(e,t,n){"use strict";var r=n(0),o=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},i=function(e){var t=Number(e);return Number.isNaN(t)?e:t},a=function(e){if(function(e){return e instanceof HTMLSelectElement?e.multiple:e instanceof HTMLInputElement&&"checkbox"===e.type&&e.name.includes("[]")}(e))return function(e){var t,n,r,a,u=[];if(e instanceof HTMLSelectElement)try{for(var l=o(e.selectedOptions),c=l.next();!c.done;c=l.next()){var f=c.value;u.push(i(f.value))}}catch(e){t={error:e}}finally{try{c&&!c.done&&(n=l.return)&&n.call(l)}finally{if(t)throw t.error}}if(e instanceof HTMLInputElement){var d=document.querySelectorAll('input[name="'+e.name+'"]');try{for(var s=o(d),h=s.next();!h.done;h=s.next()){var p=h.value;p.checked&&u.push(i(p.value))}}catch(e){r={error:e}}finally{try{h&&!h.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}}return u.length?u:null}(e);if(["checkbox","radio"].includes(e.type))return e.checked;var t=e.value.trim();return""===t?null:i(t)},u=function(e){var t=e.getAttribute(r.b);return t?JSON.parse(t):[]},l=function(e,t){var n,r,i={};try{for(var u=o(t),l=u.next();!l.done;l=u.next()){var c=l.value,f=e.elements.namedItem(c);f&&(i[f.name]=a(f))}}catch(e){n={error:e}}finally{try{l&&!l.done&&(r=u.return)&&r.call(u)}finally{if(n)throw n.error}}return i},c=function(e){return null!==e.getAttribute(r.c)},f=function(e){return e.setAttribute(r.c,"true")},d=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{l(r.next(e))}catch(e){i(e)}}function u(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}l((r=r.apply(e,t||[])).next())}))},s=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},h=function(e){var t=this;this.handleResponse=function(e,n,o){for(var i in o){var a=document.getElementById(i);a&&null!==a.getAttribute(r.d)&&(a.disabled=o[i].disabled,a.innerHTML=o[i].options)}var u={form:e,dependentSelectBoxes:n,response:o};t.naja.fireEvent(r.e,u)},this.handleRequest=function(e,n,o){return d(t,void 0,Promise,(function(){var t,i,a;return s(this,(function(u){switch(u.label){case 0:if(!(t=e.getAttribute(r.a)))throw new Error('Form "'+e.id+'" must have "data-dependent-data-link" attribute!');return i={data:o,form:e,dependentSelectBoxes:n},this.naja.fireEvent(r.f,i),[4,this.naja.makeRequest("POST",t,o,{dataType:"json",history:!1,responseType:"json"})];case 1:return a=u.sent(),this.handleResponse(e,n,a),[2]}}))}))},this.naja=e},p=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},y=function(e){var t=this;this.addListeners=function(e,n,r){var o=["change"];t.isParentTextBased(e)&&o.push("keydown"),o.forEach((function(o){return e.addEventListener(o,t.handleChange(n,r))})),f(e)},this.findParent=function(e){return document.getElementById(e)},this.findSelectBoxes=function(){return Array.from(document.querySelectorAll(r.g))},this.handleChange=function(e,n){return function(r){var o,i,a=r.target,c=a.form;try{for(var f=p(n),d=f.next();!d.done;d=f.next()){var s=d.value,h=u(s);s.disabled=h.includes(a.id)}}catch(e){o={error:e}}finally{try{d&&!d.done&&(i=f.return)&&i.call(f)}finally{if(o)throw o.error}}t.requestManager.handleRequest(c,t.getFormSelectBoxes(c,n),{trigger:a.id,values:l(c,e)})}},this.getFormSelectBoxes=function(e,t){return t.filter((function(t){return t.form===e}))},this.isParentTextBased=function(e){return["text","number","textarea"].includes(e.type)},this.requestManager=new h(e)},v=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},b=function(e){var t=this;this.init=function(){var e,n,r=t.domManager.findSelectBoxes();try{for(var o=v(r),i=o.next();!i.done;i=o.next()){var a=i.value,l=u(a);l.forEach(t.initParent(l,r))}}catch(t){e={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(e)throw e.error}}},this.initParent=function(e,n){return function(r){var o=t.domManager.findParent(r);null===o||c(o)||t.domManager.addListeners(o,e,n)}},this.naja=e,this.domManager=new y(this.naja),this.naja.addEventListener("load",this.init),this.naja.snippetHandler.addEventListener("afterUpdate",this.init)};t.a=b},,function(e,t){},,,function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(0);n.d(t,"DATA_LINK",(function(){return o.a})),n.d(t,"DATA_PARENT_LISTENER",(function(){return o.c})),n.d(t,"DATA_PARENTS",(function(){return o.b})),n.d(t,"DATA_SELECT_BOX",(function(){return o.d})),n.d(t,"EVENT_LOADED",(function(){return o.e})),n.d(t,"EVENT_LOADING",(function(){return o.f})),n.d(t,"SELECT_BOX_SELECTOR",(function(){return o.g}));var i=n(3);for(var a in i)["DATA_LINK","DATA_PARENT_LISTENER","DATA_PARENTS","DATA_SELECT_BOX","EVENT_LOADED","EVENT_LOADING","SELECT_BOX_SELECTOR","default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t.default=r.a}]).default}));
//# sourceMappingURL=dependentSelectBox.js.map