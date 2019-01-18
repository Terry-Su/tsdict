import React from 'react'
import { AutoSizer, List as VirtualList } from 'react-virtualized'

type Props = {
  items: any[],
  rowHeight?: number,
  render: any,
}

export default function VirtualScrollingList( { 
  items = [],
  rowHeight = 54,
  render
  }: Props ) {
  const Render = render
  return (
    <AutoSizer>
      {( { width, height } ) => (
        <VirtualList
          width={width}
          height={height}
          rowCount={items.length}
          rowHeight={rowHeight}
          rowRenderer={( { key, index, style } ) => Render && <Render key={key} index={index} style={ style } virtualScrollingItem={ items[ index ] } />}
        />
      )}
    </AutoSizer>
  )
}
