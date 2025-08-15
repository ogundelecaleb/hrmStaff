import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import api from "../../../api";
import { useQuery } from "@tanstack/react-query";
import logo from "../../../asset/logo(large).png";

// Create styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 0,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 20,
    borderBottom: "1px solid #e2e8f0",
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  universityName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#17082D",
    textAlign: "center",
    marginBottom: 5,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#984779",
    textAlign: "center",
  },
  content: {
    position: "relative",
    flex: 1,
    padding: 30,
  },
  watermarkContainer: {
    position: "absolute",
    top: "20%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    zIndex: -1,
  },
  watermark: {
    width: 200,
    height: 200,
    opacity: 0.1,
  },
  fieldRow: {
    marginBottom: 12,
    flexDirection: "row",
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "semibold",
    color: "#1f2937",
    width: 140,
  },
  fieldValue: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
    textTransform: "capitalize",
  },
  fieldValueUppercase: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
    textTransform: "uppercase",
  },
  approvalsList: {
    fontSize: 12,
    color: "#374151",
    flex: 1,
  },
});

const LeaveResumptionCertificate = () => {
  const location = useLocation();
  const result = location.state;

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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function getRoless() {
    const response = await api.getRoless({ params: {} });
    return response;
  }

  const { isLoading, isError, data, error } = useQuery(
    ["getRoless"],
    () => getRoless(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: "always",
    }
  );

  // PDF Document Component
  const LeaveCertificateDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.universityName}>
              Lagos State University College of Medicine
            </Text>
            <Text style={styles.certificateTitle}>
              Leave Resumption Certificate
            </Text>
          </View>
        </View>

        {/* Content with Watermark */}
        <View style={styles.content}>
          {/* Watermark */}
          <View style={styles.watermarkContainer}>
            <Image style={styles.watermark} src={logo} />
          </View>

          {/* Certificate Details */}
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Full Name:</Text>
            <Text style={styles.fieldValueUppercase}>
              {result?.leave?.full_name || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>PF Number:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.staff_number || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Leave Type:</Text>
            <Text style={styles.fieldValue}>
              {leaveTypeMap[result?.leave?.leave_type] || "Leave"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Department/Unit:</Text>
            <Text style={styles.fieldValue}>{result?.leave?.unit?.name || "N/A"}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Current Designation:</Text>
            <Text style={styles.fieldValue}>
              {data?.data?.find(
                (item) =>
                  item?.name.toLowerCase() ===
                  result?.leave?.designation?.toLowerCase()
              )?.description ||
                result?.leave?.designation ||
                "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Current Level:</Text>
            <Text style={styles.fieldValue}>{result?.leave?.level || "N/A"}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Start Date:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.start_date ? formatDate(result?.leave?.start_date) : "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>End Date:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.end_date ? formatDate(result?.leave?.end_date) : "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Resumption Date:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.resumption_date
                ? formatDate(result?.leave?.resumption_date)
                : "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Leave Duration:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.leave_duration || "0"} Day(s)
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Total Leave Balance:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.total_leave_due || "0"} Day(s)
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Address While on Leave:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.leave_address || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Staff to Relieve:</Text>
            <Text style={styles.fieldValue}>
              {result?.leave?.replacement_on_duty || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Approval Bodies:</Text>
            <Text style={styles.approvalsList}>
             
              {result?.approvals?.map((item) => (
                <>
                  {item?.email} date: {formatDate(item?.date)} ||{" "}
                </>
              ))}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const handleDownload = async () => {
    try {
      const blob = await pdf(<LeaveCertificateDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `leave_resume_certificate_${
        result?.full_name?.replace(/\s+/g, "_") || "certificate"
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading certificate data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">
          Error loading data: {error?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8 md:py-8">
      <div className="max-w-4xl mx-auto md:px-4">
        {/* Preview Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="flex items-center py-4 px-6 bg-slate-100 border-b border-gray-200">
            <img className="h-8 w-8 md:h-16 md:w-16" src={logo} alt="logo" />
            <div className="flex-1 ml-4">
              <h2 className="text-xl md:text-2xl xl:text-3xl text-center font-bold text-[#17082D]">
                Lagos State University College of Medicine
              </h2>
              <h2 className="text-lg md:text-xl text-center font-semibold text-[#984779]">
                Leave Certificate Preview
              </h2>
            </div>
          </div>

          {/* Certificate Preview Content */}
          <div className="p-8 relative">
            <img
              src={logo}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-64 opacity-10 pointer-events-none select-none"
              alt="watermark"
            />

            <div className="relative z-10 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-800">
                    Full Name:{" "}
                  </span>
                  <span className="text-gray-600 uppercase">
                    {result?.leave?.full_name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    PF Number:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.leave?.staff_number || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Leave Type:{" "}
                  </span>
                  <span className="text-gray-600">
                    {leaveTypeMap[result?.leave?.leave_type] || "Leave"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Department:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.leave?.unit?.name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Current Designation:{" "}
                  </span>
                  <span className="text-gray-600">
                    {data?.data?.find(
                      (item) =>
                        item?.name.toLowerCase() ===
                        result?.leave?.designation?.toLowerCase()
                    )?.description ||
                      result?.leave?.designation ||
                      "N/A"}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-800">
                    Current Level:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.leave?.level || "N/A"}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-800">
                    Start Date:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.leave?.start_date ? formatDate(result?.leave?.start_date) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    End Date:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.end_date ? formatDate(result?.leave?.end_date) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Resumption Date:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.leave?.resumption_date
                      ? formatDate(result?.leave?.resumption_date)
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Duration:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.leave?.leave_duration || "0"} Day(s)
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Balance: </span>
                  <span className="text-gray-600">
                    {result?.leave?.total_leave_due || "0"} Day(s)
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Address: </span>
                  <span className="text-gray-600">
                    {result?.leave?.leave_address || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Reliever:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.leave?.replacement_on_duty || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">
                    Approval Bodies:{" "}
                  </span>
                  <span className="text-gray-600">
                    {result?.approvals?.map((item) => (
                      <>
                        {item?.email} date: {formatDate(item?.date)} ||{" "}
                      </>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="text-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
            disabled={isLoading}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveResumptionCertificate;
