import getDefaults from '../utils/getDefaults'

const files = require.context( '.', false, /\.ts$/ )


const ModelMap = getDefaults( files )

export default ModelMap