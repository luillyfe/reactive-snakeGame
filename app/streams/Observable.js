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

export {fromEvent}
