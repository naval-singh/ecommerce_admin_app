import axios from "../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });
        const res = await axios.post("/admin/signup", user);
        if (res.data.status) {
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: { message },
            });
        } else {
            const { message, error } = res.data;
            dispatch({
                type: userConstants.USER_REGISTER_FAILURE,
                payload: { message, error },
            });
        }
    };
};
