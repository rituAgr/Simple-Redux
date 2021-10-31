const redux = require('redux')
const reduxLogger = require('redux-logger')

//Middleware
const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

//Action
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'Buy the cake from store'
    }
}
function buyIcecream() {
    return {
        type: BUY_ICECREAM,
        info: 'Buy the ice cream from store'
    }
}


// Reducer =  (PreviousState, action) => newState
const initialState = {
    numOfCake: 10,
    numOfIcecream: 20
}

const cakeReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE : return {
                ...state,
                numOfCake: state.numOfCake - 1
            }
        default:
            return state;
    }
}
const iceCreamReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_ICECREAM : return {
            ...state,
            numOfIcecream: state.numOfIcecream - 1
        }
        default:
            return state;
    }
}
const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})



//Store
const store = redux.createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()
