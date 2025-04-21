import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import "react-datepicker/dist/react-datepicker.css";
import { getUserDetails } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { getYear, getMonth } from "date-fns";
import { Box } from "@chakra-ui/react";
import "intl";
import "intl/locale-data/jsonp/en";
import { Danger } from "iconsax-react";

const Leave = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);

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

  const calculateProgress = () => {
    const fieldsToCheck = [
      "first_name",
      "last_name",
      "email",
      "permanent_address",
      "phone",
      "date_of_birth",
      "nationality",
      "state_of_origin",
      "gender",
      "marital_status",
      "contact_address",
      "date_of_first_appointment",
       "k1_full_name",
      // "beneficiary_full_name",
       "staff_academic_qualification",
    ];
    const filledFields = fieldsToCheck.reduce((count, field) => {
      if (userDetails[field] !== null && userDetails[field] !== undefined) {
        count++;
      }
      return count;
    }, 0);
    const progressPercentage = (filledFields / fieldsToCheck.length) * 100;
    return Math.round(progressPercentage);
  };
  const progress = calculateProgress();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    marital_status: "",
  });

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
      });
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      fetchUserDetails();
    }
  }, []);

  const [leaveType, setLeaveType] = useState("");

  const getRoleBasedID = (userRole) => {
    if (userRole === "HOD" || userRole === "RSWEP") {
      return userDetails.department?.id;
    } else if (userRole === "DEAN") {
      return userDetails.faculty?.id;
    } else if (
      userRole === "HOU" ||
      (userRole === "NTSWEP" && userDetails.unit?.id !== "8")
    ) {
      return userDetails.unit?.id;
    } else if (userRole === "NTSWEP" && userDetails.unit?.id === 8) {
      return userDetails.department?.id;
    }
    return null;
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    if (!leaveType) {
      enqueueSnackbar("Please select a leave type", { variant: "warning" });
      return;
    }
    console.log("Selected Leave Type:", leaveType);
    let checkForAnnalLeave = leaveType === "annual-leave";
    let checkForCasualLeave = leaveType === "casual-leave";
    let checkForExaminationLeave = leaveType === "examination-leave";
    let checkForConferenceLeave = leaveType === "conference-leave";
    let checkForSportingLeave = leaveType === "sporting-leave";
    let checkForCompassionateLeave = leaveType === "compassionate-leave";
    let checkForAdoptionLeave = leaveType === "adoption-leave";
    let checkForSickLeave = leaveType === "sick-leave";
    let checkForTradeLeave = leaveType === "leave-for-trade";
    let checkForMaternityLeave = leaveType === "maternity-leave";
    let checkForPaternityLeave = leaveType === "paternity-leave";
    let checkForResearchLeave = leaveType === "research-leave";
    let checkForSabbaticalLeave = leaveType === "sabbatical-leave";
    let checkForStudyLeaveWithPay = leaveType === "study-leave-with-pay";
    let checkForShortTermStudyLeaveWithPay =
      leaveType === "short-term-study-leave-with-pay";
    let checkForStudyLeaveWithoutPay = leaveType === "study-leave-without-pay";
    let checkForTrainingLeave = leaveType === "training-leave";
    let checkForAbsenceLeave = leaveType === "leave-of-absence";
    let checkForBereavementLeave = leaveType === "bereavement-leave";

    if (checkForAnnalLeave) {
      navigate("annual-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          totalLeave: userDetails.total_leave_due,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id
        },
      });
    } else if (checkForCasualLeave) {
      navigate("casual-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails?.type,
          staffLevel: userDetails?.level,
          totalLeave: userDetails?.total_leave_due,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForExaminationLeave) {
      navigate("examination-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          totalLeave: userDetails.total_leave_due,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForConferenceLeave) {
      navigate("conference-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails?.type,
          staffLevel: userDetails?.level,
          totalLeave: userDetails.total_leave_due,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForSportingLeave) {
      navigate("sporting-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          totalLeave: userDetails?.total_leave_due,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForCompassionateLeave) {
      navigate("compassionate-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          totalLeave: userDetails?.total_leave_due,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForAdoptionLeave) {
      navigate("adoption-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          gender: userDetails?.gender,
          selectedLeaveType: leaveType,
          staffType: userDetails?.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForSickLeave) {
      navigate("sick-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails?.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForTradeLeave) {
      navigate("leave-for-trade-union", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          level: userDetails?.level,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id



        },
      });
    } else if (checkForMaternityLeave) {
      navigate("maternity-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          gender: userDetails?.gender,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails?.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          children: userDetails?.children,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForPaternityLeave) {
      navigate("paternity-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          gender: userDetails?.gender,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails?.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          children: userDetails?.children,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForResearchLeave) {
      navigate("research-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          conuassLevel: userDetails?.conuass,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForSabbaticalLeave) {
      navigate("sabbatical-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails?.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForStudyLeaveWithPay) {
      navigate("study-leave-with-pay", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          level: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForShortTermStudyLeaveWithPay) {
      navigate("short-term-study-leave-with-pay", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id



        },
      });
    } else if (checkForStudyLeaveWithoutPay) {
      navigate("study-leave-without-pay", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForTrainingLeave) {
      navigate("training-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          level: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


        },
      });
    } else if (checkForAbsenceLeave) {
      navigate("leave-of-absence", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id


         
        },
      });
    } else if (checkForBereavementLeave) {
      navigate("beareavement-leave", {
        state: {
          fullName: userDetails?.first_name + " " + userDetails?.last_name,
          maritalStatus: userDetails?.marital_status,
          departmentOrUnitOrFacultyID: getRoleBasedID(userDetails.role),
          dateOfFirstAppointment: userDetails.date_of_first_appointment,
          rankDesignation: userDetails.role,
          selectedLeaveType: leaveType,
          staffType: userDetails.type,
          staffLevel: userDetails?.level,
          confirm: userDetails?.confirmation,
          department: userDetails?.department?.id,
          unit: userDetails?.unit?.id,
          faculty: userDetails?.faculty?.id,
          supervisorRole: userDetails?.user_supervision_role,
          supervisor_id: userDetails?.supervisor_office?.id



        },
      });
    }
  };

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
            <MoonLoader color={"#984779"} size={50} />
          </div>
        </div>
      </Box>
    );
  }

  if( !userDetails?.supervisor_office?.name){
    return(
      <div className="h-[80vh] w-full flex flex-col justify-center items-center">

        <Danger size={30} color={"gray"}/>
        <h1 className="text-center text-danger mt-4 text-base  font-semibold">You have not been assigned an immediate supervisor</h1>
        <h1 className="text-center text-gray-400 mt-2 text-sm">Go to your dashboard and select your immediate supervisor's office</h1>

        <Link to="/dashboard" className="bg-[#984779] px-2 py-1 text-sm text-white mt-4 rounded-lg animate-pulse duration-150 transition-transform ease-in-out">Dashboard</Link>
      </div>

    )
  }

  if (progress !== 100) {
    return (
      <Box
        w={"80vw"}
        display="flex"
        flexDirection="column"
        h={"80vh"}
        alignItems="center"
        justifyContent="center"
      >
        <div className="row mt-5 " style={{ height: "180px", width: "80%" }}>
          <div
            className="col-lg-12 rounded-1 px-3 d-flex justify-content-between align-items-center border"
            style={{ border: "1px solid #EFF4F8", borderRadius: 10 }}
          >
            <div className="d-flex gap-3 align-items-center">
              <CircularProgress
                value={progress}
                thickness="6"
                size="75"
                color="green.400"
              >
                <CircularProgressLabel>{progress}</CircularProgressLabel>
              </CircularProgress>
              <div className="line-height-10">
                <p class="fs-4 fw-semibold">Complete all Process</p>

                <p className="fs-6 text-muted">
                  Your personal records profile is{" "}
                  <span className="text-warning">{progress}%</span> completed,
                  to access the leave application you need to complete your
                  profile information
                </p>
              </div>
            </div>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <div className="container-fluid">
      <div class="border-bottom x-4 md:px-5" id="no-padding-res">
        <h1 className="text-base md:text-lg font-medium mt-2">Leave Application</h1>
        <p className="text-sm  ">Kindly fill in the required information</p>
      </div>
      <div className="row">
        <form
          class="px-4 md:px-5 pt-2 col-md-6 "
          id="sec-padding-res"
          style={{ paddingBottom: "100px" }}
        >
          <div class="pb-5">
            <div class="mb-3">
              <label class="form-label text-base md:text-lg fw-semibold ">Full Name</label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                disabled
                value={`${userDetails?.first_name} ${userDetails?.last_name}`}
              />
            </div>
            <div className="mb-3">
              <label class="form-label text-base md:text-lg fw-semibold">Marital Status</label>
              <select
                className="form-select h-[40px] rounded-0"
                disabled
                id="exampleFormControlSelect1"
                value={formValues.marital_status}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    marital_status: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

            {formValues.type === "ASE" && formValues.role === "DEAN" && (
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label text-base md:text-lg fw-semibold"
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
                    class="form-label text-base md:text-lg fw-semibold"
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

            {formValues.type === "NASE" && userDetails?.unit?.id === 8 && (
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label text-base md:text-lg fw-semibold"
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
            {formValues.type === "NASE" && (
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label text-base md:text-lg fw-semibold"
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
                  value={formValues.unit}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      unit: e.target.value,
                    })
                  }
                />
              </div>
            )}

            <div class="mb-3">
              <label
                for="exampleInputEmail1"
                class="form-label text-base md:text-lg fw-semibold"
              >
                Leave Type<sup className="text-danger">*</sup>
              </label>
              <select
                onChange={(e) => setLeaveType(e.target.value)}
                className="form-select rounded-0 h-[40px] "
                aria-label="Default select example"
              >
                <option selected>Leave Type</option>
                <option value="annual-leave">Annual Leave</option>
                <option value="casual-leave">Casual Leave</option>
                <option value="examination-leave">Examination Leave</option>
                <option value="conference-leave">
                  Conference / Seminar / Workshop Leave
                </option>
                <option value="sporting-leave">
                  Leave for Approved Sporting Events
                </option>
                <option value="compassionate-leave">Compassionate Leave</option>
                <option value="adoption-leave">Adoption Leave</option>
                <option value="sick-leave">Sick Leave</option>
                <option value="leave-for-trade">
                  Leave for Trade Union Conference And Business
                </option>
                <option value="maternity-leave">Maternity Leave</option>
                <option value="paternity-leave">Paternity Leave </option>
                <option value="research-leave">Research Leave</option>
                <option value="sabbatical-leave">Sabbatical Leave</option>
                <option value="study-leave-with-pay">
                  Study Leave With Pay{" "}
                </option>
                <option value="short-term-study-leave-with-pay">
                  Short Term Study Leave With Pay{" "}
                </option>
                <option value="study-leave-without-pay">
                  Study Leave Without Pay{" "}
                </option>
                <option value="training-leave">Training Leave</option>
                <option value="leave-of-absence">Leave of Absence</option>
                <option value="bereavement-leave">Bereavement Leave</option>
              </select>
            </div>

            {/* {verifyLeave ? ( */}
            <>
              {" "}
              <div class="mb-3 flex flex-col">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="form-label text-base md:text-lg fw-semibold"
                  >
                    Date of First Appointment{" "}
                    <sup className="text-danger">*</sup>
                  </label>
                </div>
                <input
                  type="text"
                  style={{ height: "40px" }}
                  class="form-control rounded-0"
                  id="exampleFormControlInput1"
                  disabled
                  value={formValues.date_of_first_appointment}
                 
                />
                
              </div>
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label text-base md:text-lg fw-semibold"
                >
                  Rank/Designation<sup className="text-danger">*</sup>
                </label>
                <input
                  type="text"
                  style={{ height: "40px" }}
                  class="form-control rounded-0"
                  id="exampleFormControlInput1"
                  disabled
                  value={formValues.role}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      role: e.target.value,
                    })
                  }
                />
              </div>
            </>
          </div>

          <button
            onClick={handleNavigate}
            type="submit"
            style={{
              backgroundColor: " #984779",
              borderColor: "white",
              right: 50,
              position: "absolute",
            }}
            class="my-10 py-2 px-5 text-md-start text-white fs-6 fw-semibold"
          >
            Proceed to Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default Leave;
