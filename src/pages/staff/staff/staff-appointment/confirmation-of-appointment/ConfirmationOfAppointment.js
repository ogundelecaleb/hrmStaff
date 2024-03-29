import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import CommonButton from "../../../../../components/commonbutton/Button";
import { getUserDetails } from "../../../../../utils/utils";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";
import ConfirmationOfAppointmentJunior from "./junior";
import ConfirmationOfAppointmentSenior from "./senior";
import CustomDatePicker from  "../../../../../components/CustomDatePicker";
const ConfirmationOfAppointment = ({ navigate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [staffTypes, setstaffTypess] = useState("");
  const [appointDate, setAppointDate] = useState('');
  const [presentDate, setPresentDate] = useState('');
  const [showSection, setShowSection] = useState(null);
  const [pfNumber, setPfNumber] = useState('');

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

  const formattedAppointDate = appointDate
  ? new Date(appointDate).toISOString().split('T')[0]
  : null;

  const formattedPresentDate = presentDate
  ? new Date(presentDate).toISOString().split('T')[0]
  : null;
  
  useEffect(() => {
    if (userDetails) {
      setFormValues({
        full_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
        department: userDetails?.department?.name,
        faculty: userDetails?.faculty?.name,
        unit: userDetails?.unit?.name,
        conunass: userDetails?.conunass,
        role: userDetails?.role,
        type: userDetails?.type,
        staffType: userDetails?.type,
        staffLevel: userDetails?.level,
         
      });
    }
  }, [userDetails]);

  const formData = {
    formattedAppointDate,
    formattedPresentDate,
    pfNumber,
    departmentId,
    facultyId,
    unitId,
  };

  const handlestaffTypesChange = (event) => {
    setstaffTypess(event.target.value);
  };

  const handleNavigate = () => {
    let staffSenior = staffTypes === "senior_staff";
    let staffJunior = staffTypes === "junior_staff";

    if (staffSenior) {
      setShowSection('staffSenior');
    } else if (staffJunior) {
      setShowSection('staffJunior');
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
            <MoonLoader color={"#984779"} size={80} />
            </div>
        </div>
      </Box>
    );
  }

  function renderSelectedComponent() {
    switch (showSection) {
      case 'staffSenior':
        return <ConfirmationOfAppointmentSenior data={formValues} datas={formData}/>;
      case 'staffJunior':
        return <ConfirmationOfAppointmentJunior data={formValues} datas={formData}/>;
      default:
        return null; 
    }
  }

  return (
    <Box>
      {showSection ? (
                renderSelectedComponent()
            ) : (
            <div className='container'>
              <div className='border-bottom pt-2 px-5'>
                <p className='fs-3 fw-semibold'>Confirmation of Appointment</p>
                <p className='fs-5' style={{ marginTop: "-19px" }}>
                  Kindly fill in the required information
                </p>
              </div>
              <div className='px-5 row'>
                <div className='col-lg-6'>
                  <form>
                    <div className='form-group mt-2'>
                      <label
                        for='exampleFormControlSelect1'
                        className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                        Appointment Type<sup className='text-danger'>*</sup>
                      </label>
                      <select
                      onChange={handlestaffTypesChange}
                      value={staffTypes}
                        className='form-select rounded-0'
                        aria-label='Default select example'>
                        <option selected>Staff Type</option>
                        <option value='junior_staff'>Junior Staff</option>
                        <option value='senior_staff'>Senior Staff</option>
                      
                      </select>
                    </div>
                    <FormControl  my='5'>
                      <label 
                        for='exampleFormControlSelect1'
                        className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        style={{ height: "40px" }}
                        class='form-control rounded-0'
                        id='exampleFormControlInput1'
                        value={formValues.full_name} disabled
                        />
                    </FormControl>

                    {formValues.type === 'ASE' && formValues.role === 'DEAN' && (
                    <FormControl  my='5'>
                        <FormLabel color={"#515B6F"}>Faculty</FormLabel>
                        <Input class='form-control rounded-0' type='text' disabled
                        value={formValues.faculty}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            faculty: e.target.value,
                            })
                        }/>
                    </FormControl>
                    )}
                    {formValues.type === 'NASE' && (
                      <FormControl  my='5'>
                          <FormLabel color={"#515B6F"}>Unit</FormLabel>
                          <Input disabled class='form-control rounded-0'
                              value={formValues.unit}
                              id='exampleFormControlInput1'
                              style={{ height: "40px" }}
                              />
                      </FormControl>
                    )}
                    {(formValues.type === 'ASE' && (formValues.role === 'HOD' || formValues.role === 'RSWEP')) && (
                    <FormControl my='5' >
                        <FormLabel color={"#515B6F"}>Department</FormLabel>
                        <Input  disabled
                        value={formValues.department}
                        onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            department: e.target.value,
                            })
                        }/>
                    </FormControl>
                    )}
                    <FormControl class='flex flex-col' my='5' isRequired >
                      <div>
                        <label class='form-label fs-6 fw-semibold'>Date of First Appointment<sup className='text-danger'>*</sup></label>
                      </div>
                      <CustomDatePicker
                        selectedDate={appointDate}
                        onChange={(date) => {
                          if (date instanceof Date && !isNaN(date)) {
                            const formattedDate = date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            });
                            setAppointDate(formattedDate);
                          } else {
                            setAppointDate('');
                          }
                        }}
                      />
                    </FormControl>
                    <FormControl class='flex flex-col' my='5' isRequired >
                       <div>
                          <label
                            class='form-label fs-6 fw-semibold'>
                            Date of present appointment<sup className='text-danger'>*</sup>
                          </label>
                        </div>
                        <CustomDatePicker
                          selectedDate={presentDate}
                          onChange={(date) => {
                            if (date instanceof Date && !isNaN(date)) {
                              const formattedDate = date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                              });
                              setPresentDate(formattedDate);
                            } else {
                              setPresentDate('');
                            }
                          }}
                        />
                    </FormControl>
                    <FormControl isRequired my='5'>
                      <FormLabel color={"#515B6F"}>PF/CM No</FormLabel>
                      <Input placeholder='PF/CM No'required value={pfNumber}
                      onChange={(e) => setPfNumber(e.target.value)} />
                    </FormControl>
                  </form>
                </div>
                <div className='col-lg-6'> </div>
              </div>
              <div className='py-5'>
                <CommonButton
                  title={"Proceed to Next"}
                  action={handleNavigate}
                />
              </div>
            </div>
             )}
      </Box>
  );
};

export default ConfirmationOfAppointment;
