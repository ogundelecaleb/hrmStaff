import { Text } from "@chakra-ui/react";
import React, { useState , useEffect} from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from 'date-fns';

const ContactInfo = () => {

  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
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
  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data)
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  const [formValues, setFormValues] = useState({
    phone: "",
    email: "",
    contact_address: "",
    current_address: "",
    permanent_address: "",
    department:"",
    date_of_first_appointment: "",
    faculty: "",
    level: "",
    unit:"",
  });
  
  useEffect(() => {
    fetchUserDetails();
  }, []);
  
  useEffect(() => {
    if (userDetails) {
      setFormValues({
        phone: userDetails?.phone,
        email: userDetails?.email,
        contact_address: userDetails?.contact_address,
        current_address: userDetails?.current_address,
        permanent_address: userDetails?.permanent_address,
        department: userDetails?.department?.name,
        date_of_first_appointment: userDetails?.date_of_first_appointment,
        faculty: userDetails?.faculty?.name,
        level: userDetails?.level,
        role: userDetails?.role,
        unit: userDetails?.unit?.name,
        type: userDetails?.type,
      });
    }
  }, [userDetails]);

  async function handleSubmit (e)  {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.updateCinfo({
        phone: formValues.phone,
        contact_address: formValues.contact_address,
        current_address: formValues.current_address,
        permanent_address: formValues.permanent_address,
        date_of_first_appointment: formValues.date_of_first_appointment,
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar('Information updated successfully', { variant: 'success' })
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <Text color={'black'} className='fs-5 pt-2 fw-semibold'>Contact Details</Text>
        </div>
        <div className='col-lg-6 pe-'>
            <div class='row'>
              <div className='col-lg-6'>
                <div class='form-group'>
                  <label
                    for='exampleFormControlSelect1'
                    className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                    Phone Number <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    placeholder=''
                    value={formValues.phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        phone: e.target.value,
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
                    Email <sup className='text-danger'>*</sup>
                  </label>
                  <input
                    type='text'
                    style={{ height: "40px" }}
                    class='form-control rounded-0'
                    id='exampleFormControlInput1'
                    disabled
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Current Residential Area <sup className='text-danger'>*</sup>
              </label>
                <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  value={formValues.current_address}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      current_address: e.target.value,
                    })
                  }
                />
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Contact Address (Not P.O.Box)<sup>*</sup>
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                value={formValues.contact_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    contact_address: e.target.value,
                  })
                }
              />
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Permanent Home Address <sup>*</sup>
              </label>
              <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  value={formValues.permanent_address}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      permanent_address: e.target.value,
                    })
                  }
                />
            </div>
        </div>
        <div className='col-lg-2'></div>
      </div>
      <div className='row mt-4 border-bottom pb-4 pb-4'>
        <div className='col-lg-4'>
          <p className='fs-5 pt-2 fw-semibold'>Work Contact</p>
        </div>
        <div className='col-lg-6 pe-'>
          <div class='row'>
            <div className='col-lg-6'>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Date of First Appointment{" "}
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
                    formValues.date_of_first_appointment
                      ? new Date(formValues.date_of_first_appointment)
                      : null
                  }
                  onChange={(date) => {
                    if (date instanceof Date && !isNaN(date)) {
                      const formattedDate = date.toISOString().split('T')[0];
                      setFormValues({
                        ...formValues,
                        date_of_first_appointment: formattedDate,
                      });
                    } else {
                      setFormValues({
                        ...formValues,
                        date_of_first_appointment: '',
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
                  Present Designation
                </label>
                <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                disabled
                value={formValues.level}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    level: e.target.value,
                  })
                }
              />
              </div>
            </div>
          </div>
          
          {formValues.type === 'ASE' && formValues.role === 'DEAN' && (
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Faculty
              </label>
              <input
                  type='text'
                  style={{ height: "40px" }}
                  class='form-control rounded-0'
                  id='exampleFormControlInput1'
                  placeholder=''
                  disabled
                  value={formValues.faculty}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      facultyt: e.target.value,
                    })
                  }
                />
            </div>
          )}

          {(formValues.type === 'ASE' && (formValues.role === 'HOD' || formValues.role === 'RSWEP')) && (
            <div class='form-group'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold fs-6 mt-3 mb-2'>
              Department
            </label>
            <input
              type='text'
              style={{ height: "40px" }}
              class='form-control rounded-0'
              id='exampleFormControlInput1'
              placeholder=''
              disabled
              value={formValues.department}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  department: e.target.value,
                })
              }
            />
            </div>
          )}

          {formValues.type === 'NASE' && (

            <div class='form-group'>
              <label
                for='exampleInputEmail1'
                class='form-label fs-6 fw-semibold fs-6 mt-3 mb-2'>
                Unit
              </label>
              <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
                disabled
                value={formValues.unit}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    unit: e.target.value,
                  })
                }
              />
            </div>
          )}

          <div class='row'>
            <div className='col-lg-6'>
              <div class='form-group'>
                <label
                  for='exampleFormControlSelect1'
                  className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                  Level
                </label>
                <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                disabled
                value={formValues.level}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    level: e.target.value,
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
                  Designation
                </label>
                <input
                type='text'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                disabled
                value={formValues.role}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    role: e.target.value,
                  })
                }
              />
              </div>
            </div>
          </div>
        </div>
        
        <div className="row pt-2">
          <p className="text-DARK">
            please report or contact the registrar in
            the case of change or addition to any information provided
            above with the exception of permanent address and date of first
            amendment so that this record can be updated appropriately.
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
                ) : ( <>Submit</>
                )}
          </button>
          </div>
        </div>
      {/* </div> */}
      </form>
    </div>
  );
};

export default ContactInfo;
