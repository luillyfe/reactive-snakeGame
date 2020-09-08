import {MOVE_SNAKE} from "./snake.js";
import {UPDATE_PATH} from "./game.js";

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
