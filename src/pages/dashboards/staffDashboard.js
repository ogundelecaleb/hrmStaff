import { useEffect, useState } from "react";
import "./DashBoard.css";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../utils/utils";

import StaffDashboardRoute from "../../routes/StaffDashboardRoute";
import StaffLeftNavbar from "../../components/staffleftnavbar/StaffLeftNavbar";
import { Box } from "@chakra-ui/react";

const StaffDashboard = () => {
  //   const [users, setUsers] = useState([]);
  const [mobile, setMobile] = useState(true);
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [userStaffNumber, setUserStaffNumber] = useState(null);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    setInterval(function () {
      setWidth(window.innerWidth);
    }, 1000);
  }, []);
  useEffect(() => {
    if (width < 1180) {
      setDisplay(true);
      setMobile(true);
    } else if (width > 1180) {
      setDisplay(false);
      setMobile(false);
    }
  }, [width]);


 useEffect(() => {
  async function fetchUserDetails() {
   
    try {
      const randomNumber= Math.floor(Math.random() * 90 + 10);
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      if (userDetails){
        setUserStaffNumber(userDetails?.data?.staff_number + randomNumber);
      }
    } catch (error) {
      console.error("Error fetching your user details");
      // enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  fetchUserDetails();
}, [ ]);

  return (
    <Box style={{ fontSize: "14px" }}>
      <Box className='flex text-white'>
        <StaffLeftNavbar mobile={mobile} setMobile={setMobile} display={display}  staffNumber={userStaffNumber} />
        <StaffDashboardRoute
          mobile={mobile}
          setMobile={setMobile}
          display={display}
        />
      </Box>
    </Box>
  );
};

export default StaffDashboard;
