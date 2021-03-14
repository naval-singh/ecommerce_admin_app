import { productConstants } from "../actions/constants";

const initialState = {
    products: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case productConstants.GET_ALL_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products,
            };
            break;
        case productConstants.GET_ALL_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
            };
            break;
    }
    return state;
};
