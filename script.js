const DRAW_INTERVAL = 1000
const PIXEL_SCALE = 4

const createPoint = (x, y) => ({ x, y })
const createBoard = ({ width, height, points }) => {
  const createColArr = (yVals, x) => {
    const colArr = new Array(height).fill(false)
    yVals.forEach(y => {
      colArr[y] = true
    })
    return colArr
  }

  const boardArr = []
  for (let curr_x = 0; curr_x <= width; curr_x++) {
    const yVals = points.filter(pt => pt.x === curr_x).map(pt => pt.y)
    const colArr = createColArr(yVals, curr_x)
    boardArr.push(colArr)
  }
  return boardArr
}

function checkPointAgainstNeighbors({ x, y, points }) {
  // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  // Any live cell with two or three live neighbours lives on to the next generation.
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  
}

function calcNewBoard(pts) {
  if (!pts) return []


}

function drawPoint(ctx, x, y, fillStyle = 'navy') {
  ctx.fillStyle = fillStyle
  ctx.fillRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE)
}

function render(ctx, board) {
  board.forEach((col, x) => {
    col.forEach((isAlive, y) => isAlive && drawPoint(ctx, x, y))
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
  const middle_x = ~~(resizedWidth / 2)
  const middle_y = ~~(resizedHeight / 2)
  const points = [
    createPoint(middle_x, middle_y),
    createPoint(middle_x + 1, middle_y),
  ]

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