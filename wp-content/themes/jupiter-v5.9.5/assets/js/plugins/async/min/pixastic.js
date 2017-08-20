var Pixastic=function(){function addEvent(el,event,handler){el.addEventListener?el.addEventListener(event,handler,!1):el.attachEvent&&el.attachEvent("on"+event,handler)}function onready(handler){var handlerDone=!1,execHandler=function(){handlerDone||(handlerDone=!0,handler())};document.write('<script defer src="//:" id="__onload_ie_pixastic__"><\/script>');var script=document.getElementById("__onload_ie_pixastic__");script.onreadystatechange=function(){"complete"==script.readyState&&(script.parentNode.removeChild(script),execHandler())},document.addEventListener&&document.addEventListener("DOMContentLoaded",execHandler,!1),addEvent(window,"load",execHandler)}function init(){for(var imgEls=getElementsByClass("pixastic",null,"img"),canvasEls=getElementsByClass("pixastic",null,"canvas"),elements=imgEls.concat(canvasEls),i=0;i<elements.length;i++)!function(){for(var el=elements[i],actions=[],classes=el.className.split(" "),c=0;c<classes.length;c++){var cls=classes[c];if("pixastic-"==cls.substring(0,9)){var actionName=cls.substring(9);""!=actionName&&actions.push(actionName)}}if(actions.length)if("img"==el.tagName.toLowerCase()){var dataImg=new Image;if(dataImg.src=el.src,dataImg.complete)for(var a=0;a<actions.length;a++){var res=Pixastic.applyAction(el,el,actions[a],null);res&&(el=res)}else dataImg.onload=function(){for(var a=0;a<actions.length;a++){var res=Pixastic.applyAction(el,el,actions[a],null);res&&(el=res)}}}else setTimeout(function(){for(var a=0;a<actions.length;a++){var res=Pixastic.applyAction(el,el,actions[a],null);res&&(el=res)}},1)}()}function getElementsByClass(searchClass,node,tag){var classElements=new Array;null==node&&(node=document),null==tag&&(tag="*");var els=node.getElementsByTagName(tag),elsLen=els.length,pattern=new RegExp("(^|\\s)"+searchClass+"(\\s|$)");for(i=0,j=0;i<elsLen;i++)pattern.test(els[i].className)&&(classElements[j]=els[i],j++);return classElements}function writeDebug(text,level){if(Pixastic.debug)try{switch(level){case"warn":console.warn("Pixastic:",text);break;case"error":console.error("Pixastic:",text);break;default:console.log("Pixastic:",text)}}catch(e){}}"undefined"!=typeof pixastic_parseonload&&pixastic_parseonload&&onready(init);var debugElement,hasCanvas=function(){var c=document.createElement("canvas"),val=!1;try{val=!("function"!=typeof c.getContext||!c.getContext("2d"))}catch(e){}return function(){return val}}(),hasCanvasImageData=function(){var c=document.createElement("canvas"),val=!1,ctx;try{"function"==typeof c.getContext&&(ctx=c.getContext("2d"))&&(val="function"==typeof ctx.getImageData)}catch(e){}return function(){return val}}(),hasGlobalAlpha=function(){var hasAlpha=!1,red=document.createElement("canvas");if(hasCanvas()&&hasCanvasImageData()){red.width=red.height=1;var redctx=red.getContext("2d");redctx.fillStyle="rgb(255,0,0)",redctx.fillRect(0,0,1,1);var blue=document.createElement("canvas");blue.width=blue.height=1;var bluectx=blue.getContext("2d");bluectx.fillStyle="rgb(0,0,255)",bluectx.fillRect(0,0,1,1),redctx.globalAlpha=.5,redctx.drawImage(blue,0,0);var reddata=redctx.getImageData(0,0,1,1).data;hasAlpha=255!=reddata[2]}return function(){return hasAlpha}}();return{parseOnLoad:!1,debug:!1,applyAction:function(img,dataImg,actionName,options){options=options||{};var imageIsCanvas="canvas"==img.tagName.toLowerCase();if(imageIsCanvas&&Pixastic.Client.isIE())return Pixastic.debug&&writeDebug("Tried to process a canvas element but browser is IE."),!1;var canvas,ctx,hasOutputCanvas=!1;Pixastic.Client.hasCanvas()&&(hasOutputCanvas=!!options.resultCanvas,canvas=options.resultCanvas||document.createElement("canvas"),ctx=canvas.getContext("2d"));var w=img.offsetWidth,h=img.offsetHeight;if(imageIsCanvas&&(w=img.width,h=img.height),0==w||0==h){if(null!=img.parentNode)return void(Pixastic.debug&&writeDebug("Image has 0 width and/or height."));var oldpos=img.style.position,oldleft=img.style.left;img.style.position="absolute",img.style.left="-9999px",document.body.appendChild(img),w=img.offsetWidth,h=img.offsetHeight,document.body.removeChild(img),img.style.position=oldpos,img.style.left=oldleft}if(actionName.indexOf("(")>-1){var tmp=actionName;actionName=tmp.substr(0,tmp.indexOf("("));var arg=tmp.match(/\((.*?)\)/);if(arg[1]){arg=arg[1].split(";");for(var a=0;a<arg.length;a++)if(thisArg=arg[a].split("="),2==thisArg.length)if("rect"==thisArg[0]){var rectVal=thisArg[1].split(",");options[thisArg[0]]={left:parseInt(rectVal[0],10)||0,top:parseInt(rectVal[1],10)||0,width:parseInt(rectVal[2],10)||0,height:parseInt(rectVal[3],10)||0}}else options[thisArg[0]]=thisArg[1]}}options.rect?(options.rect.left=Math.round(options.rect.left),options.rect.top=Math.round(options.rect.top),options.rect.width=Math.round(options.rect.width),options.rect.height=Math.round(options.rect.height)):options.rect={left:0,top:0,width:w,height:h};var validAction=!1;if(Pixastic.Actions[actionName]&&"function"==typeof Pixastic.Actions[actionName].process&&(validAction=!0),!validAction)return Pixastic.debug&&writeDebug('Invalid action "'+actionName+'". Maybe file not included?'),!1;if(!Pixastic.Actions[actionName].checkSupport())return Pixastic.debug&&writeDebug('Action "'+actionName+'" not supported by this browser.'),!1;Pixastic.Client.hasCanvas()?(canvas!==img&&(canvas.width=w,canvas.height=h),hasOutputCanvas||(canvas.style.width=w+"px",canvas.style.height=h+"px"),ctx.drawImage(dataImg,0,0,w,h),img.__pixastic_org_image?(canvas.__pixastic_org_image=img.__pixastic_org_image,canvas.__pixastic_org_width=img.__pixastic_org_width,canvas.__pixastic_org_height=img.__pixastic_org_height):(canvas.__pixastic_org_image=img,canvas.__pixastic_org_width=w,canvas.__pixastic_org_height=h)):Pixastic.Client.isIE()&&void 0===img.__pixastic_org_style&&(img.__pixastic_org_style=img.style.cssText);var params={image:img,canvas:canvas,width:w,height:h,useData:!0,options:options};return!!Pixastic.Actions[actionName].process(params)&&(Pixastic.Client.hasCanvas()?(params.useData&&Pixastic.Client.hasCanvasImageData()&&(canvas.getContext("2d").putImageData(params.canvasData,options.rect.left,options.rect.top),canvas.getContext("2d").fillRect(0,0,0,0)),options.leaveDOM||(canvas.title=img.title,canvas.imgsrc=img.imgsrc,imageIsCanvas||(canvas.alt=img.alt),imageIsCanvas||(canvas.imgsrc=img.src),canvas.className=img.className,canvas.style.cssText=img.style.cssText,canvas.name=img.name,canvas.tabIndex=img.tabIndex,canvas.id=img.id,img.parentNode&&img.parentNode.replaceChild&&img.parentNode.replaceChild(canvas,img)),options.resultCanvas=canvas,canvas):img)},prepareData:function(params,getCopy){var ctx=params.canvas.getContext("2d"),rect=params.options.rect,dataDesc=ctx.getImageData(rect.left,rect.top,rect.width,rect.height),data=dataDesc.data;return getCopy||(params.canvasData=dataDesc),data},process:function(img,actionName,options,callback){if("img"==img.tagName.toLowerCase()){var dataImg=new Image;if(dataImg.src=img.src,dataImg.complete){var res=Pixastic.applyAction(img,dataImg,actionName,options);return callback&&callback(res),res}dataImg.onload=function(){var res=Pixastic.applyAction(img,dataImg,actionName,options);callback&&callback(res)}}if("canvas"==img.tagName.toLowerCase()){var res=Pixastic.applyAction(img,img,actionName,options);return callback&&callback(res),res}},revert:function(img){if(Pixastic.Client.hasCanvas()){if("canvas"==img.tagName.toLowerCase()&&img.__pixastic_org_image)return img.width=img.__pixastic_org_width,img.height=img.__pixastic_org_height,img.getContext("2d").drawImage(img.__pixastic_org_image,0,0),img.parentNode&&img.parentNode.replaceChild&&img.parentNode.replaceChild(img.__pixastic_org_image,img),img}else Pixastic.Client.isIE()&&void 0!==img.__pixastic_org_style&&(img.style.cssText=img.__pixastic_org_style)},Client:{hasCanvas:hasCanvas,hasCanvasImageData:hasCanvasImageData,hasGlobalAlpha:hasGlobalAlpha,isIE:function(){return!!document.all&&!!window.attachEvent&&!window.opera}},Actions:{}}}();Pixastic.Actions.blurfast={process:function(params){var amount=parseFloat(params.options.amount)||0,clear=!(!params.options.clear||"false"==params.options.clear);if(amount=Math.max(0,Math.min(5,amount)),Pixastic.Client.hasCanvas()){var rect=params.options.rect,ctx=params.canvas.getContext("2d");ctx.save(),ctx.beginPath(),ctx.rect(rect.left,rect.top,rect.width,rect.height),ctx.clip();var scale=2,smallWidth=Math.round(params.width/2),smallHeight=Math.round(params.height/2),copy=document.createElement("canvas");copy.width=smallWidth,copy.height=smallHeight;for(var clear=!1,steps=Math.round(20*amount),copyCtx=copy.getContext("2d"),i=0;i<steps;i++){var scaledWidth=Math.max(1,Math.round(smallWidth-i)),scaledHeight=Math.max(1,Math.round(smallHeight-i));copyCtx.clearRect(0,0,smallWidth,smallHeight),copyCtx.drawImage(params.canvas,0,0,params.width,params.height,0,0,scaledWidth,scaledHeight),clear&&ctx.clearRect(rect.left,rect.top,rect.width,rect.height),ctx.drawImage(copy,0,0,scaledWidth,scaledHeight,0,0,params.width,params.height)}return ctx.restore(),params.useData=!1,!0}if(Pixastic.Client.isIE()){var radius=10*amount;return params.image.style.filter+=" progid:DXImageTransform.Microsoft.Blur(pixelradius="+radius+")",params.options.fixMargin,params.image.style.marginLeft=(parseInt(params.image.style.marginLeft,10)||0)-Math.round(radius)+"px",params.image.style.marginTop=(parseInt(params.image.style.marginTop,10)||0)-Math.round(radius)+"px",!0}},checkSupport:function(){return Pixastic.Client.hasCanvas()||Pixastic.Client.isIE()}};