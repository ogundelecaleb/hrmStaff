import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import api from "../../../../../api";
import { useSnackbar } from "notistack";
import { 
  ArrowLeft, 
  DocumentText, 
  TickCircle,
  CloseCircle,
  Clock
} from "iconsax-react";

const AppointmentRegularizationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [details, setDetails] = useState([]);
  const [isLoadingw, setIsLoadingw] = useState(false);
  const [isLoadingf, setIsLoadingf] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      fetchRegularizationRequest();
    }
  }, [id]);

  const fetchRegularizationRequest = () => {
    api
      .getRegularizationbyID(id)
      .then((response) => {
        const leaveData = response.data;
        setDetails(leaveData);
        setIsLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
        setIsLoading(false);
      });
  };

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

  const handleSubmit = async (agreement) => {
    try {
      const response = await api.handleRegularizedDecline({
        id: details?.id,
        agree_or_decline: agreement,
        comment: comment,
      });
      enqueueSnackbar("Response submitted successfully", { variant: "success" });
      fetchRegularizationRequest();
      setIsLoadingw(false);
      setIsLoadingf(false);
    } catch (error) {
      enqueueSnackbar(error.message || "An error occurred", {
        variant: "error",
      });
      setIsLoadingf(false);
      setIsLoadingw(false);
    }
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
        <div className="max-w-4xl mx-auto">
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
                Regularization of Appointment
              </h1>
              <p className="text-gray-600">Application Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 md:gap-8">
          {/* Left Column - Applicant Info */}
          <div className="space-y-3 md:space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6">
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

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Date Applied:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatshortDate(details.date || "Application Date not available")}
                  </span>
                </div>
                <div className="border-t border-purple-200 pt-2">
                  <p className="text-sm font-medium text-purple-900">Regularization of Appointment</p>
                </div>
              </div>
            </div>

            {/* Application Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h3>
              <div className="space-y-2 md:space-y-4">                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Staff Type</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{details.staff_type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">PF/CM No</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{details.pf_no}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Level</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{details.level}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Grade on Temporary Appointment</label>
                    <p className="text-base font-medium text-gray-900 mt-1">{details.grade_on_temporary_appointment}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Date of First Appointment</label>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {formatDate(details.date_of_first_appointment)}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Division/Department/Unit</label>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {details.department?.name || details.faculty?.name || details.unit?.name}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Details of Work Done Since Appointment</label>
                  <p className="text-sm text-gray-900 mt-1 leading-relaxed">
                    {details.details_of_work_done_since_appointment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline & Response */}
          <div className="space-y-3 md:space-y-6">
            {/* Approval Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Timeline</h3>
              <div className="space-y-2 md:space-y-4">
                {details.approvals?.map((approval, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-900">{approval.role}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        {formatDate(approval.date)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {approval.comment || "No comment available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* HOD Comment */}
            {details.hod_approval && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">HOD/HOU Comment</h3>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-900">{details.hod_approval}</p>
                </div>
              </div>
            )}

            {/* Staff Response Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Response</h3>
              
              {details && !details?.approvals?.length > 1 ? (
                <div className="space-y-2 md:space-y-4">                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Comment</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                      placeholder="Enter your comment on the HOD/HOU response..."
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Do you agree with the HOD/HOU comment?</p>
                  <div className="flex gap-3">
                      <button
                        onClick={() => {
                          handleSubmit("accept");
                          setIsLoadingw(true);
                        }}
                        disabled={isLoadingw || isLoadingf}
                        className="flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                      >
                        {isLoadingw ? (
                          <Spinner size="sm" color="white" />
                        ) : (
                          <>
                            <TickCircle size={16} />
                            Agree
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          handleSubmit("disapprove");
                          setIsLoadingf(true);
                        }}
                        disabled={isLoadingw || isLoadingf}
                        className="flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                      >
                        {isLoadingf ? (
                          <Spinner size="sm" color="white" />
                        ) : (
                          <>
                            <CloseCircle size={16} />
                            Disagree
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 md:space-y-4">                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-500">Your Comment:</label>
                    <p className="text-sm text-gray-900 mt-1">{details?.applicant_comment_to_hod}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-500">Your Decision:</label>
                    <p className="text-sm text-gray-900 mt-1 capitalize font-medium">
                      {details?.applicant_approval_status_to_hod}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentRegularizationDetails;