import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { VscCopy } from "react-icons/vsc";
import GetDocument from "../../../../components/getdocument";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NextOfKin = () => {

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
        k1_full_name: userDetails?.k1_full_name,
        k1_relationship: userDetails?.k1_relationship,
        k1_phone: userDetails?.k1_phone,
        k2_full_name: userDetails?.k2_full_name,
        k2_relationship: userDetails?.k2_relationship,
        k2_phone: userDetails?.department?.k2_phone,
        beneficiary_full_name: userDetails?.beneficiary_full_name,
        beneficiary_relationship: userDetails?.beneficiary_relationship,
        beneficiary_phone: userDetails?.beneficiary_phone,
      });
    }
  }, [userDetails]);

  return (
    <div className='container'>
       <div>
        <div className='row mt-4 pb-4 pb-4'>
          <div className='col-lg-4'>
            <Text color={'black'} className='fs-5 pt-2 fw-semibold'>Next of Kin 1</Text>
          </div>
          <div className='col-lg-6 pe-'>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Full Name <sup className='text-danger'>*</sup>
              </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.k1_full_name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      k1_full_name: e.target.value,
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
                    Relationship to you <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.k1_relationship}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        k1_relationship: e.target.value,
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
                    Phone Number<sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.k1_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        k1_phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-2'></div>
        </div>
        <div className='row mt-4 pb-4 pb-4 border-bottom'>
          <div className='col-lg-4'>
            <p className='fs-5 pt-2 fw-semibold'>Next of Kin 2</p>
          </div>
          <div className='col-lg-6 pe-'>
            
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Full Name <sup className='text-danger'>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                disabled
                value={formValues.k2_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    k2_full_name: e.target.value,
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
                    Relationship to you <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.k2_relationship}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        k2_relationship: e.target.value,
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
                    Phone Number<sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.k2_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        k2_phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-2'></div>
        </div>
        <div className='row pt-4'>
          <p className='fw-semibold fs-5'>Beneficiary</p>
          <p className='text-muted fs-6' style={{ marginTop: "-10px" }}>
            In of Death, my benefits should be paid in favour of :
          </p>
        </div>
        <div className='row mt-4 pb-4'>
       
          <div className='col-lg-6 pe-'>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Full Name <sup className='text-danger'>*</sup>
              </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.beneficiary_full_name}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      beneficiary_full_name: e.target.value,
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
                    Relationship to you <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.beneficiary_relationship}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        beneficiary_relationship: e.target.value,
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
                    Phone Number<sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    disabled
                    value={formValues.beneficiary_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        beneficiary_phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-2'></div>
        </div>
        
        <div className='row border-top pb-5 mt-4'>
        </div>
      </div>
    </div>
  );
};

export default NextOfKin;
