import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import "dotenv/config";

import * as BunnyStorageSDK from "@bunny.net/storage-sdk";

const IMG_DIR = "./tmp";

const sz_zone = process.env.CDN_STORAGE_ZONE!;
const access_key = process.env.CDN_STORAGE_ACCESS_KEY!;
const sz = BunnyStorageSDK.zone.connect_with_accesskey(
  BunnyStorageSDK.regions.StorageRegion.Falkenstein,
  sz_zone,
  access_key,
);

export const uploadFileToCDN = async (filename: string) => {
  const readStream = createReadStream(`${IMG_DIR}/${filename}`);
  const webStream = Readable.toWeb(readStream);
  return BunnyStorageSDK.file.upload(sz, `/gossip/${filename}`, webStream);
};
