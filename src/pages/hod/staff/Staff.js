import React from "react";
import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { TbFileImport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import HodStaffCard from "../../../components/staffcard/HodStaffCard";
const Staff = () => {
  const navigate = useNavigate();
  return (
    <Box px='6' mt='4' >
      <SimpleGrid columns={{base: 1, md:2}} spacing={{base: 3, md:5}}>
        <HodStaffCard
          label={"Certification of Assumption of Duty"}
          Icon={<MdPeople size={24} color='#984779' />}
          CardBgColor={"#E4C0D3"}
          labelColor={"#984779"}
          IconBorderColor={"#984779"}
          Action={() => navigate("assumption-of-Duty")}
        />
        {/* <HodStaffCard
          label={"Temporary Staff"}
          Icon={<MdPeople size={24} color='EDF2F7' />}
          CardBgColor={"#17082DF0"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("temporary-staff")}
        />

        <HodStaffCard
          label={"Contract Staff"}
          Icon={<BsCheckCircle size={24} color='EDF2F7' />}
          CardBgColor={"#0F0583"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("contract-staff")}
        /> */}
        <HodStaffCard
          label={"Temporary Regularized Appointment"}
          Icon={<TbFileImport size={24} color='EDF2F7' />}
          CardBgColor={"#6aa84f"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("temporary-regularized-appointment")}
        />
        <HodStaffCard
          label={"Confirmation of Appointment"}
          Icon={<TbFileImport size={24} color='EDF2F7' />}
          CardBgColor={"#FC3400"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("confirmed-appointments")}
        />
        <HodStaffCard
          label={"Withdrawal of Appointment"}
          Icon={<TbFileImport size={24} color='EDF2F7' />}
          CardBgColor={"#b45f06"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("withdrawal-appointments")}
        />
      </SimpleGrid>
    </Box>
  );
};

export default Staff;
