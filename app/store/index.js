import {Observable} from "../utils/index.js";
import {Store} from "./Store.js";

let keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
let store = new Store()

let arrowKeys$ = Observable.fromEvent(document, 'keydown')
    .filter(({key}) => keys.includes(key))
    .scan(({key}) => {
        store.updateSnake(key)
    })
    .map(() => {
        let {snake, food, tile} = store.getState();
        return {snake, food, tile}
    })

let game$ = arrowKeys$
export {
    game$
}
