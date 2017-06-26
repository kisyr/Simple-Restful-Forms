import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import axios from 'axios';


const Form = reduxForm({
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})((props) => (
	<form onSubmit={props.handleSubmit}>
		{props.children}
	</form>
));


class RestfulForm extends Component {

	constructor(props) {
		super(props);
		this.handleError = this.handleError.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			loading: true,
			result: {
				success: true,
				message: '',
			},
			initialValues: {},
		};
		axios.get(this.props.route).then((response) => {
			this.setState({
				loading: false,
				initialValues: response.data,
			});
		}).catch(this.handleError);
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit} initialValues={this.state.initialValues} form={this.props.name}>
				{this.props.children}
				<button type="submit" disabled={this.state.loading}>Save</button>
				{this.state.result.message && !this.state.loading && 
					<div>{this.state.result.success ? 'success' : 'error' } : {this.state.result.message}</div>
				}
			</Form>
		);
	}

	handleError(error) {
		this.setState({
			loading: false,
			result: {
				success: false,
				message: this.props.errorMessage ?
					this.props.errorMessage :
						('message' in error.response.data)
							? error.response.data.message 
							: error.response.statusText,
			},
		});
	}

	handleSubmit(data) {
		this.setState({
			loading: true,
		});
		axios.post(this.props.route, data).then((response) => {
			this.setState({
				loading: false,
				result: {
					success: true,
					message: this.props.successMessage,
				},
			});
		}).catch(this.handleError);
	}

}


RestfulForm.propTypes = {
	name: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
	submitText: PropTypes.string,
	successMessage: PropTypes.string,
	errorMessage: PropTypes.string,
};


RestfulForm.defaultProps = {
	submitText: 'Submit',
	successMessage: 'Success',
	errorMessage: '',
};


export default RestfulForm;

