import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import usersReducer from './usersSlice';

const store = configureStore({
    reducer: {
        list: todosReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
