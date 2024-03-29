import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import logo from "../asset/logo(small).svg";
import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useSnackbar } from "notistack";
import { MoonLoader } from "react-spinners";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedTitle, setSelectedTitle] = useState('');
  // const [staffType, setStaffType] = useState('');
  const [selectedStaffType, setSelectedStaffType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [staffID, setStaffID] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [facultyOptions, setFacultyOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [unit, setUnit] = useState('');
  const [selectedUnit, setSelectedUnit] = useState("");
  const [unitOptions, setUnitOptions] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    api.fetchFaculties()
    .then(response => setFacultyOptions(response.data))
    .catch(error => {
      enqueueSnackbar(error.message, { variant: "error" });
    })
  }, []);

  useEffect(() => {
    api.fethDeparments()
    .then(response => setDepartmentOptions(response.data))
    .catch(error => {
      enqueueSnackbar(error.message, { variant: "error" });
    })
  }, []);

  useEffect(() => {
    api.fethUnit()
    .then(response => setUnitOptions(response.data))
    .catch(error => {
      enqueueSnackbar(error.message, { variant: "error" });
    })
  }, []);

  const handleStaffChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStaffType(selectedValue);
    setUnit("");
    setSelectedFaculty("");
    setSelectedDepartment("");
    updateFormValidation(selectedValue, unit, selectedFaculty, selectedDepartment);
  };

  const updateFormValidation = (
    staffType,
    unitValue,
    facultyValue,
    departmentValue
  ) => {
    if (staffType === "Non-Academic") {
      setIsFormValid(!!unitValue);
    } else if (staffType === "Academic") {
      setIsFormValid(!!facultyValue && !!departmentValue);
    } else {
      setIsFormValid(false);
    }
  };

  async function handleSubmit (e)  {
    e.preventDefault();
    if (!selectedStaffType) {
      enqueueSnackbar('Please select staff type', { variant: 'warning' });
      return;
    }
    setIsLoading(true);
    console.log("Form submitted");
    console.log({ title: selectedTitle, first_name: firstName, last_name: lastName, email, staff_number: staffID, type: selectedStaffType, faculty: selectedFaculty.id, department: selectedDepartment.id,role: selectedStaffType === 'Academic' ? 'NSWP' : 'NTSWEP',});

    try {
      const response = await api.registerStaff({title:selectedTitle,first_name:firstName,last_name:lastName,email,staff_number:staffID,role: selectedStaffType === 'Academic' ? 'NSWP' : 'NTSWEP',status: 'active',type:selectedStaffType,faculty_id: selectedFaculty.id,department_id: selectedDepartment.id})
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Registration successfull", { variant: "success" });
      setIsLoading(false);
      navigate('/');
      resetForm();
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  }

  const resetForm = () => {
    setSelectedTitle('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setStaffID('');
    setSelectedStaffType('');
    setUnit('');
    setSelectedFaculty('');
    setSelectedDepartment('');
    setIsFormValid(false);
  };  

  return (
    <Box display='flex'>
      <Box
        w={"50vw"}
        display='flex'
        flexDirection='column'
        h={"100vh"}
        alignItems='center'
        justifyContent='center'>
        <Box position={"absolute"} top='5' left='14'>
          <Image w='74px' h='71px' src={logo} />
        </Box>
        <Box
          display='flex'
          w='60%'
          alignItems='center'
          justifyContent='center'
          flexDirection={"column"}>
          <Text mt='32' fontWeight='bold' fontSize={"4xl"}>
            Register
          </Text>
          <FormControl my='10' onSubmit={handleSubmit}>
            <form>

              <Input
                type='text'
                focusBorderColor='#984779'
                value={staffID}
                onChange={(e) => setStaffID(e.target.value)}
                placeholder='Staff ID No'
                mb='5'
              />

              <select
                id='title'
                value={selectedTitle}
                focusBorderColor='#984779'
                onChange={(e) => setSelectedTitle(e.target.value)}
                style={{ width:'100%', height:'40px', borderWidth:'1px', borderRadius:'7px', paddingLeft:'12px', paddingRight:'12px' }}
              >
                <option value=''>Select Title</option>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Miss'>Miss</option>
              </select>

              <Input
                type='text'
                focusBorderColor='#984779'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='First Name'
                mt='5'
              />

              <Input
                type='text'
                focusBorderColor='#984779'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Last Name'
                mt='5'
              />

              <Input
                type='text'
                focusBorderColor='#984779'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address'
                mt='5'
              />

              <select
                id='staffType'
                value={selectedStaffType}
                focusBorderColor='#984779'
                onChange={handleStaffChange}
                style={{ width:'100%',marginTop:'20px', height:'40px', borderWidth:'1px', borderRadius:'7px', paddingLeft:'12px', paddingRight:'12px' }}

              >
                <option value=''>Select Staff Type</option>
                <option value='Academic'>Academic</option>
                <option value='Non-Academic'>Non Academic</option>
              </select>

              {selectedStaffType === "Non-Academic" && 
              (
                <select
                  id='unit'
                  style={{ width:'100%',marginTop:'20px', height:'40px', borderWidth:'1px', borderRadius:'7px', paddingLeft:'12px', paddingRight:'12px' }}
                  value={selectedUnit ? selectedUnit.id : ""}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedUnitObject = unitOptions.find(unit => unit.id === parseInt(selectedId));
                    console.log("Selected Unit Object:", selectedUnitObject);
                    setSelectedUnit(selectedUnitObject);
                  }}
                >
                  <option value="">Select Unit</option>
                  {unitOptions.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                        {unit.name}
                    </option>
                  ))}
                </select>
              )}

              {selectedStaffType === "Academic" && 
              (
                <div>
                  <select
                    id='faculty'
                    style={{ width:'100%',marginTop:'20px', height:'40px', borderWidth:'1px', borderRadius:'7px', paddingLeft:'12px', paddingRight:'12px' }}
                    value={selectedFaculty ? selectedFaculty.id : ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedFacultyObject = facultyOptions.find(faculty => faculty.id === parseInt(selectedId));
                      console.log("Selected Faculty Object:", selectedFacultyObject);
                      setSelectedFaculty(selectedFacultyObject);
                    }}
                  >
                    <option value="">Select Faculty</option>
                    {facultyOptions.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                          {faculty.name}
                      </option>
                    ))}
                  </select>

                  <select
                    id='department'
                    style={{ width:'100%',marginTop:'20px', height:'40px', borderWidth:'1px', borderRadius:'7px', paddingLeft:'12px', paddingRight:'12px' }}
                    value={selectedDepartment ? selectedDepartment.id : ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedDepartmentObject = departmentOptions.find(department => department.id === parseInt(selectedId));
                      console.log("Selected Department Object:", selectedDepartmentObject);
                      setSelectedDepartment(selectedDepartmentObject);
                    }}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((department) => (
                        <option key={department.id} value={department.id}>
                            {department.name}
                        </option>
                    ))}
                  </select>
                </div>
              )}
              <div my='40'>
                <Button
                  mt='30'
                  color={"white"}
                  w='100%'
                  h='12'
                  bg='#572753'
                  borderRadius='lg'
                  type='submit'
                  disabled={isLoading || !isFormValid}>
                    {isLoading ? (
                    <MoonLoader color={"white"} size={20} />
                  ) : ( <> Register </>
                  )}
                </Button>
              </div>
            </form>
          </FormControl>
        <Flex w='100%' justifyContent='space-between' px='5'>
          <Text color={"#718096"}>Privacy Policy</Text>
          <Text color={"#718096"}>Copyright 2023</Text>
        </Flex>
        </Box>
      </Box>
      <Box
        alignItems={"center"}
        w={"50vw"}
        h={"110vh"}
        bg='#17082D'
        display='flex'
        flexDirection='column'
        justifyContent='center'>
        <Image w='sm' h='xs' src={logo} />
        <Text color='white' fontSize='3xl' mt='6' fontWeight='bold'>
          Human Resource Management Portal
        </Text>
      </Box>
    </Box>
  );
}
