import { OnlineLink, Tree } from "../__typings__"
import getUniqueId from "../utils/getUniqueId"
import { DictDataWord } from "../../../shared/__typings__/DictData"
import { NoteData } from "../components/Note/Note"

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


export const defaultWords: DictDataWord[] = [
  { name: 'A' },
  { name: 'B' },
].map( item => ( {
  ...item,
  id  : getUniqueId(),
  note: null,
} ) )

export const defaultTree: Tree = {
  name : 'root',
  id   : getUniqueId(),
  nodes: []
}
