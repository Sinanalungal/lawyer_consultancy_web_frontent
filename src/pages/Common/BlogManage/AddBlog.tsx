import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ImageCrop from "../../../components/ImageCrop/ImageCrop";
import CustomInput from "../../../components/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAxiosInstance } from "../../../api/axiosInstance";
import JoditEditor from "jodit-react";
import "./AddBlog.css";
import { useToast } from "../../../components/Toast/ToastManager";
import CustomButton from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { LoginState } from "../../../redux/slice/LoginActions";
import { useLocation } from "react-router-dom";
import { BlogDetailGetting, BlogUpdating } from "../../../services/Blogs";

interface FormValues {
  title: string;
  description: string;
}

interface BlogData {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string;
}

const AddBlog: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const editor = useRef(null);
  const { addToast } = useToast();
  const { role } = useSelector((state: RootState) => state.login as LoginState);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const blog_id = queryParams.get("blog");

  const fetchBlog = async (blog_id: string) => {
    const response = await BlogDetailGetting(blog_id);
    setBlogData(response);
    if (response) {
      setIsEditing(true);
      setContent(response.content);
      formik.setValues({
        title: response.title,
        description: response.description,
      });
    }
  };

  useEffect(() => {
    if (blog_id) {
      fetchBlog(blog_id);
    }
  }, [blog_id]);

  console.log(blogData);

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

      if (croppedImageUrl && !isEditing) {
        console.log(croppedImageUrl);

        const blob = await dataURItoBlob(croppedImageUrl);
        console.log(blob);
        const formData = new FormData();
        formData.append("title", preprocessedValues.title);
        formData.append("description", preprocessedValues.description);
        formData.append("content", content);
        if (blob) {
          formData.append("image", blob, `${crypto.randomUUID()}.png`);
        }

        if (
          content.length > 50 &&
          croppedImageUrl &&
          croppedImageUrl.length > 0
        ) {
          try {
            const axiosInstance = await getAxiosInstance();
            const response = await axiosInstance.post(
              `${import.meta.env.VITE_BASE_URL}` + "/blogsession/create-blog/",
              formData
            );
            console.log(response, "this is response");

            if (response.status === 201) {
              addToast("success", "Blog added successfully");
              setCroppedImageUrl(null);
              setContent("");
              formik.resetForm();
              console.log(response.data, "this is the response data");
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

      if (isEditing) {
        const formData = new FormData();
        formData.append("title", preprocessedValues.title);
        formData.append("description", preprocessedValues.description);
        formData.append("content", content);
        if (croppedImageUrl) {
          const blob = await dataURItoBlob(croppedImageUrl);
          if (blob) {
            formData.append("image", blob, `${crypto.randomUUID()}.png`);
          }
        }

        if (content.length > 50 && blogData) {
          try {
            const response = await BlogUpdating(blogData?.id, formData);
            if (response) {
              addToast("success", "Blog Updated successfully");
              setCroppedImageUrl(null);
              setContent("");
              setBlogData(null);
              formik.resetForm();
              console.log(response.data, "this is the response data");
            } else {
              addToast("danger", "Something went wrong");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          addToast("danger", "Add a proper content");
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
      {role === "admin" || role === "lawyer" ? (
        <>
          <AdminPageTitle
            title={isEditing ? "Update Blog" : "Add Blog"}
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />

          <div className="max-w-md mx-auto ">
            <div>
              {isEditing && !croppedImageUrl && blogData && blogData.image && (
                <div className="mb-2">
                  <h1 className="text-xs flex justify-center text-gray-800">
                    Previous Image
                  </h1>
                  <ImageCrop
                    croppedImageUrl={blogData.image}
                    setCroppedImageUrl={() => {}}
                  />
                </div>
              )}
              <ImageCrop
                croppedImageUrl={croppedImageUrl}
                setCroppedImageUrl={setCroppedImageUrl}
              />
            </div>
            <form onSubmit={formik.handleSubmit} className="space-y-3 ">
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
              <div className="w-full pb-28 gap-2 flex justify-center max-w-md mx-auto">
                <CustomButton
                  text={isEditing ? "Update" : "Add"}
                  type="submit"
                  className="bg-[#131314] py-3 w-full text-white   hover:bg-slate-900"
                />
              </div>
            </form>
          </div>
        </>
      ) : (
        <h1 className="text-center text-3xl">Access Denied</h1>
      )}
    </>
  );
};

export default AddBlog;
