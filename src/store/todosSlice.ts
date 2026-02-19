import { createSlice } from '@reduxjs/toolkit';
import type { Todo } from '../types/todos';

type TodosListState = {
    todos: Todo[];
};

const initialState: TodosListState = {
    todos: [],
};

const todosSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
        changeTodos: (state, action) => {
            state.todos = action.payload;
        },
    },
});

export const { addTodo, removeTodo, changeTodos } = todosSlice.actions;
export default todosSlice.reducer;
