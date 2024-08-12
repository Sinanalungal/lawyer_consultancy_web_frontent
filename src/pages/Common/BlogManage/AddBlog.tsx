import React, { useMemo, useRef, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ImageCrop from "../../../components/ImageCrop/ImageCrop";
import CustomInput from "../../../components/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAxiosInstance } from "../../../api/axiosInstance";
import { BASE_URL } from "../../../constants";
import JoditEditor from "jodit-react";
import "./AddBlog.css";
import { useToast } from "../../../components/Toast/ToastManager";
import CustomButton from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { LoginState } from "../../../redux/slice/LoginActions";

interface FormValues {
  title: string;
  description: string;
}

const AddBlog: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const editor = useRef(null);
  const { addToast } = useToast();
  const { role } = useSelector((state: RootState) => state.login as LoginState)

  const config = useMemo(
    () => ({
      readonly: false, 
      placeholder: "Start typing...", 
    }),
    []
  );
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, "Title must be at least 10 characters")
      .max(100, "Title must be 100 characters or less")
      .matches(
        /^[^\s]+(\s[^\s]+)*$/,
        "Title should not have more than one consecutive space"
      )
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must be 200 characters or less")
      .matches(
        /^[^\s]+(\s[^\s]+)*$/,
        "Description should not have more than one consecutive space"
      )
      .required("Description is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values: any) => {
      const preprocessedValues: any = {};
      Object.keys(values).forEach((key) => {
        preprocessedValues[key] = values[key].replace(/\s+/g, " ").trim();
      });

      if (croppedImageUrl) {
        console.log(croppedImageUrl);

        const blob = await dataURItoBlob(croppedImageUrl);
        console.log(blob);
        const formData = new FormData();
        formData.append("title", preprocessedValues.title);
        formData.append("description", preprocessedValues.description);
        formData.append("content", content);
        if (blob) {
          formData.append("image", blob, "image.png");
        }

        if (
          content.length > 50 &&
          croppedImageUrl &&
          croppedImageUrl.length > 0
        ) {
          try {
            const axiosInstance = await getAxiosInstance();
            const response = await axiosInstance.post(
              BASE_URL + "/blogsession/create-blog/",
              formData,
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            if (response.status === 201) {
              addToast("success", "Blog added successfully");
              setCroppedImageUrl("");
              setContent("");
              formik.resetForm();
              console.log(response.data, "this is the response data");
              setCroppedImageUrl(null);
            } else {
              addToast("danger", "Give a valid content");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          addToast("danger", "Add a proper content/image");
        }
      }
    },
  });

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

    // Convert base64 to raw binary data
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
    <>
    {role=='admin'?<AdminLayout selected="4">
      <AdminPageTitle
        title="Add Blog"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,"
      />

      <div className="max-w-md mx-auto space-y-2">
        <form onSubmit={formik.handleSubmit}>
          <ImageCrop
            croppedImageUrl={croppedImageUrl}
            setCroppedImageUrl={setCroppedImageUrl}
          />
          <CustomInput
            inputType="text"
            placeholder="Blog Title"
            name="title"
            id="title"
            label="Blog Title"
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : ""
            }
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <CustomInput
            inputType="text"
            placeholder="Description"
            name="description"
            id="description"
            label="Blog Description"
            error={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : ""
            }
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="">
            <label className="block text-xs font-medium leading-6 text-gray-900">
              Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
          </div>
          <div className="w-full pb-28 gap-2 flex justify-center max-w-md mx-auto pt-2">
            <CustomButton
              text="Save"
              type="submit"
              className="bg-[#131314] py-3 w-full text-white   hover:bg-slate-900"
            />
          </div>
        </form>
      </div>
    </AdminLayout>:(<>
      <AdminPageTitle
        title="Add Blog"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,"
      />

      <div className="max-w-md mx-auto space-y-2">
        <form onSubmit={formik.handleSubmit}>
          <ImageCrop
            croppedImageUrl={croppedImageUrl}
            setCroppedImageUrl={setCroppedImageUrl}
          />
          <CustomInput
            inputType="text"
            placeholder="Blog Title"
            name="title"
            id="title"
            label="Blog Title"
            error={
              formik.touched.title && formik.errors.title
                ? formik.errors.title
                : ""
            }
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <CustomInput
            inputType="text"
            placeholder="Description"
            name="description"
            id="description"
            label="Blog Description"
            error={
              formik.touched.description && formik.errors.description
                ? formik.errors.description
                : ""
            }
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div className="">
            <label className="block text-xs font-medium leading-6 text-gray-900">
              Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {
                setContent(newContent);
              }}
            />
          </div>
          <div className="w-full pb-28 gap-2 flex justify-center max-w-md mx-auto pt-2">
            <CustomButton
              text="Save"
              type="submit"
              className="bg-[#131314] py-3 w-full text-white   hover:bg-slate-900"
            />
          </div>
        </form>
      </div></>)}</>
  );
};

export default AddBlog;
