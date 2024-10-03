import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";

const FamilyDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeclarationAccepted, setIsDeclarationAccepted] = useState(false);

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
      setUserDetails(userDetails?.data);
    } catch (error) {
      console.error("Error fetching your basic details", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  const [formValues, setFormValues] = useState({
    spouse_full_name: "",
    spouse_current_address: "",
    spouse_phone: "",
    spouse_email: "",
    c1_full_name: "",
    c1_current_address: "",
    c1_relationship: "",
    c1_phone: "",
    c1_date_of_birth: "",
    c1_gender: "",
    c1_email: "",
    c2_full_name: "",
    c2_current_address: "",
    c2_relationship: "",
    c2_phone: "",
    c2_date_of_birth: "",
    c2_gender: "",
    c2_email: "",

    c3_full_name: "",
    c3_current_address: "",
    c3_relationship: "",
    c3_phone: "",
    c3_date_of_birth: "",
    c3_gender: "",
    c3_email: "",

    c4_full_name: "",
    c4_current_address: "",
    c4_relationship: "",
    c4_phone: "",
    c4_date_of_birth: "",
    c4_gender: "",
    c4_email: "",
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

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
        c1_email: userDetails?.c1_email,
        c2_full_name: userDetails?.c2_full_name,
        c2_current_address: userDetails?.c2_current_address,
        c2_relationship: userDetails?.c2_relationship,
        c2_phone: userDetails?.c2_phone,
        c2_date_of_birth: userDetails?.c2_date_of_birth,
        c2_gender: userDetails?.c2_gender,
        c2_email: userDetails?.c2_email,
        c3_full_name: userDetails?.c3_full_name,
        c3_current_address: userDetails?.c3_current_address,
        c3_relationship: userDetails?.c3_relationship,
        c3_phone: userDetails?.c3_phone,
        c3_date_of_birth: userDetails?.c3_date_of_birth,
        c3_gender: userDetails?.c3_gender,
        c3_email: userDetails?.c3_email,
        c4_full_name: userDetails?.c4_full_name,
        c4_current_address: userDetails?.c4_current_address,
        c4_relationship: userDetails?.c4_relationship,
        c4_phone: userDetails?.c4_phone,
        c4_date_of_birth: userDetails?.c4_date_of_birth,
        c4_gender: userDetails?.c4_gender,
        c4_email: userDetails?.c4_email,
      });
    }
  }, [userDetails]);

  const handleDeclarationChange = () => {
    setIsDeclarationAccepted(!isDeclarationAccepted);
  };
  const isSaveButtonDisabled = !isDeclarationAccepted || isLoading;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.updateFinfo({
        spouse_full_name: formValues.spouse_full_name,
        spouse_current_address: formValues.spouse_current_address,
        spouse_phone: formValues.spouse_phone,
        c1_full_name: formValues.c1_full_name,
        c1_current_address: formValues.c1_current_address,
        c1_relationship: formValues.c1_relationship,
        c1_phone: formValues.c1_phone,
        c1_date_of_birth: formValues.c1_date_of_birth,
        c1_gender: formValues.c1_gender,
        c1_email: formValues.c1_email,
        c2_full_name: formValues.c2_full_name,
        c2_current_address: formValues.c2_current_address,
        c2_relationship: formValues.c2_relationship,
        c2_phone: formValues.c2_phone,
        c2_date_of_birth: formValues.c2_date_of_birth,
        c2_gender: formValues.c2_gender,
        c2_email: formValues.c2_email,
        c3_full_name: formValues.c3_full_name,
        c3_current_address: formValues.c3_current_address,
        c3_relationship: formValues.c3_relationship,
        c3_phone: formValues.c3_phone,
        c3_date_of_birth: formValues.c3_date_of_birth,
        c3_gender: formValues.c3_gender,
        c3_email: formValues.c3_email,
        c4_full_name: formValues.c4_full_name,
        c4_current_address: formValues.c4_current_address,
        c4_relationship: formValues.c4_relationship,
        c4_phone: formValues.c4_phone,
        c4_date_of_birth: formValues.c4_date_of_birth,
        c4_gender: formValues.c2_gender,
        c4_email: formValues.c4_email,
        spouse_email: formValues.spouse_email
      });
      console.log("responce==>>>>>", response);
      enqueueSnackbar("Information updated successfully", {
        variant: "success",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mt-4 border-bottom pb-4 pb-4">
          <div className="col-lg-4">
            <Text color="black" className="fs-5 pt-2 fw-semibold">
              Spouse details
            </Text>
          </div>
          <div className="col-lg-6 pe-">
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.spouse_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    spouse_full_name: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
              Email Address 
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.spouse_email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    spouse_email: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Current Residential Address
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.spouse_current_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    spouse_current_address: e.target.value,
                  })
                }
              />
            </div>
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
          <div className="col-lg-2"></div>
        </div>
        <div className="row mt-4 border-bottom pb-4 pb-4">
          <div className="col-lg-4">
            <p className="fs-5 pt-2 fw-semibold">Child 1 Details</p>
          </div>
          <div className="col-lg-6 pe-">
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c1_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c1_full_name: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c1_email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c1_email: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Current Residential Address
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c1_current_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c1_current_address: e.target.value,
                  })
                }
              />
            </div>
            <div class="row">
              
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Date of Birth
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
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
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

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={
                      formValues.c1_date_of_birth
                        ? new Date(formValues.c1_date_of_birth)
                        : null
                    }
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toISOString().split("T")[0];
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
                    className="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    className="form-select rounded-0"
                    id="exampleFormControlSelect1"
                    value={formValues.c1_gender}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c1_gender: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row mt-4 border-bottom pb-4 pb-4">
          <div className="col-lg-4">
            <p className="fs-5 pt-2 fw-semibold">Child 2 Details</p>
          </div>
          <div className="col-lg-6 pe-">
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c2_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c2_full_name: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c2_email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c2_email: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Current Residential Address
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c2_current_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c2_current_address: e.target.value,
                  })
                }
              />
            </div>
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Relationship to you
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Date of Birth
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
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
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

                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={
                      formValues.c2_date_of_birth
                        ? new Date(formValues.c2_date_of_birth)
                        : null
                    }
                    onChange={(date) => {
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toISOString().split("T")[0];
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
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    className="form-select rounded-0"
                    id="exampleFormControlSelect1"
                    value={formValues.c2_gender}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c2_gender: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>

        <div className="row mt-4 border-bottom pb-4 pb-4">
          <div className="col-lg-4">
            <p className="fs-5 pt-2 fw-semibold">Child 3 Details</p>
          </div>
          <div className="col-lg-6 pe-">
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c3_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c3_full_name: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c3_email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c3_email: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Current Residential Address
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c3_current_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c3_current_address: e.target.value,
                  })
                }
              />
            </div>
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Relationship to you
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c3_relationship}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c3_relationship: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c3_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c3_phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c3_date_of_birth}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c3_date_of_birth: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    className="form-select rounded-0"
                    id="exampleFormControlSelect1"
                    value={formValues.c3_gender}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c3_gender: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="row mt-4 border-bottom pb-4 pb-4">
          <div className="col-lg-4">
            <p className="fs-5 pt-2 fw-semibold">Child 4 Details</p>
          </div>
          <div className="col-lg-6 pe-">
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c4_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c4_full_name: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c4_email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c4_email: e.target.value,
                  })
                }
              />
            </div>
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Current Residential Address
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.c4_current_address}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    c4_current_address: e.target.value,
                  })
                }
              />
            </div>
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Relationship to you
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c4_relationship}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c4_relationship: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c4_phone}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c4_phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.c4_date_of_birth}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c4_date_of_birth: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Gender
                  </label>
                  <select
                    className="form-select rounded-0"
                    id="exampleFormControlSelect1"
                    value={formValues.c4_gender}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        c4_gender: e.target.value,
                      })
                    }
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <div className="row pt-4">
          <div className="col-lg-9 d-flex gap-3">
            <input
              type="radio"
              className="mb-4"
              onChange={handleDeclarationChange}
              checked={isDeclarationAccepted}
            />
            <p className="fs-6 fw-semibold">
              i hereby declare that the information contained in this form
              supersedes the one earlier filed by meon assumption of dutyin the
              college.
            </p>
          </div>
        </div>

        {!isDeclarationAccepted && (
          <div className="row pt-2">
            <p className="text-danger">
              Please accept the declaration before saving or updating.
            </p>
          </div>
        )}
        <div className="row pt-2">
          <p className="text-DARK">
          please report or contact the College Secretary in
            the case of change or addition to any information provided
            above with the exception of permanent address and date of first
            appointment so that this record can be updated appropriately.
          </p>
        </div>
        {/* <div className='row border-top pb-5 mt-4'> */}
        <div className="col-lg-12 py-5 d-flex justify-content-end">
          <div>
            <button
              className="btn py-2 px-4 me-2  text-white rounded-0"
              style={{ backgroundColor: "#984779" }}
              disabled={isSaveButtonDisabled}
              type="submit"
            >
              {isLoading ? (
                <MoonLoader color={"white"} size={20} />
              ) : (
                <>Submit</>
              )}
            </button>
          </div>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
};

export default FamilyDetails;
