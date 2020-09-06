import {MOVE_SNAKE} from "../components/snake.js";

export const moveSnakeAction = store => key => {
    const { tile } = store.getState()

    store.dispatch({
        type: MOVE_SNAKE,
        payload: {key, tile}
    })
}
