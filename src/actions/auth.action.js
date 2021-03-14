import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const signin = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post("/admin/signin", user);
        if (res.data.status) {
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
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

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: { token, user },
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { message: "" },
            });
        }
    };
};

export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post("/admin/signout");
        if (res.data.status) {
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error },
            });
        }
    };
};
