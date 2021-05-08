import express from 'express'
import { app } from "@src/app"
import { CLIENT_PUBLIC, CLIENT_PUBLIC_INDEX, STORE_ROOT } from '@src/constants/paths'
import Test from '../handlers/Test'
import DescribeDirInfo from '@src/handlers/DescribeDirInfo'
import AddDir from '@src/handlers/AddDir'
import DeleteDir from '@src/handlers/DeleteDir'
import RenameDir from '@src/handlers/RenameDir'
import AddModel from '@src/handlers/AddModel'
import ModifyModel from '@src/handlers/ModifyModel'
import DeleteModel from '@src/handlers/DeleteModel'
import DescribeDirTree from '@src/handlers/DescribeDirTree'
import DescribeModel from '@src/handlers/DescribeModel'
import UploadImage from '@src/handlers/UploadImage'

app.use( express.static( CLIENT_PUBLIC ) )
app.use( express.static( STORE_ROOT ) )


app.get( '/Test', Test )

// # dir
app.post( '/AddDir', AddDir )
app.post( '/DescribeDirInfo', DescribeDirInfo )
app.post( '/DescribeDirTree', DescribeDirTree )
app.post( '/DeleteDir', DeleteDir )
app.post( '/RenameDir', RenameDir )
// # model
app.post( '/AddModel', AddModel )
app.post( '/ModifyModel', ModifyModel )
app.post( '/DeleteModel', DeleteModel )
app.post( '/uploadImage', UploadImage )

// # upload
app.post( '/DescribeModel', DescribeModel )


app.get( '*', ( req, res ) => res.sendFile( CLIENT_PUBLIC_INDEX ) )