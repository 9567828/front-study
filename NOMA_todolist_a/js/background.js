const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
]

const randomImg = images[Math.floor(Math.random() * images.length)]

// const bgImg = document.createElement("img")
// bgImg.setAttribute("id", "bg")

// bgImg.src=`img/${randomImg}`

// document.body.appendChild(bgImg)


const bg = document.createElement("div")
bg.setAttribute("id", "bg")

const imgURL = `./img/${randomImg}`
bg.style.backgroundImage = "url('" + imgURL + "')"

document.body.appendChild(bg)