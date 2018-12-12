

import config from './service-config.json';

self.addEventListener('install', (e) => {
 e.waitUntil(
   caches.open(config.name).then((cache) => {
     return cache.addAll(config.resources);
   }));
});
