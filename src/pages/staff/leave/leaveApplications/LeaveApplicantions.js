import React, { useState, useEffect, useCallback } from "react";
import { Skeleton, Box, Spinner } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import { useSnackbar } from "notistack";
import CommonButton from "../../../../components/commonbutton/Button";
import api from "../../../../api";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NoData from "../../../../components/NoData";
import { ArrowLeft } from "iconsax-react";

const CustomSkeletonLoader = ({ count }) => {
  const skeletonRows = Array.from({ length: count }, (_, index) => (
    <tr key={index}>
      <td className="text-center" style={{ height: "65px" }}>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className="fs-6 text-center ">
        <Skeleton width="100%" height="50px" />
      </td>
      <td className="fs-6 text-center ">
        <Skeleton width="100%" height="50px" />
      </td>
      <td className="text-center" style={{ cursor: "pointer", width: "40px" }}>
        <Skeleton width="60%" height="25px" />
        <Skeleton width="60%" height="25px" marginTop="10px" />
      </td>
    </tr>
  ));

  return skeletonRows;
};

const LeaveApplicantions = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);

  async function getLeaves(page) {
    const response = await api.fetchMyLeaves({ params: { page } });
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["leaveRequests", page],
    () => getLeaves(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      {isLoading && !data ? (
        <div className="flex justify-center py-12">
          <Spinner size="xl" color="purple.500" />
        </div>
      ) : (
        <div>
          <div className=" px-4 md:px-6">
            <div className="flex  justify-between flex-col md:flex-row mt-4 ">
              <div className="flex items-center " onClick={() => navigate(-1)}>
                <ArrowLeft size={14} />

                <p className="text-lg md:text-xl font-semibold ">
                  Total Leave Applied : {data?.meta?.total}
                </p>
              </div>
              <div className=" " style={{ height: "70px" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute" }}>
                    <input
                      type="text"
                      className="border   "
                      style={{ height: "45px", paddingLeft: "40px" }}
                      placeholder="Search for staff"
                    />
                  </div>
                  <div
                    style={{ position: "absolute", top: "12px", left: "10px" }}
                  >
                    <MdSearch size={"25"} />
                  </div>
                </div>
              </div>
            </div>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px] border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                      <thead className="bg-[#F9FAFB]">
                        <tr>
                          <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5 text-[16px] text-[#98A2B3] font-medium">
                            Staff Name
                          </th>
                          <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5 text-[16px] text-[#98A2B3] font-medium">
                            Leave Type
                          </th>
                          <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5 text-[16px] text-[#98A2B3] font-medium">
                            Status
                          </th>
                          <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5 text-[16px] text-[#98A2B3] font-medium">
                            Date Applied
                          </th>
                          <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5 text-[16px] text-[#98A2B3] font-medium">
                            Department
                          </th>
                          <th className="border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5 text-[16px] text-[#98A2B3] font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.map((item) => (
                          <tr key={item?.id} className="hover:bg-gray-50">
                            <td className="py-4 px-5 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                              {item.full_name}
                            </td>
                            <td className="py-4 px-5 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                              {item.leave_type}
                            </td>
                            <td className="py-4 px-5 border-b border-[#E4E7EC] text-center">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  item.status === "declined"
                                    ? "bg-red-100 text-red-600"
                                    : item.status === "pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-4 px-5 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                              {formatDate(item.date)}
                            </td>
                            <td className="py-4 px-5 border-b border-[#E4E7EC] text-[14px] text-[#667185] font-medium">
                              {item.department?.name ||
                                item.faculty?.name ||
                                item.unit?.name}
                            </td>
                            <td className="py-4 px-5 border-b border-[#E4E7EC] text-center">
                              <Link to={`leave-applicant-details/${item.id}`}>
                                <button className="text-[#984779] px-3 py-1 rounded-md border border-[#984779] bg-[#E9EBFD] hover:bg-gray-100">
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
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {isLoading && !isPreviousData ? (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" color="purple.500" />
                </div>
              ) : data?.data?.length === 0 ? (
                <div className="py-8">
                  <NoData />
                </div>
              ) : (
                data?.data?.map((item) => (
                  <div
                    key={item?.id}
                    className="bg-white border border-[#E4E7EC] rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1A202C] text-sm">
                          {item.full_name}
                        </h4>
                        <p className="text-xs text-[#667185] mt-1">
                          {item.leave_type}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === "declined"
                            ? "bg-red-100 text-red-600"
                            : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#98A2B3]">Date Applied:</span>
                        <span className="text-[#667185]">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#98A2B3]">Department:</span>
                        <span className="text-[#667185]">
                          {item.department?.name ||
                            item.faculty?.name ||
                            item.unit?.name}
                        </span>
                      </div>
                    </div>
                    <Link to={`leave-applicant-details/${item.id}`}>
                      <button className="w-full text-[#984779] px-3 py-2 rounded-md border border-[#984779] bg-[#E9EBFD] hover:bg-gray-100 text-sm">
                        View Application
                      </button>
                    </Link>
                    {item?.status === "approved" && (
                      <Link to="/leave-certificate" state={item}>
                        <button className="text-[#984779] text-xs px-2 py-1 rounded border hover:bg-gray-100">
                          View Certificate
                        </button>
                      </Link>
                    )}
                  </div>
                ))
              )}
            </div>

            {data && data.data && data?.data?.length > 0 && (
              <div className="row px-4">
                <div className="col-lg-4 d-flex gap-3 align-items-center ">
                  <div className="mt-4 flex justify-center text-gray-500 text-sm">
                    <span className="mr-2">
                      Showing {data?.meta?.from} - {data.meta?.to} of{" "}
                      {data?.meta?.total} results
                    </span>
                    <span className="mr-2">|</span>
                    <span className="mr-2">
                      Page {data?.meta?.current_page} of {data?.meta?.last_page}
                    </span>
                    <span className="mr-2">|</span>
                    {/* <span className="mr-2">Page Size: {data?.meta?.per_page}</span> */}
                  </div>
                </div>
                <div className="col-lg-4 "></div>
                <div className="col-lg-4">
                  <div className="d-flex justify-content-end py-2 mt-4 px-5">
                    <h1>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                          <li
                            className={`page-item ${
                              data?.meta?.current_page === 1 ? "disabled" : ""
                            }`}
                          >
                            <p
                              className="page-link"
                              onClick={() =>
                                setPage((prev) => Math.max(prev - 1, 1))
                              }
                              disabled={
                                data.links.prev === null ||
                                data?.meta?.current_page === 1 ||
                                isPreviousData
                              }
                            >
                              <span aria-hidden="true">Prev</span>
                            </p>
                          </li>

                          <li
                            className={`page-item ${
                              data?.meta?.current_page === data?.meta?.last_page
                                ? "disabled"
                                : ""
                            }`}
                          >
                            <p
                              className="page-link"
                              onClick={() => setPage((prev) => prev + 1)}
                              disabled={
                                data.links.next === null ||
                                data?.meta?.current_page ===
                                  data?.meta?.last_page ||
                                isPreviousData
                              }
                            >
                              <span aria-hidden="true">Next</span>
                            </p>
                          </li>
                        </ul>
                      </nav>
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplicantions;
