import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useParams } from "react-router-dom";
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

const BereavementLeave = ({ navigate }) => {
  const location = useLocation();

  const {
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    staffType,
    staffLevel,
    department,
    unit,
    faculty
  } = location.state;

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [resumptionDate, setResumptiondate] = useState(null);
  const [addressLeave, setAddressLeave] = useState("");
  const [leaveNumber, setLeaveumber] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [completedFirstSection, setCompletedFirstSection] = useState(false);
  const [leaveDuration, setLeaveDuration] = useState("");
  const [relationship, setRelationshipType] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const [durationInDays, setDurationInDays] = useState(0);
  const [isStaffModal, setIsStaffModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [staffs, setStaffs] = useState([]);

  const [leaveAmount, setLeaveAmount] = useState(0)
  const [staffRepId, setStaffRepId] = useState("")
  const [staffRep, setStaffrep] = useState("");



  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }
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

  const handleEndDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setEndDate(formattedDate);
    calculateLeaveDuration();

    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedNextDay = nextDay.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setResumptiondate(formattedNextDay);
  };

  useEffect(() => {
    calculateLeaveDuration();
  }, [startDate, endDate]);

  const calculateLeaveDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let durationInDays = 0;

      while (start <= end) {
        if (start.getDay() >= 1 && start.getDay() <= 5) {
          durationInDays++;
        }
        start.setDate(start.getDate() + 1);
      }

      const maxDays = 21;

      if (durationInDays > maxDays) {
        enqueueSnackbar("Leave duration cannot exceed " + maxDays + " days.", {
          variant: "error",
        });
        setEndDate("");
        setResumptiondate("");
      } else {
        setLeaveDuration(`${durationInDays} working day(s)`);
        setDurationInDays(durationInDays);
      }
    } else {
      setLeaveDuration("");
    }
  };

  const onFileChanges = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType === 'application/pdf' || fileType === 'image/jpeg') {
        setUploadedDocuments(selectedFile);
        setIsDocumentUploaded(true);
      } else {
        enqueueSnackbar('Please select a valid PDF or JPEG file.', { variant: 'error' });
      }
    }
  };
  const handleRelationshipChange = (event) => {
    setRelationshipType(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!isDocumentUploaded) {
      enqueueSnackbar('Please upload a document', { variant: 'error' });
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
      
    const formattedEndDate = endDate
      ? new Date(endDate).toISOString().split("T")[0]
      : null;

    const formattedResumptionDate = resumptionDate
      ? new Date(resumptionDate).toISOString().split("T")[0]
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
    formData.append('upload_documents', uploadedDocuments);
    formData.append("full_name", fullName);
    formData.append("marital_status", maritalStatus);
    formData.append("department_id", formattedData);
    formData.append("faculty_id", facultyId);
    formData.append("unit_id", unitId);
    formData.append("leave_type", selectedLeaveType);
    formData.append("date_of_first_appointment", dateOfFirstAppointment);
    formData.append("designation", rankDesignation);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    formData.append("resumption_date", formattedResumptionDate);
    formData.append("deceased_name", leaveNumber);
    formData.append("deceased_relationship", relationship);
    formData.append("leave_duration", leaveAmount);
    formData.append("type", staffType);
    formData.append("level", staffLevel);
    formData.append('replacement_on_duty_id', staffRepId);


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
 

  const handleStartDateChange = (event) => {
    const formattedStartDate = event.target.value;
    const leaveAmountValue = parseInt(leaveAmount, 10) || 0;
    let totalLeave = 21
    if (leaveAmountValue > totalLeave) {
      enqueueSnackbar("Leave amount cannot exceed 21 days", {
        variant: "error",
      });
      setStartDate("");
      setEndDate("");
      setResumptiondate("");
      return;
    }

    let currentDate = new Date(formattedStartDate);
    let addedDays = 0;

    while (addedDays < leaveAmountValue) {
      currentDate.setDate(currentDate.getDate() + 1);

      // Check if the current day is not a Saturday (6) or Sunday (0)
      if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
        addedDays++;
      }
    }

    const formattedEndDate = currentDate.toISOString().split("T")[0];
    const resumptionDate = new Date(currentDate);
    resumptionDate.setDate(resumptionDate.getDate() + 1);
    const formattedResumptionDate = resumptionDate.toISOString().split("T")[0];

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setResumptiondate(formattedResumptionDate);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div class="border-bottom ps-4" id="sec-padding-res">
          <h1 class="fs-3 fw-semibold">Leave</h1>
          <p class="fs-5">Kindly fill in the required information</p>
        </div>
        <div className="col-md-6">
          <form
            class=" ps-4 pt-5 "
            id="sec-padding-res"
            style={{ paddingBottom: "100px" }}
            onSubmit={handleSubmit}
          >
            <div
              class="pb-5"
              style={{ display: !showAdditionalInfo ? "block" : "none" }}
            >

<div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label fs-6 fw-semibold h-10"
                >
                  Specify the number of days you want to apply for
                </label>
                <input
                  type="number"
                  class="form-control rounded-0"
                  required
                  value={leaveAmount}
                  onChange={(e) => setLeaveAmount(e.target.value)}
                />
              </div>
             
              <div class="mb-3 flex flex-col">
                <div>
                  <label class="form-label fs-6 fw-semibold">Start Date</label>
                </div>
                <input
                  className="form-control rounded-0"
                  type="date"
                  id="dateInput"
                  required
                  value={startDate}
                  onChange={handleStartDateChange}
                  min={new Date().toISOString().split("T")[0]} 
                  //max={new Date().toISOString().split("T")[0]} 
                  // Set max attribute to today's date
                />
               
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




              <div className="mb-3">
                <p class="form-label fs-6 fw-semibold">
                  Leave Duration: {leaveAmount} working days
                </p>
              </div>
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label fs-6 fw-semibold h-10"
                >
                  Deaceased Name
                </label>
                <input
                  class="form-control rounded-0"
                  required
                  value={leaveNumber}
                  onChange={(e) => setLeaveumber(e.target.value)}
                />
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
                        placeholder="Search Staffs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                    {staffs &&
                      staffs?.available_users
                        ?.filter((staff) =>
                          staff.first_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((staff) => (
                          <div
                            onClick={() => {
                              setStaffrep(
                                staff.first_name + " " + staff.last_name
                              );
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

                              <p className="text-md md:text-base">
                                {staff?.email}
                              </p>

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


              <button
                type="button"
                onClick={handleProceed}
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

            <div
              class="pb-5"
              style={{ display: showAdditionalInfo ? "block" : "none" }}
            >
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label fs-6 fw-semibold"
                >
                  Deceased Relationship to applicant
                  <sup className="text-danger">*</sup>
                </label>
                <select
                  onChange={handleRelationshipChange}
                  value={relationship}
                  class="form-select rounded-0"
                  aria-label="Default select example"
                >
                  <option selected>Select option</option>
                  <option value="Parent">Parent</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                </select>
              </div>
              <div className="pb-2">
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
              </div>
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
              {/* <div class='pb-2'>
                <div className='mb-3'>
                  <label
                    style={{ marginBottom: '10px' }}
                    className='form-label fs-6 fw-semibold h-10'>
                    Upload your documents<sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type="file"
                    className="form-control rounded-0"
                    id={`upload_documents`}
                    onChange={onFileChanges}
                  />
                  <sup className='text-danger'>Format accepted: Jpeg/Pdf</sup>
                </div>
              </div> */}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BereavementLeave;
