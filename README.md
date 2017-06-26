# Simple RESTful forms

Just an example creating a RESTful form with react, redux, react-redux, redux-form.

## Installation

```sh
$ npm install
$ ./node_modules/.bin/webpack
$ node server.js
```
Browse localhost:1337

## Example

```js
<RestfulForm route="/users/1" name="userForm">
	<Field name="first_name" type="text" component="input" />
	<Field name="last_name" type="text" component="input" />
</RestfulForm>
```

