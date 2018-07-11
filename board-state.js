function applyToPlus({ board, x, y, changeCell }) {
  const points = [
    [x, y],
    [x, y-1],
    [x, y+1],
    [x-1, y],
    [x+1, y],
  ]

  points.forEach(point => {
    const [x, y] = point
    if (board[x] && board[x][y] !== undefined) {
      board[x][y] = changeCell(board[x][y])
    }
  })
} 

const { beginRenderLoop, render, turnCellOn } = (() => {
  let board
  function turnCellOn(board_x, board_y) {
    if (board) {
      applyToPlus({ board, x: board_x, y: board_y, changeCell: () => true })
    }
  }

  function render(ctx, board, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.forEach((col, x) => {
      col.forEach((isAlive, y) => isAlive && drawPoint(ctx, x, y))
    })
  }
  
  function beginRenderLoop(ctx, canvas, initBoard) {
    if (!board) board = initBoard
    render(ctx, board, canvas)
    board = calcNewBoard(board)
    setTimeout(beginRenderLoop, DRAW_INTERVAL, ctx, canvas)
  }

  return {
    turnCellOn,
    render,
    beginRenderLoop,
  }
})()
