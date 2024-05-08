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
import CasualJunior from "./casual/junior";
import CasualSenior from "./casual/senior";
import ContractJunior from "./contract/junior";
import ContractSenior from "./contract/senior";
import PermanentJunior from "./permanent/junior";
import PermanentSenior from "./permanent/senior";
import TemporaryJunior from "./temporary/junior";
import TemporarySenior from "./temporary/senior";
const AppointmentRequest = ({ navigate }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [appointmentType, setAppointmentType] = useState("");
    const [staffTypes, setstaffTypes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userDetails, setUserDetails] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [position, setPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [showSection, setShowSection] = useState(null);

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
            staffLevel: userDetails?.level
        });
       }
    }, [userDetails]);

    const formData = {
        appointmentType,
        position,
        salary,
        departmentId,
        facultyId,
        unitId,  
      };

    const handleAppointmentChange = (event) => {
        setAppointmentType(event.target.value);
    };
    const handlestaffTypesChange = (event) => {
        setstaffTypes(event.target.value);
    };

    console.log("details",{ full_name: formValues.full_name,conunass: formValues.conunass,role: formValues.role,type: formValues.type,position: position,salary: salary,staffTypes,appointmentType,departmentId,facultyId,unitId});


    const handleNavigate = () => {
        let permanentSenior =
            appointmentType === "permanent_appointment" &&
            staffTypes === "senior_staff";
        let temporarySenior =
            appointmentType === "temporary_appointment" &&
            staffTypes === "senior_staff";
        let contractSenior =
            appointmentType === "contract_appointment" &&
            staffTypes === "senior_staff";
        let permanentJunior =
            appointmentType === "permanent_appointment" &&
            staffTypes === "junior_staff";
        let temporaryJunior =
            appointmentType === "temporary_appointment" &&
            staffTypes === "junior_staff";
        let contractJunior =
            appointmentType === "contract_appointment" &&
            staffTypes === "junior_staff";
        let casualJunior =
            appointmentType === "casual_appointment" && staffTypes === "junior_staff";
        let casualSenior =
            appointmentType === "casual_appointment" && staffTypes === "senior_staff";
        if (permanentSenior) {
            setShowSection('permanentSenior');
        } else if (temporarySenior) {
            setShowSection('temporarySenior');
        } else if (contractSenior) {
            setShowSection('contractSenior');
        } else if (casualSenior) {
            setShowSection('casualSenior');
        } else if (temporaryJunior) {
            setShowSection('temporaryJunior');
        } else if (contractJunior) {
            setShowSection('contractJunior');
        }else if (permanentJunior) {
            setShowSection('permanentJunior');
        } else if (casualJunior) {
            setShowSection('casualJunior');
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
          case 'permanentSenior':
            return <PermanentSenior data={formValues} datas={formData} />;
          case 'permanentJunior':
            return <PermanentJunior data={formValues} datas={formData}/>;
          case 'temporaryJunior':
            return <TemporaryJunior data={formValues} datas={formData}/>;
          case 'temporarySenior':
            return <TemporarySenior data={formValues} datas={formData}/>;
          case 'contractSenior':
            return <ContractSenior data={formValues} datas={formData}/>;
          case 'contractJunior':
            return <ContractJunior data={formValues} datas={formData}/>;
          case 'casualJunior':
            return <CasualJunior data={formValues} datas={formData}/>;
          case 'casualSenior':
            return <CasualSenior data={formValues} datas={formData}/>;
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
                            Appointment
                        </Text>
                        <Text>Kindly fill in the required information</Text>
                    </Box>
                    <Box w='50%' pl='10'>
                        <FormControl isRequired my='5'>
                            <FormLabel color={"#515B6F"}>Appointment Type</FormLabel>
                            <Select
                                onChange={handleAppointmentChange}
                                value={appointmentType}
                                color={"#515B6F"}
                                placeholder='Appointment Type'>
                                <option value='temporary_appointment'>
                                    Temporary Appointment
                                </option>
                                <option value='contract_appointment'>
                                    Contract Appointment{" "}
                                </option>
                                {/* <option value='casual_appointment'>Casual Appointment</option> */}
                                <option value='permanent_appointment'>
                                    Permanent Appointment
                                </option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel color={"#515B6F"}>Staff Type</FormLabel>
                            <Select
                                onChange={handlestaffTypesChange}
                                value={staffTypes}
                                color={"#515B6F"}>
                                <option>Staff Option</option>
                                <option value='junior_staff'>Junior Staff</option>
                                <option value='senior_staff'>Senior Staff</option>
                            </Select>
                        </FormControl>
                        <Box my='10'>
                            <Text fontSize={28} m='0' fontWeight='medium'>
                                Certification of Assumption of Duty
                            </Text>
                        </Box>
                        <FormControl my='5' isRequired>
                            <FormLabel color={"#515B6F"}>Full Name</FormLabel>
                            <Input placeholder='Full name' value={formValues.full_name} disabled/>
                        </FormControl>
                        {formValues.type === 'ASE' && formValues.role === 'DEAN' && (
                        <FormControl isRequired>
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
                        <FormControl isRequired>
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

                        <FormControl my='5' isRequired>
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
                        <FormControl isRequired>
                            <FormLabel color={"#515B6F"}>Position</FormLabel>
                            <Input placeholder='Position'value={position} onChange={(e) => setPosition(e.target.value)} />
                        </FormControl>
                        <FormControl my='5' isRequired>
                            <FormLabel color={"#515B6F"}>Salary</FormLabel>
                            <Input value={salary} onChange={(e) => setSalary(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel color={"#515B6F"}>CONUNASS</FormLabel>
                        <Input placeholder='CONUNAS' disabled value={formValues.conunass} onChange={(e) =>
                            setFormValues({
                            ...formValues,
                            conunass: e.target.value,
                            })
                        }/>
                        </FormControl>
                    </Box>

                    <CommonButton title={"Proceed to Next"} action={handleNavigate} />
                </Box>
            )}
            
        </Box>
    );
};

export default AppointmentRequest;
