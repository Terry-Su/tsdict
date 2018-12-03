import * as express from "express";
import app from ".";
import {
  GET_BACKUP_CLIENT_DATA_FILE,
  GET_STORE_MEDIA_FILE,
  GET_URL_RELATIVE_TO_STORE_ROOT,
  GET_STORE_IMAGE_FILES,
  STORE_ROOT,
  STORE_CURRENT_DATA_FILE,
  CLIENT_PUBLIC,
  CLIENT_PUBLIC_INDEX,
  CLIENT_PUBLIC_APP_CACHE
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
import { backup } from "./action";
const trash = require("trash");

app.use( express.static( STORE_ROOT ) )
app.use( express.static( CLIENT_PUBLIC ) )


app.get('/', (req, res) => {
  res.sendFile( CLIENT_PUBLIC_INDEX )
})

// app.get('/cache.appcache', (req, res) => {
//   res.sendFile(CLIENT_PUBLIC_APP_CACHE)
// })
app.get( '/cache', (req, res) => {
  const storeImageFiles = GET_STORE_IMAGE_FILES();

  // const urls = storeImageFiles.map( path => `${req.protocol}/${req.get('host')}/${PATH.relative(STORE_ROOT, path)}` )
  let urls = []
  try {
    const clientData = FS.readJSONSync(STORE_CURRENT_DATA_FILE)
    urls = flatten(
      clientData.mainData.words
        .filter(({ note }) => notNil(note) && notNil(note.ops))
        .map(({ note }) =>
          note.ops
            .filter(({ insert }: any) => insert && insert.image)
            .map(({ insert }: any) => insert.image)
        )
    );  
  }
  catch(e) {console.log(e)}

  const urlsStr = urls.join('\n')

  const text =
`CACHE MANIFEST

CACHE:
#NETWORK:
index.html
bundle.js
${urlsStr}

NETWORK:
*

# Version, used to update source
# 1.0.0-3-${new Date().getTime()}
`
res.send( text )
} )

app.post("/backup", (req: express.Request, res: express.Response) => {
  try {
    backup( req.body )
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
    backup( req.body )
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
    backup( req.body )
    FS.outputJSONSync(STORE_CURRENT_DATA_FILE, req.body);
    res.send(true);
    return;
  } catch (e) {
    console.log(e);
  }
  res.send(null);
});

// replace the media(image for example) url with server url instead of base64 url
app.post("/resolveNote", (req: express.Request, res: express.Response) => {
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

app.post("/cleanUseless", (req: express.Request, res: express.Response) => {
  try {
    const words: DictDataWord[] = req.body;
    const imageUrls = flatten(
      words
        .filter(({ note }) => notNil(note) && notNil(note.ops))
        .map(({ note }) =>
          note.ops
            .filter(({ insert }: any) => insert && insert.image)
            .map(({ insert }: any) => insert.image)
        )
    );
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
    res.send(true);
  } catch (e) {}
  res.send(null);
});
