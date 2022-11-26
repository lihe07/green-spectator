console.log('Service Worker Loaded...')

const videoUrls = [
  'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/51055966374496eb66d1/1.mp4',
  'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/1636977637449885f94e/.mp4',
  'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/679395637449a574629/3.mp4',
  'https://lms.d.zhan.com/zhanlms/addon_homework/2022/11/3081980637449b3a122a/.mp4'
]

async function checkCache (request, noCors = false) {
  const cache = await caches.open('assets')
  const cached = await cache.match(request)
  if (cached) {
    console.log('Cache hit: ' + request.url)
    return cached
  } else {
    console.log('Cache miss: ' + request.url)
    let response
    if (noCors) {
      response = await fetch(request, {
        referrerPolicy: 'no-referrer',
        referrer: '',
        mode: 'no-cors',
        credentials: 'omit'
      })
    } else {
      response = await fetch(request)
    }
    cache.put(request, response.clone())
    return response
  }
}

self.addEventListener('fetch', (event) => {
  if (event.request.url.endsWith('.mp4')) {
    let req = event.request
    if (event.request.url.includes('1.mp4')) {
      req = new Request(videoUrls[0])
    } else if (event.request.url.includes('2.mp4')) {
      req = new Request(videoUrls[1])
    } else if (event.request.url.includes('3.mp4')) {
      req = new Request(videoUrls[2])
    } else if (event.request.url.includes('4.mp4')) {
      req = new Request(videoUrls[3])
    }
    event.respondWith(checkCache(req))
  } else {
    event.respondWith(checkCache(event.request))
  }
})
