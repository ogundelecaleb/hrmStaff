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
  const [uploadedDocument2, setUploadedDocument2] = useState(null);
  const [uploadedDocument1, setUploadedDocument1] = useState(null);
  const [isDocument1Uploaded, setIsDocument1Uploaded] = useState(false);
  const [isDocument2Uploaded, setIsDocument2Uploaded] = useState(false);
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
    title:"",
    bloodGroup: "",
    age: ""
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
        maidenName:  userDetails?.maiden_name,
        title: userDetails?.title,
        bloodGroup: userDetails?.blood_group,
        age: userDetails?.age
      });
    }
  }, [userDetails]);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('first_name', formValues.firstName);
    formData.append('title', formValues.title);
    formData.append('last_name', formValues.lastName);
    formData.append('nationality', formValues.nationality);
    formData.append('state_of_origin', formValues.stateOfOrigin);
    formData.append('date_of_birth', formValues.dateOfBirth);
    formData.append('gender', formValues.gender);
    formData.append('marital_status', formValues.marital_status);
    formData.append('maiden_name', formValues.maidenName);
    formData.append('blood_group', formValues.bloodGroup);
    formData.append('birth_certificate', uploadedDocument1);
    formData.append('marriage_certificate', uploadedDocument2);
    formData.append('age', formValues.age);
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

  const onFileChanges = (e, documentNumber) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType === 'application/pdf' || fileType === 'image/jpeg') {
        if (documentNumber === 1) {
          setUploadedDocument1(selectedFile);
          setIsDocument1Uploaded(true);
        } else if (documentNumber === 2) {
          setUploadedDocument2(selectedFile);
          setIsDocument2Uploaded(true);
        }
      } else {
        enqueueSnackbar('Please select a valid PDF or JPEG file.', { variant: 'error' });
      }
    }
  };


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
          <Text color={'black'} className='fs-6 text-muted w-full ' >
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
                  Title
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  required
                  disabled
                  value={formValues.title}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      title: e.target.value,
                    })
                  }
                />
              </div>
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
                  required
                  disabled
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
                   Surname
                </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  required
                  disabled
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
                  required
                  disabled
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
                      disabled
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
                      className="border py-2 px-2 w-full rounded-0"
                      type="text"
                  id="dateInput"
                  required
                  // disabled
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
                      Age
                      <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      className="border py-2 px-2 w-full rounded-0"
                      type="text"
                  id="dateInput"
                  required
                  // disabled
                  value={formValues.age}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          age: e.target.value,
                        })
                      }
                  //min={new Date().toISOString().split("T")[0]}
                  // Set max attribute to today's date
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
                      className="border py-2 px-2 w-full rounded-0"
                      id="exampleFormControlSelect1"
                      value={formValues.gender}
                      required
                      disabled
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
                      Blood Group <sup className='text-danger'>*</sup>
                    </label>
                    <input
                      type='text'
                      style={{ height: "40px" }}
                      className="border py-2 px-2 w-full rounded-0"
                      id='O+'
                      placeholder=''
                      required
                      value={formValues.bloodGroup}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          bloodGroup: e.target.value,
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
                      Marital Status <sup className='text-danger'>*</sup>
                    </label>
                    <select
                      className="border py-2 px-2 w-full rounded-0"
                      id="exampleFormControlSelect1"
                      value={formValues.marital_status}
                      required
                      
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
              <div class='pb-2'>
                <div className='mb-2'>
                  <label
                    style={{ marginBottom: '10px' }}
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Upload Birth Certicate
                  </label>
                  <input
                    type="file"
                    className="border py-2 px-2 w-full rounded-0"
                    id={`upload_document_1`}
                    onChange={(e) => onFileChanges(e, 1)}
                  />
                  <sup className='text-danger'>Format accepted: Jpeg/Pdf</sup>
                </div>
              </div>
              {formValues.marital_status === "Married" && (<div class='pb-2'>
                <div className='mb-3'>
                  <label
                    style={{ marginBottom: '10px' }}
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Upload Marriage Certicate
                  </label>
                  <input
                    type="file"
                    className="form-control rounded-0"
                    id={`upload_document_1`}
                    onChange={(e) => onFileChanges(e, 2)}
                  />
                  <sup className='text-danger'>Format accepted: Jpeg/Pdf</sup>
                </div>
              </div>)}
              
            </div>
          </div>
          <div className='col-lg-2'></div>
          <div className="row pt-2">
          <p className="text-DARK">
            please report or contact the College Secretary in
            the case of change or addition to any information provided
            above with the exception of permanent address and date of first
            appointment so that this record can be updated appropriately.
          </p>
        </div>
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
