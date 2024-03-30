/* eslint-disable @next/next/no-img-element */
import { type _Object } from "@aws-sdk/client-s3";
import { createImageUrlFromObjectKey } from "~/lib/utils";
import { Button } from "./ui/button";
import { RefreshCcwIcon, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { type ChangeEvent } from "react";

interface ImageUploaderProps {
  images: _Object[] | undefined;
  deleteImage: (key: string) => void;
  deletingPending: boolean;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPending: boolean;
  handleFileUpload: () => void;
  fileToUpload: Uint8Array | undefined;
}

export const ImageUploader = ({
  images,
  deleteImage,
  deletingPending,
  handleFileChange,
  isPending,
  handleFileUpload,
  fileToUpload,
}: ImageUploaderProps) => (
  <div className="flex flex-col gap-2">
    <div className="grid grid-cols-2 gap-2">
      {images?.map((image) => {
        if (image.Key === undefined) {
          return null;
        }

        return (
          <div className="flex flex-col gap-1" key={image.Key}>
            <img
              className="h-[100px] w-full object-cover"
              alt=""
              src={createImageUrlFromObjectKey(image?.Key ?? "")}
            />
            <Button
              size="sm"
              type="button"
              className="w-full"
              variant="destructive"
              onClick={() => deleteImage(image.Key!)}
            >
              {deletingPending ? (
                <RefreshCcwIcon className="animate-spin" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </div>
        );
      })}
    </div>
    <div className="flex gap-2">
      <Input onChange={handleFileChange} type="file" accept="image/*" />
      <Button
        onClick={handleFileUpload}
        type="button"
        variant="secondary"
        disabled={isPending || !fileToUpload}
      >
        {isPending ? <RefreshCcwIcon className="animate-spin" /> : "Upload"}
      </Button>
    </div>
  </div>
);
