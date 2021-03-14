import axios from "../helpers/axios";
import { categoryConstants, productConstants } from "./constants";

export const getInitialData = () => {
    return async (dispatch) => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
        dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
        const res = await axios.get("/initialdata/getdata");
        console.log(res);
        if (res.data.status) {
            const { categories, products } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
                payload: { categories },
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCT_SUCCESS,
                payload: { products },
            });
        }
    };
};
