import {Observable} from "./Observable.js";

const map = projectFn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                ...observer,
                next: ev => observer.next(projectFn(ev))
            })
        })

const filter = predicateFn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                ...observer,
                next: ev => predicateFn(ev) && observer.next(ev)
            })
        })

export {map, filter}
