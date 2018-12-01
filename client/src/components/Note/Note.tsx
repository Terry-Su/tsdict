import React, { Component } from "react"
import mapStateAndStyle from "../../utils/mapStateAndStyle"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import Delta from "_quill-delta@4.1.0@quill-delta"

export type NoteData = Delta
export default mapStateAndStyle()(
  class Note extends Component<{
    data: NoteData,
    onChange: ( content: NoteData ) => void
  }, any> {
    quill: Quill

    rootRef: any = React.createRef()

    componentDidMount() {
      const { firstElementChild: container } = this.rootRef.current
      const quill = this.quill = new Quill( container, {
        modules: {
          toolbar: [
            [ { header: [ 1, 2, false ] } ],
            [ 'bold', 'italic', 'underline' ],
            [ 'image', 'code-block' ]
          ]
        },
        placeholder: 'Compose an epic...',
        theme      : 'snow'
      } )

      quill.on( 'text-change', ( delta, oldDelta, source ) => {
        const content = quill.getContents()
        this.props.onChange( content )
      } )

      this.quill.setContents( this.props.data )
    }
    componentDidUpdate() {
      if ( JSON.stringify( this.props.data ) !== JSON.stringify( this.quill.getContents() ) ) {
        this.quill.setContents( this.props.data ) 
      }
    }
    render() {
      return (
        <div
          ref={this.rootRef}
          dangerouslySetInnerHTML={{
            __html: `
        <div>
        </div>
        `
          }}
        />
      )
    }
  }
)
