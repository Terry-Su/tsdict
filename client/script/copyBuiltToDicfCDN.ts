import fs from 'fs-extra'
import path from 'path'
const from = path.resolve(__dirname, '../build')
const to = path.resolve(__dirname, '../../tsdictCDN')

fs.copySync(from, to)
