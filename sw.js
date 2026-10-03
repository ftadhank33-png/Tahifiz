const C="hifz-v4",F=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;if(new URL(r.url).hostname==="api.alquran.cloud")return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>{const n=fetch(r).then(x=>{if(x&&(x.ok||x.type==="opaque")){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>m);return m||n}))});
