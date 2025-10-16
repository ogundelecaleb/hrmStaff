import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Spinner } from "@chakra-ui/react";
import api from "../../../../../api";
import { DocumentText, Award, Crown, DocumentUpload, Eye } from "iconsax-react";

const ConfirmationOfAppointmentSenior = ({ data, datas }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstGrade, setIsFirstGrade] = useState("");
  const [presentGrade, setIsPresentGrade] = useState("");
  const [workDone, setWorkDone] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
      const fileUrl = URL.createObjectURL(file);
      setCvPreview(fileUrl);
    }
  };

  const handleSubmit = async () => {
    if (!firstGrade || !presentGrade || !workDone || !cvFile) {
      enqueueSnackbar(
        "Please fill in all required fields including CV upload",
        { variant: "error" }
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("full_name", data.full_name);
      formData.append("staff_type", data.staffType);
      formData.append("faculty_id", datas.facultyId);
      formData.append("department_id", datas.departmentId);
      formData.append("unit_id", datas.unitId);
      formData.append("pf_no", datas.pfNumber);
      formData.append("position", data.position);
      formData.append("salary", data.salary);
      formData.append("conunas", data.conunass);
      formData.append("date_of_first_appointment", datas.formattedAppointDate);
      formData.append(
        "date_of_present_appointment",
        datas.formattedPresentDate
      );
      formData.append("grade_of_present_appointment", presentGrade);
      formData.append("grade_of_first_appointment", firstGrade);
      formData.append("details_of_work_done_since_appointment", workDone);
      formData.append("level", data.staffLevel);
      formData.append("supervisor_id", datas.supervisor_office?.id);

      formData.append("form_upload", cvFile);

      const response = await api.createNewCONFIRMATION(formData);

      enqueueSnackbar("Application submitted successfully", {
        variant: "success",
      });
      navigate("success-submit");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || "An error occurred", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg">
              <Crown className="text-purple-600" size={24} />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              Senior Staff Confirmation
            </h1>
          </div>
          <p className="text-gray-600">
            Complete your senior staff appointment confirmation application
          </p>
        </div>
      </div>

      {/* Form Content */}
     <div className="max-w-4xl mx-auto px-2 md:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 py-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 md:gap-8">
            <div className="space-y-3 md:space-y-6">
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">
                    <Award size={16} />
                  </span>
                  Grade of Present Appointment
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={presentGrade}
                  onChange={(e) => setIsPresentGrade(e.target.value)}
                  placeholder="Enter your current grade level"
                  className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">
                    <Award size={16} />
                  </span>
                  Grade of First Appointment
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstGrade}
                  onChange={(e) => setIsFirstGrade(e.target.value)}
                  placeholder="Enter your initial appointment grade"
                  className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">
                    <DocumentText size={16} />
                  </span>
                  Details of work done since Appointment
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={workDone}
                  onChange={(e) => setWorkDone(e.target.value)}
                  placeholder="Provide comprehensive details of your professional accomplishments and contributions since your appointment..."
                  rows={4}
                  className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">
                    <DocumentUpload size={16} />
                  </span>
                  Upload CV
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full md:px-4 md:py-3 px-2 py-1 min-h-[40px] border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  />
                  {cvFile && (
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2">
                        <DocumentText className="text-purple-600" size={16} />
                        <span className="text-sm font-medium text-purple-900">
                          {cvFile.name}
                        </span>
                      </div>
                      {cvPreview && (
                        <a
                          href={cvPreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs"
                        >
                          <Eye size={12} />
                          Preview
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right column - Application Summary */}
            <div className="lg:pl-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="text-purple-600" size={20} />
                  <h3 className="text-lg font-semibold text-purple-900">
                    Senior Staff Application
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff Name:</span>
                    <span className="font-medium text-gray-900">
                      {data?.full_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff Type:</span>
                    <span className="font-medium text-gray-900">
                      {data?.staffType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff Level:</span>
                    <span className="font-medium text-gray-900">
                      {data?.staffLevel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PF Number:</span>
                    <span className="font-medium text-gray-900">
                      {datas?.pfNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CV Status:</span>
                    <span
                      className={`font-medium ${
                        cvFile ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {cvFile ? "Uploaded" : "Required"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Senior Staff Requirements
                  </h4>
                  <p className="text-xs text-gray-600">
                    As a senior staff member, your application requires detailed
                    documentation of your professional achievements and career
                    progression. Please ensure all information is comprehensive
                    and accurate.
                  </p>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Application Status
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-xs text-purple-700">
                      Senior Staff Confirmation in Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" color="white" />
                    Processing Senior Application...
                  </>
                ) : (
                  <>
                    <Crown size={16} />
                    Submit Senior Staff Application
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full">
              <Crown className="text-purple-600" size={32} />
            </div>
            <Spinner size="xl" color="purple.500" />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                Processing Senior Application
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Please wait while we submit your senior staff confirmation
                request
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationOfAppointmentSenior;
