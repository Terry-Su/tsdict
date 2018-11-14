import { OnlineLink } from "../__typings__/index.spec"
import getUniqueId from "../utils/getUniqueId"

export const defaultOnlineLinks: OnlineLink[] = [
  {
    label: 'Bing',
    url  : 'https://bing.com/images/search?q=',
  },
  {
    label: 'Merriam-Webster',
    url  : 'https://www.merriam-webster.com/dictionary/',
  },
  {
    label: '1',
    url  : '',
  },
  {
    label: '2',
    url  : '',
  },
  {
    label: '3',
    url  : '',
  }
].map( item => ( {
  ...item,
  id: getUniqueId()
} ) )