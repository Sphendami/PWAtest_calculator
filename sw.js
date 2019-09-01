const version = "1.0";

const files = [
    "/",
    "manifest.json",
    "index.html",
    "/style.css",
    "/script,js",
    "/image/icon.png"
];

const CACHE_NAME = "cache-ver." + version;

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(files);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cache) => {
            cache.map((name) => {
                if (CACHE_NAME !== name) {
                    caches.delete(name);
                }
            });
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
            if (res) {
                return res;
            }
            return fetch(event.request);
        })
    );
});