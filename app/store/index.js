import {Observable} from "./Observable.js";
import {getRandomNumber} from "../utils.js";


let store$ = Observable.fromEvent(document, 'keydown')
    .filter(({key}) => {
        return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)
    }).map(({key}) => {
        return key
    }).map(key => {
        let {snake, food, path, tile} = getState();
        snake = updateSnake({key, snake, tile, food, path});
        save({snake, food, tile, path})
        return {key, snake, food, tile}
    })

let timeout$ = Observable.fromTimeout(5000).map(() => {
    let {snake, food, tile, path} = getState();
    let newFoodPosition = {x: getRandomNumber(), y: getRandomNumber()};
    save({snake, food: {...food, position: newFoodPosition}, tile, path})
    return {snake, food: {...food, position: newFoodPosition}, tile, path};
})

let game$ = timeout$.mergeMap(store$);

function updateSnake({key, snake, tile, food, path}) {
    const {x, y} = snake.position.pop()
    let newPosition = {};

    switch (key) {
        case 'ArrowUp': {
            newPosition = {x, y: y - tile}
            break;
        }
        case 'ArrowDown': {
            newPosition = {x, y: y + tile}
            break;
        }
        case 'ArrowLeft': {
            newPosition = {x: x - tile, y}
            break;
        }
        case 'ArrowRight': {
            newPosition = {x: x + tile, y}
            break;
        }
    }

    if (x === food.position.x && y === food.position.y) {
        snake.units += 1;
    }

    path.push(newPosition)
    return {...snake, position: path.slice(-snake.units)}
}

function save({snake, food, tile, path}) {
    let currentState = JSON.parse(localStorage.getItem('__app__store__') || '{}');
    let newState = {...currentState, snake, food, tile, path}

    localStorage.setItem('__app__store__', JSON.stringify(newState));
}

function getState() {
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
        path: []
    }
    return JSON.parse(localStorage.getItem('__app__store__') || JSON.stringify(appStoreInit));
}

export {
    game$
}
