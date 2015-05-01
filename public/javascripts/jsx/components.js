/** @jsx React.DOM */

var React = require('react'),
    Header = require('./Header'),
    DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li, p = DOM.p;

// This is just a simple example of a component that can be rendered on both
// the server and browser

module.exports = React.createClass({displayName: "exports",

    // We initialise its state by using the `props` that were passed in when it
    // was first rendered. We also want the button to be disabled until the
    // component has fully mounted on the DOM
    //getInitialState: function() {
    //    return {items: this.props.items, disabled: true}
    //},
    //
    //// Once the component has been mounted, we can enable the button
    //componentDidMount: function() {
    //    this.setState({disabled: false})
    //},

    // Then we just update the state whenever its clicked by adding a new item to
    // the list - but you could imagine this being updated with the results of
    // AJAX calls, etc
    handleClick: function() {
        
        console.log('test');
        //this.setState({
        //    items: this.state.items.concat('Item ' + this.state.items.length)
        //})
    },

    render: function() {

        return (
            <div className='wrapper'>
                <Header />
                <button onClick={this.handleClick}>Test Handler</button>
            </div>
        );
    }
});