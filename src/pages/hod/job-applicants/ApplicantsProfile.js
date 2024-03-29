import React from "react";

const ApplicantsProfile = ({ data }) => {
  return (
    <div className='mt-2 pb-4'>
      <div>
        <p className='fw-semibold fs-5'>Personal Details</p>
        <div className='row mt-4 border-bottom pb-2'>
          <div className='col-lg-6'>
            <div>
              <p className='fs-6  text-muted'>Full Name</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                {data.name}
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Date of Birth</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                March 32, 1965 <span className='text-muted'>(58 years)</span>
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Address</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                4517 Washington Ave Ikeja,
                <br /> Lagos
              </p>
            </div>
          </div>
          <div className='col-lg-6'>
            <div>
              <p className='fs-6  text-muted'>Gender</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                Male
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Language</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                English, Yoruba
              </p>
            </div>
          </div>
        </div>
        <p className='fw-semibold fs-5 mt-4'>Other Details</p>
        <div className='row mt-4 pb-5 mb-3'>
          <div className='col-lg-4'>
            <div>
              <p className='fs-6  text-muted'>Nationality</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                Nigerian
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'> Highest Qulification Held</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                PHD Clinical Phsicology
              </p>
            </div>
          </div>
          <div className='col-lg-8'>
            <div>
              <p className='fs-6  text-muted'>State of Origin</p>
              <p className='fs-6 fw-semibold' style={{ marginTop: "-15px" }}>
                Akoko South
              </p>
            </div>
            <div>
              <p className='fs-6  text-muted'>Skills</p>
              <div
                className='fs-6 fw-semibold d-flex flex-wrap gap-2'
                style={{ marginTop: "-15px" }}>
                <span
                  className='py-1 px-2 text-primary'
                  style={{ backgroundColor: "#F8F8FD" }}>
                  Microsoft word
                </span>
                <span
                  className='px-2 text-primary py-1'
                  style={{ backgroundColor: "#F8F8FD" }}>
                  Powerpoint
                </span>
                <span
                  className='py-1 px-2 text-primary'
                  style={{ backgroundColor: "#F8F8FD" }}>
                  Research
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsProfile;
