export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min
}

export function getRandomTile(tile, max) {
    return {
        x: getRandomNumber(0, max) * tile,
        y: getRandomNumber(0, max) * tile
    }
}
