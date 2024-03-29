import {
    Box,
    Button,
    Flex,
    FormControl,
    Image,
    InputGroup,
    InputRightElement,
    Input,
    Radio,
    Text,
  } from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../asset/logo(small).svg";
import React from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import api from "../../api";

  export default function UpdatePassword() {

    const location = useLocation();
    const navigate = useNavigate();
    const { email, code } = location.state;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);

    const toggle = () => {
      setOpen(!open);
    };

    const toggles = () => {
      setOpens(!opens);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        const response = await api.changePassword({ email, code, password, password_confirmation:confirmPassword });
        console.log("Response of change password:", response);
        enqueueSnackbar(response.message, { variant: "success" });
        setIsLoading(false);
        navigate('/');
      } catch (error) {
        console.log(error.message);
        enqueueSnackbar(error.message, { variant: "error" });
        setIsLoading(false);
      }
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
            <Text mt='32' fontWeight='bold' my='10' fontSize={"4xl"}>
             Forget Password
            </Text>
            <FormControl my='2' onSubmit={handleSubmit}>
              <form>
                <div className="relative" display={"flex"} alignItems='center'>
                  <InputGroup mt='2' >
                    <Input
                      className="relative"
                      focusBorderColor='#984779'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={open === false ? "password" : "text"}
                      placeholder='New Password'
                    />
                    <InputRightElement>
                      <div
                        className="text-2xl"
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

                <div className="relative" display={"flex"} alignItems='center'>
                  <InputGroup mt='5' >
                    <Input
                      focusBorderColor='#984779'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type={opens === false ? "password" : "text"}
                      placeholder='Confirm New Password'
                    />
                    <InputRightElement>
                      <div
                        className="text-2xl"
                        style={{ cursor: 'pointer', marginLeft: '-2rem' }} // Adjusted margin for positioning
                        onClick={toggles}
                      >
                        {opens === false ? (
                          <AiFillEye />
                        ) : (
                          <AiFillEyeInvisible />
                        )}
                      </div>
                    </InputRightElement>
                  </InputGroup>
                </div>
            
                <Button
                  disabled={isLoading} type="submit"
                  mt='3'
                  color={"white"}
                  w='100%'
                  h='12'
                  bg='#572753'
                  borderRadius='lg'>
                  {isLoading ? (
                    <MoonLoader color={"white"} size={20} />
                    ) : ( <>Change Password</>
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
  