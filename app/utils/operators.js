import {Observable} from "./Observable.js";

export const map = fn =>
    source =>
        new Observable(observer => {
            return source.subscribe({
                next: ev => observer.next(fn(ev)),
                error: e => observer.error(e),
                complete: () => observer.complete()
            })
        })

export const filter = fn =>
    source =>
        new Observable(observer => {
            return source.subscribe({
                next: ev => fn(ev) && observer.next(ev),
                error: e => observer.error(e),
                complete: () => observer.complete()
            })
        })

export const tap = fn =>
    source =>
        new Observable(observer => {
            return source.subscribe({
                next: ev => {
                    fn(ev)
                    observer.next(ev)
                },
                error: e => observer.error(e),
                complete: () => observer.complete()
            })
        })

export const catchError = fn =>
    source =>
        new Observable(observer => {
            return source.subscribe({
                next: ev => {
                    observer.next(ev)
                },
                error: e => {
                    const lastState = fn(e)
                    if (lastState) observer.next(lastState)
                    observer.error(e)
                },
                complete: () => observer.complete()
            })
        })

export const scan = (fn, initValue) =>
    source =>
        new Observable(observer => {
            let acc = initValue;
            return source.subscribe({
                next: ev => {
                    acc = fn(acc, ev)
                    observer.next(acc)
                },
                error: e => {
                    observer.error(e)
                },
                complete: () => observer.complete()
            })
        })


export const combineToLatestIf = fn =>
    source =>
        new Observable(observer => {
            let subscription, condition = false;
            return source.subscribe({
                next: () => {
                    condition = !condition
                    if (condition) {
                        subscription = fn(condition).subscribe({
                            next: observer.next,
                            error: e => {
                                condition = false
                                observer.error(e)
                                subscription.unsubscribe()
                            },
                            complete: observer.complete,
                        })
                    } else {
                        fn(condition)
                        subscription.unsubscribe()
                    }
                },
                error: e => {
                    observer.error(e)
                },
                complete: () => observer.complete()
            })
        })
