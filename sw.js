const staticCacheName = "static-v1.0.0";
const dynamicCacheName = "dynamic-v1.0.0";
const assets = [
  "/",
  "/index.html",
  "/about.html",
  "/House.html",
  "/contact.html",
  "/manifest.json",
  "/sw.js",
  "js/app.js",
  "/assets/house1.jpg",
  "/assets/house2.jpg",
  "/assets/house3.jpg",
  "/assets/house4.jpg",
  "/assets/logo.png",
  "/assets/magic.png",
  "/assets/mhn.png",
   "/assets/mhn.png",
  "/js/app.js",
];

self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(staticCacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

