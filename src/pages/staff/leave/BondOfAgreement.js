import React from "react";
import GetDocument from "../../../components/getdocument";
import CommonButton from "../../../components/commonbutton/Button";

const BondOfAgreement = ({ navigate }) => {
  return (
    <div className='container-fluid'>
      <div class='border-bottom ps-4' id='no-padding-res'>
        <h1 class='fs-4 fw-semibold'>Bond Agreement Form </h1>
        <p class='fs-5'>Download form and upload</p>
      </div>
      <div className='mt-4 px-4' id='no-padding-res'>
        <p>Bond Agreement form </p>
        <button
          onClick={() => navigate("/staff/submited")}
          type='submit'
          style={{
            backgroundColor: " #984779",
            borderColor: "white",
            marginTop: "-20px",
          }}
          class='my-10 p-2 text-md-start text-white fs-6 fw-semibold'>
          Download
        </button>
      </div>
      <div className='mt-5 px-4' id='no-padding-res'>
        <p style={{ marginBottom: "-25px" }}>
          Upload your documents<sup className='text-danger'>*</sup>
        </p>
        <GetDocument
          details={"PDF"}
          link={"Click to upload documents or drag and drop"}
          width={"300px"}
        />
      </div>
      <div className='mt-4'>
        <CommonButton
          title={"Submit"}
          action={() => navigate("/staff/leave/submited")}
        />
      </div>
    </div>
  );
};

export default BondOfAgreement;
