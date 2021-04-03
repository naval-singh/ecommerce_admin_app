import axiosInstance from "../helpers/axios";
import { pageConstants } from "./constants";

export const createPage = (form) => {
    return async (dispatch) => {
        dispatch({ type: pageConstants.CREATE_PAGE_REQUEST });
        const res = await axiosInstance.post("/page/create", form);
        if (res.data.status) {
            const { page } = res.data;
            dispatch({
                type: pageConstants.CREATE_PAGE_SUCCESS,
                payload: { page },
            });
        } else {
            const { error } = res.data;
            dispatch({
                type: pageConstants.CREATE_PAGE_FAILURE,
                payload: { error },
            });
        }
    };
};

export const getAllPages = () => {
    return async (dispatch) => {
        dispatch({ type: pageConstants.GET_ALL_PAGES_REQUEST });
        const res = await axiosInstance.get("/page/display");
        console.log(res);
        if (res.data.status) {
            const { pages } = res.data;
            dispatch({
                type: pageConstants.GET_ALL_PAGES_SUCCESS,
                payload: { pages },
            });
        } else {
            const { error } = res.data;
            dispatch({
                type: pageConstants.GET_ALL_PAGES_FAILURE,
                payload: { error },
            });
        }
    };
};
