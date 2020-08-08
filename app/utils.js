function getRandomNumber(max = 25) {
    return Math.floor(Math.random() * Math.floor(max)) * 16
}

export {
    getRandomNumber
}
