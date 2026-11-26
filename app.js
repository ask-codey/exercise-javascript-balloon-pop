// Connects the Balloon Pop page to balloons.js and draw.js.
// The balloons, the context and the first picture are ready to use. The four TODOs are for you to finish: the
// checklist in README.md says what the page should do when they're done.
import { moveBalloon, toCanvasPoint, balloonIndexAt } from './balloons.js';
import { drawScene } from './draw.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreText = document.getElementById('score');
const playButton = document.getElementById('play-button');

// Ready to use: the eight balloons, some already in the sky and some still below the bottom edge.
let balloons = [
  { x: 60, y: 250, radius: 30, color: '#e63946', tilt: -10, speed: 1.2 },
  { x: 130, y: 420, radius: 26, color: '#2a9d8f', tilt: 8, speed: 1.6 },
  { x: 200, y: 170, radius: 34, color: '#f6c945', tilt: -4, speed: 1 },
  { x: 270, y: 480, radius: 28, color: '#457b9d', tilt: 12, speed: 1.8 },
  { x: 340, y: 300, radius: 30, color: '#e76f51', tilt: -12, speed: 1.4 },
  { x: 410, y: 560, radius: 26, color: '#8338ec', tilt: 6, speed: 2 },
  { x: 100, y: 640, radius: 30, color: '#06d6a0', tilt: 0, speed: 1.3 },
  { x: 380, y: 700, radius: 32, color: '#ef476f', tilt: -8, speed: 1.1 },
];
let score = 0;
let frameId = null;

// TODO 1: frame() draws one frame. Move every balloon one frame on with moveBalloon (it gives back new balloon
// objects, so build a new array), draw the scene with drawScene, and ask for the next frame with
// requestAnimationFrame, keeping its id in frameId.
function frame() {
}

// TODO 2: the Play button. When no loop is running (frameId is null), start one and change the button's text to
// Pause. Otherwise stop it with cancelAnimationFrame, set frameId back to null, and change the text to Play.

// TODO 3: pop a balloon. When the pointer goes down on the canvas while the game is playing, turn the pointer's
// position into canvas pixels and find the balloon under it. If there is one, take it out of balloons, add 1 to the
// score, and show it as "Score: 3" in the score paragraph. While the game is paused, a tap pops nothing.

// TODO 4: a hand over a balloon. As the pointer moves over the canvas, set the canvas's cursor to 'pointer' when
// it's over a balloon, and to 'default' when it isn't.

// Ready to use: the first picture, before Play is pressed.
drawScene(ctx, balloons, canvas.width, canvas.height);
