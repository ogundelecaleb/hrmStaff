import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../../asset/logo(small).svg";
import { useLocation } from "react-router-dom";

const LeaveCertificate = () => {
  const location = useLocation();

  const result = location.state;


  console.log("resullllltttt====>>>>", result)

  const contentRef = useRef();
  const generatePdf = () => {
    const input = contentRef.current;
    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });
  };
  const handleDownload = () => {
    const input = document.getElementById("certificate");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // Adjust width according to your requirement
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("leave_certificate.pdf");
    });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
        

        <div className="px-4 md:px-5 lg:px-7 pt-4 md:pt-6 pb-7">
          <p className="text-lg  font-semibold text-center">
            This is to certify that
          </p>
          <h2 className="text-center">{result?.full_name}</h2>
          <p className="text-center">has been granted approval to proceed on leave from</p>
          <p className="text-center text-lg">
            <strong>{formatDate(result?.start_date)}</strong> to{" "}
            <strong>{formatDate(result?.end_date)}</strong>
          </p>
          <p className="text-lg font-semibold mt-6 ">
            Leave Type:{" "}
            <span className="text-base font-medium">{result?.leave_type}</span>
          </p>
          <p className="text-lg font-semibold ">
            Department/Unit: <span className="text-base font-medium">{result?.unit?.name}</span>
          </p>
          <p className="text-lg font-semibold ">
            Resumption Date: <span className="text-base font-medium">{formatDate(result?.resumption_date)}</span>
          </p>
          <p className="text-lg font-semibold ">
            Leave Duration: <span className="text-base font-medium">{formatDate(result?.leave_duration)}</span>
          </p>
          <p className="text-lg font-semibold ">
            Current Designation: <span className="text-base font-medium">{result?.designation}</span>
          </p>
          <p className="text-lg font-semibold ">
            Address While on Leave:{" "}
            <span className="text-base font-medium">{result?.leave_address}</span>
          </p>
          <p className="text-lg font-semibold ">
            Staff to Relieve: <span className="text-base font-medium">{result?.replacement_on_duty}</span>
          </p>
        

          {/* <p>
          Issued on: <strong>{new Date().toLocaleDateString()}</strong>
        </p>
        <p style={{ marginTop: "40px", fontWeight: "bold" }}>
          Authorized Signature
        </p> */}
        </div>
      </div>
      <div className="w-full flex justify-center mt-7">
        {" "}
        <button
          onClick={handleDownload}
          style={{ marginTop: "20px" }}
          className="text-red px-3 py-1 rounded-md border mx-auto hover:bg-gray-300 self-center"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default LeaveCertificate;
