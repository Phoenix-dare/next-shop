import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { PublicID } from "../types/types";


const ImageUpload = ({publicId,setPublicId}:{publicId:PublicID,setPublicId:Function}) => {
  
  const [file, setFile] = useState<string | Blob | null>(null) as [string | Blob, Function];
  const [image, setImage] = useState<Record <string,unknown>|null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async (e:React.BaseSyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("folder", "img-folder");
      data.append("public_id", publicId);
      const res = await axios.post("/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      setImage(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="upload">
      {image && (
        <Image className="w-full h-full object-cover" src={image?.url as string }  alt="product-image" width={400} height={400} />
      )}
      <input className="bg-gray-200 p-2 rounded-lg w-full" type="text" onChange={(e) => setPublicId(e.target.value)} />
      <input className="bg-gray-200 p-2 rounded-lg w-full" type="file" onChange={handleChange} />
      <button className="bg-blue-500 p-2 rounded-lg text-white" onClick={(e)=>handleUpload(e)}>Upload</button>
    </div>
);

      }
export default ImageUpload;
