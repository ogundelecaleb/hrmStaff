import React from "react";
import CommonButton from "../../../components/commonbutton/Button";

const ApplicationOfGrants = ({ navigate }) => {
  return (
    <div className='container-fluid'>
      <div class='border-bottom ps-4' id='no-padding-res'>
        <h1 class='fs-4 fw-semibold'>Form for Application of Grants </h1>
        <p class='fs-5'>Kindly fill in the required information</p>
      </div>
      <div className='row px-4 pt-4' id='no-padding-res'>
        <form className='col-lg-6'>
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Period of Conference<sup className='text-danger'>*</sup>
            </label>
            <input type='email' class='form-control rounded-0' />
          </div>
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Conference last attended title<sup className='text-danger'>*</sup>
            </label>
            <textarea
              className='form-control'
              placeholder='Finance a new-age technology'
              style={{ height: "100px" }}></textarea>
          </div>
          <div class='mb-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Venue<sup className='text-danger'>*</sup>
            </label>
            <input
              type='text'
              placeholder='Awolowo Center, lagos '
              class='form-control rounded-0'
            />
          </div>
          <div class='row pt-2'>
            <div className='col-lg-5'>
              <label
                for='exampleInputEmail1'
                class='form-label fs-6 fw-semibold h-10'>
                Period from<sup className='text-danger'>*</sup>
              </label>
              <input
                type='date'
                placeholder='Awolowo Center, lagos '
                class='form-control rounded-0'
              />
            </div>
            <div className='col-lg-2 mt-3'></div>
            <div className='col-lg-5 '>
              <label
                for='exampleInputEmail1'
                class='form-label fs-6 fw-semibold h-10'>
                To<sup className='text-danger'>*</sup>
              </label>
              <input
                type='date'
                placeholder='Awolowo Center, lagos '
                class='form-control rounded-0'
              />
            </div>
          </div>

          <div class='mb-3 mt-3'>
            <label
              for='exampleInputEmail1'
              class='form-label fs-6 fw-semibold h-10'>
              Amount granted <sup className='text-danger'>*</sup>
            </label>
            <input type='number' class='form-control rounded-0' />
          </div>
        </form>
        <div className='row justify-content-end mb-4'>
          <CommonButton
            title={"Proceed to next"}
            action={() => navigate("bond-of-agreement")}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationOfGrants;
