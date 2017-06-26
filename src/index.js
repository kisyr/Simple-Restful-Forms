import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { Field, reducer as formReducer } from 'redux-form';

import RestfulForm from './RestfulForm';


const rootReducer = combineReducers({
	form: formReducer,
});
const store = createStore(rootReducer);


const App = (props) => (
	<div>
		<h1>User Form</h1>
		<RestfulForm route="/users/1" name="userForm">
			<Field name="first_name" type="text" component="input" />
			<Field name="last_name" type="text" component="input" />
		</RestfulForm>
	</div>
);


ReactDOM.render((
	<StoreProvider store={store}>
		<App />
	</StoreProvider>
), document.querySelector('#app'));

