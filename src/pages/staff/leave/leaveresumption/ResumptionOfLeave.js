import React, { useState, useEffect, useCallback } from "react";
import { TbDirection } from "react-icons/tb";
import api from "../../../../api";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Spinner } from "@chakra-ui/react";
import { MoonLoader } from "react-spinners";
import { ArrowLeft } from "iconsax-react";

const ResumptionOfLeave = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  async function myResumption(page) {
    const response = await api.myResumption({ params: { page } });
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["myResumption", page],
    () => myResumption(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  const resumeData = data?.data || [];

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  if (isLoading && !data) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="xl" color="purple.500" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h3
        onClick={() => navigate(-1)}
        className="text-lg font-semibold flex items-center gap-1"
      >
        <ArrowLeft size={14} />
        Leave Resumption
      </h3>
      {/* Desktop Table */}
      <div className="hidden md:block sm:-mx-6 lg:-mx-8 mt-3">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px] border-l-[0.8px] border-[#E4E7EC] rounded-lg">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 text-[16px] text-[#98A2B3] font-medium">
                    Staff Name
                  </th>
                  <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 text-[16px] text-[#98A2B3] font-medium">
                    Leave Type
                  </th>
                  <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 text-[16px] text-[#98A2B3] font-medium">
                    Stage
                  </th>
                  <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 text-[16px] text-[#98A2B3] font-medium">
                    Start Date
                  </th>
                  <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 text-[16px] text-[#98A2B3] font-medium">
                    No. of Days
                  </th>
                  <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-3 text-[16px] text-[#98A2B3] font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {resumeData?.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="py-4 px-3 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                      <div className="flex items-center gap-2">
                        {result?.leave?.user_image && (
                          <img
                            src={result?.leave?.user_image}
                            className="h-6 w-6 rounded-full"
                            alt=""
                          />
                        )}
                        <span
                          onClick={() =>
                            navigate("/portal/resumption-details", {
                              state: { details: result },
                            })
                          }
                          className="cursor-pointer text-primary underline uppercase"
                        >
                          {result?.leave?.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                      {result?.leave?.leave_type}
                    </td>
                    <td className="py-4 px-3 border-b border-[#E4E7EC] text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        result.approval_status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : result.approval_status === "Ongoing"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {result?.approval_status}
                      </span>
                    </td>
                    <td className="py-4 px-3 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                      {formatDate(result?.leave?.start_date)}
                    </td>
                    <td className="py-4 px-3 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                      {result?.leave?.leave_duration} days
                    </td>
                    <td className="py-4 px-3 border-b border-[#E4E7EC]">
                      <div className="flex gap-2">
                        {result?.approval_status === "approved" && (
                          <Link to="/leave-resumption-certificate" state={result}>
                            <button className="text-[#984779] px-2 py-1 rounded-md border hover:bg-gray-100">
                              View Certificate
                            </button>
                          </Link>
                        )}
                        <button
                          onClick={() =>
                            navigate("/portal/resumption-details", {
                              state: { details: result },
                            })
                          }
                          className="px-2 py-1 bg-purple-800 hover:bg-purple-700 text-white rounded-md"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden mt-3 space-y-3">
        {isLoading && !data ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" color="purple.500" />
          </div>
        ) : resumeData?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No resumption applications found</p>
          </div>
        ) : (
          resumeData?.map((result) => (
            <div key={result.id} className="bg-white border border-[#E4E7EC] rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 flex-1">
                  {result?.leave?.user_image && (
                    <img
                      src={result?.leave?.user_image}
                      className="h-8 w-8 rounded-full"
                      alt=""
                    />
                  )}
                  <div>
                    <h4
                      onClick={() =>
                        navigate("/portal/resumption-details", {
                          state: { details: result },
                        })
                      }
                      className="font-semibold text-[#1A202C] text-sm cursor-pointer text-primary underline uppercase"
                    >
                      {result?.leave?.full_name}
                    </h4>
                    <p className="text-xs text-[#667185] mt-1">{result?.leave?.leave_type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  result.approval_status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : result.approval_status === "Ongoing"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-green-100 text-green-600"
                }`}>
                  {result?.approval_status}
                </span>
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[#98A2B3]">Start Date:</span>
                  <span className="text-[#667185]">{formatDate(result?.leave?.start_date)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#98A2B3]">Duration:</span>
                  <span className="text-[#667185]">{result?.leave?.leave_duration} days</span>
                </div>
              </div>
              <div className="flex gap-2">
                {result?.approval_status === "approved" && (
                  <Link to="/leave-resumption-certificate" state={result} className="flex-1">
                    <button className="w-full text-[#984779] px-3 py-2 rounded-md border border-[#984779] hover:bg-gray-100 text-sm">
                      View Certificate
                    </button>
                  </Link>
                )}
                <button
                  onClick={() =>
                    navigate("/portal/resumption-details", {
                      state: { details: result },
                    })
                  }
                  className={`px-3 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-md text-sm ${
                    result?.approval_status === "approved" ? "flex-1" : "w-full"
                  }`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResumptionOfLeave;
