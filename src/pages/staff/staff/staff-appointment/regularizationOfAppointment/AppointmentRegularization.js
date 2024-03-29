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
import RegularizationAppointmentJunior from "./junior";
import RegularizationAppointmentSenior from "./senior";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';

const AppointmentRegularization = ({ navigate }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [staffType, setStaffType] = useState("");
  const [appointDate, setAppointDate] = useState('');
  const [showSection, setShowSection] = useState(null);
  const [pfNumber, setPfNumber] = useState('');

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
        staffLevel: userDetails?.level,
      });
    }
  }, [userDetails]);

  const formData = {
    departmentId,
    facultyId,
    unitId,
    staffType,
    formattedAppointDate,
    pfNumber, 
  };

  const handleStaffTypeChange = (event) => {
    setStaffType(event.target.value);
  };

  const handleNavigate = () => {
    let staffSenior = staffType === "senior_staff";
    let staffJunior = staffType === "junior_staff";

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
        return <RegularizationAppointmentSenior data={formValues} datas={formData}/>;
      case 'staffJunior':
        return <RegularizationAppointmentJunior data={formValues} datas={formData}/>;
      default:
        return null; 
    }
  }

  return (
    <Box>
      {showSection ? (
                renderSelectedComponent()
            ) : (
              <Box>
              <Box py='2' pl='10' borderBottom='1px solid #EBEAED'>
                <Text fontSize={28} m='0' fontWeight='medium'>
                  Regularization of Appointment
                </Text>
                <Text fontSize={20} fontWeight='normal'>
                  Kindly fill in the required information
                </Text>
              </Box>
              <Box w='50%' pl='10'>
                <FormControl isRequired my='5'>
                  <FormLabel color={"#515B6F"}>Staff Type</FormLabel>
                  <Select placeholder='Select Staff Type'  value={staffType} color={"#515B6F"} onChange={handleStaffTypeChange}>
                    <option value='senior_staff'>Senior Staff</option>
                    <option value='junior_staff'>Junior Staff</option>
        
                  </Select>
                </FormControl>
        
                <FormControl >
                  <FormLabel color={"#515B6F"} my='5'>Full Name</FormLabel>
                  <Input value={formValues.full_name} disabled/>
                </FormControl>
                <FormControl isRequired my='5'>
                  <FormLabel color={"#515B6F"}>PF/CM No</FormLabel>
                  <Input placeholder='PF/CM No'required value={pfNumber}
                  onChange={(e) => setPfNumber(e.target.value)} />
                </FormControl>
                
                {formValues.type === 'ASE' && formValues.role === 'DEAN' && (
                <FormControl  my='5'>
                    <FormLabel color={"#515B6F"}>Faculty</FormLabel>
                    <Input disabled
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
                      <Input disabled
                          value={formValues.unit}
                          onChange={(e) =>
                              setFormValues({
                              ...formValues,
                              unit: e.target.value,
                              })
                          }/>
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
                <FormControl class='mb-3 flex flex-col'isRequired >
                  <div>
                    <label class='form-label fs-6 fw-semibold'>Date of First Appointment</label>
                  </div>
                  <DatePicker
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
                        selected={appointDate ? new Date(appointDate) : null}
                        onChange={(date) => {
                          if (date instanceof Date && !isNaN(date)) {
                            const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                            setAppointDate(formattedDate);
                          } else {
                            setAppointDate('');
                          }
                        }}
                        dateFormat='yyyy-MM-dd'
                        className='form-control rounded-0'
                        id='exampleFormControlInput1'
                        placeholder=''
                        shouldCloseOnSelect={true}
                      />
                </FormControl>
              </Box>
        
              <CommonButton
                title={"Proceed to Next"}
                action={handleNavigate}
              />
            </Box>
            )}
    </Box>
   
  );
};
export default AppointmentRegularization;
