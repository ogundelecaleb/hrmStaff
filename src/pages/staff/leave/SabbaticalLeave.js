import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import "intl";
import "intl/locale-data/jsonp/en";
import { getYear, getMonth } from "date-fns";
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Button,
  Center,
  Divider,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import Oops from "../../../components/Opps";
import { ArrowLeft } from "iconsax-react";

const SabbaticalLeave = ({ navigate }) => {
  const location = useLocation();

  const {
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    staffType,
    level,
    unit,
    department,
    faculty,
    supervisorRole,
    supervisor_id,
   
  } = location.state;

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [addressLeave, setAddressLeave] = useState("");
  const [leaveNumber, setLeaveumber] = useState("");
  const [staffRep, setStaffrep] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [completedFirstSection, setCompletedFirstSection] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [resumptionDate, setResumptionDate] = useState(null);
  const [leaveDuration, setLeaveDuration] = useState("");
  const [isStaffModal, setIsStaffModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [staffRepId, setStaffRepId] = useState("")
  const [page, setPage] = useState("1");



  async function fetchStaffs() {
    try {
      const staffs = await api.fetchStaffs();
      console.log("Staff Details:", staffs);
      setStaffs(staffs);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  console.log(
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    addressLeave
  );

  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleProceed = () => {
    if (completedFirstSection) {
      setShowAdditionalInfo(true);
    } else {
      setCompletedFirstSection(true);
    }
  };

  const calculateDates = (selectedStartDate) => {
    if (selectedStartDate instanceof Date && !isNaN(selectedStartDate)) {
      const calculatedEndDate = new Date(selectedStartDate);
      calculatedEndDate.setDate(selectedStartDate.getDate() + 365);

      const calculatedResumptionDate = new Date(calculatedEndDate);
      calculatedResumptionDate.setDate(calculatedEndDate.getDate() + 1);

      setEndDate(calculatedEndDate.toISOString().split("T")[0]);
      setResumptionDate(calculatedResumptionDate.toISOString().split("T")[0]);
      setLeaveDuration(365);
    }
  };

  const onFileChanges = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType === "application/pdf" || fileType === "image/jpeg") {
        setUploadedDocuments(selectedFile);
        setIsDocumentUploaded(true);
      } else {
        enqueueSnackbar("Please select a valid PDF or JPEG file.", {
          variant: "error",
        });
      }
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!isDocumentUploaded) {
      enqueueSnackbar("Please upload a document", { variant: "error" });
      setIsLoading(false);
      return;
    }
    if (!staffRepId) {
      enqueueSnackbar('Please choose a staff to releive you', { variant: 'error' });
      setIsLoading(false);
      return;
    }
    const formattedStartDate = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;

    // let departmentId = "";
    // let facultyId = "";
    // let unitId = "";

    // if (rankDesignation === "HOD" || rankDesignation === "RSWEP") {
    //   departmentId = departmentOrUnitOrFacultyID;
    // } else if (rankDesignation === "DEAN") {
    //   facultyId = departmentOrUnitOrFacultyID;
    // } else if (rankDesignation === "HOU" || rankDesignation === "NTSWEP") {
    //   unitId = departmentOrUnitOrFacultyID;
    // }

    let formattedData = department !== undefined ? department : "";

    let facultyId = faculty !== undefined ? faculty : "";
    let unitId = unit !== undefined ? unit : "";


    const formData = new FormData();
    formData.append("upload_documents", uploadedDocuments);
    formData.append("full_name", fullName);
    formData.append("marital_status", maritalStatus);
    formData.append("department_id", formattedData);
    formData.append("faculty_id", facultyId);
    formData.append("unit_id", unitId);
    formData.append("leave_type", selectedLeaveType);
    formData.append("date_of_first_appointment", dateOfFirstAppointment);
    formData.append("designation", rankDesignation);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", endDate);
    formData.append("leave_address", addressLeave);
    formData.append("leave_phone", leaveNumber);
    formData.append("replacement_on_duty", staffRep);
    formData.append("resumption_date", resumptionDate);
    formData.append("leave_duration", leaveDuration);
    formData.append("type", staffType);
    formData.append("level", level);
    formData.append('replacement_on_duty_id', staffRepId);
    formData.append('supervisor_id', supervisor_id);

    formData.append('user_supervision_role', supervisorRole  !== undefined ? supervisorRole : "");


    try {
      const response = await api.requestLeave(formData);
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Leave Application successfull", { variant: "success" });
      setIsLoading(false);
      navigate("submited");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  if (
    // staffType === "NASE" &&
    [
      "Level 1",
      "Level 2",
      "Level 3",
      "Level 4",
      "Level 5",
      "Level 6",
      "Level 7",
      "Level 8",
      "Level 9",
      "Level 10",
      // "Level 11",
    ].includes(level)
  ) {
    return (
      <Box
        w={"80vw"}
        display="flex"
        flexDirection="column"
        h={"20vh"}
        alignItems="center"
        justifyContent="center"
      >
        <div className="row mt-5 " style={{ height: "10px", width: "80%" }}>
          <Oops />
          <h2 style={{ textAlign: "center", marginTop: 50 }}>
            You are not Eligible for this Type of Leave.
          </h2>
          <p
            class=" fs-5 fw-semibold"
            style={{ textAlign: "center", marginTop: 20 }}
          >
            {/* Sabbatical Leave is only entitled to ASE Staff and level 11 above */}
            Sabbatical Leave is only entitled to level 11 above
          </p>
        </div>
      </Box>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
      <div class="border-bottom py-2" id="sec-padding-res">
          <h1 class="text-[18px] font-medium">Leave</h1>
          <p class="text-gray-500 mb-0">Kindly fill in the required information</p>
        </div>

        <div className="col-md-6">
          <form
            class=" ps-4 pt-3 "
            id="sec-padding-res"
            style={{ paddingBottom: "100px" }}
            onSubmit={handleSubmit}
          >
            {/* Annual Leave form  start */}
            {page === "1" && (
              <div
                class="pb-5"
                // style={{ display: !showAdditionalInfo ? "block" : "none" }}
              >
              <div class="pb-2 pt-2">
                <div class="mb-3 flex flex-col">
                  <div>
                    <label class="form-label fs-6 fw-semibold">
                      Start Date<sup className="text-danger">*</sup>
                    </label>
                  </div>
                  <DatePicker
                    shouldCloseOnSelect={true}
                    autoComplete="off"
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={startDate ? new Date(startDate) : null}
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        });
                        setStartDate(formattedDate);
                        calculateDates(date);
                      } else {
                        setStartDate("");
                        setEndDate(null);
                        setResumptionDate(null);
                      }
                    }}
                    dateFormat="yyyy-MM-dd"
                    className="form-control rounded-0 "
                    id="exampleFormControlInput1"
                  />
                </div>
              </div>
              <div class="mb-3 flex flex-col">
                <div>
                  <label class="form-label fs-6 fw-semibold">
                    End Date: {endDate}
                  </label>
                </div>
              </div>
              <div class="mb-3 flex flex-col">
                <div>
                  <label class="form-label fs-6 fw-semibold">
                    Resumption Date: {resumptionDate}
                  </label>
                </div>
              </div>
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label fs-6 fw-semibold h-10"
                >
                  Phone Number while on Leave
                </label>
                <input
                  class="form-control rounded-0"
                  value={leaveNumber}
                  onChange={(e) => setLeaveumber(e.target.value)}
                />
              </div>

              <button
                  type="button"
                  onClick={() => setPage("2")}
                  style={{
                    backgroundColor: " #984779",
                    borderColor: "white",
                    right: 50,
                    position: "absolute",
                  }}
                  class="my-10 p-2 text-md-start text-white fs-6 fw-semibold"
                >
                  Proceed to Next
                </button>
              </div>
            )}

            {/* Annual Leave form  end */}

            {/* Additional info start*/}
            {page === "2" && (
              <div
                class="pb-5"
                // style={{ display: showAdditionalInfo ? "block" : "none" }}
              >
                <button onClick={() => setPage("1")} className="mb-2">
                  <ArrowLeft size="20" variant="Linear" color="#000" />
                </button>
              <div class="mb-3">
                <label for="address" class="form-label fs-6 fw-semibold">
                  Address while on Leave
                </label>
                <textarea
                  class="form-control"
                  aria-label="With textarea"
                  value={addressLeave}
                  onChange={(e) => setAddressLeave(e.target.value)}
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label fs-6 fw-semibold">
                  To be relived by (Name of Staff)
                </label>
                <div
                  onClick={() => setIsStaffModal(true)}
                  className="border px-3 py-2 rounded-0"
                >
                  {staffRep ? (
                    <p className="mb-0  fs-6">{staffRep}</p>
                  ) : (
                    <p className="mb-0">Select a staff</p>
                  )}
                </div>
                {/* <input
                  required
                  class="form-control rounded-0"
                  value={staffRep}
                  onChange={(e) => setStaffrep(e.target.value)}
                /> */}
              </div>
              <Modal
          isCentered
          isOpen={isStaffModal}
          onClose={() => setIsStaffModal(false)}
          size="2xl"
          className="max-h-[80vh]"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={"sm"} py="3" color="#002240">
              Select Staff
            </ModalHeader>
            <ModalCloseButton size={"sm"} />
            <Divider />
            <ModalBody py="2">
              <InputGroup mb="6">
                <InputLeftElement>
                  <FiSearch color="#1A202C" />
                </InputLeftElement>
                <Input
                  borderRadius={"6px"}
                  w="60"
                  fontSize={"sm"}
                  placeholder="Search Staff.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              {staffs &&
                staffs?.available_users
                  ?.filter((staff) =>
                    (staff.first_name  + staff.last_name)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((staff) => (
                    <div
                      onClick={() => {
                        setStaffrep(staff.first_name + " " + staff.last_name);
                        setStaffRepId(staff?.id)

                        setIsStaffModal(false);
                      }}
                      className="w-full "
                    >
                      {" "}
                      <div className="px-2 py-2 border rounded-2 mb-2  flex justify-between">
                        <p className="text-md md:text-base">
                          {" "}
                          {staff.first_name + " " + staff.last_name}
                        </p>

                        <p className="text-md md:text-base">{staff?.email}</p>

                        {staffRep ===
                        staff.first_name + " " + staff.last_name ? (
                          <div className="bg-[#32D583] h-4 w-4 rounded-full"></div>
                        ) : (
                          <div className="border-[#5F5F60] border-[1.5px] h-4 w-4 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
            </ModalBody>
            <Divider />
           
          </ModalContent>
        </Modal>
              <div className="mb-3">
                <label
                  style={{ marginBottom: "10px" }}
                  className="form-label fs-6 fw-semibold h-10"
                >
                  Upload your documents<sup className="text-danger">*</sup>
                </label>
                <input
                  type="file"
                  className="form-control rounded-0"
                  id={`upload_documents`}
                  onChange={onFileChanges}
                />
                <sup className="text-danger">Format accepted: Jpeg/Pdf</sup>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                style={{
                  backgroundColor: " #984779",
                  borderColor: "white",
                  right: 50,
                  position: "absolute",
                }}
                className="my-10 p-2 text-md-start text-white fs-6 fw-semibold"
              >
                {isLoading ? (
                  <MoonLoader color={"white"} size={20} />
                ) : (
                  <>Submit</>
                )}
              </button>
            </div>)}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SabbaticalLeave;
