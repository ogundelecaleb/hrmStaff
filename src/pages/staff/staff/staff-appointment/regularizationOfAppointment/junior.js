import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Spinner } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import api from "../../../../../api";
import { Calendar, DocumentText, User } from "iconsax-react";

const RegularizationAppointmentJunior = ({ data, datas }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [workDone, setWorkDone] = useState("");
  const [grade, setGrade] = useState("");
  const [appointDate, setAppointDate] = useState("");

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

  const handleSubmit = async () => {
    if (!grade || !appointDate || !workDone) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.createNewRegularization({
        full_name: data.full_name,
        staff_type: data.type,
        pf_no: datas.pfNumber,
        date_of_first_appointment: datas.formattedAppointDate,
        grade_on_temporary_appointment: grade,
        details_of_work_done_since_appointment: workDone,
        faculty_id: datas.facultyId,
        department_id: datas.departmentId,
        date_on_temporary_appointment: formattedRegularDate,
        unit_id: datas.unitId,
        level: data.staffLevel,
        supervisor_id: datas.supervisor_office?.id,
      });

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
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">
            Regularization of Appointment
          </h1>
          <p className="text-gray-600">
            Kindly fill in the required information
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-8">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-purple-600">
                    <Calendar size={16} />
                  </span>
                  Date on Temporary Appointment
                  <span className="text-red-500">*</span>
                </label>
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
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                          className="px-2 py-1 border border-gray-300 rounded"
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
                          className="px-2 py-1 border border-gray-300 rounded"
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
                          className="p-1 hover:bg-gray-100 rounded"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholderText="Select date"
                    shouldCloseOnSelect={true}
                  />
                </div>
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
                  placeholder="Describe the work done since appointment..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                  required
                />
              </div>
            </div>

            {/* Right column - could be used for additional fields or information */}
            <div className="lg:pl-8">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">
                  Application Summary
                </h3>
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
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" color="white" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4">
            <Spinner size="xl" color="purple.500" />
            <p className="text-lg font-semibold text-gray-900">
              Submitting Application...
            </p>
            <p className="text-sm text-gray-600">
              Please wait while we process your request
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegularizationAppointmentJunior;
