import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Radio,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../asset/logo(small).svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useSnackbar } from "notistack";
import api from "../../api";


export default function SetEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => setEmail(e.target.value);
  
  async function resetpass(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.resetPassword({ email });
      console.log("res of reset password==>>>>>", response);
      enqueueSnackbar(response.message, { variant: 'success' })
      setIsLoading(false);
      navigate('/verification-code', {
        state: {email}});
    } catch (error) {
      console.log(error.message)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  }
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
          h='80%'
          alignItems='center'
          justifyContent='center'
          flexDirection={"column"}>
          <Text mt='32' fontWeight='bold' my='10' fontSize={"4xl"}>
            Forgot Password
          </Text>
          <FormControl my='2' onSubmit={resetpass}>
            <form>
              <Input
                type='email'
                focusBorderColor='#984779'
                value={email}
                onChange={handleInputChange}
                placeholder='Enter Email'
              />

              <Button
                type="submit"
                mt='3'
                color={"white"}
                w='100%'
                h='12'
                bg='#572753'
                borderRadius='lg'
                disabled={isLoading}>
                {isLoading ? (
                  <MoonLoader color={"white"} size={20} />
                ) : (<> Next </>
                )}
                
              </Button>
            </form>
            
          </FormControl>
        </Box>
        <Flex w='100%' justifyContent='space-between' px='5' mt='24'>
          <Text color={"#718096"}>Privacy Policy</Text>
          <Text color={"#718096"}>Copyright 2023</Text>
        </Flex>
      </Box>
      <Box
        alignItems={"center"}
        w={"50vw"}
        h={"100vh"}
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
