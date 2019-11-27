const debug = require('debug')('app:startup');
const config = require('config')
const Joi = require('joi')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./middleware/logger');
const authenticator = require('./authenticator')
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const home = require('./routes/home')


app.set('view engine', 'pug');
app.set('views','./views')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use(authenticator);
app.use('./api/genres', genres);
app.use('/', home);


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled ...')
}

console.log(`Application name : ${config.get('name')}`)
console.log(`Mail : ${config.get('mail.host')}`)
console.log(`Mail Password : ${config.get('mail.password')}`)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`I am listening to port ${port}.`))

