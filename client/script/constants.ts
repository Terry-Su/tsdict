import * as PATH from 'path'

const { resolve } = PATH


export const ROOT = resolve( __dirname, '../' )
export const SRC = resolve( ROOT, 'src' )
export const SHARED = resolve( ROOT, '../shared' )

export const ENTRY = resolve( SRC, 'entry.tsx' )
export const OUTPUT = resolve( ROOT, 'build' )

export const OUTPUT_FILE_NAME = 'bundle.js'

export const ENTRY_INDEX_HTML = resolve( SRC, 'index.html' )
export const OUTPUT_INDEX_HTML = resolve( OUTPUT, 'index.html' )

export const ENTRY_INDEX_CACHE = resolve( SRC, 'cache.appcache' )
export const OUTPUT_INDEX_CACHE = resolve( OUTPUT, 'cache.appcache' )

export const ENTRY_MANIFEST_CACHE = resolve( SRC, 'manifest.json' )
export const OUTPUT_MANIFEST_CACHE = resolve( OUTPUT, 'manifest.json' )

export const ENTRY_SW = resolve( SRC, 'sw.js' )
export const OUTPUT_SW = resolve( OUTPUT, 'sw.js' )
