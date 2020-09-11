const staticWeatherApp = "weather-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/script/app.js",
  "/openweathermap-icons/icons/01d.png",
  "/openweathermap-icons/icons/01n.png",
  "/openweathermap-icons/icons/02d.png",
  "/openweathermap-icons/icons/02n.png",
  "/openweathermap-icons/icons/03d.png",
  "/openweathermap-icons/icons/03n.png",
  "/openweathermap-icons/icons/04d.png",
  "/openweathermap-icons/icons/04n.png",
  "/openweathermap-icons/icons/05d.png",
  "/openweathermap-icons/icons/05n.png",
  "/openweathermap-icons/icons/06d.png",
  "/openweathermap-icons/icons/06n.png",
  "/openweathermap-icons/icons/07d.png",
  "/openweathermap-icons/icons/07n.png",
  "/openweathermap-icons/icons/08d.png",
  "/openweathermap-icons/icons/08n.png",
  "/openweathermap-icons/icons/09d.png",
  "/openweathermap-icons/icons/09n.png",
  "/openweathermap-icons/icons/10d.png",
  "/openweathermap-icons/icons/10n.png",
  "/openweathermap-icons/icons/11d.png",
  "/openweathermap-icons/icons/11n.png",
  "/openweathermap-icons/icons/13d.png",
  "/openweathermap-icons/icons/13n.png",
  "/openweathermap-icons/icons/50d.png",
  "/openweathermap-icons/icons/50n.png",
  "/openweathermap-icons/icons/unknown.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticWeatherApp).then(cache => {
      cache.addAll(assets)
    })
  )
})


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })