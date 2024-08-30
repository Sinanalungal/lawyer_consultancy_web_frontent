import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Modal from "../../../components/Modal/Modal";
import {
  fetchCaseDetails,
  fetchCases,
  submitCase,
  fetchStates,
  deleteCase,
} from "../../../services/Case";
import * as Yup from "yup";
import CustomInputFullSized from "../../../components/Input/InputFullSize";

const validationSchema = Yup.object({
  case_type: Yup.string()
    .min(10, "Case type must be at least 10 characters")
    .required("Case type is required"),
  description: Yup.string()
    .min(30, "Description must be at least 30 characters")
    .required("Description is required"),
  reference_until: Yup.date()
    .min(new Date(), "Reference until must be a future date")
    .required("Reference until is required"),
  budget: Yup.number()
    .min(5000, "Budget must be at least $5000")
    .required("Budget is required"),
  state: Yup.string().required("State is required"),
});

const ClientCaseManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"appliedCases" | "applyCase">(
    "appliedCases"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState<any>({});
  const [cases, setCases] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    if (activeTab === "appliedCases") {
      fetchCasesData(currentPage);
    }
  }, [activeTab, currentPage]);

  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const statesData = await fetchStates();
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStatesData();
  }, []);

  const fetchCasesData = async (page: number) => {
    try {
      const casesData = await fetchCases(page);
      setCases(casesData.results);      
      setTotalCases(casesData.count);
      setTotalPages(Math.ceil(casesData.count / casesData.results.length));
    } catch (error) {
      console.error("Error fetching cases:", error);
      setCases([]);
    }
  };

  const handleViewDetails = async (caseId: number) => {
    try {
      const caseDetailsData = await fetchCaseDetails(caseId);
      setCaseDetails(caseDetailsData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching case details:", error);
    }
  };

  const handleFormSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await submitCase(values);
      alert("Case submitted successfully!");
      resetForm();
      setActiveTab("appliedCases");
      fetchCasesData(1); // Reset to the first page
    } catch (error) {
      console.error("Error submitting case:", error);
      alert("Failed to submit the case. Please try again.");
    }
  };

  const handleDeleteCase = async (caseId: number) => {
    if (window.confirm("Are you sure you want to delete this case?")) {
      try {
        await deleteCase(caseId);
        alert("Case deleted successfully!");
        fetchCasesData(currentPage); // Refetch the cases after deletion
      } catch (error) {
        console.error("Error deleting case:", error);
        alert("Failed to delete the case. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex min-h-[400px] flex-col">
      <main className="flex-1 p-6 lg:px-12 lg:py-8">
        <PageTitle
          title="Case Management"
          description="Manage your applied cases or start a new case application."
        />

        {/* Tab Navigation */}
        <div className="mb-8 flex justify-center">
          <nav className="flex space-x-2 border rounded-full p-1 bg-gray-100">
            <button
              className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
                activeTab === "appliedCases"
                  ? "bg-slate-800 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("appliedCases")}
            >
              Applied Cases
            </button>
            <button
              className={`px-4 py-2 max-sm:text-xs font-medium text-sm rounded-full transition ${
                activeTab === "applyCase"
                  ? "bg-slate-800 text-white"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("applyCase")}
            >
              Apply for New Case
            </button>
          </nav>
        </div>

        {activeTab === "appliedCases" && (
          <section id="applied-cases" className="mb-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 p-5 text-center">
              Your Applied Cases
            </h2>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <table className="w-full border table-auto border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b-2 text-sm">
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">
                      Case Type
                    </th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">
                      Status
                    </th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium">
                      Reference Until
                    </th>
                    <th className="py-3 px-4 text-center text-gray-600 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
  {cases.length > 0 ? (
    cases.map((caseItem) => (
      <tr key={caseItem.id} className="hover:bg-gray-50 text-xs">
        <td className="py-4 text-center px-4 text-gray-800">
          {caseItem.case_type}
        </td>
        <td className="py-4 px-4 text-center">
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
              caseItem.status === "Accepted"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {caseItem.status}
          </span>
        </td>
        <td className="py-4 px-4 text-center text-gray-600">
          {caseItem.reference_until}
        </td>
        <td className="py-4 px-4 text-center space-x-4">
          <button
            onClick={() => handleViewDetails(caseItem.id)}
            className="text-blue-600 hover:underline"
          >
            View Details
          </button>
          <button
            onClick={() => handleDeleteCase(caseItem.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="py-4 px-4 text-center text-gray-600">
        No cases available.
      </td>
    </tr>
  )}
</tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-end gap-3 text-xs items-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </motion.div>
          </section>
        )}

        {activeTab === "applyCase" && (
          <section id="apply" className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 p-6 text-center">
              Apply for a New Case
            </h2>
            <motion.div
              className="p-6 rounded-lg bg-white shadow-md border border-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Formik
                initialValues={{
                  case_type: "",
                  description: "",
                  reference_until: "",
                  budget: "",
                  state: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form className="space-y-6">
                    <div className="sm:grid sm:gap-2 grid-cols-2">
                      <CustomInputFullSized
                        label="Case Type"
                        inputType="text"
                        name="case_type"
                        id="case_type"
                        value={values.case_type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.case_type ? errors.case_type : ""}
                        required
                      />
                      <CustomInputFullSized
                        label="Budget"
                        inputType="number"
                        name="budget"
                        id="budget"
                        value={values.budget}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.budget ? errors.budget : ""}
                        required
                      />
                    </div>
                    <div className="sm:grid sm:grid-cols-2 sm:gap-2 items-start">
                      <CustomInputFullSized
                        label="Reference Until"
                        inputType="date"
                        name="reference_until"
                        id="reference_until"
                        value={values.reference_until}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.reference_until ? errors.reference_until : ""
                        }
                        required
                      />
                      <div className="sm:grid text-xs max-sm:mt-4">
                        <label
                          htmlFor="state"
                          className="block text-gray-700 mb-1"
                        >
                          State
                        </label>
                        <Field
                          as="select"
                          id="state"
                          name="state"
                          className={`
      block mt-1 w-full py-4 text-xs border rounded-lg shadow-sm text-gray-700
      ${errors.state && touched.state ? "border-red-600" : "border-gray-200"}
    `}
                        >
                          <option value="" label="Select a state" />
                          {states.map((state) => (
                            <option
                              key={state.id}
                              value={state.id}
                              label={state.name}
                            />
                          ))}
                        </Field>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-red-600 text-[10px]"
                        />
                      </div>
                    </div>
                    <CustomInputFullSized
                      label="Description"
                      inputType="textarea"
                      name="description"
                      id="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description ? errors.description : ""}
                      required
                    />

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                      Submit Case
                    </button>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </section>
        )}
      </main>

      <Modal
        modalOpen={isModalOpen}
        setModalOpen={() => setIsModalOpen(false)}
        key="Case Details"
      >
        <div className="p-4 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Case Type: {caseDetails.case_type}
          </h3>
          <p className="text-gray-600">
            Description: {caseDetails.description}
          </p>
          <p className="text-gray-600">Status: {caseDetails.status}</p>
          <p className="text-gray-600">
            Date Applied: {caseDetails.date_applied}
          </p>
          <p className="text-gray-600">Budget: ${caseDetails.budget}</p>
          <p className="text-gray-600">
            Reference Until: {caseDetails.reference_until}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ClientCaseManagement;
