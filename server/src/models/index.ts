import express from 'express'
import { app } from "@src/app"
import { CLIENT_PUBLIC, STORE_ROOT } from '@src/constants/paths'
import TestHandler from './TestHandler'
import AddDirHandler from './AddDirHandler'

app.use( express.static( CLIENT_PUBLIC ) )
app.use( express.static( STORE_ROOT ) )

app.get( '/test', TestHandler )

app.post( '/AddDir', AddDirHandler )
