import React, {Component} from 'react';
import './search-panel.css';

class SearchPanel extends Component {

	constructor() {
		super();

		this.state = {
			term: ''
		}

		this.onSearchChange = (event) => {
			const term = event.target.value;
			this.setState({
				term
			})
			this.props.onSearchChange(term);
		}
	}

	render() {
		return (
			<input
				placeholder="type to search"
				className="form-control search-input"
				value={this.state.term}
				onChange={this.onSearchChange}/>
		)
	}
}

export default SearchPanel;