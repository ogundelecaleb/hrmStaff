import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import { RxAvatar } from "react-icons/rx";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';

const PersonalInfo = () => {

  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadinge, setIsLoadinge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  
  function range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }
  
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function fetchUserDetails() {
    setIsLoadinge(true);
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data)
      setIsLoadinge(false);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoadinge(false);
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
    image: "",
    maidenName: "",
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
        image: userDetails?.image,
        maidenName:  userDetails?.maiden_name
      });
    }
  }, [userDetails]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('first_name', formValues.firstName);
    formData.append('last_name', formValues.lastName);
    formData.append('nationality', formValues.nationality);
    formData.append('state_of_origin', formValues.stateOfOrigin);
    formData.append('date_of_birth', formValues.dateOfBirth);
    formData.append('gender', formValues.gender);
    formData.append('marital_status', formValues.marital_status);
    formData.append('maiden_name', formValues.maidenName);
    try {
      const response = await api.updatePinfo(formData);
      console.log("Response: ", response);
      enqueueSnackbar('Information updated successfully', { variant: 'success' });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: 'error' });
      setIsLoading(false);
    }
  }


  return (
    <div>
      {isLoadinge ? (
        <Box
        w={"85vw"}
        display='flex'
        flexDirection='column'
        h={"75vh"}
        alignItems='center'
        justifyContent='center'>
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70" style={{ zIndex: 9999 }}>
        <div className="inline-block">
            <MoonLoader color={"#984779"} size={80} />
          </div>
        </div>
      </Box>
    ) : (
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
          <Text color={'black'} className='fs-6 text-muted' maxW={60} >
            This Image will be shown publicly as your profile picture here and
            on all documents generated in the future
          </Text>
        </Box>
        <Box className='col-lg-2'>
          <Box className=' h-90 w-100 d-flex align-items-center justify-content-space mb-3 mt-3'>
            {userDetails.image ? (
              <Avatar h={'100px'}
                w={'100px'}
                borderWidth={1}
                borderColor={"#ccc"}
                src={userDetails.image} />
            ) : (
              <RxAvatar size={130} color={'#25324B'} />
            )}
          </Box>
          <input className="mb-3" type="file" onChange={onFileChange} />
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
               <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Middle Name
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  value={formValues.maidenName}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      maidenName: e.target.value,
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
                    <DatePicker
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(value)}
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
              
                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
              
                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                          {">"}
                        </button>
                      </div>
                    )}
                      selected={
                        formValues.dateOfBirth
                          ? new Date(formValues.dateOfBirth)
                          : null
                      }
                      onChange={(date) => {
                        if (date instanceof Date && !isNaN(date)) {
                          const formattedDate = date.toISOString().split('T')[0];
                          setFormValues({
                            ...formValues,
                            dateOfBirth: formattedDate,
                          });
                        } else {
                          setFormValues({
                            ...formValues,
                            dateOfBirth: '',
                          });
                        }
                      }}
                      dateFormat="yyyy-MM-dd"
                      className="form-control rounded-0"
                      id="exampleFormControlInput1"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div class='form-group'>
                    <label
                      for='exampleFormControlSelect1'
                      className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                      Gender <sup className='text-danger'>*</sup>
                    </label>
                    <select
                      className="form-select rounded-0"
                      id="exampleFormControlSelect1"
                      value={formValues.gender}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
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
                      value={formValues.marital_status}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          marital_status: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Status</option>
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
              ) : (<>Submit</>
              )}
            </button>
          </div>
        </div>
        {/* </div> */}
      </form>
    </Box>
    )}
    </div>
  );
};

export default PersonalInfo;
