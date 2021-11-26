const CACHE_NAME = "Twitty";
let urlsToCache = [
    '/',
    '/static',
    '/asset-manifest.json',
    'index.html',
    '/favicon.ico'
];

const self = this;

//install
self.addEventListener('install' , (e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
            console.log('open cache')
            return cache.addAll(urlsToCache)
        })
    )
})

//fetch
self.addEventListener('fetch' , (e)=>{
    if(!navigator.onLine){
        e.respondWith(
            caches.match(e.request)
            .then(response =>{
                if(response){
                    return response
                }
                return fetch(e.request)
            })
        )
    }
})

//update
self.addEventListener('activate' , (e)=>{
    let cacheWithList = ['Twitty']
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName=>{
                    if(cacheWithList.indexOf(cacheName) === -1){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})