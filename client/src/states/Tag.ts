import { TypeTag } from '@/__typings__'

export default class Tag {
  tags: TypeTag[] = []

  SET_TAGS = ( tags: TypeTag[] ) => { this.tags = tags }
}