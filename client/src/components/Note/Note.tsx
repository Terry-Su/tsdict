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
  onChange?: ( content: TypeWordNote ) => void;
}

@Selectors( 'app', 'searchingWord' )
export default class Note extends Component<Props> {
  searchingWord?: TypeWord

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

  get content(): any {
    return this.quill && this.quill.getContents()
  }

  get isEmptyContent(): boolean {
    return this.content == null || ( this.content.ops && [ '↵', '\n' ].some( char => char === this.content.ops[ 0 ].insert ) )
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
      // console.log( item.type )
      if ( item.type.indexOf( "image" ) === 0 ) {
        blob = item.getAsFile()
      }
    }
    if ( blob !== null ) {
      event.preventDefault()
      const reader = new FileReader()
      reader.onload = async function( event: any ) {
        const url = event.target.result 
        appApi.pasteImage( { word: self.searchingWord, base64Url: url } ).then( serverImageUrl => {
          self.insertImage( serverImageUrl )
        } ).catch( e => {
          console.log( e )
        } )
      }
      reader.readAsDataURL( blob )
    }
  };

  insertImage( url: string ) {
    this.selection != null &&
      this.quill.insertEmbed( this.selection.index, "image", url )
  }

  resizeImage( url: string ) {
    return new Promise( resolve => {
      const image = new Image()
      image.crossOrigin = "anonymous" 
      image.onload = () => {
        const { width, height } = image
        if ( width > MAX_PASTING_IMAGE_WIDTH ) {
          const compressRate = MAX_PASTING_IMAGE_WIDTH / width
          const compressedWidth = width * compressRate
          const compressedHeight = height * compressRate

          const canvas: HTMLCanvasElement = document.createElement( "canvas" )
          canvas.width = compressedWidth
          canvas.height = compressedHeight
          // document.body.prepend( canvas )
          const ctx = canvas.getContext( "2d" )
          ctx.drawImage( image, 0, 0, compressedWidth, compressedHeight )
          const dataUrl = canvas.toDataURL()
          // console.log( dataUrl )
          resolve( dataUrl )
        } else {
          resolve( url )
        }
      }
      image.src = url
    } )
  }

  componentWillUnmount() {
    this.editor.removeEventListener( "paste", this.listenerPaste )
  }

  initQuill() {
    const self = this
    const quill = ( this.quill = new Quill( this.editor, {
      modules: {
        // # reference: https://quilljs.com/docs/formats/
        toolbar: {
          container: this.toolbar,
          handlers: {
            image() {
              let fileInput = this.container.querySelector('input.ql-image[type=file]');
              if ( fileInput == null ) {
                
                /**
                 * Step1. select local image
                 *
                 */
              const selectLocalImage = () => {
                fileInput = document.createElement('input');
                fileInput.setAttribute('type', 'file');
                fileInput.click();
              
                // Listen upload local image and save to server
                fileInput.onchange = () => {
                  const file = fileInput.files[0];
                  // file type is only image.
                  if (/^image\//.test(file.type)) {
                    if ( file.type !== 'image/gif' && file.type !== 'image/webp' ) { alert('Only supports uploading gif or webp!'); return }
                    const formData = new FormData()
                    formData.append( 'file', file )
                    formData.append( 'word', JSON.stringify(self.searchingWord) )
                    appApi.uploadGif( formData ).then( url => {
                      // push image url to rich editor.
                      const range = self.quill.getSelection();
                      self.quill.insertEmbed(range.index, 'image', url);
                    } )
                  } else {
                    console.warn('You could only upload images.');
                  }
                };
              }
            
            
              selectLocalImage()
              }
            }
          }
        },
      },
      placeholder: "Compose an epic...",
      theme      : "snow",
    } ) )

    const { onChange, data } = this.props

    quill.on( "text-change", ( a, b, c ) => {
      const content = quill.getContents()
      onChange && onChange( content )
    } )

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
    return (
      <StyledRoot>
        <div ref={this.toolbarRef} hidden={false && this.isEmptyContent}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
          </span>
          <span className="ql-formats">
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
        </div>
        <div ref={this.editorRef} className="editor"/>
      </StyledRoot>
    )
  }
}

const StyledRoot = styled.div`
  width: 100%;

  .editor {
    font-size: 16px;
    border: 1px solid grey;
  }
`
