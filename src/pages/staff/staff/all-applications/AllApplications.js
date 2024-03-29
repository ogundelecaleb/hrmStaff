import React from "react";
import {
  Box,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { TbDirection, TbGridDots } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import AppointmentConfirmation from "./AppointmentConfirmation";
import AppointmentRegularization from "./AppointmentRegularization";
import AppointmentWithrawal from "./AppointmentWithdrawal";
import AssumptionOfDuty from "./AssumptionOfDuty";

const AllApplications = () => {
  return (
    <Box className='container'>
      <Tabs position='relative' isFitted variant='enclosed'>
        <Box className='table-responsive pt-3'>
          <TabList>
            <Tab

              fontWeight={"normal"}
              color='black'>
              Appointment Confirmation
            </Tab>
            <Tab
              fontWeight={"normal"}
              color='black'>
              Appointment Regularization
            </Tab>
            <Tab
              fontWeight={"normal"}
              color='black'>
              {" "}
              Appointment Withdrawal
            </Tab>
            <Tab
              fontWeight={"normal"}
              color='black'>
              Assumption of Duty
            </Tab>
          </TabList>
        </Box>
        <TabIndicator
          mt='2px'
          height='3px'
          bg='blue.500'
          borderRadius='6px 6px 0 0'
          width='45px'
        />
        <TabPanels>
          <TabPanel>
            <AppointmentConfirmation />
          </TabPanel>
          <TabPanel>
            <AppointmentRegularization />
          </TabPanel>
          <TabPanel>
            <AppointmentWithrawal />
          </TabPanel>
          <TabPanel>
            <AssumptionOfDuty />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AllApplications;
