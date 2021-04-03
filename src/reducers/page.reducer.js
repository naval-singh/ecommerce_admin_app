import { pageConstants } from "../actions/constants";

const initialState = {
    pages: [],
    error: null,
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case pageConstants.CREATE_PAGE_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case pageConstants.CREATE_PAGE_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case pageConstants.CREATE_PAGE_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case pageConstants.GET_ALL_PAGES_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case pageConstants.GET_ALL_PAGES_SUCCESS:
            state = {
                ...state,
                loading: false,
                pages: action.payload.pages,
            };
            break;
        case pageConstants.GET_ALL_PAGES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
    }
    return state;
};
