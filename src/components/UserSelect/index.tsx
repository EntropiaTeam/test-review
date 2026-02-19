import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';
import type { Todo } from '../../types/todos';
import type { AppDispatch, RootState } from '../../store';
import { changeTodos } from '../../store/todosSlice';

type UserSelectProps = {
    user?: number;
    todoId: number;
};

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.list.todos);
    const options = useSelector((state: RootState) => state.users.list);
    const loading = useSelector((state: RootState) => state.users.loading);

    const { todoId } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t: Todo) =>
            t.id === todoId
                ? { ...t, user: e.target.value ? Number(e.target.value) : undefined }
                : t
        );
        dispatch(changeTodos(changedTodos));
    }

    return (
        <select
            name="user"
            className={styles.user}
            onChange={handleChange}
            value={props.user ?? ''}
            disabled={loading}
        >
            <option value="">Unassigned</option>
            {options.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
        </select>
    );
}

export default UserSelect;
