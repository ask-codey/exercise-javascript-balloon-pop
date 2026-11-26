// Tests for balloons.js. Run them with: node --test
// They call your five functions with balloons from Balloon Pop and check what each one returns.
// You don't need to change this file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toRadians, moveBalloon, toCanvasPoint, isInsideBalloon, balloonIndexAt } from './balloons.js';

const red = { x: 120, y: 300, radius: 30, color: '#e63946', tilt: -10, speed: 2 };

test('toRadians: degrees become radians', () => {
  assert.equal(toRadians(180), Math.PI, '180 degrees is half a turn: Math.PI.');
  assert.equal(toRadians(90), Math.PI / 2, '90 degrees is a quarter turn: Math.PI / 2.');
  assert.ok(Math.abs(toRadians(-10) - -0.17453292519943295) < 1e-12,
    '-10 degrees (a balloon leaning left) is about -0.1745 radians: multiply by Math.PI, divide by 180.');
});

test('moveBalloon: a balloon rises by its speed, in a new object', () => {
  const moved = moveBalloon(red, 360);
  assert.deepEqual(moved, { ...red, y: 298 },
    'A balloon at y 300 with speed 2 is at y 298 one frame later, with everything else the same.');
  assert.equal(red.y, 300, 'Return a new object: the balloon you were given keeps its y of 300.');
});

test('moveBalloon: a balloon that has floated off the top starts again below the bottom', () => {
  assert.deepEqual(moveBalloon({ ...red, y: -95 }, 360), { ...red, y: 390 },
    'From y -95, the new y is -97, and -97 + 30 + 60 is -7: the string is gone too, so it starts again at 360 + 30.');
  assert.deepEqual(moveBalloon({ ...red, y: -85 }, 360), { ...red, y: -87 },
    'From y -85, the new y is -87, and -87 + 30 + 60 is 3: the end of the string still shows, so it keeps rising.');
});

test('toCanvasPoint: shown pixels become the canvas\'s own pixels', () => {
  assert.deepEqual(toCanvasPoint(60, 45, { width: 480, height: 360, clientWidth: 240, clientHeight: 180 }),
    { x: 120, y: 90 }, 'Shown at half size, a tap at (60, 45) is the canvas\'s (120, 90).');
  assert.deepEqual(toCanvasPoint(60, 45, { width: 480, height: 360, clientWidth: 480, clientHeight: 360 }),
    { x: 60, y: 45 }, 'Shown full size, nothing changes.');
  assert.deepEqual(toCanvasPoint(100, 50, { width: 480, height: 360, clientWidth: 960, clientHeight: 720 }),
    { x: 50, y: 25 }, 'Shown twice as big, a tap at (100, 50) is the canvas\'s (50, 25).');
});

test('isInsideBalloon: inside means no further from the center than the radius', () => {
  const big = { x: 240, y: 150, radius: 40, color: '#e63946', tilt: 0, speed: 1 };
  assert.equal(isInsideBalloon(260, 180, big), true, '(260, 180) is 36 pixels from (240, 150): inside a radius of 40.');
  assert.equal(isInsideBalloon(270, 180, big), false,
    '(270, 180) is 42 pixels from the center: outside, though it\'s inside the square around the balloon.');
  assert.equal(isInsideBalloon(280, 150, big), true, '(280, 150) is exactly 40 pixels away, on the edge: that counts as inside.');
});

test('balloonIndexAt: finds the top balloon under the point, or -1', () => {
  const balloons = [
    { x: 120, y: 150, radius: 40, color: '#e63946', tilt: 0, speed: 1 },
    { x: 150, y: 160, radius: 40, color: '#2a9d8f', tilt: 0, speed: 1 },
    { x: 360, y: 170, radius: 40, color: '#f6c945', tilt: 0, speed: 1 },
  ];
  assert.equal(balloonIndexAt(balloons, 135, 155), 1,
    '(135, 155) is inside red (index 0) and teal (index 1); teal is later in the array, so it\'s on top.');
  assert.equal(balloonIndexAt(balloons, 90, 150), 0, '(90, 150) is inside red only.');
  assert.equal(balloonIndexAt(balloons, 240, 300), -1, '(240, 300) is empty sky: -1.');
  assert.equal(balloonIndexAt([], 135, 155), -1, 'With every balloon popped, nothing is hit: -1.');
});
