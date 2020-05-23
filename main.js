const SPACE_KEY = ' '
const ANALYSIS = 'analysis'
const DEFAULT_ANALYSIS = {
  cat: 0,
  dog: 0,
  lover: 0,
  total: 0
}

const $imgs = Array.from(document.querySelectorAll('img'))
const analysisString = localStorage.getItem(ANALYSIS)
let analysis = analysisString ? JSON.parse(analysisString) : {...DEFAULT_ANALYSIS}

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

// 计数
const mark = () => {
  const visibleImage = $imgs.find(i => i.style.opacity === '1')

  if (visibleImage) {
    const {id} = visibleImage

    // 类型 + 1
    if (!(id in analysis)) { analysis[id] = 0 }
    analysis[id] += 1

    // 总数 + 1
    if (!('total' in analysis)) { analysis.total = 0 }
    analysis.total += 1

    update(id, analysis[id], analysis.total)
  }

  // 保存
  window.localStorage.setItem(ANALYSIS, JSON.stringify(analysis))
}

// 初始化计数
const initMark = () => {
  $imgs.forEach($img => {
    const {id} = $img
    update(id, analysis[id], analysis.total)
  })
}

// 更新到面板上
const update = (imageId, count, total) => {
  const $item = document.querySelector(`#${imageId}-count`)
  const $total = document.querySelector('#total-count')

  if ($item.innerText) {
    $item.innerText = count
    $total.innerText = total
  } else if ($item.textContent) {
    $item.textContent = count
    $total.textContent = total
  } else {
    $item.innerHTML = count
    $total.innerHTML = total
  }
}

// 按下任意按钮开始/结束游戏
document.onkeydown = (e) => {
  e.preventDefault()

  if (e.key !== SPACE_KEY) return

  if (start) {
    mark()
    endGame()
  } else {
    intervalId = startGame()
  }

  start = !start
}

// 监听重置
document.querySelector('#reset').onclick = () => {
  analysis = {...DEFAULT_ANALYSIS}
  window.localStorage.setItem(ANALYSIS, JSON.stringify(analysis))
  initMark()
  document.body.click()
}

// 显示第一个图片
const [$cat] = $imgs
$cat.style.opacity = '1'

initMark()
