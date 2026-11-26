// Balloon Pop's drawing: three functions for you to finish, which paint on the canvas's 2D context, ctx.
// The tests hand them a pretend context that writes down every call, so they can check what was drawn without a
// browser. app.js hands them the real one.
import { toRadians, STRING_LENGTH } from './balloons.js';

// 1. drawSky(ctx, width, height)
//    Paint the whole canvas, from (0, 0), width wide and height tall, with a linear gradient that runs straight
//    down from the top, (0, 0), to the bottom, (0, height): light blue '#a8dadc' at stop 0 and nearly white
//    '#f1faee' at stop 1.
export function drawSky(ctx, width, height) {
}

// 2. drawBalloon(ctx, balloon)
//    Draw one balloon, in this order:
//    - save the context first, and restore it last, so nothing here changes the next balloon;
//    - translate to the balloon's center, (balloon.x, balloon.y);
//    - rotate by its tilt, turned into radians with toRadians;
//    - the string: a path from (0, balloon.radius) straight down to (0, balloon.radius + STRING_LENGTH),
//      stroked in gray '#555555', 2 pixels wide;
//    - scale(0.85, 1), so the balloon is an oval a little narrower than it is tall, and stays inside the circle
//      isInsideBalloon tests;
//    - the balloon: a full circle of balloon.radius around (0, 0), filled with balloon.color.
export function drawBalloon(ctx, balloon) {
}

// 3. drawScene(ctx, balloons, width, height)
//    Draw one whole frame: the sky first (it covers the whole canvas, so it also wipes the last frame), then every
//    balloon, in the array's order, so the last one is drawn on top.
export function drawScene(ctx, balloons, width, height) {
}
