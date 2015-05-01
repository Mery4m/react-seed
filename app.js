
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var browserify = require('browserify');


require('node-jsx').install();


// Database Connectors
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'nodejs'
});
connection.connect();


var React = require('react');
// React components
var DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;
//var components = require('./public/javascripts/components.jsx');

var App = React.createFactory(require('./public/javascripts/jsx/components'));

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);

// *** Demonstrates a simple get endpoint which queries local sample DB
app.get('/db', function (req, res) {

    var query = connection.query('SELECT * FROM t_user',function(err,rows){
        if(err){
            console.log(err);
            return next("Mysql error, check your query");
        }

        res.send(rows);
    });

});

app.get('/react', function(req, res) {

    var props = [];



    var html = React.renderToStaticMarkup(body(null,

        // The actual server-side rendering of our component occurs here, and we
        // pass our data in as `props`. This div is the same one that the client
        // will "render" into on the browser from browser.js
        div({id: 'content', dangerouslySetInnerHTML: {__html:
            React.renderToString(App(props))
        }}),

        //script({src: '//fb.me/react-0.13.2.min.js'}),
        script({src: 'javascripts/bundle.js'})

        // The props should match on the client and server, so we stringify them
        // on the page to be available for access by the code run in browser.js
        // You could use any var name here as long as it's unique
        //script({dangerouslySetInnerHTML: {__html:
        //'var APP_PROPS = ' + safeStringify(props) + ';'
        //}}),

        // We'll load React from a CDN - you don't have to do this,
        // you can bundle it up or serve it locally if you like
        //script({src: '//fb.me/react-0.13.2.min.js'})

        // Then the browser will fetch and run the browserified bundle consisting
        // of browser.js and all its dependencies.
        // We serve this from the endpoint a few lines down.

        //script({src: '/bundle.js'})
    ));

    // Return the page to the browser

    res.send('<!DOCTYPE html>' + html);


    //res.setHeader('Content-Type', 'text/html')
    //
    //// `props` represents the data to be passed in to the React component for
    //// rendering - just as you would pass data, or expose variables in
    //// templates such as Jade or Handlebars.  We just use some dummy data
    //// here (with some potentially dangerous values for testing), but you could
    //// imagine this would be objects typically fetched async from a DB,
    //// filesystem or API, depending on the logged-in user, etc.
    //var props = {
    //    items: [
    //        'Item 0',
    //        'Item 1',
    //        'Item </script>',
    //        'Item <!--inject!-->',
    //    ]
    //}
    //
    //// Here we're using React to render the outer body, so we just use the
    //// simpler renderToStaticMarkup function, but you could use any templating
    //// language (or just a string) for the outer page template
    //var html = React.renderToStaticMarkup(body(null,
    //
    //    // The actual server-side rendering of our component occurs here, and we
    //    // pass our data in as `props`. This div is the same one that the client
    //    // will "render" into on the browser from browser.js
    //    div({id: 'content', dangerouslySetInnerHTML: {__html:
    //        React.renderToString(App(props))
    //    }}),
    //
    //    // The props should match on the client and server, so we stringify them
    //    // on the page to be available for access by the code run in browser.js
    //    // You could use any var name here as long as it's unique
    //    //script({dangerouslySetInnerHTML: {__html:
    //    //'var APP_PROPS = ' + safeStringify(props) + ';'
    //    //}}),
    //
    //    // We'll load React from a CDN - you don't have to do this,
    //    // you can bundle it up or serve it locally if you like
    //    //script({src: '//fb.me/react-0.13.2.min.js'}),
    //
    //    // Then the browser will fetch and run the browserified bundle consisting
    //    // of browser.js and all its dependencies.
    //    // We serve this from the endpoint a few lines down.
    //    //script({src: '/bundle.js'})
    ////))
    //
    //// Return the page to the browser
    //res.end(html)
});

// Demonstrates res.sendFile to send a static file
app.get('/get-home', function (req, res) {

    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    var fileName = 'home.html';

    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
