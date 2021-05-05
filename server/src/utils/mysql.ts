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

sqlQuery( `use tsdict;` )
sqlQuery( `create table if not exists \`models\`(
	\`id\` INT UNSIGNED AUTO_INCREMENT,
  \`dirId\` INT UNSIGNED,
    \`name\` VARCHAR(1000) NOT NULL,
    \`note\` VARCHAR(10000), 
    \`createTime\` INT UNSIGNED,
    \`reviewLevel\` INT unsigned,
    \`nextReviewTime\` INT unsigned,
    primary key (\`id\`)
);` )
sqlQuery( `create table if not exists \`dirs\`(
	\`id\` INT UNSIGNED AUTO_INCREMENT,
    \`name\` VARCHAR(1000) NOT NULL,
    \`previousId\` INT UNSIGNED,
    primary key (\`id\`)
);` )

// connection.query( ``, function ( error, results, fields ) {
//   if ( error ) throw error
//   // console.log( 'results', results )
// } )
// connection.query( 'SELECT 1 + 1 AS solution', function ( error, results, fields ) {
//   if ( error ) throw error
//   console.log( 'The solution is: ', results[ 0 ].solution )
// } )

// connection.end()