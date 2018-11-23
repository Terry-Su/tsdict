import * as express from 'express'
import { TEST_FILE, GET_BACKUP_CLIENT_DATA_FILE } from './constants/paths';
import * as bodyParser from 'body-parser'
import * as FS from 'fs-extra'

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


app.get( '/', (req, res) => {
  res.send( 'Hello World!123' )
} )

// Enable cross-domain

app.post( '/backup', (req: express.Request, res: express.Response) => {
  console.log( GET_BACKUP_CLIENT_DATA_FILE() )
  FS.outputJSONSync( GET_BACKUP_CLIENT_DATA_FILE(), req.body )
} )


app.listen( 3000 )