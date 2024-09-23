import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import { getUserDetails } from "../../../../utils/utils";
import { MoonLoader } from "react-spinners";
import { getYear, getMonth } from "date-fns";
import { Box } from "@chakra-ui/react";
import Moment from "moment";
const ResumptionOfLeaveApplication = ({ navigate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingd, setIsLoadingd] = useState(false);
  const [concludedLeave, setConcludedLeave] = useState("");
  const [dateResumed, setDateresumed] = useState("");
  const [leaveDuration, setLeaveDuration] = useState("");
  const [leaveLocation, setLeaveLocation] = useState("");
  const [pfNumber, setPfNumber] = useState("");
  const [formValues, setFormValues] = useState({});
  const [lastLeaveDetails, setLastLeaveDetails] = useState([]);

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
  useEffect(() => {
    fetchUserDetails();
    fetchLastLeave();
  }, []);

  async function fetchUserDetails() {
    try {
      setIsLoading(true);
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchLastLeave() {
    try {
      setIsLoading(true);
      const lastLeave = await api.getLastLeave();
      console.log("User Details:", lastLeave);
      setLastLeaveDetails(lastLeave.last_approved_leave);
    } catch (error) {
      console.error("Error fetching your last leave details", error);
      enqueueSnackbar(error?.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (userDetails) {
      setFormValues({
        department: userDetails?.department?.name,
        faculty: userDetails?.faculty?.name,
        unit: userDetails?.unit?.name,
        date_of_first_appointment: userDetails?.date_of_first_appointment,
        marital_status: userDetails?.marital_status,
        role: userDetails?.role,
        type: userDetails?.type,
        staffNumber: userDetails?.staff_number,
        // unit: userDetails?.unit?.name
      });
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // setIsLoadingd(true);

    try {
      // let department_unit = "";

      // if (formValues.type === 'ASE' && formValues.role === 'DEAN') {
      //   department_unit = formValues.faculty;
      // } else if (formValues.type === 'ASE' && (formValues.role === 'HOD' || formValues.role === 'RSWEP')) {
      //   department_unit = formValues.department;
      // } else if (formValues.type === 'NASE') {
      //   department_unit = formValues.unit;
      // }

      const response = await api.resumeLeave({
        leave_id: lastLeaveDetails?.id,
        date_resumed: lastLeaveDetails?.resumption_date,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Application successfull", { variant: "success" });
      setIsLoadingd(false);
      navigate("submited");
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.message, { variant: "error" });
      setIsLoadingd(false);
    }
  }
  function formatDate(datetimeStr) {
    const date = Moment(datetimeStr);
    const formattedDate = date.format("MMM DD, YYYY");

    return formattedDate;
  }

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
    <div>
      <div class="border-bottom ps-4">
        <h1 class="fs-4 fw-semibold">Resumption of Duty Certicate </h1>
        <p class="fs-5">Kindly fill in the required information</p>
      </div>
      <form className="row px-4 pt-4">
        <div className="col-lg-6 ">
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label fs-6 fw-semibold "
            >
              Full Name<sup className="text-danger">*</sup>
            </label>
            <input
              type="name"
              class="form-control rounded-0"
              value={`${userDetails?.first_name} ${userDetails?.last_name}`}
              disabled
            />
          </div>
          {/* <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fs-6 fw-semibold">
              Department/Division/Unit<sup className="text-danger">*</sup>
            </label>
            <input
              type="name"
              class="form-control rounded-0"
              disabled
              value={userDetails?.unit?.name}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  unit: e.target.value,
                })
              }
            />
          </div> */}
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label fs-6 fw-semibold "
            >
              PF/CM No
            </label>
            <input
              type="text"
              class="form-control rounded-0"
              value={userDetails?.staff_number}
              // onChange={(e) => setPfNumber(e.target.value)}
            />
          </div>
          {formValues.type === "ASE" && formValues.role === "DEAN" && (
            <div class="mb-3">
              <label
                for="exampleInputEmail1"
                class="form-label fs-6 fw-semibold"
              >
                Faculty
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                disabled
                value={formValues.faculty}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    faculty: e.target.value,
                  })
                }
              />
            </div>
          )}

          {formValues.type === "ASE" &&
            (formValues.role === "HOD" || formValues.role === "RSWEP") && (
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label fs-6 fw-semibold"
                >
                  Department
                </label>
                <input
                  type="text"
                  style={{ height: "40px" }}
                  class="form-control rounded-0"
                  id="exampleFormControlInput1"
                  placeholder=""
                  disabled
                  value={formValues.department}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      department: e.target.value,
                    })
                  }
                />
              </div>
            )}

          {userDetails?.unit && (
            <div class="mb-3">
              <label
                for="exampleInputEmail1"
                class="form-label fs-6 fw-semibold"
              >
                Unit
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                disabled
                value={userDetails?.unit.name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    unit: e.target.value,
                  })
                }
              />
            </div>
          )}

          {userDetails?.type === "NASE" && userDetails?.department && (
            <div class="mb-3">
              <label
                for="exampleInputEmail1"
                class="form-label fs-6 fw-semibold"
              >
                Department
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                disabled
                value={formValues.department}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    department: e.target.value,
                  })
                }
              />
            </div>
          )}

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fs-6 fw-semibold">
              Just concluded Leave Type<sup className="text-danger">*</sup>
            </label>
            <select
              value={lastLeaveDetails?.leave_type}
              disabled
              onChange={(e) => setConcludedLeave(e.target.value)}
              class="form-select rounded-0"
              aria-label="Default select example"
            >
              <option selected>Leave Type</option>
              <option value="annual-leave">Annual Leave</option>
              <option value="casual-leave">Casual Leave</option>
              <option value="compasionate-leave">Compasionate Leave</option>
              <option value="adoption-leave">Adoption Leave</option>
              <option value="sick-leave">Sick Leave</option>
              <option value="maternity-leave">Maternity Leave</option>
              <option value="paternity-leave">Paternity Leave </option>
              <option value="research-leave">Research Leave</option>
              <option value="sabbatical-leave">Sabatical Leave</option>
              <option value="study-leave">Study Leave </option>
              <option value="training-leave">Training Leave</option>
              <option value="leave-of-absence">Leave of Absence</option>
              <option value="permission-to-be-away">
                Permission to be away
              </option>
              <option value="bereavement-leave">Bereavement Leave</option>
            </select>
          </div>

          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              class="form-label fs-6 fw-semibold "
            >
              Resumption Date
            </label>
            <input
              class="form-control rounded-0"
              required
              value={formatDate(lastLeaveDetails?.resumption_date)}
              onChange={(e) => setLeaveDuration(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fs-6 fw-semibold">
              Duration of Leave
            </label>
            <input
              class="form-control rounded-0"
              required
              value={lastLeaveDetails?.leave_duration}
              onChange={(e) => setLeaveDuration(e.target.value)}
            />
          </div>
          {/* <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Department/Division/Unit
            </label>
            <input  class='form-control rounded-0' required value={leaveLocation}
            onChange={(e) => setLeaveLocation(e.target.value)}/>
          </div> */}
        </div>
        <div className="col-lg-12 py-5 d-flex justify-content-end">
          <div>
            <button
              className="btn py-2 px-4 me-2  text-white rounded-0"
              onClick={handleSubmit}
              style={{ backgroundColor: "#984779" }}
              disabled={isLoadingd}
              type="button"
            >
              {isLoadingd ? (
                <MoonLoader color={"white"} size={20} />
              ) : (
                <>Submit</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumptionOfLeaveApplication;
