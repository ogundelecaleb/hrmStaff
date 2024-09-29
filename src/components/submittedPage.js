import { ArrowLeft } from "iconsax-react";
import { useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { Link } from "react-router-dom";

const Submitted = () => {
  // useEffect(() => {
  //   setTimeout(function () {
  //     navigate("/staff/leave");
  //   }, 2000);
  // }, [navigate]);

  return (
    <div
      class="d-flex justify-content-center align-items-center relative"
      style={{ height: "90vh" }}
    >
      <Link to="/leave"  className="absolute top-4 left-4">
        {" "}
        <ArrowLeft
          size="20"
          variant="Linear"
          color="#000"
         
        />
      </Link>

      <div class="d-flex flex-column align-items-center">
        <CiCircleCheck size={130} color={"#5542F6"} />
        <p class="fw-semibold fs-6">Requests Submitted </p>
      </div>
    </div>
  );
};
export default Submitted;
