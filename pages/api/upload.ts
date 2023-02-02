
// @ts-nocheck

import multer from "multer";
import streamifier from "streamifier";
const cloudinary = require("cloudinary").v2;
import type { NextApiRequest, NextApiResponse } from "next";

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ExtendedReq extends NextApiRequest {
  file: {
    buffer: string | Buffer | Uint8Array;
  };
}
export default function handler(req: ExtendedReq, res: NextApiResponse) {
  upload.single("file")(req, {}, async (uploadError) => {
    if (uploadError) {
      res.status(500).send(uploadError);
      return;
    }
    if (!req.body.type) req.body.type = "auto";
    if (!req.file || !req.file.buffer) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    await streamifier.createReadStream(req.file.buffer).pipe(
      cloudinary.uploader.upload_stream(
        {
          folder: req.body.folder,
          resource_type: req.body.type,
          public_id: req.body.public_id,
        },
        (err, result) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
    );
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
