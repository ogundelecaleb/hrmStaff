import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { VscCopy } from "react-icons/vsc";
import GetDocument from "../../../../components/getdocument";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FamilyDetails = () => {

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
    spouse_full_name: "",
    spouse_current_address: "",
    spouse_phone: "",
    c1_full_name: "",
    c1_current_address:"",
    c1_relationship: "",
    c1_phone: "",
    c1_date_of_birth: "",
    c1_gender: "",
    c2_full_name: "",
    c2_current_address:"",
    c2_relationship: "",
    c2_phone: "",
    c2_date_of_birth: "",
    c2_gender: ""
  });
  
  useEffect(() => {
    if (userDetails) {
      setFormValues({
        spouse_full_name: userDetails?.spouse_full_name,
        spouse_current_address: userDetails?.spouse_current_address,
        spouse_phone: userDetails?.spouse_phone,
        c1_full_name: userDetails?.c1_full_name,
        c1_current_address: userDetails?.c1_current_address,
        c1_relationship: userDetails?.c1_relationship,
        c1_phone: userDetails?.c1_phone,
        c1_date_of_birth: userDetails?.c1_date_of_birth,
        c1_gender: userDetails?.c1_gender,
        c2_full_name: userDetails?.c2_full_name,
        c2_current_address: userDetails?.c2_current_address,
        c2_relationship: userDetails?.c2_relationship,
        c2_phone: userDetails?.c2_phone,
        c2_date_of_birth: userDetails?.c2_date_of_birth,
        c2_gender: userDetails?.c2_gender
      });
    }
  }, [userDetails]);


  return (
    <div className='container'>
     <div>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <Text color='black' className='fs-5 pt-2 fw-semibold'>Spouse details</Text>
        </div>
        <div className='col-lg-6 pe-'>
          
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Full Name
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                disabled
                value={formValues.spouse_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    spouse_full_name: e.target.value,
                  })
                }
              />
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Current Residential Address
              </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.spouse_current_address}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      spouse_current_address: e.target.value,
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
                    Phone number
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.spouse_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        spouse_phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
        </div>
        <div className='col-lg-2'></div>
      </div>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <p className='fs-5 pt-2 fw-semibold'>Child 1 Details</p>
        </div>
        <div className='col-lg-6 pe-'>
          
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Full name
              </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.c1_full_name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      c1_full_name: e.target.value,
                    })
                  }
                />
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Current Residential Address
              </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.c1_current_address}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      c1_current_address: e.target.value,
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
                    Relationship to you
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.c1_relationship}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c1_relationship: e.target.value,
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
                    Phone number
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.c1_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c1_phone: e.target.value,
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
                      formValues.c1_date_of_birth
                        ? new Date(formValues.c1_date_of_birth)
                        : null
                    }
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toISOString().split('T')[0];
                        setFormValues({
                          ...formValues,
                          c1_date_of_birth: formattedDate,
                        });
                      } else {
                        setFormValues({
                          ...formValues,
                          c1_date_of_birth: "", 
                        });
                      }
                    }}
                    dateFormat="yyyy-MM-dd"
                    disabled
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
                    Gender
                  </label>
                  <select
                    className="form-select rounded-0"
                    id="exampleFormControlSelect1"
                    disabled
                    value={formValues.c1_gender}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c1_gender: e.target.value,
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

        </div>
        <div className='col-lg-2'></div>
      </div>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <p className='fs-5 pt-2 fw-semibold'>Child 2 Details</p>
        </div>
        <div className='col-lg-6 pe-'>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Full name
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                disabled
                value={formValues.c2_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c2_full_name: e.target.value,
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
                    Relationship to you
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.c2_relationship}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c2_relationship: e.target.value,
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
                    Phone number
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.c2_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c2_phone: e.target.value,
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
                      formValues.c2_date_of_birth
                        ? new Date(formValues.c2_date_of_birth)
                        : null
                    }
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toISOString().split('T')[0];
                        setFormValues({
                          ...formValues,
                          c2_date_of_birth: formattedDate,
                        });
                      } else {
                        setFormValues({
                          ...formValues,
                          c2_date_of_birth: "", 
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
                      className="form-select rounded-0"
                      id="exampleFormControlSelect1"
                      value={formValues.c2_gender}
                      disabled
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          c2_gender: e.target.value,
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
          
        </div>
        <div className='col-lg-2'></div>
      </div>
      {/* <div className='row border-top pb-5 mt-4'> */}
        <div className='col-lg-12 py-5 d-flex justify-content-end'>
          {/* <div>
          <button
            className='btn py-2 px-4 me-2  text-white rounded-0'
            style={{ backgroundColor: "#984779" }} disabled={isLoading} type="submit">
              {isLoading ? (
                  <MoonLoader color={"white"} size={20} />
                ) : ( <>Save & Continue</>
                )}
          </button>
          </div> */}
        </div>
      {/* </div> */}
      </div>
    </div>
  );
};

export default FamilyDetails;
