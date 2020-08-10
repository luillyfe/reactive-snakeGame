import {getRandomNumber} from "../utils.js";

function Observable(subscribe) {
    this._subscribe = subscribe
}

Observable.prototype = {
    subscribe(onNext) {
        return this._subscribe({onNext})
    },
    filter: function (filterFn) {
        let self = this;

        return new Observable(observer => {
            return self.subscribe(
                e => filterFn(e) && observer.onNext(e)
            )
        })
    },
    map: function (projectFn) {
        let self = this;

        return new Observable(observer => {
            return self.subscribe(
                e => observer.onNext(projectFn(e))
            )
        })
    },
    scan: function () {
        let self = this;

        return new Observable(observer => {
            return self.subscribe(
                e => observer.onNext(e)
            )
        })
    },
    mergeMap: function (arrows$) {
        let timeout$ = this;
        return new Observable(observer => {
            timeout$.subscribe(timeout => {
                observer.onNext(timeout)
            })
            arrows$.subscribe(arrow => {
                observer.onNext(arrow)
            });
        })
    },
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
