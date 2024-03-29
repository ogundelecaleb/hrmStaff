import { useEffect, useState } from "react";
import "./DashBoard.css";
import ApplicantLeftNavbar from "../../components/applicantleftnavbar/ApplicantLeftNavbar";
import ApplicantDashboardRoute from "../../routes/ApplicantDashboardRoute";

const ApplicantDashboard = () => {
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
    } else if (width > 1180) {
      setDisplay(false);
      setMobile(true);
    }
  }, [width]);

  return (
    <div style={{ fontSize: "14px" }}>
      <div className='d-flex text-white'>
        <ApplicantLeftNavbar mobile={mobile} setMobile={setMobile} />
        <ApplicantDashboardRoute
          mobile={mobile}
          setMobile={setMobile}
          display={display}
        />
      </div>
    </div>
  );
};

export default ApplicantDashboard;