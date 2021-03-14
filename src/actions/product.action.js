import axios from "../helpers/axios";

export const addNewProduct = (form) => {
    return async (dispatch) => {
        const res = await axios.post("/product/add", form);
        console.log(res);
    };
};
