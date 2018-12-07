import { connect } from 'dva'
import injectSheet from 'react-jss'

import globalStyle from '../style/globalStyle'

export default function mapStateAndStyle<P>( styles: any = {}, stateFn: any = ( props: P ) => props ) {
  styles = {
    ...globalStyle,
    ...styles,
  }
  return component =>  connect( stateFn )( injectSheet( styles )( component ) )
}
