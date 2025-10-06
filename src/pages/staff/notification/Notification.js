import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import NotificationAnimation from "../../../components/NotificationAnimation";
import api from "../../../api";
import { 
  Notification as NotificationIcon, 
  Clock, 
  ArrowLeft2, 
  ArrowRight2 
} from "iconsax-react";

const Notification = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  async function fetchUserNotification() {
    try {
      setIsLoading(true);
      const message = await api.fetchNotification();
      console.log("Notification Messages:", message);
      setMessage(message.data);
    } catch (error) {
      console.error("Error fetching notifications", error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  async function markMeassage() {
    try {
      const markAsRead = await api.markAsRead();
    } catch (error) {
      console.error("Error fetching your basic details");
    }
  }

  useEffect(() => {
    markMeassage();
  }, []);

  useEffect(() => {
    fetchUserNotification();
  }, []);

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = message.slice(indexOfFirstNotification, indexOfLastNotification);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  if (!Array.isArray(message) || message.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <NotificationIcon className="text-purple-600" size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Notifications
              </h1>
            </div>
            <p className="text-gray-600">
              Stay updated with your latest notifications
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <NotificationIcon className="text-purple-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-gray-600 mb-6">You'll see your notifications here when you receive them.</p>
            <NotificationAnimation />
          </div>
        </div>
      </div>
    );
  }

  const NotificationMessage = ({ desc, mins }) => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 mb-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
            <NotificationIcon className="text-purple-600" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 text-sm md:text-base leading-relaxed">
              {desc}
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
              <Clock size={14} />
              <span>{mins} mins ago</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const totalPages = Math.ceil(message.length / notificationsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 md:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <NotificationIcon className="text-purple-600" size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Notifications
            </h1>
          </div>
          <p className="text-gray-600">
            Stay updated with your latest notifications
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 md:p-6 mb-4 md:mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Recent Notifications</h3>
              <p className="text-sm text-gray-600">
                {message.length} total notification{message.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="gap-3 md:space-y-4">
          {currentNotifications.map((msg, index) => (
            <NotificationMessage
              key={index}
              desc={msg.message}
              mins={msg.date}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <ArrowLeft2 size={16} />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastNotification >= message.length}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                indexOfLastNotification >= message.length
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              Next
              <ArrowRight2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;