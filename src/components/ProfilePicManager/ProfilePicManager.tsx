import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useToast } from "../Toast/ToastManager";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { updateProfileImageAsync } from "../../redux/slice/UserDataFetch";
import { AppDispatch } from "../../redux/store";

interface UserProfilePictureProps {
  profileImage?: string;
  fullName?: string;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { width: number; height: number; x: number; y: number }
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Set canvas size to the cropped size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
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

  return canvas.toDataURL('image/jpeg');
}

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

const ProfileCrop: React.FC<ImageCropProps> = ({
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

  const onCropComplete = (_croppedArea: any, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCropDone = async () => {
    if (!selectedFile || !croppedAreaPixels) {
      addToast("danger", "Please upload an image.");
      return;
    }

    try {
      const croppedImageUrl = await getCroppedImg(selectedFile, croppedAreaPixels);
      setCroppedImageUrl(croppedImageUrl);
      setSelectedFile(null);
      setModalVisible(false);
    } catch (error) {
      console.error('Error cropping image:', error);
      addToast("danger", "Error cropping image. Please try again.");
    }
  };

  const onCropCancel = () => {
    setSelectedFile(null);
    setCroppedImageUrl("");
    setModalVisible(false);
  };

  return (
    <>
      <div className="flex items-center">
        {!selectedFile && (
          <div className="">
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
              >
                <div className="inline-flex items-center text-xs">
                  <p className="px-3 py-2 rounded-full ring-1 text-slate-800 font-medium ring-gray-300 cursor-pointer">
                    Upload new picture
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
      </div>

      {selectedFile && !croppedImageUrl && (
        <Modal
          modalOpen={modalVisible}
          setModalOpen={setModalVisible}
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
                        } py-2  items-center rounded px-3 flex justify-center space-x-1`}
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

const UserProfilePicture: React.FC<UserProfilePictureProps> = ({
  profileImage,
  fullName,
}) => {
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const ProfileUpdation = async () => {
      if (croppedImageUrl) {
        const blob = await dataURItoBlob(croppedImageUrl);
        if (blob) {
          try {
            const data = await dispatch(updateProfileImageAsync(blob)).unwrap();
            console.log("Profile image updated successfully:", data);
          } catch (error) {
            console.error("Error updating profile image:", error);
          }
          setSelectedImage(null);
          setCroppedImageUrl(null);
        }
      }
    };

    ProfileUpdation();
  }, [croppedImageUrl, dispatch]);

  const handleRemoveProfileImage = async () => {
    try {
      const data = await dispatch(updateProfileImageAsync(null)).unwrap();
      console.log("Profile image removed successfully:", data);
    } catch (error) {
      console.error("Error removing profile image:", error);
    }
  };

  const dataURItoBlob = (dataURI: string) => {
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
    <div className="sm:px-28 max-w-8xl relative mx-auto flex-wrap sm:flex mb-10 flex gap-4">
      <div className="bg-slate-300 w-[70px] max-sm:w-[50px] max-sm:h-[50px] h-[70px] rounded-full">
        {profileImage ? (
          <img
            src={selectedImage ?? profileImage}
            alt="Profile"
            className="object-cover w-[70px] max-sm:w-[50px] max-sm:h-[50px] h-[70px] rounded-full"
          />
        ) : (
          <div className="bg-pink-800 w-[70px] max-sm:w-[50px] max-sm:h-[50px] h-[70px] text-white text-3xl max-sm:text-base font-medium flex items-center justify-center rounded-full">
            {fullName && fullName.length > 0 ? fullName[0] : ""}
          </div>
        )}
      </div>
      <ProfileCrop
        croppedImageUrl={croppedImageUrl}
        setCroppedImageUrl={setCroppedImageUrl}
        setSelectedImage={setSelectedImage}
      />
      <div className="inline-flex items-center text-xs">
        <p
          onClick={handleRemoveProfileImage}
          className="px-3 py-2 rounded-full ring-1 bg-gray-300 text-slate-800 font-medium ring-gray-300 cursor-pointer"
        >
          Delete
        </p>
      </div>
    </div>
  );
};

export default UserProfilePicture;