import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    user: string | null;
    userId: string | null;
}

const initialState: UserState = {
    user: null,
    userId: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        },
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
    },
});

export const { setUser, setUserId } = userSlice.actions;
export default userSlice.reducer;
