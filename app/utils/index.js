function Observable(subscribe) {
    this._subscribe = subscribe
}

Observable.prototype = {
    subscribe(obs) {
        if (typeof obs === 'function') {
            var observer = {
                next: obs
            }
        }

        return this._subscribe({
            next: observer.next,
            error: observer.error,
            complete: observer.complete
        })
    },
    filter(filterFn) {
        let self$ = this;
        return new Observable(observer => {
            return self$.subscribe(ev => {
                if (filterFn(ev)) {
                    observer.next(ev)
                }
            })
        })
    },
    map(projectionFn) {
        let self$ = this;
        return new Observable(observer => {
            return self$.subscribe(ev => observer.next(projectionFn(ev)))
        })
    },
}

Observable.fromEvent = function (dom, eventName) {
    return new Observable(observer => {
        const handler = ev => observer.next(ev)
        dom.addEventListener(eventName, handler)

        return {
            unsubscribe() {
                dom.removeEventListener(eventName, handler)
            }
        }
    })
}

export {
    Observable
}
