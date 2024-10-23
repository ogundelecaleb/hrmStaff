import {
  Avatar,
  AvatarIcon,
  Box,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import { RxAvatar } from "react-icons/rx";
import { MoonLoader } from "react-spinners";

const Settings = ({ reuseableNavigation }) => {
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadinge, setIsLoadinge] = useState(false);

  async function fetchUserDetails() {
    setIsLoadinge(true);
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data);
      setIsLoadinge(false);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoadinge(false);
    }
  }
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const Details = ({ label, fullName }) => {
    return (
      <Box mt="3" className="flex items-center ">
        <Text fontWeight={"medium"} m="0" color={"#7C8493"} fontSize={"16px"}>
          {label}
        </Text>
        <Text fontWeight={"medium"} m="0" color={"#7C8493"} fontSize={"16px"}>
          {":"}
        </Text>
        <Text
          fontWeight={"medium"}
          m="0"
          color={"#25324B"}
          fontSize={"16px"}
          className="pl-2"
        >
          {fullName}
        </Text>
      </Box>
    );
  };

  return (
    <div>
      {isLoadinge ? (
        <Box
          w={"85vw"}
          display="flex"
          flexDirection="column"
          h={"80vh"}
          alignItems="center"
          justifyContent="center"
        >
          <div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70"
            style={{ zIndex: 9999 }}
          >
            <div className="inline-block">
              <MoonLoader color={"#984779"} size={80} />
            </div>
          </div>
        </Box>
      ) : (
        <Box
          className="px-4 md:px-6"
          style={{ width: "100%", height: "900px" }}
        >
          <Box borderBottom="1px solid #EBEAED">
            <Text fontSize={28} py="3" m="0" fontWeight="medium">
              Profile
            </Text>
          </Box>
          <Box pt="10">
            <WrapItem>
              {userDetails.image ? (
                <Avatar
                  h={"100px"}
                  w={"100px"}
                  src={userDetails.image}
                  borderWidth={1}
                  borderColor={"#ccc"}
                />
              ) : (
                <RxAvatar size={130} color={"#25324B"} />
              )}
            </WrapItem>
            <div className="grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-3  gap-5">
              <Box>
                <Box>
                  <p className="text-lg font-semibold mt-2 mb-[0px]">
                    Personal Information
                  </p>
                  <Details
                    label={"Title"}
                    fullName={`${userDetails?.title} `}
                  />
                  <Details
                    label={"Full Name"}
                    fullName={`${userDetails?.first_name} ${userDetails?.last_name}`}
                  />

                  <Details
                    label={"Date of Birth"}
                    fullName={userDetails?.date_of_birth}
                  />
                  <Details label={"Age"} fullName={userDetails?.age} />
                  <Details label={"Gender"} fullName={userDetails?.gender} />
                  <Details
                    label={"Blood Group"}
                    fullName={userDetails?.blood_group}
                  />

                  <Details
                    label={"State of Origin"}
                    fullName={userDetails?.state_of_origin}
                  />
                  <Details
                    label={"Nationality"}
                    fullName={userDetails?.nationality}
                  />
                  <Details
                    label={"Marital Status"}
                    fullName={userDetails?.marital_status}
                  />
                </Box>
                <Box mt="20" display={"flex"} flexDirection={"column"} gap={5}>
                  {/* <Link
                    fontSize={"16px"}
                    fontWeight={"medium"}
                    onClick={() => reuseableNavigation("edit-profile")}
                    color={"#984779"}
                  >
                    Edit Details
                  </Link> */}
                  <Link
                    fontSize={"16px"}
                    fontWeight={"medium"}
                    onClick={() => reuseableNavigation("change-password")}
                    color={"#984779"}
                  >
                    Change Password
                  </Link>
                </Box>
              </Box>
              <Box>
                <Box>
                  <p className="text-lg font-semibold mt-2 mb-[0px]">
                    Contact Information
                  </p>
                  <Details
                    label={"Phone Number "}
                    fullName={userDetails?.phone}
                  />
                  <Details
                    label={"E-mail Address "}
                    fullName={userDetails?.email}
                  />
                  <Details
                    label={"Home Address "}
                    fullName={userDetails?.address}
                  />

                  <Details
                    label={"Contact Address "}
                    fullName={userDetails?.contact_address}
                  />

                  <p className="mt-2 mb-0 text-gray-900 underline">
                    Work Details
                  </p>
                  <Details
                    label={"Date of First Appointment"}
                    fullName={userDetails?.date_of_first_appointment}
                  />

                  {userDetails?.unit && (
                    <>
                      <Details
                        label={"Office"}
                        fullName={userDetails?.unit?.name}
                      />
                    </>
                  )}

                  {userDetails?.department && (
                    <>
                      <Details
                        label={"Department"}
                        fullName={userDetails?.department?.name}
                      />
                      <Details
                        label={"Faculty"}
                        fullName={userDetails?.faculty?.name}
                      />
                    </>
                  )}
                  <Details label={"Level"} fullName={userDetails?.level} />

                  <Details label={"Designation"} fullName={userDetails?.role} />
                </Box>
              </Box>
              <Box>
                <Box>
                  <p className="text-lg font-semibold mt-2 mb-[0px]">
                    Family Details
                  </p>

                  {userDetails?.spouse_full_name && (
                    <>
                      <Details
                        label={"Spouse Name"}
                        fullName={userDetails?.spouse?.full_name}
                      />
                      <Details
                        label={"Spouse Contact"}
                        fullName={userDetails?.spouse?.phone}
                      />
                      <Details
                        label={"Spouse Email"}
                        fullName={userDetails?.spouse?.email}
                      />
                      <Details
                        label={"Spouse Address"}
                        fullName={userDetails?.spouse?.address}
                      />
                    </>
                  )}

                  <p className="mt-2 mb-0 text-gray-900 underline">
                    Children Details
                  </p>

                  {userDetails &&
                    userDetails?.children?.map((child) => (
                      <>
                        <Details
                          label={"Child Name"}
                          fullName={child?.full_name}
                        />
                        <Details
                          label={"Child Phone"}
                          fullName={child?.phone}
                        />
                        <Details
                          label={"Child Email"}
                          fullName={child?.email}
                        />
                        <Details
                          label={"Child Gender"}
                          fullName={child?.gender}
                        />
                        <Details
                          label={"Child Date Of Birth"}
                          fullName={child?.date_of_birth}
                        />
                      </>
                    ))}
                </Box>
              </Box>
              <Box>
                <p className="text-lg font-semibold mt-2 mb-[0px]">
                  Next of Kin and Beneficiaries
                </p>

                <p className="mt-2 mb-0 text-gray-900 underline">
                  Next of Kin 1
                </p>
                <Details
                  label={"Full Name "}
                  fullName={userDetails?.k1_full_name}
                />
                <Details
                  label={"Phone Number  "}
                  fullName={userDetails?.k1_phone}
                />
                <Details
                  label={"Relationship To You  "}
                  fullName={userDetails?.k1_relationship}
                />

                <p className="mt-2 mb-0 text-gray-900 underline">
                  Next of Kin 2
                </p>
                <Details
                  label={"Full Name "}
                  fullName={userDetails?.k2_full_name}
                />
                <Details
                  label={"Phone Number  "}
                  fullName={userDetails?.k2_phone}
                />
                <Details
                  label={"Relationship To You  "}
                  fullName={userDetails?.k2_relationship}
                />

                <p className="mt-2 mb-0 text-gray-900 underline">
                  Beneficiaries
                </p>

                {userDetails &&
                  userDetails?.beneficiary?.map((ben, index) => (
                    <>
                      <p className="mt-2 mb-0 text-gray-900">{index + 1}</p>
                      <Details label={"Name"} fullName={ben?.full_name} />
                      <Details label={"phone "} fullName={ben?.phone} />
                      <Details label={"Email "} fullName={ben?.email} />
                      <Details
                        label={"Relationship To You "}
                        fullName={ben?.relationship}
                      />
                      <Details
                        label={"Percentage (%) "}
                        fullName={ben?.percentage}
                      />
                    </>
                  ))}
              </Box>
              <Box>
                <p className="text-lg font-semibold mt-2 mb-[0px]">
                  Academic Qualification
                </p>

                {userDetails &&
                  userDetails?.staff_academic_qualification?.map(
                    (acad, index) => (
                      <>
                        <p className="mt-2 mb-0 text-gray-900">{index + 1}</p>
                        <Details
                          label={"Institution"}
                          fullName={acad?.name_of_institution}
                        />
                        <Details
                          label={"Qualification "}
                          fullName={acad?.qualification}
                        />
                        <Details
                          label={"Start Date "}
                          fullName={acad?.start_year}
                        />
                        <Details
                          label={"End Date "}
                          fullName={acad?.end_year}
                        />
                      </>
                    )
                  )}
              </Box>
            </div>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Settings;
