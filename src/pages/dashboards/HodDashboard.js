import { useEffect, useState } from "react";
import "./DashBoard.css";
import HodDashboardRoute from "../../routes/HodDashboardRoute";
import HodLeftNavbar from "../../components/hodleftnavbar/HodLeftNavbar";
import { Box } from "@chakra-ui/react";
import { getUserDetails } from "../../utils/utils";

const HodDashboard = () => {
//   const [users, setUsers] = useState([]);
const [mobile, setMobile] = useState(true);
const [display, setDisplay] = useState(true);
const [width, setWidth] = useState(window.innerWidth);
const [userStaffNumber, setUserStaffNumber] = useState(null);
const [userDetails, setUserDetails] = useState(null);


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
      setUserDetails(userDetails);
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
      <HodLeftNavbar mobile={mobile} setMobile={setMobile} display={display} staffRole={userDetails?.data?.role}  staffNumber={userStaffNumber}/>
        <HodDashboardRoute mobile={mobile} setMobile={setMobile} display={display} />
      </Box>
    </Box>
  );
};

export default HodDashboard;