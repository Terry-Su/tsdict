import getDefaults from '../utils/getDefaults'

const files = require.context( '.', false, /\.ts$/ )


export default getDefaults( files )