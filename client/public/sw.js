const CACHE_NAME = "callguard-shell-v2";
const SHELL_URLS = ["./", "./manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_URLS))
      .catch(() => undefined)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("callguard-shell-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isNavigation = request.mode === "navigate";
  const isStaticAsset = request.destination === "image" || request.destination === "font" || request.destination === "style" || request.destination === "script";
  if (!isNavigation && !isStaticAsset) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && (response.ok || response.type === "opaque")) {
        cache.put(request, response.clone()).catch(() => undefined);
      }
      return response;
    } catch {
      if (isNavigation) {
        const shell = await cache.match("./");
        if (shell) return shell;
      }
      return new Response("Offline — reconnect to load this CallGuard resource.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  })());
});
