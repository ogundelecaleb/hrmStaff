import React, { useState , useEffect} from "react";
import { useSnackbar } from "notistack";
import { Box, FormControl, FormLabel, HStack, Image, Input, Link, Select, Text } from "@chakra-ui/react"
import CommonButton from "../../../../components/commonbutton/Button";
import api from "../../../../api";
import { Avatar } from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { MoonLoader } from "react-spinners";
import { getUserDetails } from "../../../../utils/utils";


const EditProfile = ({ reuseableNavigation }) => {
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
      marital_status: "",
      image: ""
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
          marital_status: userDetails?.marital_status,
          image: userDetails?.image
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

        <Box style={{ width: "100%", height: "900px" }}>

            <Box py='2' pl='10' borderBottom='1px solid #EBEAED'>
                <Text color={'#2E2C34'} fontSize={'28px'} m='0' fontWeight='medium'>
                    Profile
                </Text>
                <Text color={'#2E2C34'} fontSize={'20px'}>
                    Kindly fill in the required information
                </Text>
            </Box>

            <HStack alignItems={'start'} w='100%' pl='10' my='5' spacing={'40'}>
                <Box w='540px'>
                    <FormControl mb='5' isRequired>
                        <FormLabel color={'#515B6F'}>Full Name</FormLabel>
                        <Input borderRadius={'none'} placeholder='Full Name' value={`${userDetails?.first_name} ${userDetails?.last_name}`} disabled/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color={'#515B6F'}>E-mail Address</FormLabel>
                        <Input borderRadius={'none'} placeholder='E-mail Address' type={'email'}  value={userDetails?.email} disabled/>
                    </FormControl>
                    <FormControl my='5' isRequired>
                        <FormLabel color={'#515B6F'}>Marital status</FormLabel>
                        <Input borderRadius={'none'} placeholder='Marital status' value={userDetails?.marital_status} disabled/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color={'#515B6F'}>Department/Division/Unit</FormLabel>
                        <Input borderRadius={'none'} placeholder='Department/Division/Unit' value={userDetails?.department?.name} disabled/>
                    </FormControl>
                    <FormControl my='5' isRequired>
                        <FormLabel color={'#515B6F'}>Faculty</FormLabel>
                        <Input borderRadius={'none'} placeholder='Faculty' value={userDetails?.faculty?.name} disabled/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color={'#515B6F'}>Rank/Designation</FormLabel>
                        <Input borderRadius={'none'} placeholder='Rank/Designation' value={userDetails?.present_designation} disabled/>
                    </FormControl>
                    <FormControl my='5' isRequired>
                        <FormLabel color={'#515B6F'}>Level</FormLabel>
                        <Input borderRadius={'none'} placeholder='Level*' />
                    </FormControl>

                </Box>
                <Box display={'flex'} flexDirection={'column'} alignItems='center'>
                  {userDetails.image ? (
                    <Avatar
                      h={'120px'}
                      w={'120px'}
                      src={userDetails.image}
                      borderWidth={1}
                      borderColor={"#ccc"}
                    />
                  ) : (
                    <RxAvatar size={130} color={'#25324B'}/>
                  )}
                  <Link fontSize={'16px'} fontWeight={'medium'} color={'#984779'}>Profile Picture</Link>
                </Box>

            </HStack>
            <CommonButton title={'Next'} action={()=> reuseableNavigation('second-edit-profile')} />
        </Box>
    )
}
export default EditProfile;