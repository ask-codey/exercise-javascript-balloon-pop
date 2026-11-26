// Balloon Pop's rules: five functions for you to finish. None of them touches the page, so the tests can check them with Node.
// draw.js and app.js use them.
//
// A balloon is an object like this one:
//   { x: 120, y: 300, radius: 30, color: '#e63946', tilt: -10, speed: 1.5 }
// x and y are its center on the canvas, radius its size, tilt how far it leans in degrees (a negative tilt leans
// left), and speed how many pixels it rises in each frame.

// Every balloon's string hangs this far below the balloon. Ready to use.
export const STRING_LENGTH = 60;

// 1. toRadians(degrees)
//    Return the angle in radians. A full turn, 360 degrees, is Math.PI * 2.
//    toRadians(180) -> Math.PI
//    toRadians(-10) -> about -0.1745
export function toRadians(degrees) {
  return 0;
}

// 2. moveBalloon(balloon, canvasHeight)
//    Return a NEW balloon object one frame later: the same as balloon, except that its y is speed pixels smaller,
//    so it's higher on the canvas. Don't change the balloon you were given.
//    When the balloon and its string have floated off the top (the new y + radius + STRING_LENGTH is less than 0),
//    it starts again below the bottom instead: its y is canvasHeight + radius.
//    moveBalloon({ x: 120, y: 300, radius: 30, color: '#e63946', tilt: -10, speed: 2 }, 360)
//      -> { x: 120, y: 298, radius: 30, color: '#e63946', tilt: -10, speed: 2 }
//    moveBalloon({ x: 120, y: -95, radius: 30, color: '#e63946', tilt: -10, speed: 2 }, 360)
//      -> the same, with y: 390 (-97 + 30 + 60 is -7: off the top, so it starts again at 360 + 30)
export function moveBalloon(balloon, canvasHeight) {
  return null;
}

// 3. toCanvasPoint(offsetX, offsetY, canvas)
//    Turn a pointer event's offsetX and offsetY, measured in the pixels shown on the page, into the canvas's own
//    pixels. canvas has width and height (how many pixels it has) and clientWidth and clientHeight (how big it's
//    shown). Return an object { x, y }.
//    toCanvasPoint(60, 45, { width: 480, height: 360, clientWidth: 240, clientHeight: 180 }) -> { x: 120, y: 90 }
//    toCanvasPoint(60, 45, { width: 480, height: 360, clientWidth: 480, clientHeight: 360 }) -> { x: 60, y: 45 }
export function toCanvasPoint(offsetX, offsetY, canvas) {
  return null;
}

// 4. isInsideBalloon(x, y, balloon)
//    Return true when the point (x, y) is no further from the balloon's center than its radius (a point exactly on
//    the edge counts as inside), and false when it's further.
//    isInsideBalloon(260, 180, { x: 240, y: 150, radius: 40, ... }) -> true  (36 pixels from the center)
//    isInsideBalloon(270, 180, { x: 240, y: 150, radius: 40, ... }) -> false (42 pixels from the center)
export function isInsideBalloon(x, y, balloon) {
  return null;
}

// 5. balloonIndexAt(balloons, x, y)
//    Return the index of the balloon under the point (x, y). Where balloons overlap, the one later in the array is
//    drawn on top, so check from the last balloon to the first and return the first hit. Return -1 when no balloon
//    is there.
//    With red at index 0 and teal at index 1 overlapping, a point inside both -> 1
export function balloonIndexAt(balloons, x, y) {
  return null;
}
