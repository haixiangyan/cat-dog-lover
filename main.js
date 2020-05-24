const SPACE_KEY = ' '
const ANALYSIS = 'analysis'
const DEFAULT_ANALYSIS = {
  cat: 0,
  dog: 0,
  lover: 0,
  total: 0
}

const COLOR = ['white', 'yellow', 'red']

const items = [
  {id: 'cat', text: '猫', img: 'img/cat.jpg'},
  {id: 'dog', text: '狗', img: 'img/dog.jpg'},
  {id: 'lover', text: '情人', img: 'img/lover.jpg'},
]

const $text = document.querySelector('#text')
const $result = document.querySelector('#result')
const $startButton = document.querySelector('#start')
const $resetButton = document.querySelector('#reset')
const analysisString = localStorage.getItem(ANALYSIS)
let analysis = analysisString ? JSON.parse(analysisString) : {...DEFAULT_ANALYSIS}

let start = false
let intervalId = null
let curt = 0

// 开始游戏
const startGame = () => {
  $startButton.textContent = '停'
  // 不断更新
  return setInterval(() => {
    curt = (curt + 1) % items.length

    $text.textContent = items[curt].text
    $text.style.color = COLOR[curt]
  }, 100)
}

// 结束游戏
const endGame = () => {
  $startButton.textContent = '点击开始/接空格'

  console.log('end', items[curt].img)
  $result.src = items[curt].img

  window.clearInterval(intervalId)
}

// 计数
const mark = () => {
  const visibleImage = items[curt]

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
  items.forEach(item => {
    const {id} = item
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
const main = () => {
  if (start) {
    mark()
    endGame()
  } else {
    intervalId = startGame()
  }

  start = !start
}

document.onkeydown = (e) => {
  e.preventDefault()

  if (e.key !== SPACE_KEY) return

  main()
}

$startButton.onclick = () => main()

// 监听重置
$resetButton.onclick = () => {
  analysis = {...DEFAULT_ANALYSIS}
  window.localStorage.setItem(ANALYSIS, JSON.stringify(analysis))
  initMark()
  document.body.click()
}

initMark()
