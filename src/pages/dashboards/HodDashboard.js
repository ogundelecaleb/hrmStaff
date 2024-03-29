import { useEffect, useState } from "react";
import "./DashBoard.css";
import HodDashboardRoute from "../../routes/HodDashboardRoute";
import HodLeftNavbar from "../../components/hodleftnavbar/HodLeftNavbar";
import { Box } from "@chakra-ui/react";

const HodDashboard = () => {
  
  const [mobile, setMobile] = useState(true);
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {

    setInterval(function () {
      setWidth(window.innerWidth);
    }, 1000);

  }, []);

  useEffect(() => {
    if (width < 1180) {
      setDisplay(true);
      // setMobile(true);
    } else if (width > 1180) {
      setDisplay(false);
      setMobile(true);
    }
  }, [width]);

  return (
    <Box style={{ fontSize: "14px" }}>
      <Box className='d-flex text-white'>
        <HodLeftNavbar mobile={mobile} setMobile={setMobile} />
        <HodDashboardRoute mobile={mobile} setMobile={setMobile} display={display} />
      </Box>
    </Box>
  );
};

export default HodDashboard;