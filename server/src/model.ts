import * as express from "express";
import app from ".";
import {
  GET_BACKUP_CLIENT_DATA_UNIQUE_FILE,
  GET_STORE_IMAGE_UNIQUE_FILE,
  GET_URL_RELATIVE_TO_STORE_ROOT,
  GET_STORE_IMAGE_FILES,
  STORE_ROOT,
  STORE_CURRENT_DATA_FILE,
  CLIENT_PUBLIC,
  CLIENT_PUBLIC_INDEX,
  CLIENT_PUBLIC_APP_CACHE,
  STORE_PHONETIC_SYMBOLS_FILE
} from "./constants/paths";
import * as bodyParser from "body-parser";
import * as FS from "fs-extra";
import Delta from "_quill-delta@4.1.0@quill-delta";
import { DictDataWord } from "../../shared/__typings__/DictData";
import outputBase64Media from "./utils/outputBase64Media";
import isBase64Url from "./utils/isBase64Url";
import { URL } from "url";
import { flatten } from "lodash";
import { notNil } from "./utils/lodash";
import * as PATH from "path";
import { backup, updateMedia, cleanUselessMedias } from "./actions";
import { getImageUrls } from "./getters";

app.use(express.static(STORE_ROOT));
app.use(express.static(CLIENT_PUBLIC));

app.get("/", (req, res) => {
  res.sendFile(CLIENT_PUBLIC_INDEX);
});

app.get("/cache", (req, res) => {
  const storeImageFiles = GET_STORE_IMAGE_FILES();

  // const urls = storeImageFiles.map( path => `${req.protocol}/${req.get('host')}/${PATH.relative(STORE_ROOT, path)}` )
  let urls = [];
  try {
    const clientData = FS.readJSONSync(STORE_CURRENT_DATA_FILE);
    urls = flatten(
      clientData.core.words
        .filter(({ note }) => notNil(note) && notNil(note.ops))
        .map(({ note }) =>
          note.ops
            .filter(({ insert }: any) => insert && (insert.image || insert.video))
            .map(({ insert }: any) => {
              if ( notNil( insert.image ) ) {
                return insert.image
              }
              if ( notNil( insert.video ) ) {
                return insert.video
              }
            })
        )
    );
  } catch (e) {
    console.log(e);
  }

  const urlsStr = urls.join("\n");

  const text = `CACHE MANIFEST

CACHE:
index.html
bundle.js
${urlsStr}

#NETWORK:
#*

# Version, used to update source
# 1.0.0-3`;
  res.send(text);
});

app.post("/backup", (req: express.Request, res: express.Response) => {
  try {
    backup(req.body);
    res.send(true);
    return;
  } catch (e) {
    console.log(e);
  }
  res.send(null);
});

app.post("/pull", (req: express.Request, res: express.Response) => {
  let data;
  try {
    backup(req.body);
    data = FS.readJSONSync(STORE_CURRENT_DATA_FILE);
  } catch (e) {
    console.log(e);
  }

  if (notNil(data)) {
    return res.send(data);
  }
  return res.send(null);
});

app.post("/push", (req: express.Request, res: express.Response) => {
  try {
    backup(req.body);
    FS.outputJSONSync(STORE_CURRENT_DATA_FILE, req.body);
    res.send(true);
    return;
  } catch (e) {
    console.log(e);
  }
  res.send(null);
});

// replace the media(image for example) url with server url instead of base64 url
app.post("/updateMedia", (req: express.Request, res: express.Response) => {
  let { body: word } = req;
  word = notNil( word ) ? updateMedia(word, req) : word
  res.send(word);
});

app.post("/updateMedias", (req: express.Request, res: express.Response) => {
  let words: DictDataWord[] = req.body;
  words.forEach( word => {
    if ( notNil( word ) ) {
      updateMedia( word, req )
    }
  } )
  cleanUselessMedias( words )
  res.send( words )
});


app.post( '/fetchPhoneticSymbol', (req, res) => {
  const word: DictDataWord = req.body
  const data = FS.readJsonSync( STORE_PHONETIC_SYMBOLS_FILE )
  res.send(data[word.name] || [])
} )
