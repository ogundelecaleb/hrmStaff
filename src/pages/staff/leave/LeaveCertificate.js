import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../asset/logo(small).svg";
import { useLocation } from "react-router-dom";
import api from "../../../api";
import { useQuery } from "@tanstack/react-query";

const LeaveCertificate = () => {
  const location = useLocation();

  const result = location.state;
  console.log("result", result);

  const contentRef = useRef();

  const handleDownload = () => {
    const input = document.getElementById("certificate");

    // Optimization options
    const options = {
      scale: 2, // Lower than default (devicePixelRatio)
      quality: 0.8, // Reduce quality slightly
      logging: false,
      useCORS: true,
      allowTaint: true,
    };

    html2canvas(input, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG with quality setting
      const pdf = new jsPDF("p", "mm", "a4"); // Specify A4 size

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Check if content fits on one page
      if (imgHeight < 297) {
        // A4 height in mm
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      } else {
        // Handle multi-page only if necessary
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
          heightLeft -= 297;
        }
      }

      pdf.save("leave_certificate.pdf");
    });
  };

  const leaveTypeMap = {
    "annual-leave": "Annual Leave",
    "casual-leave": "Casual Leave",
    "examination-leave": "Examination Leave",
    "conference-leave": "Conference/Seminar/Workshop Leave",
    "sporting-leave": "Leave for Approved Sporting Events",
    "compassionate-leave": "Compassionate Leave",
    "adoption-leave": "Adoption Leave",
    "sick-leave": "Sick Leave",
    "leave-for-trade": "Leave for Trade Union Conference And Business",
    "maternity-leave": "Maternity Leave",
    "paternity-leave": "Paternity Leave",
    "research-leave": "Research Leave",
    "sabbatical-leave": "Sabbatical Leave",
    "study-leave-with-pay": "Study Leave With Pay",
    "short-term-study-leave-with-pay": "Short Term Study Leave With Pay",
    "study-leave-without-pay": "Study Leave Without Pay",
    "training-leave": "Training Leave",
    "leave-of-absence": "Leave of Absence",
    "bereavement-leave": "Bereavement Leave",
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function getRoless() {
    const response = await api.getRoless({ params: {} });
    return response;
  }

  const { isLoading, isError, data, error, isPreviousData, refetch } = useQuery(
    ["getRoless"],
    () => getRoless(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  return (
    <div>
      <div
        id="certificate"
        ref={contentRef}
        style={
          {
            // textAlign: "center",
            // position: "relative",
            // backgroundColor: "#f9f9f9",
          }
        }
      >
        <div className="flex items-center py-2 px-4 md:px-[40px] xl:px-[80px] md:py-3 bg-slate-100 border-b border-gray-100">
          <img
            className="h-[34px] w-[34px] md:h-[60px] md:w-[60px]"
            src={logo}
            alt="logo"
          />
          <div className="flex-1">
            {" "}
            <h2 className="text-[18px] md:text-[24px] xl:text-[28px] text-center font-bold leading-[35px] text-[#17082D] ">
              Lagos State University College of Medicine
            </h2>
            <h2 className="text-[16px] md:text-[20px]  text-center font-semibold  text-[#984779] ">
              Leave Certificate{" "}
            </h2>
          </div>
        </div>
        <div className=" relative w-full h-full overflow-hidden">
          <img
            src={logo}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-[250px] inset-0 flex items-center justify-center pointer-events-none select-none`}
            style={{ opacity: 40 / 100 }}
          />

          <div className="px-4 md:px-5 lg:px-7 pt-4 md:pt-6 pb-7">
            {/* <p className="text-lg  font-semibold text-center">
            This is to certify that
          </p>
          <h2 className="text-center">{result?.full_name}</h2>
          <p className="text-center">
            has been granted approval to proceed on leave from
          </p>
          <p className="text-center text-lg">
            <strong>{formatDate(result?.start_date)}</strong> to{" "}
            <strong>{formatDate(result?.end_date)}</strong>
          </p> */}
            <p className="text-lg font-semibold mt-6 ">
              Full Name:{" "}
              <span className="text-base font-medium uppercase">
                {result?.full_name}
              </span>
            </p>
            <p className="text-lg font-semibold mt-6 ">
              PF Number:{" "}
              <span className="text-base font-medium">
                {result?.staff_number}
              </span>
            </p>
            <p className="text-lg font-semibold mt-6 ">
              Leave Type:{" "}
              <span className="text-base font-medium">
                {leaveTypeMap[result?.leave_type] || "Leave"}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Department/Unit:{" "}
              <span className="text-base font-medium">
                {result?.unit?.name}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Current Designation:{" "}
              <span className="text-base font-medium">
                {
                  data?.data?.find(
                    (item) =>
                      item?.name.toLowerCase() ===
                      result?.designation.toLowerCase()
                  )?.description
                }
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Current Level:{" "}
              <span className="text-base font-medium">{result?.level}</span>
            </p>

            <p className="text-lg font-semibold ">
              Start Date:{" "}
              <span className="text-base font-medium">
                {formatDate(result?.start_date)}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Resumption Date:{" "}
              <span className="text-base font-medium">
                {formatDate(result?.resumption_date)}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Leave Duration:{" "}
              <span className="text-base font-medium">
                {result?.leave_duration} Day(s)
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Total Leave Balance:{" "}
              <span className="text-base font-medium">
                {result?.total_leave_due} Day(s)
              </span>
            </p>

            <p className="text-lg font-semibold ">
              Address While on Leave:{" "}
              <span className="text-base font-medium">
                {result?.leave_address}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Staff to Relieve:{" "}
              <span className="text-base font-medium">
                {result?.replacement_on_duty}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Approval Bodies:{" "}
              <span className="text-base font-medium">
                {result?.approvals?.map((item) => (
                  <>{item?.email} || </>
                ))}
              </span>
            </p>

            {/* <p>
          Issued on: <strong>{new Date().toLocaleDateString()}</strong>
        </p>
        <p style={{ marginTop: "40px", fontWeight: "bold" }}>
          Authorized Signature
        </p> */}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-7">
        {" "}
        <button
          onClick={handleDownload}
          style={{ marginTop: "20px" }}
          className="text-red px-3 py-1 text-red-400 rounded-md border mx-auto hover:bg-gray-300 self-center"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default LeaveCertificate;
