import { Observable, map, tap, filter, catchError } from '../utils/index.js'
import { Store } from './Store.js'
import { foodReducer, snakeReducer } from './Reducer.js'

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
        catchError(() => {
            store.resetStore()
            return store.getState()
        })
    )
const game$ = Observable.mergeAll(moves$, placingFood$)
    .pipe(map(() => {
        const {snake, food, tile} = store.getState()
        return {snake, food, tile}
    }))

export {
    game$
}
