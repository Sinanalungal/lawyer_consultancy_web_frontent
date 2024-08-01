import React, { useState } from "react";
import Cropper from "react-easy-crop";
import AdminPageTitle from "../PageTitle/AdminPageTitle";

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

const ImageCrop: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };
    } else {
      alert("Please upload an image file (PNG, JPG, GIF).");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };
    } else {
      alert("Please upload an image file (PNG, JPG, GIF).");
    }
  };

  const onAspectRatioChange = (value: number) => {
    setAspectRatio(value);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });
  };

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve(url);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, "image/jpeg");
    });
  };

  const onCropDone = async () => {
    if (selectedFile && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          selectedFile,
          croppedAreaPixels
        );
        setCroppedImageUrl(croppedImage);
        setSelectedFile(null);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onCropCancel = () => {
    setSelectedFile(null);
    setCroppedImageUrl("");
  };

  return (
    <div className="max-w-[600px] mx-auto flex flex-col items-center">
      {selectedFile && (
        <div className="w-full cropper z-50 bg-white rounded-xl p-5 max-[400px]:p-2 ">
          <p className=" flex my-5 justify-center ">
            <h1 className="w-full max-[400px]:text-xl  text-center text-gray-700 font-semibold text-2xl">
              Crop Image
            </h1>
          </p>
          <div className="w-full h-[400px]  relative">
            <Cropper
              image={selectedFile}
              aspect={aspectRatio}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              style={{
                containerStyle: {
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                },
              }}
            />
          </div>
          <div className="action-btns mx-auto py-4">
            <div className="aspect-ratios flex flex-wrap gap-1 justify-center max-[400px]:grid-cols-2 max-sm:gap-2 px-8 items-center">
              <label onClick={() => onAspectRatioChange(1 / 1)}>
                <button
                  type="button"
                  className={`${
                    aspectRatio === 1 / 1
                      ? "bg-gray-900"
                      : "border border-gray-500"
                  } py-2  items-center rounded px-3 flex justify-center space-x-1`}
                >
                  <div
                    className={`${
                      aspectRatio === 1 / 1 ? "border-white" : "border-gray-700"
                    } w-[10px] h-[10px] border-2`}
                  ></div>
                  <p
                    className={`${
                      aspectRatio === 1 / 1 ? "text-white" : "text-gray-700"
                    } text-[10px]`}
                  >
                    1:1
                  </p>
                </button>
              </label>
              <label onClick={() => onAspectRatioChange(4 / 3)}>
                <button
                  type="button"
                  className={`${
                    aspectRatio === 4 / 3
                      ? "bg-gray-900"
                      : "border border-gray-500"
                  } py-2 items-center rounded px-3 flex justify-center space-x-1`}
                >
                  <div
                    className={`${
                      aspectRatio === 4 / 3 ? "border-white" : "border-gray-700"
                    } w-[13px] h-[10px] border-2`}
                  ></div>
                  <p
                    className={`${
                      aspectRatio === 4 / 3 ? "text-white" : "text-gray-700"
                    } text-[10px]`}
                  >
                    4:3
                  </p>
                </button>
              </label>
              <label onClick={() => onAspectRatioChange(5 / 3)}>
                <button
                  type="button"
                  className={`${
                    aspectRatio === 5 / 3
                      ? "bg-gray-900"
                      : "border border-gray-500"
                  } py-2 items-center rounded px-3 flex justify-center space-x-1`}
                >
                  <div
                    className={`${
                      aspectRatio === 5 / 3 ? "border-white" : "border-gray-700"
                    } w-[14px] h-[10px] border-2`}
                  ></div>
                  <p
                    className={`${
                      aspectRatio === 5 / 3 ? "text-white" : "text-gray-700"
                    } text-[10px]`}
                  >
                    5:3
                  </p>
                </button>
              </label>
              <label onClick={() => onAspectRatioChange(16 / 9)}>
                <button
                  type="button"
                  className={`${
                    aspectRatio === 16 / 9
                      ? "bg-gray-900"
                      : "border border-gray-500"
                  } py-2 items-center rounded px-3 flex justify-center space-x-1`}
                >
                  <div
                    className={`${
                      aspectRatio === 16 / 9
                        ? "border-white"
                        : "border-gray-700"
                    } w-[16px] h-[10px] border-2`}
                  ></div>
                  <p
                    className={`${
                      aspectRatio === 16 / 9 ? "text-white" : "text-gray-700"
                    } text-[10px]`}
                  >
                    16:9
                  </p>
                </button>
              </label>
            </div>
          </div>
          <div className="w-full gap-2 my-5 flex justify-center">
            <div
              onClick={onCropCancel}
              className="px-3 py-2 font-semibold flex justify-center text-sm items-center text-black border border-gray-400 rounded cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={onCropDone}
              className="px-5 font-semibold text-sm py-2 flex justify-center bg-black text-white rounded cursor-pointer"
            >
              Save
            </div>
          </div>
        </div>
      )}

      {!selectedFile && !croppedImageUrl && (
        <div className="flex flex-col items-center justify-center w-full">
          <div
            className={`flex flex-col max-w-[600px] items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
                    ${
                      dragActive
                        ? "bg-gray-100 dark:bg-gray-600"
                        : "bg-gray-50 dark:bg-gray-700"
                    } 
                    dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </label>
          </div>
        </div>
      )}
      {croppedImageUrl && (
        <div className="w-full flex flex-col items-center mt-5">
          <img
            src={croppedImageUrl}
            alt="Cropped"
            className="max-w-[600px]  h-[400px] object-cover rounded-md shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ImageCrop;
