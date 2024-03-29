import { Avatar, Box, Flex, HStack, Link, Text, VStack, WrapItem } from "@chakra-ui/react";
import React, { useState , useEffect} from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import { RxAvatar } from "react-icons/rx";

const Settings = ({reuseableNavigation}) => {

  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

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
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const Details = ({ label, fullName }) => {
    return (
      <Box mt='5'>
        <Text fontWeight={'medium'} m='0' color={'#7C8493'} fontSize={'16px'}>{label}</Text>
        <Text fontWeight={'medium'} m='0' color={'#25324B'} fontSize={'16px'}>{fullName}</Text>
      </Box>
    )
  }

  return (

    <Box style={{ width: "100%", height: "900px" }}>
      <Box pl='10' borderBottom='1px solid #EBEAED'>
        <Text fontSize={28} py='3' m='0' fontWeight='medium'>Profile</Text>
      </Box>
      <Box pl='14' pt='10' w='75%'>
        <WrapItem>
        {userDetails.image ? (
              <Avatar
                h={'100px'}
                w={'100px'}
                src={userDetails.image}
                borderWidth={1}
                borderColor={"#ccc"}
              />
            ) : (
              <RxAvatar size={130} color={'#25324B'}/>
            )}
        </WrapItem>
        <Flex justifyContent={'space-between'}>
          <Box >
            <Box>
              <Details
                label={'Full Name'}
                fullName={`${userDetails?.first_name} ${userDetails?.last_name}`}
              />
              <Details
                label={'E-mail Address '}
                fullName={userDetails?.email}
              />
              <Details
                label={'Home Address '}
                fullName={userDetails?.contact_address}
              />
              <Details
                label={'Phone Number '}
                fullName={userDetails?.phone}
              />
              <Details
                label={'Marital Status'}
                fullName={userDetails?.marital_status}
              />
            </Box>
            <Box mt='20' display={'flex'} flexDirection={'column'} gap={5}>
              <Link fontSize={'16px'} fontWeight={'medium'} onClick={()=> reuseableNavigation('edit-profile')} color={'#984779'}>Edit Details</Link>
              <Link fontSize={'16px'} fontWeight={'medium'} onClick={()=> reuseableNavigation('change-password')} color={'#984779'}>Change Password</Link>
              {/* <Link fontSize={'16px'} fontWeight={'medium'} onClick={()=> reuseableNavigation('change-email')} color={'#984779'}>Change E-mail Address</Link> */}
            </Box>

          </Box>
          <Box>
            <Details
              label={'Faculty '}
              fullName={userDetails?.department?.faculty?.name}
            />
            <Details
              label={'Department/Division '}
              fullName={userDetails?.department?.name}
            />
            {/* <Details
              label={'Level '}
              fullName={'14'}
            /> */}
            <Details
              label={'Designation'}
              fullName={userDetails?.role}
            />
          </Box>
        </Flex>
      </Box >
    </Box >)
};

export default Settings;
