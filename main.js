const catImage = 'img/cat.jpg'
const dogImage = 'img/dog.jpg'
const loverImage = 'img/lover.jpg'

const images = [catImage, dogImage, loverImage]

const $image = document.querySelector('#image')

let intervalId = null

const startGame = () => {
  let curt = 0
  // 不断更新
  return setInterval(() => {
    // 更新图片
    $image.src = images[curt]
    // 下一张
    curt = (curt + 1) % images.length
  }, 1000)
}

const endGame = () => {
  window.clearInterval(intervalId)
}

let start = false
document.onkeydown = () => {
  if (start) {
    endGame()
  } else {
    intervalId = startGame()
  }

  start = !start
}
