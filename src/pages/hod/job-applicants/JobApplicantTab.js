import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
} from "@chakra-ui/react";
import { reuseAbleColor } from "../../../components/Color";
import ApplicantsProfile from "./ApplicantsProfile";
import Resume from "./Resume";
import HiringProgress from "./HiringProgress";
import AssumptionOfDuty from "./AssumptionOfDuty";

const JobApplicantTab = ({ data }) => {
  return (
    <Tabs position='relative' pt={"2"} variant='unstyled' >
      <Box className='tab-scroll' overflowX={"auto"}>
        <Box className='tb-res-2' position={"relative"}>
          <TabList className='border-bottom'>
            <Tab
              _focus={{ color: "black" }}
              fontWeight={"semibold"}
              color={"gray"}>
              Applicant Profile
            </Tab>
            <Tab
              _focus={{ color: "black" }}
              fontWeight={"semibold"}
              color={"gray"}>
              Resume
            </Tab>
            <Tab
              _focus={{ color: "black" }}
              fontWeight={"semibold"}
              color={"gray"}>
              Hiring Progress
            </Tab>
            <Tab
              _focus={{ color: "black" }}
              fontWeight={"semibold"}
              color={"gray"}>
              Assumption Of Duty
            </Tab>
          </TabList>
          <TabIndicator
            mt='-1.5px'
            height='3px'
            bg={reuseAbleColor.pupple}
            borderRadius='9px 9px 0 0'
          />
        </Box>
      </Box>
      <TabPanels>
        <TabPanel>
          <ApplicantsProfile data={data} />
        </TabPanel>
        <TabPanel>
          <Resume data={data} />
        </TabPanel>
        <TabPanel>
          <HiringProgress data={data} />
        </TabPanel>
        <TabPanel>
          <AssumptionOfDuty data={data} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default JobApplicantTab;
