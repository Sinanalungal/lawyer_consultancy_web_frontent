import React, { useState, useCallback } from "react";
import { Camera, Upload, X } from "lucide-react";
import Cropper from "react-easy-crop";

interface Point { x: number; y: number }
interface Area { width: number; height: number; x: number; y: number }

interface LawyerProfileAddingProps {
  setAdminProfile: (blob: Blob | null) => void;
}

// Separate Modal Component for Cropping
const CropModal: React.FC<{
  image: string;
  onClose: () => void;
  onSave: (blob: Blob) => void;
}> = ({ image, onClose, onSave }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/jpeg", 0.9);
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      if (!croppedAreaPixels) return;

      const croppedImage = await getCroppedImage(image, croppedAreaPixels);
      onSave(croppedImage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto">
      <div className="fixed inset-0  bg-black bg-opacity-50 transition-opacity" />
      <div className="flex min-h-full   items-center justify-center p-4">
        <div className="bg-white z-50 rounded-lg shadow-xl w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Crop Image</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-sm text-gray-600">Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to create image
const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.src = url;
  });
};

// Main Component
const LawyerProfileAdding: React.FC<LawyerProfileAddingProps> = ({
  setAdminProfile,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = event.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError("Error processing image");
      console.error(err);
    }
  };

  const handleCropSave = (blob: Blob) => {
    setAdminProfile(blob);
    const previewUrl = URL.createObjectURL(blob);
    setPreviewImage(previewUrl);
    setShowCropModal(false);
  };

  return (
    <div className="w-full">
      {error && (
        <div className="flex items-center p-4 mb-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
          <div className="flex-shrink-0">
            <X className="w-5 h-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="ml-auto -mx-1.5 -my-1.5 p-1.5 hover:bg-red-100 rounded-lg"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}

      <div className="space-y-4">
        {previewImage ? (
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <button
              onClick={() => document.getElementById("profile-upload")?.click()}
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <Camera className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-gray-400">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-xs text-gray-500 mt-2">Upload Photo</p>
            </div>
            <input
              id="profile-upload"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*"
            />
          </label>
        )}
      </div>

      {showCropModal && selectedImage && (
        <CropModal
          image={selectedImage}
          onClose={() => setShowCropModal(false)}
          onSave={handleCropSave}
        />
      )}
    </div>
  );
};

export default LawyerProfileAdding;