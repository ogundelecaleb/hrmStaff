import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getYear, getMonth } from 'date-fns';

const CustomDatePicker = ({ selectedDate, onChange }) => {
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <DatePicker
      autoComplete="off"
      renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div style={{ margin: 10, display: 'flex', justifyContent: 'center' }}>
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>{'<'}</button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>{'>'}</button>
        </div>
      )}
      selected={selectedDate ? new Date(selectedDate) : null}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className="form-control rounded-0"
      shouldCloseOnSelect={true}
    />
  );
};

function range(start, end, step) {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

export default CustomDatePicker;
