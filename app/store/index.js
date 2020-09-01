import {map, tap, filter} from '../utils/operators.js'
import {irregularIntervals, fromEvent, mergeAll} from '../utils/Observable.js'
import {Store} from './Store.js'
import {foodReducer, snakeReducer, specialFoodReducer, snakeGrowReducer} from './Reducer.js'

const store = new Store()
const allowedKeys = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']

const food$ = irregularIntervals(0, 4, 10)
    .pipe(
        tap(() => store.updateState(foodReducer()))
    )

const specialFood$ = irregularIntervals(10, 1, 5)
    .pipe(
        tap(() => store.updateState(specialFoodReducer()))
    )

const moves$ = fromEvent(document, 'keydown')
    .pipe(
        filter(({key}) => allowedKeys.includes(key)),
        tap(({key}) => store.updateState(snakeReducer(key))),
        tap(() => store.updateState(snakeGrowReducer()))
    )

const game$ = mergeAll(moves$, food$, specialFood$)
    .pipe(map(() => {
        const {snake, food, specialFood, tile, area} = store.getState()
        return {snake, food, specialFood, tile, area}
    }))

export {
    game$,
    store
}
