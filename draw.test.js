// Tests for draw.js. Run them with: node --test
// Node has no canvas, so these tests hand your functions a pretend context that writes down every method they call,
// with the fillStyle, strokeStyle and lineWidth set at that moment. Then they check the list.
// You don't need to change this file.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drawSky, drawBalloon, drawScene } from './draw.js';

const methods = ['save', 'restore', 'translate', 'rotate', 'scale', 'beginPath', 'moveTo', 'lineTo', 'arc', 'ellipse',
  'closePath', 'fill', 'stroke', 'fillRect', 'strokeRect', 'clearRect', 'fillText', 'resetTransform', 'setTransform'];

function recordingContext() {
  const calls = [];
  const ctx = { calls, fillStyle: '#000000', strokeStyle: '#000000', lineWidth: 1 };
  for (const name of methods) {
    ctx[name] = (...args) => {
      calls.push({ name, args, fillStyle: ctx.fillStyle, strokeStyle: ctx.strokeStyle, lineWidth: ctx.lineWidth });
    };
  }
  ctx.createLinearGradient = (...args) => {
    const gradient = { kind: 'linear gradient', args, stops: [] };
    gradient.addColorStop = (offset, color) => gradient.stops.push([offset, color]);
    calls.push({ name: 'createLinearGradient', args });
    return gradient;
  };
  ctx.createRadialGradient = (...args) => {
    const gradient = { kind: 'radial gradient', args, stops: [] };
    gradient.addColorStop = (offset, color) => gradient.stops.push([offset, color]);
    calls.push({ name: 'createRadialGradient', args });
    return gradient;
  };
  return ctx;
}

function names(ctx) {
  return ctx.calls.map((call) => call.name);
}

const red = { x: 120, y: 300, radius: 30, color: '#e63946', tilt: -10, speed: 2 };

test('drawSky: a light blue to white gradient, top to bottom, over the whole canvas', () => {
  const ctx = recordingContext();
  drawSky(ctx, 480, 360);
  const gradient = ctx.calls.find((call) => call.name === 'createLinearGradient');
  assert.ok(gradient, 'Make the sky with ctx.createLinearGradient.');
  assert.deepEqual(gradient.args, [0, 0, 0, 360], 'The gradient runs straight down: from (0, 0) to (0, 360).');
  const fill = ctx.calls.find((call) => call.name === 'fillRect');
  assert.ok(fill, 'Paint the sky with ctx.fillRect.');
  assert.deepEqual(fill.args, [0, 0, 480, 360], 'The sky covers the whole canvas: fillRect(0, 0, 480, 360).');
  assert.equal(fill.fillStyle.kind, 'linear gradient', 'Set fillStyle to the gradient before fillRect.');
  assert.deepEqual(fill.fillStyle.stops, [[0, '#a8dadc'], [1, '#f1faee']],
    'Two color stops: light blue #a8dadc at 0, the top, and nearly white #f1faee at 1, the bottom.');
});

test('drawBalloon: saves the context first and restores it last', () => {
  const ctx = recordingContext();
  drawBalloon(ctx, red);
  const called = names(ctx);
  assert.equal(called[0], 'save', 'The first call is ctx.save(), before any transform.');
  assert.equal(called[called.length - 1], 'restore', 'The last call is ctx.restore(), so the next balloon starts clean.');
  assert.equal(called.filter((name) => name === 'save').length, called.filter((name) => name === 'restore').length,
    'Every save() needs its own restore().');
});

test('drawBalloon: moves to the balloon\'s center, then tilts it, in radians', () => {
  const ctx = recordingContext();
  drawBalloon(ctx, red);
  const translate = ctx.calls.findIndex((call) => call.name === 'translate');
  const rotate = ctx.calls.findIndex((call) => call.name === 'rotate');
  assert.ok(translate !== -1, 'Move to the balloon with ctx.translate.');
  assert.deepEqual(ctx.calls[translate].args, [120, 300], 'Translate to the balloon\'s center: (120, 300).');
  assert.ok(rotate !== -1, 'Tilt the balloon with ctx.rotate.');
  assert.ok(Math.abs(ctx.calls[rotate].args[0] - -0.17453292519943295) < 1e-12,
    'A tilt of -10 degrees is rotate(toRadians(-10)), about -0.1745 radians.');
  assert.ok(translate < rotate, 'Translate first, then rotate, so the balloon tilts in place.');
});

test('drawBalloon: the string is a gray line, 2 pixels wide, from the balloon\'s bottom down 60 pixels', () => {
  const ctx = recordingContext();
  drawBalloon(ctx, red);
  const moveTo = ctx.calls.find((call) => call.name === 'moveTo');
  const lineTo = ctx.calls.find((call) => call.name === 'lineTo');
  assert.ok(moveTo && lineTo, 'Draw the string as a path: moveTo, then lineTo.');
  assert.deepEqual(moveTo.args, [0, 30], 'The string starts at the balloon\'s bottom: (0, radius), here (0, 30).');
  assert.deepEqual(lineTo.args, [0, 90], 'It ends STRING_LENGTH lower: (0, 30 + 60), here (0, 90).');
  const stroke = ctx.calls.find((call) => call.name === 'stroke');
  assert.ok(stroke, 'Ink the string with ctx.stroke().');
  assert.equal(stroke.strokeStyle, '#555555', 'Set strokeStyle to gray #555555 before stroke().');
  assert.equal(stroke.lineWidth, 2, 'Set lineWidth to 2 before stroke().');
});

test('drawBalloon: an oval of the balloon\'s color: scale(0.85, 1), then a full circle, filled', () => {
  const ctx = recordingContext();
  drawBalloon(ctx, red);
  const rotate = ctx.calls.findIndex((call) => call.name === 'rotate');
  const scale = ctx.calls.findIndex((call) => call.name === 'scale');
  const arc = ctx.calls.findIndex((call) => call.name === 'arc');
  assert.ok(scale !== -1, 'Make the oval with ctx.scale.');
  assert.deepEqual(ctx.calls[scale].args, [0.85, 1], 'scale(0.85, 1): 85% as wide, just as tall.');
  assert.ok(arc !== -1, 'Draw the balloon with ctx.arc.');
  assert.deepEqual(ctx.calls[arc].args, [0, 0, 30, 0, Math.PI * 2],
    'A full circle of the balloon\'s radius around (0, 0): arc(0, 0, 30, 0, Math.PI * 2).');
  assert.ok(rotate < scale && scale < arc, 'In this order: rotate, then scale, then the circle.');
  const fill = ctx.calls.slice(arc).find((call) => call.name === 'fill');
  assert.ok(fill, 'Paint the circle with ctx.fill().');
  assert.equal(fill.fillStyle, '#e63946', 'Fill it with the balloon\'s own color: here #e63946.');
});

test('drawScene: the sky first, then every balloon in the array\'s order', () => {
  const ctx = recordingContext();
  const balloons = [
    { x: 60, y: 250, radius: 30, color: '#e63946', tilt: -10, speed: 1.2 },
    { x: 200, y: 170, radius: 34, color: '#f6c945', tilt: -4, speed: 1 },
    { x: 340, y: 300, radius: 30, color: '#e76f51', tilt: -12, speed: 1.4 },
  ];
  drawScene(ctx, balloons, 480, 360);
  const sky = ctx.calls.findIndex((call) => call.name === 'fillRect');
  const firstTranslate = ctx.calls.findIndex((call) => call.name === 'translate');
  assert.ok(sky !== -1, 'Paint the sky with drawSky.');
  assert.deepEqual(ctx.calls[sky].args, [0, 0, 480, 360], 'The sky covers the whole 480 by 360 canvas.');
  assert.ok(firstTranslate === -1 || sky < firstTranslate, 'The sky comes first, so the balloons are drawn on top of it.');
  const centers = ctx.calls.filter((call) => call.name === 'translate').map((call) => call.args);
  assert.deepEqual(centers, [[60, 250], [200, 170], [340, 300]],
    'Draw every balloon with drawBalloon, in the array\'s order: (60, 250), then (200, 170), then (340, 300).');
});
