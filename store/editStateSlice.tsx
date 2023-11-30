import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface EditState {
    isEdit: boolean;
    articleId: null | string;
}

const initialState: EditState = {
    isEdit: false,
    articleId: null,
};

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        setEditTrue: (state) => {
            state.isEdit = true;
        },
        setEditFalse: (state) => {
            state.isEdit = false;
        },
        setArticleId: (state, action: PayloadAction<string>) => {
            state.articleId = action.payload;
        },
    },
});

export const { setEditTrue, setEditFalse, setArticleId } = editSlice.actions;
export default editSlice.reducer;
