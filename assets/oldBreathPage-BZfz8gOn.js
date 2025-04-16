var pe=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);import"./style-Cj2iKNod.js";import{S as de,e as he,W as me,c as ve,E as ge,C as R,V as P,f as re,g as H,b as U,h as N,N as le,a as V,i as k,H as G,j,k as _e,l as xe,m as ce,n as be,o as K,U as Z,F as ye,p as Se,q as we,r as J,s as ee,T as L,M as D,t as T,u as te,B as Te,P as ie,v as z,w as Me,A as Ce,x as Pe}from"./FilmPass-CwCzYQJT.js";var bt=pe(v=>{typeof process<"u"&&process.versions!=null&&process.versions.node!=null;class Ee{pageMeshes=[];constructor(){this.scene=new de,this.camera=new he(75,window.innerWidth/window.innerHeight,.01,1e3),this.renderer=new me({canvas:document.querySelector("#bg")}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera.position.set(0,0,0),this.renderScene=new ve(this.scene,this.camera),this.composer=new ge(this.renderer),this.composer.addPass(this.renderScene),this.clock=new R(!0),this.Init()}Init(){this.mousePosition=new P(0,0),this.OnMouseMove=this.OnMouseMove.bind(this),this.OnMouseDown=this.OnMouseDown.bind(this),this.OnMouseUp=this.OnMouseUp.bind(this),this.OnScroll=this.OnScroll.bind(this),this.OnWheel=this.OnWheel.bind(this),this.OnWindowResize=this.OnWindowResize.bind(this),document.addEventListener("mousemove",this.OnMouseMove,!1),document.addEventListener("mousedown",this.OnMouseDown,!1),document.addEventListener("mouseup",this.OnMouseUp,!1),window.addEventListener("scroll",this.OnScroll,!1),window.addEventListener("wheel",this.OnWheel,!1),window.addEventListener("resize",this.OnWindowResize,!1),this.finishedLoading=!1,this.DoInit()}DoInit(){}SceneAdditions(){this.pageMeshes.forEach(t=>{this.scene.add(t),t.visible=!1}),this.finishedLoading=!0}Enter(){this.pageMeshes.forEach(t=>{t.visible=!0}),this.DoEnter(),this.Update()}DoEnter(){}Exit(){this.pageMeshes.forEach(t=>{t.visible=!1}),document.removeEventListener("mousemove",this.OnMouseMove,!1),document.removeEventListener("mousedown",this.OnMouseDown,!1),document.removeEventListener("mouseup",this.OnMouseUp,!1),window.removeEventListener("scroll",this.OnScroll,!1),window.removeEventListener("wheel",this.OnWheel,!1),window.removeEventListener("resize",this.OnWindowResize,!1),this.DoExit()}DoExit(){}Update(){this.finishedLoading&&this.DoUpdate(),this.composer.render(),requestAnimationFrame(()=>this.Update())}DoUpdate(){}OnMouseMove(t){this.mousePosition.x=t.clientX/window.innerWidth*2-1,this.mousePosition.y=-(t.clientY/window.innerHeight)*2+1,this.DoOnMouseMove(t)}DoOnMouseMove(t){}OnMouseDown(t){this.DoOnMouseDown(t)}DoOnMouseDown(t){}OnMouseUp(t){this.DoOnMouseUp(t)}DoOnMouseUp(t){}OnScroll(t){this.DoOnScroll(t)}DoOnScroll(t){}OnWheel(t){console.log("OnWheel"),this.DoOnWheel(t)}DoOnWheel(t){}OnWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.composer.setSize(window.innerWidth,window.innerHeight),this.DoOnWIndowResize()}DoOnWIndowResize(){}}var O=Object.freeze({Linear:Object.freeze({None:function(e){return e},In:function(e){return e},Out:function(e){return e},InOut:function(e){return e}}),Quadratic:Object.freeze({In:function(e){return e*e},Out:function(e){return e*(2-e)},InOut:function(e){return(e*=2)<1?.5*e*e:-.5*(--e*(e-2)-1)}}),Cubic:Object.freeze({In:function(e){return e*e*e},Out:function(e){return--e*e*e+1},InOut:function(e){return(e*=2)<1?.5*e*e*e:.5*((e-=2)*e*e+2)}}),Quartic:Object.freeze({In:function(e){return e*e*e*e},Out:function(e){return 1- --e*e*e*e},InOut:function(e){return(e*=2)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2)}}),Quintic:Object.freeze({In:function(e){return e*e*e*e*e},Out:function(e){return--e*e*e*e*e+1},InOut:function(e){return(e*=2)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2)}}),Sinusoidal:Object.freeze({In:function(e){return 1-Math.sin((1-e)*Math.PI/2)},Out:function(e){return Math.sin(e*Math.PI/2)},InOut:function(e){return .5*(1-Math.sin(Math.PI*(.5-e)))}}),Exponential:Object.freeze({In:function(e){return e===0?0:Math.pow(1024,e-1)},Out:function(e){return e===1?1:1-Math.pow(2,-10*e)},InOut:function(e){return e===0?0:e===1?1:(e*=2)<1?.5*Math.pow(1024,e-1):.5*(-Math.pow(2,-10*(e-1))+2)}}),Circular:Object.freeze({In:function(e){return 1-Math.sqrt(1-e*e)},Out:function(e){return Math.sqrt(1- --e*e)},InOut:function(e){return(e*=2)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)}}),Elastic:Object.freeze({In:function(e){return e===0?0:e===1?1:-Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI)},Out:function(e){return e===0?0:e===1?1:Math.pow(2,-10*e)*Math.sin((e-.1)*5*Math.PI)+1},InOut:function(e){return e===0?0:e===1?1:(e*=2,e<1?-.5*Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI):.5*Math.pow(2,-10*(e-1))*Math.sin((e-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(e){var t=1.70158;return e===1?1:e*e*((t+1)*e-t)},Out:function(e){var t=1.70158;return e===0?0:--e*e*((t+1)*e+t)+1},InOut:function(e){var t=2.5949095;return(e*=2)<1?.5*(e*e*((t+1)*e-t)):.5*((e-=2)*e*((t+1)*e+t)+2)}}),Bounce:Object.freeze({In:function(e){return 1-O.Bounce.Out(1-e)},Out:function(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},InOut:function(e){return e<.5?O.Bounce.In(e*2)*.5:O.Bounce.Out(e*2-1)*.5+.5}}),generatePow:function(e){return e===void 0&&(e=4),e=e<Number.EPSILON?Number.EPSILON:e,e=e>1e4?1e4:e,{In:function(t){return Math.pow(t,e)},Out:function(t){return 1-Math.pow(1-t,e)},InOut:function(t){return t<.5?Math.pow(t*2,e)/2:(1-Math.pow(2-t*2,e))/2+.5}}}}),E=function(){return performance.now()},fe=function(){function e(){this._tweens={},this._tweensAddedDuringUpdate={}}return e.prototype.getAll=function(){var t=this;return Object.keys(this._tweens).map(function(i){return t._tweens[i]})},e.prototype.removeAll=function(){this._tweens={}},e.prototype.add=function(t){this._tweens[t.getId()]=t,this._tweensAddedDuringUpdate[t.getId()]=t},e.prototype.remove=function(t){delete this._tweens[t.getId()],delete this._tweensAddedDuringUpdate[t.getId()]},e.prototype.update=function(t,i){t===void 0&&(t=E()),i===void 0&&(i=!1);var n=Object.keys(this._tweens);if(n.length===0)return!1;for(;n.length>0;){this._tweensAddedDuringUpdate={};for(var s=0;s<n.length;s++){var o=this._tweens[n[s]],r=!i;o&&o.update(t,r)===!1&&!i&&delete this._tweens[n[s]]}n=Object.keys(this._tweensAddedDuringUpdate)}return!0},e}(),M={Linear:function(e,t){var i=e.length-1,n=i*t,s=Math.floor(n),o=M.Utils.Linear;return t<0?o(e[0],e[1],n):t>1?o(e[i],e[i-1],i-n):o(e[s],e[s+1>i?i:s+1],n-s)},Bezier:function(e,t){for(var i=0,n=e.length-1,s=Math.pow,o=M.Utils.Bernstein,r=0;r<=n;r++)i+=s(1-t,n-r)*s(t,r)*e[r]*o(n,r);return i},CatmullRom:function(e,t){var i=e.length-1,n=i*t,s=Math.floor(n),o=M.Utils.CatmullRom;return e[0]===e[i]?(t<0&&(s=Math.floor(n=i*(1+t))),o(e[(s-1+i)%i],e[s],e[(s+1)%i],e[(s+2)%i],n-s)):t<0?e[0]-(o(e[0],e[0],e[1],e[1],-n)-e[0]):t>1?e[i]-(o(e[i],e[i],e[i-1],e[i-1],n-i)-e[i]):o(e[s?s-1:0],e[s],e[i<s+1?i:s+1],e[i<s+2?i:s+2],n-s)},Utils:{Linear:function(e,t,i){return(t-e)*i+e},Bernstein:function(e,t){var i=M.Utils.Factorial;return i(e)/i(t)/i(e-t)},Factorial:function(){var e=[1];return function(t){var i=1;if(e[t])return e[t];for(var n=t;n>1;n--)i*=n;return e[t]=i,i}}(),CatmullRom:function(e,t,i,n,s){var o=(i-e)*.5,r=(n-t)*.5,l=s*s,c=s*l;return(2*t-2*i+o+r)*c+(-3*t+3*i-2*o-r)*l+o*s+t}}},Y=function(){function e(){}return e.nextId=function(){return e._nextId++},e._nextId=0,e}(),W=new fe,Oe=function(){function e(t,i){i===void 0&&(i=W),this._object=t,this._group=i,this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=O.Linear.None,this._interpolationFunction=M.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=Y.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1}return e.prototype.getId=function(){return this._id},e.prototype.isPlaying=function(){return this._isPlaying},e.prototype.isPaused=function(){return this._isPaused},e.prototype.getDuration=function(){return this._duration},e.prototype.to=function(t,i){if(i===void 0&&(i=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=t,this._propertiesAreSetUp=!1,this._duration=i<0?0:i,this},e.prototype.duration=function(t){return t===void 0&&(t=1e3),this._duration=t<0?0:t,this},e.prototype.dynamic=function(t){return t===void 0&&(t=!1),this._isDynamic=t,this},e.prototype.start=function(t,i){if(t===void 0&&(t=E()),i===void 0&&(i=!1),this._isPlaying)return this;if(this._group&&this._group.add(this),this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var n in this._valuesStartRepeat)this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=t,this._startTime+=this._delayTime,!this._propertiesAreSetUp||i){if(this._propertiesAreSetUp=!0,!this._isDynamic){var s={};for(var o in this._valuesEnd)s[o]=this._valuesEnd[o];this._valuesEnd=s}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,i)}return this},e.prototype.startFromCurrentValues=function(t){return this.start(t,!0)},e.prototype._setupProperties=function(t,i,n,s,o){for(var r in n){var l=t[r],c=Array.isArray(l),u=c?"array":typeof l,g=!c&&Array.isArray(n[r]);if(!(u==="undefined"||u==="function")){if(g){var h=n[r];if(h.length===0)continue;for(var f=[l],p=0,x=h.length;p<x;p+=1){var d=this._handleRelativeValue(l,h[p]);if(isNaN(d)){g=!1,console.warn("Found invalid interpolation list. Skipping.");break}f.push(d)}g&&(n[r]=f)}if((u==="object"||c)&&l&&!g){i[r]=c?[]:{};var b=l;for(var m in b)i[r][m]=b[m];s[r]=c?[]:{};var h=n[r];if(!this._isDynamic){var _={};for(var m in h)_[m]=h[m];n[r]=h=_}this._setupProperties(b,i[r],h,s[r],o)}else(typeof i[r]>"u"||o)&&(i[r]=l),c||(i[r]*=1),g?s[r]=n[r].slice().reverse():s[r]=i[r]||0}}},e.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._group&&this._group.remove(this),this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},e.prototype.end=function(){return this._goToEnd=!0,this.update(1/0),this},e.prototype.pause=function(t){return t===void 0&&(t=E()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=t,this._group&&this._group.remove(this),this)},e.prototype.resume=function(t){return t===void 0&&(t=E()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=t-this._pauseStart,this._pauseStart=0,this._group&&this._group.add(this),this)},e.prototype.stopChainedTweens=function(){for(var t=0,i=this._chainedTweens.length;t<i;t++)this._chainedTweens[t].stop();return this},e.prototype.group=function(t){return t===void 0&&(t=W),this._group=t,this},e.prototype.delay=function(t){return t===void 0&&(t=0),this._delayTime=t,this},e.prototype.repeat=function(t){return t===void 0&&(t=0),this._initialRepeat=t,this._repeat=t,this},e.prototype.repeatDelay=function(t){return this._repeatDelayTime=t,this},e.prototype.yoyo=function(t){return t===void 0&&(t=!1),this._yoyo=t,this},e.prototype.easing=function(t){return t===void 0&&(t=O.Linear.None),this._easingFunction=t,this},e.prototype.interpolation=function(t){return t===void 0&&(t=M.Linear),this._interpolationFunction=t,this},e.prototype.chain=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];return this._chainedTweens=t,this},e.prototype.onStart=function(t){return this._onStartCallback=t,this},e.prototype.onEveryStart=function(t){return this._onEveryStartCallback=t,this},e.prototype.onUpdate=function(t){return this._onUpdateCallback=t,this},e.prototype.onRepeat=function(t){return this._onRepeatCallback=t,this},e.prototype.onComplete=function(t){return this._onCompleteCallback=t,this},e.prototype.onStop=function(t){return this._onStopCallback=t,this},e.prototype.update=function(t,i){var n=this,s;if(t===void 0&&(t=E()),i===void 0&&(i=!0),this._isPaused)return!0;var o,r=this._startTime+this._duration;if(!this._goToEnd&&!this._isPlaying){if(t>r)return!1;i&&this.start(t,!0)}if(this._goToEnd=!1,t<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var l=t-this._startTime,c=this._duration+((s=this._repeatDelayTime)!==null&&s!==void 0?s:this._delayTime),u=this._duration+this._repeat*c,g=function(){if(n._duration===0||l>u)return 1;var b=Math.trunc(l/c),m=l-b*c,_=Math.min(m/n._duration,1);return _===0&&l===n._duration?1:_},h=g(),f=this._easingFunction(h);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,f),this._onUpdateCallback&&this._onUpdateCallback(this._object,h),this._duration===0||l>=this._duration)if(this._repeat>0){var p=Math.min(Math.trunc((l-this._duration)/c)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=p);for(o in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[o]=="string"&&(this._valuesStartRepeat[o]=this._valuesStartRepeat[o]+parseFloat(this._valuesEnd[o])),this._yoyo&&this._swapEndStartRepeatValues(o),this._valuesStart[o]=this._valuesStartRepeat[o];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=c*p,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var x=0,d=this._chainedTweens.length;x<d;x++)this._chainedTweens[x].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},e.prototype._updateProperties=function(t,i,n,s){for(var o in n)if(i[o]!==void 0){var r=i[o]||0,l=n[o],c=Array.isArray(t[o]),u=Array.isArray(l),g=!c&&u;g?t[o]=this._interpolationFunction(l,s):typeof l=="object"&&l?this._updateProperties(t[o],r,l,s):(l=this._handleRelativeValue(r,l),typeof l=="number"&&(t[o]=r+(l-r)*s))}},e.prototype._handleRelativeValue=function(t,i){return typeof i!="string"?i:i.charAt(0)==="+"||i.charAt(0)==="-"?t+parseFloat(i):parseFloat(i)},e.prototype._swapEndStartRepeatValues=function(t){var i=this._valuesStartRepeat[t],n=this._valuesEnd[t];typeof n=="string"?this._valuesStartRepeat[t]=this._valuesStartRepeat[t]+parseFloat(n):this._valuesStartRepeat[t]=this._valuesEnd[t],this._valuesEnd[t]=i},e}(),Ae="23.1.3",Ie=Y.nextId,w=W,Re=w.getAll.bind(w),De=w.removeAll.bind(w),ze=w.add.bind(w),Fe=w.remove.bind(w),Ue=w.update.bind(w),v={Easing:O,Group:fe,Interpolation:M,now:E,Sequence:Y,nextId:Ie,Tween:Oe,VERSION:Ae,getAll:Re,removeAll:De,add:ze,remove:Fe,update:Ue};const B={name:"AfterimageShader",uniforms:{damp:{value:.96},tOld:{value:null},tNew:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float damp;

		uniform sampler2D tOld;
		uniform sampler2D tNew;

		varying vec2 vUv;

		vec4 when_gt( vec4 x, float y ) {

			return max( sign( x - y ), 0.0 );

		}

		void main() {

			vec4 texelOld = texture2D( tOld, vUv );
			vec4 texelNew = texture2D( tNew, vUv );

			texelOld *= damp * when_gt( texelOld, 0.1 );

			gl_FragColor = max(texelNew, texelOld);

		}`};class ke extends re{constructor(t=.96){super(),this.uniforms=H.clone(B.uniforms),this.uniforms.damp.value=t,this.compFsMaterial=new U({uniforms:this.uniforms,vertexShader:B.vertexShader,fragmentShader:B.fragmentShader}),this.copyFsMaterial=new U({uniforms:H.clone(N.uniforms),vertexShader:N.vertexShader,fragmentShader:N.fragmentShader,blending:le,depthTest:!1,depthWrite:!1}),this._textureComp=new V(window.innerWidth,window.innerHeight,{magFilter:k,type:G}),this._textureOld=new V(window.innerWidth,window.innerHeight,{magFilter:k,type:G}),this._compFsQuad=new j(this.compFsMaterial),this._copyFsQuad=new j(this.copyFsMaterial)}render(t,i,n){this.uniforms.tOld.value=this._textureOld.texture,this.uniforms.tNew.value=n.texture,t.setRenderTarget(this._textureComp),this._compFsQuad.render(t),this._copyFsQuad.material.uniforms.tDiffuse.value=this._textureComp.texture,this.renderToScreen?(t.setRenderTarget(null),this._copyFsQuad.render(t)):(t.setRenderTarget(i),this.clear&&t.clear(),this._copyFsQuad.render(t));const s=this._textureOld;this._textureOld=this._textureComp,this._textureComp=s}setSize(t,i){this._textureComp.setSize(t,i),this._textureOld.setSize(t,i)}dispose(){this._textureComp.dispose(),this._textureOld.dispose(),this.compFsMaterial.dispose(),this.copyFsMaterial.dispose(),this._compFsQuad.dispose(),this._copyFsQuad.dispose()}}const F={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Ne extends re{constructor(t,i,n){super(),this.scene=t,this.camera=i;const s=n.focus!==void 0?n.focus:1,o=n.aperture!==void 0?n.aperture:.025,r=n.maxblur!==void 0?n.maxblur:1;this._renderTargetDepth=new V(1,1,{minFilter:k,magFilter:k,type:G}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new _e,this._materialDepth.depthPacking=xe,this._materialDepth.blending=le;const l=H.clone(F.uniforms);l.tDepth.value=this._renderTargetDepth.texture,l.focus.value=s,l.aspect.value=i.aspect,l.aperture.value=o,l.maxblur.value=r,l.nearClip.value=i.near,l.farClip.value=i.far,this.materialBokeh=new U({defines:Object.assign({},F.defines),uniforms:l,vertexShader:F.vertexShader,fragmentShader:F.fragmentShader}),this.uniforms=l,this._fsQuad=new j(this.materialBokeh),this._oldClearColor=new ce}render(t,i,n){this.scene.overrideMaterial=this._materialDepth,t.getClearColor(this._oldClearColor);const s=t.getClearAlpha(),o=t.autoClear;t.autoClear=!1,t.setClearColor(16777215),t.setClearAlpha(1),t.setRenderTarget(this._renderTargetDepth),t.clear(),t.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),t.clear(),this._fsQuad.render(t)),this.scene.overrideMaterial=null,t.setClearColor(this._oldClearColor),t.setClearAlpha(s),t.autoClear=o}setSize(t,i){this.materialBokeh.uniforms.aspect.value=t/i,this._renderTargetDepth.setSize(t,i)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}const Le=`
    
#ifdef IS_VERTEX
    vec3 csm_Position;
    vec4 csm_PositionRaw;
    vec3 csm_Normal;

    // csm_PointSize
    #ifdef IS_POINTSMATERIAL
        float csm_PointSize;
    #endif
#else
    vec4 csm_DiffuseColor;
    vec4 csm_FragColor;
    float csm_UnlitFac;

    // csm_Emissive, csm_Roughness, csm_Metalness
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL
        vec3 csm_Emissive;
        float csm_Roughness;
        float csm_Metalness;
        float csm_Iridescence;
        
        #if defined IS_MESHPHYSICALMATERIAL
            float csm_Clearcoat;
            float csm_ClearcoatRoughness;
            vec3 csm_ClearcoatNormal;
            float csm_Transmission;
            float csm_Thickness;
        #endif
    #endif

    // csm_AO
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHBASICMATERIAL || defined IS_MESHLAMBERTMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHTOONMATERIAL
        float csm_AO;
    #endif

    // csm_Bump
    #if defined IS_MESHLAMBERTMATERIAL || defined IS_MESHMATCAPMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHSTANDARDMATERIAL || defined IS_MESHTOONMATERIAL || defined IS_SHADOWMATERIAL 
        vec3 csm_Bump;
        vec3 csm_FragNormal;
    #endif

    float csm_DepthAlpha;
#endif
`,Be=`

#ifdef IS_VERTEX
    // csm_Position & csm_PositionRaw
    #ifdef IS_UNKNOWN
        csm_Position = vec3(0.0);
        csm_PositionRaw = vec4(0.0);
        csm_Normal = vec3(0.0);
    #else
        csm_Position = position;
        csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        csm_Normal = normal;
    #endif

    // csm_PointSize
    #ifdef IS_POINTSMATERIAL
        csm_PointSize = size;
    #endif
#else
    csm_UnlitFac = 0.0;

    // csm_DiffuseColor & csm_FragColor
    #if defined IS_UNKNOWN || defined IS_SHADERMATERIAL || defined IS_MESHDEPTHMATERIAL || defined IS_MESHDISTANCEMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_SHADOWMATERIAL
        csm_DiffuseColor = vec4(1.0, 0.0, 1.0, 1.0);
        csm_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    #else
        #ifdef USE_MAP
            vec4 _csm_sampledDiffuseColor = texture2D(map, vMapUv);

            #ifdef DECODE_VIDEO_TEXTURE
            // inline sRGB decode (TODO: Remove this code when https://crbug.com/1256340 is solved)
            _csm_sampledDiffuseColor = vec4(mix(pow(_csm_sampledDiffuseColor.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), _csm_sampledDiffuseColor.rgb * 0.0773993808, vec3(lessThanEqual(_csm_sampledDiffuseColor.rgb, vec3(0.04045)))), _csm_sampledDiffuseColor.w);
            #endif

            csm_DiffuseColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;
            csm_FragColor = vec4(diffuse, opacity) * _csm_sampledDiffuseColor;
        #else
            csm_DiffuseColor = vec4(diffuse, opacity);
            csm_FragColor = vec4(diffuse, opacity);
        #endif
    #endif

    // csm_Emissive, csm_Roughness, csm_Metalness
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL
        csm_Emissive = emissive;
        csm_Roughness = roughness;
        csm_Metalness = metalness;

        #ifdef USE_IRIDESCENCE
            csm_Iridescence = iridescence;
        #else
            csm_Iridescence = 0.0;
        #endif

        #if defined IS_MESHPHYSICALMATERIAL
            #ifdef USE_CLEARCOAT
                csm_Clearcoat = clearcoat;
                csm_ClearcoatRoughness = clearcoatRoughness;
            #else
                csm_Clearcoat = 0.0;
                csm_ClearcoatRoughness = 0.0;
            #endif

            #ifdef USE_TRANSMISSION
                csm_Transmission = transmission;
                csm_Thickness = thickness;
            #else
                csm_Transmission = 0.0;
                csm_Thickness = 0.0;
            #endif
        #endif
    #endif

    // csm_AO
    #if defined IS_MESHSTANDARDMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHBASICMATERIAL || defined IS_MESHLAMBERTMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHTOONMATERIAL
        csm_AO = 0.0;
    #endif

    // csm_Bump
    #if defined IS_MESHLAMBERTMATERIAL || defined IS_MESHMATCAPMATERIAL || defined IS_MESHNORMALMATERIAL || defined IS_MESHPHONGMATERIAL || defined IS_MESHPHYSICALMATERIAL || defined IS_MESHSTANDARDMATERIAL || defined IS_MESHTOONMATERIAL || defined IS_SHADOWMATERIAL 
        csm_Bump = vec3(0.0);
        #ifdef FLAT_SHADED
            vec3 fdx = dFdx( vViewPosition );
            vec3 fdy = dFdy( vViewPosition );
            csm_FragNormal = normalize( cross( fdx, fdy ) );
        #else
            csm_FragNormal = normalize(vNormal);
            #ifdef DOUBLE_SIDED
                csm_FragNormal *= gl_FrontFacing ? 1.0 : - 1.0;
            #endif
        #endif
    #endif

    csm_DepthAlpha = 1.0;
#endif
`,He=`
    varying mat4 csm_internal_vModelViewMatrix;
`,Ve=`
    csm_internal_vModelViewMatrix = modelViewMatrix;
`,Ge=`
    varying mat4 csm_internal_vModelViewMatrix;
`,je=`
    
`,a={diffuse:"csm_DiffuseColor",roughness:"csm_Roughness",metalness:"csm_Metalness",emissive:"csm_Emissive",ao:"csm_AO",bump:"csm_Bump",fragNormal:"csm_FragNormal",clearcoat:"csm_Clearcoat",clearcoatRoughness:"csm_ClearcoatRoughness",clearcoatNormal:"csm_ClearcoatNormal",transmission:"csm_Transmission",thickness:"csm_Thickness",iridescence:"csm_Iridescence",pointSize:"csm_PointSize",fragColor:"csm_FragColor",depthAlpha:"csm_DepthAlpha",unlitFac:"csm_UnlitFac",position:"csm_Position",positionRaw:"csm_PositionRaw",normal:"csm_Normal"},We={[`${a.position}`]:"*",[`${a.positionRaw}`]:"*",[`${a.normal}`]:"*",[`${a.depthAlpha}`]:"*",[`${a.pointSize}`]:["PointsMaterial"],[`${a.diffuse}`]:"*",[`${a.fragColor}`]:"*",[`${a.fragNormal}`]:"*",[`${a.unlitFac}`]:"*",[`${a.emissive}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${a.roughness}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${a.metalness}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${a.iridescence}`]:["MeshStandardMaterial","MeshPhysicalMaterial"],[`${a.ao}`]:["MeshStandardMaterial","MeshPhysicalMaterial","MeshBasicMaterial","MeshLambertMaterial","MeshPhongMaterial","MeshToonMaterial"],[`${a.bump}`]:["MeshLambertMaterial","MeshMatcapMaterial","MeshNormalMaterial","MeshPhongMaterial","MeshPhysicalMaterial","MeshStandardMaterial","MeshToonMaterial","ShadowMaterial"],[`${a.clearcoat}`]:["MeshPhysicalMaterial"],[`${a.clearcoatRoughness}`]:["MeshPhysicalMaterial"],[`${a.clearcoatNormal}`]:["MeshPhysicalMaterial"],[`${a.transmission}`]:["MeshPhysicalMaterial"],[`${a.thickness}`]:["MeshPhysicalMaterial"]},$e={"*":{"#include <lights_physical_fragment>":K.lights_physical_fragment,"#include <transmission_fragment>":K.transmission_fragment},[`${a.normal}`]:{"#include <beginnormal_vertex>":`
    vec3 objectNormal = ${a.normal};
    #ifdef USE_TANGENT
	    vec3 objectTangent = vec3( tangent.xyz );
    #endif
    `},[`${a.position}`]:{"#include <begin_vertex>":`
    vec3 transformed = ${a.position};
  `},[`${a.positionRaw}`]:{"#include <begin_vertex>":`
    vec4 csm_internal_positionUnprojected = ${a.positionRaw};
    mat4x4 csm_internal_unprojectMatrix = projectionMatrix * modelViewMatrix;
    #ifdef USE_INSTANCING
      csm_internal_unprojectMatrix = csm_internal_unprojectMatrix * instanceMatrix;
    #endif
    csm_internal_positionUnprojected = inverse(csm_internal_unprojectMatrix) * csm_internal_positionUnprojected;
    vec3 transformed = csm_internal_positionUnprojected.xyz;
  `},[`${a.pointSize}`]:{"gl_PointSize = size;":`
    gl_PointSize = ${a.pointSize};
    `},[`${a.diffuse}`]:{"#include <color_fragment>":`
    #include <color_fragment>
    diffuseColor = ${a.diffuse};
  `},[`${a.fragColor}`]:{"#include <opaque_fragment>":`
    #include <opaque_fragment>
    gl_FragColor = mix(gl_FragColor, ${a.fragColor}, ${a.unlitFac});
  `},[`${a.emissive}`]:{"vec3 totalEmissiveRadiance = emissive;":`
    vec3 totalEmissiveRadiance = ${a.emissive};
    `},[`${a.roughness}`]:{"#include <roughnessmap_fragment>":`
    #include <roughnessmap_fragment>
    roughnessFactor = ${a.roughness};
    `},[`${a.metalness}`]:{"#include <metalnessmap_fragment>":`
    #include <metalnessmap_fragment>
    metalnessFactor = ${a.metalness};
    `},[`${a.ao}`]:{"#include <aomap_fragment>":`
    #include <aomap_fragment>
    reflectedLight.indirectDiffuse *= 1. - ${a.ao};
    `},[`${a.bump}`]:{"#include <normal_fragment_maps>":`
    #include <normal_fragment_maps>

    vec3 csm_internal_orthogonal = ${a.bump} - (dot(${a.bump}, normal) * normal);
    vec3 csm_internal_projectedbump = mat3(csm_internal_vModelViewMatrix) * csm_internal_orthogonal;
    normal = normalize(normal - csm_internal_projectedbump);
    `},[`${a.fragNormal}`]:{"#include <normal_fragment_maps>":`
      #include <normal_fragment_maps>
      normal = ${a.fragNormal};
    `},[`${a.depthAlpha}`]:{"gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );":`
      gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity * 1.0 - ${a.depthAlpha} );
    `,"gl_FragColor = packDepthToRGBA( fragCoordZ );":`
      if(${a.depthAlpha} < 1.0) discard;
      gl_FragColor = packDepthToRGBA( dist );
    `,"gl_FragColor = packDepthToRGBA( dist );":`
      if(${a.depthAlpha} < 1.0) discard;
      gl_FragColor = packDepthToRGBA( dist );
    `},[`${a.clearcoat}`]:{"material.clearcoat = clearcoat;":`material.clearcoat = ${a.clearcoat};`},[`${a.clearcoatRoughness}`]:{"material.clearcoatRoughness = clearcoatRoughness;":`material.clearcoatRoughness = ${a.clearcoatRoughness};`},[`${a.clearcoatNormal}`]:{"#include <clearcoat_normal_fragment_begin>":`
      vec3 csm_coat_internal_orthogonal = csm_ClearcoatNormal - (dot(csm_ClearcoatNormal, nonPerturbedNormal) * nonPerturbedNormal);
      vec3 csm_coat_internal_projectedbump = mat3(csm_internal_vModelViewMatrix) * csm_coat_internal_orthogonal;
      vec3 clearcoatNormal = normalize(nonPerturbedNormal - csm_coat_internal_projectedbump);
    `},[`${a.transmission}`]:{"material.transmission = transmission;":`
      material.transmission = ${a.transmission};
    `},[`${a.thickness}`]:{"material.thickness = thickness;":`
      material.thickness = ${a.thickness};
    `},[`${a.iridescence}`]:{"material.iridescence = iridescence;":`
      material.iridescence = ${a.iridescence};
    `}},Ye={clearcoat:[a.clearcoat,a.clearcoatNormal,a.clearcoatRoughness],transmission:[a.transmission],iridescence:[a.iridescence]};function qe(e){let t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+(t<<6)+(t<<16)-t;const i=t>>>0;return String(i)}function Xe(e){try{new e}catch(t){if(t.message.indexOf("is not a constructor")>=0)return!1}return!0}function ne(e){return e.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,"")}class se extends be{constructor({baseMaterial:t,vertexShader:i,fragmentShader:n,uniforms:s,patchMap:o,cacheKey:r,...l}){if(!t)throw new Error("CustomShaderMaterial: baseMaterial is required.");let c;if(Xe(t)){const f=Object.keys(l).length===0;c=new t(f?void 0:l)}else c=t,Object.assign(c,l);if(["ShaderMaterial","RawShaderMaterial"].includes(c.type))throw new Error(`CustomShaderMaterial does not support ${c.type} as a base material.`);super(),this.uniforms={},this.vertexShader="",this.fragmentShader="";const u=c;u.name=`CustomShaderMaterial<${c.name||c.type}>`,u.update=this.update.bind(u),u.__csm={prevOnBeforeCompile:c.onBeforeCompile,baseMaterial:c,vertexShader:i,fragmentShader:n,uniforms:s,patchMap:o,cacheKey:r};const g={...u.uniforms||{},...s||{}};u.uniforms=this.uniforms=g,u.vertexShader=this.vertexShader=i||"",u.fragmentShader=this.fragmentShader=n||"",u.update({fragmentShader:u.fragmentShader,vertexShader:u.vertexShader,uniforms:u.uniforms,patchMap:o,cacheKey:r}),Object.assign(this,u);const h=Object.getOwnPropertyDescriptors(Object.getPrototypeOf(u));for(const f in h){const p=h[f];(p.get||p.set)&&Object.defineProperty(this,f,p)}return Object.defineProperty(this,"type",{get(){return c.type},set(f){c.type=f}}),this}update({fragmentShader:t,vertexShader:i,uniforms:n,cacheKey:s,patchMap:o}){const r=ne(i||""),l=ne(t||""),c=this;n&&(c.uniforms=n),i&&(c.vertexShader=i),t&&(c.fragmentShader=t),Object.entries(Ye).forEach(([f,p])=>{for(const x in p){const d=p[x];(l&&l.includes(d)||r&&r.includes(d))&&(c[f]||(c[f]=1))}});const u=c.__csm.prevOnBeforeCompile,g=(f,p,x)=>{let d,b="";if(p){const m=p.search(/void\s+main\s*\(\s*\)\s*{/);if(m!==-1){b=p.slice(0,m);let _=0,y=-1;for(let S=m;S<p.length;S++)if(p[S]==="{"&&_++,p[S]==="}"&&(_--,_===0)){y=S;break}if(y!==-1){const S=p.slice(m,y+1);d=S.slice(S.indexOf("{")+1,-1)}}else b=p}if(x&&p&&p.includes(a.fragColor)&&d&&(d=`csm_UnlitFac = 1.0;
`+d),f.includes("//~CSM_DEFAULTS")){f=f.replace("void main() {",`
          // THREE-CustomShaderMaterial by Faraz Shaikh: https://github.com/FarazzShaikh/THREE-CustomShaderMaterial
  
          ${b}
          
          void main() {
          `);const m=f.lastIndexOf("//~CSM_MAIN_END");if(m!==-1){const _=`
            ${d?`${d}`:""}
            //~CSM_MAIN_END
          `;f=f.slice(0,m)+_+f.slice(m)}}else{const m=/void\s*main\s*\(\s*\)\s*{/gm;f=f.replace(m,`
          // THREE-CustomShaderMaterial by Faraz Shaikh: https://github.com/FarazzShaikh/THREE-CustomShaderMaterial
  
          //~CSM_DEFAULTS
          ${x?Ge:He}
          ${Le}
  
          ${b}
          
          void main() {
            {
              ${Be}
            }
            ${x?je:Ve}

            ${d?`${d}`:""}
            //~CSM_MAIN_END
          `)}return f};c.onBeforeCompile=(f,p)=>{u?.(f,p);const x=o||{},d=c.type,b=d?`#define IS_${d.toUpperCase()};
`:`#define IS_UNKNOWN;
`;f.vertexShader=b+`#define IS_VERTEX
`+f.vertexShader,f.fragmentShader=b+`#define IS_FRAGMENT
`+f.fragmentShader;const m=_=>{for(const y in _){const S=y==="*"||r&&r.includes(y);if(y==="*"||l&&l.includes(y)||S){const A=We[y];if(A&&A!=="*"&&(Array.isArray(A)?!A.includes(d):A!==d)){console.error(`CustomShaderMaterial: ${y} is not available in ${d}. Shader cannot compile.`);return}const q=_[y];for(const I in q){const C=q[I];if(typeof C=="object"){const X=C.type,Q=C.value;X==="fs"?f.fragmentShader=f.fragmentShader.replace(I,Q):X==="vs"&&(f.vertexShader=f.vertexShader.replace(I,Q))}else C&&(f.vertexShader=f.vertexShader.replace(I,C),f.fragmentShader=f.fragmentShader.replace(I,C))}}}};m($e),m(x),f.vertexShader=g(f.vertexShader,r,!1),f.fragmentShader=g(f.fragmentShader,l,!0),n&&(f.uniforms={...f.uniforms,...c.uniforms}),c.uniforms=f.uniforms};const h=c.customProgramCacheKey;c.customProgramCacheKey=()=>(s?.()||qe((r||"")+(l||"")))+h?.call(c),c.needsUpdate=!0}clone(){const t=this;return new t.constructor({baseMaterial:t.__csm.baseMaterial.clone(),vertexShader:t.__csm.vertexShader,fragmentShader:t.__csm.fragmentShader,uniforms:t.__csm.uniforms,patchMap:t.__csm.patchMap,cacheKey:t.__csm.cacheKey})}}var Qe=`#define GLSLIFY 1
vec2 _fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}vec3 _fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}/***Generates 2D Perlin Noise.**@name gln_perlin*@function*@param{vec2}p Point to sample Perlin Noise at.*@return{float}Value of Perlin Noise at point "p".**@example*float n=gln_perlin(position.xy);*/float gln_perlin(vec2 P){vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);Pi=mod(Pi,289.0);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=gln_rand4(gln_rand4(ix)+iy);vec4 gx=2.0*fract(i*0.0243902439)-1.0;vec4 gy=abs(gx)-0.5;vec4 tx=floor(gx+0.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=_fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}/***Generates 3D Perlin Noise.**@name gln_perlin*@function*@param{vec3}p Point to sample Perlin Noise at.*@return{float}Value of Perlin Noise at point "p".**@example*float n=gln_perlin(position.xyz);*/float gln_perlin(vec3 P){vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.0);Pi0=mod(Pi0,289.0);Pi1=mod(Pi1,289.0);vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.0);vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;vec4 ixy=_permute(_permute(ix)+iy);vec4 ixy0=_permute(ixy+iz0);vec4 ixy1=_permute(ixy+iz1);vec4 gx0=ixy0/7.0;vec4 gy0=fract(floor(gx0)/7.0)-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);vec4 gx1=ixy1/7.0;vec4 gy1=fract(floor(gx1)/7.0)-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=_taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=_taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);vec3 fade_xyz=_fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}/***Generates 2D Fractional Brownian motion(fBm)from Perlin Noise.**@name gln_pfbm*@function*@param{vec2}p Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Perlin Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_pfbm(position.xy,opts);*/float gln_pfbm(vec2 p,gln_tFBMOpts opts){p+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec2 p=p*frequency*opts.scale;float noiseVal=gln_perlin(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}/***Generates 3D Fractional Brownian motion(fBm)from Perlin Noise.**@name gln_pfbm*@function*@param{vec3}p Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Perlin Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_pfbm(position.xy,opts);*/float gln_pfbm(vec3 p,gln_tFBMOpts opts){p+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec3 p=p*frequency*opts.scale;float noiseVal=gln_perlin(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}`,Ke=`#define GLSLIFY 1
/***Generates 2D Simplex Noise.**@name gln_simplex*@function*@param{vec2}v Point to sample Simplex Noise at.*@return{float}Value of Simplex Noise at point "p".**@example*float n=gln_simplex(position.xy);*/float gln_simplex(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)? vec2(1.0,0.0): vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.0);vec3 p=gln_rand3(gln_rand3(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}/***Generates 3D Simplex Noise.**@name gln_simplex*@function*@param{vec3}v Point to sample Simplex Noise at.*@return{float}Value of Simplex Noise at point "p".**@example*float n=gln_simplex(position.xyz);*/float gln_simplex(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+1.0*C.xxx;vec3 x2=x0-i2+2.0*C.xxx;vec3 x3=x0-1.+3.0*C.xxx;i=mod(i,289.0);vec4 p=_permute(_permute(_permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=1.0/7.0;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=_taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}/***Generates 2D Fractional Brownian motion(fBm)from Simplex Noise.**@name gln_sfbm*@function*@param{vec2}v Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Simplex Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_sfbm(position.xy,opts);*/float gln_sfbm(vec2 v,gln_tFBMOpts opts){v+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec2 p=v*frequency*opts.scale;float noiseVal=gln_simplex(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}/***Generates 3D Fractional Brownian motion(fBm)from Simplex Noise.**@name gln_sfbm*@function*@param{vec3}v Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Simplex Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(uSeed,0.3,2.0,0.5,1.0,5,false,false);**float n=gln_sfbm(position.xy,opts);*/float gln_sfbm(vec3 v,gln_tFBMOpts opts){v+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec3 p=v*frequency*opts.scale;float noiseVal=gln_simplex(p);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}`,Ze=`#define GLSLIFY 1
/***@typedef{struct}gln_tWorleyOpts Options for Voronoi Noise generators.*@property{float}seed Seed for PRNG generation.*@property{float}distance Size of each generated cell*@property{float}scale "Zoom level" of generated noise.*@property{boolean}invert Invert generated noise.*/struct gln_tWorleyOpts{float seed;float distance;float scale;bool invert;};/***Generates Voronoi Noise.**@name gln_worley*@function*@param{vec2}x                  Point to sample Voronoi Noise at.*@param{gln_tWorleyOpts}opts Options for generating Voronoi Noise.*@return{float}Value of Voronoi Noise at point "p".**@example*gln_tWorleyOpts opts=gln_tWorleyOpts(uSeed,0.0,0.5,false);**float n=gln_worley(position.xy,opts);*/float gln_worley(vec2 point,gln_tWorleyOpts opts){vec2 p=floor(point*opts.scale);vec2 f=fract(point*opts.scale);float res=0.0;for(int j=-1;j<=1;j++){for(int i=-1;i<=1;i++){vec2 b=vec2(i,j);vec2 r=vec2(b)-f+gln_rand(p+b);res+=1./pow(dot(r,r),8.);}}float result=pow(1./res,0.0625);if(opts.invert)result=1.0-result;return result;}/***Generates Fractional Brownian motion(fBm)from Worley Noise.**@name gln_wfbm*@function*@param{vec3}v Point to sample fBm at.*@param{gln_tFBMOpts}opts Options for generating Simplex Noise.*@return{float}Value of fBm at point "p".**@example*gln_tFBMOpts opts=*gln_tFBMOpts(1.0,0.3,2.0,0.5,1.0,5,false,false);**gln_tWorleyOpts voronoiOpts=*gln_tWorleyOpts(1.0,1.0,3.0,false);**float n=gln_wfbm(position.xy,voronoiOpts,opts);*/float gln_wfbm(vec2 v,gln_tFBMOpts opts,gln_tWorleyOpts vopts){v+=(opts.seed*100.0);float persistance=opts.persistance;float lacunarity=opts.lacunarity;float redistribution=opts.redistribution;int octaves=opts.octaves;bool terbulance=opts.terbulance;bool ridge=opts.terbulance&&opts.ridge;float result=0.0;float amplitude=1.0;float frequency=1.0;float maximum=amplitude;for(int i=0;i<MAX_FBM_ITERATIONS;i++){if(i>=octaves)break;vec2 p=v*frequency*opts.scale;float noiseVal=gln_worley(p,vopts);if(terbulance)noiseVal=abs(noiseVal);if(ridge)noiseVal=-1.0*noiseVal;result+=noiseVal*amplitude;frequency*=lacunarity;amplitude*=persistance;maximum+=amplitude;}float redistributed=pow(result,redistribution);return redistributed/maximum;}`,Je=`#define GLSLIFY 1
#define gln_COPY 1
#define gln_ADD 2
#define gln_SUBSTRACT 3
#define gln_MULTIPLY 4
#define gln_ADDSUB 5
#define gln_LIGHTEN 6
#define gln_DARKEN 7
#define gln_SWITCH 8
#define gln_DIVIDE 9
#define gln_OVERLAY 10
#define gln_SCREEN 11
#define gln_SOFTLIGHT 12
float gln_softLight(float f,float b){return(f<0.5)? b-(1.0-2.0*f)*b*(1.0-b):(b<0.25)? b+(2.0*f-1.0)*b*((16.0*b-12.0)*b+3.0): b+(2.0*f-1.0)*(sqrt(b)-b);}vec4 gln_softLight(vec4 f,vec4 b){vec4 result;result.x=gln_softLight(f.x,b.x);result.y=gln_softLight(f.y,b.y);result.z=gln_softLight(f.z,b.z);result.a=gln_softLight(f.a,b.a);return result;}vec4 gln_screen(vec4 f,vec4 b){vec4 result;result=1.0-(1.0-f)*(1.0-b);return result;}float gln_overlay(float f,float b){return(b<0.5)? 2.0*f*b : 1.0-2.0*(1.0-f)*(1.0-b);}vec4 gln_overlay(vec4 f,vec4 b){vec4 result;result.x=gln_overlay(f.x,b.x);result.y=gln_overlay(f.y,b.y);result.z=gln_overlay(f.z,b.z);result.a=gln_overlay(f.a,b.a);return result;}vec4 gln_divide(vec4 f,vec4 b){vec4 result=vec4(0.0);result=b/f;return result;}vec4 gln_switch(vec4 f,vec4 b,float o){vec4 result=vec4(0.0);result=max((f*o),(b*(1.0-o)));return result;}vec4 gln_darken(vec4 f,vec4 b){vec4 result=vec4(0.0);result=min(f,b);return result;}vec4 gln_lighten(vec4 f,vec4 b){vec4 result=vec4(0.0);result=max(f,b);return result;}float gln_addSub(float f,float b){return f>0.5 ? f+b : b-f;}vec4 gln_addSub(vec4 f,vec4 b){vec4 result=vec4(0.0);result.r=gln_addSub(f.r,b.r);result.g=gln_addSub(f.g,b.g);result.b=gln_addSub(f.b,b.b);result.a=gln_addSub(f.a,b.a);return result;}vec4 gln_multiply(vec4 f,vec4 b){vec4 result=vec4(0.0);result=f*b;result.a=f.a+b.a*(1.0-f.a);return result;}vec4 gln_subtract(vec4 f,vec4 b){vec4 result=vec4(0.0);result=b-f;result.a=f.a+b.a*(1.0-f.a);return result;}vec4 gln_add(vec4 f,vec4 b){vec4 result=vec4(0.0);result=f+b;result.a=f.a+b.a*(1.0-f.a);return result;}vec4 gln_copy(vec4 f,vec4 b){vec4 result=vec4(0.0);result.a=f.a+b.a*(1.0-f.a);result.rgb=((f.rgb*f.a)+(b.rgb*b.a)*(1.0-f.a));return result;}/***Enum for gl-Noise Blend Modes.*@name gln_BLENDMODES*@enum{number}*@property{number}gln_COPY The<b>Copy</b>blending mode will just place the*foreground on top of the background.*@property{number}gln_ADD The<b>Add</b>blending mode will add the*foreground input value to each corresponding pixel in the background.*@property{number}gln_SUBSTRACT The<b>Substract</b>blending mode will*substract the foreground input value from each corresponding pixel in the*background.*@property{number}gln_MULTIPLY The<b>Multiply</b>blending mode will*multiply the background input value by each corresponding pixel in the*foreground.*@property{number}gln_ADDSUB The<b>Add Sub</b>blending mode works as*following:<ul><li>Foreground pixels with a value higher than 0.5 are added*to their respective background pixels.</li><li>Foreground pixels with a*value lower than 0.5 are substracted from their respective background pixels.*</li>*</ul>*@property{number}gln_LIGHTEN The<b>Lighten(Max)</b>Blending mode will*pick the higher value between the background and the foreground.*@property{number}gln_DARKEN The<b>Darken(Min)</b>Blending mode will pick*the lower value between the background and the foreground.*@property{number}gln_DIVIDE The<b>Divide</b>blending mode will divide the*background input pixels value by each corresponding pixel in the foreground.*@property{number}gln_OVERLAY The<b>Overlay</b>blending mode combines*Multiply and Screen blend modes:<ul><li>If the value of the lower layer*pixel is below 0.5,then a Multiply type blending is applied.</li><li>If*the value of the lower layer pixel is above 0.5,then a Screen type blending*is applied.</li>*</ul>*@property{number}gln_SCREEN With<b>Screen</b>blend mode the values of the*pixels in the two inputs are inverted,multiplied,and then inverted*again.</br>The result is the opposite effect to multiply and is always equal*or higher(brighter)compared to the original.*@property{number}gln_SOFTLIGHT The<b>Soft Light</b>blend mode creates a*subtle lighter or darker result depending on the brightness of the foreground*color.*</br>Blend colors that are more than 50% brightness will lighten the*background pixels and colors that are less than 50% brightness will darken*the background pixels.*//***Blends a Color with another.**@name gln_blend*@function*@param{vec4}f Foreground*@param{vec4}b Background*@param{gln_BLENDMODES}type Blend mode*@return{vec4}Mapped Value**@example*vec4 logo=texture2D(uLogo,uv);*vec4 rect=texture2D(uRect,uv);**vec4 final=gln_blend(logo,rect,gln_COPY);*/vec4 gln_blend(vec4 f,vec4 b,int type){vec4 n;if(type==gln_COPY){n=gln_copy(f,b);}else if(type==gln_ADD){n=gln_add(f,b);}else if(type==gln_SUBSTRACT){n=gln_subtract(f,b);}else if(type==gln_MULTIPLY){n=gln_multiply(f,b);}else if(type==gln_ADDSUB){n=gln_addSub(f,b);}else if(type==gln_LIGHTEN){n=gln_lighten(f,b);}else if(type==gln_DARKEN){n=gln_darken(f,b);}else if(type==gln_DIVIDE){n=gln_divide(f,b);}else if(type==gln_OVERLAY){n=gln_overlay(f,b);}else if(type==gln_SCREEN){n=gln_screen(f,b);}else if(type==gln_SOFTLIGHT){n=gln_softLight(f,b);}return n;}`,et=`#define GLSLIFY 1
#define MAX_FBM_ITERATIONS 30
#define gln_PI 3.1415926538
vec4 _permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}vec4 _taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}/***@typedef{struct}gln_tFBMOpts Options for fBm generators.*@property{float}seed Seed for PRNG generation.*@property{float}persistance Factor by which successive layers of noise*will decrease in amplitude.*@property{float}lacunarity Factor by which successive layers of noise*will increase in frequency.*@property{float}scale "Zoom level" of generated noise.*@property{float}redistribution Flatness in the generated noise.*@property{int}octaves Number of layers of noise to stack.*@property{boolean}terbulance Enable terbulance*@property{boolean}ridge Convert the fBm to Ridge Noise. Only works*when "terbulance" is set to true.*/struct gln_tFBMOpts{float seed;float persistance;float lacunarity;float scale;float redistribution;int octaves;bool terbulance;bool ridge;};/***Converts a number from one range to another.**@name gln_map*@function*@param{}value Value to map*@param{float}min1 Minimum for current range*@param{float}max1 Maximum for current range*@param{float}min2 Minimum for wanted range*@param{float}max2 Maximum for wanted range*@return{float}Mapped Value**@example*float n=gln_map(-0.2,-1.0,1.0,0.0,1.0);**/float gln_map(float value,float min1,float max1,float min2,float max2){return min2+(value-min1)*(max2-min2)/(max1-min1);}/***Normalized a value from the range[-1,1]to the range[0,1].**@name gln_normalize*@function*@param{float}v Value to normalize*@return{float}Normalized Value**@example*float n=gln_normalize(-0.2);**/float gln_normalize(float v){return gln_map(v,-1.0,1.0,0.0,1.0);}/***Generates a random 2D Vector.**@name gln_rand2*@function*@param{vec2}p Vector to hash to generate the random numbers from.*@return{vec2}Random vector.**@example*vec2 n=gln_rand2(vec2(1.0,-4.2));*/vec2 gln_rand2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}/***Generates a random 3D Vector.**@name gln_rand3*@function*@param{vec3}p Vector to hash to generate the random numbers from.*@return{vec3}Random vector.**@example*vec3 n=gln_rand3(vec3(1.0,-4.2,0.2));*/vec3 gln_rand3(vec3 p){return mod(((p*34.0)+1.0)*p,289.0);}/***Generates a random 4D Vector.**@name gln_rand4*@function*@param{vec4}p Vector to hash to generate the random numbers from.*@return{vec4}Random vector.**@example*vec4 n=gln_rand4(vec4(1.0,-4.2,0.2,2.2));*/vec4 gln_rand4(vec4 p){return mod(((p*34.0)+1.0)*p,289.0);}/***Generates a random number.**@name gln_rand*@function*@param{float}n Value to hash to generate the number from.*@return{float}Random number.**@example*float n=gln_rand(2.5);*/float gln_rand(float n){return fract(sin(n)*1e4);}/***Generates a random number.**@name gln_rand*@function*@param{vec2}p Value to hash to generate the number from.*@return{float}Random number.**@example*float n=gln_rand(vec2(2.5,-1.8));*/float gln_rand(vec2 p){return fract(1e4*sin(17.0*p.x+p.y*0.1)*(0.1+abs(sin(p.y*13.0+p.x))));}`,tt=`#define GLSLIFY 1
/***@typedef{struct}gln_tGerstnerWaveOpts Options for Gerstner Wave*generators.*@property{vec2}direction Direction of the wave*@property{float}steepness Steepness of the peeks*@property{float}wavelength Wavelength of the waves*/struct gln_tGerstnerWaveOpts{vec2 direction;float steepness;float wavelength;};/***Implimentation of Gerstner Wave*Based on: https:**@name gln_GerstnerWave*@function*@param{vec3}p Point to sample Gerstner Waves at.*@param{gln_tGerstnerWaveOpts}opts*@param{float}dt**@example*float n=gln_perlin(position.xy);*/vec3 gln_GerstnerWave(vec3 p,gln_tGerstnerWaveOpts opts,float dt){float steepness=opts.steepness;float wavelength=opts.wavelength;float k=2.0*gln_PI/wavelength;float c=sqrt(9.8/k);vec2 d=normalize(opts.direction);float f=k*(dot(d,p.xy)-c*dt);float a=steepness/k;return vec3(d.x*(a*cos(f)),a*sin(f),d.y*(a*cos(f)));}`,it=`#define GLSLIFY 1
vec3 _snois3(vec3 x){float s=gln_simplex(vec3(x));float s1=gln_simplex(vec3(x.y-19.1,x.z+33.4,x.x+47.2));float s2=gln_simplex(vec3(x.z+74.2,x.x-124.5,x.y+99.4));vec3 c=vec3(s,s1,s2);return c;}/***Generates 3D Curl Noise.**@name gln_curl*@function*@param{vec2}p Point to sample Curl Noise at.*@return{float}Value of Curl Noise at point "p".**@example*vec3 n=gln_curl(position);*/vec3 gln_curl(vec3 p){const float e=.1;vec3 dx=vec3(e,0.0,0.0);vec3 dy=vec3(0.0,e,0.0);vec3 dz=vec3(0.0,0.0,e);vec3 p_x0=_snois3(p-dx);vec3 p_x1=_snois3(p+dx);vec3 p_y0=_snois3(p-dy);vec3 p_y1=_snois3(p+dy);vec3 p_z0=_snois3(p-dz);vec3 p_z1=_snois3(p+dz);float x=p_y1.z-p_y0.z-p_z1.y+p_z0.y;float y=p_z1.x-p_z0.x-p_x1.z+p_x0.z;float z=p_x1.y-p_x0.y-p_y1.x+p_y0.x;const float divisor=1.0/(2.0*e);return normalize(vec3(x,y,z)*divisor);}`;const $=Qe,nt=Ke,st=Ze,at=Je,ae=et,ue=tt,ot=it,rt=[$,nt,st,at,ue,ot];typeof process<"u"&&process.versions!=null&&process.versions.node!=null;function lt(e){let t=[],i=[];return e.forEach(n=>{const s=n.match(/#name: (.*)\n/),o=n.match(/#deps: (.*)\n/);t.push(s?s[1]:""),i.push(o?o[1].split(" "):[])}),{names:t,deps:i}}function ct(e){const{names:t,deps:i}=lt(e);let n=[],s;if(i.forEach((o,r)=>{o.forEach((l,c)=>{t.includes(l)||(n.push({outter:r,inner:c}),s=t[r])})}),n.length!==0){const o=n.map(r=>i[r.outter][r.inner]);throw new Error(`glNoise: Missing dependencies "${o.join(", ")}" for "${s}"`)}}function oe(e,t){let i="",n="",s="";return e.defines&&(i=e.defines),e.header&&(n=e.header),e.main&&(s=e.main),t?(ct(t),{defines:`
`+i+`
`+ae,header:`
`+t.join(`
`)+`
`+n,main:`
`+s}):{defines:`
`+i+`
`+ae,header:`
`+rt.join(`
`)+`
 // ABCD 
`+n,main:`
`+s}}const ft="precision mediump float;varying vec2 vUV;void main(){vUV=uv;gl_Position=vec4(position,1.0);}",ut="precision mediump float;uniform sampler2D tDiffuse;varying vec2 vUV;uniform float uContrast;uniform float uSubtraction;void main(){vec4 base=texture2D(tDiffuse,vUV);vec3 contrastAdjustment=((base.rgb-0.5)*uContrast+0.5)-uSubtraction;gl_FragColor=clamp(vec4(contrastAdjustment,base.a),0.0,1.0);}",pt="uniform float uTime;uniform float uHeight;varying float vHeight;vec3 displace(vec3 point){vec3 p=point;p.y+=uTime*2.0;gln_tFBMOpts fbmOpts=gln_tFBMOpts(1.0,0.4,2.3,0.1,1.0,5,false,false);gln_tGerstnerWaveOpts A=gln_tGerstnerWaveOpts(vec2(0.5,-0.5),0.3,0.5);gln_tGerstnerWaveOpts B=gln_tGerstnerWaveOpts(vec2(0.0,1.0),0.25,1.0);gln_tGerstnerWaveOpts C=gln_tGerstnerWaveOpts(vec2(-0.5,0.5),0.15,1.25);gln_tGerstnerWaveOpts D=gln_tGerstnerWaveOpts(vec2(1.0,0.0),0.25,0.75);gln_tGerstnerWaveOpts E=gln_tGerstnerWaveOpts(vec2(0.5,0.25),0.30,1.0);gln_tGerstnerWaveOpts F=gln_tGerstnerWaveOpts(vec2(0.25,-0.5),0.15,0.5);vec3 n=vec3(0.0);if(p.z>=uHeight/2.0){n.z+=gln_normalize(gln_pfbm(p.xy+(uTime*1.5),fbmOpts));n+=gln_GerstnerWave(p,A,uTime).xzy;n+=gln_GerstnerWave(p,B,uTime).xzy;n+=gln_GerstnerWave(p,C,uTime).xzy;n+=gln_GerstnerWave(p,D,uTime).xzy;n+=gln_GerstnerWave(p,E,uTime).xzy;n+=gln_GerstnerWave(p,F,uTime).xzy;}vHeight=n.z;point+=n;vec2 pos=vec2(0,4);float maxSink=1.5;float effectRadius=4.0;float deepnessCoef=1.0;float offset=1.0;vec2 distanceToCam=point.xy-pos;float cameraClosenessCoef=length(distanceToCam*deepnessCoef)*effectRadius;point.z+=length(clamp(distanceToCam,-effectRadius,effectRadius))*1.0;point.z*=0.4;point.z-=offset;return point;}vec3 orthogonal(vec3 v){return normalize(abs(v.x)>abs(v.z)? vec3(-v.y,v.x,0.0): vec3(0.0,-v.z,v.y));}vec3 recalcNormals(vec3 newPos){float offset=0.001;vec3 tangent=orthogonal(normal);vec3 bitangent=normalize(cross(normal,tangent));vec3 neighbour1=position+tangent*offset;vec3 neighbour2=position+bitangent*offset;vec3 displacedNeighbour1=displace(neighbour1);vec3 displacedNeighbour2=displace(neighbour2);vec3 displacedTangent=displacedNeighbour1-newPos;vec3 displacedBitangent=displacedNeighbour2-newPos;return normalize(cross(displacedTangent,displacedBitangent));}void main(){csm_Position=displace(position);csm_Normal=recalcNormals(csm_Position);}",dt="uniform sampler2D myTexture;varying float vHeight;uniform vec3 waterColor;uniform vec3 waterHighlight;uniform float offset;uniform float contrast;uniform float brightness;vec3 calcColor(){float mask=(pow(vHeight,2.)-offset)*contrast;vec3 diffuseColor=mix(waterColor,waterHighlight,mask);diffuseColor*=brightness;return diffuseColor;}void main(){csm_DiffuseColor=vec4(calcColor(),1.0);}",ht="varying vec2 vUV;void main(){csm_Position=position;csm_Normal=normal;vUV=uv;}",mt="uniform sampler2D myTexture;varying vec2 vUV;uniform float uTime;uniform float displacementScale;uniform float displacementStrength;void main(){vec2 displacedUV=vUV+((gln_perlin(vUV*displacementScale+vec2(uTime))*displacementStrength));vec4 texColor=texture(myTexture,vUV);csm_DiffuseColor=texColor;}",vt="/assets/MoonTexture-RRPljFYe.jpg",gt="/assets/NightSkyTexture_Dark-C1Q8Yqaq.png",_t="/assets/HoldToEnter-DOzR_7l1.png";class xt extends Ee{constructor(t,i,n,s){super(t,i,n,s)}async DoInit(){this.InitPostProcessing(),this.InitEnterAniamtion(),this.InitExitAnimation(),await Promise.all([this.InitMoon(),this.InitSkybox(),this.InitWaves(),this.InitPopupText()]),this.IntiRayasting(),this.InitLights(),this.InitCamera(),this.InitMouseMovement(),this.InitHoldTransition(),super.SceneAdditions(),super.Enter()}DoEnter(){this.EAApertureUp.start(),this.contrastEnterTween.start()}DoExit(){window.history.length>1?window.history.back():window.location.href="/project/HTML/Others.html"}InitPostProcessing(){this.guiPostprocessing={},this.bloomPassLow=new Z(new P(window.innerWidth,window.innerHeight),.5,.1,.1),this.composer.addPass(this.bloomPassLow),this.bloomPass=new Z(new P(window.innerWidth,window.innerHeight),10.5,.1,2.5),this.composer.addPass(this.bloomPass),this.filmPass=new ye(1,!1),this.composer.addPass(this.filmPass),this.appertureCoef=1e-5,this.bokehPass=new Ne(this.scene,this.camera,{focus:1,aperture:.025,maxblur:.01}),this.composer.addPass(this.bokehPass),this.guiPostprocessing.bokeh=this.bokehPass,this.afterImagePass=new ke,this.afterImagePass.uniforms.damp={value:0},this.composer.addPass(this.afterImagePass),this.i_uContrast=1,this.i_uSubtraction=0,this.contrastTransitionMaterial=new U({defines:{LABEL:"value"},uniforms:{tDiffuse:new Se(null),uContrast:{value:this.i_uContrast},uSubtraction:{value:this.i_uSubtraction}},vertexShader:ft,fragmentShader:ut}),this.contrastTransitionPass=new we(this.contrastTransitionMaterial,"tDiffuse"),this.composer.addPass(this.contrastTransitionPass),this.topFadeEnterParamObject={value:0},this.topFadeEnterTween=new v.Tween(this.topFadeEnterParamObject).to({value:1},.5*1e3).easing(v.Easing.Cubic.Out).onUpdate(()=>{}),this.topFadeExitParamObject={value:1},this.topFadeExitTween=new v.Tween(this.topFadeExitParamObject).to({value:0},.5*1e3).easing(v.Easing.Cubic.Out).onUpdate(()=>{})}async InitMoon(){const t=new J(10,30,30),i=new ee({map:new L().load(vt)});this.moon=new D(t,i),this.moon.position.set(0,150,200),this.moon.rotateX(T.degToRad(-40)),this.moon.rotateY(T.degToRad(90)),this.pageMeshes.push(this.moon)}async InitSkybox(){const t=new J(500,32,32),i=new te({map:new L().load(gt),side:Te});this.skybox=new D(t,i),this.skybox.position.set(0,0,0),this.skybox.rotation.y=180,this.pageMeshes.push(this.skybox)}InitHoldTransition(){this.holdTimeToTransition=3,this.isHoldTransitioning=!1,this.inTransitionAnimation=!1,this.InitTransitionClock(),this.transitionAnimationClock=new R(!1),this.TACameraRotSpeed=1,this.TACameraRotationGoal=T.DEG2RAD*75,this.TARegularCameraRotationFadeClock=new R(!1)}InitTransitionClock(){this.holdTransitionClock=new R(!1),this.stopHoldTransitionClock=new R(!1)}async InitWaves(){const t={defines:"",header:"",main:pt},{defines:i,header:n,main:s}=await oe(t,[ue,$]),o=`${i}${n}${s}`,r=6,l=4,c=200,u=200,g=new ie(r,l,c,u),h=new se({baseMaterial:ee,vertexShader:o,fragmentShader:dt,uniforms:{uTime:{value:0},uHeight:{value:0},waterColor:{value:new z(0,0,0)},waterHighlight:{value:new z(0,0,.025)},offset:{value:0},contrast:{value:.5},brightness:{value:.5}}});this.waves=new D(g,h),this.waves.position.set(0,0,l/2),this.waves.rotateX(T.degToRad(270)),this.pageMeshes.push(this.waves),this.waveSpeed=1}async InitPopupText(){const t={defines:"",header:"",main:mt},{defines:i,header:n,main:s}=await oe(t,[$]),o=`${i}${n}${s}`,r=new ie(1.8,.3,1,1),l=new se({baseMaterial:te,vertexShader:ht,fragmentShader:o,transparent:!0,uniforms:{uTime:{value:0},displayAlpha:{value:1},displacementScale:{value:15},displacementStrength:{value:.01}},map:new L().load(_t)});this.popupText=new D(r,l),this.popupText.position.set(0,.6,2.5),this.popupText.lookAt(this.camera.position),this.pageMeshes.push(this.popupText),this.popupTextShowPosition=new z(0,1.1,2.5),this.popupTextHidePosition=new z(0,.6,2.5),this.popupTextMouseY=.25,this.isPopupTextShown=!1,this.popupTextSpeed=2e3,this.UpdateShowPopupTextTween(),this.UpdateHidePopupTextTween()}IntiRayasting(){this.raycaster=new Me,this.scrabbleRaycastTargets=[],this.scrabbleRaycastTargets.push(this.scrabbleLogo)}InitLights(){this.ambientLight=new Ce(16777215),this.ambientLight.intensity=1,this.scene.add(this.ambientLight),this.pointLightA=new Pe,this.pointLightA.position.set(0,10,20),this.pointLightA.intensity=2500,this.pointLightA.color=new ce(.75,.75,1),this.scene.add(this.pointLightA)}InitCamera(){this.cameraBaseFov=this.camera.fov,this.cameraFovRange=-2.5,this.cameraFovSpeed=.25,this.cameraBaseRotX=T.degToRad(-20),this.cameraBaseRotY=T.degToRad(180),this.cameraRotOffsetIdle=new P(0,0),this.cameraYMovementSpeed=1,this.cameraYMovementRange=.025,this.cameraYOffset=.2+this.cameraYMovementRange,this.cameraIdleXRotationSpeed=1,this.cameraIdleYRotationSpeed=this.cameraIdleXRotationSpeed/2,this.cameraIdleXRotationRange=.025,this.cameraIdleYRotationRange=.025,this.cameraIdleXRotationOffset=this.cameraIdleXRotationRange/2*-1,this.cameraIdleYRotationOffset=this.cameraIdleYRotationRange/2*-1,this.transitionFOVCoef=0}InitMouseMovement(){this.currentMouseFollowPos=new P(0,0),this.mouseXCoef=.3,this.mouseYCoef=.3}DoUpdate(){return this.UpdateTweens(),this.UpdateTransition(),this.UpdateWaves(),this.UpdateSkybox(),this.UpdateCamera(),this.UpdatePopupText(),this.nextPageIndex}UpdateTweens(){this.enterAnimationPlaying&&(this.contrastEnterTween.isPlaying()&&this.contrastEnterTween.update(),this.EAApertureUp.isPlaying()?this.EAApertureUp.update():this.EAApertureDown.isPlaying()&&this.EAApertureDown.update()),this.topFadeEnterTween.isPlaying()?this.topFadeEnterTween.update():this.topFadeExitTween.isPlaying()&&this.topFadeExitTween.update()}UpdateTransition(){this.holdTransitionClock.getElapsedTime()>=this.holdTimeToTransition&&!this.inTransitionAnimation?this.StartTransitionAnimation():this.inTransitionAnimation&&this.contrastExitTween.update(),this.stopHoldTransitionClock.running&&this.holdTransitionClock.getElapsedTime()-this.stopHoldTransitionClock.getElapsedTime()<=0?this.InitTransitionClock():this.holdTransitionClock.getElapsedTime()>=3,this.isHoldTransitioning&&this.afterImageExitTween.update()}StartTransitionAnimation(){this.inTransitionAnimation=!0,this.transitionAnimationClock.start(),this.TARegularCameraRotationFadeClock.start(),this.contrastExitTween.start()}UpdateWaves(){this.waves.material.uniforms.uTime.value+=this.clock.getDelta()*.15}UpdateBotFade(){this.botFade.material.uniforms.uTime.value+=this.clock.getDelta()}UpdateSkybox(){const n=this.clock.getDelta()*.01+0;this.skybox.rotation.y+=n}UpdateCamera(){this.transitionFOVCoef=this.isHoldTransitioning?this.holdTransitionClock.getElapsedTime():this.holdTransitionClock.getElapsedTime()-this.stopHoldTransitionClock.getElapsedTime(),this.transitionFOVCoef=T.clamp((this.transitionFOVCoef*2)**2,0,40),this.camera.fov=Math.sin(this.clock.getElapsedTime()*this.cameraFovSpeed)*this.cameraFovRange+this.cameraBaseFov+this.transitionFOVCoef,this.camera.position.y=Math.sin(this.clock.getElapsedTime()*this.cameraYMovementSpeed)*this.cameraYMovementRange+this.cameraYOffset,this.inTransitionAnimation||this.UpdateCameraRotation(),this.camera.updateProjectionMatrix()}UpdateCameraRotation(){this.cameraRotOffsetIdle.x=Math.sin(this.clock.getElapsedTime()*this.cameraIdleXRotationSpeed)*this.cameraIdleXRotationRange+this.cameraIdleXRotationOffset,this.cameraRotOffsetIdle.y=Math.sin(this.clock.getElapsedTime()*this.cameraIdleYRotationSpeed)*this.cameraIdleYRotationRange+this.cameraIdleYRotationOffset;var t=this.mousePosition.clone();t.y=-this.mousePosition.x*this.mouseXCoef,t.x=-this.mousePosition.y*this.mouseYCoef;var i=new P().subVectors(t,this.currentMouseFollowPos),n=i.length();i.normalize();var s=Math.min(n*.2,1);i.multiplyScalar(s),this.currentMouseFollowPos.add(i);var o=this.cameraRotOffsetIdle.x+this.currentMouseFollowPos.x,r=this.cameraRotOffsetIdle.y+this.currentMouseFollowPos.y,l=-T.clamp(this.transitionAnimationClock.getElapsedTime()*this.TACameraRotSpeed,0,this.TACameraRotationGoal),c=0,u=T.clamp(1-this.TARegularCameraRotationFadeClock.getElapsedTime(),0,1),g=o*u+l,h=r*u+c;this.camera.rotation.x=this.cameraBaseRotX+g,this.camera.rotation.y=this.cameraBaseRotY+h}UpdatePopupText(){this.PopupTextChangeStateCheck(),this.isPopupTextShown?this.popupText_showTween.update():this.popupText_hideTween.update()}PopupTextChangeStateCheck(){this.inTransitionAnimation||(this.mousePosition.y>this.popupTextMouseY&&!this.isPopupTextShown?this.ShowPopupText():this.mousePosition.y<=this.popupTextMouseY&&this.isPopupTextShown&&this.HidePopupText())}ShowPopupText(){this.isPopupTextShown=!0,this.UpdateShowPopupTextTween(),this.popupText_showTween.start(),this.topFadeEnterTween.start(),this.topFadeExitTween.stop()}HidePopupText(){this.isPopupTextShown=!1,this.UpdateHidePopupTextTween(),this.popupText_hideTween.start(),this.topFadeEnterTween.stop(),this.topFadeExitTween.start()}UpdateShowPopupTextTween(){const t=this.popupText.position.distanceTo(this.popupTextShowPosition)*this.popupTextSpeed;this.popupText_showTween=new v.Tween(this.popupText.position).to(this.popupTextShowPosition,t).easing(v.Easing.Cubic.Out)}UpdateHidePopupTextTween(){const t=this.popupText.position.distanceTo(this.popupTextHidePosition)*this.popupTextSpeed;this.popupText_hideTween=new v.Tween(this.popupText.position).to(this.popupTextHidePosition,t).easing(v.Easing.Cubic.Out)}StartHoldTransition(){this.InitTransitionClock(),this.isHoldTransitioning=!0,this.holdTransitionClock.start(),this.stopHoldTransitionClock.stop(),this.afterImageExitObject={value:0},this.afterImageExitTween=new v.Tween(this.afterImageExitObject).to({value:.95},1*1e3).easing(v.Easing.Cubic.Out).onUpdate(()=>{this.afterImagePass.uniforms.damp={value:this.afterImageExitObject.value}}),this.afterImageExitTween.start()}StopHoldTransition(){this.isHoldTransitioning=!1,this.afterImagePass.uniforms.damp={value:0},this.stopHoldTransitionClock.start(),this.holdTransitionClock.stop(),this.afterImageExitTween.stop()}DoOnMouseDown(t){this.isPopupTextShown&&!this.isHoldTransitioning&&!this.inTransitionAnimation&&this.StartHoldTransition()}DoOnMouseUp(t){this.isHoldTransitioning&&!this.inTransitionAnimation&&this.StopHoldTransition()}InitEnterAniamtion(){this.enterAnimationPlaying=!0,this.apertureObject={value:this.guiPostprocessing.bokeh.uniforms.aperture.value},this.EAApertureDown=new v.Tween(this.apertureObject).to({value:0},1.5*1e3).easing(v.Easing.Cubic.Out).onUpdate(()=>{this.guiPostprocessing.bokeh.uniforms.aperture.value=this.apertureObject.value}).onComplete(()=>{this.enterAnimationPlaying=!1}),this.EAApertureUp=new v.Tween(this.apertureObject).to({value:5*this.appertureCoef},1*1e3).easing(v.Easing.Cubic.Out).onUpdate(()=>{this.guiPostprocessing.bokeh.uniforms.aperture.value=this.apertureObject.value}).onComplete(()=>{this.EAApertureDown.start()}),this.contrastParamObject={value:0},this.contrastEnterTween=new v.Tween(this.contrastParamObject).to({value:1},1.5*1e3).easing(v.Easing.Cubic.Out).onUpdate(()=>{this.contrastTransitionMaterial.uniforms.uContrast={value:this.contrastParamObject.value},this.contrastTransitionMaterial.uniforms.uSubtraction={value:1-this.contrastParamObject.value}})}InitExitAnimation(){this.contrastExitParamObject={value:0},this.contrastExitTween=new v.Tween(this.contrastExitParamObject).to({value:1},1*1e3).easing(v.Easing.Cubic.Out).onUpdate(()=>{this.contrastTransitionMaterial.uniforms.uContrast={value:1-this.contrastExitParamObject.value},this.contrastTransitionMaterial.uniforms.uSubtraction={value:this.contrastExitParamObject.value}}).onComplete(()=>{super.Exit()})}}new xt});export default bt();
