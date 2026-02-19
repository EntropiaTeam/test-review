import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NewTodo } from '../NewTodo';
import UserSelect from '../UserSelect';
import type { Todo } from '../../types/todos';
import type { AppDispatch, RootState } from '../../store';
import { addTodo, removeTodo, changeTodos } from '../../store/todosSlice';
import styles from './Main.module.css';

function Main() {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => state.list.todos);
    const [todoTitle, setTodoTitle] = useState('');

    const allTodosIsDone = todos.length > 0 && todos.every((t: Todo) => t.isDone);

    const handleSubmitTodo = (todo: Todo) => {
        dispatch(addTodo(todo));
    };

    const handleRemoveTodo = (id: number) => {
        dispatch(removeTodo(id));
    };

    const handleToggleDone = (todo: Todo) => {
        const nextTodos = todos.map((item: Todo) =>
            item.id === todo.id ? { ...item, isDone: !item.isDone } : item
        );
        dispatch(changeTodos(nextTodos));
    };

    return (
        <div>
            <Form.Check
                type="checkbox"
                label="all todos is done!"
                checked={allTodosIsDone}
                readOnly
            />
            <hr />
            <NewTodo
                todoTitle={todoTitle}
                onChange={setTodoTitle}
                onSubmit={handleSubmitTodo}
            />
            {todos.map((t: Todo) => (
                <div key={t.id} className={styles.todo}>
                    {t.title}
                    <UserSelect user={t.user} todoId={t.id} />
                    <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => handleRemoveTodo(t.id)}
                        aria-label={`Remove todo ${t.title}`}
                    >
                        ×
                    </button>
                    <Form.Check
                        style={{ marginTop: -8, marginLeft: 5 }}
                        type="checkbox"
                        checked={t.isDone}
                        onChange={() => handleToggleDone(t)}
                    />
                </div>
            ))}
        </div>
    );
}

export default Main;
