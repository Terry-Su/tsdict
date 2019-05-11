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
  toolbarRef: any = React.createRef();
  editorRef: any = React.createRef();

  get editor(): HTMLDivElement {
    return this.editorRef.current
  }

  get toolbar(): HTMLDivElement {
    return this.toolbarRef.current
  }

  get selection(): any {
    return this.quill.getSelection()
  }

  componentDidMount() {
    this.initQuill()
    this.editor.addEventListener( "paste", this.listenerPaste )
  }

  listenerPaste = ( event: any ) => {
    const self = this
    let { items } = event.clipboardData || event.originalEvent.clipboardData
    let blob = null
    for ( let item of items ) {
      if ( item.type.indexOf( "image" ) === 0 ) {
        blob = item.getAsFile()
      }
    }
    if ( blob !== null ) {
      event.preventDefault()
      const reader = new FileReader()
      reader.onload = function( event: any ) {
        const url = event.target.result
        self.insertImage( url )
      }
      reader.readAsDataURL( blob )
    }
  }

  insertImage( url: string ) {
    this.selection != null &&
      this.quill.insertEmbed(
        this.selection.index,
        "image",
        url
      )
  }

  componentWillUnmount() {
    this.editor.removeEventListener( "paste", this.listenerPaste )
  }

  initQuill() {
    const quill = ( this.quill = new Quill( this.editor, {
      modules: {
        // # reference: https://quilljs.com/docs/formats/
        toolbar: {
          container: this.toolbar,
        },
      },
      placeholder: "Compose an epic...",
      theme      : "snow",
    } ) )

    const { onChange, data } = this.props

    quill.on( "text-change", () => {
      const content = quill.getContents()
      onChange && onChange( content )
    } )

    this.quill.setContents( data )
  }

  componentDidUpdate() {
    const { data } = this.props
    if ( data == null ) {
      this.quill.setContents( data )
    } else if (
      JSON.stringify( data ) !== JSON.stringify( this.quill.getContents() )
    ) {
      const cachedSelection = this.selection
      this.quill.setContents( data )
      this.quill.setSelection( cachedSelection )
    }
  }
  render() {
    return (
      <StyledRoot>
        <div ref={this.toolbarRef}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
          </span>
          <span className="ql-formats">
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
        </div>
        <div ref={this.editorRef} />
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
`
