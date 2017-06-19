let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    db = require('./app/models'),
    path = require('path'),
    glob = require('glob'),
    morgan = require('morgan'),
    compress = require('compression')

let port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(compress());

app.disable('x-powered-by');

let controllers = glob.sync(path.join(__dirname, './app/controllers/*.js'));
controllers.forEach(function (controller) {
    require(controller)(app);
});


app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use((err, req, res, next)=> {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err.errors,
        title: 'error'
    });
});

db.sequelize
    .sync()
    .then( ()=>{
        if (!module.parent) {
            app.listen(port, function(){
                console.log(`environment ${process.env.NODE_ENV}`)
                console.log(`server starts at localhost:${port}`)
            })
        }
    }).catch( (e)=> {
    throw new Error(e);
});

module.exports = app;
