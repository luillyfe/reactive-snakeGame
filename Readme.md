# snakeGame$

Snake game is a perfect story to be tell as a composition of Observables

  - Own implementation from Redux (not robux as Redux is but easy to reason about)
  - Javascript modules
  - Canvas API
  - Composing events using Observables

# Features!

  - The snake can be controlled by arrows
  - Snake food will be placed ramdonly on screen
  - Snake food has a random timeout between 4 and 10 seconds
  - Snake grows longer by one unit after eating the food
  - Eating one piece of food earns one point
  - If the snake hits a boundary, the size of the game area reduces by 113 pixels and the direction of the snake reverses
  - The game is over when the snake contacts itself
  - The dimensions of food and one segment of the snake are 16 pixels
  - The starting game area is 800px X 800px
  - A play again should be appear when the game is over
  - in the subsequent games, if the socres is greater than the previous one, change the color of the score/food
  - Eating special food gains 9 points and elongates the snake by 2 units
  - Special food must be any shape than a square
  - It must fit in a 28 pixels box
  - It is a random color
  - Special food timeout interval lies between 1 and 5 seconds

### Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server. (just express as a dependencie)

```sh
$ npm install -d
$ npm start
```

```sh
127.0.0.1:8000
```

License
----
MIT
