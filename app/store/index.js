import {Observable} from "./Observable.js";
import {getRandomNumber} from "../utils.js";

let appStoreInit = {
    snake: {
        type: 'snake',
        color: 'white',
        position: [{x: 0, y: 0}],
        units: 1
    },
    food: {
        type: 'food',
        color: 'gray',
        position: {x: 160, y: 160}
    },
    tile: 16,
    path: [],
    user: {
        points: 0
    }
}

let snakeMoves$ = Observable.fromEvent(document, 'keydown')
    .filter(({key}) => {
        return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)
    }).map(({key}) => {
        return key
    }).map(key => {
        let {snake, food, path, tile, user} = getState();
        snake = updateSnake({key, snake, tile, food, path});
        save({snake, food, tile, path, user: {...user, points: snake.units}})
        return {key, snake, food, tile}
    })

let placingFood$ = Observable.fromTimeout(0).map(() => {
    let {snake, food, tile, path, user} = getState();
    let newFoodPosition = {x: getRandomNumber(), y: getRandomNumber()};
    save({snake, food: {...food, position: newFoodPosition}, tile, path, user})
    return {snake, food: {...food, position: newFoodPosition}, tile, path};
})

let cancelButton = document.getElementById('cancel')
let cancel$ = Observable.fromEvent(cancelButton, 'click');

let game$ = placingFood$
    .mergeMap(snakeMoves$)
    .takeUntil(cancel$);

function updateSnake({key, snake, tile, food, path}) {
    const {x, y} = snake.position.pop()
    let newPosition = _updateInternal(key, {x, y}, tile)

    if (x === food.position.x && y === food.position.y) {
        snake.units += 1;
    }

    if (snakeHittedBoundary(newPosition)) {
        newPosition = _updateInternal(getInverseKey(key), {x, y}, tile)
    }

    if (snakeContactItself(newPosition, snake.position)) {
        cancelButton.click()
    }

    path.push(newPosition)
    return {...snake, position: path.slice(-snake.units)}
}

function snakeContactItself(newPosition, snakePosition) {
    let diff = snakePosition.filter(({x, y}) => {
        return newPosition.x === x && newPosition.y === y
    })

    return diff.length
}

/***
 * TODO:
 * ISSUE: if head is in a corner, the snake falls out the canvas
 * IDEA: reverse direction but in a different line
 */
function getInverseKey(key) {
    switch (key) {
        case 'ArrowUp': return 'ArrowRight'
        case 'ArrowDown': return 'ArrowLeft'
        case 'ArrowLeft': return 'ArrowUp'
        case 'ArrowRight': return 'ArrowDown'
    }
}

function _updateInternal(key, {x, y}, tile) {
    switch (key) {
        case 'ArrowUp': return {x, y: y - tile}
        case 'ArrowDown': return {x, y: y + tile}
        case 'ArrowLeft': return {x: x - tile, y}
        case 'ArrowRight': return {x: x + tile, y}
    }
}

/***
 * TODO: Decrese game area when snake hits a boundary
 */
function decreaseGameArea(decresedValue) {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.canvas.width  = context.canvas.width - decresedValue;
    context.canvas.height = context.canvas.height - decresedValue;
}

function snakeHittedBoundary(snakeHeadPosition) {
    let {x, y} = snakeHeadPosition;

    if(x >= 400 || x < 0 || y >= 400 || y < 0 ) {
        return true
    }
    return false
}

function save({snake, food, tile, path, user}) {
    let currentState = JSON.parse(localStorage.getItem('__app__store__') || '{}');
    let newState = {...currentState, snake, food, tile, path, user}

    localStorage.setItem('__app__store__', JSON.stringify(newState));
}

function getState() {
    return JSON.parse(localStorage.getItem('__app__store__') || JSON.stringify(appStoreInit));
}

export {
    game$
}
