const API_KEY = "841ac79c9b6b1c1450cdc06cd005cd90"

function onGeoOk (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const city = document.querySelector(".loca span:last-child")
    const weatherIcon = document.querySelector(".weather_wrap img")
    const iconInfo = data.weather[0].icon
    const iconURL = `https://openweathermap.org/img/wn/${iconInfo}@2x.png`
    const temp = document.querySelector(".temp_wrap span:nth-of-type(1)")
    const tempTxt = Math.ceil(data.main.temp)
    const weather = document.querySelector(".temp_wrap span:nth-of-type(2)")

    city.innerText = data.name;
    weatherIcon.setAttribute('src', iconURL)
    temp.innerText = `${tempTxt}°C`
    weather.innerText = data.weather[0].main
  })

}

function onGeoError () {
  alert("위치를 확인할 수 없습니다.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)