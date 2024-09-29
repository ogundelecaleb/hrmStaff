import React, { useState, useEffect } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Md6K } from "react-icons/md";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import {
  Ankr,
  ArrowForwardSquare,
  ArrowRight,
  NoteRemove,
} from "iconsax-react";
const StaffHomePage = ({ switchRoutes }) => {
  const datar = [
    {
      id: 1,
      title: "Complete your Personal Records / Work Profile",
      message:
        "Go to your Personal records and fill out every Personal detail recquested",
    },
    {
      id: 2,
      title: "Fill the Certificate of Assumption Duty form",
      message:
        "filling out the assumption of duty form enables the verificationof your work status",
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [userDetails, setUserDetails] = useState([]);
  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data);
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

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

  const calculateProgress = () => {
    const fieldsToCheck = [
      "first_name",
      "last_name",
      "email",
      "permanent_address",
      "phone",
      "date_of_birth",
      "nationality",
      "state_of_origin",
      "gender",
      "marital_status",
      "contact_address",
      "date_of_first_appointment",
      "k1_full_name",
      // "beneficiary_full_name",
      "q1_name_of_institution",
    ];
    const filledFields = fieldsToCheck.reduce((count, field) => {
      if (userDetails[field] !== null && userDetails[field] !== undefined) {
        count++;
      }
      return count;
    }, 0);
    const progressPercentage = (filledFields / fieldsToCheck.length) * 100;
    return Math.round(progressPercentage);
  };

  const progress = calculateProgress();
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <div className="px-[16px] md:px-[28px]">
      <p className="text-[#000] text-[16px] md:text-[16px] xl:text-[16px] font-medium leading-[24px]  ">
        Overview
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="border-[0.2px] border-[#98a2b3] rounded-[8px] p-2 xl:p-3">
          <div>
            <div
              className="mt-4 border rounded-3 d-grid bg-[#984779] h-[32px] w-[32px] md:h-[40px] md:w-[40px]"
              style={{
                placeItems: "center",
              }}
            >
              <NoteRemove className="h-[20px] md:h-[32px]" color="white" />
            </div>
            <p className="fs-4  fw-semibold">
              {data?.meta?.total ? data?.meta?.total : "0"}
            </p>
            <p
              className="fs-6 text-muted fw-normal"
              style={{ marginTop: "-10px" }}
            >
              Leave Applications
            </p>
          </div>
        </div>
        <div className="border-[0.2px] border-[#98a2b3] rounded-[8px] p-2 xl:p-3">
          <div>
            <div
              className="mt-4 border rounded-3 d-grid bg-[#984779] h-[32px] w-[32px] md:h-[40px] md:w-[40px]"
              style={{
                placeItems: "center",
              }}
            >
              <Ankr className="h-[20px] md:h-[32px]" color="white" />
            </div>
            <p className="fs-4 mt-2 fw-semibold">
              {userDetails.total_leave_due}
            </p>
            <p
              className="fs-6 text-muted fw-normal"
              style={{ marginTop: "-10px" }}
            >
              Total Leave Due
            </p>
          </div>
        </div>{" "}
        <div className="border-[0.2px] border-[#98a2b3] rounded-[8px] p-2 xl:p-3">
          <div>
            <div
              className="mt-4 border rounded-3 d-grid bg-[#984779] h-[32px] w-[32px] md:h-[40px] md:w-[40px]"
              style={{
                placeItems: "center",
              }}
            >
              <ArrowForwardSquare
                className="h-[20px] md:h-[32px]"
                color="white"
              />
            </div>
            <p className="fs-4 mt-2 fw-semibold">
              {" "}
              {userDetails.last_year_leave}
            </p>
            <p
              className="fs-6 text-muted fw-normal"
              style={{ marginTop: "-10px" }}
            >
              Leave From Previous Year
            </p>
          </div>
        </div>
      </div>

      {progress <100 && (
        <div
          className="flex rounded-1 py-3 md:py-5 px-3 mt-5 row border"
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}
        >
          <div className="col-lg-1 ">
            {" "}
            <CircularProgress
              value={progress}
              thickness="6"
              size="75"
              color="green.400"
            >
              <CircularProgressLabel>{progress}%</CircularProgressLabel>
            </CircularProgress>
          </div>
          <div className="col-lg-8 d-flex gap-3 align-items-center">
            <div className=" ps-2" id="zero-padding">
              <p class="fs-4 mb-0  fw-semibold" id="res">
                Complete all Process
              </p>

              <p className="fs-6 text-muted" id="res">
                Your personal records profile is
                <span className="text-warning"> {progress}% </span> completed
              </p>
            </div>
          </div>
          <div className="col-lg-3 ">
            <Link to={`personal-records`}>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#984779", border: "none" }}
              >
                Complete Profile
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="rounded-lg overflow-hidden border-[0.8px] border-[#E4E7EC] mt-5 md:mt-9">
        <div className="flex items-center justify-between bg-white p-3">
          <p className=" text-[16px] md:text-lg mb-0 text-[#000] leading-[24px] font-medium text-left ">
            Recent Leave Applications
          </p>
          <Link to="/leave/my-leave-applications">
            <button className="flex items-center gap-2">
              {" "}
              <p className=" text-[14px] md:text-base mb-0  text-[#984779] leading-[24px] font-medium text-left ">
                View all applications
              </p>
              <ArrowRight size="16" variant="Linear" color="#984779" />
            </button>
          </Link>
        </div>
        <div class="overflow-x-auto rounded-lg">
          <table className="min-w-full mb-6 border-[0.8px] border-r-[0.8px]  border-l-[0.8px] border-[#E4E7EC] rounded-lg">
            <thead className="bg-light-gray">
              <tr className="">
                <th
                  scope="col"
                  className=" px-2 md:px-5 border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex pl-2  gap-[6px] md:gap-[12px] items-center my-0">
                    Leave Type
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex  gap-[6px] md:gap-[12px] items-center my-0">
                    Leave Duration
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                    Start Date
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex justify-center gap-[6px] md:gap-[12px] items-center my-0">
                    Status
                  </div>
                </th>

                {/* <th
                  scope="col"
                  className="px-2 md:px-5  border-b-[0.8px] border-[#E4E7EC] py-[12px] gap-[6px] md:gap-[12px] text-[14px] md:text-[16px] text-[#98A2B3]  font-medium leading-[20px] md:leading-[24px] tracking-[0.2%]"
                >
                  <div className="flex gap-[6px] md:gap-[12px] items-center my-0">
                    Action
                  </div>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {isLoading && <div>Loading...</div>}
              {data?.data?.length === 0 && (
                <tr>
                  <td className="text-center" colspan="6">
                    <img
                      src="./nodata.gif"
                      className="mx-auto mt-6 h-[70px] "
                      alt=""
                    />
                    <h3 className="text-[30px] leading-[35px]  text-[#1A202C] font-extrabold mb-[6px]">
                      No Leave Application Avalable
                    </h3>
                  </td>
                </tr>
              )}
              {data &&
                data?.data?.map((result, index) => (
                  <tr key={index} className="mb-2 hover:bg-light-gray">
                    <td className="whitespace-nowrap py-[16px] bg-white pl-2 pr-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      {result?.leave_type}
                    </td>

                    <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      {result?.leave_duration}
                    </td>
                    <td className="whitespace-nowrap py-[16px] bg-white  px-5 text-center   border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium   ">
                      {formatDate(result?.start_date)}
                    </td>

                    <td className="whitespace-nowrap py-[16px] bg-white flex justify-center   px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      {" "}
                      <button
                        className={`rounded-[20px] md:rounded-[40px] flex justify-center items-center gap-2 px-[12px]  py-[4px] md:py-[4px] border-[0.5px] ${
                          result?.status === "Declined"
                            ? "bg-[#FEECEB] text-[#F44336] border-[#F44336]"
                            : result?.status === "pending"
                            ? "bg-[#FFF5E6] text-[#F44336] border-[#FF9800]"
                            : "bg-[#EDF7EE] text-[#4CAF50] border-[#4CAF50]"
                        }  text-[10px] md:text-[12px]  font-semibold leading-[16px] md:leading-[18px] `}
                      >
                        <p className="mb-0">{result?.status}</p>
                      </button>{" "}
                    </td>
                    {/* <td className="whitespace-nowrap py-[16px] bg-white  px-5  border-b-[0.8px] border-[#E4E7EC] text-[14px] leading-[24px] tracking-[0.2px] text-[#667185] font-medium text-left  ">
                      <More variant="Linear" color="#667185" size="20" />
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-4 mb-2">
        <div className="col-lg-8">
          {datar.map((items, key) => {
            return (
              <div
                key={key}
                className="row px-2"
                style={{ position: "relative" }}
              >
                <div className="col-2"></div>
                <div
                  style={{ height: "100px" }}
                  id="card"
                  className="shadow col-10 rounded-3 px-3 pt-3 pb-1 mt-4"
                >
                  <p className="fw-semibold fs-6">{items.title}</p>
                  <p style={{ marginTop: "-10px" }}>{items.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-4 ps-5" id="no-padding-res">
          <p className="fs-5 mt-5 fw-semibold" style={{ color: "#984779" }}>
            Upcoming Event
          </p>
          <div>
            <div className="border-bottom pt-3 mt-5">
              <p className="fs-6 mt-1 fw-semibold">Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div className="pt-3">
              <p className="fs-6 mt-1 fw-semibold">Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div>
              <p
                onClick={switchRoutes}
                className="text-center mt-5 pt-4"
                style={{ color: "#984779" }}
              >
                See all Event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHomePage;
