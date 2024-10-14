import { Text, Image, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import api from "../../../api";
import { MoonLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import { Trash } from "iconsax-react";

const AcademicDetails = () => {
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoadinge, setIsLoadinge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [filesi, setFiles] = useState(null);
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
    setIsLoadinge(true);
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data);
      setIsLoadinge(false);
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: 'error' })
      setIsLoadinge(false);
    }
  }

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
    fetchUserDetails();
  }, []);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileChanges = (e) => {
    setFiles(e.target.files[0]);
  };
  const [academic, setAcademic] = useState([
    {
      id: "0",
      name_of_institution: "",
      qualification: "",
      start_year: "",
      end_year: "",
    },
  ]);

  const handleAcademic = () => {
    setAcademic([
      ...academic,
      {
        id:  JSON.stringify( academic?.length + 1),
       name_of_institution: "",
       qualification: "",
       start_year: "",
       end_year: "",
      },
    ]);
  };
  const handleAcademicChange = (index, event) => {
    const { name, value } = event.target;
    const newAcademic = [...academic];
    newAcademic[index][name] = value;
    setAcademic(newAcademic);
  };

  useEffect(() => {
    if (userDetails) {
     setAcademic(userDetails?.staff_academic_qualification)
    }
  }, [userDetails]);

  const handleDeclarationChange = () => {
    setIsDeclarationAccepted(!isDeclarationAccepted);
  };
  const isSaveButtonDisabled = !isDeclarationAccepted || isLoading;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
   

    const formData = new FormData();
    // formData.append("q1_document_file", file);
    // formData.append("q2_document_file", filesi);
   
    // formData.append("qualifications",  academic);
    academic.forEach((acad, index) => {
      formData.append(`qualifications`, JSON.stringify(acad) ); // Send each item as "items[]"
    });

    try {
      const response = await api.updateAinfo({qualifications: academic});
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

  const removeItem = (idToRemove) => {
    const updatedItems = academic.filter((item) => item.id !== idToRemove);
    setAcademic(updatedItems); // Update state with the new array
  };

  return (
    <div>
      {isLoadinge ? (
        <Box
          w={"85vw"}
          display="flex"
          flexDirection="column"
          h={"75vh"}
          alignItems="center"
          justifyContent="center"
        >
          <div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70"
            style={{ zIndex: 9999 }}
          >
            <div className="inline-block">
              <MoonLoader color={"#984779"} size={80} />
            </div>
          </div>
        </Box>
      ) : (
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="row mt-4 border-bottom pb-4">
              <div className="col-lg-4">
                <Text color={"black"} className="fs-5 pt-2 fw-semibold">
                  Academic Qualification
                </Text>
              </div>
              <div className="col-lg-6 pe-">
                {academic?.map((acad, index) => (
                  <>
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2 flex justify-between"
                      >
                        Name of institution
                        {acad.id > 0 && (
                          <button onClick={() => removeItem(acad.id)}>
                            <Trash size={15} />
                          </button>
                        )}
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        required
                        name="name_of_institution"
                        value={acad.name_of_institution}
                        onChange={(event) => handleAcademicChange(index, event)}
                      />
                    </div>
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Degree
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        placeholder=""
                        name="qualification"
                        value={acad.qualification}
                        onChange={(event) => handleAcademicChange(index, event)}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          Start Year
                        </label>
                        <input
                          type="date"
                          style={{ height: "40px" }}
                          class="form-control rounded-0"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="start_year"
                          value={acad.start_year}
                          onChange={(event) =>
                            handleAcademicChange(index, event)
                          }
                        />
                      </div>
                      <div class="form-group">
                        <label
                          for="exampleFormControlSelect1"
                          className="fw-semibold text-muted fs-6 mt-3 mb-2"
                        >
                          End Year
                        </label>
                        <input
                          type="date"
                          style={{ height: "40px" }}
                          class="form-control rounded-0"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="end_year"
                          value={acad.end_year}
                          onChange={(event) =>
                            handleAcademicChange(index, event)
                          }
                        />
                      </div>
                    </div>
                  </>
                ))}

                <button
                  type="button"
                  className="btn py-1 px-4 mt-4  mb-2 text-white rounded-md"
                  style={{ backgroundColor: "#17082d" }}
                  onClick={handleAcademic}
                >
                  Add More Qualification
                </button>

              </div>
            </div>

            {/* 

            <div className="row mt-4 border-bottom pb-4">
              <div className="col-lg-4">
                <p className="fs-5 pt-2 fw-semibold">Other Degrees</p>
              </div>
              <div className="col-lg-6 pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Name of institution
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.q2_name_of_institution}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        q2_name_of_institution: e.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Qualification
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
                    value={formValues.q2_qualification}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        q2_qualification: e.target.value,
                      })
                    }
                  />
                </div>

                <div class="row">
                  <div className="col-lg-5">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Start Date
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
                          formValues.q2_start_year
                            ? new Date(formValues.q2_start_year)
                            : null
                        }
                        onChange={(date) => {
                          if (date instanceof Date && !isNaN(date)) {
                            const formattedDate = date
                              .toISOString()
                              .split("T")[0];
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
                      />
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        End Date
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
                          formValues.q2_end_year
                            ? new Date(formValues.q2_end_year)
                            : null
                        }
                        onChange={(date) => {
                          if (date instanceof Date && !isNaN(date)) {
                            const formattedDate = date
                              .toISOString()
                              .split("T")[0];
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
                      />
                    </div>
                  </div>
                </div>
                <div className=" h-90 w-100 d-flex align-items-center justify-content-space">
                  <div className="form-group">
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
                      onChange={onFileChanges}
                    />
                    {userDetails.q2_document_file &&
                    userDetails.q2_document_file.trim() !== "" &&
                    !userDetails.q2_document_file.endsWith("null") ? (
                      <div className="mt-2">
                        <a
                          href={userDetails.q2_document_file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Document
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div> */}

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
                  supersedes the one earlier filed by me on assumption of duty
                  in the college.
                </p>
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
                  please report or contact the College Secretary in the case of
                  change or addition to any information provided above with the
                  exception of permanent address and date of first appointment
                  so that this record can be updated appropriately.
                </p>
              </div>

              <div className="col-lg-12 py-2 d-flex justify-content-end">
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
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AcademicDetails;
