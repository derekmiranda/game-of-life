const DRAW_INTERVAL = 1000
const Point = (x, y) => ({ x, y })
const Board = ({ width, height, points }) => {
  const createRowArr = (xVals, y) => {
    const rowArr = new Array(height).fill(false)
    xVals.forEach(x => {
      console.log('x', x)
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

function drawPoint(ctx, x, y, fillStyle = 'salmon') {
  ctx.fillStyle = fillStyle
  ctx.fillRect(x, y, 1, 1)
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

function main() {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const board = Board({
    width: canvas.width,
    height: canvas.height,
    points
  })

  // beginRenderLoop()
  render(ctx, board)
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') main()
})