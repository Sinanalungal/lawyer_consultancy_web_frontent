import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../../components/PageTitle/AdminPageTitle";
import CustomInputFullSized from "../../../components/Input/InputFullSize";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import LawyerProfileAdding from "../../../components/LawyerProfileAdding/LawyerProfileAdding";
import {
  addLawyer,
  fetchDepartmentsAndLanguagesAndStates,
} from "../../../services/AddLawyerServices";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Toast/ToastManager";

interface DepartmentOption {
  value: string;
  label: string;
}

interface LanguageOption {
  value: string;
  label: string;
}

interface StateOption {
  value: string;
  label: string;
}



const AddLawyer: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [languages, setLanguages] = useState<LanguageOption[]>([]);
  const [states, setStates] = useState<StateOption[]>([]);
  const [adminProfile, setAdminProfile] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDepartmentsAndLanguagesAndStates();
        setDepartments(
          data.departments.map((dept: any) => ({
            value: dept.id,
            label: dept.department_name,
          }))
        );
        setLanguages(
          data.languages.map((lang: any) => ({
            value: lang.id,
            label: lang.name,
          }))
        );
        setStates(
          data.states.map((state: any) => ({
            value: state.id,
            label: state.name,
          }))
        );
      } catch (error) {
        console.error(
          "Failed to fetch departments, languages, and states:",
          error
        );
      }
    };

    loadData();
  }, []);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      department: [] as DepartmentOption[],
      experience: "",
      description: "",
      language: [] as LanguageOption[],
      address: "",
      city: "",
      state: null as StateOption | null,
      postal_code: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone_number: Yup.string().required("Phone Number is required"),
      department: Yup.array().min(1, "Department is required"),
      experience: Yup.number()
        .required("Experience is required")
        .min(0, "Experience must be at least 0"),
      description: Yup.string().required("Description is required"),
      language: Yup.array().min(1, "At least one language is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.object().nullable().required("State is required"),
      postal_code: Yup.string().required("Postal Code is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);
        
        // Validate all fields before submission
        await formik.validateForm();
        
        // If there are errors, stop submission
        if (Object.keys(formik.errors).length > 0) {
          setIsSubmitting(false);
          return;
        }

        const formData = new FormData();
        formData.append("full_name", values.full_name);
        formData.append("email", values.email);
        formData.append("phone_number", values.phone_number);
        formData.append("experience", values.experience.toString());
        formData.append("description", values.description);
        formData.append(
          "department",
          JSON.stringify(values.department.map((d) => d.value))
        );
        formData.append(
          "language",
          JSON.stringify(values.language.map((l) => l.value))
        );
        formData.append("address", values.address);
        formData.append("city", values.city);
        formData.append("state", values.state ? values.state.label : "");
        formData.append("postal_code", values.postal_code);

        if (adminProfile) {
          formData.append("profile_image", adminProfile, `profile_image-${crypto.randomUUID()}.jpg`);
        }

        const response = await addLawyer(formData);
        console.log("Lawyer added successfully:", response);
        addToast("success", "Lawyer added successfully!");
        
        // Reset the form after successful submission
        resetForm();
        setAdminProfile(null);
        navigate(-1);
      } catch (error) {
        addToast("danger", "Failed to add lawyer. Please try again.");
        console.error("Error adding lawyer:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Trigger validation on form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.validateForm().then((errors) => {
      formik.setErrors(errors);
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit(e as any);
      }
    });
  };

  const departmentOptions = departments.map((data) => ({
    value: data.value,
    label: data.label,
  }));

  const languageOptions = languages.map((data) => ({
    value: data.value,
    label: data.label,
  }));

  const stateOptions = states.map((data) => ({
    value: data.value,
    label: data.label,
  }));

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: "50px",
      height: "50px",
      borderColor: state.isFocused
        ? "rgba(0, 123, 255, 0.8)"
        : (formik.errors as Record<string, string>)[state.selectProps.name]
        ? "red"
        : "rgba(108, 117, 125, 0.1)",
      boxShadow: state.isFocused
        ? "0 0 0 1px rgba(0, 123, 255, 0.8)"
        : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused
          ? "rgba(0, 123, 255, 0.1)"
          : "rgba(108, 117, 125, 0.1)",
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: "50px",
      padding: "0 6px",
    }),
    input: (provided: any) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "50px",
    }),
  };

  return (
    <>
      <AdminPageTitle
        title="ADD LAWYER"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />
      <form onSubmit={handleSubmit} className="max-[400px]:px-0 px-5">
        <div className="max-w-5xl xl:px-8 mx-auto flex w-full max-sm:grid">
          <div className="w-[150px] max-sm:mb-6 sm:mt-3 lg:mt-0 max-sm:flex cursor-pointer justify-center sm:justify-end rounded-lg max-sm:w-full max-sm:h-24 h-40">
            <LawyerProfileAdding setAdminProfile={setAdminProfile} />
          </div>
          <div className="w-full sm:pl-5 lg:pl-6">
            <CustomInputFullSized
              label="Full Name"
              name="full_name"
              id="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              error={formik.errors.full_name as string}
              required
            />
            <CustomInputFullSized
              label="Email Address"
              inputType="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email as string}
              required
            />
          </div>
        </div>
        <div className="grid max-sm:grid-cols-1 grid-cols-2 max-w-5xl gap-2 xl:px-8 mx-auto">
          <CustomInputFullSized
            label="Phone Number"
            name="phone_number"
            id="phone_number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            error={formik.errors.phone_number as string}
            required
          />
          <CustomInputFullSized
            label="Experience (Years)"
            name="experience"
            id="experience"
            inputType="number"
            value={formik.values.experience}
            onChange={formik.handleChange}
            error={formik.errors.experience as string}
            required
          />
          <CustomInputFullSized
            label="Address"
            name="address"
            id="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address as string}
            required
          />
          <CustomInputFullSized
            label="City"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.errors.city as string}
            required
          />
          <div className="flex flex-col md:pt-1 pb-2 justify-center space-y-1">
            <div className="flex flex-col">
              <p className="text-xs font-medium md:w-[20%]">State</p>
              <Select
                id="state"
                name="state"
                options={stateOptions}
                onChange={(selected) => formik.setFieldValue("state", selected)}
                value={formik.values.state}
                className="block w-full rounded-md text-xs mt-1"
                styles={customSelectStyles}
              />
              {formik.errors.state && (
                <div className="text-red-600 w-full flex justify-end text-xs">
                  {formik.errors.state as string}
                </div>
              )}
            </div>
          </div>
          <CustomInputFullSized
            label="Postal Code"
            name="postal_code"
            id="postal_code"
            value={formik.values.postal_code}
            onChange={formik.handleChange}
            error={formik.errors.postal_code as string}
            required
          />
          <div className="flex flex-col md:pt-1 pb-2 justify-center space-y-1">
            <div className="flex flex-col">
              <p className="text-xs font-medium md:w-[20%]">Department</p>
              <Select
                id="department"
                name="department"
                options={departmentOptions}
                isMulti
                onChange={(selected) =>
                  formik.setFieldValue("department", selected)
                }
                value={formik.values.department}
                className="block w-full rounded-md text-xs mt-1"
                styles={customSelectStyles}
              />
              {formik.errors.department && (
                <div className="text-red-600 w-full flex justify-end text-xs">
                  {formik.errors.department as string}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:pt-1 pb-2 justify-center space-y-1">
            <div className="flex flex-col">
              <p className="text-xs font-medium md:w-[20%]">Languages</p>
              <Select
                id="language"
                name="language"
                options={languageOptions}
                isMulti
                onChange={(selected) =>
                  formik.setFieldValue("language", selected)
                }
                value={formik.values.language}
                className="block w-full rounded-md text-xs mt-1"
                styles={customSelectStyles}
              />
              {formik.errors.language && (
                <div className="text-red-600 w-full flex justify-end text-xs">
                  {formik.errors.language as string}
                </div>
              )}
            </div>
          </div>
          <CustomInputFullSized
            label="Description"
            name="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.errors.description as string}
            required
          />
        </div>
        <div className="flex justify-end max-w-5xl xl:px-8 mx-auto mt-4">
          <div className="flex max-[400px]:hidden text-xs p-2 space-x-1">
            <Link to={"../../../../../../admin/lawyers"}>
              <button type="button" className="bg-white border p-2 rounded-md">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-slate-700 border px-2 p-1 text-white rounded-md ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddLawyer;