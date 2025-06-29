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
import Oops from "../../../components/Opps";
import { FiSearch } from "react-icons/fi";
import { ArrowLeft } from "iconsax-react";

const CasualLeave = ({ navigate }) => {
  const location = useLocation();

  const {
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    staffType,
    department,
    staffLevel,
    totalLeave,
    unit,
    faculty,
    supervisorRole,
    supervisor_id
  } = location.state;

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [resumptionDate, setResumptionDate] = useState(null);
  const [addressLeave, setAddressLeave] = useState("");
  const [leaveNumber, setLeaveumber] = useState("");
  const [leaveAmount, setLeaveAmount] = useState("");
  const [staffRep, setStaffrep] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [completedFirstSection, setCompletedFirstSection] = useState(false);
  const [leaveDuration, setLeaveDuration] = useState("");
  const [isStaffModal, setIsStaffModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [staffRepId, setStaffRepId] = useState("")
  const [page, setPage] = useState("1");

  async function fetchStaffs() {
    try {
      const staffs = await api.fetchStaffs();
      setStaffs(staffs);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStaffs();
  }, []);

  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  // Helper function to check if a date is a weekend
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    
    // Handle both Date objects and date strings
    let dateObj;
    if (date instanceof Date) {
      dateObj = date;
    } else if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      return '';
    }
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) return '';
    
    // Format to YYYY-MM-DD
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  // Calculate end date and resumption date based on start date and leave amount
  const calculateDates = (selectedStartDate, days) => {
    if (!selectedStartDate || !(selectedStartDate instanceof Date) || isNaN(selectedStartDate)) {
      setEndDate(null);
      setResumptionDate(null);
      return;
    }

    const leaveDays = parseInt(days, 10);
    if (!leaveDays || leaveDays <= 0) {
      setEndDate(null);
      setResumptionDate(null);
      return;
    }

    // Start from the selected start date
    let currentDate = new Date(selectedStartDate);

    // If start date is a weekend, move to next Monday
    while (isWeekend(currentDate)) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update start date if it was moved due to weekend
    const adjustedStartDate = new Date(currentDate);
    setStartDate(adjustedStartDate);

    // For calculating end date, we need to add (leaveDays - 1) working days
    // because the start date itself counts as day 1
    let workingDaysToAdd = leaveDays - 1;
    let endDateCalculation = new Date(adjustedStartDate);
    
    // Add the required working days
    while (workingDaysToAdd > 0) {
      endDateCalculation.setDate(endDateCalculation.getDate() + 1);
      
      // Only count non-weekend days
      if (!isWeekend(endDateCalculation)) {
        workingDaysToAdd--;
      }
    }

    const calculatedEndDate = new Date(endDateCalculation);
    
    // Calculate resumption date (next working day after end date)
    const resumptionDate = new Date(calculatedEndDate);
    resumptionDate.setDate(resumptionDate.getDate() + 1);
    
    // If resumption date falls on weekend, move to next Monday
    while (isWeekend(resumptionDate)) {
      resumptionDate.setDate(resumptionDate.getDate() + 1);
    }

    setEndDate(calculatedEndDate);
    setResumptionDate(resumptionDate);
  };

  // Effect to recalculate dates when leave amount changes
  useEffect(() => {
    if (startDate && leaveAmount) {
      calculateDates(startDate, leaveAmount);
    }
  }, [leaveAmount]);

  // Handle start date change
  const handleStartDateChange = (date) => {
    if (date && leaveAmount) {
      calculateDates(date, leaveAmount);
    } else {
      setStartDate(date);
      setEndDate(null);
      setResumptionDate(null);
    }
  };

  // Handle leave amount change
  const handleLeaveAmountChange = (e) => {
    const value = e.target.value;
    setLeaveAmount(value);
    
    // Clear dates if no value
    if (!value) {
      setEndDate(null);
      setResumptionDate(null);
    }
  };

  console.log(
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    startDate,
    endDate,
    addressLeave,
    resumptionDate
  );

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

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (leaveAmount > parseInt(totalLeave, 10)) {
      enqueueSnackbar(
        `You have ${totalLeave} days of annual leave remaining, leave duration cannot exceed remaining annual Leave`,
        { variant: "error" }
      );
      setIsLoading(false);
      return;
    }

    if (!staffRepId) {
      enqueueSnackbar('Please choose a staff to releive you', { variant: 'error' });
      setIsLoading(false);
      return;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const formattedResumptionDate = formatDate(resumptionDate);

    let formattedData = department !== undefined ? department : "";
    let facultyId = faculty !== undefined ? faculty : "";
    let unitId = unit !== undefined ? unit : "";
    const formData = new FormData();
    
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
    formData.append("leave_address", addressLeave);
    formData.append("leave_phone", leaveNumber);
    formData.append("replacement_on_duty", staffRep);
    formData.append("resumption_date", formattedResumptionDate);
    formData.append("leave_duration", leaveAmount);
    formData.append("type", staffType);
    formData.append("level", staffLevel);
    formData.append('replacement_on_duty_id', staffRepId);
    formData.append('supervisor_id', supervisor_id);
    formData.append('user_supervision_role', supervisorRole !== undefined ? supervisorRole : "");

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

  if (totalLeave == 0) {
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
            You have exhausted your annual leave
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
              <div class="pb-5">
                <div class="pb-2 pt-2">
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
                      min="1"
                      value={leaveAmount}
                      onChange={handleLeaveAmountChange}
                    />
                  </div>
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
                      selected={startDate}
                      onChange={handleStartDateChange}
                      dateFormat="yyyy-MM-dd"
                      className="form-control rounded-0 "
                      id="exampleFormControlInput1"
                      placeholder="Select start date"
                      // minDate={new Date()} // Prevent selecting past dates
                    />
                    
                  </div>
                </div>
                <div class="mb-3 flex flex-col">
                  <div>
                    <label class="form-label fs-6 fw-semibold">
                      End Date: {endDate ? formatDate(endDate) : 'Please select start date and number of days'}
                    </label>
                  </div>
                </div>
                <div class="mb-3 flex flex-col">
                  <div>
                    <label class="form-label fs-6 fw-semibold">
                      Resumption Date: {resumptionDate ? formatDate(resumptionDate) : 'Please select start date and number of days'}
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
                            `${staff.first_name} ${staff.last_name}`
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          ?.map((staff) => (
                            <div
                              key={staff.id}
                              onClick={() => {
                                setStaffrep(
                                  staff.first_name + " " + staff.last_name
                                );
                                setStaffRepId(staff?.id);
                                setIsStaffModal(false);
                              }}
                              className="w-full cursor-pointer"
                            >
                              <div className="px-2 py-2 border rounded-2 mb-2 flex justify-between hover:bg-gray-50">
                                <p className="text-md md:text-base">
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
                  onClick={() => setPage("2")}
                  disabled={!startDate || !endDate || !leaveAmount || !staffRepId}
                  style={{
                    backgroundColor: (!startDate || !endDate || !leaveAmount || !staffRepId) ? "#ccc" : "#984779",
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
              <div class="pb-5">
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
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CasualLeave;