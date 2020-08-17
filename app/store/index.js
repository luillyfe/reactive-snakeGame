import {Observable} from "../utils/index.js";
import {Store} from "./Store.js";

let keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
let store = new Store()
let button = document.getElementById('button')

let arrowKeys$ = Observable.fromEvent(document, 'keydown')
    .filter(({key}) => keys.includes(key))
    .do(({key}) => store.updateSnake(key))


let placingFood$ = Observable.irregularIntervals()
    .do(() => {
        store.updateFood()
    })

let moves$ = Observable.mergeAll(placingFood$, arrowKeys$)
    .map(() => {
        let {snake, food, tile} = store.getState();
        return {snake, food, tile}
    })
    .catch(e => {
        button.innerHTML = 'Start'
    })

let start$ = Observable.fromEvent(button, 'click')
    .do(() => {
        button.innerHTML = (button.innerHTML === 'Start') ? 'Stop' : 'Start'
    })

export {
    moves$,
    start$
}
