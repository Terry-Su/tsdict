import 'quill/dist/quill.snow.css'

import debounce from 'lodash/debounce'
import Quill from 'quill'
import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeWordNote } from '@/__typings__/word'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  data?: TypeWordNote;
  onChange?: ( content: TypeWordNote ) => void;
}

export default class Note extends Component<Props> {
  quill: Quill;
  rootRef: any = React.createRef();
  componentDidMount() {
    const { firstElementChild: container } = this.rootRef.current
    const quill = ( this.quill = new Quill( container, {
      modules: {
        toolbar: [
          // [ { header: [ 1, 2, false ] } ],
          [
            "bold",
            "italic",
            //  'underline',
          ],
          [ "image", "video" ],
        ],
      },
      placeholder: "Compose an epic...",
      theme      : "snow",
    } ) )

    const debouncedOnChange = debounce( ( delta, oldDelta, source ) => {
      // if ( source === 'user' ) {
      const content = quill.getContents()
      this.props.onChange && this.props.onChange( content )
      // }
    }, 1000 )

    quill.on( "text-change", debouncedOnChange )

    this.quill.setContents( this.props.data )
  }
  componentDidUpdate() {
    if ( this.props.data == null ) {
      this.quill.setContents( this.props.data )
    } else if (
      JSON.stringify( this.props.data ) !==
      JSON.stringify( this.quill.getContents() )
    ) {
      const cachedSelection = this.quill.getSelection()
      this.quill.setContents( this.props.data )
      this.quill.setSelection( cachedSelection )
    }
  }
  render() {
    return (
      <StyledRoot>
        <div
          ref={this.rootRef}
          dangerouslySetInnerHTML={{
            __html: `<div></div>`,
          }}
        />
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
`
