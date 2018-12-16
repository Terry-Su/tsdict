import * as express from "express";
import * as FS from "fs-extra";
import {
  GET_BACKUP_CLIENT_DATA_UNIQUE_FILE,
  GET_STORE_IMAGE_UNIQUE_FILE,
  GET_URL_RELATIVE_TO_STORE_ROOT,
  GET_STORE_IMAGE_FILES,
  STORE_ROOT,
  GET_STORE_IMAGE_UNIQUE_FILE_NAME,
  GET_STORE_IMAGE_FILE_BY_NAME,
  GET_STORE_BACKUP_IMAGE_FILE_BY_NAME
} from "./constants/paths";
import isBase64Url from "./utils/isBase64Url";
import outputBase64Media from "./utils/outputBase64Media";
import { URL } from "url";
import { DictDataWord } from "../../shared/__typings__/DictData";
import { getImageUrls } from "./getters";
import * as PATH from "path";
const trash = require("trash");

export function backup(data) {
  FS.outputJSONSync(GET_BACKUP_CLIENT_DATA_UNIQUE_FILE(), data);
}

// replace the media(image for example) url with server url instead of base64 url
export function updateMedia(word: DictDataWord, req: express.Request) {
  const { note, name: wordName } = word

  function replaceServerUrl( url: string ) {
    const prefix = req.protocol + "://" + req.get("host");
    const urlInfo = new URL(url)
    return `${prefix}${urlInfo.pathname}`
  }

  function replaceImage(url): string {
    let resolvedUrl = url;
    const prefix = req.protocol + "://" + req.get("host");

    // resolve base64 url
    if (isBase64Url(url)) {
      const extension = url
        .replace(/^data:.+?\//, "")
        .replace(/;base64,.+/, "");
      
      const name = `${wordName}-${GET_STORE_IMAGE_UNIQUE_FILE_NAME()}`
      const path = `${GET_STORE_IMAGE_FILE_BY_NAME(name)}.${extension}`;
      outputBase64Media(url, path);

      const backupPath = `${GET_STORE_BACKUP_IMAGE_FILE_BY_NAME(name)}.${extension}`
      outputBase64Media( url, backupPath )
      resolvedUrl = `${prefix}/${GET_URL_RELATIVE_TO_STORE_ROOT(path)}`;
    }

    const res = replaceServerUrl( resolvedUrl )
    return res;
  }

  if (note) {
    const { ops } = note;
    note.ops = note.ops.map((item: any) => {
      if (item.insert) {
        if (item.insert.image) {
          const sourceUrl = item.insert.image;
          let url = sourceUrl;
          try {
            url = replaceImage(sourceUrl);
          } catch (e) {
            console.log(e);
          }
          item.insert.image = url;
        }
        if ( item.insert.video ) {
          try {
            item.insert.video = replaceServerUrl(item.insert.video)
          } catch (e) {
            console.log(e);
          }
        }
      }
      return item;
    });
  }
  return word;
}

export function cleanUselessMedias(words: DictDataWord[]) {
  try {
    const imageUrls = getImageUrls(words);
    const relativePaths = imageUrls.map(url => {
      try {
        url = new URL(url);
        return url.pathname;
      } catch (e) {
        console.log(e);
      }
      return url;
    });

    const storeImageFiles = GET_STORE_IMAGE_FILES();

    storeImageFiles.forEach(storeImageFile => {
      const storeReltivePath = `/${PATH.relative(STORE_ROOT, storeImageFile)}`;
      if (
        relativePaths &&
        relativePaths.length > 0 &&
        !relativePaths.includes(storeReltivePath)
      ) {
        trash(storeImageFile).then(() => {
          `${storeImageFile} was removed into trash`;
        });
      }
    });
    return true;
  } catch (e) {}
  return null;
}
