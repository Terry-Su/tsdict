import getDefaults from '../utils/getDefaults'

const files = require.context('.', false, /\.ts$/)

const ModelMap = getDefaults(files)
console.log('ModelMap', ModelMap)

export default ModelMap
