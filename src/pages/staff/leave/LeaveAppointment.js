import { Box, SimpleGrid } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { TbFileImport } from "react-icons/tb";
import HodStaffCard from "../../../components/staffcard/HodStaffCard";
import { ArrowForwardSquare, BoxTick, Category2, ColorSwatch } from "iconsax-react";
import { Link } from "react-router-dom";

const LeaveAppointment = ({ navigate }) => {
  return (
    <Box px="6" mt="4">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 5 }}>
        {/* <HodStaffCard
          label={"My Leave Applications"}
          Icon={<MdPeople size={24} color="#EDF2F7" />}
          CardBgColor={"#6aa84f"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("my-leave-applications")}
        /> */}
        <Link to="/leave/my-leave-applications" className="border h-[280px] md:h-[302px] w-full md:w-[420px] border-[#98a2b3] rounded-lg my-4  p-3 md:p-6 flex flex-col justify-center">
          <div className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] border border-[#EDF2F7] rounded-lg flex justify-center items-center  ">
            <ColorSwatch color="#741b47" className=" h-[32px] md:h-[48px]" />
          </div>
          <p className="mb-0 text-gray-600 text-lg md:text-xl font-medium mt-4 ">
            {" "}
            My Leave Applications
          </p>
        </Link>
        <Link to="/leave/leave-application" className="border h-[280px] md:h-[302px] w-full md:w-[420px] border-[#98a2b3] my-4 rounded-lg  p-3 md:p-6 flex flex-col justify-center">
          <div className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] border border-[#EDF2F7] rounded-lg flex justify-center items-center  ">
            <Category2 color="#741b47" className=" h-[32px] md:h-[48px]" />
         
          </div>
          <p className="mb-0 text-grey-400 text-lg md:text-xl font-medium mt-4 ">
            {" "}
            Apply for Leave
          </p>
        </Link>
        <Link to="/leave/leave-resumption" className="border h-[280px] md:h-[302px] w-full md:w-[420px] border-[#98a2b3] my-4 rounded-lg  p-3 md:p-6 flex flex-col justify-center">
          <div className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] border border-[#EDF2F7] rounded-lg flex justify-center items-center  ">
            <ArrowForwardSquare color="#741b47" className=" h-[32px] md:h-[48px]" />
         
          </div>
          <p className="mb-0 text-gray-600 text-lg md:text-xl font-medium mt-4 ">
            {" "}
            Resumption of Duty Certificate          </p>
        </Link>
        <Link to="/leave/my-leave-resumption" className="border h-[280px] md:h-[302px] w-full md:w-[420px] border-[#98a2b3] my-4 rounded-lg  p-3 md:p-6 flex flex-col justify-center">
          <div className="h-[48px] md:h-[62px] w-[48px] md:w-[62px] border border-[#EDF2F7] rounded-lg flex justify-center items-center  ">
            <BoxTick variant="Bold" color="#741b47" className=" h-[32px] md:h-[48px]" />
         
          </div>
          <p className="mb-0 text-gray-600 text-lg md:text-xl font-medium mt-4 ">
            {" "}
            Resumption Applications
          </p>
        </Link>
        {/* <HodStaffCard
          label={"Apply for Leave"}
          Icon={<MdPeople size={24} color="EDF2F7" />}
          CardBgColor={"#741b47"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("leave-application")}
        /> */}
        {/* <HodStaffCard
          label={"Resumption of Duty Certificate"}
          Icon={<MdPeople size={24} color="#984779" />}
          CardBgColor={"#E4C0D3"}
          labelColor={"#984779"}
          IconBorderColor={"#984779"}
          Action={() => navigate("leave-resumption")}
        />
        <HodStaffCard
          label={"Resumption Applications"}
          Icon={<MdPeople size={24} color="EDF2F7" />}
          CardBgColor={"#17082DF0"}
          labelColor={"#EDF2F7"}
          IconBorderColor={"#EDF2F7"}
          Action={() => navigate("my-leave-resumption")}
        /> */}
      </SimpleGrid>
    </Box>
  );
};
export default LeaveAppointment;
