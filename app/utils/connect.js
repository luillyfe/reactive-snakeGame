import {combineReducers, Store} from "../store/index.js";
import {food, game, player, snake, tile} from "../components/index.js";
import {
    isDirectionAllowedAction,
    isGameSttopedAction,
    moveSnakeAction,
    placeFoodAction,
    shouldGrowAction,
    shouldReverseAction,
    snakeHittedItselfAction,
    resetAction,
    placeSpecialFoodAction,
    shouldGrowBy2Action,
    getCurrentDirectionAction
} from "../components/actions.js";

const appReducer = combineReducers({snake, food, tile, game, player})
const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined
    }
    return appReducer(state, action)
}
const store = new Store(rootReducer)

function connectStore(render) {
    store.subscribe(state => {
        const {snake, food, game, player, tile} = state;

        render({
            snake: {position: snake.position, color: snake.color},
            food: {position: food.position, color: food.color},
            specialFood: {position: food.special.position, color: food.special.color},
            gameArea: game.area,
            score: player.points,
            tile
        })
    })
    store.dispatch({})
}

export const moveSnake = moveSnakeAction(store)
export const shouldGrow = shouldGrowAction(store)
export const shouldReverse = shouldReverseAction(store)
export const isDirectionAllowed = isDirectionAllowedAction(store)
export const snakeHittedItself = snakeHittedItselfAction(store)
export const placeFood = placeFoodAction(store)
export const isGameSttoped = isGameSttopedAction(store)
export const reset = resetAction(store)
export const placeSpecialFood = placeSpecialFoodAction(store)
export const shouldGrowBy2 = shouldGrowBy2Action(store)
export const getCurrentDirection = getCurrentDirectionAction(store)

export {
    connectStore
}
