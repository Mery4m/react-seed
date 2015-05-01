
var React = require('react');


//test
var App = React.createFactory(require('./build/components'));

var props = [];

React.render(App(props), document.getElementById('content'));