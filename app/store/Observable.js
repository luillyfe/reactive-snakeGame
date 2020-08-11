import {getRandomNumber} from "../utils.js";

function Observable(subscribe) {
    this._subscribe = subscribe
}

Observable.prototype = {
    subscribe(onNext) {
        return this._subscribe({onNext})
    },
    filter(filterFn) {
        let self = this;

        return new Observable(observer => {
            return self.subscribe(
                e => filterFn(e) && observer.onNext(e)
            )
        })
    },
    map(projectFn) {
        let self = this;

        return new Observable(observer => {
            return self.subscribe(
                e => observer.onNext(projectFn(e))
            )
        })
    },
    scan(fn) {
        let self = this;

        return new Observable(observer => {
            return self.subscribe(
                e => {
                    fn()
                    observer.onNext(e)
                }
            )
        })
    },
    mergeMap(arrows$) {
        let timeout$ = this;
        return new Observable(observer => {
            let subscription1 = timeout$.subscribe(timeout => {
                observer.onNext(timeout)
            })
            let subscription2 = arrows$.subscribe(arrow => {
                observer.onNext(arrow)
            });

            return () => {
                subscription1()
                subscription2()
            }
        })
    },
    takeUntil(cancel$) {
        let obs$ = this;
        return new Observable(function (observer) {
            let subscription1 = obs$.subscribe(e => {
                observer.onNext(e)
            })
            let subscription2 = cancel$.subscribe((e) => {
                subscription1()
                subscription2()
            })
            return subscription1;
        })
    }
}

Observable.fromEvent = function (dom, eventName) {
    return new Observable(function (observer) {
        let handler = e => observer.onNext(e)
        dom.addEventListener(eventName, handler)

        return () => {
            dom.removeEventListener(eventName, handler)
        }
    })
}


Observable.fromTimeout = function (time = 5000) {
    let timeout;
    return new Observable(observer => {
        let handler = e => {
            observer.onNext(e)
            time = getRandomNumber(5, 1000, 5000)
            clearTimeout(timeout)
            timeout = setTimeout(handler, time)
        }
        timeout = setTimeout(handler, time)

        return () => {
            clearTimeout(timeout);
        }
    })
}

export {
    Observable
}
