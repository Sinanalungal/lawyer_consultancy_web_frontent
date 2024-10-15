import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { useToast } from "../Toast/ToastManager";

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface ImageCropProps {
  croppedImageUrl: string | null;
  setCroppedImageUrl: (url: string | null) => void;
}

const ImageCrop: React.FC<ImageCropProps> = ({
  croppedImageUrl,
  setCroppedImageUrl,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [dragActive, _setDragActive] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const { addToast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };
    } else {
      addToast("danger", "Please upload an image file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };
    } else {
      addToast("danger", "Please upload an image file.");
    }
  };

  const onAspectRatioChange = (value: number) => {
    setAspectRatio(value);
  };

  const onCropComplete = (croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // const createImage = (url: string): Promise<HTMLImageElement> => {
  //   return new Promise((resolve, reject) => {
  //     const image = new Image();
  //     image.addEventListener("load", () => resolve(image));
  //     image.addEventListener("error", (error) => reject(error));
  //     image.src = url;
  //   });
  // };

  // const getCroppedImg = async () => {
  //   if (!selectedFile || !croppedAreaPixels) {
  //     addToast("danger", "Please upload an image.");
  //     return;
  //   }
  //   const image = await createImage(selectedFile);
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");

  //   if (!ctx) {
  //     return null;
  //   }

  //   canvas.width = croppedAreaPixels.width;
  //   canvas.height = croppedAreaPixels.height;

  //   ctx.drawImage(
  //     image,
  //     croppedAreaPixels.x,
  //     croppedAreaPixels.y,
  //     croppedAreaPixels.width,
  //     croppedAreaPixels.height,
  //     0,
  //     0,
  //     croppedAreaPixels.width,
  //     croppedAreaPixels.height
  //   );

  //   return new Promise<string>((resolve, reject) => {
  //     canvas.toBlob((blob) => {
  //       if (blob) {
  //         const url = URL.createObjectURL(blob);
  //         resolve(url);
  //       } else {
  //         reject(new Error("Canvas is empty"));
  //       }
  //     }, "image/jpeg");
  //   });
  // };

  const onCropDone = () => {
    if (!selectedFile || !croppedAreaPixels) {
      addToast("danger", "Please upload an image .");
      return;
    }
    const canvas = document.createElement("canvas");
    const imageObj = new Image();
    imageObj.src = selectedFile;

    imageObj.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return null;
      }
      ctx.drawImage(
        imageObj,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      const croppedDataURL = canvas.toDataURL("image/jpeg");

      setCroppedImageUrl(croppedDataURL);
      setSelectedFile(null);
    };
  };

  const onCropCancel = () => {
    setSelectedFile(null);
    setCroppedImageUrl("");
  };

  return (
    <div className="max-w-[600px] mx-auto flex flex-col items-center">
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
      {selectedFile && !croppedImageUrl && (
        <div className="w-full cropper z-50 bg-white rounded-xl p-5 max-[400px]:p-2 ">
          <div className="w-full h-[400px] relative">
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
                    } w-[10px] h-[10px] border-2`}
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
            </div>
            <div className="my-4 flex justify-center items-center gap-5">
              <div
                onClick={onCropDone}
                className="px-5 font-semibold text-sm py-2 flex justify-center bg-black text-white rounded cursor-pointer"
              >
                Save
              </div>
              <div
                onClick={onCropCancel}
                className="px-5 font-semibold text-sm py-2 flex justify-center bg-gray-300 rounded cursor-pointer"
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}

      {croppedImageUrl && (
        <div className="max-w-[600px] mx-auto mt-4">
          <img
            src={croppedImageUrl}
            alt="Cropped"
            className="object-cover rounded-md"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCrop;
