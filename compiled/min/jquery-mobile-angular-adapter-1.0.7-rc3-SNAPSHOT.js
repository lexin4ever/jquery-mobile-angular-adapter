(function(a){function b(a,b,c){var d=a[b];a[b]=function(){return c(d,this,arguments)}}b(a.mobile.selectmenu.prototype,"destroy",function(a,b,c){a.apply(b,c);var d=b.menuPage,e=b.screen,f=b.listbox;d&&d.remove(),e&&e.remove(),f&&f.remove()}),b(a.mobile.listview.prototype,"destroy",function(b,c,d){var e=c.element.attr("id"),f=new RegExp(a.mobile.subPageUrlKey+"="+e+"-"),g=c.childPages();b.apply(c,d);for(var h=0;h<g.length;h++){var i=a(g[h]),j=i.attr("data-url");j.match(f)&&i.remove()}}),b(a.mobile.listview.prototype,"refresh",function(a,b,c){return b.element.filter(":visible").length===0?a.call(b,!0):a.apply(b,c)}),a.fn.controlgroup&&a(document).bind("pagecreate create",function(b){a(":jqmData(role='controlgroup')",b.target).jqmEnhanceable().controlgroup({excludeInvisible:!1})}),b(a.fn,"controlgroup",function(a,b,c){if(b.filter(":visible").length===0){var d=c[0]||{};return d.excludeInvisible=!1,a.call(b,d)}return a.apply(b,c)})})(window.jQuery),function(a,b){function d(b,c){var d=a("<div>"+b+"</div>");return c(d.contents()),d.html()}var c=b.module("ng");c.factory("$precompile",function(){return function(a){return a}}),c.config(["$provide",function(a){a.decorator("$compile",["$precompile","$delegate",function(a,b){return function(){return arguments[0]=a(arguments[0]),b.apply(this,arguments)}}])}]),c.config(["$compileProvider","$provide",function(a,b){var c={},e=a.directive;a.directive=function(a,b){var f=function(a,e){var f=e.invoke(b);return f.template?f.template=d(f.template,a):f.templateUrl&&(c[f.templateUrl]=!0),f};return e.call(this,a,["$precompile","$injector",f])},b.decorator("$http",["$q","$delegate","$precompile",function(a,b,e){var f=b.get;return b.get=function(a){var b=f.apply(this,arguments);if(c[a]){var g=b.success;b.success=function(a){var b=function(){var b=arguments[0];return arguments[0]=d(b,e),a.apply(this,arguments)};return g(b)}}return b},b}])}])}(window.jQuery,window.angular),function(a){var b=a.module("ng");b.config(["$provide",function(a){a.decorator("$rootScope",["$delegate",function(a){return a.$disconnect=function(){if(this.$root==this)return;var a=this.$parent;this.$$disconnected=!0,a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$$nextSibling=this.$$prevSibling=null},a.$reconnect=function(){if(this.$root==this)return;var a=this;if(!a.$$disconnected)return;var b=a.$parent;a.$$disconnected=!1,a.$$prevSibling=b.$$childTail,b.$$childHead?(b.$$childTail.$$nextSibling=a,b.$$childTail=a):b.$$childHead=b.$$childTail=a},a}])}])}(window.angular),function(a){var b=a.module("ng");b.config(["$provide",function(a){a.decorator("$rootScope",["$delegate",function(a){var b=a.$apply;a.$apply=function(){return a.$$phase?a.$eval.apply(this,arguments):b.apply(this,arguments)};var c=!1,d=a.$digest;return a.$digest=function(){if(a.$$phase)return;var b=d.apply(this,arguments)},a}])}])}(window.angular),function(a,b){function f(a,b){while(a.parentNode&&a.parentNode.nodeType===1)a=a.parentNode;var c=a.parentNode;c!==document&&document.documentElement.appendChild(a);try{return b()}finally{c!==document&&c.appendChild(a)}}function h(b,c){i(b,function(){if(m()){var d=Array.prototype.slice.call(arguments),e=this;for(var f=0;f<e.length;f++){var g=e.eq(f),h=g;c&&(h=c(g,d)||h);var i=h.attr("ngm-create")||"{}",j=JSON.parse(i);j[b]=d,h.attr("ngm-create",JSON.stringify(j));var k=g.attr("ngm-link")||"{}",n=JSON.parse(k);n[b]=!0,g.attr("ngm-link",JSON.stringify(n))}}return l()?!1:a.fn.orig[b].apply(this,arguments)})}function i(b,c){a.fn.orig[b]=a.fn.orig[b]||a.fn[b],a.fn[b]=c}function k(a,b){if(!b)return j[a];var c=j[a];j[a]=!0;var d=b();return j[a]=c,d}function l(a){return k("preventJqmWidgetCreation",a)}function m(a){return k("markJqmWidgetCreation",a)}function n(b){l(function(){var c=a.mobile.page.prototype.widgetEventPrefix;a.mobile.page.prototype.widgetEventPrefix="noop",b.page(),a.mobile.page.prototype.widgetEventPrefix=c})}var c=b.module("ng");a("div").live("pagebeforeshow",function(b,c){var d=a(b.target),e=d.scope();e&&e.$root.$digest()}),a.mobile.autoInitializePage=!1;var d=[],e=!1;c.config(["$provide",function(b){b.decorator("$rootScope",["$delegate",function(b){var c=b.$digest,f;return b.$digest=function(){if(this===b){var g=a.mobile.activePage,h=g&&g.scope();f&&f!==h&&f.$disconnect(),f=h,h&&h.$reconnect()}var i=c.apply(this,arguments);if(this===b){var j=d.length;while(d.length){var k=d.shift();k.$disconnect()}j&&!e&&(e=!0,a.mobile.initializePage())}return i},b}])}]),c.factory("$precompile",function(){var a=':jqmData(role="page"), :jqmData(role="dialog")';return function(b){var c=b[0].parentNode;f(b[0],function(){var c=b.find(a).add(b.filter(a));c.attr("ngm-page","true"),m(function(){l(function(){c.length>0?c.page():b.parent().trigger("create")})}),c.page("destroy")});while(b[0].parentNode!==c)b=b.eq(0).parent();return b}}),c.directive("ngmPage",function(){return{restrict:"A",scope:!0,compile:function(a,b){return a.removeAttr("ngm-page"),{pre:function(a,b,c){n(b),d.push(a)}}}}}),c.run(["$rootScope","$compile",function(b,c){i("page",function(){return!l()&&!this.data("page")&&this.attr("data-"+a.mobile.ns+"external-page")&&c(this)(b),a.fn.orig.page.apply(this,arguments)})}]),a.mobile.registerJqmNgWidget=function(a,b){g[a]=b,h(a,b.precompile)};var g={};c.directive("ngmCreate",function(){return{restrict:"A",priority:0,compile:function(b,c){var d=JSON.parse(c.ngmCreate);return{post:function(b,c,e,f){var h,i,j,k;for(h in d)i=g[h],j=d[h],k=a.fn.orig[h],i.create?i.create(k,c,j):k.apply(c,j)}}}}}),c.directive("ngmLink",function(){return{restrict:"A",priority:0,require:["?ngModel"],compile:function(a,b){var c=JSON.parse(b.ngmLink);return{post:function(a,b,d,e){var f,h;for(f in c)h=g[f],h.link(a,b,d,e)}}}}}),a.fn.orig={};var j={}}(window.jQuery,window.angular),function(a,b){function d(a,b){return function(){var c=Array.prototype.slice.call(arguments);c.unshift(a);for(var d=0;d<b.length;d++)b[d].apply(this,c)}}function g(a,c){var d=b(a).closest("label"),e=b(a).closest("form,fieldset,:jqmData(role='page'),:jqmData(role='dialog')");e.length===0&&(e=a.parent());var f=d.length?d:e.find("label").filter("[for='"+a[0].id+"']"),g=b("<div></div>").insertBefore(a).append(a).append(f);return r(a,a.parent()),g}function h(a,c,d){var e=b.fn.wrapAll,f=c.children("input"),g=c;b.fn.wrapAll=function(a){if(this[0]===f[0]){b.fn.wrapAll=e;var c=b(a);return g[0].className=c[0].className,f}return e.apply(this,arguments)};var h=a.apply(f,d);return b.fn.wrapAll=e,h}function i(a,b){a.wrapAll("<div></div>");var c=a.parent();return r(a,c),c}function j(a,b,c){var d=b.children().eq(0);a.apply(d,c)}function k(a,c){var d=b("<div></div>").text(a.text()||a.val()).insertBefore(a).append(a);return r(a,d),d}function l(a,c,d){var e=c,f=c.children().eq(0),g=b.fn.text;b.fn.text=function(){return arguments.length>0?(b.fn.text=g,e):g.apply(this,arguments)};var h=b.fn.insertBefore;b.fn.insertBefore=function(a){return this[0]===e[0]&&a[0]===f[0]?e:h.apply(this,arguments)};var i=a.apply(f,d);return b.fn.text=g,b.fn.insertBefore=h,i}function m(a,c){var d=b("<div></div>").insertBefore(a).append(a);return r(a,d),d}function n(a,c,d){var e=c,f=c.children().eq(0),g=b.fn.wrap;b.fn.wrap=function(a){if(this[0]===f[0]){b.fn.wrap=g;var c=b(a);return e[0].className=c[0].className,f}return g.apply(this,arguments)};var h=a.apply(f,d);return b.fn.wrap=g,h}function o(a,c){if(!a.is("[type='search'],:jqmData(type='search')"))return a;var d=b("<div></div>").insertBefore(a).append(a);return r(a,d),d}function p(a,c,d){if(c[0].nodeName.toUpperCase()==="INPUT")return a.apply(c,d);var e=c,f=c.children().eq(0),g=b.fn.wrap;b.fn.wrap=function(a){if(this[0]===f[0]){b.fn.wrap=g;var c=b(a);return e[0].className=c[0].className,f}return g.apply(this,arguments)};var h=a.apply(f,d);return b.fn.wrap=g,h}function r(a,b){var c=[],d=a[0],e=b[0],f=d.attributes,g=f&&f.length;if(g)for(var h,i,j=g-1;j>=0;j--)h=f[j],i=h.name,q.test(i)&&(d.removeAttributeNode(h),e.setAttributeNode(h));var k="",l=d.className,m;l&&(l=l.replace(/[^;]+;?/,function(a){return q.test(a)?(k+=a,""):a})),k&&(e.className=k,d.className=l)}function s(a,b,c,d,e){d.$observe("disabled",function(b){b?c[a]("disable"):c[a]("enable")})}function t(a,b,c,d,e){d.$observe("checked",function(d){y(a,b,c,"refresh")})}function u(a,b,c){var d="_listeners"+b;if(!a[d]){a[d]=[];var e=a[b];a[b]=function(){var b=e.apply(this,arguments);for(var c=0;c<a[d].length;c++)a[d][c]();return b}}a[d].push(c)}function v(a,b,c,d,e){var f=e[0];f&&u(f,"$render",function(){y(a,b,c,"refresh")})}function w(a,b,c,d,e){c.bind("$childrenChanged",function(){y(a,b,c,{})})}function x(a,b,c,d,e){c.bind("$childrenChanged",function(){y(a,b,c,"refresh")})}function y(a,b,c,d){var e="_refresh"+a,f=(c.data(e)||0)+1;c.data(e,f),b.$evalAsync(function(){c.data(e)===f&&c[a](d)})}var c={checkboxradio:{handlers:[s,v,t],precompile:g,create:h},button:{handlers:[s],precompile:k,create:l},collapsible:{handlers:[s]},textinput:{handlers:[s],precompile:o,create:p},slider:{handlers:[s,v],precompile:i,create:j},listview:{handlers:[x]},collapsibleset:{handlers:[x]},selectmenu:{handlers:[s,v,x],precompile:m,create:n},controlgroup:{handlers:[w]},navbar:{handlers:[]},dialog:{handlers:[]},fixedtoolbar:{handlers:[]}},e;for(var f in c)e=c[f],e.link=d(f,e.handlers),b.mobile.registerJqmNgWidget(f,e);var q=/(^|[\W])(repeat|switch-when|if)($|[\W])/;b.mobile.moveCloningDirectives=r}(window.angular,window.jQuery),function(a,b){function f(b){var c={},d,e;return a.forEach((b||"").split("&"),function(b){b&&(d=b.split("="),e=decodeURIComponent(d[0]),c[e]=a.isDefined(d[1])?decodeURIComponent(d[1]):!0)}),c}function g(a,b){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(b?null:/%20/g,"+")}function h(a){var b=a.split("/"),c=b.length;while(c--)b[c]=i(b[c]);return b.join("/")}function i(a){return g(a,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function j(b){var c=[];return a.forEach(b,function(a,b){c.push(g(b,!0)+(a===!0?"":"="+g(a,!0)))}),c.length?c.join("&"):""}function k(a){return parseInt(a,10)}function l(a,b){var d=c.exec(a);return d={protocol:d[1],host:d[3],port:k(d[5])||e[d[1]]||null,path:d[6]||"/",search:d[8],hash:d[10]},b&&(b.$$protocol=d.protocol,b.$$host=d.host,b.$$port=d.port),d}function m(a,b,c){return a+"://"+b+(c==e[a]?"":":"+c)}function n(a,b){a.$$parse=function(a){var b=l(a,this);this.$$path=decodeURIComponent(b.path),this.$$search=f(b.search),this.$$hash=b.hash&&decodeURIComponent(b.hash)||"",this.$$compose()},a.$$compose=function(){var a=j(this.$$search),b=this.$$hash?"#"+h(this.$$hash):"";this.$$url=h(this.$$path)+(a?"?"+a:"")+b,this.$$absUrl=m(this.$$protocol,this.$$host,this.$$port)+this.$$url},a.$$rewriteAppUrl=function(a){return null},a.$$parse(b)}function o(c){function i(){if(f==c.url())return;f=c.url(),a.forEach(e,function(a){a(c.url())})}if(c.isMock)return;var d=!1,e=[],f=c.url(),g=c.onUrlChange;c.onUrlChange=function(a){if(!d){var c=b.mobile._handleHashChange;b.mobile._handleHashChange=function(a){i(),c(a)},d=!0}return e.push(a),a};var h=c.url;c.url=function(a,b){return a&&(f=a),h.apply(this,arguments)}}var c=/^([^:]+):\/\/(\w+:{0,1}\w*@)?([\w\.-]*)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/,d=/^([^\?#]*)?(\?([^#]*))?(#(.*))?$/,e={http:80,https:443,ftp:21},p=a.module("ng");p.config(["$locationProvider",function(b){var c=!0;b.plainMode=function(b){return a.isDefined(b)?(c=b,this):c};var d=b.$get;b.$get=["$injector","$sniffer","$browser",function(a,e,f){if(c){e.history=!1,o(f);var g=a.invoke(d,b);return n(g,f.url()),g}return a.invoke(d,b)}]}])}(window.angular,window.jQuery),function(a,b){function c(a,b){if(!!a^!!b)return!1;for(var c in a)if(b[c]!==a[c])return!1;for(var c in b)if(b[c]!==a[c])return!1;return!0}function d(a){if(!a)return a;var b;a.length?b=[]:b={};for(var c in a)b[c]=a[c];return b}var e=b.module("ng");e.directive("ngRepeat",function(){return{priority:1e3,compile:function(a,b,e){return{pre:function(a,b,e){var f=e.ngRepeat,g=f.match(/^.+in\s+(.*)\s*$/);if(!g)throw Error("Expected ngRepeat in form of '_item_ in _collection_' but got '"+f+"'.");var h=g[1],i,j=0;a.$watch(function(){var b=a.$eval(h);return c(b,i)||(i=d(b),j++),j},function(){b.parent().trigger("$childrenChanged")})}}}}})}(window.jQuery,window.angular),function(a,b){function c(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b.sort()}var d=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/,e=b.module("ng");e.directive("ngOptions",["$parse",function(a){return{require:["select","?ngModel"],link:function(b,e,f,g){function p(){var a=[],d,e=o(b)||[],f=l?c(e):e,g,h,i={};for(h=0;g=f.length,h<g;h++){var n=e[h];i[k]=e[l?i[l]=f[h]:h],d=m(b,i),a.push({id:l?f[h]:h,label:j(b,i),optionGroup:d})}return a}if(!g[1])return;var h,i=f.ngOptions;if(!(h=i.match(d)))throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '"+i+"'.");var j=a(h[2]||h[1]),k=h[4]||h[6],l=h[5],m=a(h[3]||""),n=a(h[2]?h[1]:k),o=a(h[7]);b.$watch(p,function(){e.trigger("$childrenChanged")},!0)}}}])}(window.jQuery,window.angular),function(a){var b=a.module("ng");b.directive("option",["$interpolate",function(a){return{restrict:"E",compile:function(b,c){var d=a(b.text(),!0),e=a(b.attr("value"),!0);return function(a,b,c){a.$watch(d,function(){b.trigger("$childrenChanged")}),a.$watch(e,function(){b.trigger("$childrenChanged")})}}}}])}(window.angular),function(a){var b=a.module("ng");b.directive("li",function(){return{restrict:"E",compile:function(a,b){return function(a,b,c){b.bind("$childrenChanged",function(){b.removeClass("ui-li");var a=b.data("buttonElements");if(a){var c=a.text;while(c.firstChild)b[0].appendChild(c.firstChild);$(a.inner).remove()}b.removeData("buttonElements")})}}}})}(window.angular),function(a){var b=a.module("ng");b.directive("ngSwitch",function(){return{restrict:"EA",compile:function(a,b){var c=b.ngSwitch||b.on;return function(a,b){a.$watch(c,function(a){b.trigger("$childrenChanged")})}}}})}(window.angular),function(a){var b=a.module("ng");b.directive("ngInclude",function(){return{restrict:"ECA",compile:function(a,b){var c=b.ngInclude||b.src;return function(a,b){a.$watch(c,function(a){b.trigger("$childrenChanged")}),a.$on("$includeContentLoaded",function(){b.trigger("$childrenChanged")})}}}})}(window.angular),function(a,b){var c=b.module("ng");c.directive("input",function(){return{restrict:"E",require:"?ngModel",compile:function(a,b){var c=a.attr("type");return{pre:function(a,b,d,e){if(!e)return;var f=[];c==="date"&&f.push("blur"),f.push("change");var g=b.bind;b.bind=function(a,b){if(a.indexOf("input")!=-1||a.indexOf("change")!=-1)for(var c=0;c<f.length;c++){var d=f[c];a.indexOf(d)===-1&&(a+=" "+d)}return g.call(this,a,b)}}}}}})}(window.jQuery,window.angular),function(a){var b={transclude:"element",priority:1e3,terminal:!0,compile:function(a,b,c){return function(a,b,d){b[0].doNotMove=!0;var e=d.ngmIf,f,g;a.$watch(e,function(d){d?(g=a.$new(),c(g,function(a){f=a,b.after(a)})):(f&&(f.remove(),f=null),g&&g.$destroy()),b.parent().trigger("$childrenChanged")})}}},c=a.module("ng");c.directive("ngmIf",function(){return b})}(window.angular),function(a){function c(a,b,c,d){b.bind(c,function(e){var f=a.$apply(d,b);c.charAt(0)=="v"&&e.preventDefault()})}function d(a,d){b.directive(a,function(){return function(b,e,f){var g=f[a];c(b,e,d,g)}})}var b=a.module("ng"),e={ngmTaphold:"taphold",ngmSwipe:"swipe",ngmSwiperight:"swiperight",ngmSwipeleft:"swipeleft",ngmPagebeforeshow:"pagebeforeshow",ngmPagebeforehide:"pagebeforehide",ngmPageshow:"pageshow",ngmPagehide:"pagehide",ngmClick:"vclick"};for(var f in e)d(f,e[f])}(window.angular),function(a,b){function c(a){var b=a.indexOf(":");return b===-1?[a]:[a.substring(0,b),a.substring(b+1)]}function d(){var b;a(document).on("pagebeforechange",function(a,c){typeof c.toPage=="object"&&(b=c.toPage)});var c=a.mobile.urlHistory,d=c.addNew;c.addNew=function(){var a=d.apply(this,arguments),e=c.stack[c.stack.length-1];return e.pageId=b.attr("id"),a}}function e(b){var c=a.mobile.urlHistory,d=c.activeIndex,e=a.mobile.urlHistory.stack;for(var f=e.length-1;f>=0;f--)if(f!==d&&e[f].pageId===b)return f-d;return undefined}function f(b,c){b&&a(document).one("pagebeforechange",function(d,e){function h(){var a=g.scope();a[b].apply(a,c)}var f=a.mobile.path.parseUrl(e.toPage),g=a("#"+f.hash.substring(1));if(!g.data("page")){g.one("pagecreate",h);return}h()})}function g(b,d){var g=Array.prototype.slice.call(arguments,2);f(d,g);var i;typeof b=="object"&&(i=b,b=i.target);var j=c(b),k=!1;j.length===2&&j[0]==="back"?(k=!0,b=j[1]):j.length===2&&(i={transition:j[0]},b=j[1]);if(b==="back"){window.history.go(-1);return}k?a.mobile.loadPage(b,{showLoadMsg:!0}).then(function(a,c,d){var f=e(d.attr("id"));f!==undefined?window.history.go(f):h(b,{reverse:!0})}):h(b,i)}function h(b,c){c?a.mobile.changePage(b,c):a.mobile.changePage(b)}d();var i=b.module("ng");return i.factory("$navigate",function(){return g}),g}(window.jQuery,window.angular),function(a){function c(a){return a[b]=a[b]||{}}function d(a,b,d,e){var f=c(a),g=f[b];return g||(g=a.$new(),d(b,{$scope:g}),f[b]=g,g.$$referenceCount=0),g.$$referenceCount++,e.bind("$destroy",function(){g.$$referenceCount--,g.$$referenceCount===0&&(g.$destroy(),delete f[b])}),g}function e(a){var b=/([^\s,:]+)\s*:\s*([^\s,:]+)/g,c,d=!1,e={};while(c=b.exec(a))d=!0,e[c[1]]=c[2];if(!d)throw"Expression "+a+" needs to have the syntax <name>:<controller>,...";return e}var b="$$sharedControllers",f=a.module("ng");f.directive("ngmSharedController",["$controller",function(a){return{scope:!0,compile:function(b,c){var f=c.ngmSharedController,g=e(f),h=function(c){for(var e in g)c[e]=d(c.$root,g[e],a,b)};return{pre:h}}}}])}(window.angular),function(a,b){function d(a){var b=c[c.length-1];b.callback&&o.$apply(function(){b.callback.apply(this,arguments)}),a.preventDefault()}function f(){if(!e||e.length==0)e=a(".ui-loader"),e.bind("vclick",d)}function g(){f();if(c.length>0){var b=c[c.length-1],d=b.msg,e=a.mobile.loadingMessage,g=a.mobile.loadingMessageTextVisible;d&&(a.mobile.loadingMessage=d,a.mobile.loadingMessageTextVisible=!0),a.mobile.showPageLoadingMsg(),a.mobile.loadingMessageTextVisible=g,a.mobile.loadingMessage=e}else a.mobile.hidePageLoadingMsg()}function h(){var a,b;typeof arguments[0]=="string"&&(a=arguments[0]),typeof arguments[0]=="function"&&(b=arguments[0]),typeof arguments[1]=="function"&&(b=arguments[1]),c.push({msg:a,callback:b}),g()}function i(){c.pop(),g()}function j(a,b){a.then(b,b)}function k(a,b){h(b),j(a,function(){i()})}function l(b,c,d){d||(d=a.mobile.loadingMessageWithCancel),h(d,function(){b.reject(c)}),j(b.promise,function(){i()})}var c=[],e;a.mobile.loadingMessageWithCancel||(a.mobile.loadingMessageWithCancel="Loading. Click to cancel."),a("div").live("pageshow",function(a,b){g()});var m={show:h,hide:i,waitFor:k,waitForWithCancel:l},n=b.module("ng"),o;return n.factory("$waitDialog",["$rootScope",function(a){return o=a,m}]),m}(window.jQuery,window.angular),function(a,b){function c(a,c,d){function e(e){function r(a){u(-1),i=a,j=[],k=!0,z()}function s(){var a=i;j=[].concat(a),l&&(a=c(a,l)),m&&(a=d(a,m)),n<h&&(n=h),n>a.length&&(n=a.length),o=a.length;var b=a.slice(0,n),e=[0,g.length].concat(b);g.splice.apply(g,e),g.refreshCount++}function t(){if(i.length!=j.length)k=!0;else for(var a=0;a<i.length;a++)if(i[a]!==j[a]){k=!0;break}return k&&(s(),k=!1),g}function u(b){if(!b||b<0)b=a;b!==h&&(h=b,k=!0)}function v(a){b.equals(l,a)||(l=a,k=!0)}function w(a){b.equals(m,a)||(m=a,k=!0)}function x(){n+=h,k=!0}function y(){return t(),n<o}function z(){n=0,k=!0}var f={refreshIfNeeded:t,setFilter:v,setOrderBy:w,setPageSize:u,loadNextPage:x,hasMorePages:y,reset:z,refreshCount:0},g=[],h,i,j,k,l,m,n,o;for(var p in f)g[p]=f[p];r(e);var q=g.hasOwnProperty;return g.hasOwnProperty=function(a){return a in f?!1:q.apply(this,arguments)},g}return function(a,b){if(!a)return a;var c=a.pagedList;if(typeof b=="string"){if(!c)return;if(b==="loadMore")c.loadNextPage();else if(b==="hasMore")return c.hasMorePages();return}return c||(c=e(a),a.pagedList=c),b&&(c.setPageSize(b.pageSize),c.setFilter(b.filter),c.setOrderBy(b.orderBy)),c.refreshIfNeeded(),c}}c.$inject=["defaultListPageSize","filterFilter","orderByFilter"];var d=b.module(["ng"]);d.constant("defaultListPageSize",10),d.filter("paged",c)}(window.jQuery,window.angular)