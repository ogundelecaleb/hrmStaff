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
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";

const AnnualLeave = ({ navigate }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("")

  const {
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    totalLeave,
    staffType,
    staffLevel,
  } = location.state;

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [dateResumed, setDateresumed] = useState("");
  const [startDate, setStartDate] = useState("");
  const [addressLeave, setAddressLeave] = useState("");
  const [leaveNumber, setLeaveumber] = useState("");
  const [leaveAmount, setLeaveAmount] = useState("");
  const [staffRep, setStaffrep] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [completedFirstSection, setCompletedFirstSection] = useState(false);
  const [staffs, setStaffs] = useState([]);
  const [staff, setStaff] = useState("");
  const [isStaffModal, setIsStaffModal] = useState(false);

  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  console.log(
    fullName,
    maritalStatus,
    departmentOrUnitOrFacultyID,
    totalLeave,
    dateOfFirstAppointment,
    rankDesignation,
    selectedLeaveType,
    dateResumed,
    startDate,
    addressLeave,
    leaveNumber,
    staffRep,
    staffType
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

  const [endDate, setEndDate] = useState("");
  const [resumptionDate, setResumptionDate] = useState("");

  // const handleStartDateChange = (date) => {
  //   if (date instanceof Date && !isNaN(date)) {
  //     const formattedStartDate = date.toISOString().split('T')[0];
  //     const leaveAmountValue = parseInt(leaveAmount, 10) || 0;
  //     if (leaveAmountValue > totalLeave) {
  //       enqueueSnackbar('Leave amount cannot exceed the total leave due', { variant: 'error' });
  //       setStartDate('');
  //       setEndDate('');
  //       setResumptionDate('');
  //       return;
  //     }
  //     const endDate = new Date(date);
  //     endDate.setDate(endDate.getDate() + leaveAmountValue);
  //     const formattedEndDate = endDate.toISOString().split('T')[0];
  //     const resumptionDate = new Date(endDate);
  //     resumptionDate.setDate(resumptionDate.getDate() + 1);
  //     const formattedResumptionDate = resumptionDate.toISOString().split('T')[0];
  //     setStartDate(formattedStartDate);
  //     setEndDate(formattedEndDate);
  //     setResumptionDate(formattedResumptionDate);
  //   } else {
  //     setStartDate('');
  //     setEndDate('');
  //     setResumptionDate('');
  //   }
  // };

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

  const handleDateChange = (event) => {
    const selected = new Date(event.target.value);
    const today = new Date();
    if (selected > today) {
      // If selected date is in the future, reset the input value
      setDateresumed("");
      alert("Please select a date in the past or today.");
    } else {
      setDateresumed(event.target.value);
    }
  };

  const handleStartDateChange = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      const formattedStartDate = date.toISOString().split("T")[0];
      const leaveAmountValue = parseInt(leaveAmount, 10) || 0;

      if (leaveAmountValue > totalLeave) {
        enqueueSnackbar("Leave amount cannot exceed the total leave due", {
          variant: "error",
        });
        setStartDate("");
        setEndDate("");
        setResumptionDate("");
        return;
      }

      let currentDate = new Date(date);
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
      const formattedResumptionDate = resumptionDate
        .toISOString()
        .split("T")[0];

      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
      setResumptionDate(formattedResumptionDate);
    } else {
      setStartDate("");
      setEndDate("");
      setResumptionDate("");
    }
  };

  const areAllFieldsValid = () => {
    return startDate && addressLeave && leaveNumber && staffRep;
  };

  const leaveStatus = async () => {
    const res = await api.leaveStatus();
    return res;
  };

  const leaveStatusQuery = useQuery(["leaveStatus"], () => leaveStatus(), {
    cacheTime: Infinity,
    retry: true,
  });
  console.log("leave status====>>>", leaveStatusQuery.data);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(
      fullName,
      maritalStatus,
      departmentOrUnitOrFacultyID,
      dateOfFirstAppointment,
      rankDesignation,
      selectedLeaveType,
      dateResumed,
      startDate,
      addressLeave,
      staffType
    );

    const formattedDateResumed = dateResumed
      ? new Date(dateResumed).toISOString().split("T")[0]
      : null;

    const formattedStartDate = startDate
      ? new Date(startDate).toISOString().split("T")[0]
      : null;

    let departmentId = "";
    let facultyId = "";
    let unitId = "";

    if (rankDesignation === "HOD" || rankDesignation === "RSWEP") {
      departmentId = departmentOrUnitOrFacultyID;
    } else if (rankDesignation === "DEAN") {
      facultyId = departmentOrUnitOrFacultyID;
    } else if (rankDesignation === "HOU" || rankDesignation === "NTSWEP") {
      unitId = departmentOrUnitOrFacultyID;
    }

    try {
      const response = await api.requestLeave({
        full_name: fullName,
        marital_status: maritalStatus,
        department_id: departmentId,
        faculty_id: facultyId,
        unit_id: unitId,
        leave_type: selectedLeaveType,
        date_of_first_appointment: dateOfFirstAppointment,
        designation: rankDesignation,
        date_resumed: formattedDateResumed,
        start_date: formattedStartDate,
        end_date: endDate,
        resumption_date: resumptionDate,
        leave_address: addressLeave,
        leave_duration: leaveAmount,
        leave_phone: leaveNumber,
        replacement_on_duty: staffRep,
        type: staffType,
        level: staffLevel,
      });
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
    leaveStatusQuery.data?.compassionate_leave ||
    leaveStatusQuery.data?.leave_of_absence
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
            Annual leave, compassionate leave and leave of absence cannot fly at
            the same time
          </p>
        </div>
      </Box>
    );
  }

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
            {/* Annual Leave form  start */}

            <div
              class="pb-5"
              style={{ display: !showAdditionalInfo ? "block" : "none" }}
            >
              <div class="mb-3">
                <label class="form-label fs-6 fw-semibold">
                  Total Leave Due: {totalLeave} Days
                </label>
              </div>
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
                  <label
                    for="exampleInputEmail1"
                    class="form-label fs-6 fw-semibold h-10"
                  >
                    Date Resumed from Last Leave
                  </label>
                </div>
                {/* <DatePicker
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
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                      {"<"}
                    </button>
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
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
          
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                      {">"}
                    </button>
                  </div>
                )}
                  selected={dateResumed ? new Date(dateResumed) : null}
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                      setDateresumed(formattedDate);
                    } else {
                      setDateresumed('');
                    }
                  }}
                  dateFormat='yyyy-MM-dd'
                  className='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  shouldCloseOnSelect={true}
                /> */}
                <input
                  className="form-control rounded-0"
                  type="date"
                  id="dateInput"
                  value={dateResumed}
                  onChange={handleDateChange}
                  max={new Date().toISOString().split("T")[0]} // Set max attribute to today's date
                />
              </div>
              <div class="mb-3 flex flex-col">
                <div>
                  <label class="form-label fs-6 fw-semibold">Start Date</label>
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
                        onChange={({ target: { value } }) => changeYear(value)}
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
                  onChange={handleStartDateChange} // Use the modified handler
                  dateFormat="yyyy-MM-dd"
                  className="form-control rounded-0 "
                  id="exampleFormControlInput1"
                  required
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

            {/* Annual Leave form  end */}

            {/* Additional info start*/}

            <div
              class="pb-5"
              style={{ display: showAdditionalInfo ? "block" : "none" }}
            >
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label fs-6 fw-semibold h-10"
                >
                  Phone Number while on Leave
                </label>
                <input
                  type="number"
                  class="form-control rounded-0"
                  required
                  value={leaveNumber}
                  onChange={(e) => setLeaveumber(e.target.value)}
                />
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
                  required
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
                  {staffRep ? <p className="mb-0  fs-6">{staffRep}</p> : <p className="mb-0">Select a staff</p>}
                </div>
                {/* <input
                  required
                  class="form-control rounded-0"
                  value={staffRep}
                  onChange={(e) => setStaffrep(e.target.value)}
                /> */}
              </div>

              <button
                disabled={!areAllFieldsValid() || isLoading}
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
              Select a staff to relive you
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
                  placeholder="Search Customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              {staffs &&
                staffs?.available_users.filter((staff) =>
                  staff.first_name 
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ).map((staff) => (
                  <div
                    onClick={() => {
                      setStaffrep(staff.first_name + " " + staff.last_name);
                      setIsStaffModal(false)}}
                    className="w-full "
                  >
                    {" "}
                    <div className="px-2 py-2 border rounded-2 mb-2 w-[300px]">
                    <p>{staff.first_name + " " + staff.last_name}</p>  
                    <p>{staff.email}</p>
                    </div>
                  </div>
                ))}
            </ModalBody>
            <Divider />
            <ModalFooter gap={"5"}>
              <Button
                color="white"
                bg="#0E82F0"
                fontSize={"sm"}
                onClick={() => {
                  // closeModal4();
                }}
              >
                {/* {isLoadingdr ? (
                <MoonLoader color={"white"} size={20} />
              ) : (
                <> Save </>
              )} */}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default AnnualLeave;
