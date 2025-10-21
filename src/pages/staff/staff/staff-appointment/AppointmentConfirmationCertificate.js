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
import logo from "../../../../asset/logo(large).png";

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

const AppointmentConfirmationCertificate = () => {
  const location = useLocation();
  const result = location.state?.item;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // PDF Document Component
  const AppointmentCertificateDocument = () => (
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
              Appointment Confirmation Certificate
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
              {result?.full_name || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>PF/CM Number:</Text>
            <Text style={styles.fieldValue}>
              {result?.pf_no || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Staff Type:</Text>
            <Text style={styles.fieldValue}>
              {result?.staff_type || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Current Level:</Text>
            <Text style={styles.fieldValue}>
              {result?.level || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Department/Unit/Faculty:</Text>
            <Text style={styles.fieldValue}>
              {result?.department?.name || result?.unit?.name || result?.faculty?.name || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Date of First Appointment:</Text>
            <Text style={styles.fieldValue}>
              {result?.date_of_first_appointment ? formatDate(result.date_of_first_appointment) : "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Date of Present Appointment:</Text>
            <Text style={styles.fieldValue}>
              {result?.date_of_present_appointment ? formatDate(result.date_of_present_appointment) : "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Grade of First Appointment:</Text>
            <Text style={styles.fieldValue}>
              {result?.grade_of_first_appointment || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Grade of Present Appointment:</Text>
            <Text style={styles.fieldValue}>
              {result?.grade_of_present_appointment || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Application Date:</Text>
            <Text style={styles.fieldValue}>
              {result?.date ? formatDate(result.date) : "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Status:</Text>
            <Text style={styles.fieldValue}>
              {result?.status || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Work Details:</Text>
            <Text style={styles.fieldValue}>
              {result?.details_of_work_done_since_appointment || "N/A"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Approval Bodies:</Text>
            <Text style={styles.approvalsList}>
              {result?.approvals?.map((item, index) => (
                `${item?.email || "N/A"} (${item?.role || "N/A"}) - ${item?.date ? formatDate(item.date) : "N/A"}${index < result.approvals.length - 1 ? " || " : ""}`
              )).join("") || "N/A"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const handleDownload = async () => {
    try {
      const blob = await pdf(<AppointmentCertificateDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `appointment_confirmation_certificate_${
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
                Appointment Confirmation Certificate Preview
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
                  <span className="font-semibold text-gray-800">Full Name: </span>
                  <span className="text-gray-600 uppercase">
                    {result?.full_name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">PF/CM Number: </span>
                  <span className="text-gray-600">
                    {result?.pf_no || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Staff Type: </span>
                  <span className="text-gray-600">
                    {result?.staff_type || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Current Level: </span>
                  <span className="text-gray-600">
                    {result?.level || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Department/Unit/Faculty: </span>
                  <span className="text-gray-600">
                    {result?.department?.name || result?.unit?.name || result?.faculty?.name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Date of First Appointment: </span>
                  <span className="text-gray-600">
                    {result?.date_of_first_appointment ? formatDate(result.date_of_first_appointment) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Date of Present Appointment: </span>
                  <span className="text-gray-600">
                    {result?.date_of_present_appointment ? formatDate(result.date_of_present_appointment) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Grade of First Appointment: </span>
                  <span className="text-gray-600">
                    {result?.grade_of_first_appointment || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Grade of Present Appointment: </span>
                  <span className="text-gray-600">
                    {result?.grade_of_present_appointment || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Application Date: </span>
                  <span className="text-gray-600">
                    {result?.date ? formatDate(result.date) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Status: </span>
                  <span className="text-gray-600 capitalize">
                    {result?.status || "N/A"}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-gray-800">Work Details: </span>
                  <span className="text-gray-600">
                    {result?.details_of_work_done_since_appointment || "N/A"}
                  </span>
                </div>
                <div className="md:col-span-2">
                  <span className="font-semibold text-gray-800">Approval Bodies: </span>
                  <span className="text-gray-600">
                    {result?.approvals?.map((item, index) => (
                      <span key={index}>
                        {item?.email || "N/A"} ({item?.role || "N/A"}) - {item?.date ? formatDate(item.date) : "N/A"}
                        {index < result.approvals.length - 1 ? " || " : ""}
                      </span>
                    )) || "N/A"}
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

export default AppointmentConfirmationCertificate;