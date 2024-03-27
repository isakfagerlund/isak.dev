export const dynamic = "force-dynamic";

import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

const Bucket = "burgers";
const s3 = new S3Client({
  endpoint: `https://${env.CLOUDFLARE_ID}.r2.cloudflarestorage.com`,
  region: "auto",
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

export async function GET(req: NextRequest) {
  const splitUrl = req.nextUrl.pathname.split("/");
  const Prefix = `cafes/${splitUrl[splitUrl.length - 1]}/`;
  console.log(Prefix);
  const response = await s3.send(new ListObjectsCommand({ Bucket, Prefix }));
  console.log(response);
  return NextResponse.json(response?.Contents ?? []);
}
