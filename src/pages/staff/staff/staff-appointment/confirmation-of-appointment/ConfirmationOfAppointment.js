import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { getUserDetails } from "../../../../../utils/utils";
import { useSnackbar } from "notistack";
import ConfirmationOfAppointmentJunior from "./junior";
import ConfirmationOfAppointmentSenior from "./senior";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import {
  User,
  Calendar,
  Briefcase,
  DocumentText,
  Building,
  ArrowRight2,
} from "iconsax-react";

const ConfirmationOfAppointment = ({ navigate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [staffTypes, setstaffTypess] = useState("");
  const [appointDate, setAppointDate] = useState("");
  const [presentDate, setPresentDate] = useState("");
  const [showSection, setShowSection] = useState(null);
  const [pfNumber, setPfNumber] = useState("");

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

  useEffect(() => {
    if (userDetails) {
      fetchUserDetails();
    }
  }, []);

  async function fetchUserDetails() {
    try {
      setIsLoading(true);
      const userDetails = await getUserDetails();
      setUserDetails(userDetails.data);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  const getRoleBasedID = (userRole) => {
    if (userRole === "HOD" || userRole === "RSWEP") {
      return userDetails.department?.id;
    } else if (userRole === "DEAN") {
      return userDetails.faculty?.id;
    } else if (userRole === "HOU" || userRole === "NTSWEP") {
      return userDetails.unit?.id;
    }
    return null;
  };

  const departmentOrUnitOrFacultyID = getRoleBasedID(userDetails.role);
  const rankDesignation = userDetails?.role;

  let departmentId = "";
  let facultyId = "";
  let unitId = "";

  if (rankDesignation === "HOD" || rankDesignation === "RSWEP") {
    departmentId = departmentOrUnitOrFacultyID;
  } else if (rankDesignation === "DEAN") {
    facultyId = departmentOrUnitOrFacultyID;
  } else if (rankDesignation === "HOU" || rankDesignation === "NTSWEP") {
    unitId = departmentOrUnitOrFacultyID;
  }

  const formattedAppointDate = appointDate
    ? new Date(appointDate).toISOString().split("T")[0]
    : null;

  const formattedPresentDate = presentDate
    ? new Date(presentDate).toISOString().split("T")[0]
    : null;

  useEffect(() => {
    if (userDetails) {
      setFormValues({
        full_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
        department: userDetails?.department?.name,
        faculty: userDetails?.faculty?.name,
        unit: userDetails?.unit?.name,
        conunass: userDetails?.conunass,
        role: userDetails?.role,
        type: userDetails?.type,
        staffType: userDetails?.type,
        staffLevel: userDetails?.level,
      });
    }
  }, [userDetails]);

  const formData = {
    formattedAppointDate,
    formattedPresentDate,
    pfNumber,
    departmentId,
    facultyId,
    unitId,
    supervisor_office: userDetails?.supervisor_office,
  };

  const handlestaffTypesChange = (event) => {
    setstaffTypess(event.target.value);
  };

  const handleNavigate = () => {
    if (!staffTypes) {
      enqueueSnackbar("Please select appointment type", { variant: "error" });
      return;
    }
    if (!appointDate || !presentDate || !pfNumber) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
      return;
    }

    let staffSenior = staffTypes === "senior_staff";
    let staffJunior = staffTypes === "junior_staff";

    if (staffSenior) {
      setShowSection("staffSenior");
    } else if (staffJunior) {
      setShowSection("staffJunior");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  function renderSelectedComponent() {
    switch (showSection) {
      case "staffSenior":
        return (
          <ConfirmationOfAppointmentSenior data={formValues} datas={formData} />
        );
      case "staffJunior":
        return (
          <ConfirmationOfAppointmentJunior data={formValues} datas={formData} />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      {showSection ? (
        renderSelectedComponent()
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DocumentText className="text-purple-600" size={24} />
                </div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                  Confirmation of Appointment
                </h1>
              </div>
              <p className="text-gray-600">
                Kindly fill in the required information to proceed
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
                        <Briefcase size={16} />
                      </span>
                      Appointment Type
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={staffTypes}
                      onChange={handlestaffTypesChange}
                      className="w-full md:px-4 md:py-3 px-2 py-1 border text-base border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      required
                    >
                      <option value="">Select Staff Type</option>
                      <option value="junior_staff">Junior Staff</option>
                      <option value="senior_staff">Senior Staff</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <span className="text-purple-600">
                        <User size={16} />
                      </span>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formValues.full_name}
                      placeholder="Full Name"
                      disabled={true}
                      className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-gray-50 text-gray-500 cursor-not-allowed placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      required
                    />
                  </div>

                  {formValues.type === "ASE" && formValues.role === "DEAN" && (
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-purple-600">
                          <Building size={16} />
                        </span>
                        Faculty
                      </label>
                      <input
                        type="text"
                        value={formValues.faculty}
                        placeholder="Faculty"
                        disabled={true}
                        className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-gray-50 text-gray-500 cursor-not-allowed placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        required
                      />
                    </div>
                  )}

                  {formValues.type === "NASE" && (
                    <div className="mb-6">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-purple-600">
                          <Building size={16} />
                        </span>
                        Unit
                      </label>
                      <input
                        type="text"
                        value={formValues.unit}
                        placeholder="Unit"
                        disabled={true}
                        className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-gray-50 text-gray-500 cursor-not-allowed placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                        required
                      />
                    </div>
                  )}

                  {formValues.type === "ASE" &&
                    (formValues.role === "HOD" ||
                      formValues.role === "RSWEP") && (
                      <div className="mb-6">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <span className="text-purple-600">
                            <Building size={16} />
                          </span>
                          Department
                        </label>
                        <input
                          type="text"
                          value={formValues.department}
                          placeholder="Department"
                          disabled={true}
                          className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-gray-50 text-gray-500 cursor-not-allowed placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                          required
                        />
                      </div>
                    )}

                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <span className="text-purple-600">
                        <Calendar size={16} />
                      </span>
                      Date of First Appointment
                      <span className="text-red-500">*</span>
                    </label>
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
                          const formattedDate = date.toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          );
                          setAppointDate(formattedDate);
                        } else {
                          setAppointDate("");
                        }
                      }}
                      dateFormat="yyyy-MM-dd"
                      className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholderText="Select first appointment date"
                      shouldCloseOnSelect={true}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <span className="text-purple-600">
                        <Calendar size={16} />
                      </span>
                      Date of Present Appointment
                      <span className="text-red-500">*</span>
                    </label>
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
                      selected={presentDate ? new Date(presentDate) : null}
                      onChange={(date) => {
                        if (date instanceof Date && !isNaN(date)) {
                          const formattedDate = date.toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          );
                          setPresentDate(formattedDate);
                        } else {
                          setPresentDate("");
                        }
                      }}
                      dateFormat="yyyy-MM-dd"
                      className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      placeholderText="Select present appointment date"
                      shouldCloseOnSelect={true}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <span className="text-purple-600">
                        <DocumentText size={16} />
                      </span>
                      PF/CM No
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={pfNumber}
                      onChange={(e) => setPfNumber(e.target.value)}
                      placeholder="Enter PF/CM Number"
                      className="w-full md:px-4 md:py-3 px-2 py-2 border border-gray-300 md:rounded-xl rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      required
                    />
                  </div>
                </div>

                {/* Right column - Application Summary */}
                <div className="lg:pl-8">
                  <div className="bg-purple-50 rounded-xl p-3 md:p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">
                      Application Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staff Name:</span>
                        <span className="font-medium text-gray-900">
                          {formValues?.full_name || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staff Type:</span>
                        <span className="font-medium text-gray-900">
                          {formValues?.type || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Staff Level:</span>
                        <span className="font-medium text-gray-900">
                          {formValues?.staffLevel || "Not specified"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Role:</span>
                        <span className="font-medium text-gray-900">
                          {formValues?.role || "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-900 mb-2">
                        Next Steps
                      </h4>
                      <p className="text-xs text-gray-600">
                        After completing this form, you'll proceed to the
                        specific appointment confirmation form based on your
                        selected staff type.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={handleNavigate}
                    className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                  >
                    Proceed to Next
                    <ArrowRight2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationOfAppointment;
