import {MOVE_SNAKE} from "./snake.js";
import {UPDATE_PATH} from "./game.js";
import {PLACE_FOOD} from "./food.js";
import {getRandomNumber} from "../utils/index.js";

export const moveSnakeAction = store => key => {
    const { tile } = store.getState()

    store.dispatch({
        type: UPDATE_PATH,
        payload: {key, tile}
    })

    const { game } = store.getState()

    store.dispatch({
        type: MOVE_SNAKE,
        payload: {path: game.path}
    })
}

export const placeFoodAction = store => () => {
    const { tile, game } = store.getState()
    const area = game.area.width

    const position = [{
        x: getRandomNumber(0, area/tile ) * tile,
        y: getRandomNumber(0, area/tile ) * tile}]

    store.dispatch({
        type: PLACE_FOOD,
        payload: {position}
    })
}
