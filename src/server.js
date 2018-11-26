import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import http from 'http';
import bodyParser from 'body-parser';
import passport from 'passport';

import authRoutes from './routes/auth';

const app = express();

app.use(bodyParser.json())
require('./helpers/passport');
app.use(passport.initialize());

require(__dirname + '/models');

app.use('/api/auth', authRoutes);

mongoose.connect(config.mongoUri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.once('open', function() {
  console.log('db connected', config.mongoUri);
});
db.on('error', function(err) {
  console.log('db connection error:', err);
})

const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
