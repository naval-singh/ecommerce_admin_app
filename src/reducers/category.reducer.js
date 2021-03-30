import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: [],
    error: null,
    loading: false,
};

const buildNewCategories = (categories, newCategory) => {
    if (!newCategory.parentId) {
        return [
            ...categories,
            {
                _id: newCategory._id,
                name: newCategory.name,
                slug: newCategory.slug,
                children: [],
            },
        ];
    }

    const myCategories = [];
    for (let cat of categories) {
        if (cat._id === newCategory.parentId) {
            let category = {
                _id: newCategory._id,
                name: newCategory.name,
                slug: newCategory.slug,
                parentId: newCategory.parentId,
                categoryPicture: newCategory.categoryPicture,
                children: [],
            };
            myCategories.push({
                ...cat,
                children: cat.children ? [...cat.children, category] : [category],
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(cat.children, newCategory) : [],
            });
        }
    }
    return myCategories;
};

export default (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const updatedCategory = buildNewCategories(state.categories, action.payload.category);
            state = {
                ...state,
                categories: updatedCategory,
                loading: false,
            };
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case categoryConstants.UPDATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.UPDATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case categoryConstants.UPDATE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
            };
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
            };
            break;
    }
    return state;
};
