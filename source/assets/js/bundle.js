!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";n.d(t,"a",function(){return r});var r=document.querySelector.bind(document);document.querySelectorAll.bind(document);Node.prototype.on=window.on=function(e,t){this.addEventListener(e,t)},NodeList.prototype.__proto__=Array.prototype,NodeList.prototype.on=NodeList.prototype.addEventListener=function(e,t){this.forEach(function(n,r){n.on(e,t)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);navigator.getBattery?navigator.getBattery().then(function(e){function t(){var t=100*e.level,o=(e.dischargingTime/3600).toFixed(2);if(n.i(r.a)(".charge-fill").style.background=t>=80?"limegreen":t>20&&t<80?"#ffc600":"#E53A40",n.i(r.a)(".charge-fill").style.flexBasis=t+"%",e.charging===!0&&n.i(r.a)(".charge-fill").classList.add("charging"),e.charging!==!0){n.i(r.a)("h1").textContent=t+"% battery power and dropping!",n.i(r.a)("h3")&&n.i(r.a)("h3").remove();var i=document.createElement("h3"),a=document.createTextNode("Roughly "+o+" hours until ☠️");i.appendChild(a);var c=n.i(r.a)("h1");document.body.insertBefore(i,c)}else n.i(r.a)("h1").textContent=t+"% battery power and climbing!"}t(),e.addEventListener("levelchange",t),e.addEventListener("chargingtimechange",t),e.addEventListener("dischargingtimechange",t),e.addEventListener("chargingchange",t)}).catch(function(e){return console.log(e)}):n.i(r.a)("body").innerHTML="navigator.getBattery is not supported in your browser 😞"}]);
//# sourceMappingURL=bundle.js.map