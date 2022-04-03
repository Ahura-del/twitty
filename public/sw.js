
var CACHE_STATIC_NAME = 'static-v4';
var CACHE_DYNAMIC_NAME = 'dynamic-v4';
var CACHE_FILES =[
  '/',
  '/index.html',
  '/static/js/2.500ffabc.chunk.js',
  // '/static/js/main.2b777f1b.chunk.js',
  '/static/js/runtime-main.4a260c4c.js',
  '/static/css/2.e3d72c3e.chunk.css',
  '/static/css/main.f9a5d841.chunk.css',
  'logo192.png',
  'logo512.png',
  '/apple-touch-icon.png',
  '/favicon.ico',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  
]
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll(CACHE_FILES);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {
              return caches.match(event.request);
            });
        }
      })
  );
});

self.addEventListener('notificationclick' , event =>{

  const rootUrl = new URL('/', location).href;
    event.notification.close();
    // Enumerate windows, and call window.focus(), or open a new one.
    event.waitUntil(
      clients.matchAll().then(matchedClients => {
        for (let client of matchedClients) {
          if (client.url === rootUrl) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      })
    );


})

self.addEventListener('push' , event =>{
  // const data = event.data.json()
  const getData =event.data.text()
  const data = JSON.parse(getData)

  const option = {
    body:data.description,
    icon:'/img/icon_x96.png',
    badge:'/img/icon_x96.png',
    vibrate: [100, 50, 100],
    data:{
      url:data.openUrl
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, option)
  );
})

self.addEventListener('notificationclose' , ()=>{
  console.log('notification closed')
})