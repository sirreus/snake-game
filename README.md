# Snake game

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). \
Simple Classic Snake game developed by React + Typescript.

## Game rules

In this game, you have a playing field measuring 50x50 points. Objects (food) randomly appear on this Field, which must be “eaten” by your snake, also located on this Field. The snake's movement is set automatically, you only control the direction of the snake itself, and its movement speed increases by 0.3 points for each food eaten.

The snake is controlled using the buttons on the keyboard: **UP, RIGHT, DOWN, LEFT** (arrows).

The game ends if:

- if the snake eats itself (_for example, your snake moves to the LEFT, and you pressed the RIGHT key_)
- if the snake has a neck (_more than one square in size_) and crosses the field's border.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.
