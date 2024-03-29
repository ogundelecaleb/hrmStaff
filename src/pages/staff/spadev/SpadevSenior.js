import { Flex, Text, CircularProgress, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import React, { useState } from "react";
import CommonButton from "../../../components/commonbutton/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from 'date-fns';
import Accessment from "../../../components/Accessment";

const SpadevSenior = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const {formValues,formData} = location.state;
  console.log("Form Application values",formValues,formData);
  // const [documents, setDocuments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [academicDegrees, setAcademicDegrees] = useState([{ id: 1 }]);
  const [statementsOfExperience, setStatementsOfExperience] = useState([{ id: 1 }]);
  const [reviewResponce, setReviewResponce] = useState("");
  const [hinnderedFactors, setHinderedFactors] = useState("");
  const [eliminateFactors, setEliminateFactors] = useState("");
  const [improveJob, setImproveJob] = useState("");
  const [outstandingAct, setOutstandingAct] = useState("");
  const [personalDev, setPersonalDev] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [academicDegreesData, setAcademicDegreesData] = useState([
    { id: 1, qualification: "", institution: "", date: "" },
  ]);

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
  const formatSelectedDate = (date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  
  const updateAcademicDegreeData = (id, field, value) => {
    setAcademicDegreesData((prevData) => {
      const newData = prevData.map((degree) =>
        degree.id === id ? { ...degree, [field]: value } : degree
      );
      console.log("Updated Academic Degrees Data:", newData);
      return newData;
    });
  };
  

  const addSection = (sectionType) => {
    if (sectionType === "academic") {
      setAcademicDegrees([...academicDegrees, { id: academicDegrees.length + 1 }]);
    } else if (sectionType === "experience") {
      setStatementsOfExperience([...statementsOfExperience, { id: statementsOfExperience.length + 1 }]);
    }
  };

  const removeSection = (sectionType, id) => {
    if (sectionType === "academic") {
      setAcademicDegrees(academicDegrees.filter((degree) => degree.id !== id));
    } else if (sectionType === "experience") {
      setStatementsOfExperience(statementsOfExperience.filter((experience) => experience.id !== id));
    }
  };

  // const uploadDocument = (file) => {
  //   setDocuments([...documents, file.name]);
  // };

  // const handleSubmit = () => {
  //   setIsSubmitting(true);
  //   setIsDrawerOpen(true);
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setIsDrawerOpen(false);
  //     navigate("submitted")
  //   }, 2000);
  // };

  const handleSubmit = async () =>  {
  
    setIsSubmitting(true);
    setIsDrawerOpen(true);

    try {
      console.log("Academic Degrees Data:", academicDegreesData);
      const response = await api.createSpadev({
        full_name: formValues.full_name,
        staff_type: formValues.type,
        pf_no: formData.pfNumber,
        current_substantive_post:formData.post,
        grade_level: formData.gradeLevel,
        step: formData.step,
        date_of_first_appointment: formData.formattedFirstAppointDate,
        designation_of_first_appointment: formData.firstAppoint,
        grade_level_of_first_appointment: formData.firstGrade,
        position_sought: formData.position,
        date_of_present_substantive_post: formData.formattedPesentPostDate,
        unapproved_absence_during_review_period: formData.unApproved,
        confirmation_of_appointment_date: formData.formattedConfirmedDate,
        key_responsibilities: reviewResponce,
        factors_hindered: hinnderedFactors,
        factors_be_eliminated: eliminateFactors,
        improve_your_effectiveness: improveJob,
        outstanding_achievements: outstandingAct,
        personal_development: personalDev,
        level: formValues.staffLevel,
        department_id: formData.departmentId,
        unit_id: formData.unitId,
        faculty_id: formData.facultyId,
        academic_degrees: academicDegreesData.map(({ qualification, institution, date }) => ({
          qualification,
          institution,
          date,
        })),
      });  
      console.log("responce==>>>>>", response);
      enqueueSnackbar('Application successfull', { variant: 'success' })
      setIsSubmitting(false);
      setIsDrawerOpen(false);
      navigate("submitted")
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || "An error occurred", {
        variant: "error",
      });
      setIsSubmitting(false);
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className="container">
      <div className="border-bottom pt-2 px-5">
        <p className="fs-3 fw-semibold">
          Staff Performance Appraisal and Development SPADEV
        </p>
        <p className="fs-5" style={{ marginTop: "-19px" }}>
          Kindly fill in the required information
        </p>
      </div>

      {academicDegrees.map((degree) => (
        <div key={degree.id} className="px-5 mt-4 border-bottom pb-4 pb-4">
          <div className="col-lg-4">
            <p className="fs-5 pt-2 fw-semibold">Academic Degree</p>
          </div>
          <div className="col-lg-6 pe-">
            <div>
              <div class="form-group">
                <label
                  for="exampleFormControlSelect1"
                  className="fw-semibold text-muted fs-6 mt-3 mb-2"
                >
                  Qualification <sup className="text-danger">*</sup>
                </label>
                <input
                  type="text"
                  style={{ height: "40px" }}
                  class="form-control rounded-0"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={degree.qualification}
                  onChange={(e) =>
                    updateAcademicDegreeData(
                      degree.id,
                      "qualification",
                      e.target.value
                    )
                  }
                />
              </div>
              <div class="form-group">
                <label
                  for="exampleFormControlSelect1"
                  className="fw-semibold text-muted fs-6 mt-3 mb-2"
                >
                  Name of Institution <sup>*</sup>
                </label>
                <input
                  type="text"
                  style={{ height: "40px" }}
                  class="form-control rounded-0"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={degree.institution}
                  onChange={(e) =>
                    updateAcademicDegreeData(
                      degree.id,
                      "institution",
                      e.target.value
                    )
                  }
                />
              </div>
              <div class="mb-3 flex flex-col mt-3">
                <div>
                  <label class="form-label fs-6 fw-semibold">
                    Date<sup className="text-danger">*</sup>
                  </label>
                </div>
                {isDatePickerOpen ? (
                  <DatePicker
                    autoComplete="off"
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
                    selected={selectedDate}
                    onChange={(date) => {
                      console.log("Selected Date:", date);
                      if (date instanceof Date && !isNaN(date)) {
                        const formattedDate = date.toISOString();
                        updateAcademicDegreeData(
                          degree.id,
                          "date",
                          formattedDate
                        );
                        setSelectedDate(date);
                      } else {
                        updateAcademicDegreeData(degree.id, "date", "");
                        setSelectedDate(null);
                      }
                      setIsDatePickerOpen(false);
                    }}
                    dateFormat="yyyy-MM-dd"
                    className="form-control rounded-0"
                    placeholder=""
                    shouldCloseOnSelect={true}
                  />
                ) : (
                  <input
                    type="text"
                    class="form-control rounded-0"
                    placeholder=""
                    value={selectedDate ? formatSelectedDate(selectedDate) : ""}
                    onFocus={() => setIsDatePickerOpen(true)}
                    readOnly
                  />
                )}
              </div>
            </div>
          </div>
          <Flex className="row">
            {degree.id > 1 && (
              <div className="col-lg-12 py-3 d-flex justify-content-start">
                <div>
                  <button
                    type="button"
                    className="btn py-2 px-4 me-2  text-white rounded-0"
                    style={{ backgroundColor: "#bf0d0d" }}
                    onClick={() => removeSection("academic", degree.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
            <div className="col-lg-12 py-3 d-flex justify-content-end">
              <div>
                <button
                  onClick={() => addSection("academic")}
                  className="btn py-2 px-4 me-2  text-white rounded-0"
                  style={{ backgroundColor: "#984779" }}
                >
                  Add Academic Degree
                </button>
              </div>
            </div>
          </Flex>
        </div>
      ))}
      <div className="px-5 row">
        <div className="col-lg-6">
          <div className="col-lg-6">
            <p className="fs-5 pt-4 fw-semibold">Self Evaluation Assessment</p>
          </div>
          <div>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                list your key responsibilities during the period of the review
                <sup className="text-danger">*</sup>
              </label>
              <textarea
                type="text"
                class="form-control rounded-0"
                placeholder=""
                value={reviewResponce}
                onChange={(e) => setReviewResponce(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                What factors hindered your effectiveess on the job
                <sup className="text-danger">*</sup>
              </label>
              <textarea
                className="form-control rounded-0"
                value={hinnderedFactors}
                onChange={(e) => setHinderedFactors(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                How can these factors be eliminated or overcome
                <sup className="text-danger">*</sup>
              </label>
              <textarea
                className="form-control rounded-0"
                value={eliminateFactors}
                onChange={(e) => setEliminateFactors(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                What could be done to improve your effectiveess on the job
                <sup className="text-danger">*</sup>
              </label>
              <textarea
                className="form-control rounded-0"
                value={improveJob}
                onChange={(e) => setImproveJob(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                State any outstanding achievements or value creating activities
                outside your core job function
                <sup className="text-danger">*</sup>
              </label>
              <textarea
                className="form-control rounded-0"
                value={outstandingAct}
                onChange={(e) => setOutstandingAct(e.target.value)}
              />
            </div>
            <div class="form-group mt-2">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Mentionn any personal developement undertaken during this period
                <sup className="text-danger">*</sup>
              </label>
              <textarea
                className="form-control rounded-0"
                value={personalDev}
                onChange={(e) => setPersonalDev(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6"> </div>
      </div>
      <Accessment />
      <div className="py-5">
        <CommonButton title={"Submit Application"} action={handleSubmit} />
      </div>

      <Drawer isOpen={isDrawerOpen} size="full">
        <DrawerOverlay />
        <DrawerContent class="d-flex justify-content-center align-items-center">
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody class="d-flex flex-column align-items-center justify-content-center">
            <div>
              <div
                class="d-flex justify-content-center align-items-center"
                style={{ height: "90vh" }}
              >
                <div class="d-flex flex-column align-items-center">
                  <CircularProgress
                    isIndeterminate
                    color={"#5542F6"}
                    size="100px"
                    thickness="4px"
                  />
                  <Text textAlign="center" fontSize="xl" fontWeight="bold">
                    Submitting...
                  </Text>
                </div>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SpadevSenior;
