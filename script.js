const DRAW_INTERVAL = 1000
const PIXEL_SCALE = 4

const createPoint = (x, y) => ({ x, y })
const createBoard = ({ width, height, points }) => {
  const createRowArr = (xVals, y) => {
    const rowArr = new Array(width).fill(false)
    xVals.forEach(x => {
      rowArr[x] = true
    })
    return rowArr
  }

  const boardArr = []
  for (let curr_y = 0; curr_y <= height; curr_y++) {
    const xVals = points.filter(pt => pt.y === curr_y).map(pt => pt.x)
    const rowArr = createRowArr(xVals, curr_y)
    boardArr.push(rowArr)
  }
  return boardArr
}

function calcNewBoard(pts) {
  if (!pts) return []

  // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
}

function drawPoint(ctx, x, y, fillStyle = 'navy') {
  ctx.fillStyle = fillStyle
  ctx.fillRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE)
}

function render(ctx, board) {
  board.forEach((row, y) => {
    row.forEach((isAlive, x) => isAlive && drawPoint(ctx, x, y))
  })
}

function beginRenderLoop(ctx, board) {
  render(ctx, board)
  setTimeout(beginRenderLoop, DRAW_INTERVAL, ctx, calcNewBoard(board))
}

function randomPoints(n, w, h) {
  return new Array(n).fill(true).map(_ => {
    const x = ~~(Math.random() * w)
    const y = ~~(Math.random() * h)
    return createPoint(x, y)
  })
}

function main() {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const resizedWidth = canvas.width / PIXEL_SCALE 
  const resizedHeight = canvas.height / PIXEL_SCALE 
  const points = randomPoints(5, resizedWidth, resizedHeight)

  const board = createBoard({
    width: resizedWidth,
    height: resizedHeight,
    points
  })

  // beginRenderLoop()
  render(ctx, board)
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') main()
})