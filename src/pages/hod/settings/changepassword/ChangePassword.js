import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import api from "../../../../api";
import { MoonLoader } from "react-spinners";
import React, { useState } from "react";
import { useSnackbar } from "notistack";

const ChangePassword = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPass, setCurretPass] = useState('');
    const [newPass, setnewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    async function handleSubmit (e)  {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.updatePassword({current_password:currentPass,new_password:newPass, new_password_confirmation:confirmPass });
            console.log("responce==>>>>>", response);
            enqueueSnackbar('Update successfully', { variant: 'success' })
            setIsLoading(false);
            setCurretPass('');
            setnewPass('');
            setConfirmPass('');
        } catch (error) {
            console.log(error)
            enqueueSnackbar(error.message, { variant: 'error' })
            setIsLoading(false);
        }
    };

    return (
        <Box>

            <Box py='2' pl='10' borderBottom='1px solid #EBEAED'>
                <Text color={'#2E2C34'} fontSize={'20px'} m='0' fontWeight='normal'>
                    Change Password
                </Text>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box w='540px' pl='10' my='5'>
                    <FormControl>
                        <FormLabel>Enter Current Password</FormLabel>
                        <Input type={'password'} borderRadius='none' placeholder='Enter Current Password' value={currentPass} onChange={(e) => setCurretPass(e.target.value)}/>
                    </FormControl>
                    <FormControl my='5'>
                        <FormLabel>Enter New Password</FormLabel>
                        <Input type={'password'} borderRadius='none' placeholder='Enter New Password' value={newPass} onChange={(e) => setnewPass(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirm  Password *</FormLabel>
                        <Input type={'password'} borderRadius='none' placeholder='Confirm  Password' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                    </FormControl>
                </Box>
                <div className='col-lg-12 py-2 d-flex justify-content-end'>
                    <div>
                    <button
                        className='btn py-2 px-4 me-2  text-white rounded-0'
                        style={{ backgroundColor: "#984779" }} disabled={isLoading} type="submit">
                        {isLoading ? (
                            <MoonLoader color={"white"} size={20} />
                            ) : ( <>Update Password</>
                            )}
                    </button>
                    </div>
                </div>
            </form>
        </Box>
    )
}
export default ChangePassword;