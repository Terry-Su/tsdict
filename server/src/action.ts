import * as express from "express";
import * as FS from "fs-extra";
import { GET_BACKUP_CLIENT_DATA_FILE } from "./constants/paths";

export function backup( data ) {
  FS.outputJSONSync(GET_BACKUP_CLIENT_DATA_FILE(), data);
}