const redux = require('redux');

const initialState = {

    tickers: ''
}

// Reducer - после стора создаем его
// reducer это функция, которая принимает два аргумента:
// 1. state - объект, описывающий состояние приложения (на старте state может быть равен initialState)
// 2. action - объект с обязательным полем type

const reducer = (state = initialState, action) => {

    if (action.type === 'NEW_QUOTES') {

        return {
            tickers: 'aaaaa'
        }
    }

    return state;

}

// Store - сначала создаем Store, место, где хранятся все данные, то есть глобальный state

const store = redux.createStore(reducer);
console.log(store.getState())

// Actions

const setTickers = {

    type: 'NEW_QUOTES'
}

store.dispatch (setTickers)
console.log(store.getState())