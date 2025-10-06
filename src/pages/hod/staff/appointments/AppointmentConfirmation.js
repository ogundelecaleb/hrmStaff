import React, { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../../../utils/utils";
import NoData from "../../../../components/NoData";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { Filter, Add } from "iconsax-react";

const AppointmentConfirmation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [userDetails, setUserDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      setUserDetails(userDetails);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function getConfirmation(page) {
    try {
      const userDetails = await getUserDetails();
      const role = userDetails.data.role;
  
      if (['CS'].includes(role)) {
        const response = await api.fetchCSConfirmation({ params: { page } });
        return response;
      } else if (['PT'].includes(role)) {
        const response = await api.fetchPTConfirmation({ params: { page } });
        return response;
      } else if (['DEAN'].includes(role)) {
        const response = await api.fetchDEANConfirmation({ params: { page } });
        return response;
      } else if (['HOD'].includes(role)) {
        const response = await api.fetchHodConfirmation({ params: { page } });
        return response;
      } else if (['HNASEJ'].includes(role)) {
        const response = await api.fetchHNASEJConfirmation({ params: { page } });
        return response;
      } else if (['HNASES'].includes(role)) {
        const response = await api.fetchHNASESConfirmation({ params: { page } });
        return response;
      } else if (['HOU'].includes(role)) {
        const response = await api.fetchUnitConfirmation({ params: { page } });
        return response;
      } else {
        return { data: [] };
      }
    } catch (error) {
      console.error("Error fetching confirmation data", error);
      enqueueSnackbar(error.message, { variant: 'error' });
      throw error;
    }
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ['confirmationRequests', page], 
    () => getConfirmation(page),
    {
      keepPreviousData: true, 
      refetchOnWindowFocus: "always",
    }
  );
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmation</h1>
            <p className="text-gray-600">Total Applications: {data?.meta?.total || 0}</p>
          </div>
          
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Search for staff..."
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <TbGridDots size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <AiOutlineMenu size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <Link to="confirmation-application">
                <button className="flex items-center gap-2 md:px-6 md:py-3 px-3 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                  <Add size={16} />
                  Apply
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={item.user_image}
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.full_name}</div>
                        <div className="text-sm text-gray-500">ID: {item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(item.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.department?.name || item.faculty?.name || item.unit?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`confirmation-details/${item.id}`} state={{ item: item }}>
                      <button className="inline-flex items-center px-4 py-2 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors">
                        View Application
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {data?.data?.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={item.user_image}
                  alt=""
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{item.full_name}</h3>
                  <p className="text-xs text-gray-500">ID: {item.id}</p>
                </div>
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {item.stage}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Applied Date:</span>
                <span className="text-gray-900">{formatDate(item.date)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Department:</span>
                <span className="text-gray-900">{item.department?.name || item.faculty?.name || item.unit?.name}</span>
              </div>
            </div>
            
            <Link to={`confirmation-details/${item.id}`} state={{ item: item }}>
              <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors">
                View Application
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data?.data?.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <NoData />
        </div>
      )}

      {/* Pagination */}
      {data?.data?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              Showing {data?.meta?.from} - {data?.meta?.to} of {data?.meta?.total} results
              <span className="mx-2">|</span>
              Page {data?.meta?.current_page} of {data?.meta?.last_page}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={data?.meta?.current_page === 1 || isPreviousData}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(prev => prev + 1)}
                disabled={data?.meta?.current_page === data?.meta?.last_page || isPreviousData}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentConfirmation;