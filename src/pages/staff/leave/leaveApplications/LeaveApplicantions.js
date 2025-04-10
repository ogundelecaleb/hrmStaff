import React, { useState, useEffect, useCallback } from "react";
import { Skeleton, Box } from "@chakra-ui/react";
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
      {isLoading ? (
        <div className=" shadow mx-3 pb-5 mb-5 mt-5">
          <p className="fw-semibold ps-4 fs-4 py-4 border-bottom">
            Leave Applications
          </p>

          <div className="tb-res-parent mt-4">
            <div className="tb-res">
              <table className="table table-hover table-bordered">
                <thead></thead>
                <tbody>
                  <CustomSkeletonLoader count={6} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className=" px-4 md:px-6">
            <div className="flex  justify-between mt-4  px-3">
              <div className="col-lg-4 pt-3 " style={{ height: "70px" }}>
                <p className="fs-5 ">
                  Total Leave Applied : {data?.meta?.total}
                </p>
              </div>
              <div className=" " style={{ height: "70px" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute" }}>
                    <input
                      type="text"
                      className="form-control mt-2 "
                      style={{ height: "45px" }}
                      placeholder="Search for staff"
                    />
                  </div>
                  <div
                    style={{ position: "absolute", top: "18px", left: "10px" }}
                  >
                    <MdSearch size={"25"} />
                  </div>
                </div>
              </div>
             
            </div>
            <div className="overflow-x-auto">
              <div class="sm:-mx-6 lg:-mx-8 mt-5">
                <div class="inline-block min-w-full  sm:px-6 lg:px-8">
                  <div class="overflow-x-auto rounded-lg">
                    <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
                      <thead className="bg-[#F9FAFB]">
                        <tr className="">
                          <th
                            scope="col"
                            className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                          >
                              Staff Name
                          </th>
                          <th
                            scope="col"
                            className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                          >
                              Leave Type{" "}
                          </th>
                          <th
                            scope="col"
                            className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                          >
                              Status{" "}
                          </th>
                          <th
                            scope="col"
                            className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                          >
                              Date Applied{" "}
                          </th>

                          <th
                            scope="col"
                            className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] px-5  gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                          >
                              Department{" "}
                          </th>

                          <th
                            scope="col"
                            className="  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                          >
                              Action{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading && !isPreviousData && (
                          <div className="text-base">Loading...</div>
                        )}
                        {data && data.data && data?.data?.length === 0 && (
                          <tr className="mt-4">
                          <td
                            className="
                          "
                            colspan={6}
                          >
                              <NoData />
                           </td>
                           </tr>
                        )}

                        {data?.data?.map((item) => (
                          <tr key={item?.id} className="mb-2 hover:bg-light-gray">
                            <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center ">
                              <div className="flex items-center gap-1 ">
                                
                                <div className="">{item.full_name}</div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                              {item.leave_type}
                            </td>
                            <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                              {item.status}
                            </td>
                            <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                              {formatDate(item.date)}
                            </td>

                            <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-center  ">
                              <p className="text-sm mb-0 text-[#25324B]">
                                {item.department?.name ||
                                  item.faculty?.name ||
                                  item.unit?.name}
                              </p>{" "}
                            </td>

                            <td className="whitespace-nowrap py-[16px]  gap-2 bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#1A202C] font-medium text-center  ">
                              <Link to={`leave-applicant-details/${item.id}`}>
                                <button
                                  className="btn py-1 px-3 rounded-lg mt-3 btn-sm"
                                  style={{
                                    border: "1px solid #984779",
                                    color: "#987779",
                                    backgroundColor: "#E9EBFD",
                                  }}
                                >
                                  View Application
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                        {/* ))} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
