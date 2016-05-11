// loading modules
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Creating database connection
mongoose.connect('mongodb://localhost:27017/carDB', (err) => {
  if (err){ 
  return console.log(err);
  }
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.use(express.static(__dirname + "/public"));

//Get an instance of the express Router
let router = express.Router();

// Load our application API routes
import routes from './app/routes';

// Pass in instances of the express app and router
routes(app, router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

export {app};