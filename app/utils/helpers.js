export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min
}

export function getRandomTile(tile, max) {
    return {
        x: getRandomNumber(0, max) * tile,
        y: getRandomNumber(0, max) * tile
    }
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[getRandomNumber(0, 16)];
    }
    return color;
}

export function getSnakeColor() {
    const {score, resetSnakeColor, previousSnakeColor} = getItems()

    if(resetSnakeColor) {
        var snakeColor = getRandomColor()

        setItems({ score, previousSnakeColor, resetSnakeColor: false  })
    } else {
        var snakeColor = previousSnakeColor || '#a98963'
    }

    return snakeColor;
}

export function getItems() {
    return JSON.parse(
        localStorage.getItem('__app_store__') ||
        JSON.stringify({score: 0, resetSnakeColor: false, previousSnakeColor: '#a98963'}))
}

export function setItems({score, previousSnakeColor, resetSnakeColor}) {
    localStorage.setItem(
        '__app_store__',
        JSON.stringify({
            score,
            resetSnakeColor,
            previousSnakeColor
        }))
}
