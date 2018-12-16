import { DictDataWord } from "../../shared/__typings__/DictData";
import { notNil } from "./utils/lodash";
import { flatten } from 'lodash'

export const getImageUrls = (words: DictDataWord[]) => flatten(
  words
    .filter(({ note }) => notNil(note) && notNil(note.ops))
    .map(({ note }) =>
      note.ops
        .filter(({ insert }: any) => insert && insert.image)
        .map(({ insert }: any) => insert.image)
    )
);

