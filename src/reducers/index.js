import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import pageReducer from "./page.reducer";
import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    page: pageReducer,
    product: productReducer,
    category: categoryReducer,
});

export default rootReducer;
