import React from 'react'
import { FixedSizeList as List } from 'react-window'

const Row = ( { index, style }: any ) => <div style={style}>Row {index}</div>

export default function TestReactWindow() {
  return (
    <List height={150} itemCount={1000} itemSize={35} width={300}>
      {Row}
    </List>
  )
}
