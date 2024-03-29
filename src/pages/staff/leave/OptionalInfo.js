import React from "react";
import GetDocument from "../../../components/getdocument";

const OptionalInfo = () => {
  return (
    <div>
      <div class='pb-2 pt-2'>
        <div class='mb-3'>
          <label
            for='exampleInputEmail1'
            class='form-label fs-6 fw-semibold h-10'>
            Start Date<sup className='text-danger'>*</sup>
          </label>
          <input type='date' class='form-control rounded-0' />
        </div>
      </div>
      <div class='pb-2'>
        <div class='mb-3'>
          <label
            for='exampleInputEmail1'
            class='form-label fs-6 fw-semibold h-10'>
            End date<sup className='text-danger'>*</sup>
          </label>
          <input type='date' class='form-control rounded-0' />
        </div>
      </div>
      <div class='pb-2'>
        <div class='mb-3'>
          <label
            for='exampleInputEmail1'
            class='form-label fs-6 fw-semibold h-10'>
            Resumption date<sup className='text-danger'>*</sup>
          </label>
          <input type='date' class='form-control rounded-0' />
        </div>
      </div>
      <div class='pb-2'>
        <div class='mb-3'>
          <label
            for='exampleInputEmail1'
            class='form-label fs-6 fw-semibold h-10'>
            Leave Duration<sup className='text-danger'>*</sup>
          </label>
          <input type='text' class='form-control rounded-0' />
        </div>
      </div>
      <div class='pb-2'>
        <div class='mb-3'>
          <label
            style={{ marginBottom: "-20px" }}
            class='form-label fs-6 fw-semibold h-10'>
            Upload your documents<sup className='text-danger'>*</sup>
          </label>
          <GetDocument
            width={"300px"}
            height={"100px"}
            link={"Click to upload documents or drag and drop"}
            details={"PDF"}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionalInfo;
