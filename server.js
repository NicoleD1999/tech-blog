
//requiring built in 'path'
const path = require('path');
// requiring npm package express & npm package express-session
const express = require('express');
const session = require('express-session');
//requiring npm package express-handlebars
const exphbs = require('express-handlebars');
//requiring index file within the controllers folder
const routes = require('./controllers');
//requiring helper.js from utils folder
const helpers = require('./utils/helper');
//requiring connection.js from config folder
const sequelize = require('./config/connection');
//?
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// assinging express function to variable 'app'
const app = express();
// assigning which port we want to listen on to variable 'PORT"
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// 
const sess = {
  secret: 'Super secret secret',
  cookie: {maxAge:40000},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT} `));
});


