import {getRandomNumber} from "./helper.js";

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
    scan(sideEffect) {
        let self$ = this;
        return new Observable(observer => {
            return self$.subscribe(ev => {
                sideEffect(ev)
                observer.next(ev)
            })
        })
    },
    mergeMap(outer$) {
        let inner$ = this
        return new Observable(observer => {
            const subs1 = inner$.subscribe(ev => observer.next(ev))
            const subs2 = outer$.subscribe(ev => observer.next(ev))

            return {
                unsubscribe() {
                    subs1.unsubscribe()
                    subs2.unsubscribe()
                }
            }
        });
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

Observable.irregularIntervals = function (time = 0) {
    let timeout;
    return new Observable(observer => {
        function handler(ev) {
            observer.next(ev)
            clearTimeout(timeout)
            timeout = setTimeout(handler, getRandomNumber(4, 10) * 1000)
        }
        timeout = setTimeout(handler, time)

        return {
            unsubscribe() {
                clearTimeout(timeout)
            }
        }
    })
}

export {
    Observable
}
