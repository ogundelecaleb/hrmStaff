import React, { useState, useEffect } from "react";
import { BiChevronDown, BiSearchAlt2 } from "react-icons/bi";
import { AiFillBell, AiOutlineCaretDown } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import {
  Box,
  Button,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../utils/utils";
import api from "../api";

const Navbar = ({ mobile, setMobile, display, reuseableNavigation }) => {
  // const location = useLocation();
  // console.log(location.pathname);

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [unreadMsg, setUnreadMsg] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  let Heading = "";

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      //console.log("User Details:", userDetails);
      setUserDetails(userDetails);
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  async function fetchUnreadmsg() {
    try {
      const unreadMsg = await api.fetchUnreadmsg();
      console.log("unread message===>>:", unreadMsg);
      setUnreadMsg(unreadMsg?.unread_count);
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  useEffect(() => {
    fetchUserDetails();
    fetchUnreadmsg();
  }, []);

  if (userDetails?.data?.role === "HOD") {
    Heading = "HEAD OF DEPARTMENT(HOD)";
  }if (userDetails?.data?.role === "HOU") {
      Heading = "HEAD OF UNIT(HOU)";


    } else if (userDetails?.data?.role === "HNASES") {
      Heading = "OFFICE OF HEAD OF NASE SENIOR";
    } else if (userDetails?.data?.role === "HNASEJ") {
      Heading = "OFFICE OF HEAD OF NASE JUNIOR";
    } else if (userDetails?.data?.role === "CS") {
    Heading = "OFFICE OF THE COLLEGE SECRETARY";
  } else if (userDetails?.data?.role === "PT") {
    Heading = "OFFICE OF THE PROVOST";
  } else if (userDetails?.data?.role === "DEAN") {
    Heading = "OFFICE OF THE DEAN";
  } else if (userDetails?.data?.role === "RSWEP") {
    Heading = "STAFF DASHBOARD";
  } else if (userDetails?.data?.role === "NTSWEP") {
    Heading = "STAFF DASHBOARD";
  } else if (userDetails?.data?.role === "DPT") {
    Heading = "OFFICE OF THE DEPUTY PROVOST";
  }


  return (
    <div
    className='border text-dark flex justify-between items-center sticky-top'
    style={{ width: "100%", backgroundColor: "white" }}
    >
      <div className="burger flex gap-3 items-center ">
        <div className={display ? "d-block " : "d-none"}>
          <button className=" text-dark " onClick={() => setMobile(!mobile)}>
            <i className="ms-3 fa fa-bars"></i>
          </button>
        </div>
        <Text
          pl="3"
          className="text-[16px] md:text-[18px] font-semibold lg:font-bold"
        >
          {Heading}
        </Text>
      </div>
      <div
        className="d-flex justify-content-end align-items-center pe-3"
        style={{ height: "70px", gap: "20px" }}
      >
        <div
          className="d-flex gap-3"
          style={{ cursor: "pointer" }}
          id="notification"
        >
          <div>
            <BiSearchAlt2 size="25" style={{ color: "#84818A" }} />
          </div>
          <Link
            onClick={() => reuseableNavigation("notification")}
            className="relative"
          >
            <AiFillBell size="25" style={{ color: "#84818A" }} />
            <div className="h-[17px] w-[17px] rounded-full bg-red-500 flex justify-center items-center absolute -top-1 -right-2">
              <p className="text-white text-xs m-0">{unreadMsg}</p>
            </div>
          </Link>
          {/* <Link onClick={() => reuseableNavigation("inbox")}>
            <MdEmail size='25' style={{ color: "#84818A" }} />
          </Link> */}
        </div>
        <Box className="border rounded">
          <Menu>
            <MenuButton
              width={{ base: "150px", md: "200px" }}
              style={{ height: "40px" }}
              as={Button}
              rightIcon={<AiOutlineCaretDown color="#84818A" />}
            >
              <Box display={"flex"} alignItems="center">
                {userDetails?.data?.image ? (
                  <Avatar
                    h={"25px"}
                    w={"25px"}
                    borderWidth={1}
                    borderColor={"#ccc"}
                    src={userDetails?.data?.image}
                  />
                ) : (
                  <RxAvatar size={25} color={"#000"} />
                )}

                <Text m="0" fontWeight={600} fontSize="14px">
                  {userDetails?.data?.first_name} {userDetails?.data?.last_name}
                </Text>
              </Box>
            </MenuButton>
            <MenuList>
              <MenuItem
                fontWeight={600}
                fontSize="20px"
                _hover={{ bg: "#984779", color: "white" }}
                minH="48px"
                onClick={() => reuseableNavigation("setting")}
              >
                Profile
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <div className={display && !mobile ? "d-block " : "d-none"}>
          <button className=" text-dark burger " onClick={() => setMobile(!mobile)}>
            <i className="ms-3 fa fa-bars"></i>
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default Navbar;
