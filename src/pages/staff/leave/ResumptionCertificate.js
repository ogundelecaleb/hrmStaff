import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../asset/logo(small).svg";
import { useLocation } from "react-router-dom";
import api from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";

const LeaveResumptionCertificate = () => {
  const location = useLocation();

  const result = location.state;

  const contentRef = useRef();

  const handleReactPrint = useReactToPrint({
    // content: contentRef.current,
    contentRef: contentRef,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
    `,
    documentTitle: "Resumption-Certificate",
    onAfterPrint: () => {
      // console.log("Printed successfully");
    },
  });

  const handleDownload = async () => {
    const element = contentRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save('Resumption-Certificate.pdf');
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
    <div className="p-0">
      <div
        // id="certificate"
        ref={contentRef}
       
      >
        <div className="flex items-center py-2 px-2  md:px-[40px] xl:px-[80px] md:py-3 bg-slate-100 border-b border-gray-100">
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
              Leave Resumption Certificate{" "}
            </h2>
          </div>
        </div>
        <div className=" relative w-full h-full overflow-hidden">
          <img
            src={logo}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  h-[250px] inset-0 flex items-center justify-center pointer-events-none select-none`}
            style={{ opacity: 40 / 100 }}
          />

          <div className="px-2 md:px-5 lg:px-7 pt-4 md:pt-6 pb-7">
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
            <p className="text-base font-semibold mt-3 ">
              Full Name:{" "}
              <span className="text-base font-medium uppercase">
                {result?.leave?.full_name}
              </span>
            </p>
            <p className="text-base font-semibold mt-3 ">
              PF Number:{" "}
              <span className="text-base font-medium">
                {result?.leave?.staff_number}
              </span>
            </p>
            <p className="text-base font-semibold mt-3 ">
              Leave Type:{" "}
              <span className="text-base font-medium">
                {leaveTypeMap[result?.leave?.leave_type] || "Leave"}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Department/Unit:{" "}
              <span className="text-base font-medium">
                {result?.leave?.unit?.name}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Current Designation:{" "}
              <span className="text-base font-medium">
                {
                  data?.data?.find(
                    (item) =>
                      item?.name.toLowerCase() ===
                      result?.leave?.designation.toLowerCase()
                  )?.description
                }
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Current Level:{" "}
              <span className="text-base font-medium">
                {result?.leave?.level}
              </span>
            </p>

            <p className="text-lg font-semibold ">
              Start Date:{" "}
              <span className="text-base font-medium">
                {formatDate(result?.leave?.start_date)}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              End Date:{" "}
              <span className="text-base font-medium">
                {formatDate(result?.leave?.end_date)}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Resumption Date:{" "}
              <span className="text-base font-medium">
                {formatDate(result?.leave?.resumption_date)}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Leave Duration:{" "}
              <span className="text-base font-medium">
                {result?.leave?.leave_duration} Day(s)
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Total Leave Balance:{" "}
              <span className="text-base font-medium">
                {result?.leave?.total_leave_due} Day(s)
              </span>
            </p>

            <p className="text-lg font-semibold ">
              Address While on Leave:{" "}
              <span className="text-base font-medium">
                {result?.leave?.leave_address}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Staff to Relieve:{" "}
              <span className="text-base font-medium">
                {result?.leave?.replacement_on_duty}
              </span>
            </p>
            <p className="text-lg font-semibold ">
              Approval Bodies:{" "}
              <span className="text-base font-medium">
                {result?.approvals?.map((item) => (
                  <>
                    {item?.email} date: {formatDate(item?.date)} ||{" "}
                  </>
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
      <div className="w-full flex justify-center my-7 gap-4">
        <button
          onClick={handleReactPrint}
          style={{ marginTop: "20px" }}
          className="bg-purple-500 px-3 py-1 text-white rounded-md border mx-auto hover:bg-gray-300 self-center"
        >
          Print
        </button>
        <button
          onClick={handleDownload}
          style={{ marginTop: "20px" }}
          className="bg-blue-500 px-3 py-1 text-white rounded-md border mx-auto hover:bg-blue-600 self-center"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default LeaveResumptionCertificate;
