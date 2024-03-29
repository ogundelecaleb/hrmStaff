import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import logo from "../../asset/logo(small).svg";
import OTPInput from "./Otp"; // Import the correct component
import { useLocation } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function VerificationCode() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { email } = location.state;

  const handleOTPComplete = (otp) => {
    setOtp(otp);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.veriyOtp({ code: otp.join(""), identity: email });
      console.log("Response of reset password:", response);
      enqueueSnackbar(response.message, { variant: "success" });
      setIsLoading(false);
      navigate('/updatepassword', {
        state: {email, code: otp.join("") }});
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex">
      {/* Left Section */}
      <Box
        w={"50vw"}
        display="flex"
        flexDirection="column"
        h={"100vh"}
        alignItems="center"
        justifyContent="center"
      >
        <Box position="absolute" top="5" left="14">
          <Image w="74px" h="71px" src={logo} />
        </Box>
        <Box
          display="flex"
          w="60%"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Text mt="32" fontWeight="bold" my="10" fontSize="4xl">
            Verification Code
          </Text>
          <Text color="#718096">Check your mail</Text>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="center"
            my="2"
          >
            <OTPInput numInputs={6} onComplete={handleOTPComplete} otp={otp} />
          </FormControl>

          <Button
            type="submit"
            mt="10"
            color="white"
            w="100%"
            h="12"
            bg="#572753"
            borderRadius="lg"
            disabled={isLoading}
            onClick={resetPassword}
          >
            {isLoading ? (
              <MoonLoader color="white" size={20} />
            ) : (
              <>Next</>
            )}
          </Button>
        </Box>
        <Flex w="100%" justifyContent="space-between" px="5" mt="24">
          <Text color="#718096">Privacy Policy</Text>
          <Text color="#718096">Copyright 2023</Text>
        </Flex>
      </Box>

      {/* Right Section */}
      <Box
        alignItems="center"
        w="50vw"
        h="100vh"
        bg="#17082D"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Image w="sm" h="xs" src={logo} />
        <Text color="white" fontSize="3xl" mt="6" fontWeight="bold">
          Human Resource Management Portal
        </Text>
      </Box>
    </Box>
  );
}
