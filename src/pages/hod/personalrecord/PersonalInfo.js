import { Avatar,Box, Image, Text } from "@chakra-ui/react";
import React, { useState , useEffect} from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import { RxAvatar } from "react-icons/rx";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfo = () => {

  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data)
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    stateOfOrigin: "",
    dateOfBirth: "",
    gender: "",
    marital_status: "",
    image: ""
  });
  
  useEffect(() => {
    fetchUserDetails();
  }, []);
  
  useEffect(() => {
    if (userDetails) {
      setFormValues({
        firstName: userDetails?.first_name,
        lastName: userDetails?.last_name,
        nationality: userDetails?.nationality,
        stateOfOrigin: userDetails?.state_of_origin,
        dateOfBirth: userDetails?.date_of_birth,
        gender: userDetails?.gender,
        marital_status: userDetails?.marital_status,
        image: userDetails?.image
      });
    }
  }, [userDetails]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
  
    try {
     
      let imageBase64 = null;
      if (formValues.image instanceof File) {
        const reader = new FileReader();
        reader.readAsDataURL(formValues.image);
        reader.onload = async () => {
          imageBase64 = reader.result.split(",")[1];
          const payload = {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            nationality: formValues.nationality,
            state_of_origin: formValues.stateOfOrigin,
            date_of_birth: formValues.dateOfBirth,
            gender: formValues.gender,
            marital_status: formValues.marital_status,
            image: imageBase64,
          };
          console.log(payload)
          try {
            const response = await api.updatePinfo(payload);
            console.log("Response: ", response);
            enqueueSnackbar("Information updated successfully", { variant: "success" });
            setIsLoading(false);
          } catch (error) {
            console.error(error);
            enqueueSnackbar(error.message, { variant: "error" });
            setIsLoading(false);
          }
        };
      } else {
        const payload = {
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          nationality: formValues.nationality,
          state_of_origin: formValues.stateOfOrigin,
          date_of_birth: formValues.dateOfBirth,
          gender: formValues.gender,
          marital_status:formValues.marital_status,
        };
  
        try {
          const response = await api.updatePinfo(payload);
          console.log("Response: ", response);
          enqueueSnackbar("Information updated successfully", { variant: "success" });
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          enqueueSnackbar(error.message, { variant: "error" });
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }
  

  return (
    <Box className=''>
      <Box className='pb-2 border-bottom'>
        <Text color={'black'} className='fs-5 pt-2 fw-semibold'>Basic Information</Text>
        <Text className='fs-6 text-muted' style={{ marginTop: "-15px" }}>
          This is your personal information that you can update any time
        </Text>
      </Box>
      <Box className='row border-bottom pb-10'>
        <Box className='col-lg-4'>
        <Text color={'black'} className='fs-5 pt-2 fw-semibold'>Profile Photo</Text>
        <Text color={'black'}  className='fs-6 text-muted' maxW={60} >
            This Image will be shown publicly as your profile picture here and
            on all documents generated in the future
          </Text>
        </Box>
        <Box className='col-lg-2'>
          <Box className=' h-90 w-100 d-flex align-items-center justify-content-space mb-3 mt-3'>
            {userDetails.image ? (
              <Avatar
                h={'100px'}
                w={'100px'}
                src={userDetails.image}
                borderWidth={1}
                borderColor={"#ccc"}
              />
            ) : (
              <RxAvatar size={130} color={'#25324B'}/>
            )}
             
          </Box>
          <input type="file" id={`image`}
          className="mb-3"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              image: e.target.files[0],
            })
          }/>
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <div className='row mt-4 border-bottom pb-4 pb-4'>
          <div className='col-lg-4'>
            <Text color='black' className='fs-5 pt-2 fw-semibold'>Personal Details</Text>
          </div>
          <div className='col-lg-6 pe-'>
            <div>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  First Name
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  required
                  placeholder=''
                  value={formValues.firstName}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Last Name
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  required
                  placeholder=''
                  value={formValues.lastName}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div class='row'>
                <div className='col-lg-6'>
                  <div class='form-group'>
                    <label
                      for='exampleFormControlSelect1'
                      className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                      Nationality
                    </label>
                    <input
                      type='text'
                      style={{ height: "40px" }}
                      class='form-control rounded-0'
                      id='exampleFormControlInput1'
                      placeholder=''
                      required
                      value={formValues.nationality}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          nationality: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div class='form-group'>
                    <label
                      for='exampleFormControlSelect1'
                      className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                      State of Origin
                    </label>
                    <input
                      type='text'
                      style={{ height: "40px" }}
                      class='form-control rounded-0'
                      id='exampleFormControlInput1'
                      placeholder=''
                      required
                      value={formValues.stateOfOrigin}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          stateOfOrigin: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              
              <div class='row'>
                <div className='col-lg-6'>
                  <div class='form-group'>
                    <label
                      for='exampleFormControlSelect1'
                      className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                      Date of Birth{" "}
                      <sup className='text-danger'>*</sup>
                    </label>

                    <input
                  className=" rounded-0"
                  type="date"
                  id="dateInput"
                  required
                  value={formValues.dateOfBirth}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          dateOfBirth: e.target.value,
                        })
                      }
                  //min={new Date().toISOString().split("T")[0]}
                  max={new Date().toISOString().split("T")[0]}
                  // Set max attribute to today's date
                />
                   
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div class='form-group'>
                    <label
                      for='exampleFormControlSelect1'
                      className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                      Marital Status <sup className='text-danger'>*</sup>
                    </label>
                    <select
                      className="form-select rounded-0"
                      id="exampleFormControlSelect1"
                      required
                      value={formValues.marital_status}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          marital_status: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-2'></div>
        </div>
        {/* <div className='row border-top pb-5 mt-4'> */}
          <div className='col-lg-12 py-5 d-flex justify-content-end'>
            <div>
              <button
                className='btn py-2 px-4 me-2  text-white rounded-0'
                style={{ backgroundColor: "#984779" }} disabled={isLoading} type="submit">
                  {isLoading ? (
                      <MoonLoader color={"white"} size={20} />
                    ) : ( <>Save</>
                    )}
              </button>
            </div>
          </div>
        {/* </div> */}
      </form>
    </Box>
  );
};

export default PersonalInfo;
