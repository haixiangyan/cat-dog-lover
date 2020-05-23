const $imgs = Array.from(document.querySelectorAll('img'))

let start = false
let intervalId = null
let curt = 0

// 开始游戏
const startGame = () => {
  // 不断更新
  return setInterval(() => {
    // 隐藏上一张
    $imgs[curt].style.opacity = '0'

    // 下一张
    curt = (curt + 1) % $imgs.length

    // 显示下一张
    $imgs[curt].style.opacity = '1'
  }, 20)
}

// 结束游戏
const endGame = () => {
  window.clearInterval(intervalId)
}

// 按下任意按钮开始/结束游戏
document.onkeydown = () => {
  if (start) {
    endGame()
  } else {
    intervalId = startGame()
  }

  start = !start
}

// 显示第一个图片
const [$cat] = $imgs
$cat.style.opacity = '1'

alert('按下空格开始和结束，看你做猫，做狗还是做情人 :)')
