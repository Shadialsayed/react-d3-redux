(this["webpackJsonpdata-analysis-app"]=this["webpackJsonpdata-analysis-app"]||[]).push([[0],{300:function(e,t,a){},301:function(e,t,a){},309:function(e,t,a){},432:function(e,t,a){},433:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),s=a.n(c),i=(a(300),a(10)),l=(a(301),a(23)),o=a.n(l),u=a(60),d=a(13),m=Object(d.q)("%Y-%m-%dT%H:%M:%S.%LZ"),j=function(e){return e.forEach((function(e){return"string"===typeof e.x&&(e.x=m(e.x)),e})),e},x=function(){var e=Object(u.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://konuxdata.getsandbox.com/values",e.prev=1,e.next=4,fetch("https://konuxdata.getsandbox.com/values");case 4:return e.next=6,e.sent.json();case 6:return t=e.sent,e.abrupt("return",j(t));case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",[]);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(u.a)(o.a.mark((function e(t){var a,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://konuxdata.getsandbox.com/points",a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)},e.next=4,fetch("https://konuxdata.getsandbox.com/points",a);case 4:return n=e.sent,e.next=7,n.json();case 7:if(r=e.sent,!n.ok){e.next=12;break}return e.abrupt("return",r);case 12:console.log("error");case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=a(163),h=function(e){var t=Object(n.useState)(null),a=Object(i.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)((function(){var t=e.current,a=new p.a((function(e){e.forEach((function(e){c(e.contentRect)}))}));return a.observe(t),function(){a.unobserve(t)}}),[e]),r},O=a(3);var f=function(e){var t=e.data,a=e.highlightedLines,c=Object(n.useRef)(),s=Object(n.useRef)(),l=h(s),o=Object(n.useState)(),u=Object(i.a)(o,2),m=u[0],j=u[1];return Object(n.useEffect)((function(){var e=Object(d.o)(c.current),n=l||s.current.getBoundingClientRect(),r=n.width,i=n.height,o={max:a.lines.max,avg:a.lines.avg,min:a.lines.min},u=Object.keys(o).filter((function(e){return o[e]})),x=Object(d.p)("%Y-%m-%d %H:%M:%S.%L"),b=Object(d.c)((function(e){return e.x})).left,p=Object(d.f)(",.0f");t.sort((function(e,t){return e.x-t.x}));var h=Object(d.m)().range([0,r+1]).domain(Object(d.e)(t,(function(e){return e.x})));if(m){var O=m.rescaleX(h);h.domain(O.domain())}var f=Object(d.k)().range([i,0]),v=Object(d.l)(d.n).domain(["max","avg","min"]),g=Object(d.g)().curve(d.d).x((function(e){return h(e.x)})).y((function(e){return f(e.measures)})),y=Object(d.a)(h).tickFormat(Object(d.p)("%d %b")).ticks(5);e.append("defs").append("clipPath").attr("id","clip").append("rect").attr("width",r).attr("height",i),e.select(".x-axis").attr("transform","translate(0, ".concat(i,")")).transition().duration(1e3).call(y).selectAll("text").attr("text-anchor","middle");var k=Object(d.b)(f);e.select(".y-axis").call(k);var N=e.append("g").attr("class","focus").attr("clip-path","url(#clipPath)").style("display","none");N.append("line").attr("class","lineHover").style("stroke","#999").attr("stroke-width",1).style("shape-rendering","crispEdges").style("opacity",.5).attr("y1",-i).attr("y2",0),N.append("text").attr("class","lineHoverDate").attr("text-anchor","middle").attr("font-size",12).attr("font-family","Verdana").attr("fill","#2b2929"),e.append("rect").attr("class","overlay").attr("x",0).attr("width",r).attr("height",i);var T=u.map((function(e){return{id:e,values:t.map((function(t){return{x:t.x,measures:+t[e]}}))}}));f.domain([Object(d.i)(T,(function(e){return Object(d.i)(e.values,(function(e){return e.measures}))})),Object(d.h)(T,(function(e){return Object(d.h)(e.values,(function(e){return e.measures}))}))]).nice(),e.selectAll(".y-axis").call(Object(d.b)(f).tickSize(-r)),e.selectAll(".metrics").data(T).join("path").attr("class","line metrics").attr("clip-path","url(#clip)").style("stroke",(function(e){return v(e.id)})).transition().duration(750).attr("d",(function(e){return g(e.values)})).attr("clip-path","url(#clip)"),function(t){N.selectAll(".lineHoverText").data(t).join("text").attr("class","lineHoverText").style("fill",(function(e){return v(e)})).attr("text-anchor","start").attr("font-size",12).attr("dy",(function(e,t){return 1+2*t+"em"})),N.selectAll(".hoverCircle").data(t).join("circle").attr("class","hoverCircle").style("fill",(function(e){return v(e)})).attr("r",2.5),e.selectAll(".overlay").on("mouseout",(function(){N.style("display","none")})).on("mousemove",w)}(u);var S=!0;function w(e){if(!S){N.style("display",null);var a=h.invert(Object(d.j)(e,this)[0]),n=b(t,a,1),c=t[n-1],s=t[n],l=a-c.x>s.x-a?s:c;N.selectAll(".lineHover").attr("transform","translate("+h(l.x)+","+i+")"),N.select(".lineHoverDate").attr("transform","translate("+h(l.x)+","+(i+45)+")").text(x(l.x)),N.selectAll(".hoverCircle").attr("cy",(function(e){return f(l[e])})).attr("cx",h(l.x)),N.selectAll(".lineHoverText").attr("transform","translate("+h(l.x)+","+i/2.5+")").text((function(e){return e+" "+p(l[e])})),h(l.x)>r-r/4?N.selectAll("text.lineHoverText").attr("text-anchor","end").attr("dx",-10):N.selectAll("text.lineHoverText").attr("text-anchor","start").attr("dx",10)}}setTimeout((function(){return S=!1}),100);var A=Object(d.r)().scaleExtent([1,5]).translateExtent([[0,0],[r,i]]).on("zoom",(function(e){S=!0,N.style("display","none");var t=e.transform;j(t)})).on("end",(function(){return setTimeout((function(){S=!1}),3e3)}));e.call(A)}),[t,l,a,m]),Object(O.jsx)(r.a.Fragment,{children:Object(O.jsx)("div",{ref:s,children:Object(O.jsxs)("svg",{ref:c,style:{display:"block",width:"100%",height:"410px",overflow:"visible"},children:[Object(O.jsx)("g",{className:"x-axis"}),Object(O.jsx)("g",{className:"y-axis"})]})})})},v=a(29),g="FETCH_DATA",y="ADD_NEW_DATA",k="HIGHLIGHT_LINE",N=a(469),T=a(167),S=a.n(T),w=(a(309),function(e){var t=e.isOpen,a=e.onClose,n=e.children,c=r.a.useRef(null);return t?Object(O.jsxs)("div",{className:"modal",children:[Object(O.jsx)("div",{ref:c,className:"modal__overlay",onClick:function(e){e.target===c.current&&a()}}),Object(O.jsxs)("div",{className:"modal__box",children:[Object(O.jsx)(N.a,{className:"modal__close",onClick:a,children:Object(O.jsx)(S.a,{})}),Object(O.jsx)("div",{className:"modal__content",children:n})]})]}):null}),A=a(22),C=a(473),_=a(478),E=a(474),H=a(476),M=a(96),L=a(38),B=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},F=function(e,t){return("00"+e).slice(-t)},P=Object(C.a)((function(){return Object(_.a)({root:{maxWidth:"450px",display:"block",margin:"0 auto"},textField:{"& > *":{width:"100%"}},submitButton:{marginTop:"24px"},title:{textAlign:"center"},successMessage:{color:"green"},errorMessage:{color:"red"}})})),q={success:{message:"Submitted successfully.",type:"success"},error:{message:"Something went wrong. Please try again.",type:"error"},processing:{message:"Sending...",type:"processing"}},D=function(){var e=P(),t=Object(n.useState)({x:"",avg:"",max:"",min:""}),a=Object(i.a)(t,2),r=a[0],c=a[1],s=Object(n.useState)(!1),l=Object(i.a)(s,2),m=l[0],j=l[1],x=Object(n.useState)({message:"",type:""}),p=Object(i.a)(x,2),h=p[0],f=p[1],g=Object(v.b)();Object(n.useEffect)((function(){"success"===h.type&&g({type:y,payload:r})}),[r]);var k=function(){var e=Object(u.a)(o.a.mark((function e(t,a){var n,r,s,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={x:t.date,avg:t.avg,min:t.min,max:t.max},e.next=4,b(n);case 4:e.sent&&(f(q.success),r=Object(d.q)("%Y-%m-%dT%H:%M:%S.%LZ"),s=Object(A.a)(Object(A.a)({},t),{},{x:r(t.date)}),c(s),a({})),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),"data already exist"===(i=e.t0.response).data&&400===i.status?f(q.duplicate):f(q.error);case 12:return e.prev=12,j(!0),e.finish(12);case 15:case"end":return e.stop()}}),e,null,[[0,8,12,15]])})));return function(t,a){return e.apply(this,arguments)}}();return Object(O.jsx)("div",{className:e.root,children:Object(O.jsx)(M.b,{initialValues:{date:"",avg:"",min:"",max:"",seconds:"",milliseconds:""},onSubmit:function(e,t){f(q.processing),j(!0);var a=e.date.concat(":",F(e.seconds.toString(),2),".",F(e.milliseconds.toString(),3),"Z");e.date=a,k(e,t.resetForm),setTimeout((function(){t.setSubmitting(!1)}),500)},validationSchema:L.b().shape({date:L.c().required(),avg:L.a().required().integer().max(99,"Too much!").min(-99,"Too little"),max:L.a().required().integer().max(99,"Too much!").min(-99,"Too little"),min:L.a().required().integer().max(99,"Too much!").min(-99,"Too little"),seconds:L.a().required().max(59,"Too many!").min(0,"Must be positive!"),milliseconds:L.a().required().max(999,"Too many!").min(0,"Must be positive!")}),children:function(t){var a=t.values,n=t.touched,r=t.errors,c=t.handleBlur,s=t.handleChange,i=t.isSubmitting;return Object(O.jsxs)(M.a,{children:[Object(O.jsx)("h1",{className:e.title,children:"Insert a data point"}),Object(O.jsxs)(E.a,{container:!0,justify:"space-around",direction:"row",children:[Object(O.jsx)(E.a,{item:!0,lg:5,md:5,sm:5,xs:5,className:e.textField,children:Object(O.jsx)(H.a,{name:"avg",id:"avg",label:"Average value",value:a.avg,type:"number",inputProps:{maxLength:3},helperText:r.avg&&n.avg?B(r.avg):"Enter average value",error:!(!r.avg||!n.avg),onChange:s,onBlur:c})}),Object(O.jsx)(E.a,{item:!0,lg:5,md:5,sm:5,xs:5,className:e.textField,children:Object(O.jsx)(H.a,{name:"max",id:"max",label:"Maximum",value:a.max,type:"number",inputProps:{maxLength:3},helperText:r.max&&n.max?B(r.max):"Enter maximum value",error:!(!r.max||!n.max),onChange:s,onBlur:c})}),Object(O.jsx)(E.a,{item:!0,lg:5,md:5,sm:5,xs:5,className:e.textField,children:Object(O.jsx)(H.a,{name:"min",id:"min",label:"Minimum",value:a.min,type:"number",inputProps:{maxLength:3},helperText:r.min&&n.min?B(r.min):"Enter minimum value",error:!(!r.min||!n.min),onChange:s,onBlur:c})}),Object(O.jsx)(E.a,{item:!0,lg:5,md:5,sm:5,xs:5,className:e.textField,children:Object(O.jsx)(H.a,{id:"datetime-local",name:"date",label:"Date",type:"datetime-local",value:a.date,InputLabelProps:{shrink:!0},helperText:r.date&&n.date?B(r.date):"Enter minimum value",error:!(!r.date||!n.date),onChange:s,onBlur:c})}),Object(O.jsx)(E.a,{item:!0,lg:5,md:5,sm:5,xs:5,children:Object(O.jsx)(H.a,{name:"seconds",id:"Seconds",label:"Seconds",value:a.seconds,type:"number",inputProps:{maxLength:2},helperText:r.seconds&&n.seconds?B(r.seconds):"Enter seconds",error:!(!r.seconds||!n.seconds),onChange:s,onBlur:c})}),Object(O.jsx)(E.a,{item:!0,lg:5,md:5,sm:5,xs:5,children:Object(O.jsx)(H.a,{name:"milliseconds",id:"milliseconds",label:"Milliseconds",value:a.milliseconds,type:"number",inputProps:{maxLength:3},helperText:r.milliseconds&&n.milliseconds?B(r.milliseconds):"Enter milliseconds",error:!(!r.milliseconds||!n.milliseconds),onChange:s,onBlur:c})}),Object(O.jsxs)(E.a,{item:!0,lg:10,md:10,sm:10,xs:10,className:e.submitButton,children:[Object(O.jsx)(N.a,{type:"submit",variant:"contained",color:"secondary",disabled:i,children:"Submit"}),m&&Object(O.jsx)("div",{className:"formStatus",children:"processing"===h.type?Object(O.jsx)("p",{className:e.successMessage,children:h.message}):"error"===h.type?Object(O.jsx)("p",{className:e.errorMessage,children:h.message}):"success"===h.type?Object(O.jsx)("p",{className:e.successMessage,children:h.message}):null})]})]})]})}})})},I=a(20),R=a(475),z=a(479),G=a(477);var J=function(){var e=Object(n.useState)({avg:!0,max:!0,min:!0}),t=Object(i.a)(e,2),a=t[0],r=t[1],c=Object(v.b)(),s=function(e){var t;r(Object(A.a)(Object(A.a)({},a),{},Object(I.a)({},e.target.name,e.target.checked))),c((t=Object(A.a)(Object(A.a)({},a),{},Object(I.a)({},e.target.name,e.target.checked)),{type:k,payload:t}))};return Object(O.jsxs)(R.a,{row:!0,children:[Object(O.jsx)(z.a,{control:Object(O.jsx)(G.a,{style:{color:"#1f77b4"},checked:a.max,onChange:s,name:"max"}),label:"Max"}),Object(O.jsx)(z.a,{control:Object(O.jsx)(G.a,{style:{color:"#ff7f0e"},checked:a.avg,onChange:s,name:"avg"}),label:"Average"}),Object(O.jsx)(z.a,{control:Object(O.jsx)(G.a,{style:{color:"#2ca02c"},checked:a.min,onChange:s,name:"min"}),label:"Min"})]})},Y=a(173),Z=a.n(Y),U=(a(431),a(432),function(){return Object(O.jsx)("section",{className:"page_404",children:Object(O.jsx)("div",{className:"container",children:Object(O.jsx)("div",{className:"row",children:Object(O.jsx)("div",{className:"col-sm-12 ",children:Object(O.jsxs)("div",{className:"col-sm-10 col-sm-offset-1  text-center",children:[Object(O.jsx)("div",{className:"four_zero_four_bg",children:Object(O.jsx)("h1",{className:"text-center ",children:"404"})}),Object(O.jsxs)("div",{className:"contant_box_404",children:[Object(O.jsx)("h3",{className:"h2",children:"Look like you're lost"}),Object(O.jsx)("p",{className:"hint_404",children:"Maybe the page you are looking for has been removed, or you typed in the wrong URL"}),Object(O.jsx)("a",{href:"",className:"link_404",children:"Go to Home"})]})]})})})})})});var V=function(){var e=Object(v.c)((function(e){return e.data})),t=Object(v.c)((function(e){return e})),a=Object(n.useState)(!0),r=Object(i.a)(a,2),c=r[0],s=r[1],l=Object(n.useState)(!1),o=Object(i.a)(l,2),u=o[0],d=o[1],m=Object(v.b)();Object(n.useEffect)((function(){x().then((function(e){s(!1),0===e.length?d(!0):m(function(e){return{type:g,payload:e}}(e))}))}),[]);var j=Object(n.useState)(!1),b=Object(i.a)(j,2),p=b[0],h=b[1],y=function(){return h(!p)};return c?Object(O.jsx)(Z.a,{type:"Bars",color:"#00BFFF",height:600}):u?Object(O.jsx)(U,{}):Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)(f,{data:e,highlightedLines:t}),Object(O.jsxs)("div",{style:{marginTop:"50px"},children:[Object(O.jsx)(J,{}),Object(O.jsx)(N.a,{variant:"contained",color:"primary",onClick:y,children:"Add new data!"})]}),Object(O.jsx)(w,{isOpen:p,onClose:y,children:Object(O.jsx)(D,{})})]})},W=a(73),X=a(16),K={data:[],lines:{max:!0,avg:!0,min:!0}},Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case g:return Object(A.a)(Object(A.a)({},e),{},{data:t.payload});case y:return Object(A.a)(Object(A.a)({},e),{},{data:[].concat(Object(X.a)(e.data),[t.payload])});case k:return Object(A.a)(Object(A.a)({},e),{},{lines:t.payload});default:return e}},$=Object(W.b)(Q);s.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(v.a,{store:$,children:Object(O.jsx)(V,{})})}),document.getElementById("root"))}},[[433,1,2]]]);
//# sourceMappingURL=main.810526fa.chunk.js.map