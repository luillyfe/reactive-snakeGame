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


export {
    Observable
}
