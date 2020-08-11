import {Observable} from "../utils/index.js";

let keys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

let arrowKeys$ = Observable.fromEvent(document, 'keydown')
    .filter(({key}) => keys.includes(key))

let game$ = arrowKeys$;
export {
    game$
}
