(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3589d066"],{"093f":function(t,e,a){"use strict";var n=a("b267");e["a"]=n["a"]},"0a45":function(t,e,a){},"311a":function(t,e,a){"use strict";var n=a("3148"),i=(a("b267"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{directives:[{name:"show",rawName:"v-show",value:!t.hidden,expression:"!hidden"}],class:[t.prefixCls+"-wrap"]},[a("div",{class:[t.prefixCls+"-title"]},[t._v(t._s(t.label))]),a("ul",[a("li",{ref:"options",class:[t.prefixCls]},[t._t("default")],2)])])}),s=[],r="ivu-select-group",o={name:"OptionGroup",props:{label:{type:String,default:""}},data:function(){return{prefixCls:r,hidden:!1}},methods:{queryChange:function(){var t=this;this.$nextTick(function(){for(var e=t.$refs.options.querySelectorAll(".ivu-select-item"),a=!1,n=0;n<e.length;n++)if("none"!==e[n].style.display){a=!0;break}t.hidden=!a})}},mounted:function(){var t=this;this.$on("on-query-change",function(){return t.queryChange(),!0})}},l=o,c=a("2877"),u=Object(c["a"])(l,i,s,!1,null,null,null);u.options.__file="option-group.vue";u.exports,e["a"]=n["a"]},"6a02":function(t,e,a){"use strict";var n=a("0a45"),i=a.n(n);i.a},ab52:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Markdown",{ref:"editor",attrs:{loading:t.loading},on:{submit:t.handleSubmit}},[a("p",{attrs:{slot:"title"},slot:"title"},[t._v("编辑主题")]),a("div",{staticClass:"select-tab"}),a("div",{staticClass:"title"},[a("Input",{staticClass:"title-input",attrs:{placeholder:"标题字数 10字以上"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}},[a("Select",{staticStyle:{width:"8em"},attrs:{slot:"append",placeholder:"选择版块"},slot:"append",model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("Option",{attrs:{value:"dev"}},[t._v("客户端测试")]),a("Option",{attrs:{value:"share"}},[t._v("分享")]),a("Option",{attrs:{value:"ask"}},[t._v("问答")]),a("Option",{attrs:{value:"job"}},[t._v("招聘")])],1)],1)],1)])],1)},i=[],s=(a("96cf"),a("3040")),r=a("2d66"),o=a("093f"),l=a("311a"),c=(a("cadf"),a("551c"),a("097d"),a("c09d")),u={name:"EditTopic",components:{Markdown:c["a"],Select:l["a"],Option:o["a"],Input:r["a"]},data:function(){return{tab:"",title:"",loading:!1}},methods:{handleSubmit:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var a,n,i,s,r,o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(a=this.$store.state.accesstoken,n=this.$data,i=n.tab,s=n.title,r=this.$route.params.id,""!==this.title){t.next=6;break}return this.$message.warning("标题不能为空"),t.abrupt("return");case 6:return t.prev=6,this.loading=!0,t.next=10,this.$api.updateTopic(a,s,i,e,r);case 10:o=t.sent,!0===o.success&&(this.$message.success("编辑主题成功，跳转到该主题"),this.loading=!1,this.$router.push("/topic/".concat(o.topic_id))),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](6),this.$message.warning("未登录无法进行该操作"),this.loading=!1;case 18:case"end":return t.stop()}},t,this,[[6,14]])}));return function(e){return t.apply(this,arguments)}}(),getPost:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$api.getPost(e,{mdrender:!1});case 3:a=t.sent,this.title=a.data.title,this.tab=a.data.tab,this.$refs.editor.simplemde.value(a.data.content),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}},t,this,[[0,9]])}));return function(e){return t.apply(this,arguments)}}()},mounted:function(){this.getPost(this.$route.params.id)}},p=u,d=(a("6a02"),a("2877")),h=Object(d["a"])(p,n,i,!1,null,"71ddd92b",null);h.options.__file="index.vue";e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-3589d066.0ac03eeb.js.map