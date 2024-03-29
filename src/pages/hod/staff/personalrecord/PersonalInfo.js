import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { VscCopy } from "react-icons/vsc";
import GetDocument from "../../../../components/getdocument";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PersonalInfo = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState([]);


  useEffect(() => {

    if (id) {
      api.getStaffbyID(id)
      .then(response => {
        setUserDetails(response.data)
      })
      .catch(error => {
        enqueueSnackbar("Error fetching staff details", { variant: "error" });
      });
    }
  }, [id]);

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


  return (
    <Box className=''>
      <Box className='pb-2 border-bottom'>
        <Text color={'black'} className='fs-5 pt-2 fw-semibold'>Staff Basic Information</Text>
        <Text className='fs-6 text-muted' style={{ marginTop: "-15px" }}>
          Detailed personal information about {userDetails?.first_name }
        </Text>
      </Box>
      <Box className='row border-bottom'>
        <Box className='col-lg-4'>
        <Text color={'black'} className='fs-5 pt-2 fw-semibold'>Profile Photo</Text>
        <Text color={'black'}  className='fs-6 text-muted' maxW={60} >
            This Image will be shown publicly as your profile picture here and
            on all documents generatedin the future
          </Text>
        </Box>
        <Box className='col-lg-2'>
          <Box className=' h-100 w-100 d-flex align-items-center justify-content-center'>
            <Image
              // height='150px'
              sizes="150px"
             borderRadius={'full'}
              src='https://bit.ly/prosper-baba'
              alt='/'
            />
          </Box>
        </Box>
        <Box className='col-lg-4'>
          {" "}
          <GetDocument
            Icon={<VscCopy size={40} color='#5542F6' />}
            details={"PDF"}
          />
          {""}
        </Box>
      </Box>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <Text color='black' className='fs-5 pt-2 fw-semibold'>Personal Details</Text>
        </div>
        <div className='col-lg-6 pe-'>
          <form>
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
                Last Name
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
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
                    disabled
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
                    Date of Birth
                  </label>
                  <DatePicker
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
                      disabled
                    />
                </div>
              </div>
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Gender
                  </label>
                  <select
                    disabled
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
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className='col-lg-2'></div>
      </div>
      {/* <div className='row border-top pb-5 mt-4'>
        <div className='col-lg-12 py-5 d-flex justify-content-end'>
          <div>
            <button
              className='btn py-2 px-4 me-2  text-white rounded-0'
              style={{ backgroundColor: "#984779" }}>
              Save & Continue
            </button>
          </div>
        </div>
      </div> */}
    </Box>
  );
};

export default PersonalInfo;
