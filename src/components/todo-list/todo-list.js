import React from 'react';

import './todo-list.css';
import ToDoListItem from '../todo-list-item/todo-list-item';

const ToDoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
	const elements = todos.map((item) => {
		const { id, ...itemsProps } = item;

		return (
			<li key={id} className="list-group-item">
				<ToDoListItem {...itemsProps}
					onDeleted={() => onDeleted(id)}
					onToggleImportant={() => onToggleImportant(id)}
					onToggleDone={() => onToggleDone(id)}/>
			</li>
		)
	});

	return (
		<ul className="list-group todo-list">
			{elements}
		</ul>
	)
};


export default ToDoList;