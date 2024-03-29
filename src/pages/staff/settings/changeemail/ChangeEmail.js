import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import CommonButton from "../../../../components/commonbutton/Button";

const ChangeEmail = () => {
    return (
        <Box>

            <Box py='2' pl='10' borderBottom='1px solid #EBEAED'>
                <Text color={'#2E2C34'} fontSize={'20px'} m='0' fontWeight='normal'>
                Update  E-mail
                </Text>
            </Box>
            <Box w='540px' pl='10' my='10'>
                <FormControl>
                    <FormLabel>Enter Email Address</FormLabel>
                    <Input type={'email'} borderRadius='none' placeholder='Enter Email Address' />
                </FormControl>
            </Box>
            <CommonButton title={'Update E-mail'}/>
        </Box>
    )
}
export default ChangeEmail;