import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback } from "react";
import { VscCopy } from "react-icons/vsc";
import GetDocument from "../../../../components/getdocument";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AcademicDetails = () => {

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
    q1_name_of_institution: "",
    q1_qualification: "",
    q1_start_year: "",
    q1_end_year: "",
    q1_document_file: "",
    q2_name_of_institution: "",
    q2_qualification: "",
    q2_start_year: "",
    q2_end_year: "",
    q2_document_file: "",
  });

  useEffect(() => {
    if (userDetails) {
      setFormValues({
        q1_name_of_institution: userDetails?.q1_name_of_institution,
        q1_qualification: userDetails?.q1_qualification,
        q1_start_year: userDetails?.q1_start_year,
        q1_end_year: userDetails?.q1_end_year,
        q1_document_file: userDetails?.q1_document_file,
        q2_name_of_institution: userDetails?.q2_name_of_institution,
        q2_qualification: userDetails?.q2_qualification,
        q2_start_year: userDetails?.q2_start_year,
        q2_end_year: userDetails?.q2_end_year,
        q2_document_file: userDetails?.q2_document_file,
      });
    }
  }, [userDetails]);

  return (
    <div className='container'>
      <div>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <Text color={'black'} className='fs-5 pt-2 fw-semibold'>First Degree</Text>
        </div>
        <div className='col-lg-6 pe-'>
          <div class='form-group'>
            <label
              for='exampleFormControlSelect1'
              className='fw-semibold text-muted fs-6 mt-3 mb-2'>
              Name of institution
            </label>
            <input
              type='text'
              style={{ height: "40px" }}
              class='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              disabled
              value={formValues.q1_name_of_institution}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  q1_name_of_institution: e.target.value,
                })
              }
            />
          </div>
          <div class='form-group'>
            <label
              for='exampleFormControlSelect1'
              className='fw-semibold text-muted fs-6 mt-3 mb-2'>
              Qualification
            </label>
            <input
              type='text'
              style={{ height: "40px" }}
              class='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              disabled
              value={formValues.q1_qualification}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  q1_qualification: e.target.value,
                })
              }
            />
          </div>
          <div class='row'>
            <div className='col-lg-5'>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Start Date
                </label>
                <DatePicker
                  selected={
                    formValues.q1_start_year
                      ? new Date(formValues.q1_start_year)
                      : null
                  }
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toISOString().split('T')[0];
                      setFormValues({
                        ...formValues,
                        q1_start_year: formattedDate,
                      });
                    } else {
                      setFormValues({
                        ...formValues,
                        q1_start_year: "", 
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
            <div className='col-lg-5'>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  End Date
                </label>
                <DatePicker
                  selected={
                    formValues.q1_end_year
                      ? new Date(formValues.q1_end_year)
                      : null
                  }
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toISOString().split('T')[0];
                      setFormValues({
                        ...formValues,
                        q1_end_year: formattedDate,
                      });
                    } else {
                      setFormValues({
                        ...formValues,
                        q1_end_year: "", 
                      });
                    }
                  }}
                  dateFormat="yyyy-MM-dd"
                  className="form-control rounded-0"
                  style={{ height: "40px" }}
                  id="exampleFormControlInput1"
                  placeholder=""
                  disabled
                />
              </div>
            </div>
          </div>
          <div  className=' h-90 w-100 d-flex align-items-center justify-content-space'>
          {/* <div className="form-group">
            <label
              htmlFor={`q1_document`}
              className="fw-semibold text-muted fs-6 mt-3 mb-2"
            >
              Upload Document
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="q1_document"
              disabled
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  q1_document_file: e.target.files[0],
                })
              }
            />
          </div> */}
          <div className="m-3">
            <Image src={formValues.q1_document_file} h={'129.17px'} w={'129.17px'} />
          </div>
          </div>
        </div>
      </div>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <p className='fs-5 pt-2 fw-semibold'>Other Degrees</p>
        </div>
        <div className='col-lg-6 pe-'>
          <div class='form-group'>
            <label
              for='exampleFormControlSelect1'
              className='fw-semibold text-muted fs-6 mt-3 mb-2'>
              Name of institution
            </label>
            <input
              type='text'
              style={{ height: "40px" }}
              class='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              disabled
              value={formValues.q2_name_of_institution}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  q2_name_of_institution: e.target.value,
                })
              }
            />
          </div>
          <div class='form-group'>
            <label
              for='exampleFormControlSelect1'
              className='fw-semibold text-muted fs-6 mt-3 mb-2'>
              Qualification
            </label>
            <input
              type='text'
              style={{ height: "40px" }}
              class='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              disabled
              value={formValues.q2_qualification}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  q2_qualification: e.target.value,
                })
              }
            />
          </div>
          

          <div class='row'>
            <div className='col-lg-5'>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Start Date
                </label>
                <DatePicker
                  selected={
                    formValues.q2_start_year
                      ? new Date(formValues.q2_start_year)
                      : null
                  }
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toISOString().split('T')[0];
                      setFormValues({
                        ...formValues,
                        q2_start_year: formattedDate,
                      });
                    } else {
                      setFormValues({
                        ...formValues,
                        q2_start_year: "", 
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
            <div className='col-lg-5'>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  End Date
                </label>
                <DatePicker
                  selected={
                    formValues.q2_end_year
                      ? new Date(formValues.q2_end_year)
                      : null
                  }
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toISOString().split('T')[0];
                      setFormValues({
                        ...formValues,
                        q2_end_year: formattedDate,
                      });
                    } else {
                      setFormValues({
                        ...formValues,
                        q2_end_year: "", 
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
          </div>
          <div  className=' h-90 w-100 d-flex align-items-center justify-content-space'>
            {/* <div className="form-group">
              <label
                htmlFor={`q2_document`}
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Upload Document
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id={`q2_document`}
                disabled
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    q2_document_file: e.target.files[0],
                  })
                }
              />
            </div> */}
            <div className="m-3">
            <Image src={formValues.q2_document_file} h={'129.17px'} w={'129.17px'}  />
            </div>
            
          </div>
          
        </div>
        <div className='col-lg-2'></div>
      </div>
      
      <div className='row pt-4'>
        
      </div>
      </div>
    </div>
  );
};

export default AcademicDetails;
