
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';
var CACHE_FILES =[
  '/',
  '/index.html',
  '/static/js/2.827fa8a9.chunk.js',
  '/static/js/main.c4e389ac.chunk.js',
  '/static/js/runtime-main.4a260c4c.js',
  '/static/css/2.56cb10f9.chunk.css',
  '/static/css/main.f9a5d841.chunk.css',
  '/static/media/chat.665b5137.png',
  '/static/media/logo.2518cfce.svg',
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

            });
        }
      })
  );
});

self.addEventListener('notificationclick' , event =>{
  const notification = event.notification;
  const action = event.action;

  if(action === 'confirm'){
    notification.close()
  }else{
    event.waitUntil(
      clients.matchAll()
      .then(clis =>{
        const client = clis.find(c=>{
          return c.visibilityState === 'visible'
        })
        if(client !== undefined){
          client.navigate(notification.data.url)
          client.focus()
        }else{
          clients.openWindow(notification.data.url)
        }
        notification.close()
      })
    )
  }
})

self.addEventListener('push' , event =>{
  const option = {
    body:event.data.description,
    icon:'/img/icon_x96.png',
    badge:'/img/icon_x96.png',
    data:{
      url:event.data.openUrl
    }
  }
  self.ServiceWorkerRegistration.showNotification(event.data.title , option)
})

self.addEventListener('notificationclose' , ()=>{
  console.log('notification closed')
})