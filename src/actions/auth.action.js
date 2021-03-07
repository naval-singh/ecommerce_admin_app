import axiosInstance from "../helpers/axios";
import { authConstants } from "./constants";

export const signin = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axiosInstance.post("/admin/signin", user);
        if (res.data.status) {
            const { token, user } = res.data;
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user },
            });
        } else {
            const { error, message } = res.data;
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error, message },
            });
        }
    };
};
