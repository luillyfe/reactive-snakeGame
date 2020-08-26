import {map, tap, filter} from '../utils/operators.js'
import {Observable} from '../utils/Observable.js'
import {Store} from './Store.js'
import {foodReducer, snakeReducer} from './Reducer.js'

const store = new Store()
const allowedKeys = ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight']

const placingFood$ = Observable.irregularIntervals(0, 4, 10)
    .pipe(
        tap(() => store.updateState(foodReducer()))
    )
const moves$ = Observable.fromEvent(document, 'keydown')
    .pipe(
        filter(({key}) => allowedKeys.includes(key)),
        tap(({key}) => store.updateState(snakeReducer(key))),
    )
const game$ = Observable.mergeAll(moves$, placingFood$)
    .pipe(map(() => {
        const {snake, food, tile, area} = store.getState()
        return {snake, food, tile, area}
    }))

export {
    game$,
    store
}
