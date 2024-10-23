import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { useToast } from "../Toast/ToastManager";
import { Upload,  X } from "lucide-react";

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
  const [dragActive, setDragActive] = useState(false);
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
      addToast("danger", "Please upload an image file.");
    }
  };

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropDone = () => {
    if (!selectedFile || !croppedAreaPixels) {
      addToast("danger", "Please upload an image.");
      return;
    }

    const imageObj = new Image();
    imageObj.src = selectedFile;

    imageObj.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const scaleX = imageObj.naturalWidth / imageObj.width;
      const scaleY = imageObj.naturalHeight / imageObj.height;
      const pixelCrop = {
        x: Math.floor(croppedAreaPixels.x * scaleX),
        y: Math.floor(croppedAreaPixels.y * scaleY),
        width: Math.floor(croppedAreaPixels.width * scaleX),
        height: Math.floor(croppedAreaPixels.height * scaleY),
      };

      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        imageObj,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      const croppedDataURL = canvas.toDataURL("image/jpeg");
      setCroppedImageUrl(croppedDataURL);
      setSelectedFile(null);
    };
  };

  const onCropCancel = () => {
    setSelectedFile(null);
    setCroppedImageUrl(null);
  };

  const AspectRatioButton = ({ ratio, label }: { ratio: number; label: string }) => (
    <button
      type="button"
      onClick={() => setAspectRatio(ratio)}
      className={`
        px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium
        ${aspectRatio === ratio 
          ? "bg-blue-900 text-white shadow-lg" 
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!selectedFile && !croppedImageUrl && (
        <div className=" rounded-xl shadow mb-4">
          <div
            className={`
              relative flex flex-col items-center justify-center w-full h-72
              border-2 border-dashed rounded-xl transition-all duration-200
              ${dragActive 
                ? "border-blue-900 bg-blue-50" 
                : "border-gray-300 hover:border-blue-900 bg-gray-50"
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Upload className="w-8 h-8 text-blue-900" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    Drop your image here
                  </p>
                  <p className="mt-1 text-xs text-center text-gray-500">
                    or <span className="text-blue-900 hover:underline">browse</span> to choose a file
                  </p>
                </div>
                <p className="text-[10px] text-center text-gray-400">
                  Support formats: JPG, PNG, GIF (max 10MB)
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
        <div className="bg-white rounded-xl shadow overflow-hidden mb-4">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Crop Image</h3>
          </div>
          
          <div className="w-full h-[400px] px-1  relative bg-gray-50 ">
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
                  backgroundColor: "#fafafa",
                },
              }}
            />
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ">Aspect Ratio</label>
              <div className="flex flex-wrap  gap-2">
                <AspectRatioButton ratio={1/1} label="Square (1:1)" />
                <AspectRatioButton ratio={4/3} label="Standard (4:3)" />
                <AspectRatioButton ratio={16/9} label="Widescreen (16:9)" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2  bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onCropCancel}
                className="px-4 py-2 text-xs rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onCropDone}
                className="px-4 py-2 text-xs rounded-lg bg-blue-900 text-white hover:bg-blue-950 transition-colors duration-200"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {croppedImageUrl && (
        <div className=" rounded-xl  space-y-4">
          <div className="flex items-center justify-between">
            {/* <h3 className="text-lg font-semibold text-gray-900">Cropped Image</h3> */}
            <button
              onClick={onCropCancel}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative shadow rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={croppedImageUrl} 
              alt="Cropped" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="flex justify-end text-xs">
            <button
              onClick={onCropCancel}
              className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-950 transition-colors duration-200"
            >
              Crop New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCrop;