import {
  Avatar,
  Box,
  Link,
  Text,
  WrapItem,
  Spinner,
  Badge,
  Divider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import { RxAvatar } from "react-icons/rx";
import { 
  User, 
  Call, 
  Location, 
  Briefcase, 
  People, 
  Heart, 
  Award, 
  Setting2 
} from "iconsax-react";
import api from "../../../api";

const Settings = ({ reuseableNavigation }) => {
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadinge, setIsLoadinge] = useState(false);
  const [roles, setRoles] = useState([]);

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

  async function fetchRoles() {
    setIsLoadinge(true);
    try {
      const roless = await api.fetchRole();
      setRoles(roless.data);
      setIsLoadinge(false);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      setIsLoadinge(false);
    }
  }
  useEffect(() => {
    fetchUserDetails();
    fetchRoles()
  }, []);

  const DetailItem = ({ label, value, icon }) => {
    if (!value) return null;
    return (
      <div className="flex items-start gap-3 py-2">
        {icon && <div className="text-[#984779] mt-1">{icon}</div>}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-gray-900 font-medium">{value}</p>
        </div>
      </div>
    );
  };

  const SectionCard = ({ title, icon, children, className = "" }) => {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[#984779]">{icon}</div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="space-y-1">{children}</div>
      </div>
    );
  };

  return (
    <div>
      {isLoadinge ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" color="purple.500" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-6">
          {/* Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                {userDetails.image ? (
                  <Avatar
                    h={"120px"}
                    w={"120px"}
                    src={userDetails.image}
                    borderWidth={4}
                    borderColor={"#984779"}
                  />
                ) : (
                  <div className="w-[120px] h-[120px] bg-gray-100 rounded-full flex items-center justify-center border-4 border-[#984779]">
                    <RxAvatar size={80} color={"#984779"} />
                  </div>
                )}
                <Badge
                  position="absolute"
                  bottom="0"
                  right="0"
                  colorScheme="purple"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {userDetails?.role}
                </Badge>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userDetails?.first_name} {userDetails?.last_name}
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  {roles?.find(role => role.name === userDetails?.role)?.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Call size={16} />
                    {userDetails?.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Location size={16} />
                    {userDetails?.email}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => reuseableNavigation("change-password")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#984779] text-white rounded-lg hover:bg-[#7a3660] transition-colors"
                >
                  <Setting2 size={16} />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Personal Information */}
            <SectionCard
              title="Personal Information"
              icon={<User size={20} />}
            >
              <DetailItem label="Title" value={userDetails?.title} />
              <DetailItem label="Date of Birth" value={userDetails?.date_of_birth} />
              <DetailItem label="Age" value={userDetails?.age} />
              <DetailItem label="Gender" value={userDetails?.gender} />
              <DetailItem label="Blood Group" value={userDetails?.blood_group} />
              <DetailItem label="State of Origin" value={userDetails?.state_of_origin} />
              <DetailItem label="Nationality" value={userDetails?.nationality} />
              <DetailItem label="Marital Status" value={userDetails?.marital_status} />
            </SectionCard>

            {/* Contact Information */}
            <SectionCard
              title="Contact Information"
              icon={<Call size={20} />}
            >
              <DetailItem label="Phone Number" value={userDetails?.phone} />
              <DetailItem label="Email Address" value={userDetails?.email} />
              <DetailItem label="Home Address" value={userDetails?.address} />
              <DetailItem label="Contact Address" value={userDetails?.contact_address} />
            </SectionCard>

            {/* Work Details */}
            <SectionCard
              title="Work Details"
              icon={<Briefcase size={20} />}
            >
              <DetailItem label="Staff Number" value={userDetails?.staff_number} />
              <DetailItem label="Date of First Appointment" value={userDetails?.date_of_first_appointment} />
              <DetailItem label="Level" value={userDetails?.level} />
              {userDetails?.unit && (
                <DetailItem label="Office" value={userDetails?.unit?.name} />
              )}
              {userDetails?.department && (
                <>
                  <DetailItem label="Department" value={userDetails?.department?.name} />
                  <DetailItem label="Faculty" value={userDetails?.faculty?.name} />
                </>
              )}
            </SectionCard>

            {/* Family Details */}
            {(userDetails?.spouse?.full_name || userDetails?.children?.length > 0) && (
              <SectionCard
                title="Family Details"
                icon={<People size={20} />}
                className="lg:col-span-2"
              >
                {userDetails?.spouse?.full_name && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Spouse Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem label="Name" value={userDetails?.spouse?.full_name} />
                      <DetailItem label="Phone" value={userDetails?.spouse?.phone} />
                      <DetailItem label="Email" value={userDetails?.spouse?.email} />
                      <DetailItem label="Address" value={userDetails?.spouse?.address} />
                    </div>
                  </div>
                )}
                {userDetails?.children?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Children</h4>
                    <div className="space-y-4">
                      {userDetails?.children?.map((child, index) => (
                        <div key={index} className="border-l-4 border-[#984779] pl-4">
                          <h5 className="font-medium text-gray-600 mb-2">Child {index + 1}</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <DetailItem label="Name" value={child?.full_name} />
                            <DetailItem label="Gender" value={child?.gender} />
                            <DetailItem label="Date of Birth" value={child?.date_of_birth} />
                            <DetailItem label="Phone" value={child?.phone} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </SectionCard>
            )}

            {/* Next of Kin */}
            <SectionCard
              title="Next of Kin & Beneficiaries"
              icon={<Heart size={20} />}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Next of Kin 1 */}
                {userDetails?.k1_full_name && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Next of Kin 1</h4>
                    <DetailItem label="Name" value={userDetails?.k1_full_name} />
                    <DetailItem label="Phone" value={userDetails?.k1_phone} />
                    <DetailItem label="Relationship" value={userDetails?.k1_relationship} />
                  </div>
                )}
                {/* Next of Kin 2 */}
                {userDetails?.k2_full_name && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Next of Kin 2</h4>
                    <DetailItem label="Name" value={userDetails?.k2_full_name} />
                    <DetailItem label="Phone" value={userDetails?.k2_phone} />
                    <DetailItem label="Relationship" value={userDetails?.k2_relationship} />
                  </div>
                )}
              </div>
              {/* Beneficiaries */}
              {userDetails?.beneficiary?.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Beneficiaries</h4>
                  <div className="space-y-4">
                    {userDetails?.beneficiary?.map((ben, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-4">
                        <h5 className="font-medium text-gray-600 mb-2">Beneficiary {index + 1}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          <DetailItem label="Name" value={ben?.full_name} />
                          <DetailItem label="Relationship" value={ben?.relationship} />
                          <DetailItem label="Percentage" value={`${ben?.percentage}%`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Academic Qualifications */}
            {userDetails?.staff_academic_qualification?.length > 0 && (
              <SectionCard
                title="Academic Qualifications"
                icon={<Award size={20} />}
              >
                <div className="space-y-4">
                  {userDetails?.staff_academic_qualification?.map((acad, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium text-gray-600 mb-2">Qualification {index + 1}</h5>
                      <DetailItem label="Institution" value={acad?.name_of_institution} />
                      <DetailItem label="Qualification" value={acad?.qualification} />
                      <DetailItem label="End Year" value={acad?.end_year} />
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;