import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import api from "../../../../../api";
import { useSnackbar } from "notistack";
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  DocumentText, 
  Building 
} from "iconsax-react";

const AppointmentConfirmationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      api.getConfirmationbyID(id)
      .then(response => {
        const leaveData = response.data;
        setDetails(leaveData);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
        setIsLoading(false);
      });
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatshortDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-lg font-medium">Back to Applications</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DocumentText className="text-purple-600" size={24} />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Applicant Details
              </h1>
              <p className="text-gray-600">Confirmation of Appointment Application</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 md:gap-8">
          {/* Left Sidebar - Applicant Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 mb-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={details.user_image}
                  alt={details.full_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{details.full_name}</h3>
                  <p className="text-sm text-gray-600">{details.staffID}</p>
                  <p className="text-sm text-gray-600">{details.role}</p>
                </div>
              </div>

              {/* Application Info */}
              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Date Applied:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatshortDate(details.date || "Application Date not available")}
                  </span>
                </div>
                <div className="border-t border-purple-200 pt-2">
                  <p className="text-sm font-medium text-purple-900">Confirmation of Appointment</p>
                </div>
              </div>

              {/* Approvals Timeline */}
              <div className="space-y-2 md:space-y-4">                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Approval Timeline</h4>
                {details.approvals?.map((approval, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-900">{approval.role}</span>
                      <span className="text-xs text-gray-500">{formatDate(approval.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {approval.comment || "No comment available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab("info")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "info"
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Applicant Information
                  </button>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === "documents"
                        ? "border-purple-500 text-purple-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Documents
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-3 md:p-6">
                {activeTab === "info" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:p-6">
                    <div className="space-y-2 md:space-y-4">                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p className="text-base font-medium text-gray-900 mt-1">{details.full_name}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Staff Type</label>
                        <p className="text-base font-medium text-gray-900 mt-1">{details.staff_type}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Current Level</label>
                        <p className="text-base font-medium text-gray-900 mt-1">{details.level}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">PF/CM No</label>
                        <p className="text-base font-medium text-gray-900 mt-1">{details.pf_no}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of First Appointment</label>
                        <p className="text-base font-medium text-gray-900 mt-1">
                          {formatDate(details.date_of_first_appointment)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-4">                      <div>
                        <label className="text-sm font-medium text-gray-500">Division/Department/Unit</label>
                        <p className="text-base font-medium text-gray-900 mt-1">
                          {details.department?.name || details.faculty?.name || details.unit?.name}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Present Appointment</label>
                        <p className="text-base font-medium text-gray-900 mt-1">
                          {formatDate(details.date_of_present_appointment)}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Grade on First Appointment</label>
                        <p className="text-base font-medium text-gray-900 mt-1">{details.grade_of_first_appointment}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Grade on Temporary Appointment</label>
                        <p className="text-base font-medium text-gray-900 mt-1">{details.grade_on_temporary_appointment}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Details of Work Done Since Appointment</label>
                        <p className="text-sm text-gray-900 mt-1 leading-relaxed">
                          {details.details_of_work_done_since_appointment}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className="text-center py-12">
                    <DocumentText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No documents available</h3>
                    <p className="mt-1 text-sm text-gray-500">Documents will appear here when uploaded.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmationDetails;