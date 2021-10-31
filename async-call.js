const redux = require('redux');
const axios = require('axios');
const thunkMiddleware = require('redux-thunk').default //middleware
const middleware = redux.applyMiddleware(thunkMiddleware) //middleware

//action
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        loading: false,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        loading: false,
        payload: error
    }
}

//reducer
const initialState = {
    loading: false,
    users: [],
    error: ''
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: payload.error
            }
    }


}
//action creater
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users1')
            .then(
                response => {
                    let users = response.data.map(user => user.id)
                     dispatch(fetchUsersSuccess(users))
                }
            )
            .catch(
                error => dispatch(fetchUsersFailure(error.message))
            )
    }
}

//store
const store = redux.createStore(reducer, middleware) //middleware
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())

