import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Spinner } from "@chakra-ui/react";
import api from "../../../../../api";
import { DocumentText, User, Award } from "iconsax-react";

const ConfirmationOfAppointmentJunior = ({ data, datas }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstGrade, setIsFirstGrade] = useState("");
  const [presentGrade, setIsPresentGrade] = useState("");
  const [workDone, setWorkDone] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async () => {
    if (!firstGrade || !presentGrade || !workDone) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.createNewCONFIRMATION({
        full_name: data.full_name,
        staff_type: data.staffType,
        faculty_id: datas.facultyId,
        department_id: datas.departmentId,
        unit_id: datas.unitId,
        pf_no: datas.pfNumber,
        position: data.position,
        salary: data.salary,
        conunas: data.conunass,
        date_of_first_appointment: datas.formattedAppointDate,
        date_of_present_appointment: datas.formattedPresentDate,
        grade_of_present_appointment: presentGrade,
        grade_of_first_appointment: firstGrade,
        details_of_work_done_since_appointment: workDone,
        level: data.staffLevel,
      });
      
      enqueueSnackbar('Application submitted successfully', { variant: 'success' });
      navigate("success-submit");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || "An error occurred", { variant: "error" });
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

  const CustomInput = ({ value, onChange, placeholder, type = "text", multiline = false }) => {
    const baseClasses = "w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400";
    
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
              <User className="text-purple-600" size={24} />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-gray-900">
              Junior Staff Confirmation
            </h1>
          </div>
          <p className="text-gray-600">
            Complete your appointment confirmation application
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3  md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 md:gap-8">
            <div className="space-y-3 md:space-y-6">
              <InputField 
                label="Grade of Present Appointment" 
                required 
                icon={<Award size={16} />}
              >
                <CustomInput
                  value={presentGrade}
                  onChange={(e) => setIsPresentGrade(e.target.value)}
                  placeholder="Enter your current grade"
                />
              </InputField>

              <InputField 
                label="Grade of First Appointment" 
                required 
                icon={<Award size={16} />}
              >
                <CustomInput
                  value={firstGrade}
                  onChange={(e) => setIsFirstGrade(e.target.value)}
                  placeholder="Enter your first appointment grade"
                />
              </InputField>

              <InputField 
                label="Details of work done since Appointment" 
                required 
                icon={<DocumentText size={16} />}
              >
                <CustomInput
                  value={workDone}
                  onChange={(e) => setWorkDone(e.target.value)}
                  placeholder="Describe the work accomplished since your appointment..."
                  multiline
                />
              </InputField>
            </div>

            {/* Right column - Application Summary */}
            <div className="lg:pl-8">
              <div className="bg-blue-50 rounded-xl p-3 md:p-6 border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <User className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-blue-900">
                    Junior Staff Application
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff Name:</span>
                    <span className="font-medium text-gray-900">{data?.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff Type:</span>
                    <span className="font-medium text-gray-900">{data?.staffType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Staff Level:</span>
                    <span className="font-medium text-gray-900">{data?.staffLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">PF Number:</span>
                    <span className="font-medium text-gray-900">{datas?.pfNumber}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Application Type</h4>
                  <p className="text-xs text-gray-600">
                    This is a junior staff confirmation of appointment application. 
                    Please ensure all information provided is accurate and complete.
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
                className="flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" color="white" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <User size={16} />
                    Submit Junior Staff Application
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
            <div className="p-3 bg-blue-100 rounded-full">
              <User className="text-blue-600" size={32} />
            </div>
            <Spinner size="xl" color="purple.500" />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">Processing Application</p>
              <p className="text-sm text-gray-600 mt-1">
                Please wait while we submit your junior staff confirmation request
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationOfAppointmentJunior;