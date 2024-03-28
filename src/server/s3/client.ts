import { S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";

export const S3Bucket = "burgers";

export const s3 = new S3Client({
  endpoint: `https://${env.CLOUDFLARE_ID}.r2.cloudflarestorage.com`,
  region: "auto",
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});
