import { useContext, useReducer } from 'react'

export const initialState = {
    basket: [],
    user: null
}

export const getBasketTotal = (basket) => {

    return basket?.reduce((amount, b) => b.price + amount, 0)
}

const reducer = (state, action) => {
    debugger;
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.payload]
            }

        case "REMOVE_FROM_BASKET":
            debugger;
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((item) =>
                item.id === action.payload
            )
            if (index >= 0) {
                newBasket.splice(index, 1);
            }
            else {
                console.warn(`cant remove product (id: ${action.payload}) as it is not in the basket`)
            }
            return { ...state, basket: newBasket }

        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []

            }
        default:
            return state;

    }
}

export default reducer;