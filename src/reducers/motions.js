const motionsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MOTION':
            return {
                ...state,
                [action.key] : action.motion
            }
        default:
            return state
    }
}

export { motionsReducer as default }