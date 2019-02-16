this.addEventListener('install',function(event){
  event.waitUntil(
    caches.open('myCache')
    .then(function(cache){
      cache.addAll([])
    })
  )

})
// fetch
this.addEventListener('fetch',function(event){
  event.respondWith(
    caches.open('myCache')
    .then(function(cac){
      return cac.match(event.request)
      .then(function(result){
        return result || fetch(event.request)
        .then(function(result){
          cac.put(event.request,result.clone());
          return result;
        })
      })
    })
  )
})
