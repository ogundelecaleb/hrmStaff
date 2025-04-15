import { Box, SimpleGrid } from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";
import { MdPeople } from "react-icons/md";
import { TbFileImport } from "react-icons/tb";
import HodStaffCard from "../../../components/staffcard/HodStaffCard";
import {
  ArrowForwardSquare,
  BoxTick,
  Category2,
  ColorSwatch,
} from "iconsax-react";
import { Link } from "react-router-dom";

const LeaveAppointment = ({ navigate }) => {

  const Card = ({ icon, title, desc }) => {
    return(
    <div className="border rounded-lg flex justify-between flex-col shadow overflow-hidden ">
      <div className="flex justify-between  items-center  p-2">
        <p className="text-sm md:text-lg font-semibold ">{title}</p>
        <div>{icon}</div>
      </div>
      <p className="mt-7 text-gray-500 p-2">{desc}</p>
      <div className="mt-1 ">
        {/* <">
      {desc}
    </p> */}
        <div className="p-2 bg-[#984779] bg-opacity-50 h-10 "></div>
      </div>
    </div>);
  };
  return (
    <div className="bg-[#F7F7F7] p-4 md:p-6 min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/leave/my-leave-applications"
        >
          <Card
          icon={<ColorSwatch
            variant="Bold"
            color="#741b47"
            className=" h-[32px] md:h-[48px]"
          />}
          title="My Leave Applications"
          desc="View all your leave applications"
          
          />
         
        </Link>

        <Link
          to="/leave/leave-application"
          >
          <Card
          icon={ <Category2
            variant="Bold"
            color="#741b47"
            className=" h-[32px] md:h-[48px]"
          />}
          title="Apply for Leave"
          desc="Create a new leave application"
          
          />
         
        </Link>
        <Link
          to="/leave/leave-resumption"
          >
          <Card
          icon={   <ArrowForwardSquare
            variant="Bold"
            color="#741b47"
            className=" h-[32px] md:h-[48px]"
          />}
          title="Resumption of Duty Certificate"
          desc="Update your leave resumption details"
          
          />
         
        </Link>

        {/* <Link
          to="/leave/my-leave-resumption"
          >
          <Card
          icon={   <BoxTick
            variant="Bold"
            color="#741b47"
            className=" h-[32px] md:h-[48px]"
          />}
          title="Resumption Applications"
          desc="Update your leave resumption details"
          
          />
         
        </Link> */}



       
      </div>
    </div>
  );
};
export default LeaveAppointment;
