import { authConstants } from "../actions/constants";

const initialState = {
    token: null,
    user: {},
    authenticate: false,
    authenticating: false,
    error: null,
    message: "",
    loading: false,
};

export default (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
            };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                error: null,
                message: "",
                authenticating: false,
                authenticate: true,
            };
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                message: action.payload.message,
                authenticating: false,
            };
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initialState,
            };
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }
    return state;
};
