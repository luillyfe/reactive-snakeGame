import { getRandomNumber } from './helpers.js'

export class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe
    }

    subscribe(observer) {
        if (typeof observer === 'function') {
            var next = observer
            var error = e => console.error(`${e}, something was wrong`)
            var complete = () => console.warn('Done')
        } else {
            var {next, error, complete} = observer
        }

        return this._subscribe({
            next, error, complete
        })
    }

    pipe(...fns) {
        return pipe(...fns)(this)
    }
}

function pipe(...fns) {
    return source =>
        fns.reduce(
            (prev, fn) => fn(prev),
            source
        )
}

export function of(values) {
    return new Observable(observer => {
        observer.next(values)
        observer.complete()

        return {
            unsubscribe() {}
        }
    })
}

export function fromEvent(dom, eventName) {
    return new Observable(observer => {
        const handler = ev => {
            try {
                observer.next(ev)
            } catch (e) {
                observer.error(e)
            }
        }
        dom.addEventListener(eventName, handler)

        return {
            unsubscribe() {
                dom.removeEventListener(eventName, handler)
            }
        }
    })
}

export function irregularIntervals(startTime, min, max) {
    return new Observable(observer => {
        const handler = () => {
            observer.next()
            clearTimeout(timeout)
            timeout = setTimeout(handler, getRandomNumber(min, max) * 1000)
        }

        var timeout = setTimeout(handler, startTime * 1000)

        return {
            unsubscribe() {
                clearTimeout(timeout)
            }
        }
    })
}

export function mergeAll(...observables) {
    return new Observable(observer => {
        const subscriptions = observables.map(observable$ => {
            return observable$.subscribe({
                next: observer.next,
                error: e => {
                    observer.error(e)
                    unsubscribe()
                },
                complete: observer.complete
            })
        })

        function unsubscribe() {
            subscriptions
                .forEach(({unsubscribe}) => unsubscribe())
        }

        return {
            unsubscribe
        }
    })
}
