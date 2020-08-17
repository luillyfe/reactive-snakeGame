import {Observable} from "./Observable.js";

export const map = fn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                next: ev => observer.next(fn(ev)),
                error: e => observer.error(e),
                complete: () => observer.complete()
            })
        })

export const filter = fn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                next: ev => fn(ev) && observer.next(ev),
                error: e => observer.error(e),
                complete: () => observer.complete()
            })
        })

export const doAction = fn =>
    source =>
        new Observable(observer => {
            source.subscribe({
                next: ev => {
                    fn(ev)
                    observer.next(ev)
                },
                error: e => observer.error(e),
                complete: () => observer.complete()
            })
        })
