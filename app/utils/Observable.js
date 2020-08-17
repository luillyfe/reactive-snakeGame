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
        } else {
            var observer = obs
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
            return self$.subscribe({
                next: ev => {
                    if (filterFn(ev)) {
                        observer.next(ev)
                    }
                }, error: observer.error
            })
        })
    },
    map(projectionFn) {
        let self$ = this;
        return new Observable(observer => {
            return self$.subscribe({
                next: ev =>
                    observer.next(projectionFn(ev)),
                error: observer.error
            })
        })
    },
    do(sideEffect) {
        let self$ = this;
        return new Observable(observer => {
            return self$.subscribe({
                next: ev => {
                    sideEffect(ev)
                    observer.next(ev)
                }, error: observer.error
            })
        })
    },
    switchLatest(inner$) {
        let outer$ = this
        return new Observable(observer => {
            let currentSub = null
            outer$.subscribe(() => {
                currentSub = inner$.subscribe({
                    next: ev => {
                        observer.next(ev)
                    },
                    error: (ev) => {
                        observer.error(ev)
                        currentSub.unsubscribe()
                    },
                    complete: () => {
                        observer.complete()
                        currentSub.unsubscribe()
                    }
                })

            })

            return {
                unsubscribe() {
                    currentSub.unsubscribe()
                }
            }
        })
    },
    catch(errorFn) {
        let self$ = this;
        return new Observable(observer => {
            let sub = self$.subscribe({
                next: ev => {
                        observer.next(ev)
                },
                error: e => {
                    errorFn(e)
                    observer.error(e)
                    sub.unsubscribe()
                }
            })
            return sub
        })
    }
}

Observable.fromEvent = function (dom, eventName) {
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
                for (let i=1; i<= timeout +1; i++) {
                    clearTimeout(i)
                }
            }
        }
    })
}

Observable.mergeAll = function (...observables) {
    return new Observable(observer => {
        let subs = observables.map(obs$ => {
            return obs$.subscribe({
                next: ev => {
                    observer.next(ev)
                },
                error: (e) => {
                    subs.forEach(sub => sub.unsubscribe())
                    observer.error(e)
                },
                complete: () => {
                    subs.forEach(sub => sub.unsubscribe())
                    observer.complete()
                }
            })
        })

        return {
            unsubscribe() {
                subs.forEach(sub => sub.unsubscribe())
            }
        }
    });
}

export {
    Observable
}
