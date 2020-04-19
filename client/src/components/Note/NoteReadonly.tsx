import 'quill/dist/quill.snow.css'

import debounce from 'lodash/debounce'
import Quill from 'quill'
import React, { Component } from 'react'
import styled from 'styled-components'

import { TypeWord, TypeWordNote } from '@/__typings__/word'
import { MAX_PASTING_IMAGE_WIDTH } from '@/constants/numbers'
import appApi from '@/services/modules/appApi'
import { Actions, Selectors, States } from '@/utils/decorators'

interface Props {
  data?: TypeWordNote;
  [prop: string]: any
}

export default class NoteReadonly extends Component<Props> {
  quill: Quill;
  toolbarRef: any = React.createRef();
  editorRef: any = React.createRef();


  get editor(): HTMLDivElement {
    return this.editorRef.current
  }

  get selection(): any {
    return this.quill.getSelection()
  }

  get content(): any {
    return this.quill && this.quill.getContents()
  }

  componentDidMount() {
    this.initQuill()
  }

  componentWillUnmount() {
  }

  initQuill() {
    const self = this
    const quill = ( this.quill = new Quill( this.editor, {
      modules: {
        toolbar: {
          container: this.toolbarRef.current,
        },
      },
      readOnly: true,
      theme      : "snow",
    } ) )

    const { data } = this.props
    this.quill.setContents( data )
  }

  componentDidUpdate( prevProps ) {
    const { data } = this.props
    if ( data == null ) {
      this.quill.setContents( data )
    } else if (
      prevProps.data !== this.props.data &&
      JSON.stringify( data ) !== JSON.stringify( this.quill.getContents() )
    ) {
      const cachedSelection = this.selection
      this.quill.setContents( data )
      this.quill.setSelection( cachedSelection )
    }
  }
  render() {
    const { data, ...rest } = this.props
    return (
      <StyledRoot {...rest}>
        <div ref={this.toolbarRef} hidden></div>
        <div ref={this.editorRef} className="editor"/>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  .editor {
    font-size: 16px;
    /* border: 1px solid grey; */
  }
`
