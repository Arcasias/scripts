# Scripts

Couldn't bother to find a more fitting name for this repo, because that's all there is: scripts.

This repository is a list of small scripts/projects that I like to use accross the Web. Feel free to use any of them (at your own risks) and also to report issues/suggestions if you have any.

## How to use

You will first need to open the console (<code style="color:#a8f">F12</code>). Then there are 3 scenarios:

1. The script is <b style="color:#4c4">inline</b> (no <b style="color:#c80">function</b> definition): you can then simply paste the code, press <code style="color:#a8f">Enter</code> and close the console. This should do the trick.

2. The script defines a <b style="color:#c80">function</b> that you can call with the desired <b style="color:#cb0">arguments</b> (there should be enought doc on each script to know what arguments you can use).

3. The script defines something else, which should be specified by the script description.

## [Browser detector](https://github.com/Arcasias/scripts/blob/master/src/public/browser_detector.js)

Detect which browser you are in.

<details>
  <summary>
    Click to see more
  </summary>

<br>

- This script defines the function `getBrowser`. You must call it to see the effects.

```js
const getBrowser=()=>window.opera||window.opr&&opr.addons||/OPR/.test(navigator.userAgent)?"Opera":window.InstallTrigger?"Firefox":window.safari&&/SafariRemoteNotification/.test(safari.pushNotification)?"Safari":window.chrome&&(chrome.webstore||chrome.runtime)?/Edg/.test(navigator.userAgent)?"Edge":"Chrome":void 0;
```

</details>
<br>

## [Cross-reload timer](https://github.com/Arcasias/scripts/blob/master/src/public/timer.js)

This script should be appended where the timer should start, then the timer can be stopped with `timer.stop()` and the results of can be printed with `timer.log()`

<details>
  <summary>
    Click to see more
  </summary>

<br>

- This script defines the function `timer`. You must call it to see the effects.

```js
((t,o)=>{const e="timer-",a=Date.now();window.timer={stop(){const o=Date.now()-a,l=localStorage.getItem(e+t),n=l?l.split(",").map(Number):[];n.push(o),localStorage.setItem(e+t,n.join(",")),n.length<1e3&&window.top.location.reload()},log(){for(const t in localStorage)if(t.startsWith(e)){const o=localStorage.getItem(t).split(",").map(Number).sort(((t,o)=>t-o)),a=o.length/2;console.log(`Results for "${t.slice(e.length)}" on`,o.length,"attempts:"),console.log({max:Math.max(...o),min:Math.min(...o),mean:Math.round(o.reduce(((t,o)=>t+o),0)/o.length),median:Math.round(o.length%2?o[Math.floor(a)]:(o[a-1]+o[a])/2)})}},clear(){for(const t in localStorage)t.startsWith(e)&&localStorage.removeItem(t)}}})("timer");
```

</details>
<br>

## [Global scanner](https://github.com/Arcasias/scripts/blob/master/src/public/glob_scanner.js)

Scan the `window` object for any additionnal global key.

<details>
  <summary>
    Click to see more
  </summary>

<br>

- This script defines the function `scanGlob`. You must call it to see the effects.

```js
(e=>{const o="window,self,document,name,location,customElements,history,locationbar,menubar,personalbar,scrollbars,statusbar,toolbar,status,closed,frames,length,top,opener,parent,frameElement,navigator,origin,external,screen,innerWidth,innerHeight,scrollX,pageXOffset,scrollY,pageYOffset,visualViewport,screenX,screenY,outerWidth,outerHeight,devicePixelRatio,clientInformation,screenLeft,screenTop,defaultStatus,defaultstatus,styleMedia,onsearch,isSecureContext,performance,onappinstalled,onbeforeinstallprompt,crypto,indexedDB,webkitStorageInfo,sessionStorage,localStorage,onabort,onblur,oncancel,oncanplay,oncanplaythrough,onchange,onclick,onclose,oncontextmenu,oncuechange,ondblclick,ondrag,ondragend,ondragenter,ondragleave,ondragover,ondragstart,ondrop,ondurationchange,onemptied,onended,onerror,onfocus,onformdata,oninput,oninvalid,onkeydown,onkeypress,onkeyup,onload,onloadeddata,onloadedmetadata,onloadstart,onmousedown,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,onmousewheel,onpause,onplay,onplaying,onprogress,onratechange,onreset,onresize,onscroll,onseeked,onseeking,onselect,onstalled,onsubmit,onsuspend,ontimeupdate,ontoggle,onvolumechange,onwaiting,onwebkitanimationend,onwebkitanimationiteration,onwebkitanimationstart,onwebkittransitionend,onwheel,onauxclick,ongotpointercapture,onlostpointercapture,onpointerdown,onpointermove,onpointerup,onpointercancel,onpointerover,onpointerout,onpointerenter,onpointerleave,onselectstart,onselectionchange,onanimationend,onanimationiteration,onanimationstart,ontransitionrun,ontransitionstart,ontransitionend,ontransitioncancel,onafterprint,onbeforeprint,onbeforeunload,onhashchange,onlanguagechange,onmessage,onmessageerror,onoffline,ononline,onpagehide,onpageshow,onpopstate,onrejectionhandled,onstorage,onunhandledrejection,onunload,alert,atob,blur,btoa,cancelAnimationFrame,cancelIdleCallback,captureEvents,clearInterval,clearTimeout,close,confirm,createImageBitmap,fetch,find,focus,getComputedStyle,getSelection,matchMedia,moveBy,moveTo,open,postMessage,print,prompt,queueMicrotask,releaseEvents,requestAnimationFrame,requestIdleCallback,resizeBy,resizeTo,scroll,scrollBy,scrollTo,setInterval,setTimeout,stop,webkitCancelAnimationFrame,webkitRequestAnimationFrame,chrome,originAgentCluster,speechSynthesis,onpointerrawupdate,trustedTypes,crossOriginIsolated,openDatabase,webkitRequestFileSystem,webkitResolveLocalFileSystemURL,errorPageController,decodeUTF16Base64ToString,toggleHelpBox,diagnoseErrors,updateForDnsProbe,updateIconClass,search,reloadButtonClick,downloadButtonClick,detailsButtonClick,setAutoFetchState,savePageLaterClick,cancelSavePageClick,toggleErrorInformationPopup,launchOfflineItem,launchDownloadsPage,getIconForSuggestedItem,getSuggestedContentDiv,offlineContentAvailable,toggleOfflineContentListVisibility,onDocumentLoadOrUpdate,onDocumentLoad,onResize,setupMobileNav,Runner,getRandomNum,vibrate,createCanvas,decodeBase64ToArrayBuffer,getTimeStamp,GameOverPanel,checkForCollision,createAdjustedCollisionBox,drawCollisionBoxes,boxCompare,CollisionBox,Obstacle,Trex,DistanceMeter,Cloud,NightMode,HorizonLine,Horizon,loadTimeData,LoadTimeData,jstGetTemplate,JsEvalContext,jstProcess,tp,certificateErrorPageController,res,TEMPORARY,PERSISTENT,addEventListener,dispatchEvent,removeEventListener".split(",");window.scanGlob=(n=[],t=!1)=>{const a=[],r=[...o,...n,"scanGlob"];for(const o in e)r.includes(o)||a.push(o);if(a.length&&(console.warn(`Unregistered global keys (${a.length}): ${a.join(", ")}.`),t))for(const o of a)delete e[o]}})(this);
```

</details>
<br>

## [Hexadecimal to RGB and vice-versa](https://github.com/Arcasias/scripts/blob/master/src/public/color_operations.js)

Convert RGB arrays to hexadecimal colors and vice-versa.

<details>
  <summary>
    Click to see more
  </summary>

<br>

- This script defines the functions `hexToRgb` and `rgbToHex`. You must call them to see the effects.

```js
const hexToRgb=a=>String(a).match(/#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/)?.slice(1,4).map((a=>parseInt(a,16))),rgbToHex=a=>"#"+a.map((a=>Math.floor(a).toString(16).padStart(2,"0"))).join("");
```

</details>
<br>

## [Netflix & Do nothing](https://github.com/Arcasias/scripts/blob/master/src/public/lazy_netflix.js)

Automatically click on the `Skip Intro` and `Next Episode` buttons as soon as they appear.

<details>
  <summary>
    Click to see more
  </summary>

<br>

- Works on: https://www.netflix.com/
- Use: after launching any video.

```js
new MutationObserver((()=>[...document.querySelectorAll(".watch-video--skip-content-button,[data-uia=next-episode-seamless-button]")].map((e=>e.click())))).observe(document.body,{childList:!0,subtree:!0});
```

</details>
<br>

## [Remove YouTube suggestion cards](https://github.com/Arcasias/scripts/blob/master/src/public/youtube_cards.js)

Removes the suggestion cards at the end of a video.

<details>
  <summary>
    Click to see more
  </summary>

<br>

- Works on: https://www.youtube.com/
- Use: at the end of a video when the cards appear.

```js
[...document.getElementsByClassName("ytp-ce-element")].map((e=>e.remove()));
```

</details>
<br>

## [Shana Project 1080p](https://github.com/Arcasias/scripts/blob/master/src/public/shana.js)

Filter the search results to only have 1080p links.

<details>
  <summary>
    Click to see more
  </summary>

<br>

- Works on: https://www.shanaproject.com/
- Use: after searching for any anime

```js
[...document.getElementsByClassName("release_block")].map((e=>!/1080p/.test(e.innerText)&&e.remove())).length;
```

</details>
<br>

## [Spongebobify](https://github.com/Arcasias/scripts/blob/master/src/public/spongebobify.js)

Time to sPonGeBobIfY your texts!

<details>
  <summary>
    Click to see more
  </summary>

<br>

- This script defines the function `spongebobify`. You must call it to see the effects.

```js
const spongebobify=o=>o.split("").map((o=>Math.random()>.5?o.toLowerCase():o.toUpperCase())).join("");
```

</details>
<br>

## [Storage analyzer](https://github.com/Arcasias/scripts/blob/master/src/public/storage_analyzer.js)

Get the size and content of the local/session storages.

<details>
  <summary>
    Click to see more
  </summary>

<br>

- Use: on any website

```js
(()=>{const e=e=>Math.floor(255*e).toString(16).padStart(2,"0"),o=(e,o=!0)=>{let t="",n="";const c=o?"%c":"";return e>1e9?(n=(e/2**30).toFixed(2),t="G"):e>1e6?(n=(e/2**20).toFixed(2),t="M"):e>1e3?(n=(e/1024).toFixed(2),t="K"):n=e,`${c}${n}${c} ${t}B`},t=e=>{const o=document.createElement("iframe");document.head.append(o);const t=Object.getOwnPropertyDescriptor(o.contentWindow,e);return o.remove(),t},n=(o,t)=>{const n=t/2;return`#${[Math.min(o/n,1),1-Math.min(Math.max(o-n,0)/n,1),0].map(e).join("")}`},c=["localStorage","sessionStorage"];for(const e of c){window[e]||Object.defineProperty(window,e,t(e));let c=0,r=0;const i=Object.entries(window[e]),a=i.map((([e,o])=>{const t=(new TextEncoder).encode(e).length,n=(new TextEncoder).encode(o).length;return c+=t,r+=n,[e,t+n]})).sort(((e,o)=>o[1]-e[1])).reduce(((e,t)=>Object.assign(e,{[t[0]]:`${o(t[1],!1)}`})),{}),s=c+r,l="font-family:Arial;color:inherit;",d=`font-family:Arial;color:${n(s,512e4)};`;console.log([`%cwindow.${e}%c :`,`%c- Size: ${o(s)} (keys: ${o(c)} / values: ${o(r)})`,`%c- Keys: %c${i.length}%c`].join("\n"),"font-family:Consolas;color:#d020f0;",l,l,d,l,d,l,d,l,l,d,l,a)}})();
```

</details>