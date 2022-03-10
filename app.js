// Third party packages
const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

// Custom middleware
const createSessionConfig = require('./config/session');
const db = require('./database/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');

const app = express();

// setup the ejs so that it can be used in node
app.set('view engine', 'ejs');
// setup the path to the views folder and its content
// __dirname is an environment variable that tells you the absolute path of the directory containing the currently executing file.
app.set('views', path.join(__dirname, 'views'));

// setup the connection for the files that will be served staticaly by ejs (js, css)
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
// enable csurf to protect the website from Cross-Site Request Forgery (CSRF) attacks
app.use(csrf());

app.use(cartMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

// use the routues setup in the controllers folder
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use(protectRoutesMiddleware);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
