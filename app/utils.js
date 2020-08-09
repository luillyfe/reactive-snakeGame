function getRandomNumber(max = 25, aux = 16) {
    return Math.floor(Math.random() * Math.floor(max)) * aux
}

export {
    getRandomNumber
}
