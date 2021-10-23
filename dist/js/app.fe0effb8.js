(function(e){function t(t){for(var r,c,u=t[0],s=t[1],i=t[2],d=0,f=[];d<u.length;d++)c=u[d],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&f.push(o[c][0]),o[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,i||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,u=1;u<n.length;u++){var s=n[u];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var i=0;i<u.length;i++)t(u[i]);var l=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("v-app-bar-title",[e._v("Sudoku")])],1),n("v-main",[n("Sudoku")],1)],1)},a=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sudoku-container d-flex flex-column ",staticStyle:{height:"100%"}},[n("div",{staticClass:"d-flex align-center mb-3",staticStyle:{gap:"15px"}},[n("v-select",{attrs:{items:e.difficulty_list,"hide-details":"",label:"Difficulty"},model:{value:e.difficulty,callback:function(t){e.difficulty=t},expression:"difficulty"}}),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.init()}}},[e._v("Generate")])],1),n("div",{staticClass:"flex-grow-1 d-block d-md-none"}),n("div",{staticClass:"sudoku"},[n("div",{staticClass:"sudoku-inner-container"},e._l(9,(function(t){return n("div",{key:t,staticClass:"row"},e._l(9,(function(r){return n("div",{key:r,staticClass:"col",class:e.get_cell_class(t,r),on:{click:function(n){e.selected_cell=t+"_"+r}}},[e._v(" "+e._s(e.sudoku[t+"_"+r])+" ")])})),0)})),0)]),n("div",{staticClass:"number-pad mt-3"},[e._l(9,(function(t){return n("v-btn",{key:t,staticClass:"number",attrs:{tile:"",text:""},on:{click:function(n){return e.input_value(null,null,t)}}},[e._v(" "+e._s(t)+" ")])})),n("v-btn",{staticClass:"number",attrs:{tile:"",text:""},on:{click:e.undo}},[e._v(" Undo ")]),n("v-btn",{staticClass:"number",attrs:{tile:"",text:""},on:{click:function(t){return e.input_value(null,null,0)}}},[e._v(" 0 ")]),n("v-btn",{staticClass:"number",attrs:{tile:"",text:""},on:{click:e.redo}},[e._v(" Redo ")])],2)])},u=[],s=n("5530"),i=n("3835"),l=n("1da1"),d=(n("96cf"),n("ac1f"),n("1276"),n("466d"),n("99af"),n("d81d"),n("4de4"),n("4fad"),n("b64b"),n("07ac"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("a434"),n("caad"),n("2532"),function(e){return new Promise((function(t){return setTimeout(t,e)}))}),f=n("a002"),_={name:"Sudoku",data:function(){return{sudoku:{},sudoku_answer:null,sudoku_question:null,selected_cell:null,difficulty_list:[40,60,70],difficulty:40,errors:[],undo_stack:[],redo_stack:[]}},created:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f["getItem"]("last_game");case 2:n=t.sent,n?(e.sudoku=n.sudoku,e.sudoku_answer=n.sudoku_answer,e.sudoku_question=n.sudoku_question,e.difficulty=n.difficulty,e.errors=n.errors,e.undo_stack=n.undo_stack,e.redo_stack=n.redo_stack):e.init(),document.body.addEventListener("keypress",(function(t){if(e.selected_cell){var n=e.selected_cell.split("_"),r=Object(i["a"])(n,2),o=r[0],a=r[1],c=t.key;c.match(/^\d/)&&e.input_value(o,a,1*c)}}));case 5:case"end":return t.stop()}}),t)})))()},methods:{undo:function(){if(this.undo_stack.length){var e=this.undo_stack.pop(),t=Object(i["a"])(e.undo,2),n=t[0],r=t[1];this.sudoku[n]=r,this.redo_stack.push(e),this.check_errors(),this.save()}},redo:function(){if(this.redo_stack.length){var e=this.redo_stack.pop(),t=Object(i["a"])(e.redo,2),n=t[0],r=t[1];this.sudoku[n]=r,this.undo_stack.push(e),this.check_errors(),this.save()}},init:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.generate_sudoku();case 2:n=t.sent,r=e.is_complete(n),console.log("is_complete",n,r),e.sudoku_answer=n,e.sudoku_question=e.mask_sudoku(n,e.difficulty),e.sudoku=Object(s["a"])({},e.sudoku_question),e.errors=[],e.undo_stack=[],e.redo_stack=[],e.selected_cell=null,e.save();case 13:case"end":return t.stop()}}),t)})))()},get_selected_key:function(){return this.selected_cell?this.selected_cell.split("_"):[null,null]},input_value:function(e,t,n){var r=this.get_selected_key(),o=Object(i["a"])(r,2),a=o[0],c=o[1];if(e=e||a,t=t||c,e&&t){var u="".concat(e,"_").concat(t);if(null===this.sudoku_question[u]){var s=this.sudoku[u];this.sudoku[u]=n>0?n:null,this.undo_stack.push({undo:[u,s],redo:[u,n]}),this.check_errors(),this.save(),this.check_win()}}},check_win:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d(1);case 2:e.is_complete(e.sudoku)&&alert("you win");case 3:case"end":return t.stop()}}),t)})))()},save:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",f["setItem"]("last_game",{sudoku:e.sudoku,sudoku_answer:e.sudoku_answer,sudoku_question:e.sudoku_question,difficulty:e.difficulty,errors:e.errors,undo_stack:e.undo_stack,redo_stack:e.redo_stack}));case 1:case"end":return t.stop()}}),t)})))()},check_errors:function(){var e=this;this.errors=Object.entries(this.sudoku).filter((function(t){var n=Object(i["a"])(t,2),r=n[0],o=n[1],a=r.split("_"),c=Object(i["a"])(a,2),u=c[0],s=c[1];return o&&!e.check_value_is_valid(e.sudoku,u,s,o)})).map((function(e){var t=Object(i["a"])(e,1),n=t[0];return n}))},mask_sudoku:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:40,n=Object.keys(e),r=0;r<t;r++){var o=this.array_random(n);this.array_remove(n,o),e[o]=null}return e},is_complete:function(e){var t=this,n=Object.values(e).some((function(e){return null===e}));if(n)return!1;var r=Object.entries(e).every((function(n){var r=Object(i["a"])(n,2),o=r[0],a=r[1],c=o.split("_"),u=Object(i["a"])(c,2),s=u[0],l=u[1];return t.check_value_is_valid(e,s,l,a)}));return!!r},get_pool:function(){for(var e=new Map,t=1;t<=9;t++)for(var n=1;n<=9;n++)e.set("".concat(t,"_").concat(n),[1,2,3,4,5,6,7,8,9]);return e},generate_sudoku:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var n,r,o,a,c,u,s,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.time("generate"),n={},r=e.get_pool(),o=1;case 4:if(!(o<=9)){t.next=42;break}a=1;case 6:if(!(a<=9)){t.next=39;break}c="".concat(o,"_").concat(a),u=r.get(c),s=null,i=void 0;case 11:if(0!==u.length){t.next=13;break}return t.abrupt("break",18);case 13:s=e.array_random(u),e.array_remove(u,s),i=e.check_value_is_valid(n,o,a,s),i||(s=null);case 17:if(!i){t.next=11;break}case 18:if(null!==s){t.next=35;break}if(r.set(c,[1,2,3,4,5,6,7,8,9]),!(a>1)){t.next=25;break}return a--,t.abrupt("continue",37);case 25:if(a=9,o--,!(o<=0)){t.next=34;break}return r=e.get_pool(),o=1,a=1,n={},t.next=34,d();case 34:return t.abrupt("continue",37);case 35:n[c]=s,a++;case 37:t.next=6;break;case 39:o++;case 40:t.next=4;break;case 42:return console.timeEnd("generate"),t.abrupt("return",n);case 44:case"end":return t.stop()}}),t)})))()},check_value_is_valid:function(e,t,n,r){for(var o="".concat(t,"_").concat(n),a=1;a<=9;a++){var c="".concat(t,"_").concat(a);if(c!==o&&e[c]===r)return!1}for(var u=1;u<=9;u++){var s="".concat(u,"_").concat(n);if(s!==o&&e[s]===r)return!1}for(var i=3*Math.floor((t-1)/3)+1,l=3*Math.floor((n-1)/3)+1,d=0;d<3;d++)for(var f=0;f<3;f++){var _=i+d,p=l+f,v="".concat(_,"_").concat(p);if(v!==o&&e[v]===r)return!1}return!0},array_random:function(e){var t=Math.floor(1e3*Math.random())%e.length;return e[t]},array_remove:function(e,t){var n=e.indexOf(t);-1!==n&&e.splice(n,1)},get_cell_class:function(e,t){var n=Math.floor((e-1)/3),r=Math.floor((t-1)/3),o="".concat(e,"_").concat(t),a={};return a["color"]=[0,2].includes(n)&&[0,2].includes(r)||[1].includes(n)&&[1].includes(r),this.selected_cell===o&&(a["selected"]=!0),this.errors.includes(o)&&(a["error"]=!0),a}}},p=_,v=(n("849d"),n("2877")),k=n("6544"),h=n.n(k),b=n("8336"),m=n("b974"),g=Object(v["a"])(p,c,u,!1,null,"48c6a2fc",null),y=g.exports;h()(g,{VBtn:b["a"],VSelect:m["a"]});var w={name:"App",components:{Sudoku:y},data:function(){return{}}},x=w,O=n("7496"),j=n("40dc"),C=n("bb78"),S=n("f6c4"),M=Object(v["a"])(x,o,a,!1,null,null,null),R=M.exports;h()(M,{VApp:O["a"],VAppBar:j["a"],VAppBarTitle:C["a"],VMain:S["a"]});var q=n("f309");r["a"].use(q["a"]);var P=new q["a"]({}),A=n("9483");Object(A["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),r["a"].config.productionTip=!1,new r["a"]({vuetify:P,render:function(e){return e(R)}}).$mount("#app")},"849d":function(e,t,n){"use strict";n("9b25")},"9b25":function(e,t,n){}});
//# sourceMappingURL=app.fe0effb8.js.map