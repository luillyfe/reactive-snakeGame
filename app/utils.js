function getRandomNumber(max = 25, aux = 16, min = 0) {
    return (Math.floor(Math.random() * Math.floor(max)) * aux) + min
}

export {
    getRandomNumber
}
