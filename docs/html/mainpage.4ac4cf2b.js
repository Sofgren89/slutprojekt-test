var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequire1092;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},e.parcelRequire1092=o);var r=o("6AR8M"),s=o("gdelx"),a=o("fhN3L"),l=o("k8Jq9");const c=document.querySelector("#my-update-btn"),u=(0,a.initializeApp)(l.firebaseConfig),i=(0,s.getDatabase)(u),d=(0,r.getAuth)(u);c?.addEventListener("click",(async e=>{e.preventDefault(),f()}));const f=()=>{const e=document.querySelector("#my-update");(0,r.onAuthStateChanged)(d,(async t=>{if(t){const n=(0,s.ref)(i,"users"),o=(await(0,s.get)(n)).val();console.log(o);const r=t.uid,a=(0,s.ref)(i,"posts/"),l=(0,s.push)(a);(0,s.set)(l,{userId:r,content:e.value})}}))};window.addEventListener("load",(()=>{(0,r.onAuthStateChanged)(d,(e=>{if(console.log("auth state changed",e),e){const t=e.uid,n=(0,s.getDatabase)(),o=(0,s.ref)(n,`users/${t}`);(0,s.onValue)(o,(e=>{const t=e.val();console.log("userData",t),console.log(t.profilePicture),console.log(t.username);const n=document.querySelector("#username"),o=document.querySelector("#pic");n.innerHTML=t.username,o.src=t.profilePicture}))}}))}));const p=(0,s.ref)(i,"posts/");(0,s.onValue)(p,(e=>{const t=e.val(),n=document.querySelector(".posts");n.innerHTML="";for(const o in t){const r=e.val();console.log(r);const s=t[o].content,a=document.createElement("div");a.textContent=s,n.appendChild(a)}}));
//# sourceMappingURL=mainpage.4ac4cf2b.js.map
