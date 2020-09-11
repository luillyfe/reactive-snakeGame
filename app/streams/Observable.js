import {getRandomNumber} from "../utils/index.js";

export class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe
    }

    subscribe(observer) {
        let next = observer,
            error = err => console.error(err),
            complete = () => console.log('I am done')

        if (typeof observer !== 'function') {
            ({next, error, complete} = observer)
        }

        return this._subscribe({next, error, complete})
    }

    pipe(...fns) {
        return pipe(...fns)(this)
    }
}

function pipe(...fns) {
    return source => fns.reduce((prev, fn) => fn(prev), source)
}

function fromEvent(dom, eventName) {
    return new Observable(observer => {
        const handler = ev => {
            try {
                observer.next(ev)
            } catch (err) {
                observer.error(err)
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

function irregularIntervals(start, min, max) {
    return new Observable(observer => {
        const handler = () => {
            observer.next()
            clearTimeout(timeout)
            timeout = setTimeout(handler, getRandomNumber(min, max) * 1000)
        }

        var timeout = setTimeout(handler, start * 1000)

        return {
            unsubscribe() {
                clearTimeout(timeout)
            }
        }
    })
}

function mergeAll(...Obs) {
    return new Observable(observer => {
        const subscriptions = Obs.map(observable => observable.subscribe(observer))

        return {
            unsubscribe() {
                subscriptions.forEach(sub => sub.unsubscribe())
            }
        }
    })
}

export {
    fromEvent,
    irregularIntervals,
    mergeAll
}
