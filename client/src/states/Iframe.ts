import { TypeIframeLink } from '@/__typings__/iframe'
import { removeArrayElement } from '@/utils/js'

export default class Iframe {
  iframeLinks: TypeIframeLink[] = [
    { label: 'Cambridge', url: `https://dictionary.cambridge.org/dictionary/english/` },
    { label: 'Bing Image', url: `https://bing.com/images/search?q=` },
  ]
  visibleDialogIframeSetting: boolean = false

  SHOW_DIALOG_IFRAME_SETTING = () => { this.visibleDialogIframeSetting = true }
  HIDE_DIALOG_IFRAME_SETTING = () => { this.visibleDialogIframeSetting = false }

  SET_IFRAME_LINKS = ( iframeLinks: TypeIframeLink[] ) => { this.iframeLinks = iframeLinks }
  RESET_IFRAME_LINKS = () => { this.iframeLinks = new Iframe().iframeLinks }
  ADD_IFRAME_LINK = ( iframeLink: TypeIframeLink ) => { this.iframeLinks.push( iframeLink ); this.RERESH_IFRAME_LINKS() }
  DELETE_IFRAME_LINK = ( iframeLink: TypeIframeLink ) => { removeArrayElement( this.iframeLinks, iframeLink ); this.RERESH_IFRAME_LINKS() }
  RERESH_IFRAME_LINKS = () => { this.iframeLinks = [ ...this.iframeLinks ] }
  SET_IFRAME_LINK_LABEL = ( iframeLink: TypeIframeLink, label: string ) => { iframeLink.label = label; this.RERESH_IFRAME_LINKS() }
  SET_IFRAME_LINK_URL = ( iframeLink: TypeIframeLink, url: string ) => { iframeLink.url = url; this.RERESH_IFRAME_LINKS() }
  SET_IFRAME_LINK_PREFIX = ( iframeLink: TypeIframeLink, prefix: string ) => { iframeLink.prefix = prefix; this.RERESH_IFRAME_LINKS() }
  SET_IFRAME_LINK_POSTFIX = ( iframeLink: TypeIframeLink, postfix: string ) => { iframeLink.postfix = postfix; this.RERESH_IFRAME_LINKS() }
}