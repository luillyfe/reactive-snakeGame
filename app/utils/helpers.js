export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min
}

export function getRandomTile(tile) {
    return {
        x: getRandomNumber(0, 25) * tile,
        y: getRandomNumber(0, 25) * tile
    }
}
