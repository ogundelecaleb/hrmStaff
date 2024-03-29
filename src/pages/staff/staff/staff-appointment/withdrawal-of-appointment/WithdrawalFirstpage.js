import React, { useState,useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select
} from "@chakra-ui/react";
import { getYear, getMonth } from 'date-fns';
import { getUserDetails } from "../../../../../utils/utils";
import { useSnackbar } from "notistack";
import DatePicker from "react-datepicker";
import { MoonLoader } from "react-spinners";
import "react-datepicker/dist/react-datepicker.css";
import CommonButton from "../../../../../components/commonbutton/Button";
import { useNavigate } from "react-router-dom";


const WithdrawalFirstpage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [gradeValue, setGradeValue] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [staffPf, setstaffPf] = useState("");
  const [rank, setRank] = useState("");
  useEffect(() => {
    if (userDetails) {
        fetchUserDetails();
    }
  }, []);

  async function fetchUserDetails() {
    try {
        setIsLoading(true);
        const userDetails = await getUserDetails();
        console.log("User Details:", userDetails);
        setUserDetails(userDetails.data)
    } catch (error) {
        console.error("Error fetching your basic details", error);
        enqueueSnackbar(error.message, { variant: 'error' })
    }finally {
        setIsLoading(false);
    }
  }

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
 const handleAppointmentChange = (event) => {
   setAppointmentType(event.target.value);
 };
  const getRoleBasedID = (userRole) => {
      if (userRole === 'HOD' || userRole === 'RSWEP') {
        return userDetails.department?.id;
      } else if (userRole === 'DEAN') {
        return userDetails.faculty?.id;
      } else if (userRole === 'HOU' || userRole === 'NTSWEP') {
        return userDetails.unit?.id;
      }
      return null;
  };
  const departmentOrUnitOrFacultyID = getRoleBasedID(userDetails.role);

  const rankDesignation = userDetails?.role;

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
  useEffect(() => {
    if (userDetails) {
     setFormValues({
         full_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
         department: userDetails?.department?.name,
         faculty: userDetails?.faculty?.name,
         unit: userDetails?.unit?.name,
         role: userDetails?.role,
         type: userDetails?.type,
         dateOfBirth: userDetails?.date_of_birth,
         departmentId,
         facultyId,
         unitId,
         staffType: userDetails?.staffType,
         staffLevel: userDetails?.level,
     });
    }
 }, [userDetails]);


 if (isLoading) {
  return (
      <Box
      w={"80vw"}
      display="flex"
      flexDirection="column"
      h={"80vh"}
      alignItems="center"
      justifyContent="center"
      >
      <div
          className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70"
          style={{ zIndex: 9999 }}
      >
          <div className="inline-block">
          <MoonLoader color={"#984779"} size={80} />
          </div>
      </div>
      </Box>
  );
  }

  return (
    <div className="container">
      <div className="border-bottom pt-2 px-5">
        <p className="fs-3 fw-semibold">Withdrawal of Appointment</p>
        <p className="fs-5" style={{ marginTop: "-19px" }}>
          Kindly fill in the required information
        </p>
      </div>
      <div className="px-5 row">
        <div className="col-lg-6">
          <form>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full Name<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.full_name}
                disabled
              />
            </div>
            <div class="mb-3 flex flex-col mt-4">
              <div>
                <label class="form-label fs-6 fw-semibold">
                  Date of Birth<sup className="text-danger">*</sup>
                </label>
              </div>
              <DatePicker
                disabled
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
                selected={
                  formValues.dateOfBirth
                    ? new Date(formValues.dateOfBirth)
                    : null
                }
                onChange={(date) => {
                  if (date instanceof Date && !isNaN(date)) {
                    const formattedDate = date.toISOString().split("T")[0];
                    setFormValues({
                      ...formValues,
                      dateOfBirth: formattedDate,
                    });
                  } else {
                    setFormValues({
                      ...formValues,
                      dateOfBirth: "",
                    });
                  }
                }}
                dateFormat="yyyy-MM-dd"
                className="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                shouldCloseOnSelect={true}
              />
            </div>
            <FormControl isRequired my="5">
              <FormLabel color={"#515B6F"}>Appointment Type</FormLabel>
              <Select
                onChange={handleAppointmentChange}
                value={appointmentType}
                color={"#515B6F"}
                placeholder="Appointment Type"
              >
                <option value="temporary">
                  Temporary Appointment
                </option>
                <option value="permanent">
                  Permanent Appointment
                </option>
              </Select>
            </FormControl>
            <div class="form-group mt-2 mb-3">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Rank/Designation<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              />
            </div>
            {formValues.type === "ASE" && formValues.role === "DEAN" && (
              <FormControl isRequired>
                <FormLabel color={"#515B6F"}>Faculty</FormLabel>
                <Input
                  disabled
                  value={formValues.faculty}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      faculty: e.target.value,
                    })
                  }
                />
              </FormControl>
            )}
            {formValues.type === "NASE" && (
              <FormControl isRequired>
                <FormLabel color={"#515B6F"}>Unit</FormLabel>
                <Input
                  disabled
                  value={formValues.unit}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      unit: e.target.value,
                    })
                  }
                />
              </FormControl>
            )}
            {formValues.type === "ASE" &&
              (formValues.role === "HOD" || formValues.role === "RSWEP") && (
                <FormControl my="5" isRequired>
                  <FormLabel color={"#515B6F"}>Department</FormLabel>
                  <Input
                    disabled
                    value={formValues.department}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        department: e.target.value,
                      })
                    }
                  />
                </FormControl>
              )}
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Grade Level<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={gradeValue}
                onChange={(e) => setGradeValue(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Staff PF/CM No<sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={staffPf}
                onChange={(e) => setstaffPf(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="col-lg-6"> </div>
      </div>
      <div className="py-5">
        <CommonButton
          title={"Proceed to Next"}
          action={() =>
            navigate("withdrawal-second-page", {
              state: { formValues, gradeValue, staffPf, rank, appointmentType },
            })
          }
        />
      </div>
    </div>
  );
};

export default WithdrawalFirstpage;
