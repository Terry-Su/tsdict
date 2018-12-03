import * as express from 'express'
import * as https from 'https'
import * as FS from 'fs'
import * as PATH from 'path'
import { STORE_ROOT } from './constants/paths';
import { PORT } from '../config';

const app = express()
export default app


// Enable cross-domain
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// resolve post body data
app.use(express.json({
  limit: '50mb'
}));



import './model'


app.listen( PORT )
