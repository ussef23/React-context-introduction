const stocksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STOCKS':
            return action.stocks
        default:
            return state
    }
}

export { stocksReducer as default }