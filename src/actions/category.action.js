import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

const getAllCategory = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
        const res = await axios.get("/category/display");
        if (res.data.status) {
            const { categoryList } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories: categoryList },
            });
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
                payload: { error },
            });
        }
    };
};

export const addNewCategory = (form) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
        const res = await axios.post("/category/add", form);
        if (res.data.status) {
            const { category } = res.data;
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                payload: { category },
            });
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: { error },
            });
        }
    };
};

export const updateCategories = (form) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
        const res = await axios.post("/category/update", form);
        if (res.data.status) {
            dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS });
            dispatch(getAllCategory());
        } else {
            dispatch({ type: categoryConstants.UPDATE_CATEGORY_FAILURE });
        }
    };
};

export const deleteCategories = (payload) => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
        const res = await axios.post("/category/delete", payload);
        if (res.data.status) {
            dispatch({ type: categoryConstants.DELETE_CATEGORY_SUCCESS });
            dispatch(getAllCategory());
        } else {
            dispatch({ type: categoryConstants.DELETE_CATEGORY_FAILURE });
        }
    };
};

export { getAllCategory };
