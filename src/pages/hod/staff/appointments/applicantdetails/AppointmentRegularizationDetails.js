import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import api from "../../../../../api";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../../../utils/utils";
import { 
  ArrowLeft, 
  DocumentText, 
  TickCircle,
  CloseCircle,
  Clock,
  MessageText
} from "iconsax-react";

const AppointmentRegularizationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [isLoadinge, setIsLoadinge] = useState(false);
  const [details, setDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isCommentDisplayed, setIsCommentDisplayed] = useState(false);

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      setComments([...comments, commentText]);
      setIsCommentDisplayed(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (id) {
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
    }
  }, [id]);

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

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

  const shouldDisplayButtons =
    !details.approvals ||
    !details.approvals.some(
      (approval) =>
        approval.role === userDetails?.data?.role &&
        (approval.status === "approved" || approval.status === "declined")
    );

  async function handleApprovedBtn(e) {
    e.preventDefault();
    if (!isCommentDisplayed) {
      enqueueSnackbar("Please add a comment before accepting.", {
        variant: "warning",
      });
      return;
    }
    setIsLoadinge(true);
    try {
      const response = await api.handleRegularizedApprove({
        id,
        status: "approved",
        comment: commentText,
      });
      enqueueSnackbar("Application approved successfully", {
        variant: "success",
      });
      setIsLoadinge(false);
      window.location.reload();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoadinge(false);
    }
  }

  async function handleDeclinedBtn(e) {
    e.preventDefault();
    if (!isCommentDisplayed) {
      enqueueSnackbar("Please add a comment before declining.", {
        variant: "warning",
      });
      return;
    }
    setIsLoadingd(true);
    try {
      const response = await api.handleRegularizedDecline({
        id,
        status: "declined",
        comment: commentText,
      });
      enqueueSnackbar("Application declined successfully", {
        variant: "success",
      });
      setIsLoadingd(false);
      window.location.reload();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoadingd(false);
    }
  }

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
            <span className="text-lg font-medium">Back to Applications </span>
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DocumentText className="text-purple-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Regularization of Appointment
              </h1>
              <p className="text-gray-600">Application Review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Applicant Info & Actions */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
                  <p className="text-sm font-medium text-purple-600 mt-1">
                    Status: {details?.approval_status}
                  </p>
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

            {/* Staff Response to HOD */}
            {details?.applicant_approval_status_to_hod && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff Response to HOD</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-500">Staff Comment:</label>
                    <p className="text-sm text-gray-900 mt-1">{details?.applicant_comment_to_hod}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <label className="text-sm font-medium text-gray-500">Staff Decision:</label>
                    <p className="text-sm text-gray-900 mt-1 capitalize font-medium">
                      {details?.applicant_approval_status_to_hod}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Comment Section */}
            {!isCommentDisplayed && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Comment</h3>
                <div className="space-y-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                    placeholder="Add your comment for this application..."
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
                  >
                    <MessageText size={16} />
                    Add Comment
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {shouldDisplayButtons && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Decision</h3>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeclinedBtn}
                    disabled={isLoadingd || isLoadinge}
                    className="flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex-1"
                  >
                    {isLoadingd ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      <>
                        <CloseCircle size={16} />
                        Decline
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleApprovedBtn}
                    disabled={isLoadingd || isLoadinge}
                    className="flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex-1"
                  >
                    {isLoadinge ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      <>
                        <TickCircle size={16} />
                        Approve
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Application Details & Timeline */}
          <div className="space-y-6">
            {/* Application Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Approval Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Timeline</h3>
              <div className="space-y-4">
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
                
                {comments.length > 0 && (
                  <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-900">{userDetails?.data?.role}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        {formatDate(new Date())}
                      </div>
                    </div>
                    {comments.map((comment, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {comment}
                      </p>
                    ))}
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

export default AppointmentRegularizationDetails;