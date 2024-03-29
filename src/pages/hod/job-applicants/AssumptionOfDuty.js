import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftShort, BsPhone } from "react-icons/bs";
import { TbMessage } from "react-icons/tb";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import {
  TabIndicator,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/tabs";
import { Badge, Avatar } from '@chakra-ui/react'
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { BiMessageAltDetail } from "react-icons/bi";

const AssumptionOfDuty = () => {

  return (
    <Stack className='container' p='4'>
     
      <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
            Full Name
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            Precious Akanle
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
            Position
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            Library Assistant
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
            Salary Per Annum{" "}{" "}
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            ₦2,400,000{" "}
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
          Appointment Type{" "}
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            Permanent Appointment
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
          Staff Type{" "}
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            Senior Staff
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
          Date of Assumption of Duty{" "}
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            23rd January 2011
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
            Division/Department/Unit
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            Busiess Administration
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
            CONUNAS
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            Level 1
          </Text>
        </GridItem>
        <GridItem w='100%' h='10'>
          <Text fontSize={"lg"} color='#7C8493' m='0'>
          Grade Level/Step
          </Text>
          <Text fontSize={"lg"} color='#25324B' fontWeight={"medium"}>
            10
          </Text>
        </GridItem>
        
      </Grid>
    </Stack>
  );
};

export default AssumptionOfDuty;
