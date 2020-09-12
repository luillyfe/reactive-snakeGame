export class Store {
    constructor(appReducer) {
        this.reducer = appReducer
        this.state = this.reducer(this.state, {})
        this.listeners = []
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action)
        this.listeners.forEach(l => l(this.state));
    }

    getState() {
        return this.state
    }

    subscribe(listener) {
        this.listeners = [...this.listeners, listener]

        return () => {
            this.listeners = this.listeners.filter(l => l !== listener)
        }
    }
}
