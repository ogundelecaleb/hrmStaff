import React, { useState , useEffect} from "react";
import { useSnackbar } from "notistack";
import { Box, FormControl, FormLabel, Input, Select, Text, Textarea } from "@chakra-ui/react";
import CommonButton from "../../../../components/commonbutton/Button";
import api from "../../../../api";
import { MoonLoader } from "react-spinners";
import { getUserDetails } from "../../../../utils/utils";

const SecondEditProfile = ({reuseableNavigation}) => {

    const [userDetails, setUserDetails] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
  
    async function fetchUserDetails() {
      try {
        const userDetails = await getUserDetails();
        console.log("User Details:", userDetails);
        setUserDetails(userDetails.data)
      } catch (error) {
        console.error("Error fetching your basic details", error);
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    }
    const [formValues, setFormValues] = useState({
      firstName: "",
      lastName: "",
      nationality: "",
      stateOfOrigin: "",
      dateOfBirth: "",
      gender: "",
    });
    
    useEffect(() => {
      fetchUserDetails();
    }, []);
    
    useEffect(() => {
      if (userDetails) {
        setFormValues({
          firstName: userDetails?.first_name,
          lastName: userDetails?.last_name,
          nationality: userDetails?.nationality,
          stateOfOrigin: userDetails?.state_of_origin,
          dateOfBirth: userDetails?.date_of_birth,
          gender: userDetails?.gender,
        });
      }
    }, [userDetails]);
  
    async function handleSubmit (e)  {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await api.updatePinfo({
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          nationality: formValues.nationality,
          state_of_origin: formValues.stateOfOrigin,
          date_of_birth: formValues.dateOfBirth,
          gender: formValues.gender
        });
        console.log("responce==>>>>>", response);
        enqueueSnackbar('Information updated successfully', { variant: 'success' })
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        enqueueSnackbar(error.message, { variant: 'error' })
        setIsLoading(false);
      }
    };

    return (
        <Box style={{ width: "100%" }}>

        <Box py='2' px='6' borderBottom='1px solid #EBEAED'>
            <Text color={'#2E2C34'} fontSize={'28px'} m='0' fontWeight='medium'>
                Profile
            </Text>
            {/* <Text color={'#2E2C34'} fontSize={'20px'}>
                Kindly fill in the required information
            </Text> */}
        </Box>
        <Box w='50%' px='6'>
            <FormControl my='5' isRequired>
                <FormLabel color={'#515B6F'}>Home Address</FormLabel>
                <Textarea borderRadius={'none'} placeholder='Home Address' value={userDetails?.permanent_address} disabled/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel color={'#515B6F'}>Phone number</FormLabel>
                <Input borderRadius={'none'} placeholder='Phone number' type={'number'} value={userDetails?.phone} disabled/>
            </FormControl>
            
        </Box>
        <CommonButton title={'Update Profile'}/>
    </Box>
    )
}
export default SecondEditProfile;