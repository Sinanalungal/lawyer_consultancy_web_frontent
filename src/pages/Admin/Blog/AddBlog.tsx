import React, { useMemo, useRef, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout/AdminLayout";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import ImageCrop from "../../../components/ImageCrop/ImageCrop";
import CustomInput from "../../../components/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAxiosInstance } from "../../../api/axiosInstance";
import { BASE_URL } from "../../../constants";
import CustomTextArea from "../../../components/Input/TextInput";
import JoditEditor from "jodit-react";
import "./AddBlog.css";

const AddBlog: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const editor = useRef(null);
  const config = useMemo(() => {
    "Start typing...";
  }, []);

  //   const validationSchema = Yup.object({
  //     title: Yup.string()
  //       .min(10, "Title must be at least 10 characters")
  //       .max(100, "Title must be 100 characters or less")
  //       .matches(
  //         /^[^\s]+(\s[^\s]+)*$/,
  //         "Title should not have more than one consecutive space"
  //       )
  //       .required("Title is required"),
  //     description: Yup.string()
  //       .min(10, "Description must be at least 10 characters")
  //       .max(200, "Description must be 200 characters or less")
  //       .matches(
  //         /^[^\s]+(\s[^\s]+)*$/,
  //         "Description should not have more than one consecutive space"
  //       )
  //       .required("Description is required"),
  //   });

  //   const formik = useFormik({
  //     initialValues: {
  //       title: "",
  //       description: "",
  //     },
  //     validationSchema,
  //     onSubmit: async (values) => {
  //       const preprocessedValues: any = {};
  //       Object.keys(values).forEach((key) => {
  //         preprocessedValues[key] = values[key].replace(/\s+/g, " ").trim();
  //       });

  //       const blob = await dataURItoBlob(croppedImageUrl);
  //       const formData = new FormData();
  //       formData.append("title", preprocessedValues.title);
  //       formData.append("description", preprocessedValues.description);
  //       formData.append("content", content);
  //       formData.append("image", blob, "image.png");
  //       formData.append("user", value);

  //       if (content.length > 50 && croppedImageUrl.length > 0) {
  //         try {
  //           const axiosInstance = await getAxiosInstance();
  //           const response = await axiosInstance.post(
  //             BASE_URL + "/blogsession/blogs/",
  //             formData,
  //             {
  //               headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "multipart/form-data",
  //               },
  //             }
  //           );

  //           if (response.status === 201) {
  //             toast.success("Blog added successfully");
  //             setSecondModal(false);
  //             setCroppedImageUrl("");
  //             setModal(false);
  //             setContent("");
  //             formik.resetForm();
  //             console.log(response.data, "this is the response data");
  //             // setNewBlogAdded(true);
  //             setBlogs([...blogs, response.data]);
  //           } else {
  //             toast.error("Check Your Content");
  //           }
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       } else {
  //         toast.error("Add a proper content/image");
  //       }
  //     },
  //   });
  const dataURItoBlob = (dataURI: string) => {
    if (!dataURI) {
      return null;
    }

    // Extract base64 data and mime type from dataURI
    const [, base64Data] = dataURI.split(",");
    const mimeString = dataURI.split(":")[1].split(";")[0];

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

    // Create blob with appropriate mime type
    return new Blob(byteArrays, { type: mimeString });
  };

  return (
    <AdminLayout selected="4">
      <AdminPageTitle
        title="Add Blog"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,"
      />

      <div className="max-w-md mx-auto space-y-2">
        <ImageCrop />
        <CustomInput
          inputType="text"
          placeholder="Blog Title"
          name="title"
          id="title"
          label="Blog Title"
          //   error={
          //     formik.touched.title && formik.errors.title
          //       ? formik.errors.title
          //       : ""
          //   }
          //   value={formik.values.title}
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
        />

        <CustomInput
          inputType="text"
          placeholder="Description"
          name="description"
          id="description"
          label="Blog Description"
          //   error={
          //     formik.touched.title && formik.errors.title
          //       ? formik.errors.title
          //       : ""
          //   }
          //   value={formik.values.title}
          //   onChange={formik.handleChange}
          //   onBlur={formik.handleBlur}
        />
        {/* <CustomTextArea
          placeholder="Write Your Thought Here..."
          name="description"
          id="description"
          label="Blog Description"
        //   error={
        //     formik.touched.title && formik.errors.title
        //       ? formik.errors.title
        //       : ""
        //   }
        //   value={formik.values.title}
        //   onChange={formik.handleChange}
        //   onBlur={formik.handleBlur}
        /> */}
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </div>
      </div>
      <div className="w-full pb-28 gap-2 my-5 flex justify-center max-w-md mx-auto pt-6">
        <div className="px-3 py-2 font-semibold flex justify-center text-xs items-center text-slate-800 border border-slate-800 rounded cursor-pointer">
          Cancel
        </div>
        <div className="px-5 font-semibold text-xs py-2 flex justify-center bg-slate-800 text-white rounded cursor-pointer">
          Save
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddBlog;
