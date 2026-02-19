import React from 'react';
import styles from './NewTodo.module.css';
import type { Todo } from '../../types/todos';

type Props = {
    todoTitle: string;
    onChange: (todoTitle: string) => void;
    onSubmit: (todo: Todo) => void;
};

export function NewTodo(props: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();

        const val = props.todoTitle.trim();

        if (val) {
            props.onSubmit({
                id: Date.now(),
                title: val,
                isDone: false,
            });
            props.onChange('');
        }
    };

    return (
        <input
            className={styles.newTodo}
            type="text"
            value={props.todoTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
        />
    );
}
