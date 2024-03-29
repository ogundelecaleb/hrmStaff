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
import logo from "../asset/logo(small).svg";
import React from "react";
// import Slider from "react-slick";
// import DashAdmin from "../pages/AdminDashboard/DashAdmin";
import { useNavigate } from "react-router-dom";

export default function CreatePassword() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => setInput(e.target.value);
  //   var settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //   };
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
            Set Account Password
          </Text>
          <FormControl my='2'>
            <Input
              type='password'
              focusBorderColor='#984779'
              value={input}
              onChange={handleInputChange}
              placeholder='Choose Password'
            />
          </FormControl>
          <FormControl my='5' >
            <Input
              type='password'
              focusBorderColor='#984779'
              value={input}
              onChange={handleInputChange}
              placeholder='Confirm Password'
            />
          </FormControl>
          <Button
          onClick={() => navigate('/')}
            mt='3'
            color={"white"}
            w='100%'
            h='12'
            bg='#572753'
            borderRadius='lg'>
              Create Account
          </Button>
          
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
