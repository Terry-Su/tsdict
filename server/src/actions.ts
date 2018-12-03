import * as express from "express";
import * as FS from "fs-extra";
import { GET_BACKUP_CLIENT_DATA_FILE, GET_STORE_MEDIA_FILE, GET_URL_RELATIVE_TO_STORE_ROOT, GET_STORE_IMAGE_FILES, STORE_ROOT } from "./constants/paths";
import isBase64Url from "./utils/isBase64Url";
import outputBase64Media from "./utils/outputBase64Media";
import { URL } from "url";
import { DictDataWord } from "../../shared/__typings__/DictData";
import { getImageUrls } from "./getters";
import * as PATH from "path";
const trash = require("trash");


export function backup( data ) {
  FS.outputJSONSync(GET_BACKUP_CLIENT_DATA_FILE(), data);
}

// replace the media(image for example) url with server url instead of base64 url
export function updateMedia( note, req: express.Request ) {
  function replaceImage(url): string {
    let resolvedUrl = url;
    const prefix = req.protocol + "://" + req.get("host");

    // resolve base64 url
    if (isBase64Url(url)) {
      const extension = url
        .replace(/^data:.+?\//, "")
        .replace(/;base64,.+/, "");
      const path = `${GET_STORE_MEDIA_FILE()}.${extension}`;
      outputBase64Media(url, path);
      resolvedUrl = `${prefix}/${GET_URL_RELATIVE_TO_STORE_ROOT(path)}`;
    }

    const cachedUrl = resolvedUrl;
    resolvedUrl = new URL(resolvedUrl);

    resolvedUrl = `${prefix}${resolvedUrl.pathname}`;
    // add prefix
    return resolvedUrl;
  }

  if (note) {
    const { ops } = note;
    note.ops = note.ops.map((item: any) => {
      if (item.insert && item.insert.image) {
        const sourceUrl = item.insert.image;
        let url = sourceUrl;
        try {
          url = replaceImage(sourceUrl);
        } catch (e) {
          console.log(e);
        }
        item.insert.image = url;
      }
      return item;
    });
  }
  return note
}

export function cleanUselessMedias( words: DictDataWord[] ) {
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

      console.log( relativePaths, relativePaths.includes( storeReltivePath ) )
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
    return true
  } catch (e) {}
  return null
}