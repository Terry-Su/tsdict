const Koa = require( 'koa' )
const app = new Koa()

app.use( ctx => {
  const { path } = ctx
  ctx.body = 'Hello Koa'

  switch( path ) {
    case '/':
      ctx.body = 'Hello Koa'
      break
    case '/test':
      ctx.body = 'Hello Test'
      break
    default:
      break
  }


} )



app.listen( 3000 )