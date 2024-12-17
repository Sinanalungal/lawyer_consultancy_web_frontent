import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { motion } from "framer-motion";
import PageTitle from "../../../components/PageTitle/PageTitle";
import Modal from "../../../components/Modal/Modal";
import {
  // fetchCaseDetails,
  fetchCases,
  submitCase,
  fetchStates,
  deleteCase,
  getSelectedCasesByCaseId,
  createAllotedCase,
} from "../../../services/Case";
import * as Yup from "yup";
import CustomInputFullSized from "../../../components/Input/InputFullSize";
import { useToast } from "../../../components/Toast/ToastManager";
import { BeatLoader, PulseLoader } from "react-spinners";
import ConfirmationModal from "../../../components/Modal/AlertModal";

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
  const [_caseDetails, _setCaseDetails] = useState<any>({});
  const [cases, setCases] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [selectedLawyers, setSelectedLawyers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_totalCases, setTotalCases] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<number | null>(null);
  const [caseToAccept, setCaseToAccept] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "selected" | "unselected"
  >("all");
  const [loading, setLoader] = useState<boolean>(false);

  const { addToast } = useToast();
  // const { setLoader } = useLoader();

  useEffect(() => {
    if (activeTab === "appliedCases") {
      fetchCasesData(currentPage, selectedFilter);
    }
  }, [activeTab, currentPage]);

  useEffect(() => {
    const fetchStatesData = async () => {
      setLoader(true);
      try {
        const statesData = await fetchStates();
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchStatesData();
  }, []);

  const fetchCasesData = async (
    page: number,
    filter: "all" | "selected" | "unselected"
  ) => {
    setLoader(true);
    try {
      const casesData = await fetchCases(page, filter);
      setCases(casesData.results);
      setTotalCases(casesData.count);
      setTotalPages(Math.ceil(casesData.count / casesData.results.length));
    } catch (error) {
      console.error("Error fetching cases:", error);
      setCases([]);
    } finally {
      setLoader(false);
    }
  };

  const handleViewDetails = async (caseId: number) => {
    try {
      const selectedCasesData = await getSelectedCasesByCaseId(caseId);
      setSelectedLawyers(selectedCasesData);
      console.log(selectedCasesData, "selected Laweyrs");

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching case details:", error);
    }
  };

  const handleFormSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);
    try {
      await submitCase(values);
      addToast("success", "Case submitted successfully!");
      resetForm();
      setActiveTab("appliedCases");
      fetchCasesData(1, selectedFilter);
    } catch (error) {
      console.error("Error submitting case:", error);
      addToast("danger", "Failed to submit the case. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openConfirmationModalForDelete = (caseId: number) => {
    setCaseToDelete(caseId);
    setIsConfirmationModalOpen(true);
  };
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "90px",
  };

  const handleDeleteCase = async () => {
    if (caseToDelete === null) return;

    try {
      await deleteCase(caseToDelete);
      addToast("success", "Case deleted successfully!");
      fetchCasesData(currentPage, selectedFilter);
    } catch (error) {
      console.error("Error deleting case:", error);
      addToast("danger", "Failed to delete the case. Please try again.");
    } finally {
      setIsConfirmationModalOpen(false);
      setCaseToDelete(null);
    }
  };
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value as "all" | "selected" | "unselected";
    setSelectedFilter(filter);
    fetchCasesData(1, filter);
  };

  const openConfirmationModalForAccept = (caseId: number) => {
    setCaseToAccept(caseId);
    setIsConfirmationModalOpen(true);
  };

  const handleAcceptCase = async () => {
    if (caseToAccept === null) return;

    try {
      await createAllotedCase({ selected_case_id: caseToAccept });
      addToast("success", "Case allocated successfully!");
      fetchCasesData(currentPage, selectedFilter);
    } catch (error) {
      console.error("Error allocating case:", error);
      addToast("danger", "Error allocating case.");
    } finally {
      setIsConfirmationModalOpen(false);
      setCaseToAccept(null);
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
          <nav className="flex space-x-2 border rounded-full p-1 bg-white">
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

        {!loading ? (
          <div>
            {activeTab === "appliedCases" && (
              <section id="applied-cases" className="mb-12 max-w-5xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 p-5 text-center">
                  Your Applied Cases
                </h2>
                <div className="flex justify-end text-xs py-2">
                  <select
                    className="p-1 bg-transparent border text-xs shadow px-3 py-2 border-white  rounded-lg"
                    value={selectedFilter}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Cases</option>
                    <option value="selected">Selected Cases</option>
                    <option value="unselected">Unselected Cases</option>
                  </select>
                </div>
                <motion.div
                  className="bg-white no-scrollbar rounded-lg overflow-x-scroll shadow-md border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <table className="w-full border table-auto border-collapse bg-white">
                    <thead>
                      {/* <tr className="bg-gray-50 border-b-2 text-sm">
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
                  </tr> */}
                      <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="px-6 py-3">Case Type</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Reference Until</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases.length > 0 ? (
                        cases.map((caseItem) => (
                          <tr
                            key={caseItem.id}
                            className="hover:bg-gray-50 text-xs"
                          >
                            <td className="py-4 text-center px-4 text-gray-800">
                              {caseItem.case_type}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span
                                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md ${
                                  caseItem.status === "Accepted"
                                    ? "bg-green-100 text-green-800"
                                    : caseItem.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {caseItem.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center text-gray-600">
                              {caseItem.reference_until}
                            </td>
                            <td className="py-4 flex  px-4 text-center space-x-4">
                              {caseItem.status == "Outdated" ? (
                                <button className="text-gray-500">
                                  No Data
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleViewDetails(caseItem.id)}
                                  className="text-blue-600 hover:underline"
                                >
                                  View Details
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  openConfirmationModalForDelete(caseItem.id)
                                }
                                className="text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-4 px-4 text-center text-gray-600"
                          >
                            No cases available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  <div className="flex justify-end items-center bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span className="text-xs text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="ml-3 px-4 py-2 border border-gray-300 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                  {/* <div className="flex justify-end gap-3  text-[10px] items-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
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
              </div> */}
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
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                    }) => (
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
                              touched.reference_until
                                ? errors.reference_until
                                : ""
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
                          className="w-full bg-slate-600 text-white text-xs py-3 rounded-lg"
                        >
                          {isSubmitting ? (
                            <PulseLoader color="#ffffff" />
                          ) : (
                            "Submit Case"
                          )}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </motion.div>
              </section>
            )}
          </div>
        ) : (
          <div style={spinnerStyle}>
            <BeatLoader color="#312e81" />
          </div>
        )}
        {/* Modal for Case Details */}
        {isModalOpen && (
          <Modal
            modalOpen={isModalOpen}
            setModalOpen={() => setIsModalOpen(false)}
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              Selected Lawyers
            </h2>

            <div className="mb-4">
              {selectedLawyers.length > 0 ? (
                <ul className="space-y-4 text-gray-700">
                  {selectedLawyers.map((obj) => (
                    <li key={obj.lawyer.user}>
                      <div className="relative sm:flex items-center sm:space-x-4 p-4 bg-white shadow-lg rounded-lg border">
                        <img
                          src={`${
                            obj.lawyer.user.profile_image ??
                            "https://tse1.mm.bing.net/th?q=blank%20pfp%20icon"
                          }`}
                          alt=""
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex max-sm:py-2 flex-col justify-between flex-grow">
                          <h2 className="text-sm font-semibold">
                            {obj?.lawyer?.user?.full_name}
                          </h2>
                          <p className="text-xs my-1 text-gray-500">
                            <span className="font-semibold">State:</span>{" "}
                            {obj?.lawyer?.state}
                          </p>
                          <div className="text-xs">
                            <span className="font-semibold">Languages:</span>{" "}
                            {obj?.lawyer?.languages.map(
                              (language: any, index: number) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-100 px-2 py-1 text-[10px] rounded-full mr-2"
                                >
                                  {language.name}
                                </span>
                              )
                            )}
                          </div>
                          <div className="text-xs mt-1">
                            <span className="font-semibold">Department:</span>{" "}
                            {obj?.lawyer?.departments.map(
                              (department: any, index: number) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-100 px-2 text-[10px] py-1 rounded-full mr-2"
                                >
                                  {department.department_name}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            openConfirmationModalForAccept(obj.id);
                            setIsModalOpen(false);
                          }}
                          className="absolute max-[400px]:px-2 max-[400px]:text-[10px] top-4 right-4 px-4 py-2 bg-slate-500 text-white rounded-lg shadow hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                          Accept
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  No lawyers have selected this case.
                </p>
              )}
            </div>
          </Modal>
        )}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onConfirm={
            caseToDelete !== null ? handleDeleteCase : handleAcceptCase
          }
          onCancel={() => setIsConfirmationModalOpen(false)}
          title={caseToDelete !== null ? "Delete Case" : "Accept Case"}
          description={
            caseToDelete !== null
              ? "Are you sure you want to delete this case?"
              : "Are you sure you want to accept this case?"
          }
        />
      </main>
    </div>
  );
};

export default ClientCaseManagement;
