const CACHE='kedryn-public-v4.15';
const CORE=["/", "/index.html", "/site.webmanifest", "/kedryn-c16-icon.svg", "/kedryn-icon-192.png", "/kedryn-icon-512.png", "/images/kedryn-c16-mark.svg", "/images/kedryn-c16-wordmark.svg", "/images/menu/recipe-preview.svg", "/assets/style-CN8hMTD6.css", "/assets/kedryn-e13HmGvC.js"];
const ALLOWED=new Set([...CORE,...["/images/demo-partner-qr.svg", "/images/kitchen-assessment.webp", "/images/kedryn-c16-lockup-transparent.svg", "/images/kedryn-identity.jpeg", "/images/kedryn-c16-lockup.svg", "/images/meal-hero.png", "/images/kedryn-c16-wordmark.svg", "/images/kedryn-c16-mark.svg", "/images/menu/b08.webp", "/images/menu/d13.webp", "/images/menu/recipe-preview.svg", "/images/menu/d14.webp", "/images/menu/d03.webp", "/images/menu/l02.webp", "/images/menu/l14.webp", "/images/menu/l03.webp", "/images/menu/l19.webp", "/images/menu/b13.webp", "/images/menu/b06.webp", "/images/menu/b11.webp", "/images/menu/d15.webp", "/images/menu/d12.webp", "/images/menu/d10.webp", "/images/menu/b15.webp", "/images/menu/d19.webp", "/images/menu/b14.webp", "/images/menu/b03.webp", "/images/menu/d25.webp", "/images/menu/l06.webp", "/images/menu/l10.webp", "/images/menu/d24.webp", "/images/menu/l13.webp", "/images/menu/b02.webp", "/images/menu/b09.webp", "/images/menu/d17.webp", "/images/menu/d22.webp", "/images/menu/d16.webp", "/images/menu/l09.webp", "/images/menu/l16.webp", "/images/menu/d07.webp", "/images/menu/l18.webp", "/images/menu/d01.webp", "/images/menu/d09.webp", "/images/menu/b04.webp", "/images/menu/d08.webp", "/images/menu/b07.webp", "/images/menu/l12.webp", "/images/menu/l05.webp", "/images/menu/d05.webp", "/images/menu/d23.webp", "/images/menu/d06.webp", "/images/menu/l07.webp", "/images/menu/d18.webp", "/images/menu/l01.webp", "/images/menu/b01.webp", "/images/menu/d04.webp", "/images/menu/d20.webp", "/images/menu/l08.webp", "/images/menu/d02.webp", "/images/menu/b12.webp", "/images/menu/l17.webp", "/images/menu/d21.webp", "/images/menu/b05.webp", "/images/menu/l15.webp", "/images/menu/l04.webp", "/images/menu/b10.webp", "/images/menu/l20.webp", "/images/menu/d11.webp", "/images/menu/l11.webp"]]);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('kedryn-public-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'&&(url.pathname==='/'||url.pathname==='/index.html')){
  event.respondWith(fetch(req).catch(()=>caches.open(CACHE).then(cache=>cache.match('/index.html'))));return;
 }
 if(!ALLOWED.has(url.pathname)||url.search)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const existing=await cache.match(url.pathname);if(existing)return existing;
  const response=await fetch(req);
  if(response.ok&&response.type==='basic')await cache.put(url.pathname,response.clone());
  return response;
 }));
});
