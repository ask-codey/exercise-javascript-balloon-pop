# Exercise: Balloon Pop

Exercise code for the lesson **Exercise: Balloon Pop** in JavaScript in Depth on [ask-codey.com](https://www.ask-codey.com).

Balloon Pop is the Maple Street Fair's booth game: balloons float up a canvas, and a tap pops one before it floats away. The page and its look are done, and so is the list of balloons. You'll write the JavaScript that draws the sky and the balloons on the canvas (a gradient, paths, circles and transforms), moves them up frame by frame with `requestAnimationFrame`, and pops the balloon a player taps, even when the canvas is shown smaller on a phone.

## Before you start

You need Node.js 24 or later (in a terminal, `node --version` should print `v24` or higher), and VS Code with the Live Preview extension to open the page.

## What's here

- `index.html`, `styles.css`: the page and its look. Ready to use. The canvas has 480 by 360 pixels, and the CSS shows it smaller on a narrow screen.
- `balloons.js`: five functions for the game's rules (radians, moving a balloon, turning a tap into canvas pixels, and finding the balloon under it), with no page involved. Each one gives back `null` or `0` for now. The comment above each one says what it should give back, with examples. For you to finish.
- `draw.js`: three functions that paint the sky, one balloon, and a whole frame on the canvas's context. Each one draws nothing for now; the comment above it lists exactly what to draw. For you to finish.
- `app.js`: connects the page to those functions. The balloons, the context and the first picture are ready; its four TODO comments are for you to finish.
- `balloons.test.js`, `draw.test.js`: the tests. `draw.test.js` hands your drawing functions a pretend context that writes down every call, since Node has no canvas. You don't need to change either file.
- `package.json`: tells Node that these files use `import` and `export`. Ready to use.

## What to do

Open the folder in VS Code, then open a terminal there (**Terminal > New Terminal**).

1. Finish `balloons.js`, then `draw.js`, running the tests as you go:

   ```bash
   node --test
   ```

   At first every test fails: that's expected. Each function you finish turns its tests green. A failing test's message says what it expected, for example *Translate first, then rotate, so the balloon tilts in place.*

2. Finish the TODOs in `app.js`. Open `index.html` with Live Preview (right-click it, **Show Preview**, or **Live Preview: Show Preview (External Browser)** for the developer tools), and work through the checklist below. Press **F12** and look at the **Console** when something doesn't work.

## Checklist for the page

- [ ] When the page opens, the sky fades from light blue at the top to nearly white at the bottom, and a few balloons hang in it, still. Each is an oval a little taller than it is wide, with a gray string, and most lean a little to one side.
- [ ] Pressing **Play** starts the balloons rising, each at its own speed, and the button now says **Pause**.
- [ ] A balloon that floats off the top, string and all, comes back up from below the bottom edge.
- [ ] Pressing **Pause** stops every balloon where it is, and the button says **Play** again. Pressing **Play** goes on from there, at the same speed as before.
- [ ] While the game plays, tapping or clicking a balloon pops it: it's gone at once, and the score says *Score: 1*, then *Score: 2*.
- [ ] Tapping the sky between balloons pops nothing and leaves the score alone. While the game is paused, a tap pops nothing.
- [ ] Where two balloons overlap, a tap pops only the one in front.
- [ ] With the mouse over a balloon, the pointer is a hand; over the sky, it's the usual arrow.
- [ ] Make the browser window narrow (or use the developer tools' phone view) so the canvas is shown smaller: a tap still pops the balloon under it, not one beside it.
- [ ] The **Play** button works from the keyboard: **Tab** to it, then **Enter** or the space bar.

## Tips

- `balloons.map((balloon) => moveBalloon(balloon, canvas.height))` gives a new array with every balloon one frame on.
- `moveBalloon` must not change the balloon it's given: `{ ...balloon, y: newY }` makes a copy with a new `y`.
- `toRadians` turns a tilt in degrees into the radians `ctx.rotate` wants.
- `draw.js` draws each balloon around `(0, 0)`: the translate puts it at the balloon's center. Save first and restore last.
- Stuck on a test? Read its message, then the comment above the function: the examples there are the tests' examples.

## Want more?

Once every box is ticked, try one of these. They have no tests: the page is your check.

- Give each balloon a shine with `createRadialGradient`, placed up and to the left of its center.
- When the last balloon pops, stop the loop and show *You popped them all!* above the canvas.
- Instead of disappearing, let a popped balloon come back from below the bottom at a new `x`, so the game never ends, and add a 30-second timer.

## Hand it in

When it works, put your solution in a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. You don't need Git: create the repo on GitHub, choose **Add file**, then **Upload files**, and upload everything in this folder. The lesson page shows each step, and the lesson *Put Your Code on GitHub* walks through every screen.
