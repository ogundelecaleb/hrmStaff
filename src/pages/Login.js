import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import logo from "../asset/logo(small).svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useSnackbar } from "notistack";
import api from "../api";
import { setUserData } from "../utils/utils";
import { MoonLoader } from "react-spinners";

export default function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const userRef = useRef();
  const userData = localStorage.getItem('userData');
  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!userData) {
      userRef.current.focus();
    }

  }, [userData])

  if (userData) {
    return <Navigate to="/dashboard" replace />;
  }

  async function login(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.signIn({ identity, password });
      console.log("res of login==>>>>>", response);
      const { role } = response;
      if (!role) {
        enqueueSnackbar('Access denied, contact HR Manager', { variant: 'error' });
        setIsLoading(false);
        return;
      }
      enqueueSnackbar(response.message, { variant: 'success' })
      const userData = { role, firstLogin: response.firstLogin };
      localStorage.setItem('userData', JSON.stringify(userData));
      setUserData(response);
      setIsLoading(false);
      if (role === 'HOD' || role === 'DEAN' || role === 'HOU' || role === 'CS' || role === 'PT' || role === 'DPT' || role === 'HNASES' || role === 'HNASEJ') {
        navigate('/portal');
      } else if (role === 'RSWEP' === 'NTSWEP') {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error.message)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  }

  return (
    <Box display='flex'>
      <Box
       className="w-full md:w-[50%] bg-[#17082D] md:bg-white"
        display='flex'
        flexDirection='column'
        h={"100vh"}
        alignItems='center'
        justifyContent='center'>
        <Box className="absolute top-4 left-3 md:top-6 md:left-4">
          <Image className="h-[45px] w-[45px] md:w-[60px] md:h-[60px] xl:w-[72px] xl:h-[72px]" src={logo} />
        </Box>
        <Box
          display='flex'
        className="w-[80%] md:w-[70%] xl:w-[60%]"
          alignItems='center'
          justifyContent='center'
          flexDirection={"column"}>
          <h2 mt='32' fontWeight='bold' fontSize={"4xl"} className="text-white md:text-black md:hidden" >
            Sign in
          </h2>
          <h2 mt='32' fontWeight='bold' fontSize={"4xl"} className="hidden md:block text-black" >
            Sign in
          </h2>
          <FormControl my='10' onSubmit={login}>
            <form>
              <div mt={'10'} mb='10'>
                <Input
                  type='text'
                  focusBorderColor='#984779'
                  ref={userRef}
                  value={identity} onChange={(e) => setIdentity(e.target.value)}
                  placeholder='Enter Staff ID No'
                  className="bg-white min-w-[320px]"
                  required
                />
              </div>
              <div className="relative" display={"flex"} alignItems='center'>
                <InputGroup mt='4' >
                  <Input className="relative bg-white" display={"flex"} focusBorderColor='#984779' type={open === false ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                  />
                  <InputRightElement>
                    <div
                      className="text-2xl "
                      style={{ cursor: 'pointer', marginLeft: '-2rem' }} // Adjusted margin for positioning
                      onClick={toggle}
                    >
                      {open === false ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </div>
                  </InputRightElement>
                </InputGroup>
              </div>

              <Box my='5' display={"flex"} w='100%' justifyContent='space-between'>
                {/* <Radio ><p className="text-white md:text-[#984779]">Remember me</p></Radio> */}
                {/* <a href='#'> */}
                <Link to='reset-password' >
                  <p fontSize={"16px"} className="text-white md:hidden mb-0">
                    Forgot password?
                  </p>
                  <p fontSize={"16px"} className="hidden md:block text-[#984779] mb-0">
                    Forgot password?
                  </p>
                </Link>
                {/* </a> */}
              </Box>
              <Button
                type="submit"
                mt='3'
               
                w='100%'
                h='12'
                bg='#572753'
                borderRadius='lg'
                disabled={isLoading}>
                {isLoading ? (
                  <MoonLoader color={"white"} size={20} />
                ) : (<p className="text-white  mb-0" > Sign In </p>
                )}
              </Button>
            </form>
          </FormControl>

          {/* <Box my='5' display={"flex"} w='100%' justifyContent='center' onClick={() => navigate('/register')}>
            <Text>New user?</Text>
            <Text fontSize={"16px"} color={"#984779"} px='2'>
              Create Credentials
            </Text>
          </Box> */}
        </Box>
        <a href="http://spadev.devapi.live/" target="_blank" rel="noreferrer" className="text-[#fff] text-center underline md:text-[#984779]" >SPADEV</a>

        <Flex w='100%' justifyContent='space-between' px='5' mt='24'>
          <Text color={"#718096"}>Privacy Policy</Text>
          <Text color={"#718096"}>Copyright 2023</Text>
        </Flex>
      </Box>
      <div className="hidden md:block">
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
      </div>
    </Box>
  );
}
