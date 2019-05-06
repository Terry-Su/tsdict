import React, { Component } from 'react'

import mapStateAndStyle from '@/utils/mapStateAndStyle'
import Button from '@material-ui/core/Button'

export default mapStateAndStyle( {
  entry: {
    display   : 'grid',
    placeItems: 'center',
    width     : '30px',
    height    : '30px',
    fontSize  : '12px',
    textAlign : 'center',
  }
} )(
  class ExitButton extends Component<any, any> {
    render() {
      const { classes: c, onClick } = this.props
      return (
        <Button className={ c.entry } variant="contained"  onClick={ e => onClick && onClick( e ) }>X</Button>
      )
    }
  }
)
