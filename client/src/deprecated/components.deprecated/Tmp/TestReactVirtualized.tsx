import React from 'react'
import { List } from 'react-virtualized'

// List data as an array of strings
const list = [
 'Easy windowing1',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 'Easy windowing2',
 // And so on...
]
 
function rowRenderer( {
 key, // Unique key within array of rows
 index, // Index of row within collection
 isScrolling, // Used for performance
 isVisible, // Used for performancee
 style, // Style object to be applied to row (to position it)
}: any ) {
 return (
 
<div key={key} style={style}>
   {list[ index ]}
 </div>
 
 )
}
 
// Render your list
const ListExample = () => (
 <List width={300} height={300} rowCount={list.length} rowHeight={20} rowRenderer={rowRenderer} />
)

export default ListExample