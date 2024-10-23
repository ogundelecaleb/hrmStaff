import { Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { getUserDetails } from "../../../utils/utils";
import api from "../../../api";
import { MoonLoader } from "react-spinners";

const NextOfKin = () => {
  const [userDetails, setUserDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeclarationAccepted, setIsDeclarationAccepted] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState([ { full_name: "", relationship: "", phone: "", email: "", percentage: "" }]);

  const handleAddBeneficiary = () => {
    if (beneficiaries?.length >= 4){
      enqueueSnackbar("Maximum number of beneficiaries reached", { variant: "warning" });
      return;
    }
    console.log("beneficiaries?.length", beneficiaries?.length)
    setBeneficiaries([
      ...beneficiaries,
      { full_name: "", relationship: "", phone: "", email: "", percentage: "" },
    ]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newBeneficiaries = [...beneficiaries];
    newBeneficiaries[index][name] = value;
    setBeneficiaries(newBeneficiaries);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Beneficiaries:', beneficiaries);
  // };

  async function fetchUserDetails() {
    try {
      const userDetails = await getUserDetails();
      console.log("User Details:", userDetails);
      setUserDetails(userDetails.data);
    } catch (error) {
      console.error("Error fetching your basic details");
      // enqueueSnackbar(error.message, { variant: "error" });
    }
  }
  const [formValues, setFormValues] = useState({
    k1_full_name: "",
    k1_relationship: "",
    k1_phone: "",
    k2_full_name: "",
    k2_relationship: "",
    k2_phone: "",
    beneficiary_full_name: "",
    beneficiary_relationship: "",
    beneficiary_phone: "",
  });

  useEffect(() => {
    fetchUserDetails();
  }, []);

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
      setBeneficiaries(userDetails?.beneficiary || [])
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
      const response = await api.updateNok({
        k1_full_name: formValues.k1_full_name,
        k1_relationship: formValues.k1_relationship,
        k1_phone: formValues.k1_phone,
        k2_full_name: formValues.k2_full_name,
        k2_relationship: formValues.k2_relationship,
        k2_phone: formValues.k2_phone,
        beneficiaries: beneficiaries,
        // beneficiary_full_name: formValues.beneficiary_full_name,
        // beneficiary_relationship: formValues.beneficiary_relationship,
        // beneficiary_phone: formValues.beneficiary_phone,
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
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="row mt-4 pb-4 pb-4">
          <div className="col-lg-4">
            <Text color={"black"} className="fs-5 pt-2 fw-semibold">
              Next of Kin 1
            </Text>
          </div>
          <div className="col-lg-6 pe-">
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full Name <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.k1_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    k1_full_name: e.target.value,
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
                    Relationship to you <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Phone Number<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
          <div className="col-lg-2"></div>
        </div>
        <div className="row mt-4 pb-4  border-bottom">
          <div className="col-lg-4">
            <p className="fs-5 pt-2 fw-semibold">Next of Kin 2</p>
          </div>
          <div className="col-lg-6 pe-">
            <div class="form-group">
              <label
                for="exampleFormControlSelect1"
                className="fw-semibold text-muted fs-6 mt-3 mb-2"
              >
                Full Name <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                style={{ height: "40px" }}
                class="form-control rounded-0"
                id="exampleFormControlInput1"
                placeholder=""
                value={formValues.k2_full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    k2_full_name: e.target.value,
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
                    Relationship to you <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
              <div className="col-lg-6">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Phone Number<sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    placeholder=""
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
          <div className=""></div>
        </div>
        <div className="flex gap-[24px]">
        <div className="w-full md:w-[40%] pt-4">
          <p className="fw-semibold fs-5">Beneficiary</p>
          <p className="text-muted fs-6" style={{ marginTop: "-10px" }}>
            In situation of Death, my benefits should be paid in favour of :
          </p>
        </div>
        <div className="w-full md:w-[60%] mt-4 pb-4">
         
          {beneficiaries.map((beneficiary, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div className=" pe-">
                <div class="form-group">
                  <label
                    for="exampleFormControlSelect1"
                    className="fw-semibold text-muted fs-6 mt-3 mb-2"
                  >
                    Full Name <sup className="text-danger">*</sup>
                  </label>
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    class="form-control rounded-0"
                    id="exampleFormControlInput1"
                    name="full_name"
                    placeholder="Name"
                    value={beneficiary.full_name}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div class="row">
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Email <sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        name="email"
                        placeholder="@gmail.com"
                        value={beneficiary.email}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Phone Number<sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        name="phone"
                        placeholder="phone"
                        value={beneficiary.phone}
                        onChange={(event) => handleChange(index, event)}
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
                        Relationship to you <sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        name="relationship"
                        placeholder="Brother"
                        value={beneficiary.relation}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label
                        for="exampleFormControlSelect1"
                        className="fw-semibold text-muted fs-6 mt-3 mb-2"
                      >
                        Percent<sup className="text-danger">*</sup>
                      </label>
                      <input
                        type="text"
                        style={{ height: "40px" }}
                        class="form-control rounded-0"
                        id="exampleFormControlInput1"
                        name="percentage"
                        placeholder="20"
                        value={beneficiary.percentage}
                        onChange={(event) => handleChange(index, event)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn py-2 px-4 me-2  text-white rounded-0"
            style={{ backgroundColor: "#984779" }}
            onClick={handleAddBeneficiary}
          >
           {beneficiaries?.length === 0 ? "Add First Beneficiary" : "Add More Beneficiary"}
          </button>
          <div className="col-lg-2"></div>
        </div>
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
              supersedes the one earlier filed by me on assumption of duty in
              the college.
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
            please report or contact the College Secretary in the case of change
            or addition to any information provided above with the exception of
            permanent address and date of first appointment so that this record
            can be updated appropriately.
          </p>
        </div>

        <div className="row border-top pb-5 mt-4">
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
        </div>
      </form>
    </div>
  );
};

export default NextOfKin;
