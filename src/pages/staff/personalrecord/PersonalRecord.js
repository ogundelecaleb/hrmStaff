import {
  Box,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import React from "react";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import NextOfKin from "./NextOfKin";
import FamilyDetails from "./FamilyDetails";
import AcademicDetails from "./AcademicDetails";

const PersonalRecord = () => {
  return (
    <Box className="px-4 md:px-5 xl:px-6">
      <Tabs position="relative" variant="unstyled">
        <Box className="table-responsive pt-3">
          <TabList>
            <Tab
              fontSize={"lg"}
              fontWeight={"semibold"}
              _focus={{ fontWeight: "bold" }}
              color="black"
            >
              <p className="whitespace-nowrap mb-0">Personal information</p>
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color="black"
            >
              <p className="whitespace-nowrap mb-0">Contact information</p> 
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color="black"
            >
                <p className="whitespace-nowrap mb-0">Next of kin/Beneficiary</p>  
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color="black"
            >
              {" "}
              <p className="whitespace-nowrap mb-0"> Family Details</p>
            </Tab>
            <Tab
              _focus={{ fontWeight: "bold" }}
              fontWeight={"semibold"}
              fontSize={"lg"}
              color="black"
            >
                 <p className="whitespace-nowrap mb-0"> Academic Details</p>
            </Tab>
          </TabList>
        </Box>
        <TabIndicator
          mt="-1.5px"
          height="3px"
          bg="blue.500"
          borderRadius="6px 6px 0 0"
          width="50px"
        />
        <TabPanels>
          <TabPanel>
            <PersonalInfo />
          </TabPanel>
          <TabPanel>
            <ContactInfo />
          </TabPanel>
          <TabPanel>
            <NextOfKin />
          </TabPanel>
          <TabPanel>
            <FamilyDetails />
          </TabPanel>
          <TabPanel>
            <AcademicDetails />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PersonalRecord;
