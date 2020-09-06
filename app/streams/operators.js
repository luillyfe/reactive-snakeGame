import {Observable} from "./Observable.js";

export const map = projectFn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                ...observer,
                next: ev => observer.next(projectFn(ev))
            })
        })

export const filter = predicateFn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                ...observer,
                next: ev => predicateFn(ev) && observer.next(ev)
            })
        })

export const doAction = fn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                ...observer,
                next: ev => {
                    fn(ev)
                    observer.next(ev)
                }
            })
        })
