init();

function init() {
    let {snake, food} = getSnakeAndFood();

    draw([snake, food]);
    document.addEventListener('keydown', keysHandler)
}

function keysHandler({key}) {
    let keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (keys.includes(key)) {
        moveSnake(key)
    }
}

function moveSnake(key) {
    const unit = 16;
    let {snake, food} = getSnakeAndFood();

    switch (key) {
        case 'ArrowUp': {
            let newPosition = {x: snake.position.x, y: snake.position.y - unit}
            draw([{...snake, position: newPosition}, food])
            break;
        }
        case 'ArrowDown': {
            let newPosition = {x: snake.position.x, y: snake.position.y + unit}
            draw([{...snake, position: newPosition}, food])
            break;
        }
        case 'ArrowLeft': {
            let newPosition = {x: snake.position.x - unit, y: snake.position.y}
            draw([{...snake, position: newPosition}, food])
            break;
        }
        case 'ArrowRight': {
            let newPosition = {x: snake.position.x + unit, y: snake.position.y}
            draw([{...snake, position: newPosition}, food])
            break;
        }
    }
}

function draw(figures) {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    figures.forEach(figure => {
        let {color, position, dimensions} = figure;

        context.fillStyle = color;
        context.fillRect(position.x, position.y, dimensions.w, dimensions.h)

        save(figure);
    });
}

function save(figure) {
    let currentState = JSON.parse(localStorage.getItem('__app__store__') || '{}');
    let newState = {...currentState, [figure.type]: figure}

    localStorage.setItem('__app__store__', JSON.stringify(newState));
}

function getSnakeAndFood() {
    let appStoreInit = {
        snake: {
            type: 'snake',
            color: 'white', position: {x: 0, y: 0},
            dimensions: {w: 16, h: 16}
        },
        food: {
            type: 'food',
            color: 'gray',
            position: {x: 160, y: 160},
            dimensions: {w: 16, h: 16}
        }
    }
    return  JSON.parse(localStorage.getItem('__app__store__') || {}) || appStoreInit;
}
