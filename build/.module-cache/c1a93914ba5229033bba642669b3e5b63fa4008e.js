
var React = require('react');

var App = React.createFactory(require('./components'));

var props = [];

React.render(App(props), document.getElementById('content'));

var t;