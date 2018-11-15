import { connect } from "dva"
import injectSheet from 'react-jss'
import globalStyle from "../style/globalStyle"


export default function mapStateAndStyle( styles: any = {}, stateFn: any = props => props ) {
  styles = {
    ...globalStyle,
    ...styles,
  }
  return component =>  connect( stateFn )( injectSheet( styles )( component ) )
}
