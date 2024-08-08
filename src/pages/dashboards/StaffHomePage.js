import React, { useState , useEffect} from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Md6K } from "react-icons/md";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../utils/utils";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
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
      setUserDetails(userDetails.data)
      
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

  async function getdLeaves(page) {
    try {
      const userDetails = await getUserDetails();
      const role = userDetails.data.role;
  
      if (['CS'].includes(role)) {
        // Fetch data for 'DEAN', 'CS', role
        const response = await api.fetchCsLeaves({ params: { page } });
        return response;
        
      } else  if (['PT'].includes(role)) {
        // Fetch data for 'PT' role
        const response = await api.fetchPtLeaves({ params: { page } });
        return response;
      }else  if (['DEAN'].includes(role)) {
        // Fetch data for 'PT' role
        const response = await api.fetchDnLeaves({ params: { page } });
        return response;
      } else if (['HOD'].includes(role)) {
        // Fetch data for 'HOD' or 'HOU' role
        const response = await api.fethDepartmentLeave({ params: { page } });
        return response;
      } else if (['HOU'].includes(role)) {
        // Fetch data for 'HOD' or 'HOU' role
        const response = await api.fethUnitLeave({ params: { page } });
        return response;
      } else {
        // Handle other roles or scenarios
        return { data: [] }; // Return empty data or handle differently
      }
    } catch (error) {
      console.error("Error fetching leave data");
      // enqueueSnackbar(error.message, { variant: 'error' });
     // Rethrow the error to be caught by react-query
    }
  }  

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(['DepartmentleaveRequests', page], () =>
    getdLeaves(page),
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
    <div
      className='container'
      style={{ paddingLeft: "6%", paddingRight: "6%" }}>
      <p className='text-muted fs-6 pt-5'>Overview</p>
      <div className='row' style={{ marginTop: "-10px" }}>
        <div
          className='col-lg-3 mt-3'
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}>
          <div>
            <div className='mt-4' style={{ color: "#984779" }}>
              {<Md6K size='25' />}
            </div>
            <p className='fs-4 mt-2 fw-semibold'>{data?.meta?.total}</p>
            <p
              className='fs-6 text-muted fw-normal'
              style={{ marginTop: "-10px" }}>
              Leave Applications
            </p>
          </div>
        </div>
        <div className='col-lg-1' style={{ width: "10px" }}></div>
        <div
          className='col-lg-3 mt-3'
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}>
          <div>
            <div
              className='mt-4 border rounded-3 d-grid'
              style={{
                color: "#984779",
                width: "50px",
                height: "50px",
                placeItems: "center",
              }}>
              {<Md6K size='25' />}
            </div>
            <p className='fs-4 mt-2 fw-semibold'>0</p>
            <p
              className='fs-6 text-muted fw-normal'
              style={{ marginTop: "-10px" }}>
              Total Requests
            </p>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div
          className='col-lg-12 rounded-1 px-3 row border'
          style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}>
          <div className='col-lg-1 pt-4'>
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
          <div className='col-lg-8 d-flex gap-3 align-items-center'>
            <div className='line-height-10 ps-2' id='zero-padding'>
              <p class='fs-4 fw-semibold' id='res'>
                Complete all Process
              </p>

              <p className='fs-6 text-muted' id='res'>
                Your personal records profile is 
                <span className='text-warning'> {progress}% </span> completed
              </p>
            </div>
          </div>
          <div className='col-lg-3 py-5'>
          <Link
            to={`personal-records`}>
            <button
              className='btn btn-primary'
              style={{ backgroundColor: "#984779", border: "none" }}>
              Complete Profile
            </button>
          </Link>
          </div>
        </div>
      </div>
      
      <div className='row mt-4 mb-2'>
        <div className='col-lg-8'>
          {datar.map((items, key) => {
            return (
              <div
                key={key}
                className='row px-2'
                style={{ position: "relative" }}>
                <div className='col-2'></div>
                <div
                  style={{ height: "100px" }}
                  id='card'
                  className='shadow col-10 rounded-3 px-3 pt-3 pb-1 mt-4'>
                  <p className='fw-semibold fs-6'>{items.title}</p>
                  <p style={{ marginTop: "-10px" }}>{items.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className='col-lg-4 ps-5' id='no-padding-res'>
          <p className='fs-5 mt-5 fw-semibold' style={{ color: "#984779" }}>
            Upcoming Event
          </p>
          <div>
            <div className='border-bottom pt-3 mt-5'>
              <p className='fs-6 mt-1 fw-semibold'>Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div className='pt-3'>
              <p className='fs-6 mt-1 fw-semibold'>Monday, 23 jan 2023</p>
              <p style={{ marginTop: "-10px" }}>Leave commences</p>
            </div>
            <div>
              <p
                onClick={switchRoutes}
                className='text-center mt-5 pt-4'
                style={{ color: "#984779" }}>
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
