// MENTOR Currículo — service worker simples: sempre tenta a rede primeiro.
// Assim, toda versão nova publicada chega sem ficar presa no cache.
const CACHE = "mentor-curriculo";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(resp => {
      const copia = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
      return resp;
    }).catch(() => caches.match(req))
  );
});
