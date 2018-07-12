const DRAW_INTERVAL = 100;
const PIXEL_SCALE = 4;

function drawPoint(ctx, x, y, fillStyle = "navy") {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x * PIXEL_SCALE, y * PIXEL_SCALE, PIXEL_SCALE, PIXEL_SCALE);
}

const createClickCoordAdjuster = canvas => {
  const { x, y } = canvas.getBoundingClientRect();
  return (clientX, clientY) => {
    const canvas_x = clientX - x;
    const canvas_y = clientY - y;
    const board_x = roundNum(canvas_x / PIXEL_SCALE);
    const board_y = roundNum(canvas_y / PIXEL_SCALE);
    return {
      x: board_x,
      y: board_y
    };
  };
};

const createBoardFlipper = clickCoordAdjuster => {
  return ({ clientX, clientY, buttons }) => {
    const { x, y } = clickCoordAdjuster(clientX, clientY);
    turnCellOn(x, y);
  };
};

function main() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const clickCoordAdjuster = createClickCoordAdjuster(canvas);
  const flipBoard = createBoardFlipper(clickCoordAdjuster);

  canvas.addEventListener("mousemove", event => {
    if (event.buttons !== 1) return;
    flipBoard(event);
  });
  canvas.addEventListener("click", flipBoard);

  const resizedWidth = canvas.width / PIXEL_SCALE;
  const resizedHeight = canvas.height / PIXEL_SCALE;
  const middle_x = ~~(resizedWidth / 2);
  const middle_y = ~~(resizedHeight / 2);
  const points = [
    createPoint(middle_x, middle_y),
    createPoint(middle_x, middle_y + 1),
    createPoint(middle_x, middle_y + 2)
  ];

  const initBoard = createBoard({
    width: resizedWidth,
    height: resizedHeight,
    points
  });

  beginRenderLoop(ctx, canvas, initBoard);
}

document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") main();
});
