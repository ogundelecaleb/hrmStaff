import React, { useState, useEffect, useCallback } from "react";
import {
  Skeleton,Box
} from "@chakra-ui/react";
import {
  Text,
} from "@chakra-ui/layout";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import { useSnackbar } from "notistack";
import CommonButton from "../../../../components/commonbutton/Button";
import api from "../../../../api";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NoData from "../../../../components/NoData"


const CustomSkeletonLoader = ({ count }) => {
  const skeletonRows = Array.from({ length: count }, (_, index) => (
    <tr key={index}>
      <td className='text-center' style={{ height: "65px" }}>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='fs-6 text-center '>
        <Skeleton width="100%" height="50px" />
      </td>
      <td className='text-center' style={{ cursor: "pointer", width:'40px' }}>
        <Skeleton width="60%" height="25px"  />
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
    const response = await api.fetchMyLeaves({ params: { page } })
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(['leaveRequests', page], () =>
    getLeaves(page),
    {
      keepPreviousData: true, refetchOnWindowFocus: "always",
    }

  );
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, '0');
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
          <div className="container px-4">
            <div className="row mt-4 pa-res px-3">
              <div className="col-lg-4 pt-3 " style={{ height: "70px" }}>
                <p className="fs-5 ">
                  Total Leave Applied : {data?.meta?.total}
                </p>
              </div>
              <div className="col-lg-3 " style={{ height: "70px" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute" }}>
                    <input
                      type="text"
                      className="form-control mt-2 ps-5"
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
              <div
                className="col-lg-5 d-flex flex-wrap gap-3 align-items-center justify-content-end"
                style={{ cursor: "pointer", height: "70px" }}
              >
                {/* <Link
                to={`/leave/leave-application`}>
                <CommonButton title={"Apply for Leave"} />
              </Link> */}
                <div></div>
              </div>
            </div>
            <div className="px-3 tb-res-parent mt-4 ">
              <div className="tb-res">
                <table class="table table-hover">
                  {/* Filter Table start */}

                  <thead>
                    <tr className="border">
                      <th scope="col" className="py-3">
                        <input
                          type="checkbox"
                          style={{ border: "10px solid grey" }}
                        />
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Staff Name{" "}
                        <label style={{ marginBottom: "-8px" }}>
                          <TbDirection size={"25"} />
                        </label>
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Leave Type{" "}
                        <label style={{ marginBottom: "-8px" }}>
                          <TbDirection size={"25"} />
                        </label>
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Status{" "}
                        <label style={{ marginBottom: "-8px" }}>
                          <TbDirection size={"25"} />
                        </label>
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Date Applied{" "}
                        <label style={{ marginBottom: "-8px" }}>
                          <TbDirection size={"25"} />
                        </label>
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Department{" "}
                        <label style={{ marginBottom: "-8px" }}>
                          <TbDirection size={"25"} />
                        </label>
                      </th>
                      <th scope="col" className="fw-light py-3 text-muted fs-6">
                        Action{" "}
                        <label style={{ marginBottom: "-8px" }}>
                          <TbDirection size={"25"} />
                        </label>
                      </th>
                    </tr>
                  </thead>

                  <br />

                  {isLoading && !isPreviousData && <div>Loading...</div>}

                  {data?.data?.map((item) => (
                    <tbody key={item.id} className="border">
                      <tr>
                        <th scope="row">
                          {/* {index + 1} */}
                          <input type="checkbox" className="mt-4" />
                        </th>
                        <td>
                          <div className="d-flex gap-4">
                            <img
                              src={item.user_image}
                              style={{
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                              }}
                              className="mt-2"
                              alt="/"
                            />
                            <div>
                              <p
                                className="fw-semibold pt-4"
                                fontSize={"smaller"}
                              >
                                {item.full_name}
                              </p>
                              {/* <p className='fw-bold text-muted'>{item.full_name}</p> */}
                            </div>
                          </div>
                        </td>
                        <td className="mt-4">
                          <p fontSize={"smaller"}>{item.leave_type}</p>
                        </td>
                        <td>
                          <button className="btn fw-semibold btn-outline-primary mt-3  h-8 btn-sm rounded-2">
                            {item.status}
                          </button>
                        </td>
                        <td className="fw-semibold">
                          <p className="mt-3">{formatDate(item.date)}</p>
                        </td>
                        <td className="pt-4">
                          <Text fontSize={"smaller"} color="#25324B">
                            {item.department?.name ||
                              item.faculty?.name ||
                              item.unit?.name}
                          </Text>
                        </td>
                        <td className="fw-semibold">
                          <Link to={`leave-applicant-details/${item.id}`}>
                            <button
                              className="btn py-1 px-3 rounded-0 mt-3 btn-sm rounded-0 fw-semibold"
                              style={{
                                border: "1px solid #984779",
                                color: "#987779",
                                backgroundColor: "#E9EBFD",
                              }}
                            >
                              View Application
                            </button>
                          </Link>
                          <b className="fs-6 ps-2 pt-3">...</b>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>

            {data && data.data && data?.data?.length === 0 && (
              <Box
                w={"80vw"}
                display="flex"
                flexDirection="column"
                h={"20vh"}
                alignItems="center"
                justifyContent="center"
              >
                <div
                  className="row mt-5 "
                  style={{ height: "10px", width: "80%" }}
                >
                  <NoData />
                </div>
              </Box>
            )}

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
