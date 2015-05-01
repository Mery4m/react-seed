
var React = require('react');

var App = React.createFactory(require('./jsx/components'));

var props = [];

React.render(App(props), document.getElementById('content'));