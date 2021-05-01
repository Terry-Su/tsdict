import express from 'express'
import { app } from "@src/app"
import { CLIENT_PUBLIC, CLIENT_PUBLIC_INDEX, STORE_ROOT } from '@src/constants/paths'
import Test from '../handlers/Test'
import DescribeDirInfo from '@src/handlers/DescribeDirInfo'
import AddDir from '@src/handlers/AddDir'
import DeleteDir from '@src/handlers/DeleteDir'
import RenameDir from '@src/handlers/RenameDir'
import AddModel from '@src/handlers/AddModel'

app.use( express.static( CLIENT_PUBLIC ) )
app.use( express.static( STORE_ROOT ) )


app.get( '/Test', Test )

app.post( '/AddDir', AddDir )
app.post( '/DescribeDirInfo', DescribeDirInfo )
app.post( '/DeleteDir', DeleteDir )
app.post( '/RenameDir', RenameDir )
app.post( '/AddModel', AddModel )
app.get( '*', ( req, res ) => res.sendFile( CLIENT_PUBLIC_INDEX ) )