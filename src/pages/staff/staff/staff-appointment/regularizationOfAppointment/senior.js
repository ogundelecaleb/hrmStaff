import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Spinner } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import api from "../../../../../api";
import {
  Calendar,
  DocumentText,
  User,
  Award,
  DocumentUpload,
  Eye,
} from "iconsax-react";

const RegularizationAppointmentSenior = ({ data, datas }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workDone, setWorkDone] = useState("");
  const [grade, setGrade] = useState("");
  const [appointDate, setAppointDate] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedRegularDate = appointDate
    ? new Date(appointDate).toISOString().split("T")[0]
    : null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
      const fileUrl = URL.createObjectURL(file);
      setCvPreview(fileUrl);
    }
  };

  const handleSubmit = async () => {
    if (!grade || !appointDate || !workDone || !cvFile) {
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
      formData.append("staff_type", data.type);
      formData.append("pf_no", datas.pfNumber);
      formData.append("date_of_first_appointment", datas.formattedAppointDate);
      formData.append("grade_on_temporary_appointment", grade);
      formData.append("details_of_work_done_since_appointment", workDone);
      formData.append("faculty_id", datas.facultyId);
      formData.append("department_id", datas.departmentId);
      formData.append("date_on_temporary_appointment", formattedRegularDate);
      formData.append("unit_id", datas.unitId);
      formData.append("level", data.staffLevel);
      formData.append("supervisor_id", datas.supervisor_office?.id);
      formData.append("form_upload", cvFile);

      const response = await api.createNewRegularization(formData);

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

  const InputField = ({ label, required, children, icon }) => (
    <div className="mb-6">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        {icon && <span className="text-purple-600">{icon}</span>}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  const CustomInput = ({
    value,
    onChange,
    placeholder,
    type = "text",
    multiline = false,
  }) => {
    const baseClasses =
      "w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400";

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
          className={`${baseClasses} resize-none`}
          required
        />
      );
    }

    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={baseClasses}
        required
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="text-purple-600" size={24} />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              Senior Staff Regularization
            </h1>
          </div>
          <p className="text-gray-600">
            Complete your appointment regularization application
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
                    <User size={16} />
                  </span>
                  Grade on Temporary Appointment
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Enter grade on temporary appointment"
                  className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                />
              </div>

              <InputField
                label="Date on Temporary Appointment"
                required
                icon={<Calendar size={16} />}
              >
                <div className="relative">
                  <DatePicker
                    autoComplete="off"
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div className="flex justify-center items-center gap-2 p-2">
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={appointDate ? new Date(appointDate) : null}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        });
                        setAppointDate(formattedDate);
                      } else {
                        setAppointDate("");
                      }
                    }}
                    dateFormat="yyyy-MM-dd"
                    className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholderText="Select appointment date"
                    shouldCloseOnSelect={true}
                  />
                </div>
              </InputField>

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
                  placeholder="Describe the work done since appointment..."
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
                  <Award className="text-purple-600" size={20} />
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
                      {data?.type}
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
                    Important Note
                  </h4>
                  <p className="text-xs text-gray-600">
                    As a senior staff member, please ensure all information
                    provided is accurate and complete. Your application will
                    undergo thorough review by the appropriate authorities.
                  </p>
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
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" color="white" />
                    Processing Application...
                  </>
                ) : (
                  <>
                    <Award size={16} />
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
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="text-purple-600" size={32} />
            </div>
            <Spinner size="xl" color="purple.500" />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">
                Processing Application
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Please wait while we submit your senior staff regularization
                request
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegularizationAppointmentSenior;
