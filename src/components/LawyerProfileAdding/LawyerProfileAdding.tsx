import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Cropper from "react-easy-crop";
import { useToast } from "../Toast/ToastManager";
import Modal from "../Modal/Modal";

interface LawyerProfileAddingProps {
  setAdminProfile?: (url: Blob | null) => void;
}

const LawyerProfileAdding: React.FC<LawyerProfileAddingProps> = ({
  setAdminProfile,
}) => {
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const ProfileUpdation = async () => {
      if (croppedImageUrl) {
        const blob = await dataURItoBlob(croppedImageUrl);
        if (blob) {
          setAdminProfile?.(blob);
        }
      }
    };
    ProfileUpdation();
  }, [croppedImageUrl, setAdminProfile]);

  const dataURItoBlob = (dataURI: string): Blob | null => {
    if (!dataURI) {
      return null;
    }
    const [header, base64Data] = dataURI.split(",");
    if (!base64Data) {
      console.error("Invalid data URI format");
      return null;
    }
    const mimeString = header.split(":")[1].split(";")[0];
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeString });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {selectedImage && (
          <img
            src={selectedImage}
            className="w-[150px] mx-auto max-sm:w-[130px] max-sm:h-18 h-40 border-4 border-gray-200 rounded object-cover"
            alt="Profile"
          />
        )}
      </div>
      <ProfileCropLawyer
        croppedImageUrl={croppedImageUrl}
        setCroppedImageUrl={setCroppedImageUrl}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default LawyerProfileAdding;

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

interface ImageCropProps {
  croppedImageUrl: string | null;
  setSelectedImage: (url: string | null) => void;
  setCroppedImageUrl: (url: string | null) => void;
}

const ProfileCropLawyer: React.FC<ImageCropProps> = ({
  croppedImageUrl,
  setCroppedImageUrl,
  setSelectedImage,
}) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { addToast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result as string);
        setSelectedImage(reader.result as string);
      };
      setModalVisible(true);
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

  const onCropDone = () => {
    if (!selectedFile || !croppedAreaPixels) {
      addToast("danger", "Please upload an image.");
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
        return;
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
      setModalVisible(false);
    };
  };

  const onCropCancel = () => {
    setSelectedFile(null);
    setCroppedImageUrl(null);
    setModalVisible(false);
  };

  return (
    <>
      <div className="flex items-center">
        {!croppedImageUrl && (
          <div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
            >
              <div className="w-[150px] max-sm:mb-4 max-sm:flex cursor-pointer justify-end rounded-lg max-sm:w-[130px] max-sm:h-18 h-40">
                <div className="w-full h-full border rounded flex justify-center items-center text-xs gap-1 text-gray-800 flex-col">
                  <FaCloudUploadAlt size={26} className="text-gray-800" />
                  <p>Upload Profile</p>
                </div>
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
        )}
      </div>

      {selectedFile && !croppedImageUrl && (
        <Modal
          modalOpen={modalVisible}
          setModalOpen={() => {
            setModalVisible(true);
          }}
          children={
            <>
              <div className="w-full cropper z-50 bg-white rounded-xl p-5 max-[400px]:p-2">
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
                        } py-2 items-center rounded px-3 flex justify-center space-x-1`}
                      >
                        <div
                          className={`${
                            aspectRatio === 1 / 1
                              ? "border-white"
                              : "border-gray-700"
                          } w-[10px] h-[10px] border-2`}
                        ></div>
                        <p
                          className={`${
                            aspectRatio === 1 / 1
                              ? "text-white"
                              : "text-gray-700"
                          } text-[10px]`}
                        >
                          1:1
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
            </>
          }
        />
      )}
    </>
  );
};
