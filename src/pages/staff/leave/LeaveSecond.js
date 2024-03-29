import React from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const LeaveSecond = ({ navigate }) => {
  // const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div class='border-bottom ps-4' id='sec-padding-res'>
          <h1 class='fs-3 fw-semibold'>Leave</h1>
          <p class='fs-5'>Kindly fill in the required information</p>
        </div>
        <div className='col-md-6'>
          <form
            class=' ps-4 pt-5 '
            id='sec-padding-res'
            style={{ paddingBottom: "100px" }}>
            <div class='pb-5'>
              <div class='mb-3'>
                <label
                  for='exampleInputEmail1'
                  class='form-label fs-6 fw-semibold h-10'>
                  Date Resumed from Last Leave
                </label>
                <input type='email' class='form-control rounded-0' />
              </div>
              <div class='mb-3'>
                <label class='form-label fs-6 fw-semibold'>
                  Deferred Leave
                </label>
                <select
                  class='form-select rounded-0'
                  aria-label='Default select example'>
                  <option selected>None</option>
                  <option value='1'></option>
                  <option value='2'></option>
                  <option value='3'></option>
                </select>
              </div>

              <div class='mb-3'>
                <label class='form-label fs-6 fw-semibold'>
                  Leave due for current year
                </label>
                <input class='form-control rounded-0' />
              </div>
              <div class='mb-3'>
                <label class='form-label fs-6 fw-semibold'>
                  Total Leave Due
                </label>
                <input type='number' class='form-control rounded-0' />
              </div>
              <div class='mb-3'>
                <label class='form-label fs-6 fw-semibold'>Start Date</label>
                <input type='date' class='form-control rounded-0' />
                {/* <DatePicker selected={startDate}  onChange={(date) => setStartDate(date)}  /> */}
              </div>
              <div class='mb-3'>
                <label for='date' class='form-label fs-6 fw-semibold'>
                  End Date
                </label>
                <input
                  type='date'
                  class='form-control rounded-0'
                  id='end_date'
                />
              </div>
              <div class='mb-3'>
                <label for='address' class='form-label fs-6 fw-semibold'>
                  Address while on Leave
                </label>
                <textarea
                  class='form-control'
                  aria-label='With textarea'></textarea>
              </div>
            </div>

            {/* <Link to='leaveSecond'> */}
            <button
              type='submit'
              onClick={() => navigate("submited")}
              style={{
                backgroundColor: " #984779",
                borderColor: "white",
                right: 50,
                position: "absolute",
              }}
              class='my-10 p-2 text-md-start text-white fs-6 fw-semibold'>
              Submit
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveSecond;
