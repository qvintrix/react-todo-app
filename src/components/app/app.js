import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

class App extends Component {
	constructor() {
		super();

		this.maxId = 100;

		this.createToDoItem = (label) => {
			return {
				label,
				important: false,
				id: this.maxId++,
				done: false
			}
		};

		this.state = {
			todoData: [
				this.createToDoItem('Drink Coffee'),
				this.createToDoItem('Make Awesome App'),
				this.createToDoItem('Have a lunch')
			],
			term: '',
			filter: 'all'
		};

		this.deleteItem = (id) => {
			this.setState(({ todoData }) => {
				const idx = todoData.findIndex((el) => el.id === id);
				const newArray = [
					...todoData.slice(0, idx),
					...todoData.slice(idx + 1)
				];

				return {
					todoData: newArray
				}
			})
		};

		this.addItem = (text) => {
			const newItem = this.createToDoItem(text);

			this.setState(({ todoData }) => {
				return {
					todoData: [...todoData, newItem]
				}
			})
		};

		this.toggleProperty = (arr, id, propName) => {
			const idx = arr.findIndex((el) => el.id === id);

			const oldItem = arr[idx];
			const newItem = { ...oldItem, [propName]: !oldItem[propName] };

			return [
				...arr.slice(0, idx),
				newItem,
				...arr.slice(idx + 1)
			];
		};

		this.onToggleImportant = (id) => {
			this.setState(({ todoData }) => {
				return {
					todoData: this.toggleProperty(todoData, id, 'important')
				}
			});
		};

		this.onToggleDone = (id) => {
			this.setState(({ todoData }) => {
				return {
					todoData: this.toggleProperty(todoData, id, 'done')
				}
			});
		};

		this.search = (items, term) => {
			if (term.length === 0) {
				return items;
			}

			return items.filter((item) => {
				return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
			})
		};

		this.onSearchChange = (term) => {
			this.setState({
				term
			})
		};

		this.onFilterChange = (filter) => {
			this.setState({
				filter
			})
		};

		this.filter = (items, filter) => {
			switch (filter) {
				case 'all':
					return items;
				case 'active':
					return items.filter((item) => !item.done);
				case 'done':
					return items.filter((item) => item.done);
				default:
					return items;
			}
		}
	}

	render() {
		const { todoData, term, filter } = this.state;

		const visibleItem = this.filter(
			this.search(todoData, term), filter
		);
		const doneCount = todoData.filter((el) => el.done === true).length;
		const toDoCount = todoData.length - doneCount;

		return (
			<div className="todo-app">
				<AppHeader toDo={toDoCount} done={doneCount}/>
				<div className="top-panel d-flex">
					<SearchPanel onSearchChange={this.onSearchChange}/>
					<ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/>
				</div>

				<TodoList todos={visibleItem}
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}/>
				<ItemAddForm onItemAdded={this.addItem}/>
			</div>
		);
	}

}

export default App;