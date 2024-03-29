import { useEffect, useState } from "react";
import "./DashBoard.css";

import StaffDashboardRoute from "../../../routes/StaffDashboardRoute";
import StaffLeftNavbar from "../../../components/staffleftnavbar/StaffLeftNavbar";

const StaffDashboard = () => {
  //   const [users, setUsers] = useState([]);
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
    <div style={{ fontSize: "14px" }}>
      <div className='d-flex text-white'>
        <StaffLeftNavbar mobile={mobile} setMobile={setMobile} />
        <StaffDashboardRoute
          mobile={mobile}
          setMobile={setMobile}
          display={display}
        />
      </div>
    </div>
  );
};

export default StaffDashboard;
