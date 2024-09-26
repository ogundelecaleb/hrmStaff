import React, { useState, useEffect } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Md6K } from "react-icons/md";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Ankr, ArrowForwardSquare, NoteRemove } from "iconsax-react";
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
    const response = await api.fetchMyLeaves({ params: { page } })
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(['leaveRequests', page], () =>
    getLeaves(page),
    {
      keepPreviousData: true, refetchOnWindowFocus: "always",
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

  return (
    <div className="px-16px md:px-[28px]">
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
            <p className="fs-4  fw-semibold">{data?.meta?.total ? data?.meta?.total  : "0"}</p>
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
      <div className="row mt-5">
        <div
          className="col-lg-12 rounded-1 px-3 row border"
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}
        >
          <div className="col-lg-1 pt-4">
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
            <div className="line-height-10 ps-2" id="zero-padding">
              <p class="fs-4 fw-semibold" id="res">
                Complete all Process
              </p>

              <p className="fs-6 text-muted" id="res">
                Your personal records profile is
                <span className="text-warning"> {progress}% </span> completed
              </p>
            </div>
          </div>
          <div className="col-lg-3 py-5">
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
