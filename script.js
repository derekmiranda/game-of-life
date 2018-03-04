const DRAW_INTERVAL = 500
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

const countLiveNeighbors = neighbors => neighbors.reduce((sum, neighbor) => {
  return neighbor ? sum + 1 : sum
}, 0)

function gatherNeighbors({ pt_x, pt_y, board }) {
  const neighbors = []
  for (let x = pt_x - 1; x <= pt_x + 1; x++) {
    for (let y = pt_y - 1; y <= pt_y + 1; y++) {
      if (x === pt_x && y === pt_y) continue
      neighbors.push(board[x] && board[x][y])
    }
  }
  return neighbors
}

function checkPointAgainstNeighbors({ x, y, board }) {
  const current = board[x][y]
  const neighbors = gatherNeighbors({ pt_x: x, pt_y: y, board })
  const liveNeighborCount = countLiveNeighbors(neighbors)

  if (current) {
    // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    if (liveNeighborCount < 2 || liveNeighborCount > 3) return false

    // Any live cell with two or three live neighbours lives on to the next generation.
    return true
  }

  // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.  
  if (liveNeighborCount === 3) return true

  return false
}

function calcNewBoard(board) {
  if (!board) return [[]]
  const newBoard = board.map((col, x) => {
    return col.map((pt, y) => checkPointAgainstNeighbors({ x, y, board }))
  }) 
  return newBoard
}

function drawPoint(ctx, x, y, fillStyle = 'navy') {
  ctx.fillStyle = fillStyle
  ctx.fillRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE)
}

function render(ctx, board, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  board.forEach((col, x) => {
    col.forEach((isAlive, y) => isAlive && drawPoint(ctx, x, y))
  })
}

function beginRenderLoop(ctx, board, canvas) {
  render(ctx, board, canvas)
  setTimeout(beginRenderLoop, DRAW_INTERVAL, ctx, calcNewBoard(board), canvas)
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
    createPoint(middle_x, middle_y + 1),
    createPoint(middle_x, middle_y + 2),
  ]

  const board = createBoard({
    width: resizedWidth,
    height: resizedHeight,
    points
  })

  beginRenderLoop(ctx, board, canvas)
}

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') main()
})