import React from "react";

const CertificationDuty = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='border-bottom ps-5'>
          <p className='fs-2 fw-semibold pt-3 pb-1'>
            Certificate of Assumption of Duty
          </p>
        </div>
        <div className='col-lg-6 mb-5 ps-5'>
          <form>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Residential Address
              </label>
              <textarea
                class='form-control rounded-0'
                id='exampleFormControlTextarea1'
                rows='3'></textarea>
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Date of Assumption Duty
              </label>
              <input
                type='datetime-local'
                style={{ height: "40px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
              />
            </div>
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
              />
            </div>
            <div class='form-group'>
              <label
                for='exampleFormControlSelect1'
                className='fw-semibold text-muted fs-6 mt-3 mb-2'>
                Department/Division/Unit
              </label>
              <input
                type='text'
                style={{ height: "45px" }}
                class='form-control rounded-0'
                id='exampleFormControlInput1'
                placeholder=''
              />
            </div>
          </form>
        </div>
        <div className='col-lg-12 py-5 d-flex justify-content-end'>
          <div>
            <button
              className='btn py-2 px-4 me-2  text-white rounded-0'
              style={{ backgroundColor: "#984779" }}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationDuty;
