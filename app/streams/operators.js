import {Observable} from "./Observable.js";

export const map = projectFn =>
    source =>
        new Observable(observer => {
            return source.subscribe({
                ...observer,
                next: ev => observer.next(projectFn(ev))
            })
        })

export const filter = predicateFn =>
    source =>
        new Observable(observer => {
            return source.subscribe({
                ...observer,
                next: ev => predicateFn(ev) && observer.next(ev)
            })
        })

export const doAction = fn =>
    source =>
        new Observable(observer => {
            return source.subscribe({
                ...observer,
                next: ev => {
                    fn(ev)
                    observer.next(ev)
                }
            })
        })

export const takeUntil = obs$ =>
    source =>
        new Observable(observer => {
            const outerSubscription = source.subscribe(observer)

            const innerSubscription = obs$.subscribe({
                ...observer,
                next: () => {
                    unsubscribe()
                }
            })

            function unsubscribe() {
                outerSubscription.unsubscribe()
                innerSubscription.unsubscribe()
            }

            return {
                unsubscribe
            }
        })
