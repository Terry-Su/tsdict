import mysql from 'mysql'
import getCustomConfig from '../utils/getCustomConfig'
export const connection = mysql.createConnection( {
  host    : 'localhost',
  user    : 'root',
  password: getCustomConfig().MYSQL_PWD,
  database: 'tsdict',
} )

connection.connect()

export const sqlQuery = ( sentence: string ): Promise<{results: any[], fields: any}> => new Promise( ( resolve, reject ) => {
    connection.query( sentence, function ( error, results, fields ) {
      if ( error ) throw error
      resolve( { results, fields } )
    } )
  } )

export const sqlEscape = mysql.escape

// connection.query( 'select * from `dirs`', function ( error, results, fields ) {
//   if ( error ) throw error
//   console.log( 'results', results )
// } )
// connection.query( 'SELECT 1 + 1 AS solution', function ( error, results, fields ) {
//   if ( error ) throw error
//   console.log( 'The solution is: ', results[ 0 ].solution )
// } )

// connection.end()