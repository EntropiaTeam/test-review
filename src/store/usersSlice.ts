import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type UserOption = {
    id: number;
    name: string;
};

export const fetchUsers = createAsyncThunk(
    'users/fetch',
    async (): Promise<UserOption[]> => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/');
        if (!res.ok) throw new Error('Failed to fetch users');
        const data: UserOption[] = await res.json();
        return data;
    }
);

type UsersState = {
    list: UserOption[];
    loading: boolean;
    error: string | null;
};

const initialState: UsersState = {
    list: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to fetch users';
                state.list = [];
            });
    },
});

export default usersSlice.reducer;
