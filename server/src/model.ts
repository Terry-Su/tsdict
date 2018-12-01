import * as express from "express";
import app from ".";
import {
  GET_BACKUP_CLIENT_DATA_FILE,
  GET_STORE_MEDIA_FILE,
  GET_URL_RELATIVE_TO_STORE_ROOT
} from "./constants/paths";
import * as bodyParser from "body-parser";
import * as FS from "fs-extra";
import Delta from "_quill-delta@4.1.0@quill-delta";
import { DictDataWord } from "../../shared/__typings__/DictData";
import outputBase64Media from "./utils/outputBase64Media";
import isBase64Url from "./utils/isBase64Url";
import {URL} from 'url'

app.get("/", (req, res) => {
  res.send("Hello World!123");
});

app.post("/backup", (req: express.Request, res: express.Response) => {
  FS.outputJSONSync(GET_BACKUP_CLIENT_DATA_FILE(), req.body);
});

// replace the media(image for example) url with server url instead of base64 url
app.post("/resolveNote", (req: express.Request, res: express.Response) => {
  function replaceImage(url): string {
    let resolvedUrl = url;
    const prefix = req.protocol + '://' + req.get('host')

    // resolve base64 url
    if (isBase64Url(url)) {
      const extension = url
        .replace(/^data:.+?\//, "")
        .replace(/;base64,.+/, "");
      const path = `${GET_STORE_MEDIA_FILE()}.${extension}`;
      outputBase64Media(url, path);
      resolvedUrl = `${prefix}/${GET_URL_RELATIVE_TO_STORE_ROOT(path)}`
    }

    const cachedUrl = resolvedUrl
    resolvedUrl = new URL( resolvedUrl )

    resolvedUrl = `${prefix}${resolvedUrl.pathname}`
    // add prefix
    return resolvedUrl;
  }

  let note = req.body;
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
    res.send(note);
  }
});
