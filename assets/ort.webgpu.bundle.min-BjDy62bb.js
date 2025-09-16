var Ug=Object.defineProperty;var Wg=(e,t,r)=>t in e?Ug(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var so=(e,t,r)=>Wg(e,typeof t!="symbol"?t+"":t,r);/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var xa=Object.defineProperty,qg=Object.getOwnPropertyDescriptor,Vg=Object.getOwnPropertyNames,Lg=Object.prototype.hasOwnProperty,Gg=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),lr=(e,t)=>{for(var r in t)xa(e,r,{get:t[r],enumerable:!0})},Hg=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Vg(t))!Lg.call(e,s)&&s!==r&&xa(e,s,{get:()=>t[s],enumerable:!(a=qg(t,s))||a.enumerable});return e},Dr=e=>Hg(xa({},"__esModule",{value:!0}),e),Kt,ct,Dt,oo,Wd,qd=q(()=>{Kt=new Map,ct=[],Dt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let a=Kt.get(e);if(a===void 0)Kt.set(e,{backend:t,priority:r});else{if(a.priority>r)return;if(a.priority===r&&a.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let s=ct.indexOf(e);s!==-1&&ct.splice(s,1);for(let i=0;i<ct.length;i++)if(Kt.get(ct[i]).priority<=r){ct.splice(i,0,e);return}ct.push(e)}return}throw new TypeError("not a valid backend")},oo=async e=>{let t=Kt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(a){return r||(t.error=`${a}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Wd=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),a=r.length===0?ct:r,s,i=[],o=new Set;for(let d of a){let p=await oo(d);typeof p=="string"?i.push({name:d,err:p}):(s||(s=p),s===p&&o.add(d))}if(!s)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:p}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${p}`);let l=t.filter(d=>o.has(typeof d=="string"?d:d.name));return[s,new Proxy(e,{get:(d,p)=>p==="executionProviders"?l:Reflect.get(d,p)})]}}),Fg=q(()=>{qd()}),Vd,jg=q(()=>{Vd="1.21.0"}),fi,Ve,Ld=q(()=>{jg(),fi="warning",Ve={wasm:{},webgl:{},webgpu:{},versions:{common:Vd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);fi=e}},get logLevel(){return fi}},Object.defineProperty(Ve,"logLevel",{enumerable:!0})}),ve,Kg=q(()=>{Ld(),ve=Ve}),Gd,Hd,Qg=q(()=>{Gd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let a=r.getContext("2d");if(a!=null){let s,i;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[3]):(s=e.dims[3],i=e.dims[2]);let o=(t==null?void 0:t.format)!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let m=i*s,g=0,y=m,_=m*2,w=-1;o==="RGBA"?(g=0,y=m,_=m*2,w=m*3):o==="RGB"?(g=0,y=m,_=m*2):o==="RBG"&&(g=0,_=m,y=m*2);for(let b=0;b<i;b++)for(let S=0;S<s;S++){let v=(e.data[g++]-p[0])*d[0],$=(e.data[y++]-p[1])*d[1],T=(e.data[_++]-p[2])*d[2],k=w===-1?255:(e.data[w++]-p[3])*d[3];a.fillStyle="rgba("+v+","+$+","+T+","+k+")",a.fillRect(S,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Hd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(r!=null){let s,i,o;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[1],o=e.dims[3]):(s=e.dims[3],i=e.dims[2],o=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t==null?void 0:t.norm,p,m;d===void 0||d.mean===void 0?p=[255,255,255,255]:typeof d.mean=="number"?p=[d.mean,d.mean,d.mean,d.mean]:(p=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(p[3]=d.mean[3])),d===void 0||d.bias===void 0?m=[0,0,0,0]:typeof d.bias=="number"?m=[d.bias,d.bias,d.bias,d.bias]:(m=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(m[3]=d.bias[3]));let g=i*s;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let y=4,_=0,w=1,b=2,S=3,v=0,$=g,T=g*2,k=-1;l==="RGBA"?(v=0,$=g,T=g*2,k=g*3):l==="RGB"?(v=0,$=g,T=g*2):l==="RBG"&&(v=0,T=g,$=g*2),a=r.createImageData(s,i);for(let C=0;C<i*s;_+=y,w+=y,b+=y,S+=y,C++)a.data[_]=(e.data[v++]-m[0])*p[0],a.data[w]=(e.data[$++]-m[1])*p[1],a.data[b]=(e.data[T++]-m[2])*p[2],a.data[S]=k===-1?255:(e.data[k++]-m[3])*p[3]}else throw new Error("Can not access image data");return a}}),$r,Fd,jd,Kd,Qd,Zd,Zg=q(()=>{Sa(),$r=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:a}=t,s=t.norm??{mean:255,bias:0},i,o;typeof s.mean=="number"?i=[s.mean,s.mean,s.mean,s.mean]:i=[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],typeof s.bias=="number"?o=[s.bias,s.bias,s.bias,s.bias]:o=[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*a,m=d==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),g=4,y=0,_=1,w=2,b=3,S=0,v=p,$=p*2,T=-1;l==="RGB"&&(g=3,y=0,_=1,w=2,b=-1),d==="RGBA"?T=p*3:d==="RBG"?(S=0,$=p,v=p*2):d==="BGR"&&($=0,v=p,S=p*2);for(let k=0;k<p;k++,y+=g,w+=g,_+=g,b+=g)m[S++]=(e[y]+o[0])/i[0],m[v++]=(e[_]+o[1])/i[1],m[$++]=(e[w]+o[2])/i[2],T!==-1&&b!==-1&&(m[T++]=(e[b]+o[3])/i[3]);return d==="RGBA"?new De("float32",m,[1,4,r,a]):new De("float32",m,[1,3,r,a])},Fd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,a=typeof ImageData<"u"&&e instanceof ImageData,s=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",o,l=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=d();m.width=e.width,m.height=e.height;let g=p(m);if(g!=null){let y=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(y=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=y,l.width=_}else l.tensorFormat="RGBA",l.height=y,l.width=_;g.drawImage(e,0,0),o=g.getImageData(0,0,_,y).data}else throw new Error("Can not access image data")}else if(a){let m,g;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,g=t.resizedWidth):(m=e.height,g=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=m,l.width=g,t!==void 0){let y=d();y.width=g,y.height=m;let _=p(y);if(_!=null)_.putImageData(e,0,0),o=_.getImageData(0,0,g,m).data;else throw new Error("Can not access image data")}else o=e.data}else if(s){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=d();m.width=e.width,m.height=e.height;let g=p(m);if(g!=null){let y=e.height,_=e.width;return g.drawImage(e,0,0,_,y),o=g.getImageData(0,0,_,y).data,l.height=y,l.width=_,$r(o,l)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,g)=>{let y=d(),_=p(y);if(!e||!_)return g();let w=new Image;w.crossOrigin="Anonymous",w.src=e,w.onload=()=>{y.width=w.width,y.height=w.height,_.drawImage(w,0,0,y.width,y.height);let b=_.getImageData(0,0,y.width,y.height);l.height=y.height,l.width=y.width,m($r(b.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return $r(o,l);throw new Error("Input data provided is not supported - aborted tensor creation")},jd=(e,t)=>{let{width:r,height:a,download:s,dispose:i}=t,o=[1,a,r,4];return new De({location:"texture",type:"float32",texture:e,dims:o,download:s,dispose:i})},Kd=(e,t)=>{let{dataType:r,dims:a,download:s,dispose:i}=t;return new De({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:a,download:s,dispose:i})},Qd=(e,t)=>{let{dataType:r,dims:a,download:s,dispose:i}=t;return new De({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:a,download:s,dispose:i})},Zd=(e,t,r)=>new De({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),kt,ir,mi,Xd,Xg=q(()=>{kt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ir=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),mi=!1,Xd=()=>{if(!mi){mi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,a=typeof r<"u"&&r.from;e&&(kt.set("int64",BigInt64Array),ir.set(BigInt64Array,"int64")),t&&(kt.set("uint64",BigUint64Array),ir.set(BigUint64Array,"uint64")),a?(kt.set("float16",r),ir.set(r,"float16")):kt.set("float16",Uint16Array)}}}),Jd,Yd,Jg=q(()=>{Sa(),Jd=e=>{let t=1;for(let r=0;r<e.length;r++){let a=e[r];if(typeof a!="number"||!Number.isSafeInteger(a))throw new TypeError(`dims[${r}] must be an integer, got: ${a}`);if(a<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${a}`);t*=a}return t},Yd=(e,t)=>{switch(e.location){case"cpu":return new De(e.type,e.data,t);case"cpu-pinned":return new De({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new De({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new De({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new De({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),De,Sa=q(()=>{Qg(),Zg(),Xg(),Jg(),De=class{constructor(e,t,r){Xd();let a,s;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,a=e.type,s=e.dims,e.location){case"cpu-pinned":{let o=kt.get(a);if(!o)throw new TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(a!=="float32")throw new TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(a!=="float32"&&a!=="float16"&&a!=="int32"&&a!=="int64"&&a!=="uint32"&&a!=="uint64"&&a!=="int8"&&a!=="uint8"&&a!=="bool"&&a!=="uint4"&&a!=="int4")throw new TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,l;if(typeof e=="string")if(a=e,l=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let d=kt.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);e==="uint64"||e==="int64"?o=d.from(t,BigInt):o=d.from(t)}else if(t instanceof d)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&d!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${a} tensor's data must be type of ${d}`)}else if(l=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")a="string",o=e;else if(d==="boolean")a="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(e instanceof Uint8ClampedArray)a="uint8",o=Uint8Array.from(e);else{let d=ir.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);a=d,o=e}if(l===void 0)l=[o.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");s=l,this.cpuData=o,this.dataLocation="cpu"}let i=Jd(s);if(this.cpuData&&i!==this.cpuData.length&&!((a==="uint4"||a==="int4")&&Math.ceil(i/2)===this.cpuData.length))throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=s,this.size=i}static async fromImage(e,t){return Fd(e,t)}static fromTexture(e,t){return jd(e,t)}static fromGpuBuffer(e,t){return Kd(e,t)}static fromMLTensor(e,t){return Qd(e,t)}static fromPinnedBuffer(e,t,r){return Zd(e,t,r)}toDataURL(e){return Gd(this,e)}toImageData(e){return Hd(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Yd(this,e)}}}),et,ep=q(()=>{Sa(),et=De}),Pr,gi,tt,Ke,tp=q(()=>{Ld(),Pr=(e,t)=>{(typeof Ve.trace>"u"?!Ve.wasm.trace:!Ve.trace)||console.timeStamp(`${e}::ORT::${t}`)},gi=(e,t)=>{var s;let r=((s=new Error().stack)==null?void 0:s.split(/\r\n|\r|\n/g))||[],a=!1;for(let i=0;i<r.length;i++){if(a&&!r[i].includes("TRACE_FUNC")){let o=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(o+=`::${t}`),Pr("CPU",o);return}r[i].includes("TRACE_FUNC")&&(a=!0)}},tt=e=>{(typeof Ve.trace>"u"?!Ve.wasm.trace:!Ve.trace)||gi("BEGIN",e)},Ke=e=>{(typeof Ve.trace>"u"?!Ve.wasm.trace:!Ve.trace)||gi("END",e)}}),rp,Yg=q(()=>{qd(),ep(),tp(),rp=class ip{constructor(t){this.handler=t}async run(t,r,a){tt();let s={},i={};if(typeof t!="object"||t===null||t instanceof et||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof et)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);s[p]=null}if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,m=Object.getOwnPropertyNames(r);for(let g of this.outputNames)if(m.indexOf(g)!==-1){let y=r[g];(y===null||y instanceof et)&&(p=!0,o=!1,s[g]=y)}if(p){if(typeof a=="object"&&a!==null)i=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(o)for(let p of this.outputNames)s[p]=null;let l=await this.handler.run(t,s,i),d={};for(let p in l)if(Object.hasOwnProperty.call(l,p)){let m=l[p];m instanceof et?d[p]=m:d[p]=new et(m.type,m.data,m.dims)}return Ke(),d}async release(){return this.handler.dispose()}static async create(t,r,a,s){tt();let i,o={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,g=0,y=t.byteLength;if(typeof r=="object"&&r!==null)o=r;else if(typeof r=="number"){if(g=r,!Number.isSafeInteger(g))throw new RangeError("'byteOffset' must be an integer.");if(g<0||g>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(y=t.byteLength-g,typeof a=="number"){if(y=a,!Number.isSafeInteger(y))throw new RangeError("'byteLength' must be an integer.");if(y<=0||g+y>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-g}].`);if(typeof s=="object"&&s!==null)o=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else if(typeof a<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,g,y)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,d]=await Wd(o),p=await l.createInferenceSessionHandler(i,d);return Ke(),new ip(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),ap,ey=q(()=>{Yg(),ap=rp}),ty=q(()=>{}),ry=q(()=>{}),iy=q(()=>{}),ay=q(()=>{}),np={};lr(np,{InferenceSession:()=>ap,TRACE:()=>Pr,TRACE_FUNC_BEGIN:()=>tt,TRACE_FUNC_END:()=>Ke,Tensor:()=>et,env:()=>ve,registerBackend:()=>Dt});var Qe=q(()=>{Fg(),Kg(),ey(),ep(),ty(),ry(),tp(),iy(),ay()}),ka=q(()=>{}),sp={};lr(sp,{default:()=>op});var yi,_i,op,ny=q(()=>{var e;pf(),At(),Ta(),yi="ort-wasm-proxy-worker",_i=((e=globalThis.self)==null?void 0:e.name)===yi,_i&&(self.onmessage=t=>{let{type:r,in:a}=t.data;try{switch(r){case"init-wasm":Ca(a.wasm).then(()=>{Ha(a).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})})},s=>{postMessage({type:r,err:s})});break;case"init-ep":{let{epName:s,env:i}=a;Fa(i,s).then(()=>{postMessage({type:r})},o=>{postMessage({type:r,err:o})});break}case"copy-from":{let{buffer:s}=a,i=Gr(s);postMessage({type:r,out:i});break}case"create":{let{model:s,options:i}=a;ja(s,i).then(o=>{postMessage({type:r,out:o})},o=>{postMessage({type:r,err:o})});break}case"release":Ka(a),postMessage({type:r});break;case"run":{let{sessionId:s,inputIndices:i,inputs:o,outputIndices:l,options:d}=a;Qa(s,i,o,l,new Array(l.length).fill(null),d).then(p=>{p.some(m=>m[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:p},Xa([...o,...p]))},p=>{postMessage({type:r,err:p})});break}case"end-profiling":Za(a),postMessage({type:r});break;default:}}catch(s){postMessage({type:r,err:s})}}),op=_i?null:t=>new Worker(t??Me,{type:"module",name:yi})}),up={};lr(up,{default:()=>lp});var wi,bi,lp,uo,sy=q(()=>{var e,t;bi=(wi=import.meta.url,async function(r={}){var no;var a,s,i=r,o=new Promise((n,u)=>{a=n,s=u}),l=typeof window=="object",d=typeof WorkerGlobalScope<"u",p=d&&((no=self.name)==null?void 0:no.startsWith("em-pthread"));i.mountExternalData=(n,u)=>{n.startsWith("./")&&(n=n.substring(2)),(i.Bd||(i.Bd=new Map)).set(n,u)},i.unmountExternalData=()=>{delete i.Bd};var m=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let g=()=>{let n=(h,c,f)=>(...x)=>{let I=Xe,A=c==null?void 0:c();x=h(...x);let R=c==null?void 0:c();return A!==R&&(h=R,f(A),c=f=null),Xe!=I?new Promise((U,H)=>{si={resolve:U,reject:H}}):x},u=h=>async(...c)=>{var f;try{if(i.Cd)throw Error("Session already started");let x=i.Cd={be:c[0],errors:[]},I=await h(...c);if(i.Cd!==x)throw Error("Session mismatch");(f=i.Dd)==null||f.flush();let A=x.errors;if(0<A.length){let R=await Promise.all(A);if(R=R.filter(U=>U),0<R.length)throw Error(R.join(`
`))}return I}finally{i.Cd=null}};i._OrtCreateSession=n(i._OrtCreateSession,()=>i._OrtCreateSession,h=>i._OrtCreateSession=h),i._OrtRun=u(n(i._OrtRun,()=>i._OrtRun,h=>i._OrtRun=h)),i._OrtRunWithBinding=u(n(i._OrtRunWithBinding,()=>i._OrtRunWithBinding,h=>i._OrtRunWithBinding=h)),i._OrtBindInput=n(i._OrtBindInput,()=>i._OrtBindInput,h=>i._OrtBindInput=h),g=void 0};i.jsepInit=(n,u)=>{if(g==null||g(),n==="webgpu"){[i.Dd,i.Rd,i.Vd,i.Hd,i.Ud,i.hc,i.Wd,i.Zd,i.Sd,i.Td,i.Xd]=u;let h=i.Dd;i.jsepRegisterBuffer=(c,f,x,I)=>h.registerBuffer(c,f,x,I),i.jsepGetBuffer=c=>h.getBuffer(c),i.jsepCreateDownloader=(c,f,x)=>h.createDownloader(c,f,x),i.jsepOnCreateSession=c=>{h.onCreateSession(c)},i.jsepOnReleaseSession=c=>{h.onReleaseSession(c)},i.jsepOnRunStart=c=>h.onRunStart(c),i.$d=(c,f)=>{h.upload(c,f)}}else if(n==="webnn"){[i.Dd,i.Yd,i.Id,i.jsepEnsureTensor,i.Jd,i.jsepDownloadTensor]=u,i.jsepReleaseTensorId=i.Id,i.jsepUploadTensor=i.Jd;let h=i.Dd;i.jsepOnRunStart=c=>h.onRunStart(c),i.jsepOnRunEnd=h.onRunEnd.bind(h),i.jsepRegisterMLContext=(c,f)=>{h.registerMLContext(c,f)},i.jsepOnReleaseSession=c=>{h.onReleaseSession(c)},i.jsepCreateMLTensorDownloader=(c,f)=>h.createMLTensorDownloader(c,f),i.jsepRegisterMLTensor=(c,f,x,I)=>h.registerMLTensor(c,f,x,I),i.jsepCreateMLContext=c=>h.createMLContext(c),i.jsepRegisterMLConstant=(c,f,x,I,A)=>h.registerMLConstant(c,f,x,I,A,i.Bd),i.jsepRegisterGraphInput=h.registerGraphInput.bind(h),i.jsepIsGraphInput=h.isGraphInput.bind(h),i.jsepCreateTemporaryTensor=h.createTemporaryTensor.bind(h)}};var y,_,w=Object.assign({},i),b=(n,u)=>{throw u},S="";(l||d)&&(d?S=self.location.href:typeof document<"u"&&document.currentScript&&(S=document.currentScript.src),wi&&(S=wi),S=S.startsWith("blob:")?"":S.slice(0,S.replace(/[?#].*/,"").lastIndexOf("/")+1),d&&(_=n=>{var u=new XMLHttpRequest;return u.open("GET",n,!1),u.responseType="arraybuffer",u.send(null),new Uint8Array(u.response)}),y=async n=>{if(ge(n))return new Promise((h,c)=>{var f=new XMLHttpRequest;f.open("GET",n,!0),f.responseType="arraybuffer",f.onload=()=>{f.status==200||f.status==0&&f.response?h(f.response):c(f.status)},f.onerror=c,f.send(null)});var u=await fetch(n,{credentials:"same-origin"});if(u.ok)return u.arrayBuffer();throw Error(u.status+" : "+u.url)});var v=console.log.bind(console),$=console.error.bind(console),T=v,k=$;Object.assign(i,w),w=null;var C,E,z,B,W,G,ee,ae,Z,te,J,L,de,me=i.wasmBinary,F=!1,ge=n=>n.startsWith("file://");function M(){return C.buffer!=B.buffer&&ye(),B}function V(){return C.buffer!=B.buffer&&ye(),W}function le(){return C.buffer!=B.buffer&&ye(),G}function be(){return C.buffer!=B.buffer&&ye(),ee}function D(){return C.buffer!=B.buffer&&ye(),ae}function he(){return C.buffer!=B.buffer&&ye(),Z}function Ue(){return C.buffer!=B.buffer&&ye(),te}function Re(){return C.buffer!=B.buffer&&ye(),de}if(p){let n=function(u){try{var h=u.data,c=h.yd;if(c==="load"){let f=[];self.onmessage=x=>f.push(x),self.startWorker=()=>{postMessage({yd:"loaded"});for(let x of f)n(x);self.onmessage=n};for(let x of h.Od)i[x]&&!i[x].proxy||(i[x]=(...I)=>{postMessage({yd:"callHandler",Nd:x,args:I})},x=="print"&&(T=i[x]),x=="printErr"&&(k=i[x]));C=h.he,ye(),_t(h.ie)}else if(c==="run"){kf(h.xd),di(h.xd,0,0,1,0,0),sn(),ai(h.xd),Te||(es(),Te=!0);try{Tf(h.de,h.Fd)}catch(f){if(f!="unwind")throw f}}else h.target!=="setimmediate"&&(c==="checkMailbox"?Te&&pr():c&&(k(`worker: received unknown command ${c}`),k(h)))}catch(f){throw ts(),f}};var _t,Te=!1;k=function(...u){u=u.join(" "),console.error(u)},self.alert=function(...u){postMessage({yd:"alert",text:u.join(" "),fe:wr()})},self.onunhandledrejection=u=>{throw u.reason||u},self.onmessage=n}function ye(){var n=C.buffer;i.HEAP8=B=new Int8Array(n),i.HEAP16=G=new Int16Array(n),i.HEAPU8=W=new Uint8Array(n),i.HEAPU16=ee=new Uint16Array(n),i.HEAP32=ae=new Int32Array(n),i.HEAPU32=Z=new Uint32Array(n),i.HEAPF32=te=new Float32Array(n),i.HEAPF64=de=new Float64Array(n),i.HEAP64=J=new BigInt64Array(n),i.HEAPU64=L=new BigUint64Array(n)}function ot(){p?startWorker(i):P.Bb()}p||(C=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ye());var qt,wt=0,Vt=null;function Ja(){if(--wt==0&&Vt){var n=Vt;Vt=null,n()}}function rt(n){throw k(n="Aborted("+n+")"),F=!0,n=new WebAssembly.RuntimeError(n+". Build with -sASSERTIONS for more info."),s(n),n}function Ya(){return{a:{Ta:Sf,Va:xf,W:Cf,la:If,b:zf,u:Af,R:Of,Za:Rf,d:Bf,pb:dn,g:Ef,T:cn,Ga:fn,lb:gn,nb:yn,Ha:_n,Ea:wn,wb:bn,Da:$n,pa:vn,mb:xn,jb:Sn,Fa:kn,kb:Tn,Ma:Nf,za:Mf,eb:Df,cb:Uf,ya:qf,V:Vf,N:Lf,db:Gf,ma:Xf,fb:Jf,zb:Yf,hb:em,qb:tm,ab:rm,Aa:im,yb:ai,Ja:am,S:nm,Wa:sm,$:lm,G:dm,E:hm,m:ti,H:cm,B:gm,X:ym,J:_m,v:wm,O:bm,D:$m,t:vm,A:xm,z:Sm,w:km,r:Tm,tb:Cm,ub:Im,vb:Em,rb:Wn,sb:qn,bb:Vn,Oa:Am,La:Rm,y:Bm,ja:Nm,Ba:Mm,Ka:Om,qa:Dm,Ia:Pm,ib:Um,U:zm,fa:Wm,Sa:qm,gb:Vm,Qa:Lm,Pa:Gm,Ab:Fn,Ca:jn,ob:Qr,aa:Kn,oa:Qn,xb:Zn,na:Xn,$a:yg,ia:zg,sa:Ng,ga:mg,da:xg,ua:Rg,p:cg,e:Xm,c:Qm,ea:$g,f:Jm,n:eg,k:lg,Y:rg,ka:dg,j:fg,wa:bg,Ra:Pg,ca:Ig,Ua:Dg,P:vg,K:ag,_:Cg,Q:gg,Z:Ag,x:ig,l:Zm,va:Tg,i:Km,h:tg,ra:Mg,ta:Bg,o:Ym,q:ng,s:og,I:ug,C:hg,L:pg,xa:wg,_a:_g,F:Eg,Ya:Sg,ba:Og,M:sg,Xa:kg,ha:Fm,a:C,Na:Kr}}}var Hr={1319426:()=>typeof wasmOffsetConverter<"u",1319483:(n,u,h,c,f)=>{if(i===void 0||!i.Bd)return 1;if((n=ke(Number(n>>>0))).startsWith("./")&&(n=n.substring(2)),!(n=i.Bd.get(n)))return 2;if(u=Number(u>>>0),h=Number(h>>>0),c=Number(c>>>0),u+h>n.byteLength)return 3;try{let x=n.subarray(u,u+h);switch(f){case 0:V().set(x,c>>>0);break;case 1:i.$d(c,x);break;default:return 4}return 0}catch{return 4}},1320198:(n,u,h)=>{i.Jd(n,V().subarray(u>>>0,u+h>>>0))},1320261:()=>i.Yd(),1320302:n=>{i.Id(n)},1320338:()=>{i.Sd()},1320369:()=>{i.Td()},1320398:()=>{i.Xd()},1320423:n=>i.Rd(n),1320456:n=>i.Vd(n),1320488:(n,u,h)=>{i.Hd(Number(n),Number(u),Number(h),!0)},1320551:(n,u,h)=>{i.Hd(Number(n),Number(u),Number(h))},1320608:n=>{i.hc("Abs",n,void 0)},1320659:n=>{i.hc("Neg",n,void 0)},1320710:n=>{i.hc("Floor",n,void 0)},1320763:n=>{i.hc("Ceil",n,void 0)},1320815:n=>{i.hc("Reciprocal",n,void 0)},1320873:n=>{i.hc("Sqrt",n,void 0)},1320925:n=>{i.hc("Exp",n,void 0)},1320976:n=>{i.hc("Erf",n,void 0)},1321027:n=>{i.hc("Sigmoid",n,void 0)},1321082:(n,u,h)=>{i.hc("HardSigmoid",n,{alpha:u,beta:h})},1321161:n=>{i.hc("Log",n,void 0)},1321212:n=>{i.hc("Sin",n,void 0)},1321263:n=>{i.hc("Cos",n,void 0)},1321314:n=>{i.hc("Tan",n,void 0)},1321365:n=>{i.hc("Asin",n,void 0)},1321417:n=>{i.hc("Acos",n,void 0)},1321469:n=>{i.hc("Atan",n,void 0)},1321521:n=>{i.hc("Sinh",n,void 0)},1321573:n=>{i.hc("Cosh",n,void 0)},1321625:n=>{i.hc("Asinh",n,void 0)},1321678:n=>{i.hc("Acosh",n,void 0)},1321731:n=>{i.hc("Atanh",n,void 0)},1321784:n=>{i.hc("Tanh",n,void 0)},1321836:n=>{i.hc("Not",n,void 0)},1321887:(n,u,h)=>{i.hc("Clip",n,{min:u,max:h})},1321956:n=>{i.hc("Clip",n,void 0)},1322008:(n,u)=>{i.hc("Elu",n,{alpha:u})},1322066:n=>{i.hc("Gelu",n,void 0)},1322118:n=>{i.hc("Relu",n,void 0)},1322170:(n,u)=>{i.hc("LeakyRelu",n,{alpha:u})},1322234:(n,u)=>{i.hc("ThresholdedRelu",n,{alpha:u})},1322304:(n,u)=>{i.hc("Cast",n,{to:u})},1322362:n=>{i.hc("Add",n,void 0)},1322413:n=>{i.hc("Sub",n,void 0)},1322464:n=>{i.hc("Mul",n,void 0)},1322515:n=>{i.hc("Div",n,void 0)},1322566:n=>{i.hc("Pow",n,void 0)},1322617:n=>{i.hc("Equal",n,void 0)},1322670:n=>{i.hc("Greater",n,void 0)},1322725:n=>{i.hc("GreaterOrEqual",n,void 0)},1322787:n=>{i.hc("Less",n,void 0)},1322839:n=>{i.hc("LessOrEqual",n,void 0)},1322898:(n,u,h,c,f)=>{i.hc("ReduceMean",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1323073:(n,u,h,c,f)=>{i.hc("ReduceMax",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1323247:(n,u,h,c,f)=>{i.hc("ReduceMin",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1323421:(n,u,h,c,f)=>{i.hc("ReduceProd",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1323596:(n,u,h,c,f)=>{i.hc("ReduceSum",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1323770:(n,u,h,c,f)=>{i.hc("ReduceL1",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1323943:(n,u,h,c,f)=>{i.hc("ReduceL2",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1324116:(n,u,h,c,f)=>{i.hc("ReduceLogSum",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1324293:(n,u,h,c,f)=>{i.hc("ReduceSumSquare",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1324473:(n,u,h,c,f)=>{i.hc("ReduceLogSumExp",n,{keepDims:!!u,noopWithEmptyAxes:!!h,axes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1324653:n=>{i.hc("Where",n,void 0)},1324706:(n,u,h)=>{i.hc("Transpose",n,{perm:u?Array.from(D().subarray(Number(u)>>>0,Number(h)>>>0)):[]})},1324830:(n,u,h,c)=>{i.hc("DepthToSpace",n,{blocksize:u,mode:ke(h),format:c?"NHWC":"NCHW"})},1324963:(n,u,h,c)=>{i.hc("DepthToSpace",n,{blocksize:u,mode:ke(h),format:c?"NHWC":"NCHW"})},1325096:(n,u,h,c,f,x,I,A,R,U,H,X,se,we,qe)=>{i.hc("ConvTranspose",n,{format:R?"NHWC":"NCHW",autoPad:u,dilations:[h],group:c,kernelShape:[f],pads:[x,I],strides:[A],wIsConst:()=>!!M()[U>>>0],outputPadding:H?Array.from(D().subarray(Number(H)>>>0,Number(X)>>>0)):[],outputShape:se?Array.from(D().subarray(Number(se)>>>0,Number(we)>>>0)):[],activation:ke(qe)})},1325529:(n,u,h,c,f,x,I,A,R,U,H,X,se,we)=>{i.hc("ConvTranspose",n,{format:A?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:c,kernelShape:Array.from(D().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!M()[R>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[],activation:ke(we)})},1326190:(n,u,h,c,f,x,I,A,R,U,H,X,se,we,qe)=>{i.hc("ConvTranspose",n,{format:R?"NHWC":"NCHW",autoPad:u,dilations:[h],group:c,kernelShape:[f],pads:[x,I],strides:[A],wIsConst:()=>!!M()[U>>>0],outputPadding:H?Array.from(D().subarray(Number(H)>>>0,Number(X)>>>0)):[],outputShape:se?Array.from(D().subarray(Number(se)>>>0,Number(we)>>>0)):[],activation:ke(qe)})},1326623:(n,u,h,c,f,x,I,A,R,U,H,X,se,we)=>{i.hc("ConvTranspose",n,{format:A?"NHWC":"NCHW",autoPad:u,dilations:Array.from(D().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:c,kernelShape:Array.from(D().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),pads:Array.from(D().subarray(Number(x)>>>0,4+(Number(x)>>>0)>>>0)),strides:Array.from(D().subarray(Number(I)>>>0,2+(Number(I)>>>0)>>>0)),wIsConst:()=>!!M()[R>>>0],outputPadding:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],outputShape:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[],activation:ke(we)})},1327284:(n,u)=>{i.hc("GlobalAveragePool",n,{format:u?"NHWC":"NCHW"})},1327375:(n,u,h,c,f,x,I,A,R,U,H,X,se,we)=>{i.hc("AveragePool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:h,count_include_pad:c,storage_order:f,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1327854:(n,u)=>{i.hc("GlobalAveragePool",n,{format:u?"NHWC":"NCHW"})},1327945:(n,u,h,c,f,x,I,A,R,U,H,X,se,we)=>{i.hc("AveragePool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:h,count_include_pad:c,storage_order:f,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1328424:(n,u)=>{i.hc("GlobalMaxPool",n,{format:u?"NHWC":"NCHW"})},1328511:(n,u,h,c,f,x,I,A,R,U,H,X,se,we)=>{i.hc("MaxPool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:h,count_include_pad:c,storage_order:f,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1328986:(n,u)=>{i.hc("GlobalMaxPool",n,{format:u?"NHWC":"NCHW"})},1329073:(n,u,h,c,f,x,I,A,R,U,H,X,se,we)=>{i.hc("MaxPool",n,{format:we?"NHWC":"NCHW",auto_pad:u,ceil_mode:h,count_include_pad:c,storage_order:f,dilations:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],kernel_shape:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],pads:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],strides:X?Array.from(D().subarray(Number(X)>>>0,Number(se)>>>0)):[]})},1329548:(n,u,h,c,f)=>{i.hc("Gemm",n,{alpha:u,beta:h,transA:c,transB:f})},1329652:n=>{i.hc("MatMul",n,void 0)},1329706:(n,u,h,c)=>{i.hc("ArgMax",n,{keepDims:!!u,selectLastIndex:!!h,axis:c})},1329814:(n,u,h,c)=>{i.hc("ArgMin",n,{keepDims:!!u,selectLastIndex:!!h,axis:c})},1329922:(n,u)=>{i.hc("Softmax",n,{axis:u})},1329985:(n,u)=>{i.hc("Concat",n,{axis:u})},1330045:(n,u,h,c,f)=>{i.hc("Split",n,{axis:u,numOutputs:h,splitSizes:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1330201:n=>{i.hc("Expand",n,void 0)},1330255:(n,u)=>{i.hc("Gather",n,{axis:Number(u)})},1330326:(n,u)=>{i.hc("GatherElements",n,{axis:Number(u)})},1330405:(n,u)=>{i.hc("GatherND",n,{batch_dims:Number(u)})},1330484:(n,u,h,c,f,x,I,A,R,U,H)=>{i.hc("Resize",n,{antialias:u,axes:h?Array.from(D().subarray(Number(h)>>>0,Number(c)>>>0)):[],coordinateTransformMode:ke(f),cubicCoeffA:x,excludeOutside:I,extrapolationValue:A,keepAspectRatioPolicy:ke(R),mode:ke(U),nearestMode:ke(H)})},1330846:(n,u,h,c,f,x,I)=>{i.hc("Slice",n,{starts:u?Array.from(D().subarray(Number(u)>>>0,Number(h)>>>0)):[],ends:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[],axes:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[]})},1331110:n=>{i.hc("Tile",n,void 0)},1331162:(n,u,h)=>{i.hc("InstanceNormalization",n,{epsilon:u,format:h?"NHWC":"NCHW"})},1331276:(n,u,h)=>{i.hc("InstanceNormalization",n,{epsilon:u,format:h?"NHWC":"NCHW"})},1331390:n=>{i.hc("Range",n,void 0)},1331443:(n,u)=>{i.hc("Einsum",n,{equation:ke(u)})},1331524:(n,u,h,c,f)=>{i.hc("Pad",n,{mode:u,value:h,pads:c?Array.from(D().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},1331667:(n,u,h,c,f,x)=>{i.hc("BatchNormalization",n,{epsilon:u,momentum:h,spatial:!!f,trainingMode:!!c,format:x?"NHWC":"NCHW"})},1331836:(n,u,h,c,f,x)=>{i.hc("BatchNormalization",n,{epsilon:u,momentum:h,spatial:!!f,trainingMode:!!c,format:x?"NHWC":"NCHW"})},1332005:(n,u,h)=>{i.hc("CumSum",n,{exclusive:Number(u),reverse:Number(h)})},1332102:(n,u,h)=>{i.hc("DequantizeLinear",n,{axis:u,blockSize:h})},1332192:(n,u,h,c,f)=>{i.hc("GridSample",n,{align_corners:u,mode:ke(h),padding_mode:ke(c),format:f?"NHWC":"NCHW"})},1332362:(n,u,h,c,f)=>{i.hc("GridSample",n,{align_corners:u,mode:ke(h),padding_mode:ke(c),format:f?"NHWC":"NCHW"})},1332532:(n,u)=>{i.hc("ScatterND",n,{reduction:ke(u)})},1332617:(n,u,h,c,f,x,I,A,R)=>{i.hc("Attention",n,{numHeads:u,isUnidirectional:h,maskFilterValue:c,scale:f,doRotary:x,qkvHiddenSizes:I?Array.from(D().subarray(Number(A)>>>0,Number(A)+I>>>0)):[],pastPresentShareBuffer:!!R})},1332889:n=>{i.hc("BiasAdd",n,void 0)},1332944:n=>{i.hc("BiasSplitGelu",n,void 0)},1333005:n=>{i.hc("FastGelu",n,void 0)},1333061:(n,u,h,c,f,x,I,A,R,U,H,X,se,we,qe,jt)=>{i.hc("Conv",n,{format:X?"NHWC":"NCHW",auto_pad:u,dilations:h?Array.from(D().subarray(Number(h)>>>0,Number(c)>>>0)):[],group:f,kernel_shape:x?Array.from(D().subarray(Number(x)>>>0,Number(I)>>>0)):[],pads:A?Array.from(D().subarray(Number(A)>>>0,Number(R)>>>0)):[],strides:U?Array.from(D().subarray(Number(U)>>>0,Number(H)>>>0)):[],w_is_const:()=>!!M()[Number(se)>>>0],activation:ke(we),activation_params:qe?Array.from(Ue().subarray(Number(qe)>>>0,Number(jt)>>>0)):[]})},1333645:n=>{i.hc("Gelu",n,void 0)},1333697:(n,u,h,c,f,x,I,A,R)=>{i.hc("GroupQueryAttention",n,{numHeads:u,kvNumHeads:h,scale:c,softcap:f,doRotary:x,rotaryInterleaved:I,smoothSoftmax:A,localWindowSize:R})},1333914:(n,u,h,c)=>{i.hc("LayerNormalization",n,{axis:u,epsilon:h,simplified:!!c})},1334025:(n,u,h,c)=>{i.hc("LayerNormalization",n,{axis:u,epsilon:h,simplified:!!c})},1334136:(n,u,h,c,f,x)=>{i.hc("MatMulNBits",n,{k:u,n:h,accuracyLevel:c,bits:f,blockSize:x})},1334263:(n,u,h,c,f,x)=>{i.hc("MultiHeadAttention",n,{numHeads:u,isUnidirectional:h,maskFilterValue:c,scale:f,doRotary:x})},1334422:(n,u)=>{i.hc("QuickGelu",n,{alpha:u})},1334486:(n,u,h,c,f)=>{i.hc("RotaryEmbedding",n,{interleaved:!!u,numHeads:h,rotaryEmbeddingDim:c,scale:f})},1334625:(n,u,h)=>{i.hc("SkipLayerNormalization",n,{epsilon:u,simplified:!!h})},1334727:(n,u,h)=>{i.hc("SkipLayerNormalization",n,{epsilon:u,simplified:!!h})},1334829:(n,u,h,c)=>{i.hc("GatherBlockQuantized",n,{gatherAxis:u,quantizeAxis:h,blockSize:c})},1334950:n=>{i.Wd(n)},1334984:(n,u)=>i.Zd(Number(n),Number(u),i.Cd.be,i.Cd.errors)};function xf(n,u,h){return Bn(async()=>{await i.Ud(Number(n),Number(u),Number(h))})}function Sf(){return typeof wasmOffsetConverter<"u"}class Fr{constructor(u){so(this,"name","ExitStatus");this.message=`Program terminated with exit(${u})`,this.status=u}}var en=n=>{n.terminate(),n.onmessage=()=>{}},jr=[],tn=n=>{lt.length==0&&(un(),on(lt[0]));var u=lt.pop();if(!u)return 6;Lt.push(u),bt[n.xd]=u,u.xd=n.xd;var h={yd:"run",de:n.ce,Fd:n.Fd,xd:n.xd};return u.postMessage(h,n.Ld),0},ut=0,$e=(n,u,...h)=>{for(var c=2*h.length,f=ie(),x=hi(8*c),I=x>>>3,A=0;A<h.length;A++){var R=h[A];typeof R=="bigint"?(J[I+2*A]=1n,J[I+2*A+1]=R):(J[I+2*A]=0n,Re()[I+2*A+1>>>0]=R)}return n=rs(n,0,c,x,u),re(f),n};function Kr(n){if(p)return $e(0,1,n);if(z=n,!(0<ut)){for(var u of Lt)en(u);for(u of lt)en(u);lt=[],Lt=[],bt={},F=!0}b(0,new Fr(n))}function rn(n){if(p)return $e(1,0,n);Qr(n)}var Qr=n=>{if(z=n,p)throw rn(n),"unwind";Kr(n)},lt=[],Lt=[],an=[],bt={},nn=n=>{var u=n.xd;delete bt[u],lt.push(n),Lt.splice(Lt.indexOf(n),1),n.xd=0,is(u)};function sn(){an.forEach(n=>n())}var on=n=>new Promise(u=>{n.onmessage=f=>{var x=(f=f.data).yd;if(f.Ed&&f.Ed!=wr()){var I=bt[f.Ed];I?I.postMessage(f,f.Ld):k(`Internal error! Worker sent a message "${x}" to target pthread ${f.Ed}, but that thread no longer exists!`)}else x==="checkMailbox"?pr():x==="spawnThread"?tn(f):x==="cleanupThread"?nn(bt[f.ee]):x==="loaded"?(n.loaded=!0,u(n)):x==="alert"?alert(`Thread ${f.fe}: ${f.text}`):f.target==="setimmediate"?n.postMessage(f):x==="callHandler"?i[f.Nd](...f.args):x&&k(`worker sent an unknown command ${x}`)},n.onerror=f=>{throw k(`worker sent an error! ${f.filename}:${f.lineno}: ${f.message}`),f};var h,c=[];for(h of[])i.propertyIsEnumerable(h)&&c.push(h);n.postMessage({yd:"load",Od:c,he:C,ie:E})});function un(){var n=new Worker(import.meta.url.startsWith("file:")?new URL("/assets/ort.webgpu.bundle.min-CEayb2S6.mjs",import.meta.url):new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});lt.push(n)}var kf=n=>{ye();var u=he()[n+52>>>2>>>0];n=he()[n+56>>>2>>>0],ss(u,u-n),re(u)},Tf=(n,u)=>{ut=0,n=ci(n,u),0<ut?z=n:pi(n)},dr=[];function Cf(n){var u=new Zr(n>>>=0);if(M()[u.wd+12>>>0]==0){var h=1;M()[u.wd+12>>>0]=h}return h=0,M()[u.wd+13>>>0]=h,dr.push(u),us(n),ds(n)}var Rt=0,If=()=>{ne(0,0);var n=dr.pop();os(n.Gd),Rt=0};class Zr{constructor(u){this.Gd=u,this.wd=u-24}}function Ef(n){throw Rt||(Rt=n>>>0),Rt}var Xr=n=>{var u=Rt;if(!u)return Ft(0),0;var h=new Zr(u);he()[h.wd+16>>>2>>>0]=u;var c=he()[h.wd+4>>>2>>>0];if(!c)return Ft(0),u;for(var f of n){if(f===0||f===c)break;if(ls(f,c,h.wd+16))return Ft(f),u}return Ft(c),u};function zf(){return Xr([])}function Af(n){return Xr([n>>>0])}function Of(n,u){return Xr([n>>>0,u>>>0])}var Rf=()=>{var n=dr.pop();n||rt("no exception to throw");var u=n.Gd;if(M()[n.wd+13>>>0]==0){dr.push(n);var h=1;M()[n.wd+13>>>0]=h,h=0,M()[n.wd+12>>>0]=h}throw Rt=u};function Bf(n,u,h){var c=new Zr(n>>>=0);throw u>>>=0,h>>>=0,he()[c.wd+16>>>2>>>0]=0,he()[c.wd+4>>>2>>>0]=u,he()[c.wd+8>>>2>>>0]=h,Rt=n}function ln(n,u,h,c){return p?$e(2,1,n,u,h,c):dn(n,u,h,c)}function dn(n,u,h,c){if(n>>>=0,h>>>=0,c>>>=0,m===void 0)return 6;var f=[];return p&&f.length===0?ln(n,u>>>=0,h,c):(n={ce:h,xd:n,Fd:c,Ld:f},p?(n.yd="spawnThread",postMessage(n,f),0):tn(n))}var pn=typeof TextDecoder<"u"?new TextDecoder:void 0,hn=(n,u=0,h=NaN)=>{var c=(u>>>=0)+h;for(h=u;n[h]&&!(h>=c);)++h;if(16<h-u&&n.buffer&&pn)return pn.decode(n.buffer instanceof ArrayBuffer?n.subarray(u,h):n.slice(u,h));for(c="";u<h;){var f=n[u++];if(128&f){var x=63&n[u++];if((224&f)==192)c+=String.fromCharCode((31&f)<<6|x);else{var I=63&n[u++];65536>(f=(240&f)==224?(15&f)<<12|x<<6|I:(7&f)<<18|x<<12|I<<6|63&n[u++])?c+=String.fromCharCode(f):(f-=65536,c+=String.fromCharCode(55296|f>>10,56320|1023&f))}}else c+=String.fromCharCode(f)}return c},ke=(n,u)=>(n>>>=0)?hn(V(),n,u):"";function cn(n,u,h){return p?$e(3,1,n,u,h):0}function fn(n,u){if(p)return $e(4,1,n,u)}var mn=n=>{for(var u=0,h=0;h<n.length;++h){var c=n.charCodeAt(h);127>=c?u++:2047>=c?u+=2:55296<=c&&57343>=c?(u+=4,++h):u+=3}return u},Bt=(n,u,h)=>{var c=V();if(u>>>=0,0<h){var f=u;h=u+h-1;for(var x=0;x<n.length;++x){var I=n.charCodeAt(x);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&n.charCodeAt(++x)),127>=I){if(u>=h)break;c[u++>>>0]=I}else{if(2047>=I){if(u+1>=h)break;c[u++>>>0]=192|I>>6}else{if(65535>=I){if(u+2>=h)break;c[u++>>>0]=224|I>>12}else{if(u+3>=h)break;c[u++>>>0]=240|I>>18,c[u++>>>0]=128|I>>12&63}c[u++>>>0]=128|I>>6&63}c[u++>>>0]=128|63&I}}c[u>>>0]=0,n=u-f}else n=0;return n};function gn(n,u){if(p)return $e(5,1,n,u)}function yn(n,u,h){if(p)return $e(6,1,n,u,h)}function _n(n,u,h){return p?$e(7,1,n,u,h):0}function wn(n,u){if(p)return $e(8,1,n,u)}function bn(n,u,h){if(p)return $e(9,1,n,u,h)}function $n(n,u,h,c){if(p)return $e(10,1,n,u,h,c)}function vn(n,u,h,c){if(p)return $e(11,1,n,u,h,c)}function xn(n,u,h,c){if(p)return $e(12,1,n,u,h,c)}function Sn(n){if(p)return $e(13,1,n)}function kn(n,u){if(p)return $e(14,1,n,u)}function Tn(n,u,h){if(p)return $e(15,1,n,u,h)}var Cn,dt,Nf=()=>rt(""),Ze=n=>{for(var u="";V()[n>>>0];)u+=Cn[V()[n++>>>0]];return u},Jr={},Yr={};function it(n,u,h={}){return function(c,f,x={}){var I=f.name;if(!c)throw new dt(`type "${I}" must have a positive integer typeid pointer`);if(Yr.hasOwnProperty(c)){if(x.Pd)return;throw new dt(`Cannot register type '${I}' twice`)}Yr[c]=f,Jr.hasOwnProperty(c)&&(f=Jr[c],delete Jr[c],f.forEach(A=>A()))}(n,u,h)}var In=(n,u,h)=>{switch(u){case 1:return h?c=>M()[c>>>0]:c=>V()[c>>>0];case 2:return h?c=>le()[c>>>1>>>0]:c=>be()[c>>>1>>>0];case 4:return h?c=>D()[c>>>2>>>0]:c=>he()[c>>>2>>>0];case 8:return h?c=>J[c>>>3]:c=>L[c>>>3];default:throw new TypeError(`invalid integer width (${u}): ${n}`)}};function Mf(n,u,h){h>>>=0,it(n>>>=0,{name:u=Ze(u>>>0),fromWireType:c=>c,toWireType:function(c,f){if(typeof f!="bigint"&&typeof f!="number")throw f=f===null?"null":(c=typeof f)=="object"||c==="array"||c==="function"?f.toString():""+f,new TypeError(`Cannot convert "${f}" to ${this.name}`);return typeof f=="number"&&(f=BigInt(f)),f},zd:pt,readValueFromPointer:In(u,h,u.indexOf("u")==-1),Ad:null})}var pt=8;function Df(n,u,h,c){it(n>>>=0,{name:u=Ze(u>>>0),fromWireType:function(f){return!!f},toWireType:function(f,x){return x?h:c},zd:pt,readValueFromPointer:function(f){return this.fromWireType(V()[f>>>0])},Ad:null})}var ei=[],at=[];function ti(n){9<(n>>>=0)&&--at[n+1]==0&&(at[n]=void 0,ei.push(n))}var Ne=n=>{if(!n)throw new dt("Cannot use deleted val. handle = "+n);return at[n]},We=n=>{switch(n){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let u=ei.pop()||at.length;return at[u]=n,at[u+1]=1,u}};function ri(n){return this.fromWireType(he()[n>>>2>>>0])}var Pf={name:"emscripten::val",fromWireType:n=>{var u=Ne(n);return ti(n),u},toWireType:(n,u)=>We(u),zd:pt,readValueFromPointer:ri,Ad:null};function Uf(n){return it(n>>>0,Pf)}var Wf=(n,u)=>{switch(u){case 4:return function(h){return this.fromWireType(Ue()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(Re()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${u}): ${n}`)}};function qf(n,u,h){h>>>=0,it(n>>>=0,{name:u=Ze(u>>>0),fromWireType:c=>c,toWireType:(c,f)=>f,zd:pt,readValueFromPointer:Wf(u,h),Ad:null})}function Vf(n,u,h,c,f){if(n>>>=0,h>>>=0,u=Ze(u>>>0),f===-1&&(f=4294967295),f=A=>A,c===0){var x=32-8*h;f=A=>A<<x>>>x}var I=u.includes("unsigned")?function(A,R){return R>>>0}:function(A,R){return R};it(n,{name:u,fromWireType:f,toWireType:I,zd:pt,readValueFromPointer:In(u,h,c!==0),Ad:null})}function Lf(n,u,h){function c(x){var I=he()[x>>>2>>>0];return x=he()[x+4>>>2>>>0],new f(M().buffer,x,I)}var f=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][u];it(n>>>=0,{name:h=Ze(h>>>0),fromWireType:c,zd:pt,readValueFromPointer:c},{Pd:!0})}function Gf(n,u){it(n>>>=0,{name:u=Ze(u>>>0),fromWireType:function(h){for(var c,f=he()[h>>>2>>>0],x=h+4,I=x,A=0;A<=f;++A){var R=x+A;A!=f&&V()[R>>>0]!=0||(I=ke(I,R-I),c===void 0?c=I:(c+="\0",c+=I),I=R+1)}return Je(h),c},toWireType:function(h,c){c instanceof ArrayBuffer&&(c=new Uint8Array(c));var f=typeof c=="string";if(!(f||c instanceof Uint8Array||c instanceof Uint8ClampedArray||c instanceof Int8Array))throw new dt("Cannot pass non-string to std::string");var x=f?mn(c):c.length,I=br(4+x+1),A=I+4;if(he()[I>>>2>>>0]=x,f)Bt(c,A,x+1);else if(f)for(f=0;f<x;++f){var R=c.charCodeAt(f);if(255<R)throw Je(I),new dt("String has UTF-16 code units that do not fit in 8 bits");V()[A+f>>>0]=R}else for(f=0;f<x;++f)V()[A+f>>>0]=c[f];return h!==null&&h.push(Je,I),I},zd:pt,readValueFromPointer:ri,Ad(h){Je(h)}})}var En=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Hf=(n,u)=>{for(var h=n>>1,c=h+u/2;!(h>=c)&&be()[h>>>0];)++h;if(32<(h<<=1)-n&&En)return En.decode(V().slice(n,h));for(h="",c=0;!(c>=u/2);++c){var f=le()[n+2*c>>>1>>>0];if(f==0)break;h+=String.fromCharCode(f)}return h},Ff=(n,u,h)=>{if(h??(h=2147483647),2>h)return 0;var c=u;h=(h-=2)<2*n.length?h/2:n.length;for(var f=0;f<h;++f){var x=n.charCodeAt(f);le()[u>>>1>>>0]=x,u+=2}return le()[u>>>1>>>0]=0,u-c},jf=n=>2*n.length,Kf=(n,u)=>{for(var h=0,c="";!(h>=u/4);){var f=D()[n+4*h>>>2>>>0];if(f==0)break;++h,65536<=f?(f-=65536,c+=String.fromCharCode(55296|f>>10,56320|1023&f)):c+=String.fromCharCode(f)}return c},Qf=(n,u,h)=>{if(u>>>=0,h??(h=2147483647),4>h)return 0;var c=u;h=c+h-4;for(var f=0;f<n.length;++f){var x=n.charCodeAt(f);if(55296<=x&&57343>=x&&(x=65536+((1023&x)<<10)|1023&n.charCodeAt(++f)),D()[u>>>2>>>0]=x,(u+=4)+4>h)break}return D()[u>>>2>>>0]=0,u-c},Zf=n=>{for(var u=0,h=0;h<n.length;++h){var c=n.charCodeAt(h);55296<=c&&57343>=c&&++h,u+=4}return u};function Xf(n,u,h){if(n>>>=0,u>>>=0,h=Ze(h>>>=0),u===2)var c=Hf,f=Ff,x=jf,I=A=>be()[A>>>1>>>0];else u===4&&(c=Kf,f=Qf,x=Zf,I=A=>he()[A>>>2>>>0]);it(n,{name:h,fromWireType:A=>{for(var R,U=he()[A>>>2>>>0],H=A+4,X=0;X<=U;++X){var se=A+4+X*u;X!=U&&I(se)!=0||(H=c(H,se-H),R===void 0?R=H:(R+="\0",R+=H),H=se+u)}return Je(A),R},toWireType:(A,R)=>{if(typeof R!="string")throw new dt(`Cannot pass non-string to C++ string type ${h}`);var U=x(R),H=br(4+U+u);return he()[H>>>2>>>0]=U/u,f(R,H+4,U+u),A!==null&&A.push(Je,H),H},zd:pt,readValueFromPointer:ri,Ad(A){Je(A)}})}function Jf(n,u){it(n>>>=0,{Qd:!0,name:u=Ze(u>>>0),zd:0,fromWireType:()=>{},toWireType:()=>{}})}function Yf(n){di(n>>>0,!d,1,!l,131072,!1),sn()}var ii=n=>{if(!F)try{if(n(),!(0<ut))try{p?pi(z):Qr(z)}catch(u){u instanceof Fr||u=="unwind"||b(0,u)}}catch(u){u instanceof Fr||u=="unwind"||b(0,u)}};function ai(n){n>>>=0,typeof Atomics.ge=="function"&&(Atomics.ge(D(),n>>>2,n).value.then(pr),n+=128,Atomics.store(D(),n>>>2,1))}var pr=()=>{var n=wr();n&&(ai(n),ii(ns))};function em(n,u){(n>>>=0)==u>>>0?setTimeout(pr):p?postMessage({Ed:n,yd:"checkMailbox"}):(n=bt[n])&&n.postMessage({yd:"checkMailbox"})}var ni=[];function tm(n,u,h,c,f){for(u>>>=0,c/=2,ni.length=c,h=f>>>0>>>3,f=0;f<c;f++)ni[f]=J[h+2*f]?J[h+2*f+1]:Re()[h+2*f+1>>>0];return(u?Hr[u]:jm[n])(...ni)}var rm=()=>{ut=0};function im(n){n>>>=0,p?postMessage({yd:"cleanupThread",ee:n}):nn(bt[n])}function am(n){}var hr=(n,u)=>{var h=Yr[n];if(h===void 0)throw n=Yn(n),h=Ze(n),Je(n),new dt(`${u} has unknown type ${h}`);return h},zn=(n,u,h)=>{var c=[];return n=n.toWireType(c,h),c.length&&(he()[u>>>2>>>0]=We(c)),n};function nm(n,u,h){return u>>>=0,h>>>=0,n=Ne(n>>>0),u=hr(u,"emval::as"),zn(u,h,n)}function sm(n,u){return u>>>=0,n=Ne(n>>>0),(u=hr(u,"emval::as")).toWireType(null,n)}var cr=n=>{try{n()}catch(u){rt(u)}},ht=0,Xe=null,An=0,fr=[],On={},Rn={},om=0,si=null,um=[];function Bn(n){return function(u){if(!F){if(ht===0){var h=!1,c=!1;u((f=0)=>{if(!F&&(An=f,h=!0,c)){ht=2,cr(()=>io(Xe)),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.resume(),f=!1;try{var x=function(){var R=D()[Xe+8>>>2>>>0];return R=P[Rn[R]],--ut,R()}()}catch(R){x=R,f=!0}var I=!1;if(!Xe){var A=si;A&&(si=null,(f?A.reject:A.resolve)(x),I=!0)}if(f&&!I)throw x}}),c=!0,h||(ht=1,Xe=function(){var f=br(65548),x=f+12;he()[f>>>2>>>0]=x,he()[f+4>>>2>>>0]=x+65536,x=fr[0];var I=On[x];return I===void 0&&(I=om++,On[x]=I,Rn[I]=x),x=I,D()[f+8>>>2>>>0]=x,f}(),typeof MainLoop<"u"&&MainLoop.Md&&MainLoop.pause(),cr(()=>to(Xe)))}else ht===2?(ht=0,cr(ao),Je(Xe),Xe=null,um.forEach(ii)):rt(`invalid state: ${ht}`);return An}}(u=>{n().then(u)})}function lm(n){return n>>>=0,Bn(async()=>{var u=await Ne(n);return We(u)})}var mr=[];function dm(n,u,h,c){return h>>>=0,c>>>=0,(n=mr[n>>>0])(null,u=Ne(u>>>0),h,c)}var pm={},gr=n=>{var u=pm[n];return u===void 0?Ze(n):u};function hm(n,u,h,c,f){return h>>>=0,c>>>=0,f>>>=0,(n=mr[n>>>0])(u=Ne(u>>>0),u[h=gr(h)],c,f)}var Nn=()=>typeof globalThis=="object"?globalThis:Function("return this")();function cm(n){return(n>>>=0)==0?We(Nn()):(n=gr(n),We(Nn()[n]))}var fm=n=>{var u=mr.length;return mr.push(n),u},mm=(n,u)=>{for(var h=Array(n),c=0;c<n;++c)h[c]=hr(he()[u+4*c>>>2>>>0],"parameter "+c);return h},Mn=(n,u)=>Object.defineProperty(u,"name",{value:n});function gm(n,u,h){var c=(u=mm(n,u>>>0)).shift();n--;var f=`return function (obj, func, destructorsRef, args) {
`,x=0,I=[];h===0&&I.push("obj");for(var A=["retType"],R=[c],U=0;U<n;++U)I.push("arg"+U),A.push("argType"+U),R.push(u[U]),f+=`  var arg${U} = argType${U}.readValueFromPointer(args${x?"+"+x:""});
`,x+=u[U].zd;return f+=`  var rv = ${h===1?"new func":"func.call"}(${I.join(", ")});
`,c.Qd||(A.push("emval_returnValue"),R.push(zn),f+=`  return emval_returnValue(retType, destructorsRef, rv);
`),A.push(f+`};
`),n=function(H){var X=Function;if(!(X instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof X} which is not a function`);var se=Mn(X.name||"unknownFunctionName",function(){});return se.prototype=X.prototype,se=new se,(H=X.apply(se,H))instanceof Object?H:se}(A)(...R),h=`methodCaller<(${u.map(H=>H.name).join(", ")}) => ${c.name}>`,fm(Mn(h,n))}function ym(n){return n=gr(n>>>0),We(i[n])}function _m(n,u){return u>>>=0,n=Ne(n>>>0),u=Ne(u),We(n[u])}function wm(n){9<(n>>>=0)&&(at[n+1]+=1)}function bm(){return We([])}function $m(n){n=Ne(n>>>0);for(var u=Array(n.length),h=0;h<n.length;h++)u[h]=n[h];return We(u)}function vm(n){return We(gr(n>>>0))}function xm(){return We({})}function Sm(n){for(var u=Ne(n>>>=0);u.length;){var h=u.pop();u.pop()(h)}ti(n)}function km(n,u,h){u>>>=0,h>>>=0,n=Ne(n>>>0),u=Ne(u),h=Ne(h),n[u]=h}function Tm(n,u){return u>>>=0,n=(n=hr(n>>>0,"_emval_take_value")).readValueFromPointer(u),We(n)}function Cm(n,u){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),u>>>=0,n=new Date(1e3*n),D()[u>>>2>>>0]=n.getUTCSeconds(),D()[u+4>>>2>>>0]=n.getUTCMinutes(),D()[u+8>>>2>>>0]=n.getUTCHours(),D()[u+12>>>2>>>0]=n.getUTCDate(),D()[u+16>>>2>>>0]=n.getUTCMonth(),D()[u+20>>>2>>>0]=n.getUTCFullYear()-1900,D()[u+24>>>2>>>0]=n.getUTCDay(),n=(n.getTime()-Date.UTC(n.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,D()[u+28>>>2>>>0]=n}var Dn=n=>n%4==0&&(n%100!=0||n%400==0),Pn=[0,31,60,91,121,152,182,213,244,274,305,335],Un=[0,31,59,90,120,151,181,212,243,273,304,334];function Im(n,u){n=-9007199254740992>n||9007199254740992<n?NaN:Number(n),u>>>=0,n=new Date(1e3*n),D()[u>>>2>>>0]=n.getSeconds(),D()[u+4>>>2>>>0]=n.getMinutes(),D()[u+8>>>2>>>0]=n.getHours(),D()[u+12>>>2>>>0]=n.getDate(),D()[u+16>>>2>>>0]=n.getMonth(),D()[u+20>>>2>>>0]=n.getFullYear()-1900,D()[u+24>>>2>>>0]=n.getDay();var h=(Dn(n.getFullYear())?Pn:Un)[n.getMonth()]+n.getDate()-1|0;D()[u+28>>>2>>>0]=h,D()[u+36>>>2>>>0]=-60*n.getTimezoneOffset(),h=new Date(n.getFullYear(),6,1).getTimezoneOffset();var c=new Date(n.getFullYear(),0,1).getTimezoneOffset();n=0|(h!=c&&n.getTimezoneOffset()==Math.min(c,h)),D()[u+32>>>2>>>0]=n}function Em(n){n>>>=0;var u=new Date(D()[n+20>>>2>>>0]+1900,D()[n+16>>>2>>>0],D()[n+12>>>2>>>0],D()[n+8>>>2>>>0],D()[n+4>>>2>>>0],D()[n>>>2>>>0],0),h=D()[n+32>>>2>>>0],c=u.getTimezoneOffset(),f=new Date(u.getFullYear(),6,1).getTimezoneOffset(),x=new Date(u.getFullYear(),0,1).getTimezoneOffset(),I=Math.min(x,f);return 0>h?D()[n+32>>>2>>>0]=+(f!=x&&I==c):0<h!=(I==c)&&(f=Math.max(x,f),u.setTime(u.getTime()+6e4*((0<h?I:f)-c))),D()[n+24>>>2>>>0]=u.getDay(),h=(Dn(u.getFullYear())?Pn:Un)[u.getMonth()]+u.getDate()-1|0,D()[n+28>>>2>>>0]=h,D()[n>>>2>>>0]=u.getSeconds(),D()[n+4>>>2>>>0]=u.getMinutes(),D()[n+8>>>2>>>0]=u.getHours(),D()[n+12>>>2>>>0]=u.getDate(),D()[n+16>>>2>>>0]=u.getMonth(),D()[n+20>>>2>>>0]=u.getYear(),n=u.getTime(),BigInt(isNaN(n)?-1:n/1e3)}function Wn(n,u,h,c,f,x,I){return p?$e(16,1,n,u,h,c,f,x,I):-52}function qn(n,u,h,c,f,x){if(p)return $e(17,1,n,u,h,c,f,x)}var Gt={},zm=()=>performance.timeOrigin+performance.now();function Vn(n,u){if(p)return $e(18,1,n,u);if(Gt[n]&&(clearTimeout(Gt[n].id),delete Gt[n]),!u)return 0;var h=setTimeout(()=>{delete Gt[n],ii(()=>as(n,performance.timeOrigin+performance.now()))},u);return Gt[n]={id:h,ke:u},0}function Am(n,u,h,c){n>>>=0,u>>>=0,h>>>=0,c>>>=0;var f=new Date().getFullYear(),x=new Date(f,0,1).getTimezoneOffset();f=new Date(f,6,1).getTimezoneOffset();var I=Math.max(x,f);he()[n>>>2>>>0]=60*I,D()[u>>>2>>>0]=+(x!=f),n=(u=A=>{var R=Math.abs(A);return`UTC${0<=A?"-":"+"}${String(Math.floor(R/60)).padStart(2,"0")}${String(R%60).padStart(2,"0")}`})(x),u=u(f),f<x?(Bt(n,h,17),Bt(u,c,17)):(Bt(n,c,17),Bt(u,h,17))}var Om=()=>Date.now();function Rm(n,u,h){return 0<=n&&3>=n?(n===0?n=Date.now():n=performance.timeOrigin+performance.now(),J[h>>>0>>>3]=BigInt(Math.round(1e6*n)),0):28}var oi=[],Ln=(n,u)=>{oi.length=0;for(var h;h=V()[n++>>>0];){var c=h!=105;u+=(c&=h!=112)&&u%8?4:0,oi.push(h==112?he()[u>>>2>>>0]:h==106?J[u>>>3]:h==105?D()[u>>>2>>>0]:Re()[u>>>3>>>0]),u+=c?8:4}return oi};function Bm(n,u,h){return n>>>=0,u=Ln(u>>>0,h>>>0),Hr[n](...u)}function Nm(n,u,h){return n>>>=0,u=Ln(u>>>0,h>>>0),Hr[n](...u)}var Mm=()=>{};function Dm(n,u){return k(ke(n>>>0,u>>>0))}var Pm=()=>{throw ut+=1,"unwind"};function Um(){return 4294901760}var Wm=()=>navigator.hardwareConcurrency;function qm(){return rt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Vm(n){n>>>=0;var u=V().length;if(n<=u||4294901760<n)return!1;for(var h=1;4>=h;h*=2){var c=u*(1+.2/h);c=Math.min(c,n+100663296);e:{c=(Math.min(4294901760,65536*Math.ceil(Math.max(n,c)/65536))-C.buffer.byteLength+65535)/65536|0;try{C.grow(c),ye();var f=1;break e}catch{}f=void 0}if(f)return!0}return!1}var yr=()=>(rt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ht={},Gn=n=>{n.forEach(u=>{yr()})};function Lm(){var n=Error().stack.toString().split(`
`);return n[0]=="Error"&&n.shift(),Gn(n),Ht.Kd=yr(),Ht.ae=n,Ht.Kd}function Gm(n,u,h){if(n>>>=0,u>>>=0,Ht.Kd==n)var c=Ht.ae;else(c=Error().stack.toString().split(`
`))[0]=="Error"&&c.shift(),Gn(c);for(var f=3;c[f]&&yr()!=n;)++f;for(n=0;n<h&&c[n+f];++n)D()[u+4*n>>>2>>>0]=yr();return n}var ui,li={},Hn=()=>{if(!ui){var n,u={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(n in li)li[n]===void 0?delete u[n]:u[n]=li[n];var h=[];for(n in u)h.push(`${n}=${u[n]}`);ui=h}return ui};function Fn(n,u){if(p)return $e(19,1,n,u);n>>>=0,u>>>=0;var h=0;return Hn().forEach((c,f)=>{var x=u+h;for(f=he()[n+4*f>>>2>>>0]=x,x=0;x<c.length;++x)M()[f++>>>0]=c.charCodeAt(x);M()[f>>>0]=0,h+=c.length+1}),0}function jn(n,u){if(p)return $e(20,1,n,u);n>>>=0,u>>>=0;var h=Hn();he()[n>>>2>>>0]=h.length;var c=0;return h.forEach(f=>c+=f.length+1),he()[u>>>2>>>0]=c,0}function Kn(n){return p?$e(21,1,n):52}function Qn(n,u,h,c){return p?$e(22,1,n,u,h,c):52}function Zn(n,u,h,c){return p?$e(23,1,n,u,h,c):70}var Hm=[null,[],[]];function Xn(n,u,h,c){if(p)return $e(24,1,n,u,h,c);u>>>=0,h>>>=0,c>>>=0;for(var f=0,x=0;x<h;x++){var I=he()[u>>>2>>>0],A=he()[u+4>>>2>>>0];u+=8;for(var R=0;R<A;R++){var U=V()[I+R>>>0],H=Hm[n];U===0||U===10?((n===1?T:k)(hn(H)),H.length=0):H.push(U)}f+=A}return he()[c>>>2>>>0]=f,0}function Fm(n){return n>>>0}p||function(){for(var n=i.numThreads-1;n--;)un();jr.unshift(()=>{wt++,function(u){p?u():Promise.all(lt.map(on)).then(u)}(()=>Ja())})}();for(var Jn=Array(256),_r=0;256>_r;++_r)Jn[_r]=String.fromCharCode(_r);Cn=Jn,dt=i.BindingError=class extends Error{constructor(n){super(n),this.name="BindingError"}},i.InternalError=class extends Error{constructor(n){super(n),this.name="InternalError"}},at.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>at.length/2-5-ei.length;var P,jm=[Kr,rn,ln,cn,fn,gn,yn,_n,wn,bn,$n,vn,xn,Sn,kn,Tn,Wn,qn,Vn,Fn,jn,Kn,Qn,Zn,Xn];(async function(){function n(c,f){return P=c.exports,P=function(){var x=P,I={};for(let[A,R]of Object.entries(x))I[A]=typeof R=="function"?(...U)=>{fr.push(A);try{return R(...U)}finally{F||(fr.pop(),Xe&&ht===1&&fr.length===0&&(ht=0,ut+=1,cr(ro),typeof Fibers<"u"&&Fibers.le()))}}:R;return I}(),P=function(){var x=P,I=R=>U=>R(U)>>>0,A=R=>()=>R()>>>0;return(x=Object.assign({},x)).Cb=I(x.Cb),x.fc=A(x.fc),x.ic=I(x.ic),x.vc=I(x.vc),x.wc=A(x.wc),x.Ac=I(x.Ac),x}(),an.push(P.jc),E=f,Ja(),P}wt++;var u=Ya();if(i.instantiateWasm)return new Promise(c=>{i.instantiateWasm(u,(f,x)=>{n(f,x),c(f.exports)})});if(p)return new Promise(c=>{_t=f=>{var x=new WebAssembly.Instance(f,Ya());c(n(x,f))}});qt??(qt=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",S):S+"ort-wasm-simd-threaded.jsep.wasm":new URL("/assets/ort-wasm-simd-threaded.jsep-D5Jk56-t.wasm",import.meta.url).href);try{var h=await async function(c){var f=qt;if(!me&&typeof WebAssembly.instantiateStreaming=="function"&&!ge(f))try{var x=fetch(f,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(x,c)}catch(I){k(`wasm streaming compile failed: ${I}`),k("falling back to ArrayBuffer instantiation")}return async function(I,A){try{var R=await async function(U){if(!me)try{var H=await y(U);return new Uint8Array(H)}catch{}if(U==qt&&me)U=new Uint8Array(me);else{if(!_)throw"both async and sync fetching of the wasm failed";U=_(U)}return U}(I);return await WebAssembly.instantiate(R,A)}catch(U){k(`failed to asynchronously prepare wasm: ${U}`),rt(U)}}(f,c)}(u);return n(h.instance,h.module)}catch(c){return s(c),Promise.reject(c)}})();var Yn=n=>(Yn=P.Cb)(n),es=()=>(es=P.Db)();i._OrtInit=(n,u)=>(i._OrtInit=P.Eb)(n,u),i._OrtGetLastError=(n,u)=>(i._OrtGetLastError=P.Fb)(n,u),i._OrtCreateSessionOptions=(n,u,h,c,f,x,I,A,R,U)=>(i._OrtCreateSessionOptions=P.Gb)(n,u,h,c,f,x,I,A,R,U),i._OrtAppendExecutionProvider=(n,u)=>(i._OrtAppendExecutionProvider=P.Hb)(n,u),i._OrtAddFreeDimensionOverride=(n,u,h)=>(i._OrtAddFreeDimensionOverride=P.Ib)(n,u,h),i._OrtAddSessionConfigEntry=(n,u,h)=>(i._OrtAddSessionConfigEntry=P.Jb)(n,u,h),i._OrtReleaseSessionOptions=n=>(i._OrtReleaseSessionOptions=P.Kb)(n),i._OrtCreateSession=(n,u,h)=>(i._OrtCreateSession=P.Lb)(n,u,h),i._OrtReleaseSession=n=>(i._OrtReleaseSession=P.Mb)(n),i._OrtGetInputOutputCount=(n,u,h)=>(i._OrtGetInputOutputCount=P.Nb)(n,u,h),i._OrtGetInputName=(n,u)=>(i._OrtGetInputName=P.Ob)(n,u),i._OrtGetOutputName=(n,u)=>(i._OrtGetOutputName=P.Pb)(n,u),i._OrtFree=n=>(i._OrtFree=P.Qb)(n),i._OrtCreateTensor=(n,u,h,c,f,x)=>(i._OrtCreateTensor=P.Rb)(n,u,h,c,f,x),i._OrtGetTensorData=(n,u,h,c,f)=>(i._OrtGetTensorData=P.Sb)(n,u,h,c,f),i._OrtReleaseTensor=n=>(i._OrtReleaseTensor=P.Tb)(n),i._OrtCreateRunOptions=(n,u,h,c)=>(i._OrtCreateRunOptions=P.Ub)(n,u,h,c),i._OrtAddRunConfigEntry=(n,u,h)=>(i._OrtAddRunConfigEntry=P.Vb)(n,u,h),i._OrtReleaseRunOptions=n=>(i._OrtReleaseRunOptions=P.Wb)(n),i._OrtCreateBinding=n=>(i._OrtCreateBinding=P.Xb)(n),i._OrtBindInput=(n,u,h)=>(i._OrtBindInput=P.Yb)(n,u,h),i._OrtBindOutput=(n,u,h,c)=>(i._OrtBindOutput=P.Zb)(n,u,h,c),i._OrtClearBoundOutputs=n=>(i._OrtClearBoundOutputs=P._b)(n),i._OrtReleaseBinding=n=>(i._OrtReleaseBinding=P.$b)(n),i._OrtRunWithBinding=(n,u,h,c,f)=>(i._OrtRunWithBinding=P.ac)(n,u,h,c,f),i._OrtRun=(n,u,h,c,f,x,I,A)=>(i._OrtRun=P.bc)(n,u,h,c,f,x,I,A),i._OrtEndProfiling=n=>(i._OrtEndProfiling=P.cc)(n),i._JsepOutput=(n,u,h)=>(i._JsepOutput=P.dc)(n,u,h),i._JsepGetNodeName=n=>(i._JsepGetNodeName=P.ec)(n);var wr=()=>(wr=P.fc)(),Je=i._free=n=>(Je=i._free=P.gc)(n),br=i._malloc=n=>(br=i._malloc=P.ic)(n),di=(n,u,h,c,f,x)=>(di=P.kc)(n,u,h,c,f,x),ts=()=>(ts=P.lc)(),rs=(n,u,h,c,f)=>(rs=P.mc)(n,u,h,c,f),is=n=>(is=P.nc)(n),pi=n=>(pi=P.oc)(n),as=(n,u)=>(as=P.pc)(n,u),ns=()=>(ns=P.qc)(),ne=(n,u)=>(ne=P.rc)(n,u),Ft=n=>(Ft=P.sc)(n),ss=(n,u)=>(ss=P.tc)(n,u),re=n=>(re=P.uc)(n),hi=n=>(hi=P.vc)(n),ie=()=>(ie=P.wc)(),os=n=>(os=P.xc)(n),us=n=>(us=P.yc)(n),ls=(n,u,h)=>(ls=P.zc)(n,u,h),ds=n=>(ds=P.Ac)(n),ps=i.dynCall_iii=(n,u,h)=>(ps=i.dynCall_iii=P.Bc)(n,u,h),hs=i.dynCall_vi=(n,u)=>(hs=i.dynCall_vi=P.Cc)(n,u),ci=i.dynCall_ii=(n,u)=>(ci=i.dynCall_ii=P.Dc)(n,u),cs=i.dynCall_vii=(n,u,h)=>(cs=i.dynCall_vii=P.Ec)(n,u,h),fs=i.dynCall_iiii=(n,u,h,c)=>(fs=i.dynCall_iiii=P.Fc)(n,u,h,c),ms=i.dynCall_viii=(n,u,h,c)=>(ms=i.dynCall_viii=P.Gc)(n,u,h,c),gs=i.dynCall_iiiii=(n,u,h,c,f)=>(gs=i.dynCall_iiiii=P.Hc)(n,u,h,c,f),ys=i.dynCall_viiii=(n,u,h,c,f)=>(ys=i.dynCall_viiii=P.Ic)(n,u,h,c,f),_s=i.dynCall_viiiiii=(n,u,h,c,f,x,I)=>(_s=i.dynCall_viiiiii=P.Jc)(n,u,h,c,f,x,I),ws=i.dynCall_viiiiiii=(n,u,h,c,f,x,I,A)=>(ws=i.dynCall_viiiiiii=P.Kc)(n,u,h,c,f,x,I,A),bs=i.dynCall_ji=(n,u)=>(bs=i.dynCall_ji=P.Lc)(n,u),$s=i.dynCall_v=n=>($s=i.dynCall_v=P.Mc)(n),vs=i.dynCall_viiiii=(n,u,h,c,f,x)=>(vs=i.dynCall_viiiii=P.Nc)(n,u,h,c,f,x),xs=i.dynCall_i=n=>(xs=i.dynCall_i=P.Oc)(n),Ss=i.dynCall_fii=(n,u,h)=>(Ss=i.dynCall_fii=P.Pc)(n,u,h),ks=i.dynCall_viiiiiiii=(n,u,h,c,f,x,I,A,R)=>(ks=i.dynCall_viiiiiiii=P.Qc)(n,u,h,c,f,x,I,A,R),Ts=i.dynCall_viiiiiiiiii=(n,u,h,c,f,x,I,A,R,U,H)=>(Ts=i.dynCall_viiiiiiiiii=P.Rc)(n,u,h,c,f,x,I,A,R,U,H),Cs=i.dynCall_jiii=(n,u,h,c)=>(Cs=i.dynCall_jiii=P.Sc)(n,u,h,c),Is=i.dynCall_dii=(n,u,h)=>(Is=i.dynCall_dii=P.Tc)(n,u,h),Es=i.dynCall_viiiiiiiii=(n,u,h,c,f,x,I,A,R,U)=>(Es=i.dynCall_viiiiiiiii=P.Uc)(n,u,h,c,f,x,I,A,R,U),zs=i.dynCall_viiiiiiiiiii=(n,u,h,c,f,x,I,A,R,U,H,X)=>(zs=i.dynCall_viiiiiiiiiii=P.Vc)(n,u,h,c,f,x,I,A,R,U,H,X),As=i.dynCall_iiiiii=(n,u,h,c,f,x)=>(As=i.dynCall_iiiiii=P.Wc)(n,u,h,c,f,x),Os=i.dynCall_iij=(n,u,h)=>(Os=i.dynCall_iij=P.Xc)(n,u,h),Rs=i.dynCall_iiiiiiiiii=(n,u,h,c,f,x,I,A,R,U)=>(Rs=i.dynCall_iiiiiiiiii=P.Yc)(n,u,h,c,f,x,I,A,R,U),Bs=i.dynCall_iiiiiiiiiii=(n,u,h,c,f,x,I,A,R,U,H)=>(Bs=i.dynCall_iiiiiiiiiii=P.Zc)(n,u,h,c,f,x,I,A,R,U,H),Ns=i.dynCall_vij=(n,u,h)=>(Ns=i.dynCall_vij=P._c)(n,u,h),Ms=i.dynCall_iiif=(n,u,h,c)=>(Ms=i.dynCall_iiif=P.$c)(n,u,h,c),Ds=i.dynCall_iiij=(n,u,h,c)=>(Ds=i.dynCall_iiij=P.ad)(n,u,h,c),Ps=i.dynCall_fiii=(n,u,h,c)=>(Ps=i.dynCall_fiii=P.bd)(n,u,h,c),Us=i.dynCall_viiiiiiiiiiiii=(n,u,h,c,f,x,I,A,R,U,H,X,se,we)=>(Us=i.dynCall_viiiiiiiiiiiii=P.cd)(n,u,h,c,f,x,I,A,R,U,H,X,se,we),Ws=i.dynCall_vjiii=(n,u,h,c,f)=>(Ws=i.dynCall_vjiii=P.dd)(n,u,h,c,f),qs=i.dynCall_vif=(n,u,h)=>(qs=i.dynCall_vif=P.ed)(n,u,h),Vs=i.dynCall_iiiiiii=(n,u,h,c,f,x,I)=>(Vs=i.dynCall_iiiiiii=P.fd)(n,u,h,c,f,x,I),Ls=i.dynCall_iiiij=(n,u,h,c,f)=>(Ls=i.dynCall_iiiij=P.gd)(n,u,h,c,f),Gs=i.dynCall_iiiiiiii=(n,u,h,c,f,x,I,A)=>(Gs=i.dynCall_iiiiiiii=P.hd)(n,u,h,c,f,x,I,A),Hs=i.dynCall_viiiiiiiiiiii=(n,u,h,c,f,x,I,A,R,U,H,X,se)=>(Hs=i.dynCall_viiiiiiiiiiii=P.id)(n,u,h,c,f,x,I,A,R,U,H,X,se),Fs=i.dynCall_diii=(n,u,h,c)=>(Fs=i.dynCall_diii=P.jd)(n,u,h,c),js=i.dynCall_jiiii=(n,u,h,c,f)=>(js=i.dynCall_jiiii=P.kd)(n,u,h,c,f),Ks=i.dynCall_viiij=(n,u,h,c,f)=>(Ks=i.dynCall_viiij=P.ld)(n,u,h,c,f),Qs=i.dynCall_fiiii=(n,u,h,c,f)=>(Qs=i.dynCall_fiiii=P.md)(n,u,h,c,f),Zs=i.dynCall_viiif=(n,u,h,c,f)=>(Zs=i.dynCall_viiif=P.nd)(n,u,h,c,f),Xs=i.dynCall_diiii=(n,u,h,c,f)=>(Xs=i.dynCall_diiii=P.od)(n,u,h,c,f),Js=i.dynCall_viiid=(n,u,h,c,f)=>(Js=i.dynCall_viiid=P.pd)(n,u,h,c,f),Ys=i.dynCall_iiiijii=(n,u,h,c,f,x,I)=>(Ys=i.dynCall_iiiijii=P.qd)(n,u,h,c,f,x,I),eo=i.dynCall_iiiiiij=(n,u,h,c,f,x,I)=>(eo=i.dynCall_iiiiiij=P.rd)(n,u,h,c,f,x,I),to=n=>(to=P.sd)(n),ro=()=>(ro=P.td)(),io=n=>(io=P.ud)(n),ao=()=>(ao=P.vd)();function Km(n,u,h){var c=ie();try{cs(n,u,h)}catch(f){if(re(c),f!==f+0)throw f;ne(1,0)}}function Qm(n,u,h){var c=ie();try{return ps(n,u,h)}catch(f){if(re(c),f!==f+0)throw f;ne(1,0)}}function Zm(n,u){var h=ie();try{hs(n,u)}catch(c){if(re(h),c!==c+0)throw c;ne(1,0)}}function Xm(n,u){var h=ie();try{return ci(n,u)}catch(c){if(re(h),c!==c+0)throw c;ne(1,0)}}function Jm(n,u,h,c){var f=ie();try{return fs(n,u,h,c)}catch(x){if(re(f),x!==x+0)throw x;ne(1,0)}}function Ym(n,u,h,c,f){var x=ie();try{ys(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function eg(n,u,h,c,f){var x=ie();try{return gs(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function tg(n,u,h,c){var f=ie();try{ms(n,u,h,c)}catch(x){if(re(f),x!==x+0)throw x;ne(1,0)}}function rg(n,u,h,c,f,x,I){var A=ie();try{return Vs(n,u,h,c,f,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function ig(n){var u=ie();try{$s(n)}catch(h){if(re(u),h!==h+0)throw h;ne(1,0)}}function ag(n,u,h){var c=ie();try{return Os(n,u,h)}catch(f){if(re(c),f!==f+0)throw f;ne(1,0)}}function ng(n,u,h,c,f,x){var I=ie();try{vs(n,u,h,c,f,x)}catch(A){if(re(I),A!==A+0)throw A;ne(1,0)}}function sg(n,u,h){var c=ie();try{Ns(n,u,h)}catch(f){if(re(c),f!==f+0)throw f;ne(1,0)}}function og(n,u,h,c,f,x,I){var A=ie();try{_s(n,u,h,c,f,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function ug(n,u,h,c,f,x,I,A){var R=ie();try{ws(n,u,h,c,f,x,I,A)}catch(U){if(re(R),U!==U+0)throw U;ne(1,0)}}function lg(n,u,h,c,f,x){var I=ie();try{return As(n,u,h,c,f,x)}catch(A){if(re(I),A!==A+0)throw A;ne(1,0)}}function dg(n,u,h,c,f,x,I,A){var R=ie();try{return Gs(n,u,h,c,f,x,I,A)}catch(U){if(re(R),U!==U+0)throw U;ne(1,0)}}function pg(n,u,h,c,f,x,I,A,R,U){var H=ie();try{Es(n,u,h,c,f,x,I,A,R,U)}catch(X){if(re(H),X!==X+0)throw X;ne(1,0)}}function hg(n,u,h,c,f,x,I,A,R){var U=ie();try{ks(n,u,h,c,f,x,I,A,R)}catch(H){if(re(U),H!==H+0)throw H;ne(1,0)}}function cg(n){var u=ie();try{return xs(n)}catch(h){if(re(u),h!==h+0)throw h;ne(1,0)}}function fg(n,u,h,c,f,x,I,A,R,U){var H=ie();try{return Rs(n,u,h,c,f,x,I,A,R,U)}catch(X){if(re(H),X!==X+0)throw X;ne(1,0)}}function mg(n,u,h){var c=ie();try{return Ss(n,u,h)}catch(f){if(re(c),f!==f+0)throw f;ne(1,0)}}function gg(n,u,h,c){var f=ie();try{return Cs(n,u,h,c)}catch(x){if(re(f),x!==x+0)throw x;return ne(1,0),0n}}function yg(n,u,h){var c=ie();try{return Is(n,u,h)}catch(f){if(re(c),f!==f+0)throw f;ne(1,0)}}function _g(n,u,h,c,f,x,I,A,R,U,H,X){var se=ie();try{zs(n,u,h,c,f,x,I,A,R,U,H,X)}catch(we){if(re(se),we!==we+0)throw we;ne(1,0)}}function wg(n,u,h,c,f,x,I,A,R,U,H){var X=ie();try{Ts(n,u,h,c,f,x,I,A,R,U,H)}catch(se){if(re(X),se!==se+0)throw se;ne(1,0)}}function bg(n,u,h,c,f,x,I,A,R,U,H){var X=ie();try{return Bs(n,u,h,c,f,x,I,A,R,U,H)}catch(se){if(re(X),se!==se+0)throw se;ne(1,0)}}function $g(n,u,h,c){var f=ie();try{return Ms(n,u,h,c)}catch(x){if(re(f),x!==x+0)throw x;ne(1,0)}}function vg(n,u,h,c){var f=ie();try{return Ds(n,u,h,c)}catch(x){if(re(f),x!==x+0)throw x;ne(1,0)}}function xg(n,u,h,c){var f=ie();try{return Ps(n,u,h,c)}catch(x){if(re(f),x!==x+0)throw x;ne(1,0)}}function Sg(n,u,h,c,f,x,I,A,R,U,H,X,se,we){var qe=ie();try{Us(n,u,h,c,f,x,I,A,R,U,H,X,se,we)}catch(jt){if(re(qe),jt!==jt+0)throw jt;ne(1,0)}}function kg(n,u,h,c,f){var x=ie();try{Ws(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Tg(n,u,h){var c=ie();try{qs(n,u,h)}catch(f){if(re(c),f!==f+0)throw f;ne(1,0)}}function Cg(n,u){var h=ie();try{return bs(n,u)}catch(c){if(re(h),c!==c+0)throw c;return ne(1,0),0n}}function Ig(n,u,h,c,f){var x=ie();try{return Ls(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Eg(n,u,h,c,f,x,I,A,R,U,H,X,se){var we=ie();try{Hs(n,u,h,c,f,x,I,A,R,U,H,X,se)}catch(qe){if(re(we),qe!==qe+0)throw qe;ne(1,0)}}function zg(n,u,h,c){var f=ie();try{return Fs(n,u,h,c)}catch(x){if(re(f),x!==x+0)throw x;ne(1,0)}}function Ag(n,u,h,c,f){var x=ie();try{return js(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;return ne(1,0),0n}}function Og(n,u,h,c,f){var x=ie();try{Ks(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Rg(n,u,h,c,f){var x=ie();try{return Qs(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Bg(n,u,h,c,f){var x=ie();try{Zs(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Ng(n,u,h,c,f){var x=ie();try{return Xs(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Mg(n,u,h,c,f){var x=ie();try{Js(n,u,h,c,f)}catch(I){if(re(x),I!==I+0)throw I;ne(1,0)}}function Dg(n,u,h,c,f,x,I){var A=ie();try{return Ys(n,u,h,c,f,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}function Pg(n,u,h,c,f,x,I){var A=ie();try{return eo(n,u,h,c,f,x,I)}catch(R){if(re(A),R!==R+0)throw R;ne(1,0)}}return i.stackSave=()=>ie(),i.stackRestore=n=>re(n),i.stackAlloc=n=>hi(n),i.setValue=function(n,u,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":M()[n>>>0]=u;break;case"i16":le()[n>>>1>>>0]=u;break;case"i32":D()[n>>>2>>>0]=u;break;case"i64":J[n>>>3]=BigInt(u);break;case"float":Ue()[n>>>2>>>0]=u;break;case"double":Re()[n>>>3>>>0]=u;break;case"*":he()[n>>>2>>>0]=u;break;default:rt(`invalid type for setValue: ${h}`)}},i.getValue=function(n,u="i8"){switch(u.endsWith("*")&&(u="*"),u){case"i1":case"i8":return M()[n>>>0];case"i16":return le()[n>>>1>>>0];case"i32":return D()[n>>>2>>>0];case"i64":return J[n>>>3];case"float":return Ue()[n>>>2>>>0];case"double":return Re()[n>>>3>>>0];case"*":return he()[n>>>2>>>0];default:rt(`invalid type for getValue: ${u}`)}},i.UTF8ToString=ke,i.stringToUTF8=Bt,i.lengthBytesUTF8=mn,function n(){if(0<wt)Vt=n;else if(p)a(i),ot();else{for(;0<jr.length;)jr.shift()(i);0<wt?Vt=n:(i.calledRun=!0,F||(ot(),a(i)))}}(),i.PTR_SIZE=4,o}),lp=bi,uo=(t=(e=globalThis.self)==null?void 0:e.name)==null?void 0:t.startsWith("em-pthread"),uo&&bi()}),$i,lo,Me,dp,vr,po,ho,vi,co,xi,pp,Si,hp,Ta=q(()=>{ka(),$i=typeof location>"u"?void 0:location.origin,lo=()=>{var e;return(e=import.meta.url)!=null&&e.startsWith("file:")?new URL(new URL("/assets/ort.webgpu.bundle.min-CEayb2S6.mjs",import.meta.url).href,$i).href:import.meta.url},Me=lo(),dp=()=>{if(Me&&!Me.startsWith("blob:"))return Me.substring(0,Me.lastIndexOf("/")+1)},vr=(e,t)=>{try{let r=t??Me;return(r?new URL(e,r):new URL(e)).origin===$i}catch{return!1}},po=(e,t)=>{let r=t??Me;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},ho=(e,t)=>`${t??"./"}${e}`,vi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},co=async e=>(await import(e)).default,xi=(ny(),Dr(sp)).default,pp=async()=>{if(!Me)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(vr(Me))return[void 0,xi()];let e=await vi(Me);return[e,xi(e)]},Si=(sy(),Dr(up)).default,hp=async(e,t,r)=>{if(!e&&!t&&Si&&Me&&vr(Me))return[void 0,Si];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??po(a,t),i=r&&s&&!vr(s,t),o=i?await vi(s):s??ho(a,t);return[i?o:void 0,await co(o)]}}}),ki,xr,Qt,Ti,fo,mo,Ca,Ce,At=q(()=>{Ta(),xr=!1,Qt=!1,Ti=!1,fo=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},mo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Ca=async e=>{if(xr)return Promise.resolve();if(Qt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ti)throw new Error("previous call to 'initializeWebAssembly()' failed.");Qt=!0;let t=e.initTimeout,r=e.numThreads;if(!mo())throw new Error("WebAssembly SIMD is not supported in the current environment.");let a=fo();r>1&&!a&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let s=e.wasmPaths,i=typeof s=="string"?s:void 0,o=s==null?void 0:s.mjs,l=(o==null?void 0:o.href)??o,d=s==null?void 0:s.wasm,p=(d==null?void 0:d.href)??d,m=e.wasmBinary,[g,y]=await hp(l,i,r>1),_=!1,w=[];if(t>0&&w.push(new Promise(b=>{setTimeout(()=>{_=!0,b()},t)})),w.push(new Promise((b,S)=>{let v={numThreads:r};if(m)v.wasmBinary=m;else if(p||i)v.locateFile=$=>p??i+$;else if(l&&l.indexOf("blob:")!==0)v.locateFile=$=>new URL($,l).href;else if(g){let $=dp();$&&(v.locateFile=T=>$+T)}y(v).then($=>{Qt=!1,xr=!0,ki=$,b(),g&&URL.revokeObjectURL(g)},$=>{Qt=!1,Ti=!0,S($)})})),await Promise.race(w),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ce=()=>{if(xr&&ki)return ki;throw new Error("WebAssembly is not initialized yet.")}}),ze,Ur,fe,Ia=q(()=>{At(),ze=(e,t)=>{let r=Ce(),a=r.lengthBytesUTF8(e)+1,s=r._malloc(a);return r.stringToUTF8(e,s,a),t.push(s),s},Ur=(e,t,r,a)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([s,i])=>{let o=t?t+s:s;if(typeof i=="object")Ur(i,o+".",r,a);else if(typeof i=="string"||typeof i=="number")a(o,i.toString());else if(typeof i=="boolean")a(o,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},fe=e=>{let t=Ce(),r=t.stackSave();try{let a=t.PTR_SIZE,s=t.stackAlloc(2*a);t._OrtGetLastError(s,s+a);let i=Number(t.getValue(s,a===4?"i32":"i64")),o=t.getValue(s+a,"*"),l=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${l}`)}finally{t.stackRestore(r)}}}),cp,oy=q(()=>{At(),Ia(),cp=e=>{let t=Ce(),r=0,a=[],s=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)s.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)s.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(s.terminate=!1);let i=0;return(e==null?void 0:e.tag)!==void 0&&(i=ze(e.tag,a)),r=t._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,i),r===0&&fe("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&Ur(e.extra,"",new WeakSet,(o,l)=>{let d=ze(o,a),p=ze(l,a);t._OrtAddRunConfigEntry(r,d,p)!==0&&fe(`Can't set a run config entry: ${o} - ${l}.`)}),[r,a]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),a.forEach(o=>t._free(o)),i}}}),go,yo,_o,wo,fp,uy=q(()=>{At(),Ia(),go=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},yo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},_o=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},wo=(e,t,r)=>{for(let a of t){let s=typeof a=="string"?a:a.name;switch(s){case"webnn":if(s="WEBNN",typeof a!="string"){let o=a==null?void 0:a.deviceType;if(o){let l=ze("deviceType",r),d=ze(o,r);Ce()._OrtAddSessionConfigEntry(e,l,d)!==0&&fe(`Can't set a session config entry: 'deviceType' - ${o}.`)}}break;case"webgpu":if(s="JS",typeof a!="string"){let o=a;if(o!=null&&o.preferredLayout){if(o.preferredLayout!=="NCHW"&&o.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${o.preferredLayout}`);let l=ze("preferredLayout",r),d=ze(o.preferredLayout,r);Ce()._OrtAddSessionConfigEntry(e,l,d)!==0&&fe(`Can't set a session config entry: 'preferredLayout' - ${o.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let i=ze(s,r);Ce()._OrtAppendExecutionProvider(e,i)!==0&&fe(`Can't append execution provider: ${s}.`)}},fp=e=>{let t=Ce(),r=0,a=[],s=e||{};_o(s);try{let i=go(s.graphOptimizationLevel??"all"),o=yo(s.executionMode??"sequential"),l=typeof s.logId=="string"?ze(s.logId,a):0,d=s.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let p=s.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let m=typeof s.optimizedModelFilePath=="string"?ze(s.optimizedModelFilePath,a):0;if(r=t._OrtCreateSessionOptions(i,!!s.enableCpuMemArena,!!s.enableMemPattern,o,!!s.enableProfiling,0,l,d,p,m),r===0&&fe("Can't create session options."),s.executionProviders&&wo(r,s.executionProviders,a),s.enableGraphCapture!==void 0){if(typeof s.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${s.enableGraphCapture}`);let g=ze("enableGraphCapture",a),y=ze(s.enableGraphCapture.toString(),a);t._OrtAddSessionConfigEntry(r,g,y)!==0&&fe(`Can't set a session config entry: 'enableGraphCapture' - ${s.enableGraphCapture}.`)}if(s.freeDimensionOverrides)for(let[g,y]of Object.entries(s.freeDimensionOverrides)){if(typeof g!="string")throw new Error(`free dimension override name must be a string: ${g}`);if(typeof y!="number"||!Number.isInteger(y)||y<0)throw new Error(`free dimension override value must be a non-negative integer: ${y}`);let _=ze(g,a);t._OrtAddFreeDimensionOverride(r,_,y)!==0&&fe(`Can't set a free dimension override: ${g} - ${y}.`)}return s.extra!==void 0&&Ur(s.extra,"",new WeakSet,(g,y)=>{let _=ze(g,a),w=ze(y,a);t._OrtAddSessionConfigEntry(r,_,w)!==0&&fe(`Can't set a session config entry: ${g} - ${y}.`)}),[r,a]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&fe("Can't release session options."),a.forEach(o=>t._free(o)),i}}}),Mt,Tt,Ct,Ea,Wr,za,Aa,la,Y=q(()=>{Mt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Tt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Ct=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],a=typeof t=="number"?t:t.reduce((s,i)=>s*i,1);return r>0?Math.ceil(a*r):void 0},Ea=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Wr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},za=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Aa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",la=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Oa,mp=q(()=>{ka(),Oa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),a=r?parseInt(r,10):0;if(a<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let s=t.body.getReader(),i;try{i=new ArrayBuffer(a)}catch(l){if(l instanceof RangeError){let d=Math.ceil(a/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw l}let o=0;for(;;){let{done:l,value:d}=await s.read();if(l)break;let p=d.byteLength;new Uint8Array(i,o,p).set(d),o+=p}return new Uint8Array(i,0,a)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),bo,$o,vo,xo,Ra,So,pe,st=q(()=>{Y(),bo=["V","I","W","E","F"],$o=(e,t)=>{console.log(`[${bo[e]},${new Date().toISOString()}]${t}`)},Ra=(e,t)=>{vo=e,xo=t},So=(e,t)=>{let r=Wr(e),a=Wr(vo);r>=a&&$o(r,typeof t=="function"?t():t)},pe=(...e)=>{xo&&So(...e)}}),Ba,gp=q(()=>{Y(),Ba=(e,t)=>new(Ea(t))(e)}),Na=q(()=>{}),Ci,Sr,kr,ko,To,Ii,da,Co,yp,ly=q(()=>{st(),Na(),Ci=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Sr=[],kr=e=>Math.ceil(Number(e)/16)*16,ko=e=>{for(let t=0;t<Sr.length;t++){let r=Sr[t];if(e<=r)return r}return Math.ceil(e/16)*16},To=1,Ii=()=>To++,da=async(e,t,r,a)=>{let s=kr(r),i=e.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,i,0,s),e.flush(),await i.mapAsync(GPUMapMode.READ);let l=i.getMappedRange();if(a){let d=a();return d.set(new Uint8Array(l,0,r)),d}else return new Uint8Array(l.slice(0,r))}finally{i.destroy()}},Co=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ci)Sr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,a=t.byteOffset,s=t.byteLength,i=kr(s),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==s)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${s}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=l.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,a,s)),l.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(l,0,o.gpuData.buffer,0,i),this.backend.device.queue.submit([p.finish()]),l.destroy(),pe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(t);if(!a)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==a.originalSize)throw new Error("inconsistent source and destination gpu data size");let s=kr(r.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(r.gpuData.buffer,0,a.gpuData.buffer,0,s)}registerExternalBuffer(e,t,r){let a;if(r){if(a=r[0],e===r[1])return pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=Ii();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:e},originalSize:t}),pe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${a}, registered.`),a}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),pe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=ko(e),a,s=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||i){let l=(s?this.freeBuffers:this.freeUniformBuffers).get(r);l?l.length>0?a=l.pop():a=this.backend.device.createBuffer({size:r,usage:t}):a=this.backend.device.createBuffer({size:r,usage:t})}else a=this.backend.device.createBuffer({size:r,usage:t});let o={id:Ii(),type:0,buffer:a};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),pe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return pe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await da(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ci.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(pe("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},yp=(...e)=>new Co(...e)}),Io,_e,Se=q(()=>{Io=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},_e=e=>new Io(e)}),Eo,Ut,O,qr,_p,wp,bp,oe=q(()=>{Eo=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ut=class{static calcShape(e,t,r=!1){let a=e.length,s=t.length;if(a===0)return t;if(s===0)return e;let i=Math.max(e.length,t.length),o=new Array(i);if(r){if(a<2||s<2)return;let l=Eo.calcMatMulShape([e[a-2],e[a-1]],[t[s-2],t[s-1]]);if(l===void 0)return;[o[i-2],o[i-1]]=l}for(let l=r?3:1;l<=i;l++){let d=a-l<0?1:e[a-l],p=s-l<0?1:t[s-l];if(d!==p&&d>1&&p>1)return;let m=Math.max(d,p);if(d&&p)o[i-l]=Math.max(d,p);else{if(m>1)return;o[i-l]=0}}return o}static isValidBroadcast(e,t){let r=e.length,a=t.length;if(r>a)return!1;for(let s=1;s<=r;s++)if(e[r-s]!==1&&e[r-s]!==t[a-s])return!1;return!0}},O=class Nr{static size(t){return Nr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let a=t.length;if(a===0)return[];let s=new Array(a),i=a-1;for(;i>=0;){if(t[i]%r===0){s[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");s[i]=1,r/=t[i],i--}for(i--;i>=0;i--)s[i]=t[i];return s}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Nr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Nr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,a){let s=1;for(let i=r;i<a;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");s*=Number(t[i])}return s}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let a=new Array(r);a[r-1]=1,a[r-2]=t[r-1];for(let s=r-3;s>=0;--s)a[s]=a[s+1]*t[s+1];return a}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(a=>this.normalizeAxis(a,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(a=>t[a]):t.slice().reverse()}static padShape(t,r){let a=t.length;return t.map((s,i)=>s+r[i]+r[i+a])}static areEqual(t,r){return t.length!==r.length?!1:t.every((a,s)=>a===r[s])}},qr=class ar{static adjustPoolAttributes(t,r,a,s,i,o){if(!t&&a.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=a.length?a.push(r[l+2]):a[l]=r[l+2];for(let l=0;l<a.length;l++)if(l<s.length){if(s[l]<0)throw new Error("strides should be greater than or equal to 1")}else s.push(1);for(let l=0;l<a.length;l++)if(l<i.length){if(i[l]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let l=0;l<a.length*2;l++)if(l<o.length){if(o[l]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let l=0;l<a.length;l++){if(a[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[l]>=a[l]||o[l+a.length]>=a[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,a,s,i,o,l){if(l){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(s.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)ar.adjustPadAndReturnShape(t[d+(o?1:2)],r[d],a[d],s[d],i,d,d+t.length-2,l)}}static computePoolOutputShape(t,r,a,s,i,o,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return ar.computeShapeHelper(t,r,d,a,s,i,o,l),d}static computeConvOutputShape(t,r,a,s,i,o,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return ar.computeShapeHelper(!1,t,d,a,s,i,o,l),d}static computeShapeHelper(t,r,a,s,i,o,l,d){if(t)for(let p=0;p<r.length-2;p++)a.push(1);else for(let p=0;p<r.length-2;p++)a.push(ar.adjustPadAndReturnShape(r[p+2],s[p],i[p],o[p],l,p,p+r.length-2,d))}static adjustPadAndReturnShape(t,r,a,s,i,o,l,d){let p=a*(s-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[o]=0,i[l]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(a!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let m=((t+r-1)/r-1)*r+s-t;return i[o]=Math.floor(d==="SAME_LOWER"?(m+1)/2:m/2),i[l]=m-i[o],Math.floor((t+m-s)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[o]+i[l]-p)/r+1)}},_p=class{static getShapeOfGemmResult(e,t,r,a,s){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let i,o,l;t?(i=e[1],o=e[0]):(i=e[0],o=e[1]);let d=-1;if(a?(l=r[0],d=1):(l=r[1],d=0),r[d]!==o)throw new Error("dimension mismatch");if(i<=0||l<=0||o<=0)throw new Error("invalid shape specified");if(s&&!Ut.isValidBroadcast(s,[i,l]))throw new Error("gemm: invalid bias shape for broadcast");return[i,l,o]}},wp=-34028234663852886e22,bp=34028234663852886e22}),Wt,Tr,Ie,Ae,Q,xe,pa,Pt,gt,K,Zt,N,j,$p,Ma,zo,vp,ue=q(()=>{Y(),oe(),Wt=64,Tr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ie=(e,t=1)=>{let r=Tr(e,t);return typeof r=="string"?r:r[0]},Ae=(e,t=1)=>{let r=Tr(e,t);return typeof r=="string"?r:r[1]},Q=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:O.computeStrides(r)})}),t},xe=e=>e%4===0?4:e%2===0?2:1,pa=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Pt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,gt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,K=(e,t,r,a)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?a==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:a==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Zt=(e,t,r,a,s)=>{let i=typeof r=="number",o=i?r:r.length,l=[...new Array(o).keys()],d=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,p=Tr(t,s),m=typeof p=="string"?p:p[1],g=typeof p=="string"?p:p[0],y={indices:d,value:m,storage:g,tensor:t},_=M=>typeof M=="string"?M:`${M}u`,w={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=i?"uniforms.":"",S=`${b}${e}_shape`,v=`${b}${e}_strides`,$="";for(let M=0;M<o-1;M++)$+=`
    let dim${M} = current / ${K(v,M,o)};
    let rest${M} = current % ${K(v,M,o)};
    indices[${M}] = dim${M};
    current = rest${M};
    `;$+=`indices[${o-1}] = current;`;let T=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${y.indices} {
    var indices: ${y.indices};
    var current = offset;
    ${$}
    return indices;
  }`,k=M=>(w.offsetToIndices=!0,o<2?M:`o2i_${e}(${M})`),C=[];if(o>=2)for(let M=o-1;M>=0;M--)C.push(`${K(v,M,o)} * (indices[${M}])`);let E=o<2?"":`
  fn i2o_${e}(indices: ${y.indices}) -> u32 {
    return ${C.join("+")};
  }`,z=M=>(w.indicesToOffset=!0,o<2?M:`i2o_${e}(${M})`),B=(...M)=>o===0?"0u":`${y.indices}(${M.map(_).join(",")})`,W=(M,V)=>o<2?`${M}`:`${K(M,V,o)}`,G=(M,V,le)=>o<2?`${M}=${le};`:`${K(M,V,o)}=${le};`,ee={},ae=(M,V)=>{w.broadcastedIndicesToOffset=!0;let le=`${V.name}broadcastedIndicesTo${e}Offset`;if(le in ee)return`${le}(${M})`;let be=[];for(let D=o-1;D>=0;D--){let he=V.indicesGet("outputIndices",D+V.rank-o);be.push(`${W(v,D)} * (${he} % ${W(S,D)})`)}return ee[le]=`fn ${le}(outputIndices: ${V.type.indices}) -> u32 {
             return ${be.length>0?be.join("+"):"0u"};
           }`,`${le}(${M})`},Z=(M,V)=>(()=>{if(y.storage===y.value)return`${e}[${M}]=${V};`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`${e}[${M}]=vec2<u32>(u32(${V}), select(0u, 0xFFFFFFFFu, ${V} < 0));`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`${e}[${M}]=vec2<u32>(u32(${V}), 0u);`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`${e}[${M}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${V}));`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),te=M=>(()=>{if(y.storage===y.value)return`${e}[${M}]`;if(y.storage==="vec2<u32>"&&y.value==="i32")return`i32(${e}[${M}].x)`;if(y.storage==="vec2<u32>"&&y.value==="u32")return`u32(${e}[${M}].x)`;if(y.storage==="u32"&&y.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${M}] & 0xFFu), bool(${e}[${M}] & 0xFF00u), bool(${e}[${M}] & 0xFF0000u), bool(${e}[${M}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${y.storage} and value type ${y.value} yet`)})(),J=o<2?"":`
  fn get_${e}ByIndices(indices: ${y.indices}) -> ${m} {
    return ${te(`i2o_${e}(indices)`)};
  }`,L=o<2?"":(()=>{let M=l.map(le=>`d${le}: u32`).join(", "),V=l.map(le=>`d${le}`).join(", ");return`
  fn get_${e}(${M}) -> ${m} {
    return get_${e}ByIndices(${B(V)});
  }`})(),de=(...M)=>{if(M.length!==o)throw new Error(`indices length must be ${o}`);let V=M.map(_).join(",");return o===0?te("0u"):o===1?te(V[0]):(w.get=!0,w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}(${V})`)},me=M=>o<2?te(M):(w.getByIndices=!0,w.indicesToOffset=!0,`get_${e}ByIndices(${M})`),F=o<2?"":`
  fn set_${e}ByIndices(indices: ${y.indices}, value: ${m}) {
    ${Z(`i2o_${e}(indices)`,"value")}
  }`,ge=o<2?"":(()=>{let M=l.map(le=>`d${le}: u32`).join(", "),V=l.map(le=>`d${le}`).join(", ");return`
  fn set_${e}(${M}, value: ${m}) {
    set_${e}ByIndices(${B(V)}, value);
  }`})();return{impl:()=>{let M=[],V=!1;return w.offsetToIndices&&(M.push(T),V=!0),w.indicesToOffset&&(M.push(E),V=!0),w.broadcastedIndicesToOffset&&(Object.values(ee).forEach(le=>M.push(le)),V=!0),w.set&&(M.push(ge),V=!0),w.setByIndices&&(M.push(F),V=!0),w.get&&(M.push(L),V=!0),w.getByIndices&&(M.push(J),V=!0),!i&&V&&M.unshift(`const ${S} = ${y.indices}(${r.join(",")});`,`const ${v} = ${y.indices}(${O.computeStrides(r).join(",")});`),M.join(`
`)},type:y,offsetToIndices:k,indicesToOffset:z,broadcastedIndicesToOffset:ae,indices:B,indicesGet:W,indicesSet:G,set:(...M)=>{if(M.length!==o+1)throw new Error(`indices length must be ${o}`);let V=M[o];if(typeof V!="string")throw new Error("value must be string");let le=M.slice(0,o).map(_).join(",");return o===0?Z("0u",V):o===1?Z(le[0],V):(w.set=!0,w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}(${le}, ${V})`)},setByOffset:Z,setByIndices:(M,V)=>o<2?Z(M,V):(w.setByIndices=!0,w.indicesToOffset=!0,`set_${e}ByIndices(${M}, ${V});`),get:de,getByOffset:te,getByIndices:me,usage:a,name:e,strides:v,shape:S,rank:o}},N=(e,t,r,a=1)=>Zt(e,t,r,"input",a),j=(e,t,r,a=1)=>Zt(e,t,r,"output",a),$p=(e,t,r)=>Zt(e,t,r,"atomicOutput",1),Ma=(e,t,r,a=1)=>Zt(e,t,r,"internal",a),zo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Wt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],a=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*a>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=s?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*a}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${a})
  fn main(${i}) {
    ${o}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",a=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${a}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:a}of this.uniforms)if(a&&a>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(a/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(a/4)}>`);else{let s=a==null||a===1?r:`vec${a}<${r}>`;e.push(`${t}:${s}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},vp=(e,t)=>new zo(e,t)}),Ao,Ei,Oo,Ro,Bo,No,Pe,xp,Sp,yt=q(()=>{Y(),oe(),Se(),ue(),Ao=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Ei=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Oo=(e,t)=>O.sortBasedOnPerm(e,Ei(e.length,t)),Ro=(e,t,r,a)=>{let s=`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)s+=`a[${e[i]}]=i[${i}];`;return s+="return a;}"},Bo=(e,t)=>{let r=[],a=[];for(let s=0;s<e.length;++s)e[s]!==1&&r.push(e[s]),e[t[s]]!==1&&a.push(t[s]);return{newShape:r,newPerm:a}},No=(e,t)=>{let r=0;for(let a=0;a<e.length;++a)if(t[e[a]]!==1){if(e[a]<r)return!1;r=e[a]}return!0},Pe=(e,t)=>{let r=e.dataType,a=e.dims.length,s=Ei(a,t),i=Oo(e.dims,s),o=e.dims,l=i,d=a<2||No(s,e.dims),p;if(d)return p=w=>{let b=N("input",r,o,4),S=j("output",r,l,4);return`
  ${w.registerUniform("output_size","u32").declareVariables(b,S)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64/4)},programUniforms:[{type:12,data:Math.ceil(w/4)}]}},getShaderSource:p};let{newShape:m,newPerm:g}=Bo(e.dims,s),y=O.areEqual(g,[2,3,1]),_=O.areEqual(g,[3,1,2]);if(m.length===2||y||_){o=y?[m[0],m[1]*m[2]]:_?[m[0]*m[1],m[2]]:m,l=[o[1],o[0]];let w=16;return p=b=>{let S=N("a",r,o.length),v=j("output",r,l.length);return`
  ${b.registerUniform("output_size","u32").declareVariables(S,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${w+1}>, ${w}>;
  ${b.mainStart([w,w,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${w} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${w}u + local_id.x;
    let input_row = workgroup_id_x * ${w}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${S.getByIndices(`${S.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${w}u + local_id.x;
    let output_row = workgroup_id_y * ${w}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let b=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(l[1]/w),y:Math.ceil(l[0]/w)},programUniforms:[{type:12,data:b},...Q(o,l)]}},getShaderSource:p}}return p=w=>{let b=N("a",r,o.length),S=j("output",r,l.length);return`
  ${w.registerUniform("output_size","u32").declareVariables(b,S)}

  ${Ro(s,a,b,S)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${S.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${S.setByOffset("global_idx",b.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let w=O.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...Q(o,l)]}},getShaderSource:p}},xp=(e,t)=>{Ao(e.inputs,t.perm),e.compute(Pe(e.inputs[0],t.perm))},Sp=e=>_e({perm:e.perm})}),Mo,Do,Po,Uo,Wo,qo,Vo,Lo,Go,Ho,Le,kp,Tp,Cp,Ip,Ep,zp,Ap,Op,Rp,Bp,dy=q(()=>{Y(),oe(),ue(),Da(),yt(),Mo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Do={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Po={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Uo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Wo=(e,t)=>{let r=[];for(let a=t-e;a<t;++a)r.push(a);return r},qo=(e,t)=>{let r=[],a=e.length;for(let i=0;i<a;i++)t.indexOf(i)===-1&&r.push(e[i]);let s=t.map(i=>e[i]);return[r,s]},Vo=(e,t)=>{let r=e.length+t.length,a=[],s=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?a.push(e[s++]):a.push(1);return a},Lo=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Go=(e,t)=>{let r=[];if(!Lo(e,t)){for(let a=0;a<t;++a)e.indexOf(a)===-1&&r.push(a);e.forEach(a=>r.push(a))}return r},Ho=(e,t,r,a,s,i,o)=>{let l=r[0].dims,d=O.size(i),p=O.size(o),m=N("_A",r[0].dataType,l),g=j("output",s,i),y=64;d===1&&(y=256);let _=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,w=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(m,g)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Po[a]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${Mo[a]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Do[a]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${g.setByOffset("outputIndex",`${a==="mean"?`${g.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${g.type.storage}(${Uo[a]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${y}`,inputDependencies:["type"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:d},programUniforms:[{type:12,data:p}]})}},Le=(e,t,r,a)=>{let s=e.inputs.length===1?r:ha(e.inputs,r),i=s.axes;i.length===0&&!s.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((_,w)=>w));let o=O.normalizeAxes(i,e.inputs[0].dims.length),l=o,d=e.inputs[0],p=Go(l,e.inputs[0].dims.length);p.length>0&&(d=e.compute(Pe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],l=Wo(l.length,d.dims.length));let[m,g]=qo(d.dims,l),y=m;s.keepDims&&(y=Vo(m,o)),e.compute(Ho(t,s.cacheKey,[d],a,e.inputs[0].dataType,y,g),{inputs:[d]})},kp=(e,t)=>{Le(e,"ReduceMeanShared",t,"mean")},Tp=(e,t)=>{Le(e,"ReduceL1Shared",t,"l1")},Cp=(e,t)=>{Le(e,"ReduceL2Shared",t,"l2")},Ip=(e,t)=>{Le(e,"ReduceLogSumExpShared",t,"logSumExp")},Ep=(e,t)=>{Le(e,"ReduceMaxShared",t,"max")},zp=(e,t)=>{Le(e,"ReduceMinShared",t,"min")},Ap=(e,t)=>{Le(e,"ReduceProdShared",t,"prod")},Op=(e,t)=>{Le(e,"ReduceSumShared",t,"sum")},Rp=(e,t)=>{Le(e,"ReduceSumSquareShared",t,"sumSquare")},Bp=(e,t)=>{Le(e,"ReduceLogSumShared",t,"logSum")}}),Ge,Fo,Vr,ha,He,jo,Ko,Qo,Zo,Xo,Jo,Yo,eu,tu,ru,Fe,Np,Mp,Dp,Pp,Up,Wp,qp,Vp,Lp,Gp,Da=q(()=>{Y(),oe(),Se(),ue(),dy(),Ge=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Fo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Vr=(e,t,r,a,s,i,o=!1,l=!1)=>{let d=[],p=r[0].dims,m=p.length,g=O.normalizeAxes(s,m),y=!l&&g.length===0;p.forEach((b,S)=>{y||g.indexOf(S)>=0?o&&d.push(1):d.push(b)});let _=d.length,w=O.size(d);return{name:e,shaderCache:t,getShaderSource:b=>{let S=[],v=N("_A",r[0].dataType,m),$=j("output",i,_),T=a(v,$,g),k=T[2];for(let C=0,E=0;C<m;C++)y||g.indexOf(C)>=0?(o&&E++,k=`for(var j${C}: u32 = 0; j${C} < ${p[C]}; j${C}++) {
                  ${T[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${v.indicesSet("input_indices",C,`j${C}`)}
                  ${k}
                }`):(S.push(`${v.indicesSet("input_indices",C,$.indicesGet("output_indices",E))};`),E++);return`

        ${b.registerUniform("output_size","u32").declareVariables(v,$)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${$.offsetToIndices("global_idx")};

          ${S.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${k}
          ${T[3]}
          ${T.length===4?$.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:[{type:12,data:w},...Q(p,d)]})}},ha=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),_e({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},He=(e,t,r,a)=>{let s=e.inputs,i=s.length===1?r:ha(s,r);e.compute(Vr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[s[0]],i.noopWithEmptyAxes&&i.axes.length===0?Fo:a,i.axes,s[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},jo=(e,t)=>{Ge(e.inputs),He(e,"ReduceLogSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},Ko=(e,t)=>{Ge(e.inputs),He(e,"ReduceL1",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Qo=(e,t)=>{Ge(e.inputs),He(e,"ReduceL2",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},Zo=(e,t)=>{Ge(e.inputs),He(e,"ReduceLogSumExp",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Xo=(e,t)=>{Ge(e.inputs),He(e,"ReduceMax",t,(r,a,s)=>{let i=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&i.push(r.indicesSet("input_indices",o,0));return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},Jo=(e,t)=>{Ge(e.inputs),He(e,"ReduceMean",t,(r,a,s)=>{let i=1;for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&(i*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${a.type.value}(sum / ${i});`]})},Yo=(e,t)=>{Ge(e.inputs),He(e,"ReduceMin",t,(r,a,s)=>{let i=[];for(let o=0;o<r.rank;o++)(s.indexOf(o)>=0||s.length===0)&&i.push(`input_indices[${o}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},eu=(e,t)=>{Ge(e.inputs),He(e,"ReduceProd",t,(r,a)=>[`var value = ${a.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},tu=(e,t)=>{Ge(e.inputs),He(e,"ReduceSum",t,(r,a)=>[`var value = ${a.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ru=(e,t)=>{Ge(e.inputs),He(e,"ReduceSumSquare",t,(r,a)=>[`var t = ${a.type.value}(0); var value = ${a.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Fe=(e,t,r)=>{if(t.length===0)return r;let a=1,s=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?a*=e[i]:s*=e[i];return s<32&&a>1024},Np=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jo(e,t):kp(e,t)},Mp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Ko(e,t):Tp(e,t)},Dp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qo(e,t):Cp(e,t)},Pp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zo(e,t):Ip(e,t)},Up=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xo(e,t):Ep(e,t)},Wp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yo(e,t):zp(e,t)},qp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?eu(e,t):Ap(e,t)},Vp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?tu(e,t):Op(e,t)},Lp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ru(e,t):Rp(e,t)},Gp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?jo(e,t):Bp(e,t)}}),zi,Hp,Fp,ca,py=q(()=>{Y(),Se(),Da(),zi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Hp=(e,t)=>{zi(e.inputs);let r=(a,s,i)=>{let o=[];for(let l=0;l<a.rank;l++)(i.indexOf(l)>=0||i.length===0)&&o.push(`input_indices[${l}] = 0;`);return[`${o.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};e.compute(Vr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Fp=(e,t)=>{zi(e.inputs);let r=(a,s,i)=>{let o=[];for(let l=0;l<a.rank;l++)(i.indexOf(l)>=0||i.length===0)&&o.push(`input_indices[${l}] = 0;`);return[`${o.join(`
`)}`,`var value = ${a.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${a.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${a.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};e.compute(Vr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ca=e=>_e(e)}),iu,Cr,au,nu,su,ur,ou,jp,Pa=q(()=>{Y(),oe(),Na(),ue(),iu=(e,t)=>{let r=e[0],a=e[1],s=e[2],i=e[3],o=e[4],l=e[5];if(o&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],p=r.dims[1],m=r.dims[2];if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(a.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(s.dims[0]!==a.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let g=s.dims[0]/3,y=g,_=y;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let T of t.qkvHiddenSizes)if(T%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");g=t.qkvHiddenSizes[0],y=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let w=p;if(g!==y)throw new Error("qkv_hidden_sizes first element should be same as the second");if(s.dims[0]!==g+y+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(o){if(y!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==y/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=o.dims[3])}let S=w+b,v=-1,$=0;if(i)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[2]!==p||l.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:b,kvSequenceLength:w,totalSequenceLength:S,maxSequenceLength:v,inputHiddenSize:m,hiddenSize:g,vHiddenSize:_,headSize:Math.floor(g/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Cr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e==null?void 0:e.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,au=(e,t,r,a,s,i,o,l)=>{let d=xe(o?1:i),p=64,m=i/d;m<p&&(p=32);let g=Math.ceil(i/d/p),y=[{type:12,data:t},{type:12,data:r},{type:12,data:a},{type:12,data:s},{type:12,data:m},{type:12,data:g}],_=Ie(e.dataType,d),w=Ae(1,d),b=["type"];o&&b.push("type"),l&&b.push("type");let S=v=>{let $=j("x",e.dataType,e.dims,d),T=[$],k=o?N("seq_lens",o.dataType,o.dims):void 0;k&&T.push(k);let C=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;C&&T.push(C);let E=Ae(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${v.registerUniforms(z).declareVariables(...T)}
  ${v.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Cr(k,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${w}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${w}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${w}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${w}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${w}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${d}`,inputDependencies:b},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/p),y:s,z:t*r},programUniforms:y})}},nu=(e,t,r,a,s,i,o,l,d)=>{let p=o+i.kvSequenceLength,m=[i.batchSize,i.numHeads,i.sequenceLength,p],g=e>1&&a,y=i.kvNumHeads?i.kvNumHeads:i.numHeads,_=g?[i.batchSize,y,p,i.headSize]:void 0,w=i.nReps?i.nReps:1,b=i.scale===0?1/Math.sqrt(i.headSize):i.scale,S=xe(i.headSize),v=i.headSize/S,$=12,T={x:Math.ceil(p/$),y:Math.ceil(i.sequenceLength/$),z:i.batchSize*i.numHeads},k=[{type:12,data:i.sequenceLength},{type:12,data:v},{type:12,data:p},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:b},{type:12,data:o},{type:12,data:i.kvSequenceLength},{type:12,data:w}],C=g&&a&&O.size(a.dims)>0,E=["type","type"];C&&E.push("type"),s&&E.push("type"),l&&E.push("type"),d&&E.push("type");let z=[{dims:m,dataType:t.dataType,gpuDataType:0}];g&&z.push({dims:_,dataType:t.dataType,gpuDataType:0});let B=W=>{let G=N("q",t.dataType,t.dims,S),ee=N("key",r.dataType,r.dims,S),ae=[G,ee];if(C){let F=N("past_key",a.dataType,a.dims,S);ae.push(F)}s&&ae.push(N("attention_bias",s.dataType,s.dims));let Z=l?N("seq_lens",l.dataType,l.dims):void 0;Z&&ae.push(Z);let te=d?N("total_sequence_length_input",d.dataType,d.dims):void 0;te&&ae.push(te);let J=j("output",t.dataType,m),L=[J];g&&L.push(j("present_key",t.dataType,_,S));let de=Ae(1,S),me=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${G.type.storage}, ${$*$}>;
  ${W.registerUniforms(me).declareVariables(...ae,...L)}
  ${W.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${w===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${w===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Cr(Z,te,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&g?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${g?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${de}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${C&&g?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${g?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${de}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${J.type.value} (sum * uniforms.alpha) + ${s?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${s!==void 0};${a!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:z,dispatchGroup:T,programUniforms:k}),getShaderSource:B}},su=(e,t,r,a,s,i,o=void 0,l=void 0)=>{let d=i+s.kvSequenceLength,p=s.nReps?s.nReps:1,m=s.vHiddenSize*p,g=e>1&&a,y=s.kvNumHeads?s.kvNumHeads:s.numHeads,_=g?[s.batchSize,y,d,s.headSize]:void 0,w=[s.batchSize,s.sequenceLength,m],b=12,S={x:Math.ceil(s.vHeadSize/b),y:Math.ceil(s.sequenceLength/b),z:s.batchSize*s.numHeads},v=[{type:12,data:s.sequenceLength},{type:12,data:d},{type:12,data:s.vHeadSize},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:12,data:m},{type:12,data:i},{type:12,data:s.kvSequenceLength},{type:12,data:p}],$=g&&a&&O.size(a.dims)>0,T=["type","type"];$&&T.push("type"),o&&T.push("type"),l&&T.push("type");let k=[{dims:w,dataType:t.dataType,gpuDataType:0}];g&&k.push({dims:_,dataType:t.dataType,gpuDataType:0});let C=E=>{let z=N("probs",t.dataType,t.dims),B=N("v",r.dataType,r.dims),W=[z,B];$&&W.push(N("past_value",a.dataType,a.dims));let G=o?N("seq_lens",o.dataType,o.dims):void 0;o&&W.push(G);let ee=l?N("total_sequence_length_input",l.dataType,l.dims):void 0;l&&W.push(ee);let ae=[j("output",t.dataType,w)];g&&ae.push(j("present_value",t.dataType,_));let Z=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${z.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${z.type.value}, ${b*b}>;
  ${E.registerUniforms(Z).declareVariables(...W,...ae)}
  ${E.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Cr(G,ee,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&g?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${g?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&g?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${g?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${a!==void 0};${e}`,inputDependencies:T},getRunData:()=>({outputs:k,dispatchGroup:S,programUniforms:v}),getShaderSource:C}},ur=(e,t,r,a,s,i,o,l,d,p,m=void 0,g=void 0)=>{let y=Math.min(e.outputCount,1+(o?1:0)+(l?1:0)),_=y>1?p.pastSequenceLength:0,w=_+p.kvSequenceLength,b=d&&O.size(d.dims)>0?d:void 0,S=[t,r];y>1&&o&&O.size(o.dims)>0&&S.push(o),b&&S.push(b),m&&S.push(m),g&&S.push(g);let v=e.compute(nu(y,t,r,o,b,p,_,m,g),{inputs:S,outputs:y>1?[-1,1]:[-1]})[0];e.compute(au(v,p.batchSize,p.numHeads,_,p.sequenceLength,w,m,g),{inputs:m&&g?[v,m,g]:[v],outputs:[]});let $=[v,a];y>1&&l&&O.size(l.dims)>0&&$.push(l),m&&$.push(m),g&&$.push(g),e.compute(su(y,v,a,l,p,_,m,g),{inputs:$,outputs:y>1?[0,2]:[0]})},ou=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],a=t.sequenceLength,s=t.inputHiddenSize,i=t.headSize,o=12,l={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:a},{type:12,data:s},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=g=>{let y=j("output_q",d[0].dataType,r),_=j("output_k",d[0].dataType,r),w=j("output_v",d[0].dataType,r),b=N("input",d[0].dataType,d[0].dims),S=N("weight",d[1].dataType,d[1].dims),v=N("bias",d[2].dataType,d[2].dims),$=b.type.storage,T=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${$}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${$}, ${o*o}>;
  var<workgroup> tileWeightK: array<${$}, ${o*o}>;
  var<workgroup> tileWeightV: array<${$}, ${o*o}>;
  ${g.registerUniforms(T).declareVariables(b,S,v,y,_,w)}
  ${g.mainStart([o,o,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:m},{inputs:d,outputs:[-1,-1,-1]})},jp=(e,t)=>{let r=iu(e.inputs,t),[a,s,i]=ou(e,r);return ur(e,a,s,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),uu,lu,du,Kp,hy=q(()=>{Qe(),Y(),oe(),Se(),ue(),uu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(a,s,i)=>{let o=s.length;if(o!==a.length)throw new Error(`${i}: num dimensions != ${o}`);s.forEach((l,d)=>{if(l!==a[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let a=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,a,"Invalid input scale"),r(e[2].dims,a,"Invalid input B"),r(e[3].dims,a,"Invalid input mean"),r(e[4].dims,a,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},lu=(e,t)=>{let{epsilon:r,spatial:a,format:s}=t,i=e[0].dims,o=a?xe(i[i.length-1]):1,l=s==="NHWC"&&i.length>1?o:1,d=O.size(i)/o,p=a,m=p?i.length:i,g=N("x",e[0].dataType,e[0].dims,o),y=N("scale",e[1].dataType,e[1].dims,l),_=N("bias",e[2].dataType,e[2].dims,l),w=N("inputMean",e[3].dataType,e[3].dims,l),b=N("inputVar",e[4].dataType,e[4].dims,l),S=j("y",e[0].dataType,m,o),v=()=>{let T="";if(a)T=`let cOffset = ${i.length===1?"0u":s==="NHWC"?`outputIndices[${i.length-1}] / ${o}`:"outputIndices[1]"};`;else if(s==="NCHW")T=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{T=`var cIndices = ${y.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let k=1;k<y.rank;k++)T+=`cIndices[${k}] = outputIndices[${k}];`;T+=`let cOffset = ${y.indicesToOffset("cIndices")};`}return T},$=T=>`
  const epsilon = ${r};
  ${T.registerUniform("outputSize","u32").declareVariables(g,y,_,w,b,S)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${o}`)};
    ${v()}
    let scale = ${y.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${w.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${g.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${a}_${o}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p?[{type:12,data:d},...Q(i)]:[{type:12,data:d}]})}},du=e=>_e(e),Kp=(e,t)=>{let{inputs:r,outputCount:a}=e,s=du({...t,outputCount:a});if(ve.webgpu.validateInputContent&&uu(r,s),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(lu(r,s))}}),pu,hu,Qp,cy=q(()=>{oe(),ue(),pu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},hu=e=>{let t=e[0].dims,r=e[0].dims[2],a=O.size(t)/4,s=e[0].dataType,i=N("input",s,t,4),o=N("bias",s,[r],4),l=N("residual",s,t,4),d=j("output",s,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(i,o,l,d)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let value = ${i.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Qp=e=>{pu(e.inputs),e.compute(hu(e.inputs))}}),cu,ce,Zp,Xp,Jp,Yp,eh,th,rh,ih,ah,fu,nh,sh,oh,uh,nr,lh,Mr,dh,ph,hh,ch,fh,mh,gh,yh,_h,wh,bh,$h,vh,xh,Sh,kh,Ai,Th,fa,ma,Ch,Ih,Eh,mu,gu,zh,Ua=q(()=>{Y(),oe(),Se(),ue(),cu=(e,t,r,a,s,i,o)=>{let l=Math.ceil(t/4),d="";typeof s=="string"?d=`${s}(a)`:d=s("a");let p=N("inputData",r,[l],4),m=j("outputData",a,[l],4),g=[{name:"vec_size",type:"u32"}];return o&&g.push(...o),`
      ${e.registerUniforms(g).declareVariables(p,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",d)}
  }`},ce=(e,t,r,a,s,i=e.dataType,o,l)=>{let d=[{type:12,data:Math.ceil(O.size(e.dims)/4)}];return o&&d.push(...o),{name:t,shaderCache:{hint:s,inputDependencies:["type"]},getShaderSource:p=>cu(p,O.size(e.dims),e.dataType,i,r,a,l),getRunData:p=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(O.size(p[0].dims)/64/4)},programUniforms:d})}},Zp=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},Xp=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},Jp=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},Yp=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},eh=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},th=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},rh=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},ih=e=>_e(e),ah=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},fu=e=>{let t,r,a=e.length>=2&&e[1].data!==0,s=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=a?e[1].getFloat32Array()[0]:-34028234663852886e22,r=s?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=a?e[1].getUint16Array()[0]:64511,r=s?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return _e({min:t,max:r})},nh=(e,t)=>{let r=t||fu(e.inputs),a=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",s=>`clamp(${s}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},sh=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},oh=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},uh=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},nr=e=>_e(e),lh=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",a=>`elu_vf32(${a})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Mr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,dh=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Mr(t)))},ph=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},hh=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},ch=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Mr(t)))},fh=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",a=>`select(leaky_relu_alpha_ * ${a}, ${a}, ${a} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},mh=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},gh=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},yh=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},_h=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},wh=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},bh=e=>_e(e),$h=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",a=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${a} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},vh=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},xh=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Sh=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},kh=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},Ai=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Th=e=>{e.compute(ce(e.inputs[0],"Tanh",Ai))},fa=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ai("v")};
}
`,ma=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Ch=e=>{let t=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",ma,fa(t),void 0,e.inputs[0].dataType))},Ih=(e,t)=>{let r=Ae(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",a=>`select(vec4<${r}>(0.0), ${a}, ${a} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Eh=e=>{e.compute(ce(e.inputs[0],"Log","log"))},mu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,gu=e=>`quick_gelu_impl(${e})`,zh=(e,t)=>{let r=Ae(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",gu,mu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),yu,_u,Ah,fy=q(()=>{oe(),ue(),Ua(),yu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},_u=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=N("input",e[0].dataType,e[0].dims,4),a=N("bias",e[0].dataType,[e[0].dims[2]],4),s=j("output",e[0].dataType,t,4),i=O.size(t)/4,o=Ie(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:l=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${l.declareVariables(r,a,s)}

  ${Mr(o)}

  ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ah=e=>{yu(e.inputs),e.compute(_u(e.inputs))}}),wu,bu,je,Oh,Rh,Bh,Nh,Mh,Dh,Ph,Uh,Wh,qh,my=q(()=>{Y(),oe(),ue(),wu=(e,t,r,a,s,i,o,l,d,p,m,g)=>{let y,_;typeof l=="string"?y=_=($,T)=>`${l}((${$}),(${T}))`:typeof l=="function"?y=_=l:(y=l.scalar,_=l.vector);let w=j("outputData",m,a.length,4),b=N("aData",d,t.length,4),S=N("bData",p,r.length,4),v;if(s)if(i){let $=O.size(t)===1,T=O.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;$||T?v=w.setByOffset("global_idx",_($?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),T?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):v=`
            let outputIndices = ${w.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",w)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",w)};
            ${w.setByOffset("global_idx",_(o||k?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||C?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=w.setByOffset("global_idx",_(b.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(T,k,C="")=>{let E=`aData[indexA${k}][componentA${k}]`,z=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${w.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${b.broadcastedIndicesToOffset(`outputIndices${k}`,w)};
            let offsetB${k} = ${S.broadcastedIndicesToOffset(`outputIndices${k}`,w)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${T}[${k}] = ${C}(${y(E,z)});
          `};m===9?v=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,S,w)}

        ${g??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},bu=(e,t,r,a,s,i,o=r.dataType)=>{let l=r.dims.map(b=>Number(b)??1),d=a.dims.map(b=>Number(b)??1),p=!O.areEqual(l,d),m=l,g=O.size(l),y=!1,_=!1,w=[p];if(p){let b=Ut.calcShape(l,d,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");m=b.slice(),g=O.size(m);let S=O.size(l)===1,v=O.size(d)===1,$=l.length>0&&l[l.length-1]%4===0,T=d.length>0&&d[d.length-1]%4===0;w.push(S),w.push(v),w.push($),w.push(T);let k=1;for(let C=1;C<m.length;C++){let E=l[l.length-C],z=d[d.length-C];if(E===z)k*=E;else break}k%4===0?(_=!0,y=!0):(S||v||$||T)&&(y=!0)}else y=!0;return w.push(y),{name:e,shaderCache:{hint:t+w.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>wu(b,l,d,m,y,p,_,s,r.dataType,a.dataType,o,i),getRunData:()=>({outputs:[{dims:m,dataType:o}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(O.size(m)/4)},...Q(l,d,m)]})}},je=(e,t,r,a,s,i)=>{e.compute(bu(t,s??"",e.inputs[0],e.inputs[1],r,a,i))},Oh=e=>{je(e,"Add",(t,r)=>`${t}+${r}`)},Rh=e=>{je(e,"Div",(t,r)=>`${t}/${r}`)},Bh=e=>{je(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Nh=e=>{je(e,"Mul",(t,r)=>`${t}*${r}`)},Mh=e=>{let t=N("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;je(e,"Pow",{scalar:(r,a)=>`pow_custom(${r},${a})`,vector:(r,a)=>`pow_vector_custom(${r},${a})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Dh=e=>{je(e,"Sub",(t,r)=>`${t}-${r}`)},Ph=e=>{je(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Uh=e=>{je(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Wh=e=>{je(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},qh=e=>{je(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),$u,vu,xu,Su,Vh,Lh,gy=q(()=>{Y(),oe(),Se(),ue(),$u=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,a=e[r],s=a.dataType,i=a.dims.length;e.forEach((o,l)=>{if(l!==r){if(o.dataType!==s)throw new Error("input tensors should be one type");if(o.dims.length!==i)throw new Error("input tensors should have the same shape");o.dims.forEach((d,p)=>{if(p!==t&&d!==a.dims[p])throw new Error("non concat dimensions must match")})}})},vu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,xu=(e,t)=>{let r=e.length,a=[];for(let s=0;s<r;++s){let i=t.setByOffset("global_idx",e[s].getByIndices("indices"));r===1?a.push(i):s===0?a.push(`if (inputIndex == ${s}u) { ${i} }`):s===r-1?a.push(`else { ${i} }`):a.push(`else if (inputIndex == ${s}) { ${i} }`)}return a.join(`
`)},Su=(e,t,r,a)=>{let s=O.size(r),i=new Array(e.length),o=new Array(e.length),l=0,d=[],p=[],m=[{type:12,data:s}];for(let b=0;b<e.length;++b)l+=e[b].dims[t],i[b]=l,p.push(e[b].dims.length),o[b]=N(`input${b}`,a,p[b]),d.push("rank"),m.push({type:12,data:i[b]});for(let b=0;b<e.length;++b)m.push(...Q(e[b].dims));m.push(...Q(r));let g=j("output",a,r.length),y=g.indicesGet("indices",t),_=Array.from(Array(i.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),w=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)b.registerUniform(`sizeInConcatAxis${S}`,"u32");return b.declareVariables(...o,g)})()}

  ${vu(i.length,_)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${g.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${y});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${_});
      ${y} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${xu(o,g)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:m}),getShaderSource:w}},Vh=(e,t)=>{let r=e.inputs,a=r[0].dims,s=O.normalizeAxis(t.axis,a.length);$u(r,s);let i=a.slice();i[s]=r.reduce((l,d)=>l+(d.dims.length>s?d.dims[s]:0),0);let o=r.filter(l=>O.size(l.dims)>0);e.compute(Su(o,s,i,r[0].dataType),{inputs:o})},Lh=e=>_e({axis:e.axis})}),It,Et,zt,Wa,Ot=q(()=>{Y(),oe(),It=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Et=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},zt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Wa=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,a]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:a}}else if(t==="Clip"){let[r,a]=(e==null?void 0:e.activation_params)||[wp,bp];return{activation:t,clipMax:a,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ee,Gh,qa=q(()=>{Ee=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Gh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Hh,yy=q(()=>{Hh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),or,Va,La=q(()=>{Y(),oe(),ue(),Ot(),or=(e,t,r,a,s)=>{let i=a-r;return`
      ${Array.from({length:r}).map((o,l)=>`
      if (${K(t.shape,l,t.rank)} != 1) {
        ${t.indicesSet(e,l,K(s,l+i,a))}
      } else {
        ${t.indicesSet(e,l,0)}
      }`).join("")}
`},Va=(e,t,r,a,s=!1,i)=>{let o=e[0].dims,l=e[1].dims,d=o[o.length-2],p=l[l.length-1],m=o[o.length-1],g=xe(p),y=xe(m),_=xe(d),w=O.size(r)/g/_,b=e.length>2,S=a?a.slice(0,-2):r.slice(0,-2),v=[O.size(S),d,p],$=[{type:12,data:w},{type:12,data:d},{type:12,data:p},{type:12,data:m}];Et(t,$),$.push(...Q(S,o,l)),b&&$.push(...Q(e[2].dims)),$.push(...Q(v));let T=k=>{let C=Ma("batch_dims",e[0].dataType,S.length),E=N("a",e[0].dataType,o.length,y),z=N("b",e[1].dataType,l.length,g),B=j("output",e[0].dataType,v.length,g),W=Ie(B.type.tensor),G=It(t,B.type.value,W),ee=[E,z],ae="";if(b){let J=s?g:1;ee.push(N("bias",e[2].dataType,e[2].dims.length,J)),ae=`${s?`value += bias[col / ${J}];`:`value += ${B.type.value}(bias[row + i]);`}`}let Z=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];zt(t,Z);let te=()=>{let J=`var a_data: ${E.type.value};`;for(let L=0;L<y;L++)J+=`
              let b_data${L} = b[(b_offset + (k + ${L}) * uniforms.N + col) / ${g}];`;for(let L=0;L<_;L++){J+=`a_data = a[(a_offset + (row + ${L}) * uniforms.K + k) / ${y}];`;for(let de=0;de<y;de++)J+=`
            values[${L}] = fma(${z.type.value}(a_data${y===1?"":`[${de}]`}), b_data${de}, values[${L}]);
`}return J};return`
  ${k.registerUniforms(Z).registerInternalVariables(C).declareVariables(...ee,B)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${g})) * ${g};
    var index1 = global_idx / (uniforms.N / ${g});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${E.type.indices};
    ${or("a_indices",E,E.rank-2,C.rank,"batch_indices")}
    ${E.indicesSet("a_indices",E.rank-2,0)}
    ${E.indicesSet("a_indices",E.rank-1,0)}
    let a_offset = ${E.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${or("b_indices",z,z.rank-2,C.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${B.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${y}) {
      ${te()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${ae}
      ${G}
      let cur_indices = ${B.type.indices}(batch, row + i, col);
      let offset = ${B.indicesToOffset("cur_indices")};
      ${B.setByOffset(`offset / ${g}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${g};${y};${_};${s}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:$}),getShaderSource:T}}}),ku,Tu,ga,Oi,Cu,ya,Iu,Lr,Ga=q(()=>{Y(),oe(),ue(),Ot(),La(),qa(),ku=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Tu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,ga=(e,t,r="f32",a,s=!1,i=32,o=!1,l=32)=>{let d=t[1]*e[1],p=t[0]*e[0],m=s?d:i,g=s?i:d,y=m/t[0],_=i/t[1];if(!((s&&y===4&&e[1]===4||!s&&(y===3||y===4))&&m%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${s} is true, innerElementSize ${y} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${r}>, ${m/y}>, ${g}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${y};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${o?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${ku(s,a)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${y===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Tu(s,y)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Oi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Cu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ya=(e,t,r="f32",a,s=!1,i=32,o=!1,l=32,d=!1)=>{let p=e[1]*t[1],m=e[0]*t[0],g=s?p:i,y=s?i:p;if(!(y%t[1]===0&&g%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${y} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${g} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let _=y/t[1],w=g/t[0],b=i/t[1],S=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${y}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${g}; inputCol = inputCol + ${t[0]}) {
          ${Oi(s,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${s?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${w};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${w}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Oi(s,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Cu(s)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${g}>, ${y}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${m}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Iu=(e,t,r,a,s=!1)=>{let[i,o,l,d]=a,p=Ie(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${or("aIndices",o,o.rank-2,i.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ee(e,p)} {
      var value = ${Ee(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${or("bIndices",l,l.rank-2,i.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ee(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${s?"bias[colIn]":`${Ee(e,p)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Lr=(e,t,r,a,s=!1,i)=>{let o=e[0].dims,l=e[1].dims,d=o.slice(0,-2),p=l.slice(0,-2),m=a?a.slice(0,-2):r.slice(0,-2),g=O.size(m),y=o[o.length-2],_=o[o.length-1],w=l[l.length-1],b=_%4===0&&w%4===0,S=y<=8?[4,1,1]:[4,4,1],v=[8,8,1],$=[Math.ceil(w/v[0]/S[0]),Math.ceil(y/v[1]/S[1]),Math.ceil(g/v[2]/S[2])],T=b?4:1,k=[...d,y,_/T],C=k.length,E=[...p,_,w/T],z=E.length,B=[g,y,w/T],W=[{type:6,data:y},{type:6,data:w},{type:6,data:_}];Et(t,W),W.push(...Q(m,k,E));let G=["rank","rank"],ee=e.length>2;ee&&(W.push(...Q(e[2].dims)),G.push("rank")),W.push(...Q(B));let ae=Z=>{let te=m.length,J=Ma("batchDims",e[0].dataType,te,1),L=Ie(e[0].dataType),de=N("a",e[0].dataType,C,T),me=N("b",e[1].dataType,z,T),F=j("result",e[0].dataType,B.length,T),ge=[de,me];if(ee){let D=s?T:1;ge.push(N("bias",e[2].dataType,e[2].dims.length,D))}let M=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];zt(t,M);let V=Ie(F.type.tensor),le=It(t,F.type.value,V),be=Iu(T,ee,le,[J,de,me,F],s);return`
  ${Z.registerUniforms(M).registerInternalVariables(J).declareVariables(...ge,F)}
  ${be}
  ${b?ga(S,v,L,J):ya(S,v,L,J)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${b};${s}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:W}),getShaderSource:ae}}}),Eu,Fh,_y=q(()=>{Y(),st(),ue(),Ot(),qa(),yy(),Ga(),Eu=(e,t,r,a,s=!1,i,o=4,l=4,d=4,p="f32")=>{let m=W=>{switch(W){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},g=W=>{switch(W){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${W} is not supported.`)}},y=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,w=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",v=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Ee(o,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${w} && xCol >= 0 && xCol < ${b}) {
      ${y}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(o)}
    }
    return resData;`,T=e?t&&a?`
    let col = colIn * ${o};
    ${$}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Ee(o,p)}(0.0);`:a&&r?`
    let col = colIn * ${o};
    ${$}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Ee(o,p)}(0.0);`,k=e?a&&r?g(l):`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g(l)}
    }
    return ${Ee(l,p)}(0.0);`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${g(l)}
    }
    return ${Ee(l,p)}(0.0);`,C=Ee(d,p),E=Ee(e?o:l,p),z=Ee(e?l:o,p),B=It(i,C,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?T:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?k:T}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${Gh(s)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Fh=(e,t,r,a,s,i,o,l,d)=>{let p=t.format==="NHWC",m=p?e[0].dims[3]:e[0].dims[1],g=r[0],y=p?r[2]:r[3],_=p?r[1]:r[2],w=p?r[3]:r[1],b=p&&(m%4===0||m%3===0)&&w%4===0,S=p?w:y*_,v=p?y*_:w,$=[8,8,1],T=a<=8?[4,1,1]:[4,4,1],k=[Math.ceil(S/$[0]/T[0]),Math.ceil(v/$[1]/T[1]),Math.ceil(g/$[2]/T[2])];pe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let C=b?p&&m%4!==0?3:4:1,E=$[1]*T[1],z=$[0]*T[0],B=Math.max($[0]*C,$[1]),W=a%E===0,G=s%z===0,ee=i%B===0,ae=b?[C,4,4]:[1,1,1],Z=[{type:6,data:a},{type:6,data:s},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Et(t,Z),Z.push(...Q(e[0].dims,e[1].dims));let te=["rank","rank"];o&&(Z.push(...Q(e[2].dims)),te.push("rank")),Z.push(...Q(r));let J=L=>{let de=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];zt(t,de);let me=b?4:1,F=Ie(e[0].dataType),ge=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${F}>`:F}) {
        result[flatIndex] = ${b?`vec4<${F}>`:F}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${F}>`:F}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,M=N("x",e[0].dataType,e[0].dims.length,C===3?1:C),V=N("w",e[1].dataType,e[1].dims.length,me),le=[M,V],be=j("result",e[0].dataType,r.length,me);if(o){let D=N("bias",e[2].dataType,e[2].dims.length,me);le.push(D),ge+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${F}>`:F} {
          return bias[coords.${p?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${Hh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${L.registerUniforms(de).declareVariables(...le,be)}
        ${ge}
        ${Eu(p,W,G,ee,o,t,ae[0],ae[1],ae[2],F)}
        ${b?ga(T,$,F,void 0,!p,B):ya(T,$,F,void 0,!p,B,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${b};${W};${G};${ee};${E};${z};${B}`,inputDependencies:te},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:Z}),getShaderSource:J}}}),zu,Ri,Xt,Au,Bi,Ou,jh,Kh,wy=q(()=>{Y(),st(),oe(),ue(),Ot(),qa(),zu=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Ri=e=>typeof e=="number"?[e,e,e]:e,Xt=(e,t)=>t<=1?e:e+(e-1)*(t-1),Au=(e,t,r,a=1)=>{let s=Xt(t,a);return Math.floor((e[0]*(r-1)-r+s)/2)},Bi=(e,t,r,a,s)=>{s==null&&(s=Au(e,t[0],a[0]));let i=[0,0,0,r];for(let o=0;o<3;o++)e[o]+2*s>=t[o]&&(i[o]=Math.trunc((e[o]-t[o]+2*s)/a[o]+1));return i},Ou=(e,t,r,a,s,i,o,l,d,p)=>{let m,g,y,_;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let w=Bi([t,r,a,1],[l,d,p],1,[s,i,o],e);g=w[0],y=w[1],_=w[2]}else if(Array.isArray(e)){if(!e.every((b,S,v)=>b===v[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let w=Bi([t,r,a,1],[l,d,p],1,[s,i,o],e[0]);g=w[0],y=w[1],_=w[2]}else if(e==="SAME_UPPER"){g=Math.ceil(t/s),y=Math.ceil(r/i),_=Math.ceil(a/o);let w=(g-1)*s+l-t,b=(y-1)*i+d-r,S=(_-1)*o+p-a,v=Math.floor(w/2),$=w-v,T=Math.floor(b/2),k=b-T,C=Math.floor(S/2),E=S-C;m={top:T,bottom:k,left:C,right:E,front:v,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:g,outHeight:y,outWidth:_}},jh=(e,t,r,a,s,i=!1,o="channelsLast")=>{let l,d,p,m,g;if(o==="channelsLast")[l,d,p,m,g]=e;else if(o==="channelsFirst")[l,g,d,p,m]=e;else throw new Error(`Unknown dataFormat ${o}`);let[y,,_,w,b]=t,[S,v,$]=Ri(r),[T,k,C]=Ri(a),E=Xt(_,T),z=Xt(w,k),B=Xt(b,C),{padInfo:W,outDepth:G,outHeight:ee,outWidth:ae}=Ou(s,d,p,m,S,v,$,E,z,B),Z=i?y*g:y,te=[0,0,0,0,0];return o==="channelsFirst"?te=[l,Z,G,ee,ae]:o==="channelsLast"&&(te=[l,G,ee,ae,Z]),{batchSize:l,dataFormat:o,inDepth:d,inHeight:p,inWidth:m,inChannels:g,outDepth:G,outHeight:ee,outWidth:ae,outChannels:Z,padInfo:W,strideDepth:S,strideHeight:v,strideWidth:$,filterDepth:_,filterHeight:w,filterWidth:b,effectiveFilterDepth:E,effectiveFilterHeight:z,effectiveFilterWidth:B,dilationDepth:T,dilationHeight:k,dilationWidth:C,inShape:e,outShape:te,filterShape:t}},Kh=(e,t,r,a,s,i)=>{let o=i==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let l=[64,1,1],d={x:r.map((S,v)=>v)},p=[Math.ceil(zu(d.x.map(S=>r[S]))/l[0]),1,1];pe("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${p}`);let m=1,g=O.size(r),y=[{type:12,data:g},{type:12,data:a},{type:12,data:s},{type:12,data:t.strides},{type:12,data:t.dilations}];Et(t,y),y.push(...Q(e[0].dims,e[1].dims));let _=["rank","rank"],w=e.length===3;w&&(y.push(...Q(e[2].dims)),_.push("rank")),y.push(...Q(r));let b=S=>{let v=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:s.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];zt(t,v);let $=1,T=Ie(e[0].dataType),k=N("x",e[0].dataType,e[0].dims.length,m),C=N("W",e[1].dataType,e[1].dims.length,$),E=[k,C],z=j("result",e[0].dataType,r.length,$),B="";if(w){let ee=N("bias",e[2].dataType,e[2].dims.length,$);E.push(ee),B+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${T} {
          return bias[${o?K("coords",4,5):K("coords",1,5)}];
        }`}let W=Ee(m,T),G=It(t,W,T);return`
            ${B}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${k.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
          ${S.registerUniforms(v).declareVariables(...E,z)}
          ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${z.offsetToIndices("global_idx")};
              let batch = ${K("coords",0,k.rank)};
              let d2 = ${o?K("coords",k.rank-1,k.rank):K("coords",1,k.rank)};
              let xFRCCorner = vec3<u32>(${o?K("coords",1,k.rank):K("coords",2,k.rank)},
              ${o?K("coords",2,k.rank):K("coords",3,k.rank)},
              ${o?K("coords",3,k.rank):K("coords",4,k.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?K("uniforms.x_shape",1,k.rank):K("uniforms.x_shape",2,k.rank)};
              let xShapeZ = ${o?K("uniforms.x_shape",2,k.rank):K("uniforms.x_shape",3,k.rank)};
              let xShapeW = ${o?K("uniforms.x_shape",3,k.rank):K("uniforms.x_shape",4,k.rank)};
              let xShapeU = ${o?K("uniforms.x_shape",4,k.rank):K("uniforms.x_shape",1,k.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${w?"value = value + getBiasByOutputCoords(coords)":""};
              ${G}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${m};${w}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:p[0],y:p[1],z:p[2]},programUniforms:y}),getShaderSource:b}}}),Qh,Zh,by=q(()=>{Y(),oe(),ue(),Ot(),Qh=(e,t,r,a)=>{let s=e.length>2,i=s?"value += b[output_channel];":"",o=e[0].dims,l=e[1].dims,d=t.format==="NHWC",p=d?r[3]:r[1],m=p/t.group,g=d&&m>=4?xe(p):1,y=O.size(r)/g,_=[{type:12,data:y},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];Et(t,_),_.push(...Q(o,[l[0],l[1],l[2],l[3]/g]));let w=s?["rank","rank","rank"]:["rank","rank"];_.push(...Q([r[0],r[1],r[2],r[3]/g]));let b=S=>{let v=j("output",e[0].dataType,r.length,g),$=Ie(v.type.tensor),T=It(t,v.type.value,$),k=N("x",e[0].dataType,o.length),C=N("w",e[1].dataType,l.length,g),E=[k,C];s&&E.push(N("b",e[2].dataType,e[2].dims,g));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];zt(t,z);let B=d?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(z).declareVariables(...E,v)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${g} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${B}
    ${i}
    ${T}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${g}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:b}},Zh=(e,t,r,a)=>{let s=e.length>2,i=xe(r[3]),o=xe(r[2]),l=O.size(r)/i/o,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],g=[{type:12,data:l},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Et(t,g),g.push(...Q(d,p,m));let y=(o-1)*t.strides[1]+p[1],_=w=>{let b=j("output",e[0].dataType,m.length,i),S=Ie(b.type.tensor),v=It(t,b.type.value,S),$=N("x",e[0].dataType,d.length,i),T=N("w",e[1].dataType,p.length,i),k=[$,T];s&&k.push(N("b",e[2].dataType,e[2].dims,i));let C=s?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return zt(t,E),`
  ${w.registerUniforms(E).declareVariables(...k,b)}
  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${y}>;
    var values: array<${b.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${y}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${T.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${C}
      ${v}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${o};${y};${p[0]};${p[1]}`,inputDependencies:s?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:_}}}),Ru,Ir,Bu,Er,_a,Ni,Nu,Mu,wa,$y=q(()=>{oe(),_y(),wy(),Ga(),by(),Ot(),La(),yt(),Ru=(e,t,r,a,s,i)=>{let o=e[0],l=e.slice(i?1:2,i?3:4),d=l.length,p=t[0],m=t.slice(2).map((y,_)=>y+(y-1)*(r[_]-1)),g=l.map((y,_)=>y+a[_]+a[_+d]).map((y,_)=>Math.floor((y-m[_]+s[_])/s[_]));return g.splice(0,0,o),g.splice(i?3:1,0,p),g},Ir=[2,3,1,0],Bu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[1]*t.group;if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Er=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let a=e.pads.slice();qr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,a,e.format==="NHWC",e.autoPad);let s=Object.assign({},e);return Object.assign(s,{kernelShape:r,pads:a}),s},_a=e=>{let t=Wa(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],s=e.dilations,i=e.group,o=e.kernel_shape,l=e.pads,d=e.strides,p=e.w_is_const();return{autoPad:a,format:r,dilations:s,group:i,kernelShape:o,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Ni=(e,t,r,a)=>{let s=r.format==="NHWC",i=Ru(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,s);if(r.group!==1){let E=[t[0]];if(s){let z=e.kernelCustomData.wT??e.compute(Pe(t[1],Ir),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),E.push(z)}else E.push(t[1]);t.length===3&&E.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&s&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Zh(E,r,i,a),{inputs:E}):e.compute(Qh(E,r,i,a),{inputs:E});return}let o=t.length===3,l=t[0].dims[s?1:2],d=t[0].dims[s?2:3],p=t[0].dims[s?3:1],m=t[1].dims[2],g=t[1].dims[3],y=i[s?1:2],_=i[s?2:3],w=i[s?3:1],b=s&&m===l&&g===d&&r.pads[0]===0&&r.pads[1]===0;if(b||m===1&&g===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let E=i[0],z,B,W,G=[];if(s){let Z=e.kernelCustomData.wT??e.compute(Pe(t[1],Ir),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=Z),b){let te=l*d*p;z=t[0].reshape([1,E,te]),B=Z.reshape([1,te,w]),W=[1,E,w]}else z=t[0].reshape([E,l*d,p]),B=Z.reshape([1,p,w]),W=[E,y*_,w];G.push(z),G.push(B)}else z=t[0].reshape([E,p,l*d]),B=t[1].reshape([1,w,p]),W=[E,w,y*_],G.push(B),G.push(z);o&&G.push(t[2]);let ee=W[2],ae=G[0].dims[G[0].dims.length-1];ee<8&&ae<8?e.compute(Va(G,r,i,W,s,a),{inputs:G}):e.compute(Lr(G,r,i,W,s,a),{inputs:G});return}let S=!0,v=e.kernelCustomData.wT??e.compute(Pe(t[1],Ir),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let $=[t[0],v];o&&$.push(t[2]);let T=s?y*_:w,k=s?w:y*_,C=m*g*p;e.compute(Fh($,r,i,T,k,C,o,S,a),{inputs:$})},Nu=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let s=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),o=[1].concat(t.dilations),l=[1].concat(t.kernelShape),d=Er({...t,pads:s,strides:i,dilations:o,kernelShape:l},a);Ni(e,a,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Mu=(e,t,r)=>{let a=r.format==="NHWC"?"channelsLast":"channelsFirst",s=Er(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,o=jh(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,a);e.compute(Kh(t,s,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],a))},wa=(e,t)=>{if(Bu(e.inputs,t),e.inputs[0].dims.length===3)Nu(e,t);else if(e.inputs[0].dims.length===5)Mu(e,e.inputs,t);else{let r=Er(t,e.inputs);Ni(e,e.inputs,r)}}}),Xh,vy=q(()=>{Y(),st(),oe(),ue(),Xh=(e,t,r)=>{let a=e.length>2,s=t.outputShape,i=t.format==="NHWC",o=t.group,l=e[1].dims,d=l[2]/o,p=l[3],m=i?xe(d):1,g=i?xe(p):1,y=i?p===1?m:g:1,_=O.size(s)/g,w=[Math.ceil(_/64),1,1];pe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let b=["rank","rank"],S=[t.strides[0],t.strides[1]],v=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],$=[t.dilations[0],t.dilations[1]],T=[v[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),v[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],k=[T[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),T[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],C=[{type:12,data:_},{type:12,data:S},{type:12,data:v},{type:12,data:$},{type:12,data:T},{type:6,data:k},{type:12,data:d},{type:12,data:p},...Q(e[0].dims,e[1].dims)];a&&(C.push(...Q(e[2].dims)),b.push("rank")),C.push(...Q(s));let E=z=>{let B=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:v.length},{name:"dilations",type:"u32",length:v.length},{name:"effective_filter_dims",type:"u32",length:T.length},{name:"pads",type:"i32",length:k.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],W=Ie(e[0].dataType),G=i?1:2,ee=i?2:3,ae=i?3:1,Z=N("W",e[1].dataType,e[1].dims.length,y),te=N("Dy",e[0].dataType,e[0].dims.length,m),J=[te,Z];a&&J.push(N("bias",e[2].dataType,[s[ae]].length,g));let L=j("result",e[0].dataType,s.length,g),de=()=>{let F="";if(m===1)F+=`
        let w_offset = ${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
        let wValue = ${Z.getByOffset(`w_offset / ${y}`)};
        dotProd = dotProd + xValue * wValue;`;else if(p===1)F+=`
          let wValue = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)} / ${y}`)};
          dotProd = dotProd + dot(xValue, wValue);`;else for(let ge=0;ge<m;ge++)F+=`
            let wValue${ge} = ${Z.getByOffset(`${Z.indicesToOffset(`${Z.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${ge}, wOutChannel)`)} / ${y}`)};
            dotProd = dotProd + xValue[${ge}] * wValue${ge};`;return F},me=`
            let outputIndices = ${L.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${L.indicesGet("outputIndices",0)};
            let d1 = ${L.indicesGet("outputIndices",ae)};
            let r = ${L.indicesGet("outputIndices",G)};
            let c = ${L.indicesGet("outputIndices",ee)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${L.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${W}(dyRCorner) + ${W}(wR)) / ${W}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${W}(uniforms.Dy_shape[${G}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }

              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${W}(dyCCorner) + ${W}(wC)) / ${W}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${W}(uniforms.Dy_shape[${ee}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ${m}) {
                  let xValue = ${i?te.getByOffset(`${te.indicesToOffset(`${te.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${m}`):te.get("batch","inputChannel","idyR","idyC")};
                  ${de()}
                  inputChannel = inputChannel + ${m};
                }
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${g}]`:""};
            ${L.setByOffset("global_idx","value")};
          `;return`
    ${z.registerUniforms(B).declareVariables(...J,L)}
      ${z.mainStart()}
      ${z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${me}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${m}${y}${g}${p===1}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:r?r(s):s,dataType:e[0].dataType}],programUniforms:C}),getShaderSource:E}}}),Du,Pu,Uu,Mi,Jh,Wu,Di,qu,Yh,xy=q(()=>{vy(),Ot(),yt(),Du=(e,t,r,a,s,i)=>(e-1)*t+r+(a-1)*s+1-i,Pu=(e,t,r,a,s)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[a]=i,r[s]=e-i):t==="SAME_LOWER"&&(r[a]=e-i,r[s]=i)},Uu=(e,t,r,a,s,i,o,l,d,p)=>{let m=e.length-2,g=p.length===0;d.length<m&&d.push(...Array(m-d.length).fill(0));let y=e[0],_=t[l?3:1]*s;for(let w=0,b=e.length-m-(l?1:0);w<m;++w,++b){let S=e[b],v=g?S*o[w]:p[w],$=Du(S,o[w],i[w],t[b],r[w],v);Pu($,a,i,w,w+m),g&&p.push(o[w]*(S-1)+d[w]+(t[b]-1)*r[w]+1-i[w]-i[w+m])}p.splice(0,0,y),p.splice(l?3:1,0,_)},Mi=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((g,y)=>g*y,1)===0){r.length=0;for(let g=2;g<t[1].dims.length;++g)r.push(t[1].dims[g])}let a=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(a?3:1,0,t[1].dims[1]);let s=e.pads.slice(),i=e.outputShape.slice(),o=e.outputPadding.slice(),l=t[0].dims,d=e.dilations.slice();if(d.reduce((g,y)=>g+y,0)===0){let g=t[0].dims.length-2;d=new Array(g).fill(1)}let p=e.strides.slice();if(p.reduce((g,y)=>g+y,0)===0){let g=t[0].dims.length-2;p=new Array(g).fill(1)}Uu(l,r,d,e.autoPad,e.group,s,p,a,o,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:s,outputPadding:o,outputShape:i,dilations:d,strides:p}),m},Jh=e=>{let t=Wa(e),r=e.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],s=e.dilations,i=e.group,o=e.kernelShape,l=e.pads,d=e.strides,p=e.wIsConst(),m=e.outputPadding,g=e.outputShape;return{autoPad:a,format:r,dilations:s,group:i,kernelShape:o,outputPadding:m,outputShape:g,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Wu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],a=e[1].dims[0];if(r!==a)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let s=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==s))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((o,l)=>o+l,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((o,l)=>o+l,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((o,l)=>o+l,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((o,l)=>o+l,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Di=(e,t,r,a)=>{let s=e.kernelCustomData.wT??e.compute(Pe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=s);let i=[t[0],s];t.length===3&&i.push(t[2]),e.compute(Xh(i,r,a),{inputs:i})},qu=(e,t)=>{let r=t.format==="NHWC",a=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&a.push(e.inputs[2]);let s=t.kernelShape;(s.length===0||s[0]===0)&&(s=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],o=[1].concat(o),i=[1].concat(i),s=[1].concat(s);let d=t.outputPadding;d=[0].concat(d);let p=Mi({...t,pads:l,strides:o,dilations:i,kernelShape:s,outputPadding:d},a);Di(e,a,p,m=>r?[m[0],m[2],m[3]]:[m[0],m[1],m[3]])},Yh=(e,t)=>{if(Wu(e.inputs,t),e.inputs[0].dims.length===3)qu(e,t);else{let r=Mi(t,e.inputs);Di(e,e.inputs,r)}}}),Vu,ec,tc,Sy=q(()=>{Y(),oe(),Se(),ue(),Vu=(e,t,r,a)=>{let s=O.size(t),i=t.length,o=N("input",e,i),l=j("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=O.normalizeAxis(d,i),m=g=>{let y=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,_=K("uniforms.input_shape","uniforms.axis",i),w=a.reverse?y+(a.exclusive?" + 1":""):"0",b=a.reverse?_:y+(a.exclusive?"":" + 1");return`
                ${g.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,l)}
                ${g.mainStart()}
                  ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${w};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:a.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},{type:12,data:p},...Q(t,t)]}),getShaderSource:m}},ec=(e,t)=>{let r=e.inputs[0].dims,a=e.inputs[0].dataType,s=e.inputs[1];e.compute(Vu(a,r,s,t),{inputs:[0]})},tc=e=>{let t=e.exclusive===1,r=e.reverse===1;return _e({exclusive:t,reverse:r})}}),Lu,Gu,Hu,rc,ic,ky=q(()=>{Y(),oe(),Se(),ue(),Lu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Gu=(e,t,r,a)=>{let s=[];s.push(`fn perm(i: ${a.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)s.push(r.indicesSet("a",e[i],`i[${i}]`));return s.push("return a;}"),s.join(`
`)},Hu=(e,t)=>{let r,a,s,i,o,l,d=t.format==="NHWC",p=t.blocksize,m=t.mode==="DCR";d?([r,a,s,i]=e.dims,o=m?[r,a,s,p,p,i/p**2]:[r,a,s,i/p**2,p,p],l=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,a,s,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=m?[r,p,p,i/p**2,a,s]:[r,i/p**2,p,p,a,s],l=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let g=e.reshape(o),y=g.dims.length,_=e.dataType,w=N("a",_,y),b=j("output",_,y),S=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(w,b)}

  ${Gu(l,y,w,b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let $=d?[r,a*p,s*p,i/p**2]:[r,i/p**2,a*p,s*p],T=O.size($),k=g.dims,C=O.sortBasedOnPerm(k,l);return{outputs:[{dims:$,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:[{type:12,data:T},...Q(k,C)]}},getShaderSource:S}},rc=(e,t)=>{Lu(e.inputs),e.compute(Hu(e.inputs[0],t))},ic=e=>_e({blocksize:e.blocksize,mode:e.mode,format:e.format})}),zr,Jt,Pi,Fu,ju,Ku,Qu,Ui,Zu,ac,nc,Ty=q(()=>{Y(),oe(),Se(),ue(),zr="[a-zA-Z]|\\.\\.\\.",Jt="("+zr+")+",Pi="^"+Jt+"$",Fu="("+Jt+",)*"+Jt,ju="^"+Fu+"$",Ku=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Qu=class{constructor(e,t){var s;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,a]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(ju)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,o)=>{let l=e[o].dims.slice();if(!i.match(RegExp(Pi)))throw new Error("Invalid LHS term");let d=this.processTerm(i,!0,l,o);this.lhs.push(d)}),a==="")a+=[...this.symbolToInfo.entries()].filter(([i,o])=>o.count===1||i==="...").map(([i])=>i).join("");else if(!a.match(RegExp(Jt)))throw new Error("Invalid RHS");(s=a.match(RegExp(zr,"g")))==null||s.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let o=this.symbolToInfo.get(i);if(o===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(o.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(e,t,r){let a=this.symbolToInfo.get(e);if(a!==void 0){if(a.dimValue!==t&&a.count!==1)throw new Error("Dimension mismatch");a.count++,a.inputIndices.push(r)}else a={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,a)}processTerm(e,t,r,a=-1){let s=r.length,i=!1,o=[],l=0;if(!e.match(RegExp(Pi))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(zr,"g")),p=new Ku(a);return d==null||d.forEach((m,g)=>{if(m==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let y=s-d.length+1;if(y<0)throw new Error("Ellipsis out of bounds");if(o=r.slice(l,l+y),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<o.length;_++){let w=String.fromCharCode(48+_);p.addSymbol(w,g+_),this.addSymbol(w,r[l++],a)}}else p.addSymbol(m,g+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(m,r[l++],a)}),p}},Ui=e=>e+"_max",Zu=(e,t,r,a)=>{let s=e.map(p=>p.length).map((p,m)=>N(`input${m}`,t,p)),i=O.size(a),o=j("output",t,a.length),l=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),d=p=>{let m=[],g="var prod = 1.0;",y="var sum = 0.0;",_="sum += prod;",w=[],b=[],S=[],v=[],$=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,C)=>{var E;if(r.rhs.symbolToIndices.has(C)){let z=(E=r.rhs.symbolToIndices.get(C))==null?void 0:E[0];z!==void 0&&r.lhs.forEach((B,W)=>{if(k.inputIndices.includes(W)){let G=B.symbolToIndices.get(C);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(ee=>{m.push(`${s[W].indicesSet(`input${W}Indices`,ee,o.indicesGet("outputIndices",z))}`)})}})}else r.lhs.forEach((z,B)=>{if(k.inputIndices.includes(B)){let W=z.symbolToIndices.get(C);if(W===void 0)throw new Error("Invalid symbol error");W.forEach(G=>{w.push(`${s[B].indicesSet(`input${B}Indices`,G,`${C}`)}`)}),v.push(`prod *= ${s[B].getByIndices(`input${B}Indices`)};`)}}),b.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${Ui(C)}; ${C}++) {`),S.push("}")});let T=$?[...m,`let sum = ${s.map((k,C)=>k.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...m,y,...b,...w,g,...v,_,...S];return`
            ${p.registerUniforms(l.map(k=>({name:`${Ui(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...s,o)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${s.map((k,C)=>`var input${C}Indices: ${s[C].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=l.filter(g=>r.symbolToInfo.has(g)).map(g=>{var y;return{type:12,data:((y=r.symbolToInfo.get(g))==null?void 0:y.dimValue)||0}});p.push({type:12,data:i});let m=e.map((g,y)=>[...Q(g)]).reduce((g,y)=>g.concat(y),p);return m.push(...Q(a)),{outputs:[{dims:a,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m}},getShaderSource:d}},ac=(e,t)=>{let r=new Qu(e.inputs,t.equation),a=r.outputDims,s=e.inputs.map((i,o)=>i.dims);e.compute(Zu(s,e.inputs[0].dataType,r,a))},nc=e=>{let t=e.equation.replace(/\s+/g,"");return _e({equation:t})}}),Xu,Wi,Ju,Yu,sc,Cy=q(()=>{Y(),oe(),ue(),Xu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=r.length<t.length?0:r.length-t.length,s=t.length<r.length?0:t.length-r.length;for(;a<r.length&&s<t.length;++a,++s)if(r[a]!==t[s]&&r[a]!==1&&t[s]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Wi=(e,t)=>{let r=e.length-t.length,a=[];for(let s=0;s<r;++s)a.push(e[s]);for(let s=0;s<t.length;++s)a.push(t[s]===1?e[s+r]:t[s]);return a},Ju=(e,t)=>e.length>t.length?Wi(e,t):Wi(t,e),Yu=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),a=Ju(t,r),s=e[0].dataType,i=s===9||O.size(t)===1,o=s===9||t.length>0&&t[t.length-1]%4===0?4:1,l=i||a.length>0&&a[a.length-1]%4===0?4:1,d=Math.ceil(O.size(a)/l),p=g=>{let y=N("input",s,t.length,o),_=j("output",s,a.length,l),w;if(s===9){let b=(S,v,$="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${y.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${S}[${v}] = ${$}(${y.getByOffset(`index${v}`)}[component${v}]);
        `;w=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else w=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${y.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${y.getByOffset(`inputOffset / ${o}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${g.registerUniform("vec_size","u32").declareVariables(y,_)}
    ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${w}`},m=[{type:12,data:d},...Q(t,a)];return{name:"Expand",shaderCache:{hint:`${a.length};${o}${l}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m})}},sc=e=>{Xu(e.inputs),e.compute(Yu(e.inputs),{inputs:[0]})}}),el,oc,Iy=q(()=>{Y(),oe(),ue(),Ua(),el=e=>{let t=e[0].dataType,r=O.size(e[0].dims),a=O.size(e[1].dims),s=a%4===0,i=o=>{let l=N("x",t,[1],4),d=N("bias",t,[1],4),p=j("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],g=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${d.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,y=s?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${g(0)}${g(1)}${g(2)}${g(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(m).declareVariables(l,d,p)}

    ${fa(Ae(t))}

    ${o.mainStart(Wt)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${y}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",ma("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:a}],dispatchGroup:{x:Math.ceil(r/Wt/4)}})}},oc=e=>{e.inputs.length<2||O.size(e.inputs[1].dims)===0?Ch(e):e.compute(el(e.inputs))}}),tl,rl,uc,lc,Ey=q(()=>{Y(),oe(),Se(),ue(),tl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},rl=(e,t)=>{let r=e[0].dims,a=e[1].dims,s=r.length,i=O.normalizeAxis(t.axis,s),o=r.slice(0);o.splice(i,1,...a);let l=r[i],d=e[0].dataType===9?4:1,p=Math.ceil(O.size(o)/d),m=[{type:12,data:p},{type:6,data:l},{type:12,data:i},...Q(e[0].dims,e[1].dims,o)],g=y=>{let _=N("data",e[0].dataType,e[0].dims.length,d),w=N("inputIndices",e[1].dataType,e[1].dims.length),b=j("output",e[0].dataType,o.length,d),S=$=>{let T=a.length,k=`var indicesIndices${$}  = ${w.type.indices}(0);`;for(let C=0;C<T;C++)k+=`${T>1?`indicesIndices${$}[${C}]`:`indicesIndices${$}`} = ${o.length>1?`outputIndices${$}[uniforms.axis + ${C}]`:`outputIndices${$}`};`;k+=`
          var idx${$} = ${w.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${_.type.indices};
        `;for(let C=0,E=0;C<s;C++)C===i?(k+=`${s>1?`dataIndices${$}[${C}]`:`dataIndices${$}`} = u32(idx${$});`,E+=T):(k+=`${s>1?`dataIndices${$}[${C}]`:`dataIndices${$}`} = ${o.length>1?`outputIndices${$}[${E}]`:`outputIndices${$}`};`,E++);return k},v;if(e[0].dataType===9){let $=(T,k,C="")=>`
          let outputIndices${k} = ${b.offsetToIndices(`outputOffset + ${k}u`)};
          ${S(k)};
          let offset${k} = ${_.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${T}[${k}] = ${C}(${_.getByOffset(`index${k}`)}[component${k}]);
        `;v=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${_.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,w,b)}
      ${y.mainStart()}
        ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:g}},uc=e=>_e({axis:e.axis}),lc=(e,t)=>{let r=e.inputs;tl(r),e.compute(rl(e.inputs,t))}}),il,dc,pc,zy=q(()=>{Y(),oe(),ue(),il=(e,t,r,a,s,i,o,l,d)=>{let p=[{type:12,data:i},{type:12,data:a},{type:12,data:s},{type:12,data:r},{type:12,data:o},{type:12,data:l},{type:12,data:d}],m=[i];p.push(...Q(t.dims,m));let g=y=>{let _=N("indices_data",t.dataType,t.dims.length),w=j("input_slice_offsets_data",12,1,1),b=[_,w],S=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:s.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${y.registerUniforms(S).declareVariables(...b)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${s.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${s.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:m,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:p}),getShaderSource:g},{inputs:[t],outputs:[-1]})[0]},dc=(e,t)=>{let r=e.inputs,a=r[0].dims,s=r[0].dataType,i=r[1].dims,o=i[i.length-1],l=O.sizeToDimension(i,i.length-1),d=O.sizeFromDimension(a,t.batchDims+o),p=O.sizeToDimension(a,t.batchDims),m=O.sizeFromDimension(a,t.batchDims),g=l/p,y=new Array(o),_=d;for(let k=0;k<o;++k)y[o-1-k]=_,_*=a[t.batchDims+o-1-k];let w=il(e,r[1],y,t.batchDims,a,l,g,m,o),b=t.batchDims+o;if(b>a.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let S=i.slice(0,-1).concat(a.slice(b)),v=O.size(S),$=[{type:12,data:v},{type:12,data:d},...Q(r[0].dims,w.dims,S)],T=k=>{let C=N("data",r[0].dataType,r[0].dims.length),E=N("slice_offsets",12,w.dims.length),z=j("output",r[0].dataType,S.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(C,E,z)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:s}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:$}),getShaderSource:T},{inputs:[r[0],w]})},pc=e=>({batchDims:e.batch_dims,cacheKey:""})}),al,nl,hc,cc,Ay=q(()=>{Y(),oe(),Se(),ue(),al=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=O.normalizeAxis(t.quantizeAxis,e[0].dims.length),a=t.blockSize,s=e[0],i=e[2],o=e.length===4?e[3]:void 0;if(i.dims.length!==s.dims.length||!s.dims.map((l,d)=>d===r?Math.ceil(l/a)===i.dims[d]:l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==s.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==i.dims.length||!o.dims.map((l,d)=>l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},nl=(e,t)=>{let r=e[0].dims,a=e[1].dims,s=r.length,i=O.normalizeAxis(t.gatherAxis,s),o=O.normalizeAxis(t.quantizeAxis,s),l=r.slice(0);l.splice(i,1,...a);let d=O.size(l),p=e[2].dataType,m=e[0].dataType===22,g=[{type:12,data:d},{type:12,data:o},{type:12,data:i},{type:12,data:t.blockSize},...Q(...e.map((_,w)=>_.dims),l)],y=_=>{let w=N("data",e[0].dataType,e[0].dims.length),b=N("inputIndices",e[1].dataType,e[1].dims.length),S=N("scales",e[2].dataType,e[2].dims.length),v=e.length>3?N("zeroPoint",e[3].dataType,e[3].dims.length):void 0,$=j("output",p,l.length),T=[w,b,S];v&&T.push(v);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(k).declareVariables(...T,$)}
        ${_.mainStart()}
        let output_indices = ${$.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${a.length>1?`
          for (var i: u32 = 0; i < ${a.length}; i++) {
            let index = ${$.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${$.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${w.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${$.indicesGet("output_indices","i")};
          ${w.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${w.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${$.indicesGet("output_indices",`i + ${a.length} - 1`)};
          ${w.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${w.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${w.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${S.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${S.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${S.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${m?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ae(p)}(quantized_data - zero_point) * scale;
        ${$.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,w)=>w!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,w)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:g}),getShaderSource:y}},hc=(e,t)=>{let r=e.inputs;al(r,t),e.compute(nl(e.inputs,t))},cc=e=>_e({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),sl,ol,fc,mc,Oy=q(()=>{Y(),oe(),Se(),ue(),sl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},ol=(e,t)=>{let r=e[0].dims,a=e[0].dataType,s=r.length,i=e[1].dims,o=e[1].dataType,l=O.normalizeAxis(t.axis,s),d=r[l],p=i.slice(0),m=O.size(p),g=N("input",a,s),y=N("indicesInput",o,i.length),_=j("output",a,p.length),w=[{type:12,data:m},{type:6,data:d},{type:12,data:l}];return w.push(...Q(r,i,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:w}),getShaderSource:b=>`
      ${b.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,y,_)}
      ${b.mainStart()}
      ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${y.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${g.type.indices}(outputIndices);
      ${g.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${g.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},fc=e=>_e({axis:e.axis}),mc=(e,t)=>{let r=e.inputs;sl(r),e.compute(ol(e.inputs,t))}}),ul,ll,gc,yc,Ry=q(()=>{Y(),oe(),ue(),ul=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},ll=(e,t)=>{let r=e[0].dims.slice(),a=e[1].dims.slice(),[s,i,o]=_p.getShapeOfGemmResult(r,t.transA,a,t.transB,e.length===3?e[2].dims:void 0),l=[s,i];if(!l)throw new Error("Can't use gemm on the given tensors");let d=16,p=Math.ceil(i/d),m=Math.ceil(s/d),g=!0,y=O.size(l),_=[{type:12,data:g?p:y},{type:12,data:s},{type:12,data:i},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],w=["type","type"];e.length===3&&(_.push(...Q(e[2].dims)),w.push("rank")),_.push(...Q(l));let b=v=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let T=t.alpha===1?"":"value *= uniforms.alpha;",k=N("a",e[0].dataType,e[0].dims),C=N("b",e[1].dataType,e[1].dims),E=k.type.value,z=null,B=[k,C];e.length===3&&(z=N("c",e[2].dataType,e[2].dims.length),B.push(z));let W=j("output",e[0].dataType,l.length);B.push(W);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(G).declareVariables(...B)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${T}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",W)}; value += ${E}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},S=v=>{let $=N("a",e[0].dataType,e[0].dims),T=N("b",e[1].dataType,e[1].dims),k=null,C=[$,T];e.length===3&&(k=N("c",e[2].dataType,e[2].dims.length),C.push(k));let E=j("output",e[0].dataType,l.length);C.push(E);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],B="",W="";t.transA&&t.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(W=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(W=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${T.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(z).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${T.type.storage}, ${d}>, ${d}>;
  ${v.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${W}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${B}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return g?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:p*m},programUniforms:_}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:b}},gc=e=>{let t=e.transA,r=e.transB,a=e.alpha,s=e.beta;return{transA:t,transB:r,alpha:a,beta:s,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},yc=(e,t)=>{ul(e.inputs),e.compute(ll(e.inputs,t))}}),Ye,nt,$t,vt,dl,pl,hl,cl,fl,ml,gl,yl,_c,wc,By=q(()=>{Y(),oe(),Se(),ue(),[Ye,nt,$t,vt]=[0,1,2,3],dl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},pl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,hl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,cl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,fl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,ml=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Ye}] = batch;
     indices[${nt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${$t}] = u32(r);
            indices[${vt}] = u32(c);
          }
        `;case"border":return`
          indices[${$t}] = u32(clamp(r, 0, H - 1));
          indices[${vt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${$t}] = gs_reflect(r, border[1], border[3]);
          indices[${vt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,gl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Ye}], indices[${nt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Ye}], indices[${nt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Ye}], indices[${nt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Ye}], indices[${nt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Ye}], indices[${nt}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Ye}], indices[${nt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,yl=(e,t)=>{let r=N("x",e[0].dataType,e[0].dims.length),a=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],s=N("grid",e[1].dataType,a.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Ye,nt,$t,vt]=[0,3,1,2]);let o=j("output",e[0].dataType,i.length),l=r.type.value,d=O.size(i),p=[{type:12,data:d},...Q(e[0].dims,a,i)],m=g=>`
  ${g.registerUniform("output_size","u32").declareVariables(r,s,o)}
  ${pl}
  ${hl(l)}
  ${cl(t)}
  ${fl(t)}
  ${ml(r,l,t)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${$t}]);
      let W_in = i32(uniforms.x_shape[${vt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Ye}], indices[${$t}], indices[${vt}]);
      let nxy = ${s.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${gl(o,l,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:g=>{let y=O.size(i);return{outputs:[{dims:i,dataType:g[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:p}},getShaderSource:m}},_c=(e,t)=>{dl(e.inputs),e.compute(yl(e.inputs,t))},wc=e=>_e({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Oe,_l,bc,qi,wl,sr,$c,vc=q(()=>{Y(),oe(),Se(),Na(),Pa(),ue(),yt(),Oe=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,_l=(e,t)=>{let r=e[0],a=Oe(e,1),s=Oe(e,2),i=Oe(e,3),o=Oe(e,4),l=Oe(e,5),d=Oe(e,6),p=Oe(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],g=r.dims[1],y=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=g,w=0,b=0,S=Math.floor(y/t.numHeads);if(d&&p&&O.size(d.dims)&&O.size(p.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==m||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');w=d.dims[2],b=d.dims[2]}else if(d&&O.size(d.dims)||p&&O.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(a&&O.size(a.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(a.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=a.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(i&&O.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(a&&a.dims.length===5&&a.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=w+_,T=0;if(o&&O.size(o.dims)>0){T=8;let z=o.dims;throw z.length===1?z[0]===m?T=1:z[0]===3*m+2&&(T=3):z.length===2&&z[0]===m&&z[1]===$&&(T=5),T===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,C=y;if(s&&O.size(s.dims)>0){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(_!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=s.dims[2]}else{if(_!==s.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=s.dims[1]*s.dims[3],k=!0}}let E=!1;if(o&&O.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(l&&O.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[2]!==g||l.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:g,pastSequenceLength:w,kvSequenceLength:_,totalSequenceLength:$,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:y,vHiddenSize:C,headSize:S,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:T,scale:t.scale,broadcastResPosBias:E,passPastInKv:k,qkvFormat:v}},bc=e=>_e({...e}),qi=_e({perm:[0,2,1,3]}),wl=(e,t,r,a,s,i,o)=>{let l=[a,s,i],d=O.size(l),p=[{type:12,data:d},{type:12,data:o},{type:12,data:i}],m=g=>{let y=j("qkv_with_bias",t.dataType,l),_=N("qkv",t.dataType,l),w=N("bias",r.dataType,l),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${g.registerUniforms(b).declareVariables(_,w,y)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},sr=(e,t,r,a,s,i,o,l)=>{let d=i;if(o&&O.size(o.dims)>0){if(a===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=wl(e,i,o,t,a,r*s,l),d=d.reshape([t,a,r,s]),r===1||a===1?d:e.compute(Pe(d,qi.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,a,r,s])),r===1||a===1?d:e.compute(Pe(d,qi.perm),{inputs:[d],outputs:[-1]})[0]},$c=(e,t)=>{let r=_l(e.inputs,t),a=e.inputs[0],s=Oe(e.inputs,1),i=Oe(e.inputs,2),o=Oe(e.inputs,3),l=Oe(e.inputs,4),d=Oe(e.inputs,5),p=Oe(e.inputs,6),m=Oe(e.inputs,7);if(a.dims.length===5)throw new Error("Packed QKV is not implemented");if((s==null?void 0:s.dims.length)===5)throw new Error("Packed KV is not implemented");let g=s&&i&&s.dims.length===4&&i.dims.length===4,y=sr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,a,o,0);if(g)return ur(e,y,s,i,l,void 0,p,m,d,r);if(!s||!i)throw new Error("key and value must be provided");let _=sr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,s,o,r.hiddenSize),w=sr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,o,2*r.hiddenSize);ur(e,y,_,w,l,void 0,p,m,d,r)}}),bl,$l,vl,xl,ba,xc,Sc,kc=q(()=>{Y(),oe(),Se(),ue(),bl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},$l=(e,t)=>{let r=[],a=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(s=>r.push(Number(s))),a=r.length),_e({numOutputs:a,axis:t.axis,splitSizes:r})},vl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${K("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,xl=e=>{let t=e.length,r=[];for(let a=0;a<t;++a){let s=e[a].setByIndices("indices","input[global_idx]");t===1?r.push(s):a===0?r.push(`if (output_number == ${a}u) { ${s} }`):a===t-1?r.push(`else { ${s} }`):r.push(`else if (output_number == ${a}) { ${s} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},ba=(e,t)=>{let r=e[0].dims,a=O.size(r),s=e[0].dataType,i=O.normalizeAxis(t.axis,r.length),o=new Array(t.numOutputs),l=N("input",s,r.length),d=new Array(t.numOutputs),p=[],m=[],g=0,y=[{type:12,data:a}];for(let w=0;w<t.numOutputs;w++){g+=t.splitSizes[w],d[w]=g;let b=r.slice();b[i]=t.splitSizes[w],m.push(b),o[w]=j(`output${w}`,s,b.length),p.push({dims:m[w],dataType:e[0].dataType})}y.push({type:12,data:d},...Q(r,...m));let _=w=>`
  ${w.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(l,...o)}
  ${vl(d.length)}
  ${xl(o)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${K("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${l.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:y})}},xc=(e,t)=>{bl(e.inputs);let r=e.inputs.length===1?t:$l(e.inputs,t);e.compute(ba(e.inputs,r),{inputs:[0]})},Sc=e=>{let t=e.axis,r=e.splitSizes,a=e.numOutputs<0?r.length:e.numOutputs;if(a!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return _e({axis:t,numOutputs:a,splitSizes:r})}}),Sl,kl,Vi,Tc,Ny=q(()=>{Se(),Pa(),vc(),kc(),yt(),Sl=(e,t)=>{if(t.doRotary)throw new Error("GroupQuerryAttention do_rotary attribute is not supported");if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],a=e[1],s=e[2],i=e[3],o=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,d=r.dims[0],p=r.dims[1],m=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],g=p,y=0,_=!a||a.dims.length===0,w=Math.floor(_?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);_&&(m=w*t.numHeads);let b=i&&i.dims.length!==0,S=o&&o.dims.length!==0;if(b&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===w)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=i.dims[2]}else if(b||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(a&&a.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(a.dims.length===3){if(r.dims[2]%a.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');g=a.dims[1]}else if(a.dims.length===5){if(a.dims[2]!==t.numHeads||a.dims[3]!==2||a.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');g=a.dims[1]}else{if(a.dims[1]!==t.numHeads||a.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=a.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let $=0,T=!1,k=t.kvNumHeads?w*t.kvNumHeads:m;if(s&&s.dims.length>0){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(g!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=s.dims[2]}else{if(g!==s.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=s.dims[1]*s.dims[3],T=!0}}let C=e.length>4?e[5]:void 0;if(C&&C.dims.length!==1&&C.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:p,pastSequenceLength:y,kvSequenceLength:g,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:m,vHiddenSize:k,headSize:w,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:T,qkvFormat:v}},kl=_e({perm:[0,2,1,3]}),Vi=(e,t,r)=>{let a=t,s=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(a=t.reshape([r.batchSize,r.kvSequenceLength,s,r.headSize]),a=e.compute(Pe(a,kl.perm),{inputs:[a],outputs:[-1]})[0]),a},Tc=(e,t)=>{var S;let r=Sl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((S=e.inputs[1])==null?void 0:S.dims.length)===5)throw new Error("Packed KV is not implemented");let a=e.inputs[0],s=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,l=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,g=_e({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,m*r.headSize,m*r.headSize]}),[y,_,w]=!s&&!i?e.compute(ba([a],g),{inputs:[a],outputs:[-1,-1,-1]}):[a,s,i],b=sr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,y,void 0,0);ur(e,b,Vi(e,_,r),Vi(e,w,r),void 0,void 0,o,l,void 0,r,d,p)}}),Li,Tl,Cl,Cc,My=q(()=>{Y(),oe(),yt(),ue(),Li=(e,t,r,a,s,i,o,l)=>{let d=xe(i),p=d===1?"f32":`vec${d}f`,m=d===1?"vec2f":`mat2x${d}f`,g=s*o,y=64;g===1&&(y=256);let _=[s,o,i/d],w=[s,o,2],b=["rank","type","type"],S=[];S.push(...Q(_,w));let v=$=>{let T=N("x",t.dataType,3,d),k=N("scale",r.dataType,r.dims),C=N("bias",a.dataType,a.dims),E=j("output",1,3,2),z=[T,k,C,E];return`
  var<workgroup> workgroup_shared : array<${m}, ${y}>;
  const workgroup_size = ${y}u;
  ${$.declareVariables(...z)}
  ${$.mainStart(y)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${T.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${m}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${gt("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${gt("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${l};${y}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:w,dataType:1}],dispatchGroup:{x:g},programUniforms:S}),getShaderSource:v},{inputs:[t,r,a],outputs:[-1]})[0]},Tl=(e,t,r)=>{let a=t[0].dims,s=a,i=2,o=a[0],l=a[1],d=O.sizeFromDimension(a,i),p=xe(d),m=O.size(s)/p,g=Li(e,t[0],t[1],t[2],o,d,l,r.epsilon),y=[o,l,d/p],_=[o,l],w=["type","none"],b=S=>{let v=N("x",t[0].dataType,y.length,p),$=N("scale_shift",1,_.length,2),T=j("output",t[0].dataType,y.length,p),k=[v,$,T];return`
  ${S.registerUniform("output_size","u32").declareVariables(...k)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${T.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${T.type.value}(scale_shift.x) + ${T.type.value}(scale_shift.y);
      ${T.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:w},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...Q(y,_,y)]}),getShaderSource:b},{inputs:[t[0],g]})},Cl=(e,t,r)=>{let a=t[0].dims,s=a,i=a[0],o=a[a.length-1],l=O.sizeFromDimension(a,1)/o,d=xe(o),p=O.size(s)/d,m=[{type:12,data:l},{type:12,data:Math.floor(o/d)}],g=["type","type"],y=!1,_=[0,a.length-1];for(let v=0;v<a.length-2;v++)y=y||a[v+1]!==1,_.push(v+1);y=y&&a[a.length-1]!==1;let w=y?e.compute(Pe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:a.length},(v,$)=>a[_[$]])),b=Li(e,w,t[1],t[2],i,l,o,r.epsilon),S=v=>{let $=Ie(t[0].dataType),T=d===1?"vec2f":`mat${d}x2f`,k=z=>{let B=z===0?"x":"y",W=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${$}(${W}(scale.${B}))`;case 2:return`vec2<${$}>(${W}(scale[0].${B}, scale[1].${B}))`;case 4:return`vec4<${$}>(${W}(scale[0].${B}, scale[1].${B}, scale[2].${B}, scale[3].${B}))`;default:throw new Error(`Not supported compoents ${d}`)}},C=N("input",t[0].dataType,t[0].dims,d),E=j("output",t[0].dataType,s,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${T}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:S},{inputs:[t[0],b]})},Cc=(e,t)=>{t.format==="NHWC"?Cl(e,e.inputs,t):Tl(e,e.inputs,t)}}),Il,El,Ic,Dy=q(()=>{Y(),oe(),ue(),Il=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},El=(e,t,r)=>{let a=t.simplified,s=e[0].dims,i=e[1],o=!a&&e[2],l=s,d=O.normalizeAxis(t.axis,s.length),p=O.sizeToDimension(s,d),m=O.sizeFromDimension(s,d),g=O.size(i.dims),y=o?O.size(o.dims):0;if(g!==m||o&&y!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${g} and bias size of ${y}`);let _=[];for(let C=0;C<s.length;++C)C<d?_.push(s[C]):_.push(1);let w=xe(m),b=["type","type"],S=[{type:12,data:p},{type:1,data:m},{type:12,data:Math.floor(m/w)},{type:1,data:t.epsilon}];o&&b.push("type");let v=r>1,$=r>2,T=C=>{let E=Ie(e[0].dataType),z=[N("x",e[0].dataType,e[0].dims,w),N("scale",i.dataType,i.dims,w)];o&&z.push(N("bias",o.dataType,o.dims,w)),z.push(j("output",e[0].dataType,l,w)),v&&z.push(j("mean_data_output",1,_)),$&&z.push(j("inv_std_output",1,_));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(B).declareVariables(...z)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${pa("f32",w)};
    var mean_square_vector = ${pa("f32",w)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Pt(E,w,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${gt("mean_vector",w)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${gt("mean_square_vector",w)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Pt(E,w,"x[j + offset]")};
      let f32scale = ${Pt(E,w,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${Pt(E,w,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:l,dataType:e[0].dataType}];return v&&k.push({dims:_,dataType:1}),$&&k.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${w};${r};${a}`,inputDependencies:b},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:T}},Ic=(e,t)=>{Il(e.inputs),e.compute(El(e.inputs,t,e.outputCount))}}),zl,Ec,Py=q(()=>{oe(),La(),Ga(),zl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Ec=e=>{zl(e.inputs);let t=Ut.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],a=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&a<8)e.compute(Va(e.inputs,{activation:""},t));else{let s=t[t.length-2],i=O.size(e.inputs[0].dims.slice(0,-2)),o=O.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&s===1&&o===1){let l=e.inputs[0].reshape([1,i,a]),d=e.inputs[1].reshape([1,a,r]),p=[1,i,r],m=[l,d];e.compute(Lr(m,{activation:""},t,p),{inputs:m})}else e.compute(Lr(e.inputs,{activation:""},t))}}}),Al,Ol,Rl,zc,Ac,Uy=q(()=>{Y(),oe(),Se(),ue(),Al=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],a=r.dims.length;if(r.dims[a-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let s=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,o=e[1];if(!O.areEqual(o.dims,[t.n,s,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=e[2].dims;if(O.size(l)!==t.n*s)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,p=t.bits>4?t.n*s:t.n*Math.floor((s+1)/2);if(O.size(d)!==p)throw new Error("zeroPoints input size error.")}},Ol=(e,t)=>{let r=e[0].dims,a=r.length,s=r[a-2],i=t.k,o=t.n,l=r.slice(0,a-2),d=O.size(l),p=e[1].dims[2]/4,m=e[0].dataType,g=xe(t.k),y=xe(p),_=xe(o),w=l.concat([s,o]),b=s>1&&o/_%2===0?2:1,S=O.size(w)/_/b,v=64,$=[],T=[d,s,i/g],k=O.convertShape(e[1].dims).slice();k.splice(-1,1,p/y),$.push(...Q(T)),$.push(...Q(k)),$.push(...Q(e[2].dims)),e.length===4&&$.push(...Q(O.convertShape(e[3].dims)));let C=[d,s,o/_];$.push(...Q(C));let E=z=>{let B=T.length,W=N("a",e[0].dataType,B,g),G=N("b",12,k.length,y),ee=N("scales",e[2].dataType,e[2].dims.length),ae=[W,G,ee],Z=e.length===4?N("zero_points",12,e[3].dims.length):void 0;Z&&ae.push(Z);let te=C.length,J=j("output",e[0].dataType,te,_),L=Ie(e[0].dataType),de=(()=>{switch(g){case 1:return`array<${L}, 8>`;case 2:return`mat4x2<${L}>`;case 4:return`mat2x4<${L}>`;default:throw new Error(`${g}-component is not supported.`)}})(),me=()=>{let M=`
          // reuse a data
            var input_offset = ${W.indicesToOffset(`${W.type.indices}(batch, row, word_offset)`)};
            var a_data: ${de};
            for (var j: u32 = 0; j < ${8/g}; j++) {
              a_data[j] = ${W.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let V=0;V<_*b;V++)M+=`
            b_value = ${y===1?`b${V}_data`:`b${V}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${de}(${Array.from({length:4},(le,be)=>`${L}(b_value_lower[${be}]), ${L}(b_value_upper[${be}])`).join(", ")});
            b_dequantized_values = ${g===1?`${de}(${Array.from({length:8},(le,be)=>`(b_quantized_values[${be}] - ${Z?`zero_point${V}`:"zero_point"}) * scale${V}`).join(", ")});`:`(b_quantized_values - ${de}(${Array(8).fill(`${Z?`zero_point${V}`:"zero_point"}`).join(",")})) * scale${V};`};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(V/_)}]${_>1?`[${V%_}]`:""} += ${Array.from({length:8/g},(le,be)=>`${g===1?`a_data[${be}] * b_dequantized_values[${be}]`:`dot(a_data[${be}], b_dequantized_values[${be}])`}`).join(" + ")};
          `;return M},F=()=>{let M=`
            var col_index = col * ${_};
            ${Z?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${L}(8);`}
            `;for(let V=0;V<_*b;V++)M+=`
            let scale${V} = ${ee.getByOffset("col_index * nBlocksPerCol + block")};
            ${Z?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Z.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${V} = ${L}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return M},ge=()=>{let M=`col_index = col * ${_};`;for(let V=0;V<_*b;V++)M+=`
            let b${V}_data = ${G.getByIndices(`${G.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return M+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${de};
            var b_dequantized_values: ${de};`,M};return`
        var<workgroup> workgroup_shared: array<${J.type.value}, ${b*v}>;
        ${z.declareVariables(...ae,J)}
        ${z.mainStart([v,1,1])}
          let output_indices = ${J.offsetToIndices(`(global_idx / ${v}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/g};
            ${F()}
            for (var word: u32 = 0; word < ${p}; word += ${y}) {
              ${ge()}
              for (var i: u32 = 0; i < ${y}; i++) {
                ${me()}
                word_offset += ${8/g};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${J.type.value} = ${J.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${J.setByIndices(`${J.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${g};${y};${_};${b};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:w,dataType:m}],dispatchGroup:{x:S},programUniforms:$}),getShaderSource:E}},Rl=(e,t)=>{let r=e[0].dims,a=r.length,s=r[a-2],i=t.k,o=t.n,l=r.slice(0,a-2),d=O.size(l),p=e[1].dims[2]/4,m=e[0].dataType,g=xe(t.k),y=xe(p),_=l.concat([s,o]),w=128,b=o%8===0?8:o%4===0?4:1,S=w/b,v=S*y*8,$=v/g,T=v/t.blockSize,k=O.size(_)/b,C=[],E=[d,s,i/g],z=O.convertShape(e[1].dims).slice();z.splice(-1,1,p/y),C.push(...Q(E)),C.push(...Q(z)),C.push(...Q(e[2].dims)),e.length===4&&C.push(...Q(O.convertShape(e[3].dims)));let B=[d,s,o];C.push(...Q(B));let W=G=>{let ee=E.length,ae=N("a",e[0].dataType,ee,g),Z=N("b",12,z.length,y),te=N("scales",e[2].dataType,e[2].dims.length),J=[ae,Z,te],L=e.length===4?N("zero_points",12,e[3].dims.length):void 0;L&&J.push(L);let de=B.length,me=j("output",e[0].dataType,de),F=Ie(e[0].dataType),ge=()=>{switch(g){case 1:return`
          let a_data0 = vec4<${F}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${F}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${F}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${F}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${g}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${ae.type.value}, ${$}>;
        var<workgroup> inter_results: array<array<${me.type.value}, ${S}>, ${b}>;
        ${G.declareVariables(...J,me)}
        ${G.mainStart([S,b,1])}
          let output_indices = ${me.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${$};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${$}; a_offset += ${w})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${ae.getByIndices(`${ae.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${ae.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${L?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${L.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${F}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${F}(8);`}
            let scale = ${te.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Z.getByIndices(`${Z.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/g};
            for (var i: u32 = 0; i < ${y}; i++) {
              ${ge()}
              let b_value = ${y===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${F}>(${Array.from({length:4},(M,V)=>`${F}(b_value_lower[${V}]), ${F}(b_value_upper[${V}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${F}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(M,V)=>`${`dot(a_data${V}, b_dequantized_values[${V}])`}`).join(" + ")};
              word_offset += ${8/g};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${me.type.value} = ${me.type.value}(0);
            for (var b = 0u; b < ${S}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${me.setByIndices(`${me.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${g};${y};${S};${b}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],dispatchGroup:{x:k},programUniforms:C}),getShaderSource:W}},zc=(e,t)=>{Al(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Rl(e.inputs,t)):e.compute(Ol(e.inputs,t))},Ac=e=>_e(e)}),Bl,Nl,Ml,Dl,Pl,Ul,Wl,ql,Oc,Wy=q(()=>{Y(),oe(),ue(),Bl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Nl=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
            k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${K("uniforms.x_shape",s,t)})) {
              break;
            }
            offset += k * i32(${K("uniforms.x_strides",s,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${a}
            value = x[offset];
          }
      `},Ml=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
                k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${K("uniforms.x_shape",s,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${K("uniforms.x_shape",s,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${K("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Dl=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
                k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${K("uniforms.x_shape",s,t)})) {
                  k = i32(${K("uniforms.x_shape",s,t)}) - 1;
                }
                offset += k * i32(${K("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Pl=(e,t,r)=>{let a="";for(let s=t-1;s>=0;--s)a+=`
                k = i32(${e.indicesGet("indices",s)}) - ${K("uniforms.pads",s,r)};
                if (k < 0)  {
                  k += i32(${K("uniforms.x_shape",s,t)}]);
                }
                if (k >= i32(${K("uniforms.x_shape",s,t)})) {
                  k -= i32(${K("uniforms.x_shape",s,t)});
                }
                offset += k * i32(${K("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${a}
              value = x[offset];
          `},Ul=(e,t,r)=>{switch(r.mode){case 0:return Nl(e,t,r.pads.length);case 1:return Ml(e,t,r.pads.length);case 2:return Dl(e,t,r.pads.length);case 3:return Pl(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Wl=(e,t)=>{let r=O.padShape(e[0].dims.slice(),t.pads),a=e[0].dims,s=O.size(r),i=[{type:12,data:s},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&i.push({type:o?e[2].dataType:1,data:t.value}),i.push(...Q(e[0].dims,r));let l=["rank"],d=p=>{let m=j("output",e[0].dataType,r.length),g=N("x",e[0].dataType,a.length),y=g.type.value,_=Ul(m,a.length,t),w=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&w.push({name:"constant_value",type:o?y:"f32"}),`
            ${p.registerUniforms(w).declareVariables(g,m)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${y}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(r)/64)},programUniforms:i}),getShaderSource:d}},ql=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),a=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,s=e[0].dims.length,i=new Int32Array(2*s).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let d=0;d<l.length;d++)i[Number(l[d])]=Number(r[d]),i[Number(l[d])+s]=Number(r[d+l.length])}else r.forEach((l,d)=>i[Number(d)]=Number(l));let o=[];return i.forEach(l=>o.push(l)),{mode:t.mode,value:a,pads:o}}else return t},Oc=(e,t)=>{Bl(e.inputs);let r=ql(e.inputs,t);e.compute(Wl(e.inputs,r),{inputs:[0]})}}),Yt,Gi,Hi,Fi,ji,Vl,Ll,Ki,Qi,Rc,Bc,Zi,Nc,Mc,Xi,Dc,Pc,Uc,Wc,qy=q(()=>{Qe(),Y(),oe(),ue(),Yt=e=>{if(ve.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Gi=(e,t,r)=>{let a=t.format==="NHWC",s=e.dims.slice();a&&s.splice(1,0,s.pop());let i=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),l=t.strides.slice(),d=i?t.dilations.slice():[],p=t.pads.slice();qr.adjustPoolAttributes(r,s,o,l,d,p);let m=qr.computePoolOutputShape(r,s,l,d,o,p,t.autoPad),g=Object.assign({},t);i?Object.assign(g,{kernelShape:o,strides:l,pads:p,dilations:d,cacheKey:t.cacheKey}):Object.assign(g,{kernelShape:o,strides:l,pads:p,cacheKey:t.cacheKey});let y=m.slice();return y.push(y.splice(1,1)[0]),[g,a?y:m]},Hi=(e,t)=>{let r=t.format==="NHWC",a=O.size(e),s=O.size(t.kernelShape),i=[{type:12,data:a},{type:12,data:s}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],g=!!(p+m);i.push({type:12,data:l},{type:12,data:d},{type:12,data:p},{type:12,data:m}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let y=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],w=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];y=!!(b+S),i.push({type:12,data:_},{type:12,data:w},{type:12,data:b},{type:12,data:S}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,o,!0,g,y]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=O.computeStrides(t.kernelShape);i.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((p,m)=>p+m);return[i,o,!!d,!1,!1]}},Fi=(e,t,r,a,s,i,o,l,d,p,m,g)=>{let y=s.format==="NHWC",_=t.type.value,w=j("output",t.type.tensor,a);if(s.kernelShape.length<=2){let b="",S="",v="",$=r-(y?2:1);if(m?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,s.kernelShape.length===2){let T=r-(y?3:2);g?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var value = ${_}(${l});
              var pad = 0;
              ${S}
              ${b}
              ${v}
              ${o}

              output[global_idx] = value;
            }`}else{if(y)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=s.kernelShape.length,S=s.pads.length,v="";return p?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(d).declareVariables(t,w)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${w.offsetToIndices("global_idx")};
              var xIndices = ${w.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${_}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${K("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${K("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${K("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${K("uniforms.pads","j - 2u",S)};
                  ${v}
              }
              ${o}

              output[global_idx] = value;
            }`}},ji=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Vl=e=>`${ji(e)};${e.countIncludePad}`,Ll=e=>`${ji(e)};${e.storageOrder};${e.dilations}`,Ki=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Qi=(e,t,r,a)=>{let[s,i]=Gi(t,a,r),o=N("x",t.dataType,t.dims.length),l=o.type.value,d="value += x_val;",p="";s.countIncludePad?p+=`value /= ${l}(uniforms.kernelSize);`:p+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[m,g,y,_,w]=Hi(i,s);m.push(...Q(t.dims,i));let b=["rank"];return{name:e,shaderCache:{hint:`${a.cacheKey};${y};${_};${w}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:m}),getShaderSource:S=>Fi(S,o,t.dims.length,i.length,s,d,p,0,g,y,_,w)}},Rc=e=>{let t=e.count_include_pad!==0,r=Ki(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let a={countIncludePad:t,...r,cacheKey:""};return{...a,cacheKey:Vl(a)}},Bc=(e,t)=>{Yt(e.inputs),e.compute(Qi("AveragePool",e.inputs[0],!1,t))},Zi={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Nc=e=>{let t=e.format;return{format:t,...Zi,cacheKey:t}},Mc=(e,t)=>{Yt(e.inputs),e.compute(Qi("GlobalAveragePool",e.inputs[0],!0,t))},Xi=(e,t,r,a)=>{let[s,i]=Gi(t,a,r),o=`
      value = max(x_val, value);
    `,l="",d=N("x",t.dataType,t.dims.length),p=["rank"],[m,g,y,_,w]=Hi(i,s);return m.push(...Q(t.dims,i)),{name:e,shaderCache:{hint:`${a.cacheKey};${y};${_};${w}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(O.size(i)/64)},programUniforms:m}),getShaderSource:b=>Fi(b,d,t.dims.length,i.length,s,o,l,t.dataType===10?-65504:-1e5,g,y,_,w)}},Dc=(e,t)=>{Yt(e.inputs),e.compute(Xi("MaxPool",e.inputs[0],!1,t))},Pc=e=>{let t=e.storage_order,r=e.dilations,a=Ki(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(a.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:t,dilations:r,...a,cacheKey:""};return{...s,cacheKey:Ll(s)}},Uc=e=>{let t=e.format;return{format:t,...Zi,cacheKey:t}},Wc=(e,t)=>{Yt(e.inputs),e.compute(Xi("GlobalMaxPool",e.inputs[0],!0,t))}}),Gl,Hl,qc,Vc,Vy=q(()=>{Y(),oe(),Se(),ue(),Gl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,a)=>r===e[2].dims[a]).reduce((r,a)=>r&&a,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((s,i)=>i===t.axis||s===e[0].dims[i]).reduce((s,i)=>s&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],a=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/a)||t.blockSize>Math.ceil(r/(a-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Hl=(e,t)=>{let r=O.normalizeAxis(t.axis,e[0].dims.length),a=e[0].dataType,s=a===3,i=e[0].dims,o=e[1].dataType,l=O.size(i),d=a===3||a===2,p=d?[Math.ceil(O.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,g=e.length>2?e[2]:void 0,y=g?d?[Math.ceil(O.size(g.dims)/4)]:g.dims:void 0,_=m.length===0||m.length===1&&m[0]===1,w=_===!1&&m.length===1,b=xe(l),S=_&&(!d||b===4),v=S?b:1,$=S&&!d?b:1,T=N("input",d?12:a,p.length,$),k=N("scale",o,m.length),C=g?N("zero_point",d?12:a,y.length):void 0,E=j("output",o,i.length,v),z=[T,k];C&&z.push(C);let B=[p,m];g&&B.push(y);let W=[{type:12,data:l/v},{type:12,data:r},{type:12,data:t.blockSize},...Q(...B,i)],G=ee=>{let ae=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${ee.registerUniforms(ae).declareVariables(...z,E)}
      ${ee.mainStart()}
          ${ee.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${T.getByOffset("global_idx / 4")};
            let x_vec = ${s?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${T.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${k.getByOffset("0")}`:w?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${C?_?d?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:w?d?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${s?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${d?s?"i32":"u32":T.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:Math.ceil(l/v/64),y:1,z:1},programUniforms:W})}},qc=(e,t)=>{Gl(e.inputs,t),e.compute(Hl(e.inputs,t))},Vc=e=>_e({axis:e.axis,blockSize:e.blockSize})}),Fl,jl,Lc,Ly=q(()=>{Qe(),Y(),ue(),Fl=(e,t,r)=>{let a=e===t,s=e<t&&r<0,i=e>t&&r>0;if(a||s||i)throw new Error("Range these inputs' contents are invalid.")},jl=(e,t,r,a)=>{let s=Math.abs(Math.ceil((t-e)/r)),i=[s],o=s,l=[{type:12,data:o},{type:a,data:e},{type:a,data:r},...Q(i)],d=p=>{let m=j("output",a,i.length),g=m.type.value,y=[{name:"outputSize",type:"u32"},{name:"start",type:g},{name:"delta",type:g}];return`
        ${p.registerUniforms(y).declareVariables(m)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${g}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${a}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:l})}},Lc=e=>{let t=0,r=0,a=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],a=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],a=e.inputs[2].getFloat32Array()[0]),ve.webgpu.validateInputContent&&Fl(t,r,a),e.compute(jl(t,r,a,e.inputs[0].dataType),{inputs:[]})}}),Kl,Ql,Gc,Hc,Gy=q(()=>{Y(),oe(),Se(),ue(),Kl=(e,t,r,a)=>{if(e!=="none"&&a!=="i32"&&a!=="u32"&&a!=="f32")throw new Error(`Input ${a} is not supported with reduction ${e}.`);let s=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,i=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return a==="i32"||a==="u32"?`atomicAdd(&${t}, bitcast<${a}>(${r}));`:`
              ${s}bitcast<${a}>(oldValue) + (${r})${i}`;case"max":return a==="i32"||a==="u32"?`atomicMax(&${t}, bitcast<${a}>(${r}));`:`
                ${s}max(bitcast<f32>(oldValue), (${r}))${i}`;case"min":return a==="i32"||a==="u32"?`atomicMin(&${t}, bitcast<${a}>(${r}));`:`${s}min(bitcast<${a}>(oldValue), (${r}))${i}`;case"mul":return`${s}(bitcast<${a}>(oldValue) * (${r}))${i}`;default:throw new Error(`Reduction ${e} is not supported.`)}},Ql=(e,t)=>{let r=e[0].dims,a=e[1].dims,s=r,i=1,o=Math.ceil(O.size(a)/i),l=a[a.length-1],d=O.sizeFromDimension(r,l),p=[{type:12,data:o},{type:12,data:l},{type:12,data:d},...Q(e[1].dims,e[2].dims,s)],m=g=>{let y=N("indices",e[1].dataType,e[1].dims.length),_=N("updates",e[2].dataType,e[2].dims.length,i),w=t.reduction!=="none"&&t.reduction!==""?$p("output",e[0].dataType,s.length):j("output",e[0].dataType,s.length,i);return`
      ${g.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(y,_,w)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    let n = ${O.size(a)};
    for (var i = 0; i < n; i = i + 1) {
      for (var j = i + 1; j < n; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    indices_start = 0u;
  }
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${Kl(t.reduction,"output[data_offset + i]","value",w.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:p}),getShaderSource:m}},Gc=e=>_e({reduction:e.reduction}),Hc=(e,t)=>{e.compute(Ql(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Zl,Xl,Jl,Ji,Yl,ed,td,rd,id,ad,nd,sd,Yi,od,ud,ld,dd,pd,Fc,jc,Hy=q(()=>{Y(),oe(),Se(),ue(),Zl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Xl=(e,t,r)=>{t.every(s=>s>=0&&s<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let a=new Array(r).fill(1);return t.forEach((s,i)=>a[s]=e[i]),a},Jl=(e,t,r,a,s,i)=>{let[o,l,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0){if(e[l].getFloat32Array().forEach(m=>a.push(m)),a.length!==0&&a.length!==p&&r>=18&&a.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Zl(a,t),t.axes.length>0&&Xl(a,t.axes,p).forEach((m,g)=>a[g]=m)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(m=>s.push(Number(m))),s.length!==0&&s.length!==p&&r>=18&&s.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(s.length!==0&&s.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof a<"u"&&typeof s<"u"&&a.length>0&&s.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},Ji=(e,t,r,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${a}(big / (${r}));
  let fract = ${a}(big % (${r})) / ${a}(${r});
  return whole + fract;
`,Yl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ji("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ji("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",ed=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",td=(e,t,r)=>{let a=new Array(r).fill(0).concat(new Array(r).fill(1)),s=e.length===0?a:e.slice();return t.length>0?(t.forEach((i,o)=>{a[i]=s[o],a[o+r]=s[t.length+o]}),a):s},rd=(e,t,r,a)=>{let s=[];if(r.length>0)if(a.length>0){if(e.forEach(i=>s.push(i)),Math.max(...a)>e.length)throw new Error("axes is out of bound");a.forEach((i,o)=>s[i]=r[o])}else r.forEach(i=>s.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");s=e.map((i,o)=>Math.round(i*t[o]))}return s},id=(e,t,r)=>{let a=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let s=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=a),r.axes.forEach(i=>s[i]=Math.round(e[i]*t[i]))):(t.fill(a,0,t.length),s.forEach((i,o)=>s[o]=Math.round(i*t[o]))),s},ad=(e,t,r,a,s)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${K("uniforms.scales","i",a)};
        var roi_low = ${K("uniforms.roi","i",s)};
        var roi_hi = ${K("uniforms.roi",`i + ${t.length}`,s)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${K("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,nd=(e,t,r,a,s,i,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${a.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${K("uniforms.scales","i",s)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${K("uniforms.roi","i",i)};
          var roi_hi = ${K("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${K("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${K("uniforms.output_shape","i",a.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,sd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${K("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Yi=(e,t,r,a)=>e.rank>a?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",od=(e,t,r,a,s)=>{let[i,o,l,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(col, ${r[l]} - 1))`)};
      ${Yi(e,d,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${o}];
      var col:${p} = originalIndices[${l}];
      ${a?`if (row < 0 || row > (${r[o]} - 1) || col < 0 || col > (${r[l]} - 1)) {
        return ${s};
      }`:""};
      row = max(0, min(row, ${r[o]} - 1));
      col = max(0, min(col, ${r[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${i}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},ud=(e,t,r,a,s,i,o,l,d,p)=>{let m=r.length===2,[g,y]=m?[0,1]:[2,3],_=e.type.value,w=b=>{let S=b===g?"row":"col";return`
      fn ${S}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${_} {
        var output_index = ${t.indicesGet("output_indices",b)};
        var originalIdx: ${_} = getOriginalCoordinateFromResizedCoordinate(output_index, ${s[b]},
        ${a[b]}, ${r[b]}, ${i[b]}, ${i[b]} + ${r.length});
        var fractOriginalIdx: ${_} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[b]} - 1))) {
          return ${d};
        }
        var data: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${S}: ${_} = originalIdx + ${_}(i);
          if (${S} < 0 || ${S} >= ${r[b]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${d};`:`${S} = max(0, min(${S}, ${r[b]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",b,`u32(${S})`)};
          data[i + 1] = ${b===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${w(g)};
    ${w(y)};
  fn getCubicInterpolationCoefs(s: ${_}) -> array<${_}, 4> {
    var absS = abs(s);
    var coeffs: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${_} = 1.0 - absS;
    var twoMinusAbsS: ${_} = 2.0 - absS;
    var onePlusAbsS: ${_} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${_}, 4>, coefs: array<${_}, 4>) -> ${_} {
    var coefsSum: ${_} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${_} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},ld=(e,t,r,a,s)=>{let[i,o,l,d,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(height, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${Yi(e,p,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${m} = originalIndices[${o}];
      var height:${m} = originalIndices[${l}];
      var width:${m} = originalIndices[${d}];
      ${a?`if (depth < 0 || depth > (${r[o]} - 1) || height < 0 || height > (${r[l]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${s};
        }`:""};

    depth = max(0, min(depth, ${r[o]} - 1));
      height = max(0, min(height, ${r[l]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${i}])`:"0"};

      var x111: ${m} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${m} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${m} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${m} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${m} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${m} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${m} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${m} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${m} = abs(depth - ${m}(depth1));
      var dx2: ${m} = abs(${m}(depth2) - depth);
      var dy1: ${m} = abs(height - ${m}(height1));
      var dy2: ${m} = abs(${m}(height2) - height);
      var dz1: ${m} = abs(width - ${m}(width1));
      var dz2: ${m} = abs(${m}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},dd=(e,t,r,a,s,i)=>{let o=e.dims,l=td(i,t.axes,o.length),d=rd(o,a,s,t.axes),p=a.slice();a.length===0&&(p=o.map(($,T)=>$===0?1:d[T]/$),t.keepAspectRatioPolicy!=="stretch"&&(d=id(o,p,t)));let m=j("output",e.dataType,d.length),g=N("input",e.dataType,o.length),y=O.size(d),_=o.length===d.length&&o.every(($,T)=>$===d[T]),w=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,S=g.type.value,v=$=>`
      ${_?"":`
      ${Yl(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${sd(g,o)};
              ${ed(t.nearestMode,r,S)};
              ${nd(g,m,o,d,p.length,l.length,w)};
              `;case"linear":return`
              ${ad(m,o,d,p.length,l.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${od(g,m,o,w,b)}`;if(o.length===3||o.length===5)return`${ld(g,m,o,w,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${ud(g,m,o,d,p,l,t.cubicCoeffA,w,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",l.length).declareVariables(g,m)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${g.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${g.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${s.length>0?s:""}|${l.length>0?l:""}|${_}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},{type:1,data:p},{type:1,data:l},...Q(o,d)]})}},pd=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Fc=(e,t)=>{let r=[],a=[],s=[],i=pd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Jl(e.inputs,t,i,r,a,s),e.compute(dd(e.inputs[0],t,i,r,a,s),{inputs:[0]})},jc=e=>{let t=e.antialias,r=e.axes,a=e.coordinateTransformMode,s=e.cubicCoeffA,i=e.excludeOutside!==0,o=e.extrapolationValue,l=e.keepAspectRatioPolicy,d=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return _e({antialias:t,axes:r,coordinateTransformMode:a,cubicCoeffA:s,excludeOutside:i,extrapolationValue:o,keepAspectRatioPolicy:l,mode:d,nearestMode:p})}}),hd,cd,Kc,Fy=q(()=>{Y(),oe(),Se(),ue(),hd=(e,t)=>{let[r,a,s,i]=e,{numHeads:o,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!O.areEqual(a.dims,[])&&!O.areEqual(a.dims,[1])&&a.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!O.areEqual(s.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],p=r.dims[r.dims.length-2],m=s.dims[0],g=O.sizeFromDimension(r.dims,1)/p,y=l===0?s.dims[1]*2:g/o;if(l>y)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(a.dims.length===2){if(d!==a.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(p!==a.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(y/2!==s.dims[1]&&l/2!==s.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${s.dims[1]}`);if(p>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},cd=(e,t)=>{let{interleaved:r,numHeads:a,rotaryEmbeddingDim:s,scale:i}=t,o=e[0].dims[0],l=O.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],p=l/d,m=e[2].dims[1],g=s===0?m*2:p/a,y=new Array(o,d,p/g,g-m),_=O.computeStrides(y),w=[{type:1,data:i},{type:12,data:y},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[l,p,g,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,g,d*g,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=S=>{let v=N("input",e[0].dataType,e[0].dims.length),$=N("position_ids",e[1].dataType,e[1].dims.length),T=N("cos_cache",e[2].dataType,e[2].dims.length),k=N("sin_cache",e[3].dataType,e[3].dims.length),C=j("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:y.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${S.declareVariables(v,$,T,k,C)}

        ${S.mainStart(Wt)}
          let half_rotary_emb_dim = uniforms.${T.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",j("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:_e({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(O.size(y)/Wt)},programUniforms:w})}},Kc=(e,t)=>{hd(e.inputs,t),e.compute(cd(e.inputs,t))}}),fd,md,Qc,jy=q(()=>{Y(),oe(),ue(),fd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],a=e[2];if(t.dataType!==r.dataType||t.dataType!==a.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let s=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==s)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(a.dims.length!==1)throw new Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==s)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==s)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==s)throw new Error("Bias must have the same hidden size as input")}},md=(e,t,r,a)=>{let s=t.simplified,i=e[0].dims,o=O.size(i),l=i,d=o,p=i.slice(-1)[0],m=a?i.slice(0,-1).concat(1):[],g=!s&&e.length>3,y=e.length>4,_=a&&r>1,w=a&&r>2,b=r>3,S=64,v=xe(p),$=[{type:12,data:d},{type:12,data:v},{type:12,data:p},{type:1,data:t.epsilon}],T=C=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[N("x",e[0].dataType,e[0].dims,v),N("skip",e[1].dataType,e[1].dims,v),N("gamma",e[2].dataType,e[2].dims,v)];g&&z.push(N("beta",e[3].dataType,e[3].dims,v)),y&&z.push(N("bias",e[4].dataType,e[4].dims,v)),z.push(j("output",e[0].dataType,l,v)),_&&z.push(j("mean_output",1,m)),w&&z.push(j("inv_std_output",1,m)),b&&z.push(j("input_skip_bias_sum",e[0].dataType,l,v));let B=Ie(e[0].dataType),W=Ie(1,v);return`

      ${C.registerUniforms(E).declareVariables(...z)}
      var<workgroup> sum_shared : array<${W}, ${S}>;
      var<workgroup> sum_squared_shared : array<${W}, ${S}>;

      ${C.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${y?"bias[offset1d + i]":B+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Pt(B,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${gt("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${gt("square_sum",v)} / f32(uniforms.hidden_size) ${s?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${w?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${s?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${g?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:l,dataType:e[0].dataType}];return r>1&&k.push({dims:m,dataType:1}),r>2&&k.push({dims:m,dataType:1}),r>3&&k.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${w};${b}`,inputDependencies:e.map((C,E)=>"type")},getShaderSource:T,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/p)},programUniforms:$})}},Qc=(e,t)=>{fd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(md(e.inputs,t,e.outputCount,!1),{outputs:r})}}),gd,er,yd,ea,_d,wd,Zc,Xc,Ky=q(()=>{Y(),oe(),Se(),ue(),gd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,a)=>{if(e[a+1].dataType!==6&&e[a+1].dataType!==7)throw new Error(`Input ${a} must be an array of int32 or int64`)})},er=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(a=>r.push(Number(a)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(a=>r.push(Number(a)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},yd=(e,t)=>{if(e.length>1){let r=er(e,1),a=er(e,2),s=er(e,3);return s.length===0&&(s=[...Array(e[0].dims.length).keys()]),_e({starts:r,ends:a,axes:s})}else return t},ea=(e,t,r,a,s)=>{let i=e;return e<0&&(i+=r[a[t]]),s[t]<0?Math.max(0,Math.min(i,r[a[t]]-1)):Math.max(0,Math.min(i,r[a[t]]))},_d=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${K("uniforms.input_shape","i",r.length)};
            let steps_i = ${K("uniforms.steps","i",r.length)};
            let signs_i = ${K("uniforms.signs","i",r.length)};
            let starts_i = ${K("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,wd=(e,t)=>{let r=e[0].dims,a=O.size(r),s=t.axes.length>0?O.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=er(e,4);i.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(s.length).fill(1));let o=t.starts.map((v,$)=>ea(v,$,r,s,i)),l=t.ends.map((v,$)=>ea(v,$,r,s,i));if(s.length!==o.length||s.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(s.length!==r.length)for(let v=0;v<r.length;++v)s.includes(v)||(o.splice(v,0,0),l.splice(v,0,r[v]),i.splice(v,0,1));let d=i.map(v=>Math.sign(v));i.forEach((v,$,T)=>{if(v<0){let k=(l[$]-o[$])/v,C=o[$],E=C+k*i[$];o[$]=E,l[$]=C,T[$]=-v}});let p=r.slice(0);s.forEach((v,$)=>{p[v]=Math.ceil((l[v]-o[v])/i[v])});let m={dims:p,dataType:e[0].dataType},g=j("output",e[0].dataType,p.length),y=N("input",e[0].dataType,e[0].dims.length),_=O.size(p),w=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],b=[{type:12,data:_},{type:12,data:o},{type:6,data:d},{type:12,data:i},...Q(e[0].dims,p)],S=v=>`
      ${v.registerUniforms(w).declareVariables(y,g)}
        ${_d(y,g,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${g.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${g.setByOffset("global_idx",y.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${o.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:b})}},Zc=(e,t)=>{gd(e.inputs,t);let r=yd(e.inputs,t);e.compute(wd(e.inputs,r),{inputs:[0]})},Xc=e=>{let t=e.starts,r=e.ends,a=e.axes;return _e({starts:t,ends:r,axes:a})}}),bd,$d,Jc,Yc,Qy=q(()=>{Y(),oe(),Se(),yt(),ue(),bd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},$d=(e,t)=>{let r=e.inputs[0],a=r.dims,s=O.size(a),i=a.length,o=O.normalizeAxis(t.axis,i),l=o<a.length-1,d,p=[];l?(p=Array.from({length:i},(z,B)=>B),p[o]=i-1,p[i-1]=o,d=e.compute(Pe(r,p),{inputs:[r],outputs:[-1]})[0]):d=r;let m=d.dims,g=m[i-1],y=s/g,_=xe(g),w=g/_,b=64;y===1&&(b=256);let S=(z,B)=>B===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:B===2?`max(${z}.x, ${z}.y)`:B===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,v=N("x",d.dataType,d.dims,_),$=j("result",d.dataType,d.dims,_),T=v.type.value,k=Ie(d.dataType)==="f32"?`var threadMax = ${T}(-3.402823e+38f);`:`var threadMax = ${T}(-65504.0h);`,C=z=>`
      var<workgroup> rowMaxShared : ${T};
      var<workgroup> rowSumShared : ${T};
      var<workgroup> threadShared : array<${T}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${T} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${T}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables(v,$)}
      ${z.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${T}(${S("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${T}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${T}(${gt("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=e.compute({name:"Softmax",shaderCache:{hint:`${_};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:d.dataType}],dispatchGroup:{x:y},programUniforms:[{type:6,data:w}]}),getShaderSource:C},{inputs:[d],outputs:[l?-1:0]})[0];l&&e.compute(Pe(E,p),{inputs:[E]})},Jc=(e,t)=>{bd(e.inputs),$d(e,t)},Yc=e=>_e({axis:e.axis})}),ta,vd,xd,Sd,ef,Zy=q(()=>{Y(),oe(),ue(),ta=e=>Array.from(e.getBigInt64Array(),Number),vd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ta(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},xd=(e,t)=>{let r=[];for(let a=0;a<e.length;++a)r.push(e[a]*t[a]);return r},Sd=(e,t)=>{let r=e[0].dims,a=t??ta(e[1]),s=xd(r,a),i=O.size(s),o=e[0].dataType,l=N("input",o,r.length),d=j("output",o,s.length),p=m=>`
      const inputShape = ${l.indices(...r)};
      ${m.registerUniform("output_size","u32").declareVariables(l,d)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${a}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...Q(e[0].dims,s)]}),getShaderSource:p}},ef=e=>{vd(e.inputs),e.compute(Sd(e.inputs),{inputs:[0]})}}),kd,Td,tf,Xy=q(()=>{Y(),oe(),ue(),kd=(e,t,r,a,s)=>{let i=j("output_data",s,r.length,4),o=N("a_data",t[1].dataType,t[1].dims.length,4),l=N("b_data",t[2].dataType,t[2].dims.length,4),d=N("c_data",t[0].dataType,t[0].dims.length,4),p,m=(g,y,_)=>`select(${y}, ${g}, ${_})`;if(!a)p=i.setByOffset("global_idx",m(o.getByOffset("global_idx"),l.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let g=(y,_,w="")=>{let b=`a_data[index_a${_}][component_a${_}]`,S=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${i.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${o.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_b${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let offset_c${_} = ${d.broadcastedIndicesToOffset(`output_indices${_}`,i)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${y}[${_}] = ${w}(${m(b,S,v)});
          `};s===9?p=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${g("output_data[global_idx]",0)}
            ${g("output_data[global_idx]",1)}
            ${g("output_data[global_idx]",2)}
            ${g("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,o,l,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Td=e=>{let t=e[1].dims,r=e[2].dims,a=e[0].dims,s=e[1].dataType,i=!(O.areEqual(t,r)&&O.areEqual(r,a)),o=t,l=O.size(t);if(i){let p=Ut.calcShape(Ut.calcShape(t,r,!1),a,!1);if(!p)throw new Error("Can't perform where op on the given tensors");o=p,l=O.size(o)}let d=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>kd(p,e,o,i,s),getRunData:()=>({outputs:[{dims:o,dataType:s}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:d},...Q(a,t,r,o)]})}},tf=e=>{e.compute(Td(e.inputs))}}),rf,Jy=q(()=>{py(),Pa(),hy(),cy(),fy(),my(),gy(),$y(),xy(),Sy(),ky(),Ty(),Cy(),Iy(),Ey(),zy(),Ay(),Oy(),Ry(),By(),Ny(),My(),Dy(),Py(),Uy(),vc(),Wy(),qy(),Vy(),Ly(),Gy(),Da(),Hy(),Fy(),jy(),Ky(),Qy(),kc(),Zy(),yt(),Ua(),Xy(),rf=new Map([["Abs",[Zp]],["Acos",[Xp]],["Acosh",[Jp]],["Add",[Oh]],["ArgMax",[Fp,ca]],["ArgMin",[Hp,ca]],["Asin",[Yp]],["Asinh",[eh]],["Atan",[th]],["Atanh",[rh]],["Attention",[jp]],["AveragePool",[Bc,Rc]],["BatchNormalization",[Kp]],["BiasAdd",[Qp]],["BiasSplitGelu",[Ah]],["Cast",[ah,ih]],["Ceil",[sh]],["Clip",[nh]],["Concat",[Vh,Lh]],["Conv",[wa,_a]],["ConvTranspose",[Yh,Jh]],["Cos",[oh]],["Cosh",[uh]],["CumSum",[ec,tc]],["DepthToSpace",[rc,ic]],["DequantizeLinear",[qc,Vc]],["Div",[Rh]],["Einsum",[ac,nc]],["Elu",[lh,nr]],["Equal",[Bh]],["Erf",[dh]],["Exp",[ph]],["Expand",[sc]],["FastGelu",[oc]],["Floor",[hh]],["FusedConv",[wa,_a]],["Gather",[lc,uc]],["GatherElements",[mc,fc]],["GatherBlockQuantized",[hc,cc]],["GatherND",[dc,pc]],["Gelu",[ch]],["Gemm",[yc,gc]],["GlobalAveragePool",[Mc,Nc]],["GlobalMaxPool",[Wc,Uc]],["Greater",[Ph]],["GreaterOrEqual",[Wh]],["GridSample",[_c,wc]],["GroupQueryAttention",[Tc]],["HardSigmoid",[$h,bh]],["InstanceNormalization",[Cc]],["LayerNormalization",[Ic]],["LeakyRelu",[fh,nr]],["Less",[Uh]],["LessOrEqual",[qh]],["Log",[Eh]],["MatMul",[Ec]],["MatMulNBits",[zc,Ac]],["MaxPool",[Dc,Pc]],["Mul",[Nh]],["MultiHeadAttention",[$c,bc]],["Neg",[gh]],["Not",[mh]],["Pad",[Oc]],["Pow",[Mh]],["QuickGelu",[zh,nr]],["Range",[Lc]],["Reciprocal",[yh]],["ReduceMin",[Wp]],["ReduceMean",[Np]],["ReduceMax",[Up]],["ReduceSum",[Vp]],["ReduceProd",[qp]],["ReduceL1",[Mp]],["ReduceL2",[Dp]],["ReduceLogSum",[Gp]],["ReduceLogSumExp",[Pp]],["ReduceSumSquare",[Lp]],["Relu",[_h]],["Resize",[Fc,jc]],["RotaryEmbedding",[Kc]],["ScatterND",[Hc,Gc]],["Sigmoid",[wh]],["Sin",[vh]],["Sinh",[xh]],["Slice",[Zc,Xc]],["SkipLayerNormalization",[Qc]],["Split",[xc,Sc]],["Sqrt",[Sh]],["Softmax",[Jc,Yc]],["Sub",[Dh]],["Tan",[kh]],["Tanh",[Th]],["ThresholdedRelu",[Ih,nr]],["Tile",[ef]],["Transpose",[xp,Sp]],["Where",[tf]]])}),af,Yy=q(()=>{Qe(),st(),ue(),af=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,a,s){tt(e.programInfo.name);let i=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let l=[];for(let p of t)l.push({binding:l.length,resource:{buffer:p.buffer}});for(let p of r)l.push({binding:l.length,resource:{buffer:p.buffer}});s&&l.push({binding:l.length,resource:s});let d=i.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:l,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}o.setPipeline(e.computePipeline),o.setBindGroup(0,d),o.dispatchWorkgroups(...a),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ke(e.programInfo.name)}dispose(){}build(e,t){tt(e.name);let r=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(p=>{r.features.has(p.feature)&&a.push(`enable ${p.extension};`)});let s=vp(t,this.backend.device.limits),i=e.getShaderSource(s),o=`${a.join(`
`)}
${s.additionalImplementations}
${i}`,l=r.createShaderModule({code:o,label:e.name});pe("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let d=r.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return Ke(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,a=typeof e=="number"?1:e.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=s&&r<=s&&a<=s)return[t,r,a];let i=t*r*a,o=Math.ceil(Math.sqrt(i));if(o>s){if(o=Math.ceil(Math.cbrt(i)),o>s)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),Cd,Id,Ed,zd,nf,e0=q(()=>{Qe(),Y(),st(),gp(),ly(),Jy(),Yy(),Cd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let a=0;a<e.length;++a){let s=e[a].dataType;switch(t[a]){case"none":{r.push("");break}case"type":{r.push(`${s}`);break}case"rank":{let i=e[a].dims.length;r.push(`${s};${i}`);break}case"dims":{let i=e[a].dims.join(",");r.push(`${s};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[a]}`)}}return r.join("|")},Id=(e,t,r)=>{var s,i;let a=e.name;return(s=e.shaderCache)!=null&&s.hint&&(a+="["+e.shaderCache.hint+"]"),a+=":"+r+`:${Cd(t,((i=e.shaderCache)==null?void 0:i.inputDependencies)??new Array(t.length).fill("dims"))}`,a},Ed=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},zd=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let t=e.limits;!this.subgroupsSupported||!t.minSubgroupSize||!t.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[t.minSubgroupSize,t.maxSubgroupSize]}},nf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},s=i=>t.features.has(i)&&r.push(i)&&!0;s("chromium-experimental-timestamp-query-inside-passes")||s("timestamp-query"),s("shader-f16"),s("subgroups")&&s("subgroups-f16"),this.device=await t.requestDevice(a),this.deviceInfo=new zd(this.device),this.adapterInfo=new Ed(t.info||await t.requestAdapterInfo()),this.gpuDataManager=yp(this),this.programManager=new af(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ra(e.logLevel,!!e.debug),this.device.onuncapturederror=i=>{i.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${i.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;tt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var a;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let s=0;s<t.length/2;s++){let i=r[s],o=i.kernelId,l=this.kernels.get(o),d=l.kernelType,p=l.kernelName,m=i.programName,g=i.inputTensorViews,y=i.outputTensorViews,_=t[s*2],w=t[s*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=_);let b=Number(_-this.queryTimeBase),S=Number(w-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if((a=this.env.webgpu.profiling)!=null&&a.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:g.map(v=>({dims:v.dims,dataType:Tt(v.dataType)})),outputsMetadata:y.map(v=>({dims:v.dims,dataType:Tt(v.dataType)})),kernelId:o,kernelType:d,kernelName:p,programName:m,startTime:b,endTime:S});else{let v="";g.forEach((T,k)=>{v+=`input[${k}]: [${T.dims}] | ${Tt(T.dataType)}, `});let $="";y.forEach((T,k)=>{$+=`output[${k}]: [${T.dims}] | ${Tt(T.dataType)}, `}),console.log(`[profiling] kernel "${o}|${d}|${p}|${m}" ${v}${$}execution time: ${S-b} ns`)}Pr("GPU",`${m}::${_}::${w}`)}e.unmap(),this.pendingQueries.delete(e)}),Ke()}run(e,t,r,a,s,i){tt(e.name);let o=[];for(let $=0;$<t.length;++$){let T=t[$].data;if(T===0)continue;let k=this.gpuDataManager.get(T);if(!k)throw new Error(`no GPU data for input: ${T}`);o.push(k)}let{outputs:l,dispatchGroup:d,programUniforms:p}=e.getRunData(t),m=r.length===0?l.map(($,T)=>T):r;if(m.length!==l.length)throw new Error(`Output size ${m.length} must be equal to ${l.length}.`);let g=[],y=[];for(let $=0;$<l.length;++$){if(!Number.isInteger(m[$])||m[$]<-3||m[$]>=i)throw new Error(`Invalid output index: ${m[$]}`);if(m[$]===-3)continue;let T=m[$]===-1,k=m[$]===-2,C=T||k?s(l[$].dataType,l[$].dims):a(m[$],l[$].dataType,l[$].dims);if(g.push(C),C.data===0)continue;let E=this.gpuDataManager.get(C.data);if(!E)throw new Error(`no GPU data for output: ${C.data}`);if(T&&this.temporaryData.push(E),k){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(E)}y.push(E)}if(o.length!==t.length||y.length!==g.length){if(y.length===0)return Ke(e.name),g;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(p){let $=0,T=[];p.forEach(z=>{let B=typeof z.data=="number"?[z.data]:z.data;if(B.length===0)return;let W=z.type===10?2:4,G,ee;z.type===10?(ee=B.length>4?16:B.length>2?8:B.length*W,G=B.length>4?16:W*B.length):(ee=B.length<=2?B.length*W:16,G=16),$=Math.ceil($/ee)*ee,T.push($);let ae=z.type===10?8:4;$+=B.length>4?Math.ceil(B.length/ae)*G:B.length*W});let k=16;$=Math.ceil($/k)*k;let C=new ArrayBuffer($);p.forEach((z,B)=>{let W=T[B],G=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(C,W,G.length).set(G);else if(z.type===12)new Uint32Array(C,W,G.length).set(G);else if(z.type===10)new Uint16Array(C,W,G.length).set(G);else if(z.type===1)new Float32Array(C,W,G.length).set(G);else throw new Error(`Unsupported uniform type: ${Tt(z.type)}`)});let E=this.gpuDataManager.create($,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(E.buffer,0,C,0,$),this.gpuDataManager.release(E.id),_={offset:0,size:$,buffer:E.buffer}}let w=this.programManager.normalizeDispatchGroupSize(d),b=w[1]===1&&w[2]===1,S=Id(e,t,b),v=this.programManager.getArtifact(S);if(v||(v=this.programManager.build(e,w),this.programManager.setArtifact(S,v),pe("info",()=>`[artifact] key: ${S}, programName: ${e.name}`)),p&&v.uniformVariablesInfo){if(p.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${p.length} in program "${v.programInfo.name}".`);for(let $=0;$<p.length;$++){let T=p[$],k=T.type,C=typeof T.data=="number"?1:T.data.length,[E,z]=v.uniformVariablesInfo[$];if(k!==E||C!==z)throw new Error(`Uniform variable ${$} mismatch: expect type ${E} with size ${z}, got type ${k} with size ${C} in program "${v.programInfo.name}".`)}}if(pe("info",()=>`[ProgramManager] run "${e.name}" (key=${S}) with ${w[0]}x${w[1]}x${w[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let $={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:g};this.pendingKernels.push($),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push($)}return this.programManager.run(v,o,y,w,_),Ke(e.name),g}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,a){let s=rf.get(e);if(!s)throw new Error(`kernel not implemented: ${e}`);let i={kernelType:e,kernelName:a,kernelEntry:s[0],attributes:[s[1],r]};this.kernels.set(t,i)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let a=this.kernels.get(e);if(!a)throw new Error(`kernel not created: ${e}`);let s=a.kernelType,i=a.kernelName,o=a.kernelEntry,l=a.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${s}] ${i}" is not allowed to be called recursively`);this.currentKernelId=e,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),pe("info",()=>`[WebGPU] Start to run kernel "[${s}] ${i}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),o(t,l[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${i}" failed. ${p}`)),1}finally{d&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${s}] ${i}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,a){let s=this.sessionExternalDataMapping.get(e);s||(s=new Map,this.sessionExternalDataMapping.set(e,s));let i=s.get(t),o=this.gpuDataManager.registerExternalBuffer(r,a,i);return s.set(t,[o,r]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let a=await da(this,e,t);return Ba(a.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){pe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){pe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){pe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let a=0;a<r;a++){let s=this.getComputePassEncoder(),i=e[a];this.writeTimestamp(this.pendingDispatchNumber*2),s.setPipeline(i.computePipeline),s.setBindGroup(0,i.bindGroup),s.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Ad,ra,Od,ia,aa,na,Rd,sf,t0=q(()=>{st(),Ad=1,ra=()=>Ad++,Od=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ia=(e,t)=>{let r=Od.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((a,s)=>a*s)*r/8):0},aa=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return ia(this.dataType,this.tensorShape)}destroy(){pe("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((a,s)=>a===r[s])}},na=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,a){let s=this.tensorManager.getMLContext(e);if(this.wrapper){if(this.wrapper.canReuseTensor(s,t,r))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==ia(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let i=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,i,!0,!0),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else pe("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Rd=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=ra();return this.tensorTrackersById.set(e,new na(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,a,s){pe("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${a}, copyOld: ${s}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(e,r,a,s)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){pe("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t==null?void 0:t.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,a){let s=this.getMLContext(e),i=ra(),o=new aa({sessionId:e,context:s,tensor:t,dataType:r,shape:a});return this.tensorTrackersById.set(i,new na(this,o)),this.externalTensors.add(o),i}async getCachedTensor(e,t,r,a,s,i){let o=this.getMLContext(e);for(let[d,p]of this.freeTensors.entries())if(p.canReuseTensor(o,t,r)){pe("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let m=this.freeTensors.splice(d,1)[0];return m.sessionId=e,m}pe("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let l=await o.createTensor({dataType:t,shape:r,dimensions:r,usage:a,writable:s,readable:i});return new aa({sessionId:e,context:o,tensor:l,dataType:t,shape:r})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},sf=(...e)=>new Rd(...e)}),Ar,Bd,of,r0=q(()=>{Y(),At(),gp(),t0(),st(),Ar=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Bd=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),a=Object.keys(t).sort();return r.length===a.length&&r.every((s,i)=>s===a[i]&&e[s]===t[s])},of=class{constructor(e){this.tensorManager=sf(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.temporaryGraphInputs=[],this.temporarySessionTensorIds=new Map,Ra(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){pe("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){pe("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)pe("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(a=>a.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let a=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:a}),a}}else if(e===void 0){let r=this.mlContextCache.findIndex(a=>a.options===void 0&&a.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let a=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:a}),a}}let t=this.mlContextCache.findIndex(r=>Bd(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let a=this.mlContextCache.findIndex(s=>s.mlContext===t);a!==-1&&this.mlContextCache.splice(a,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){pe("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,a,s){let i=Ar.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,i,a,s)}async createTemporaryTensor(e,t,r){pe("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let a=Ar.get(t);if(!a)throw new Error(`Unsupported ONNX data type: ${t}`);let s=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,s,a,r,!1);let i=this.temporarySessionTensorIds.get(e);return i?i.push(s):this.temporarySessionTensorIds.set(e,[s]),s}uploadTensor(e,t){if(!Ce().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");pe("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return Ba(r,t)}}registerMLTensor(e,t,r,a){let s=Ar.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(e,t,s,a);return pe("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${s}, dimensions: ${a}} -> {tensorId: ${i}}`),i}registerMLConstant(e,t,r,a,s,i){if(!i)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let l=i.get(o);if(!l)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+r).buffer,p;switch(s.dataType){case"float32":p=new Float32Array(d);break;case"float16":p=new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${s.dataType} in creating WebNN Constant from external data.`)}return pe("verbose",()=>`[WebNN] registerMLConstant {dataType: ${s.dataType}, shape: ${s.shape}}}`),a.constant(s,p)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}flush(){}}}),uf={};lr(uf,{init:()=>lf});var Or,Nd,lf,i0=q(()=>{Y(),e0(),st(),oe(),r0(),Or=class df{constructor(t,r,a,s){this.module=t,this.dataType=r,this.data=a,this.dims=s}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=O.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(O.size(t)!==O.size(this.dims))throw new Error("Invalid new shape");return new df(this.module,this.dataType,this.data,t)}},Nd=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo,this.deviceInfo=t.deviceInfo;let a=e.PTR_SIZE,s=r/e.PTR_SIZE,i=a===4?"i32":"i64";this.opKernelContext=Number(e.getValue(a*s++,i));let o=Number(e.getValue(a*s++,i));this.outputCount=Number(e.getValue(a*s++,i)),this.customDataOffset=Number(e.getValue(a*s++,"*")),this.customDataSize=Number(e.getValue(a*s++,i));let l=[];for(let d=0;d<o;d++){let p=Number(e.getValue(a*s++,i)),m=Number(e.getValue(a*s++,"*")),g=Number(e.getValue(a*s++,i)),y=[];for(let _=0;_<g;_++)y.push(Number(e.getValue(a*s++,i)));l.push(new Or(e,p,m,y))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){var o;let r=((o=t==null?void 0:t.inputs)==null?void 0:o.map(l=>typeof l=="number"?this.inputs[l]:l))??this.inputs,a=(t==null?void 0:t.outputs)??[],s=(l,d,p)=>new Or(this.module,d,this.output(l,p),p),i=(l,d)=>{let p=Ct(l,d);if(!p)throw new Error(`Unsupported data type: ${l}`);let m=p>0?this.backend.gpuDataManager.create(p).id:0;return new Or(this.module,l,m,d)};return this.backend.run(e,r,a,s,i,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let a=this.module.PTR_SIZE,s=a===4?"i32":"i64",i=this.module.stackAlloc((1+t.length)*a);this.module.setValue(i,t.length,s);for(let o=0;o<t.length;o++)this.module.setValue(i+a*(o+1),t[o],s);return this.module._JsepOutput(this.opKernelContext,e,i)}catch(a){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${a}`)}finally{this.module.stackRestore(r)}}},lf=async(e,t,r,a)=>{let s=t.jsepInit;if(!s)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new nf;await i.initialize(r,a),s("webgpu",[i,o=>i.alloc(Number(o)),o=>i.free(o),(o,l,d,p=!1)=>{if(p)pe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(l)}, size=${Number(d)}`),i.memcpy(Number(o),Number(l));else{pe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let m=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));i.upload(Number(l),m)}},async(o,l,d)=>{pe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${l}, size=${d}`),await i.download(Number(o),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(o,l,d)=>i.createKernel(o,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),o=>i.releaseKernel(o),(o,l,d,p)=>{pe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${l}`);let m=new Nd(t,i,Number(l));return i.computeKernel(Number(o),m,p)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new of(r);s("webnn",[i,()=>i.reserveTensorId(),o=>i.releaseTensorId(o),async(o,l,d,p,m)=>i.ensureTensor(o,l,d,p,m),(o,l)=>{i.uploadTensor(o,l)},async(o,l)=>i.downloadTensor(o,l)])}}}),Md,Ha,Fa,ft,Dd,Gr,ja,Ka,sa,Qa,Za,Xa,pf=q(()=>{oy(),uy(),Y(),At(),Ia(),mp(),Md=(e,t)=>{Ce()._OrtInit(e,t)!==0&&fe("Can't initialize onnxruntime.")},Ha=async e=>{Md(e.wasm.numThreads,Wr(e.logLevel))},Fa=async(e,t)=>{{let r=(i0(),Dr(uf)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let a=e.webgpu.adapter;if(a){if(typeof a.limits!="object"||typeof a.features!="object"||typeof a.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let s=e.webgpu.powerPreference;if(s!==void 0&&s!=="low-power"&&s!=="high-performance")throw new Error(`Invalid powerPreference setting: "${s}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(a=await navigator.gpu.requestAdapter({powerPreference:s,forceFallbackAdapter:i}),!a)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ce(),e,a)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ce(),e)}}},ft=new Map,Dd=e=>{let t=Ce(),r=t.stackSave();try{let a=t.PTR_SIZE,s=t.stackAlloc(2*a);t._OrtGetInputOutputCount(e,s,s+a)!==0&&fe("Can't get session input/output count.");let i=a===4?"i32":"i64";return[Number(t.getValue(s,i)),Number(t.getValue(s+a,i))]}finally{t.stackRestore(r)}},Gr=e=>{let t=Ce(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},ja=async(e,t)=>{var g,y,_;let r,a,s=Ce();Array.isArray(e)?[r,a]=e:e.buffer===s.HEAPU8.buffer?[r,a]=[e.byteOffset,e.byteLength]:[r,a]=Gr(e);let i=0,o=0,l=0,d=[],p=[],m=[];try{if([o,d]=fp(t),(t==null?void 0:t.externalData)&&s.mountExternalData){let C=[];for(let E of t.externalData){let z=typeof E=="string"?E:E.path;C.push(Oa(typeof E=="string"?E:E.data).then(B=>{s.mountExternalData(z,B)}))}await Promise.all(C)}for(let C of(t==null?void 0:t.executionProviders)??[])if((typeof C=="string"?C:C.name)==="webnn"){if(s.shouldTransferToMLTensor=!1,typeof C!="string"){let E=C,z=E==null?void 0:E.context,B=E==null?void 0:E.gpuDevice,W=E==null?void 0:E.deviceType,G=E==null?void 0:E.powerPreference;z?s.currentContext=z:B?s.currentContext=await s.jsepCreateMLContext(B):s.currentContext=await s.jsepCreateMLContext({deviceType:W,powerPreference:G})}else s.currentContext=await s.jsepCreateMLContext();break}i=await s._OrtCreateSession(r,a,o),i===0&&fe("Can't create a session."),(g=s.jsepOnCreateSession)==null||g.call(s),s.currentContext&&(s.jsepRegisterMLContext(i,s.currentContext),s.currentContext=void 0,s.shouldTransferToMLTensor=!0);let[w,b]=Dd(i),S=!!(t!=null&&t.enableGraphCapture),v=[],$=[],T=[];for(let C=0;C<w;C++){let E=s._OrtGetInputName(i,C);E===0&&fe("Can't get an input name."),p.push(E),v.push(s.UTF8ToString(E))}for(let C=0;C<b;C++){let E=s._OrtGetOutputName(i,C);E===0&&fe("Can't get an output name."),m.push(E);let z=s.UTF8ToString(E);$.push(z);{if(S&&(t==null?void 0:t.preferredOutputLocation)===void 0){T.push("gpu-buffer");continue}let B=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((y=t==null?void 0:t.preferredOutputLocation)==null?void 0:y[z])??"cpu";if(B!=="cpu"&&B!=="cpu-pinned"&&B!=="gpu-buffer"&&B!=="ml-tensor")throw new Error(`Not supported preferred output location: ${B}.`);if(S&&B!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${B}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);T.push(B)}}let k=null;return T.some(C=>C==="gpu-buffer"||C==="ml-tensor")&&(l=s._OrtCreateBinding(i),l===0&&fe("Can't create IO binding."),k={handle:l,outputPreferredLocations:T,outputPreferredLocationsEncoded:T.map(C=>la(C))}),ft.set(i,[i,p,m,k,S,!1]),[i,v,$]}catch(w){throw p.forEach(b=>s._OrtFree(b)),m.forEach(b=>s._OrtFree(b)),l!==0&&s._OrtReleaseBinding(l)!==0&&fe("Can't release IO binding."),i!==0&&s._OrtReleaseSession(i)!==0&&fe("Can't release session."),w}finally{s._free(r),o!==0&&s._OrtReleaseSessionOptions(o)!==0&&fe("Can't release session options."),d.forEach(w=>s._free(w)),(_=s.unmountExternalData)==null||_.call(s)}},Ka=e=>{var d;let t=Ce(),r=ft.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[a,s,i,o,l]=r;o&&(l&&t._OrtClearBoundOutputs(o.handle)!==0&&fe("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&fe("Can't release IO binding.")),(d=t.jsepOnReleaseSession)==null||d.call(t,e),s.forEach(p=>t._OrtFree(p)),i.forEach(p=>t._OrtFree(p)),t._OrtReleaseSession(a)!==0&&fe("Can't release session."),ft.delete(e)},sa=async(e,t,r,a,s,i=!1)=>{if(!e){t.push(0);return}let o=Ce(),l=o.PTR_SIZE,d=e[0],p=e[1],m=e[3],g=m,y,_;if(d==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let S=e[2].gpuBuffer;_=Ct(Mt(d),p);let v=o.jsepRegisterBuffer;if(!v)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');y=v(a,s,S,_)}else if(m==="ml-tensor"){let S=e[2].mlTensor;_=Ct(Mt(d),p);let v=o.jsepRegisterMLTensor;if(!v)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');y=v(a,S,Mt(d),p)}else{let S=e[2];if(Array.isArray(S)){_=l*S.length,y=o._malloc(_),r.push(y);for(let v=0;v<S.length;v++){if(typeof S[v]!="string")throw new TypeError(`tensor data at index ${v} is not a string`);o.setValue(y+v*l,ze(S[v],r),"*")}}else{let v=o.jsepIsGraphInput;if(d!=="string"&&v){let $=o._OrtGetInputName(a,s),T=o.UTF8ToString($);if(v(a,T)){let k=Mt(d);_=Ct(k,p),g="ml-tensor";let C=o.jsepCreateTemporaryTensor,E=o.jsepUploadTensor;if(!C||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await C(a,k,p);E(z,new Uint8Array(S.buffer,S.byteOffset,S.byteLength)),y=z}else _=S.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}else _=S.byteLength,y=o._malloc(_),r.push(y),o.HEAPU8.set(new Uint8Array(S.buffer,S.byteOffset,_),y)}}let w=o.stackSave(),b=o.stackAlloc(4*p.length);try{p.forEach((v,$)=>o.setValue(b+$*l,v,l===4?"i32":"i64"));let S=o._OrtCreateTensor(Mt(d),y,_,b,p.length,la(g));S===0&&fe(`Can't create tensor for input/output. session=${a}, index=${s}.`),t.push(S)}finally{o.stackRestore(w)}},Qa=async(e,t,r,a,s,i)=>{var ee,ae,Z;let o=Ce(),l=o.PTR_SIZE,d=ft.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=d[0],m=d[1],g=d[2],y=d[3],_=d[4],w=d[5],b=t.length,S=a.length,v=0,$=[],T=[],k=[],C=[],E=o.stackSave(),z=o.stackAlloc(b*l),B=o.stackAlloc(b*l),W=o.stackAlloc(S*l),G=o.stackAlloc(S*l);try{[v,$]=cp(i);for(let L=0;L<b;L++)await sa(r[L],T,C,e,t[L],_);for(let L=0;L<S;L++)await sa(s[L],k,C,e,b+a[L],_);for(let L=0;L<b;L++)o.setValue(z+L*l,T[L],"*"),o.setValue(B+L*l,m[t[L]],"*");for(let L=0;L<S;L++)o.setValue(W+L*l,k[L],"*"),o.setValue(G+L*l,g[a[L]],"*");if(y&&!w){let{handle:L,outputPreferredLocations:de,outputPreferredLocationsEncoded:me}=y;if(m.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${m.length}).`);for(let F=0;F<b;F++){let ge=t[F];await o._OrtBindInput(L,m[ge],T[F])!==0&&fe(`Can't bind input[${F}] for session=${e}.`)}for(let F=0;F<S;F++){let ge=a[F];(ee=s[F])!=null&&ee[3]?o._OrtBindOutput(L,g[ge],k[F],0)!==0&&fe(`Can't bind pre-allocated output[${F}] for session=${e}.`):o._OrtBindOutput(L,g[ge],0,me[ge])!==0&&fe(`Can't bind output[${F}] to ${de[F]} for session=${e}.`)}ft.set(e,[p,m,g,y,_,!0])}(ae=o.jsepOnRunStart)==null||ae.call(o,p);let te;y?te=await o._OrtRunWithBinding(p,y.handle,S,W,v):te=await o._OrtRun(p,B,z,b,G,S,W,v),te!==0&&fe("failed to call OrtRun().");let J=[];for(let L=0;L<S;L++){let de=Number(o.getValue(W+L*l,"*"));if(de===k[L]){J.push(s[L]);continue}let me=o.stackSave(),F=o.stackAlloc(4*l),ge=!1,M,V=0;try{o._OrtGetTensorData(de,F,F+l,F+2*l,F+3*l)!==0&&fe(`Can't access output tensor data on index ${L}.`);let le=l===4?"i32":"i64",be=Number(o.getValue(F,le));V=o.getValue(F+l,"*");let D=o.getValue(F+l*2,"*"),he=Number(o.getValue(F+l*3,le)),Ue=[];for(let Te=0;Te<he;Te++)Ue.push(Number(o.getValue(D+Te*l,le)));o._OrtFree(D)!==0&&fe("Can't free memory for tensor dims.");let Re=Ue.reduce((Te,ye)=>Te*ye,1);M=Tt(be);let _t=y==null?void 0:y.outputPreferredLocations[a[L]];if(M==="string"){if(_t==="gpu-buffer"||_t==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Te=[];for(let ye=0;ye<Re;ye++){let ot=o.getValue(V+ye*l,"*"),qt=o.getValue(V+(ye+1)*l,"*"),wt=ye===Re-1?void 0:qt-ot;Te.push(o.UTF8ToString(ot,wt))}J.push([M,Ue,Te,"cpu"])}else if(_t==="gpu-buffer"&&Re>0){let Te=o.jsepGetBuffer;if(!Te)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ye=Te(V),ot=Ct(be,Re);if(ot===void 0||!za(M))throw new Error(`Unsupported data type: ${M}`);ge=!0,J.push([M,Ue,{gpuBuffer:ye,download:o.jsepCreateDownloader(ye,ot,M),dispose:()=>{o._OrtReleaseTensor(de)!==0&&fe("Can't release tensor.")}},"gpu-buffer"])}else if(_t==="ml-tensor"&&Re>0){let Te=o.jsepEnsureTensor;if(!Te)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Ct(be,Re)===void 0||!Aa(M))throw new Error(`Unsupported data type: ${M}`);let ye=await Te(e,V,be,Ue,!1);ge=!0,J.push([M,Ue,{mlTensor:ye,download:o.jsepCreateMLTensorDownloader(V,M),dispose:()=>{o.jsepReleaseTensorId(V),o._OrtReleaseTensor(de)}},"ml-tensor"])}else{let Te=Ea(M),ye=new Te(Re);new Uint8Array(ye.buffer,ye.byteOffset,ye.byteLength).set(o.HEAPU8.subarray(V,V+ye.byteLength)),J.push([M,Ue,ye,"cpu"])}}finally{o.stackRestore(me),M==="string"&&V&&o._free(V),ge||o._OrtReleaseTensor(de),(Z=o.jsepOnRunEnd)==null||Z.call(o,p)}}return y&&!_&&(o._OrtClearBoundOutputs(y.handle)!==0&&fe("Can't clear bound outputs."),ft.set(e,[p,m,g,y,_,!1])),J}finally{o.stackRestore(E),T.forEach(te=>o._OrtReleaseTensor(te)),k.forEach(te=>o._OrtReleaseTensor(te)),C.forEach(te=>o._free(te)),v!==0&&o._OrtReleaseRunOptions(v),$.forEach(te=>o._free(te))}},Za=e=>{let t=Ce(),r=ft.get(e);if(!r)throw new Error("invalid session id");let a=r[0],s=t._OrtEndProfiling(a);s===0&&fe("Can't get an profile file name."),t._OrtFree(s)},Xa=e=>{let t=[];for(let r of e){let a=r[2];!Array.isArray(a)&&"buffer"in a&&t.push(a.buffer)}return t}}),mt,Be,Nt,tr,rr,Rr,oa,Br,xt,St,Pd,hf,cf,ff,mf,gf,yf,_f,wf=q(()=>{Qe(),pf(),At(),Ta(),mt=()=>!!ve.wasm.proxy&&typeof document<"u",Nt=!1,tr=!1,rr=!1,Br=new Map,xt=(e,t)=>{let r=Br.get(e);r?r.push(t):Br.set(e,[t])},St=()=>{if(Nt||!tr||rr||!Be)throw new Error("worker not ready")},Pd=e=>{switch(e.data.type){case"init-wasm":Nt=!1,e.data.err?(rr=!0,oa[1](e.data.err)):(tr=!0,oa[0]()),Rr&&(URL.revokeObjectURL(Rr),Rr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Br.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},hf=async()=>{if(!tr){if(Nt)throw new Error("multiple calls to 'initWasm()' detected.");if(rr)throw new Error("previous call to 'initWasm()' failed.");if(Nt=!0,mt())return new Promise((e,t)=>{Be==null||Be.terminate(),pp().then(([r,a])=>{var s;try{Be=a,Be.onerror=o=>t(o),Be.onmessage=Pd,oa=[e,t];let i={type:"init-wasm",in:ve};!i.in.wasm.wasmPaths&&(r||(s=import.meta.url)!=null&&s.startsWith("file:"))&&(i.in.wasm.wasmPaths={wasm:new URL("/assets/ort-wasm-simd-threaded.jsep-D5Jk56-t.wasm",import.meta.url).href}),Be.postMessage(i),Rr=r}catch(i){t(i)}},t)});try{await Ca(ve.wasm),await Ha(ve),tr=!0}catch(e){throw rr=!0,e}finally{Nt=!1}}},cf=async e=>{if(mt())return St(),new Promise((t,r)=>{xt("init-ep",[t,r]);let a={type:"init-ep",in:{epName:e,env:ve}};Be.postMessage(a)});await Fa(ve,e)},ff=async e=>mt()?(St(),new Promise((t,r)=>{xt("copy-from",[t,r]);let a={type:"copy-from",in:{buffer:e}};Be.postMessage(a,[e.buffer])})):Gr(e),mf=async(e,t)=>{if(mt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return St(),new Promise((r,a)=>{xt("create",[r,a]);let s={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Be.postMessage(s,i)})}else return ja(e,t)},gf=async e=>{if(mt())return St(),new Promise((t,r)=>{xt("release",[t,r]);let a={type:"release",in:e};Be.postMessage(a)});Ka(e)},yf=async(e,t,r,a,s,i)=>{if(mt()){if(r.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(s.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return St(),new Promise((o,l)=>{xt("run",[o,l]);let d=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:a,options:i}};Be.postMessage(p,Xa(d))})}else return Qa(e,t,r,a,s,i)},_f=async e=>{if(mt())return St(),new Promise((t,r)=>{xt("end-profiling",[t,r]);let a={type:"end-profiling",in:e};Be.postMessage(a)});Za(e)}}),ua,Ud,bf,a0=q(()=>{Qe(),wf(),Y(),ka(),mp(),ua=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Ud=e=>{switch(e[3]){case"cpu":return new et(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!za(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:a,dispose:s}=e[2];return et.fromGpuBuffer(r,{dataType:t,dims:e[1],download:a,dispose:s})}case"ml-tensor":{let t=e[0];if(!Aa(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:a,dispose:s}=e[2];return et.fromMLTensor(r,{dataType:t,dims:e[1],download:a,dispose:s})}default:throw new Error(`invalid data location: ${e[3]}`)}},bf=class{async fetchModelAndCopyToWasmMemory(e){return ff(await Oa(e))}async loadModel(e,t){tt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames]=await mf(r,t),Ke()}async dispose(){return gf(this.sessionId)}async run(e,t,r){tt();let a=[],s=[];Object.entries(e).forEach(g=>{let y=g[0],_=g[1],w=this.inputNames.indexOf(y);if(w===-1)throw new Error(`invalid input '${y}'`);a.push(_),s.push(w)});let i=[],o=[];Object.entries(t).forEach(g=>{let y=g[0],_=g[1],w=this.outputNames.indexOf(y);if(w===-1)throw new Error(`invalid output '${y}'`);i.push(_),o.push(w)});let l=a.map((g,y)=>ua(g,()=>`input "${this.inputNames[s[y]]}"`)),d=i.map((g,y)=>g?ua(g,()=>`output "${this.outputNames[o[y]]}"`):null),p=await yf(this.sessionId,s,l,o,d,r),m={};for(let g=0;g<p.length;g++)m[this.outputNames[o[g]]]=i[g]??Ud(p[g]);return Ke(),m}startProfiling(){}endProfiling(){_f(this.sessionId)}}}),$f={};lr($f,{OnnxruntimeWebAssemblyBackend:()=>va,initializeFlags:()=>$a,wasmBackend:()=>vf});var $a,va,vf,n0=q(()=>{Qe(),wf(),a0(),$a=()=>{if((typeof ve.wasm.initTimeout!="number"||ve.wasm.initTimeout<0)&&(ve.wasm.initTimeout=0),ve.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ve.wasm.proxy!="boolean"&&(ve.wasm.proxy=!1),typeof ve.wasm.trace!="boolean"&&(ve.wasm.trace=!1),typeof ve.wasm.numThreads!="number"||!Number.isInteger(ve.wasm.numThreads)||ve.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ve.wasm.numThreads=1;else{let e=typeof navigator>"u"?Gg("node:os").cpus().length:navigator.hardwareConcurrency;ve.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},va=class{async init(e){$a(),await hf(),await cf(e)}async createInferenceSessionHandler(e,t){let r=new bf;return await r.loadModel(e,t),Promise.resolve(r)}},vf=new va});Qe();Qe();Qe();var s0="1.21.0",u0=np;{let e=(n0(),Dr($f)).wasmBackend;Dt("webgpu",e,5),Dt("webnn",e,5),Dt("cpu",e,10),Dt("wasm",e,10)}Object.defineProperty(ve.versions,"web",{value:s0,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */export{ap as InferenceSession,Pr as TRACE,tt as TRACE_FUNC_BEGIN,Ke as TRACE_FUNC_END,et as Tensor,u0 as default,ve as env,Dt as registerBackend};
